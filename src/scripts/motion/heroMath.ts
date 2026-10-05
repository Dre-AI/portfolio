// Pure scroll maths for the hero scrubber (no DOM), tested in tests/heroMath.test.ts.

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** Frame index for a scroll progress. The film reaches its last frame at `filmEnd` and holds after that. */
export function frameAt(progress: number, count: number, filmEnd: number): number {
  return clamp(Math.round((progress / filmEnd) * (count - 1)), 0, count - 1);
}

/** Index of the last beat whose start is at or before `progress` (0 before the first start). */
export function beatAt(progress: number, starts: number[]): number {
  let index = 0;
  starts.forEach((start, i) => { if (progress >= start) index = i; });
  return index;
}

export interface Rect { x: number; y: number; w: number; h: number }

/** Where an image lands when drawn with `object-fit: cover` into a box. `ax`/`ay` (0..1) say which share of
    the overflow is cropped from the left/top, like `object-position: ax*100% ay*100%`. `shift` then moves the
    frame right by that share of the box width (CSS: `object-position: calc(ax*100% + shift*100vw) ...`). */
export function coverRect(boxW: number, boxH: number, imgW: number, imgH: number, ax: number, ay: number, shift = 0): Rect {
  const scale = Math.max(boxW / imgW, boxH / imgH);
  const w = imgW * scale;
  const h = imgH * scale;
  return { x: (boxW - w) * ax + shift * boxW, y: (boxH - h) * ay, w, h };
}

export const FRAME_SHIFT = 0.18; // share of the width the film moves right on wide screens, clear of the copy
const SHIFT_FROM = 1024; // no shift at or below this width
const SHIFT_FULL = 1440; // full shift from this width
const SHIFT_RAMP = (FRAME_SHIFT * SHIFT_FULL) / (SHIFT_FULL - SHIFT_FROM); // px of shift per px of width

/** How far right (share of the box width) the film is drawn at a given width: none up to 1024px, then the
    shift in px grows linearly until it reaches FRAME_SHIFT of the width at 1440px and holds there. Linear in
    px so CSS can mirror it: `clamp(0px, (100vw - 1024px) * 0.6231, 18vw)` (--frame-shift in Hero.astro). */
export function frameShift(width: number): number {
  if (width <= SHIFT_FROM) return 0;
  return Math.min(FRAME_SHIFT, ((width - SHIFT_FROM) * SHIFT_RAMP) / width);
}
