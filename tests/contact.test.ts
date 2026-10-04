import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contactConfig, hasForm, hasBooking } from '../src/data/contact.ts';

test('contact services start unconfigured and fall back to email', () => {
  assert.equal(hasForm(), contactConfig.web3formsKey !== '');
  assert.equal(hasForm({ web3formsKey: ' ', calLink: '' }), false);
  assert.equal(hasForm({ web3formsKey: 'abc-123', calLink: '' }), true);
});

test('booking only accepts a cal.com https link', () => {
  assert.equal(hasBooking({ web3formsKey: '', calLink: 'https://cal.com/derrick/intro' }), true);
  assert.equal(hasBooking({ web3formsKey: '', calLink: 'http://cal.com/x' }), false);
  assert.equal(hasBooking({ web3formsKey: '', calLink: 'https://evil.example/cal.com/' }), false);
});
