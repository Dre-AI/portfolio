// Usage: node scripts/capture-work.mjs  (needs Chrome, ffmpeg on PATH and Node 22.18+)
// Captures 1440x900 live-site screenshots into public/work/{slug}.webp for every featured item
// that has a public live URL. Unapproved concepts are skipped: their live site carries a client's branding.
import { chromium } from 'playwright-core';
import { mkdtempSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { featuredWork, publicView } from '../src/data/work.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = join(root, 'public', 'work');
const TIMEOUT_MS = 30_000;
const WAKE_WAIT_MS = 60_000;
const SETTLE_MS = 6_000;

const targets = featuredWork
  .map(publicView)
  .filter((item) => item.liveUrl && item.label !== 'concept');

async function wakeIfSleeping(page) {
  const wake = page.getByRole('button', { name: /get this app back up|wake|yes/i }).first();
  if (await wake.count()) {
    console.log('  sleeping app detected, clicking wake button');
    await wake.click();
    await page.waitForTimeout(WAKE_WAIT_MS / 3);
    await page.waitForLoadState('networkidle', { timeout: WAKE_WAIT_MS }).catch(() => {});
  }
}

mkdirSync(outDir, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), 'capture-work-'));
const browser = await chromium.launch({ channel: 'chrome' });
try {
  for (const item of targets) {
    console.log(`${item.slug}: ${item.liveUrl}`);
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await page.goto(item.liveUrl, { waitUntil: 'networkidle', timeout: TIMEOUT_MS });
      await wakeIfSleeping(page);
      // Demo backends (e.g. a free-tier API) can show a loading state first: wait it out.
      await page.waitForFunction(() => !/waking up/i.test(document.body.innerText), null, { timeout: WAKE_WAIT_MS }).catch(() => {});
      await page.waitForTimeout(SETTLE_MS); // client-rendered apps (Streamlit) paint widgets late
      const png = join(tmp, `${item.slug}.png`);
      await page.screenshot({ path: png });
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', png, '-c:v', 'libwebp', '-quality', '78', join(outDir, `${item.slug}.webp`)]);
      console.log(`  saved public/work/${item.slug}.webp`);
    } catch (error) {
      console.warn(`  SKIPPED ${item.slug}: ${error.message.split('\n')[0]}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
  rmSync(tmp, { recursive: true, force: true });
}
