// Usage: node scripts/og-image.mjs  (regenerates public/og.png, 1200x630, from src/data/profile.ts; needs Chrome and Node 22.18+)
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { profile } from '../src/data/profile.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const b64 = (path) => readFileSync(root + path).toString('base64');
const escape = (text) => text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const geist = b64('node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2');
const mono = b64('node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2');
const poster = b64('public/hero/poster.webp');
const city = profile.location.split(',')[0];

const html = `<!doctype html><html><head><style>
@font-face{font-family:G;src:url(data:font/woff2;base64,${geist})}
@font-face{font-family:M;src:url(data:font/woff2;base64,${mono})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#020617;color:#F1F5F9;font-family:G;position:relative;overflow:hidden}
.bg{position:absolute;inset:0;background:url(data:image/webp;base64,${poster}) 70% 100%/cover}
.bg::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgb(2 6 23/.94) 0%,rgb(2 6 23/.82) 50%,rgb(2 6 23/.25) 100%)}
.c{position:absolute;inset:0;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
svg{align-self:flex-start;width:auto}
h1{font-weight:600;font-size:76px;line-height:1.02;letter-spacing:-.04em;max-width:820px}
.meta{display:flex;align-items:center;gap:20px;font:450 24px/1.3 M;color:#CBD5E1}
.meta b{font:600 26px G;color:#F1F5F9;letter-spacing:-.01em}
.dot{width:6px;height:6px;border-radius:9px;background:#7B93FF}
</style></head><body><div class="bg"></div><div class="c">
<svg viewBox="34 40 188 176" height="64"><path fill="#F1F5F9" d="M34.5,40 H102.5 L142.5,160 V40 H162.5 A59,56 0 0 1 221.5,96 V160 A59,56 0 0 1 162.5,216 H114.5 L74.5,96 V216 H34.5 Z"/></svg>
<h1>${escape(profile.headline)}</h1>
<p class="meta"><b>${escape(profile.name)}</b><span class="dot"></span><span>${escape(`${profile.role}, ${city}`)}</span></p>
</div></body></html>`;

const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: root + 'public/og.png' });
  console.log('Wrote public/og.png (1200x630)');
} finally {
  await browser.close();
}
