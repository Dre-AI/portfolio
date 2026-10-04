import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p: string) => readFileSync(p, 'utf8');
const base = read('src/layouts/Base.astro');
const header = read('src/components/Header.astro');
const footer = read('src/components/Footer.astro');

test('shell files no longer import the legacy data modules', () => {
  for (const src of [base, header, footer]) {
    assert.doesNotMatch(src, /data\/(profile|site|projects|experience)/);
  }
});

test('Base builds Organization and Person JSON-LD from studio and founder', () => {
  assert.match(base, /"@type": "Organization"|'@type': 'Organization'/);
  assert.match(base, /"@type": "Person"|'@type': 'Person'/);
  assert.match(base, /studio\.name/);
  assert.match(base, /founder\.role/);
  assert.match(base, /sameAs = Object\.values\(founder\.links\)/);
  assert.match(base, /studio\.subline/);
  assert.match(base, /theme-color" content="#0a0b0d"/);
});

test('Header uses nav and the start-project CTA, with no legacy glow styling', () => {
  assert.match(header, /\bnav\b[^\n]*from '..\/data\/studio'/);
  assert.match(header, /ctas\.startProject/);
  assert.match(header, /btn primary/);
  assert.match(header, /var\(--z-nav\)/);
  assert.match(header, /aria-label=\{studio\.name\}/);
  assert.doesNotMatch(header, /--glow-|--edge|--gradient/);
});

test('Footer renders the studio note, city, contact links and a computed year', () => {
  assert.match(footer, /studio\.footerNote/);
  assert.match(footer, /studio\.city/);
  assert.match(footer, /mailto:\$\{founder\.email\}/);
  assert.match(footer, /founder\.links\.linkedin/);
  assert.match(footer, /founder\.links\.github/);
  assert.match(footer, /new Date\(\)\.getFullYear\(\)/);
  assert.match(footer, /studio\.name/);
  assert.doesNotMatch(footer, /tel:|phone/i);
});

test('Header stays on one line from 30rem and shows text links from 900px', () => {
  assert.match(header, /@media \(min-width: 30rem\)[^}]*flex-wrap: nowrap/);
  assert.match(header, /@media \(min-width: 900px\)[^}]*\.link/);
  assert.match(header, /nav a:not\(\.btn\)/);
});

test('Footer link labels come from studio data', () => {
  assert.match(footer, /founder\.linkLabels\.linkedin/);
  assert.match(footer, /founder\.linkLabels\.github/);
});
