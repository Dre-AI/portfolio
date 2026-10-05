import { gsap } from 'gsap';

/** Selected work: the one orchestrated reveal. The case cards rise in together, once. */
export function setupReveal(): (() => void) | undefined {
  const cards = gsap.utils.toArray<HTMLElement>('#work [data-card]');
  if (!cards.length) return undefined;

  const tween = gsap.from(cards, {
    y: 24,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.out',
    stagger: 0.08,
    clearProps: 'transform,opacity',
    scrollTrigger: { trigger: cards[0], start: 'top 85%', once: true },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.revert();
  };
}
