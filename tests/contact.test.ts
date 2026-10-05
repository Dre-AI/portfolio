import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contactConfig, hasForm, hasBooking } from '../src/data/contact.ts';

test('form falls back to email only when no key is set', () => {
  assert.equal(hasForm(), contactConfig.web3formsKey !== '');
  assert.equal(hasForm({ web3formsKey: ' ', calLink: '' }), false);
  assert.equal(hasForm({ web3formsKey: 'abc-123', calLink: '' }), true);
});

test('booking only accepts a cal.com https link', () => {
  assert.equal(hasBooking({ web3formsKey: '', calLink: 'https://cal.com/derrick/intro' }), true);
  assert.equal(hasBooking({ web3formsKey: '', calLink: 'http://cal.com/x' }), false);
  assert.equal(hasBooking({ web3formsKey: '', calLink: 'https://evil.example/cal.com/' }), false);
});

test('live config: Web3Forms key and Cal.com booking are both active', () => {
  assert.match(contactConfig.web3formsKey, /^[0-9a-f-]{36}$/);
  assert.equal(hasForm(), true);
  assert.equal(hasBooking(), true);
});
