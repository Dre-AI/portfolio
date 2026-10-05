import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p: string) => readFileSync(p, 'utf8');

test('CLAUDE.md reflects the studio and the copy rules', () => {
  const doc = read('CLAUDE.md');
  assert.match(doc, /Ndiga Dee Creative Co\./);
  assert.match(doc, /#longliveAI. tag is retired/);
  assert.match(doc, /Never add a phone number/);
  assert.match(doc, /2026-10-04-ndiga-dee-creative-co-design\.md/);
});

test('BRIEF.md no longer positions Derrick as a job seeker', () => {
  const doc = read('docs/BRIEF.md');
  assert.doesNotMatch(doc, /hiring manager/i);
  assert.match(doc, /AI-native creative studio/);
});

test('Flow prompts describe the human-to-digital hero', () => {
  const doc = read('docs/FLOW_PROMPTS.md');
  for (const key of ['K1', 'K2', 'K3', 'K4', 'Clip A', 'Clip B', 'Clip C', 'hero-src/a.mp4']) assert.ok(doc.includes(key), key);
  assert.doesNotMatch(doc, /ACCENT/); // video stays neutral; the accent lives in the UI
});
