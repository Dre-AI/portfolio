import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateBrief } from '../src/lib/validateBrief.ts';
import { contactCopy } from '../src/data/studio.ts';

const valid = { name: 'Amina', email: 'amina@example.com', message: 'I need a new website for my bakery.' };

test('empty fields fail with the data messages', () => {
  assert.deepEqual(validateBrief({ name: '', email: '', message: '' }), contactCopy.errors);
});

test('whitespace-only name fails', () => {
  assert.deepEqual(Object.keys(validateBrief({ ...valid, name: '   ' })), ['name']);
});

test('bad email fails only the email field', () => {
  for (const email of ['name@', 'name', 'a@b', 'a b@c.com']) {
    assert.deepEqual(validateBrief({ ...valid, email }), { email: contactCopy.errors.email }, email);
  }
});

test('short message fails, ten characters passes', () => {
  assert.deepEqual(validateBrief({ ...valid, message: 'too short' }), { message: contactCopy.errors.message });
  assert.deepEqual(validateBrief({ ...valid, message: '0123456789' }), {});
});

test('valid input returns no errors', () => {
  assert.deepEqual(validateBrief(valid), {});
});
