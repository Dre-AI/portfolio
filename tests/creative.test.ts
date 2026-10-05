import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { creativePieces, creativeSection } from '../src/data/creative.ts';
import { nav } from '../src/data/studio.ts';
import { findContentIssues } from '../src/lib/guards.ts';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const publicFile = (path: string) => existsSync(new URL(`../public/${path}`, import.meta.url));

test('creative section copy passes the guard and says the work is spec, not commissioned', () => {
  assert.deepEqual(findContentIssues({ creativeSection, creativePieces }), []);
  assert.match(creativeSection.note, /spec/i);
  assert.match(creativeSection.note, /not affiliated/i);
});

test('every piece has a web image, a full-size image, real dimensions and alt text naming the brand', () => {
  assert.ok(creativePieces.length >= 12);
  const slugs = new Set<string>();
  for (const p of creativePieces) {
    assert.ok(!slugs.has(p.slug), `duplicate ${p.slug}`);
    slugs.add(p.slug);
    assert.ok(publicFile(`creative/${p.slug}.webp`), `missing creative/${p.slug}.webp`);
    assert.ok(publicFile(`creative/${p.slug}-full.webp`), `missing creative/${p.slug}-full.webp`);
    assert.ok(publicFile(`creative/${p.slug}-480.webp`), `missing creative/${p.slug}-480.webp`);
    assert.ok(p.width > 0 && p.height > 0, p.slug);
    assert.ok(p.alt.includes(p.brand), `${p.slug}: alt should name ${p.brand}`);
    assert.match(p.alt, /^Spec /, `${p.slug}: alt should say it is spec work`);
  }
});

test('the gallery sits after the web work, and the nav links to it', () => {
  const home = read('src/pages/index.astro');
  assert.match(home, /<Work \/>\s*<Creative \/>/);
  const src = read('src/components/Creative.astro');
  assert.match(src, /creativePieces\.map/);
  assert.match(src, /creativeSection\.note/);
  assert.match(src, /id="creative"/);
  assert.ok(nav.some((item) => item.href === '#creative'));
});
