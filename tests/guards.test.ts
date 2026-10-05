import { test } from 'node:test';
import assert from 'node:assert/strict';
import { collectStrings, findContentIssues, LONG_LIVE_TAG } from '../src/lib/guards.ts';

test('collectStrings walks nested objects and arrays with paths', () => {
  const found = collectStrings({ a: 'x', b: [{ c: 'y' }], n: 3 });
  assert.deepEqual(found, [
    { path: '$.a', text: 'x' },
    { path: '$.b[0].c', text: 'y' },
  ]);
});

test('flags bracket placeholders, TODO and TBD', () => {
  const issues = findContentIssues({ a: '[stack]', b: 'TODO', c: 'tbd later', d: 'fine' });
  assert.equal(issues.length, 3);
  assert.ok(issues.every((line) => line.endsWith('placeholder')));
});

test('flags Kenyan and international phone numbers', () => {
  assert.equal(findContentIssues({ a: 'Call 0712 345 678' }).length, 1);
  assert.equal(findContentIssues({ a: 'Call +254 712 345 678' }).length, 1);
  assert.equal(findContentIssues({ a: 'Call +1 415 555 0100' }).length, 1);
});

test('does not flag years, ranges or URLs', () => {
  assert.deepEqual(findContentIssues({ a: '2023 - 2025', b: 'https://dre-ai.github.io/Lumora/' }), []);
});

test('flags any misspelling of the tag', () => {
  assert.equal(findContentIssues({ a: '#LongLiveAI' }).length, 1);
  assert.equal(findContentIssues({ a: '#longliveai' }).length, 1);
  assert.deepEqual(findContentIssues({ a: `Built with care. ${LONG_LIVE_TAG}` }), []);
});

test('flags em and en dashes', () => {
  assert.equal(findContentIssues({ a: 'fast — and good' }).length, 1);
  assert.equal(findContentIssues({ a: '1–3 months' }).length, 1);
  assert.deepEqual(findContentIssues({ a: '1-3 months' }), []);
});

test('flags more than one middle dot in a string', () => {
  assert.equal(findContentIssues({ a: 'A · B · C' }).length, 1);
  assert.deepEqual(findContentIssues({ a: 'Founder · Full-Stack & AI Engineer' }), []);
});

test('flags lorem, XX% and {{x}} as placeholders', () => {
  for (const text of ['lorem ipsum', 'Cut time by XX%', 'Hello {{name}}']) {
    const issues = findContentIssues({ a: text });
    assert.equal(issues.length, 1, text);
    assert.ok(issues[0].endsWith('placeholder'), text);
  }
});

test('flags hyphenated and suffixed misspellings of the tag', () => {
  assert.equal(findContentIssues({ a: '#long-live-ai' }).length, 1);
  assert.equal(findContentIssues({ a: '#longliveAIs' }).length, 1);
  assert.equal(findContentIssues({ a: 'long_live_AI' }).length, 1);
  assert.deepEqual(findContentIssues({ a: `Yes ${LONG_LIVE_TAG}.` }), []);
});

test('does not flag long order numbers as phone numbers', () => {
  assert.deepEqual(findContentIssues({ a: 'Order 123456789012' }), []);
});

test('flags unseparated Kenyan mobile numbers but not other long digit runs', () => {
  assert.equal(findContentIssues({ a: 'Call 0712345678' }).length, 1);
  assert.deepEqual(findContentIssues({ a: 'Ref 1234567890123' }), []);
});
