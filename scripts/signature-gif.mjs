// Usage: node scripts/signature-gif.mjs  (renders public/signature/signature.gif + signature-still.png; needs Chrome, ffmpeg and Node 22.18+)
// Animated email-signature banner: the animation is CSS, frozen frame by frame via the Web Animations API,
// screenshotted at 2x and encoded as a looping GIF (email clients strip CSS/JS animation; GIF is what Gmail plays).
// Every frame is fully readable, so the first frame works as a still where GIFs don't animate.
import { chromium } from 'playwright-core';
import { readFileSync, mkdirSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = join(root, 'public', 'signature');
const b64 = (path) => readFileSync(join(root, path)).toString('base64');

const WIDTH = 480;
const HEIGHT = 132;
const SCALE = 2; // retina-sharp; the HTML signature displays it at WIDTH x HEIGHT
const LOOP_S = 4;
const FPS = 15;

const archivo = b64('node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2');
const geist = b64('node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2');
const mono = b64('node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2');

// The existing DN monogram path (same as og-image.mjs); never redrawn.
const MONOGRAM = 'M34.5,40 H102.5 L142.5,160 V40 H162.5 A59,56 0 0 1 221.5,96 V160 A59,56 0 0 1 162.5,216 H114.5 L74.5,96 V216 H34.5 Z';

const html = `<!doctype html><html><head><style>
@font-face{font-family:A;src:url(data:font/woff2;base64,${archivo});font-weight:100 900;font-stretch:62% 125%}
@font-face{font-family:G;src:url(data:font/woff2;base64,${geist});font-weight:100 900}
@font-face{font-family:M;src:url(data:font/woff2;base64,${mono});font-weight:100 900}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${WIDTH}px;height:${HEIGHT}px;background:#0a0b0d;overflow:hidden}
#card{position:relative;width:${WIDTH}px;height:${HEIGHT}px;background:#0a0b0d;box-shadow:inset 0 0 0 1px #2a2f36;overflow:hidden}
/* faint HUD grid on the right, static */
#grid{position:absolute;inset:0;background-image:radial-gradient(rgb(125 227 240/.10) .6px,transparent .8px);background-size:12px 12px;
  -webkit-mask-image:linear-gradient(90deg,transparent 0 30%,#000 75%);mask-image:linear-gradient(90deg,transparent 0 30%,#000 75%)}
/* logo tile */
#tile{position:absolute;left:16px;top:16px;width:100px;height:100px;background:#111317;box-shadow:inset 0 0 0 1px #2a2f36;overflow:hidden}
#bloom{position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgb(125 227 240/.55),transparent 62%);opacity:.18;animation:bloom ${LOOP_S}s linear infinite}
#mono{position:absolute;left:50%;top:50%;width:46px;transform:translate(-50%,-50%);filter:drop-shadow(0 0 6px rgb(125 227 240/.45))}
#scan{position:absolute;top:0;bottom:0;left:-40px;width:40px;background:linear-gradient(90deg,transparent,rgb(125 227 240/.35) 70%,#bff6fc 96%,transparent);animation:scan ${LOOP_S}s linear infinite}
.br{position:absolute;width:10px;height:10px;border-color:#7de3f0;border-style:solid;opacity:.9}
.tl{left:6px;top:6px;border-width:1.5px 0 0 1.5px}.tr{right:6px;top:6px;border-width:1.5px 1.5px 0 0}
.bl{left:6px;bottom:6px;border-width:0 0 1.5px 1.5px}.brr{right:6px;bottom:6px;border-width:0 1.5px 1.5px 0}
/* text column */
#kicker{position:absolute;left:136px;top:19px;font:500 9px/1 M;letter-spacing:.18em;color:#7de3f0;text-transform:uppercase;display:flex;align-items:center;gap:5px}
#cursor{width:6px;height:10px;background:#7de3f0;animation:blink 1s steps(1,end) infinite}
#name{position:absolute;left:135px;top:34px;font:700 38px/1 A;font-stretch:72%;letter-spacing:-.02em;color:#eef1f4}
#title{position:absolute;left:136px;top:77px;font:500 12.5px/1 G;color:#9aa3ad}
#trace{position:absolute;left:136px;top:101px;width:328px;height:1px;background:#2a2f36}
.node{position:absolute;top:-2px;width:5px;height:5px;border-radius:50%;background:#0a0b0d;box-shadow:inset 0 0 0 1px #3a414b}
#packet{position:absolute;top:-3px;left:0;width:34px;height:7px;animation:packet ${LOOP_S}s linear infinite}
#packet::before{content:'';position:absolute;right:0;top:1px;width:5px;height:5px;border-radius:50%;background:#bff6fc;box-shadow:0 0 6px 2px rgb(125 227 240/.8)}
#packet::after{content:'';position:absolute;left:0;right:3px;top:3px;height:1px;background:linear-gradient(90deg,transparent,#7de3f0)}
#services{position:absolute;left:136px;top:111px;font:500 8.5px/1 M;letter-spacing:.2em;color:#656d77;text-transform:uppercase}
@keyframes scan{0%{transform:translateX(0)}35%{transform:translateX(150px)}100%{transform:translateX(150px)}}
@keyframes bloom{0%{opacity:.18}20%{opacity:.18}32%{opacity:.62}55%{opacity:.18}100%{opacity:.18}}
@keyframes blink{0%{opacity:1}50%{opacity:0}100%{opacity:1}}
@keyframes packet{0%{transform:translateX(-34px);opacity:0}6%{opacity:1}92%{opacity:1}100%{transform:translateX(328px);opacity:0}}
</style></head><body><div id="card">
<div id="grid"></div>
<div id="tile"><div id="bloom"></div>
  <svg id="mono" viewBox="34 40 188 176"><path fill="#eef1f4" d="${MONOGRAM}"/></svg>
  <div id="scan"></div>
  <i class="br tl"></i><i class="br tr"></i><i class="br bl"></i><i class="br brr"></i>
</div>
<div id="kicker">Ndiga Dee Creative Co.<span id="cursor"></span></div>
<div id="name">Derrick Ndiga</div>
<div id="title">Freelance Web Developer &amp; Digital Creative</div>
<div id="trace"><i class="node" style="left:-2px"></i><i class="node" style="left:108px"></i><i class="node" style="left:218px"></i><i class="node" style="left:325px"></i><div id="packet"></div></div>
<div id="services">Websites · Ads · Marketing</div>
</div></body></html>`;

mkdirSync(outDir, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), 'signature-gif-'));
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: SCALE });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  const frames = LOOP_S * FPS;
  for (let i = 0; i < frames; i++) {
    const ms = (i / FPS) * 1000;
    await page.evaluate((t) => {
      for (const a of document.getAnimations()) { a.pause(); a.currentTime = t; }
    }, ms);
    await page.screenshot({ path: join(tmp, `f${String(i).padStart(3, '0')}.png`) });
  }
  // A still for places that never animate (first frame = full signature).
  await page.evaluate(() => { for (const a of document.getAnimations()) { a.pause(); a.currentTime = 0; } });
  await page.screenshot({ path: join(outDir, 'signature-still.png') });
} finally {
  await browser.close();
}

const gif = join(outDir, 'signature.gif');
execFileSync('ffmpeg', [
  '-v', 'error', '-y', '-framerate', String(FPS), '-i', join(tmp, 'f%03d.png'),
  '-filter_complex', 'split[a][b];[a]palettegen=max_colors=96:stats_mode=full[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle',
  '-loop', '0', gif,
]);
rmSync(tmp, { recursive: true, force: true });
console.log(`Wrote public/signature/signature.gif (${WIDTH * SCALE}x${HEIGHT * SCALE}, ${LOOP_S}s @ ${FPS}fps, ${Math.round(statSync(gif).size / 1024)} KB)`);
