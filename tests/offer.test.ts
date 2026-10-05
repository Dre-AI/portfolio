import { test } from 'node:test';
import assert from 'node:assert/strict';
import { services } from '../src/data/services.ts';
import { processSection } from '../src/data/process.ts';
import { findContentIssues } from '../src/lib/guards.ts';

test('exactly the three agreed services, in order (web, design, marketing; 2026-10-05)', () => {
  assert.deepEqual(services.map((s) => s.title), [
    'Websites & Web Apps',
    'Graphic Design & Content',
    'Digital Marketing',
  ]);
  assert.deepEqual(services.map((s) => s.slug), ['websites', 'design', 'marketing']);
});

test('the design service sells ads and product photos', () => {
  const design = services[1].deliverables.join(' ');
  assert.match(design, /Ad creatives/);
  assert.match(design, /Product photos/);
});

test('AI is a method, not a service', () => {
  assert.ok(services.every((s) => !/^AI\b/i.test(s.title)));
  assert.ok(services.every((s) => s.aiAngle.length > 0));
});

test('process has the four agreed steps', () => {
  assert.deepEqual(processSection.steps.map((s) => s.title), ['Discover', 'Design', 'Build with AI', 'Launch & grow']);
});

test('offer copy passes the guard and has no invented numbers', () => {
  assert.deepEqual(findContentIssues({ services, processSection }), []);
  const all = JSON.stringify({ services, processSection });
  assert.doesNotMatch(all, /\d+\s?(%|x\b|×)/);
});
