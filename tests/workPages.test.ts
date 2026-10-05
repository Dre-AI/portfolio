import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { featuredWork, publicView } from '../src/data/work.ts';
import { sections } from '../src/data/studio.ts';

const page = readFileSync(new URL('../src/pages/work/[slug].astro', import.meta.url), 'utf8');

test('featured slugs are unique', () => {
  const slugs = featuredWork.map((item) => item.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test('publicView never exposes a live link for an unapproved item', () => {
  for (const item of featuredWork.filter((i) => i.label === 'concept' && !i.clientApproved)) {
    const view = publicView(item);
    assert.equal(view.liveUrl, undefined);
    assert.ok(!JSON.stringify(view).includes('Bazaar'));
  }
});

test('case study page uses getStaticPaths and publicView', () => {
  assert.match(page, /getStaticPaths/);
  assert.match(page, /publicView/);
});

test('case copy lives in studio data', () => {
  assert.equal(sections.case.brief, 'The brief');
  assert.ok(sections.case.coverAlt.length > 0);
});
