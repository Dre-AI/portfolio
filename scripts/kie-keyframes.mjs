// Generate hero keyframes with kie.ai Nano Banana Pro, using the character references in hero-src/refs/.
// Usage: node --env-file=.env scripts/kie-keyframes.mjs K1 [variants] [gpt2|nano] [1K|2K]   (defaults: 2, gpt2, 1K; 1K is enough for Flow's 720p)
// Then copy the take you like to hero-src/keyframes/K1.png; K2–K4 use the previous chosen frame for continuity.
// kie deletes uploads after 3 days and outputs after 14 days, so results are downloaded immediately.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename, join } from 'node:path';
import { keyframes } from './keyframe-prompts.mjs';

const API = 'https://api.kie.ai';
const UPLOAD_HOSTS = ['https://kieai.redpandaai.co', 'https://api.kie.ai'];
// Image models on kie.ai differ in their model id and in the name of the reference-image field.
const MODELS = {
  gpt2: { id: 'gpt-image-2-image-to-image', imageField: 'input_urls', extra: {} },
  nano: { id: 'nano-banana-pro', imageField: 'image_input', extra: { output_format: 'png' } },
};
const POLL_MS = 5000;
const TIMEOUT_MS = 6 * 60 * 1000;
// Derrick's real photo is the identity reference for every keyframe (K1 is an edit of it).
const REFS = ['hero-src/refs/photo.png'];
const OUT_DIR = 'hero-src/keyframes';

const key = process.env.KIE_API_KEY;
if (!key) throw new Error('KIE_API_KEY missing: run with node --env-file=.env');
const auth = { Authorization: `Bearer ${key}` };

async function upload(path) {
  const form = new FormData();
  form.append('file', new Blob([await readFile(path)], { type: 'image/png' }), basename(path));
  form.append('uploadPath', 'ndc-hero');
  form.append('fileName', basename(path));
  for (const host of UPLOAD_HOSTS) {
    const res = await fetch(`${host}/api/file-stream-upload`, { method: 'POST', headers: auth, body: form });
    if (res.status === 404) continue;
    const json = await res.json();
    if (!json?.data?.downloadUrl) throw new Error(`Upload failed for ${path}: ${json?.msg ?? res.status}`);
    return json.data.downloadUrl;
  }
  throw new Error('No kie upload host accepted the file');
}

async function createTask(model, prompt, imageUrls, resolution) {
  const res = await fetch(`${API}/api/v1/jobs/createTask`, {
    method: 'POST',
    headers: { ...auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: model.id,
      input: { prompt, [model.imageField]: imageUrls, aspect_ratio: '16:9', resolution, ...model.extra },
    }),
  });
  const json = await res.json();
  if (json?.code !== 200 || !json?.data?.taskId) throw new Error(`createTask failed: ${json?.msg ?? res.status}`);
  return json.data.taskId;
}

async function waitForResult(taskId) {
  const started = Date.now();
  while (Date.now() - started < TIMEOUT_MS) {
    const res = await fetch(`${API}/api/v1/jobs/recordInfo?taskId=${taskId}`, { headers: auth });
    const { data } = await res.json();
    if (data?.state === 'success') return JSON.parse(data.resultJson).resultUrls[0];
    if (data?.state === 'fail') throw new Error(`Task ${taskId} failed: ${data.failMsg ?? 'unknown reason'}`);
    await new Promise((r) => setTimeout(r, POLL_MS));
  }
  throw new Error(`Task ${taskId} timed out`);
}

async function download(url, path) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}) for ${path}`);
  await writeFile(path, Buffer.from(await res.arrayBuffer()));
}

function previousFrame(id) {
  const prev = `K${Number(id.slice(1)) - 1}`;
  const path = join(OUT_DIR, `${prev}.png`);
  if (!existsSync(path)) throw new Error(`${id} continues from ${prev}: copy your chosen take to ${path} first`);
  return path;
}

async function main() {
  const [id = 'K1', variantsArg = '2', modelArg = 'gpt2', resolution = '1K'] = process.argv.slice(2);
  const model = MODELS[modelArg];
  if (!model) throw new Error(`Unknown model ${modelArg}. Use one of: ${Object.keys(MODELS).join(', ')}`);
  const frame = keyframes[id];
  if (!frame) throw new Error(`Unknown keyframe ${id}. Use one of: ${Object.keys(keyframes).join(', ')}`);
  const variants = Math.max(1, Math.min(4, Number(variantsArg) || 2));

  await mkdir(OUT_DIR, { recursive: true });
  const refPaths = frame.usesPrevious ? [...REFS, previousFrame(id)] : REFS;
  console.log(`Uploading ${refPaths.length} reference image(s)…`);
  const imageUrls = await Promise.all(refPaths.map(upload));

  console.log(`Generating ${variants} take(s) of ${id} with ${model.id}…`);
  const taskIds = await Promise.all(Array.from({ length: variants }, () => createTask(model, frame.prompt, imageUrls, resolution)));
  const results = await Promise.allSettled(
    taskIds.map(async (taskId, i) => {
      const out = join(OUT_DIR, `${id}-${modelArg}-v${i + 1}.png`);
      await download(await waitForResult(taskId), out);
      return out;
    }),
  );
  for (const r of results) console.log(r.status === 'fulfilled' ? `saved ${r.value}` : `error: ${r.reason.message}`);
  if (results.every((r) => r.status === 'rejected')) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
