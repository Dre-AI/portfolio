import { test } from 'node:test';
import assert from 'node:assert/strict';
import { studio, aiBenefits, founder, ctas, contactCopy } from '../src/data/studio.ts';
import { findContentIssues, LONG_LIVE_TAG } from '../src/lib/guards.ts';

test('studio copy passes the copy guard', () => {
  assert.deepEqual(findContentIssues({ studio, aiBenefits, founder, ctas, contactCopy }), []);
});

test('studio name and tag are exact', () => {
  assert.equal(studio.name, 'Ndiga Dee Creative Co.');
  assert.equal(studio.tag, LONG_LIVE_TAG);
  assert.ok(studio.heroLabels.includes(LONG_LIVE_TAG));
  assert.ok(studio.manifesto.endsWith(LONG_LIVE_TAG));
  assert.ok(studio.manifesto.includes('machine\u2019s'));
});

test('founder line matches the spec', () => {
  assert.equal(`${founder.name}, ${founder.role}`, 'Derrick Ndiga, Founder · Full-Stack & AI Engineer');
});

test('AI benefits are about time saved and contain no invented numbers', () => {
  assert.ok(aiBenefits.length >= 3);
  for (const b of aiBenefits) assert.doesNotMatch(`${b.title} ${b.text}`, /\d+\s?(%|x\b|×)/);
});
