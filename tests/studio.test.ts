import { test } from 'node:test';
import assert from 'node:assert/strict';
import { studio, aiBenefits, founder, ctas, contactCopy, heroBeats } from '../src/data/studio.ts';
import { services } from '../src/data/services.ts';
import { processSection } from '../src/data/process.ts';
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
  assert.equal(`${founder.name}, ${founder.role}`, 'Derrick Ndiga, Freelance Full-Stack & AI Developer');
});

test('AI benefits are about time saved and contain no invented numbers', () => {
  assert.ok(aiBenefits.length >= 3);
  for (const b of aiBenefits) assert.doesNotMatch(`${b.title} ${b.text}`, /\d+\s?(%|x\b|×)/);
});

test('hero has four beats in scroll order, ending on the studio name', () => {
  assert.equal(heroBeats.length, 4);
  assert.deepEqual(heroBeats.map((b) => b.at), [0, 0.3, 0.6, 0.85]);
  assert.deepEqual(heroBeats[0].ctas, ['startProject', 'seeWork']);
  assert.equal(heroBeats[0].heading, studio.headline);
  assert.equal(heroBeats[3].heading, studio.name);
  assert.deepEqual(findContentIssues(heroBeats), []);
});

test('beat headings stay short enough for the beat size', () => {
  for (const b of heroBeats.slice(1)) assert.ok(b.heading.split(' ').length <= 5, b.heading);
});

test('copy speaks in the first person, never as a team', () => {
  const all = JSON.stringify({ studio, heroBeats, aiBenefits, founder, ctas, contactCopy, services, processSection });
  assert.doesNotMatch(all, /\b(we|our|ours|us|we're|we'll|the team)\b/i);
});

test('first AI benefit promises early options and better results, without a hard deadline', () => {
  assert.doesNotMatch(aiBenefits[0].text, /first week/i);
  assert.match(aiBenefits[0].text, /early/i);
  assert.match(aiBenefits[0].text, /better/i);
});
