// Usage: node scripts/og-image.mjs  (regenerates public/og.png, 1200x630, from src/data/studio.ts; needs Chrome and Node 22.18+)
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { studio } from '../src/data/studio.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const b64 = (path) => readFileSync(root + path).toString('base64');
const escape = (text) => text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const archivo = b64('node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2');
const geist = b64('node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2');

const html = `<!doctype html><html><head><style>
@font-face{font-family:A;src:url(data:font/woff2;base64,${archivo});font-weight:100 900;font-stretch:62% 125%}
@font-face{font-family:G;src:url(data:font/woff2;base64,${geist});font-weight:100 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0a0b0d;color:#eceff2;font-family:G;position:relative;overflow:hidden}
body::before{content:'';position:absolute;right:-180px;bottom:-260px;width:760px;height:760px;border-radius:50%;background:radial-gradient(circle,rgb(125 227 240/.22),transparent 65%)}
.c{position:absolute;inset:0;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
svg{align-self:flex-start;width:auto}
h1{font:800 92px/0.98 A;font-stretch:75%;letter-spacing:-.01em;text-transform:none;max-width:900px}
.meta{display:flex;align-items:center;gap:20px;font:500 28px/1.3 G;color:#a9b1ba}
.meta b{font:700 30px G;color:#eceff2}
.tag{color:#7de3f0;font-weight:600}
.dot{width:6px;height:6px;border-radius:9px;background:#7de3f0}
</style></head><body><div class="c">
<svg viewBox="34 40 188 176" height="64"><path fill="#eceff2" d="M34.5,40 H102.5 L142.5,160 V40 H162.5 A59,56 0 0 1 221.5,96 V160 A59,56 0 0 1 162.5,216 H114.5 L74.5,96 V216 H34.5 Z"/></svg>
<h1>${escape(studio.headline)}</h1>
<p class="meta"><b>${escape(studio.name)}</b><span class="dot"></span><span class="tag">${escape(studio.tag)}</span></p>
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
