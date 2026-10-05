import { test } from 'node:test';
import assert from 'node:assert/strict';
import { experience, education, capabilities } from '../src/data/experience.ts';
import { notFound, sections } from '../src/data/studio.ts';
import { findContentIssues } from '../src/lib/guards.ts';

test('experience, education, capabilities and 404 copy pass the copy guard', () => {
  assert.deepEqual(findContentIssues({ experience, education, capabilities, notFound }), []);
});

test('the current role is the studio', () => {
  assert.equal(experience[0].org, 'Ndiga Dee Creative Co.');
  assert.equal(experience[0].role, 'Freelance Full-Stack & AI Developer');
});

test('capabilities are grouped to match the services', () => {
  assert.deepEqual(capabilities.map((c) => c.group), [
    'Web & apps', 'Brand & creative', 'Growth', 'AI & automation', 'Infrastructure & security',
  ]);
});

test('about page section headings exist', () => {
  assert.equal(sections.experience, 'Experience');
  assert.equal(sections.education, 'Education');
  assert.equal(sections.capabilities, 'What I work with');
});
