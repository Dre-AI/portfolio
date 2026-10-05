import { test } from 'node:test';
import assert from 'node:assert/strict';
import { frameAt, beatAt, coverRect, frameShift } from '../src/scripts/motion/heroMath.ts';

test('film reaches the last frame at filmEnd and holds', () => {
  assert.equal(frameAt(0, 217, 0.88), 0);
  assert.equal(frameAt(0.88, 217, 0.88), 216);
  assert.equal(frameAt(1, 217, 0.88), 216);
  assert.equal(frameAt(0.44, 217, 0.88), 108);
  assert.equal(frameAt(-1, 217, 0.88), 0);
});

test('beat index follows the starts', () => {
  const starts = [0, 0.3, 0.6, 0.85];
  assert.equal(beatAt(0, starts), 0);
  assert.equal(beatAt(0.29, starts), 0);
  assert.equal(beatAt(0.3, starts), 1);
  assert.equal(beatAt(0.7, starts), 2);
  assert.equal(beatAt(0.99, starts), 3);
});

test('cover fits a 16:9 frame exactly into a 16:9 box', () => {
  assert.deepEqual(coverRect(1280, 720, 1280, 720, 1, 0.3), { x: 0, y: 0, w: 1280, h: 720 });
});

test('cover crops the left side when anchored right in a narrower box', () => {
  // 1440x900: scale 1.25 -> 1600x900, 160px overflow all taken from the left.
  assert.deepEqual(coverRect(1440, 900, 1280, 720, 1, 0.3), { x: -160, y: 0, w: 1600, h: 900 });
});

test('cover splits vertical overflow by the y anchor in a wider box', () => {
  // 2560x1080: scale 2 -> 2560x1440, 360px overflow, 30% of it above.
  assert.deepEqual(coverRect(2560, 1080, 1280, 720, 1, 0.3), { x: 0, y: -108, w: 2560, h: 1440 });
});

test('cover can shift the drawn frame right by a share of the box width', () => {
  // 1440x900 anchored right: x = -160, then +18% of 1440 = +259.2.
  const shifted = coverRect(1440, 900, 1280, 720, 1, 0.3, 0.18);
  assert.ok(Math.abs(shifted.x - 99.2) < 1e-9, String(shifted.x));
  assert.deepEqual({ ...shifted, x: 0 }, { x: 0, y: 0, w: 1600, h: 900 });
  assert.deepEqual(coverRect(1440, 900, 1280, 720, 1, 0.3), coverRect(1440, 900, 1280, 720, 1, 0.3, 0));
});

test('frame shift is 0 up to 1024px, eases in, and holds at 18% from 1440px', () => {
  const px = (w: number) => frameShift(w) * w;
  assert.equal(frameShift(375), 0);
  assert.equal(frameShift(1024), 0);
  assert.ok(Math.abs(px(1440) - 259.2) < 1e-9); // 18% of 1440
  assert.ok(Math.abs(px(1232) - 129.6) < 1e-9); // halfway in px: the ramp is linear, like the CSS clamp()
  assert.equal(frameShift(2560), 0.18);
});
