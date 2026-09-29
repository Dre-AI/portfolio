import { gsap } from 'gsap';

const DURATION = 0.7;

/** Proof strip: numbers count up once when they come into view. Values like "99%+" keep their prefix and suffix. */
export function setupCounters(): (() => void) | undefined {
  const counters = [...document.querySelectorAll<HTMLElement>('[data-count]')];
  if (!counters.length) return undefined;

  const tweens = counters.flatMap((el) => {
    const match = (el.dataset.count ?? '').match(/^(\D*)([\d,]*\.?\d+)(.*)$/);
    if (!match) return []; // not numeric: leave as written
    const [, prefix, number, suffix] = match;
    const target = Number(number.replace(/,/g, ''));
    const decimals = (number.split('.')[1] ?? '').length;
    const format = (n: number) => prefix + n.toLocaleString('en', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    const state = { value: 0 };
    return [gsap.to(state, {
      value: target,
      duration: DURATION,
      ease: 'power2.out',
      onStart: () => { el.textContent = format(0); },
      onUpdate: () => { el.textContent = format(state.value); },
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })];
  });

  return () => {
    tweens.forEach((tween) => { tween.scrollTrigger?.kill(); tween.kill(); });
    counters.forEach((el) => { el.textContent = el.dataset.count ?? el.textContent; });
  };
}
