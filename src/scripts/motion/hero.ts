import { gsap } from 'gsap';
import { frameAt, beatAt, coverRect } from './heroMath';

interface FrameSet { count: number; width: number; height: number; pattern: string }
interface FramesManifest { desktop: FrameSet; mobile: FrameSet; pad: number; breakpoint: number }

const FIRST_BATCH = 10; // frames loaded straight away
const CONCURRENCY = 4; // background requests in flight
const MAX_DPR = 2;
const IDLE_TIMEOUT_MS = 4000;
const PIN_SCREENS = { desktop: 3, mobile: 1 }; // mobile: never pin longer than one screen (brief §6)
const FILM_END = 0.88; // the film reaches its last frame here and holds for the closing beat
const HANDOFF_FROM = 0.92; // the last 8% of the pin dims the film into the next section
const CLUSTER = { x: 0.508, y: 0.602 }; // centre of the light cluster in the last frame (both frame sets)

/** object-position of the poster as 0..1 anchors, so the canvas crops exactly like the CSS. */
function anchors(el: HTMLElement): { ax: number; ay: number } {
  const [x = 50, y = 50] = (getComputedStyle(el).objectPosition.match(/-?[\d.]+(?=%)/g) ?? []).map(Number);
  return { ax: x / 100, ay: y / 100 };
}

/** Frame indices ordered coarse-to-fine (every 16th, then every 8th, ...) so early scrubbing already has nearby frames. */
function loadOrder(count: number): number[] {
  const seen = new Set<number>();
  const order: number[] = [];
  for (const stride of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < count; i += stride) if (!seen.has(i)) { seen.add(i); order.push(i); }
  }
  return order;
}

/** Scroll-scrubbed canvas sequence for #hero-canvas. Returns a cleanup function. */
export function setupHero(isMobile: boolean): (() => void) | undefined {
  const canvas = document.querySelector<HTMLCanvasElement>('#hero-canvas');
  const hero = canvas?.closest<HTMLElement>('#hero');
  const copy = hero?.querySelector<HTMLElement>('[data-hero-copy]');
  const poster = hero?.querySelector<HTMLElement>('.poster');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !hero || !copy || !poster || !ctx || !document.documentElement.classList.contains('motion-hero')) return undefined;

  const slides = Array.from(copy.querySelectorAll<HTMLElement>('.beat-slide'));
  const starts = JSON.parse(copy.dataset.starts ?? '[0]') as number[];
  let beat = 0;
  const showBeat = (next: number) => {
    if (next === beat) return;
    slides[beat]?.classList.remove('is-active');
    slides[next]?.classList.add('is-active');
    beat = next;
  };

  const manifest = JSON.parse(canvas.dataset.frames ?? '{}') as FramesManifest;
  const set = isMobile ? manifest.mobile : manifest.desktop;
  const url = (i: number) => canvas.dataset.base + set.pattern.replace('{n}', String(i + 1).padStart(manifest.pad, '0'));
  const images: (HTMLImageElement | undefined)[] = new Array(set.count);
  let current = 0;
  let drawn = -1;
  let cancelled = false;
  let anchor = anchors(poster);

  // The first batch is decoded up front so it draws instantly. Background frames only download; the browser
  // decodes each one when it is drawn, which keeps CPU and memory low while the rest stream in.
  const load = (i: number, decode = false) =>
    new Promise<void>((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = url(i);
      const ready = decode ? img.decode() : new Promise<void>((ok, fail) => { img.onload = () => ok(); img.onerror = fail; });
      ready.then(() => { if (!cancelled) images[i] = img; }, () => {}).finally(resolve);
    });

  // Nearest loaded frame, so scrubbing never shows a blank canvas while frames stream in.
  const nearest = (i: number) => {
    for (let d = 0; d < set.count; d++) {
      if (images[i - d]) return i - d;
      if (images[i + d]) return i + d;
    }
    return -1;
  };

  const draw = () => {
    const i = nearest(current);
    const img = images[i];
    if (!img || i === drawn) return;
    const { x, y, w, h } = coverRect(canvas.width, canvas.height, img.naturalWidth, img.naturalHeight, anchor.ax, anchor.ay);
    ctx.drawImage(img, x, y, w, h); // cover, cropped like the poster's object-position
    drawn = i;
  };

  // Where the light cluster lands on screen (CSS px; the canvas fills the hero), so the closing beat's
  // monogram sits on it.
  const placeCluster = () => {
    const r = coverRect(hero.clientWidth, hero.clientHeight, set.width, set.height, anchor.ax, anchor.ay);
    hero.style.setProperty('--cluster-x', `${Math.round(r.x + r.w * CLUSTER.x)}px`);
    hero.style.setProperty('--cluster-y', `${Math.round(r.y + r.h * CLUSTER.y)}px`);
  };
  placeCluster();

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    anchor = anchors(poster);
    placeCluster();
    drawn = -1;
    draw();
  };

  // First batch now; once frame 1 is in, the canvas takes over from the poster.
  const first = Array.from({ length: Math.min(FIRST_BATCH, set.count) }, (_, i) => i);
  Promise.all(first.map((i) => load(i, true))).then(() => {
    if (cancelled) return;
    canvas.hidden = false;
    resize();
    hero.classList.add('is-live');
  });

  // Everything else waits for the first scroll or an idle moment, whichever comes first.
  let started = false;
  const rest = loadOrder(set.count).filter((i) => i >= FIRST_BATCH);
  const startRest = () => {
    if (started || cancelled) return;
    started = true;
    window.removeEventListener('scroll', startRest);
    const worker = async () => {
      while (rest.length && !cancelled) { await load(rest.shift()!); draw(); }
    };
    for (let n = 0; n < CONCURRENCY; n++) worker();
  };
  window.addEventListener('scroll', startRest, { once: true, passive: true });
  const idle = 'requestIdleCallback' in window
    ? window.requestIdleCallback(startRest, { timeout: IDLE_TIMEOUT_MS })
    : window.setTimeout(startRest, IDLE_TIMEOUT_MS);

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  const screens = isMobile ? PIN_SCREENS.mobile : PIN_SCREENS.desktop;
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: () => `+=${window.innerHeight * screens}`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const next = frameAt(self.progress, set.count, FILM_END);
        if (next !== current) { current = next; requestAnimationFrame(draw); }
        showBeat(beatAt(self.progress, starts));
      },
    },
  });
  // The hand-off fills the last 8% of the pin, so the timeline spans exactly 0..1 of the scroll.
  gsap.set(hero, { '--handoff': 0 });
  timeline.to(hero, { '--handoff': 1, ease: 'none', duration: 1 - HANDOFF_FROM }, HANDOFF_FROM);

  return () => {
    cancelled = true;
    observer.disconnect();
    window.removeEventListener('scroll', startRest);
    if ('cancelIdleCallback' in window) window.cancelIdleCallback(idle as number); else window.clearTimeout(idle as number);
    hero.classList.remove('is-live');
    canvas.hidden = true;
    ['--handoff', '--cluster-x', '--cluster-y'].forEach((p) => hero.style.removeProperty(p));
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === 0));
  };
}
