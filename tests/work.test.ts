import { test } from 'node:test';
import assert from 'node:assert/strict';
import { featuredWork, moreBuilds, publicView } from '../src/data/work.ts';
import { findContentIssues } from '../src/lib/guards.ts';

test('featured lineup and order match the spec', () => {
  assert.deepEqual(featuredWork.map((w) => w.slug), ['keton-consulting', 'lumora', 'insightforge', 'cleaning-concept']);
});

test('slugs are unique and URL-safe', () => {
  const slugs = featuredWork.map((w) => w.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.ok(slugs.every((s) => /^[a-z0-9-]+$/.test(s)));
});

test('work copy passes the copy guard', () => {
  assert.deepEqual(findContentIssues({ featuredWork, moreBuilds }), []);
});

test('unapproved concept hides client name and live link', () => {
  const concept = featuredWork.find((w) => w.slug === 'cleaning-concept')!;
  assert.equal(concept.clientApproved, false);
  const shown = publicView(concept);
  assert.equal(shown.liveUrl, undefined);
  assert.equal(shown.title, concept.conceptTitle);
  assert.doesNotMatch(JSON.stringify(shown), /bazaar/i);
});

test('approved concept shows client name and link', () => {
  const concept = featuredWork.find((w) => w.slug === 'cleaning-concept')!;
  const shown = publicView({ ...concept, clientApproved: true });
  assert.equal(shown.title, concept.title);
  assert.equal(shown.liveUrl, concept.liveUrl);
});

test('publicView does not mutate its input', () => {
  const concept = featuredWork.find((w) => w.slug === 'cleaning-concept')!;
  const before = JSON.stringify(concept);
  publicView(concept);
  assert.equal(JSON.stringify(concept), before);
});

test('studio builds are labelled studio and link public code', () => {
  for (const slug of ['lumora', 'insightforge']) {
    const item = featuredWork.find((w) => w.slug === slug)!;
    assert.equal(item.label, 'studio');
    assert.match(item.repoUrl ?? '', /^https:\/\/github\.com\/Dre-AI\//);
  }
});
