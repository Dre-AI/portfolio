import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync('src/styles/global.css', 'utf8');
const rootBlock = css.slice(css.indexOf(':root,'), css.indexOf('}', css.indexOf(':root,')));
const hex = (name: string): string => {
  const m = rootBlock.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})\\b`));
  assert.ok(m, `--${name} must be a 6-digit hex in the :root colour block`);
  return m![1].toLowerCase();
};
const lum = (h: string) => {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(hex(a)), lum(hex(b))].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

test('accent is pale cyan', () => {
  assert.equal(hex('accent'), '#7de3f0');
});

test('text pairs pass WCAG', () => {
  assert.ok(ratio('fg', 'bg') >= 7, 'fg on bg');
  for (const back of ['bg', 'bg-raised', 'surface']) {
    assert.ok(ratio('muted', back) >= 4.5, `muted on ${back}`);
    assert.ok(ratio('accent', back) >= 4.5, `accent on ${back}`);
  }
  assert.ok(ratio('accent-fg', 'accent') >= 4.5, 'accent-fg on accent');
  assert.ok(ratio('line-strong', 'surface') >= 3, 'input borders need 3:1');
});

test('one accent only: no cobalt or violet left anywhere', () => {
  for (const banned of ['#7b8cff', '#22d3ee', '#a78bfa', '167 139 250', '123 140 255']) {
    assert.ok(!css.toLowerCase().includes(banned), `${banned} must be gone`);
  }
});

test('no pure black or white', () => {
  assert.doesNotMatch(css.toLowerCase(), /#000000\b|#ffffff\b|#000\b|#fff\b/);
});

test('grain sits on a fixed, non-interactive layer', () => {
  const afterStart = css.lastIndexOf('body::after');
  const after = css.slice(afterStart, css.indexOf('}', afterStart));
  assert.match(css, /body::before,\s*body::after\s*\{[^}]*position:\s*fixed[^}]*pointer-events:\s*none/);
  assert.match(after, /--grain-opacity|opacity/);
});

test('no gradient text anywhere in the global styles', () => {
  assert.doesNotMatch(css, /background-clip:\s*text/);
});
