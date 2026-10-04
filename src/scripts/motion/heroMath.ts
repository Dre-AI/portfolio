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
    the overflow is cropped from the left/top, like `object-position: ax*100% ay*100%`. */
export function coverRect(boxW: number, boxH: number, imgW: number, imgH: number, ax: number, ay: number): Rect {
  const scale = Math.max(boxW / imgW, boxH / imgH);
  const w = imgW * scale;
  const h = imgH * scale;
  return { x: (boxW - w) * ax, y: (boxH - h) * ay, w, h };
}
