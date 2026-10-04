import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('Archivo width axis is installed, imported and preloaded', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.ok(pkg.dependencies['@fontsource-variable/archivo']);
  const base = readFileSync('src/layouts/Base.astro', 'utf8');
  assert.match(base, /@fontsource-variable\/archivo\/wdth\.css/);
  assert.match(base, /archivo-latin-wdth-normal\.woff2\?url/);
});

test('headings and display classes use the condensed display face', () => {
  const css = readFileSync('src/styles/global.css', 'utf8');
  assert.match(css, /h1,\s*h2\s*,?\s*\.display\s*\{[^}]*font-family:\s*var\(--font-display\)[^}]*font-variation-settings:\s*'wdth'\s*var\(--display-width\)/);
  assert.match(css, /\.beat\s*\{[^}]*font-size:\s*var\(--step-5\)/);
  assert.doesNotMatch(css, /text-shadow:\s*0 0 42px/); // old neon glow on h2 is gone
});
