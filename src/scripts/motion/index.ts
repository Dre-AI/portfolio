// Motion layer (brief §6). The HTML already shows every final state; this only adds motion on top, and only
// when the <head> gate set .motion (so never under reduced motion or without JS).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setupHero } from './hero';
import { setupPipeline } from './pipeline';
import { setupTimeline } from './timeline';
import { setupCounters } from './counters';
import { setupReveal } from './reveal';
import { setupInteract } from './interact';

gsap.registerPlugin(ScrollTrigger);
// Phones: the address bar showing/hiding must not re-measure pins and make them jump.
ScrollTrigger.config({ ignoreMobileResize: true });

const DEFAULT_BREAKPOINT = 768;

function breakpoint(): number {
  try {
    const frames = document.querySelector<HTMLElement>('#hero-canvas')?.dataset.frames;
    return frames ? (JSON.parse(frames).breakpoint as number) : DEFAULT_BREAKPOINT;
  } catch {
    return DEFAULT_BREAKPOINT;
  }
}

if (document.documentElement.classList.contains('motion')) {
  const mm = gsap.matchMedia();

  // Effects, created in page order so pinned sections measure each other correctly.
  // matchMedia reverts and rebuilds them when the breakpoint or the reduced-motion setting changes.
  // gsap.matchMedia only runs the callback when at least one condition matches, so mobile and desktop are
  // complementary and one of them always does.
  const bp = breakpoint();
  mm.add(
    { mobile: `(max-width: ${bp - 1}px)`, desktop: `(min-width: ${bp}px)`, reduce: '(prefers-reduced-motion: reduce)' },
    (context) => {
      const { mobile, reduce } = context.conditions as { mobile: boolean; reduce: boolean };
      if (reduce) return undefined;
      // One short task per effect instead of one long one, still in page order so pins measure correctly.
      const setups = [() => setupHero(mobile), () => setupPipeline(mobile), setupTimeline, setupCounters, setupReveal];
      const cleanups: ((() => void) | undefined)[] = [];
      let cancelled = false;
      const next = () => {
        const setup = setups.shift();
        if (cancelled || !setup) return;
        cleanups.push(setup());
        setTimeout(next, 0);
      };
      next();
      return () => {
        cancelled = true;
        cleanups.forEach((cleanup) => cleanup?.());
      };
    },
  );

  // Mouse and trackpad only: smooth scrolling plus the pointer details; touch and keyboard stay native.
  // Anchor handling stays native so the skip link still moves keyboard focus.
  mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const stopInteract = setupInteract();
    const lenis = new Lenis({ autoRaf: false });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      stopInteract();
    };
  });
}
