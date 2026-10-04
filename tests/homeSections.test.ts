import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { processSection } from '../src/data/process.ts';
import { founder } from '../src/data/studio.ts';
import { findContentIssues } from '../src/lib/guards.ts';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('process section has its labels and passes the copy guard', () => {
  assert.equal(processSection.usualLabel, 'Usually');
  assert.equal(processSection.withAILabel, 'With AI');
  assert.deepEqual(findContentIssues({ processSection }), []);
});

test('Pipeline keeps the motion hooks and reads processSection', () => {
  const src = read('src/components/Pipeline.astro');
  assert.match(src, /id="how"/);
  assert.match(src, /data-section="pipeline"/);
  assert.match(src, /<ol data-pipeline>/);
  assert.match(src, /<li data-step>/);
  assert.match(src, /processSection\.usualLabel/);
  assert.match(src, /processSection\.withAILabel/);
});

test('Work renders through publicView and hides covers for unapproved concepts', () => {
  const src = read('src/components/Work.astro');
  assert.match(src, /publicView/);
  assert.match(src, /clientApproved/);
  assert.match(src, /id="work"/);
  assert.match(read('src/components/ProjectCard.astro'), /data-card/);
});

test('founder has photo alt text and the photo file exists', () => {
  assert.equal(founder.photoAlt, 'Derrick Ndiga');
  assert.match(read('src/components/Founder.astro'), /founder\.photoAlt/);
  assert.ok(readFileSync(new URL('../public/founder.webp', import.meta.url)).length > 1000);
});

test('home page orders sections and drops About and Timeline', () => {
  const src = read('src/pages/index.astro');
  const order = ['<Services />', '<Pipeline />', '<Work />', '<Founder />', '<Contact />'].map((t) => src.indexOf(t));
  assert.ok(order.every((n) => n > 0));
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
  assert.doesNotMatch(src, /<About \/>|<Timeline \/>/);
});
