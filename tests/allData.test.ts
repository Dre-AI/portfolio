import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { findContentIssues } from '../src/lib/guards.ts';

const dataDir = new URL('../src/data/', import.meta.url);
const files = readdirSync(dataDir).filter((name) => name.endsWith('.ts'));

test('src/data has modules to check', () => {
  assert.ok(files.length > 0);
});

for (const file of files) {
  test(`${file}: no placeholders, phone numbers, tag misspellings or dashes`, async () => {
    const mod = await import(new URL(file, dataDir).href);
    assert.deepEqual(findContentIssues(mod), []);
  });
}
