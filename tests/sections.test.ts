import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sections, contactCopy } from '../src/data/studio.ts';
import { findContentIssues } from '../src/lib/guards.ts';

test('sections has the page headings and passes the copy guard', () => {
  assert.deepEqual(Object.keys(sections).sort(), ['about', 'capabilities', 'case', 'contact', 'education', 'experience', 'moreBuilds', 'services', 'work']);
  assert.equal(sections.services, 'What I make');
  assert.equal(sections.contact, contactCopy.heading);
  assert.deepEqual(findContentIssues({ sections }), []);
});

test('Manifesto and Services read their copy from data', () => {
  const manifesto = readFileSync(new URL('../src/components/Manifesto.astro', import.meta.url), 'utf8');
  const services = readFileSync(new URL('../src/components/Services.astro', import.meta.url), 'utf8');
  assert.match(manifesto, /from '\.\.\/data\/studio'/);
  assert.match(manifesto, /studio\.manifesto/);
  assert.match(services, /from '\.\.\/data\/services'/);
  assert.match(services, /\bservices\b/);
  assert.match(services, /sections\.services/);
});
