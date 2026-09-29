import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DRAW = { start: 'top 70%', end: 'bottom 70%' }; // the line's head sits 70% down the viewport

/** Experience: the rail draws down as you scroll and each dot fills as the line passes it. */
export function setupTimeline(): (() => void) | undefined {
  const list = document.querySelector<HTMLElement>('[data-timeline]');
  if (!list) return undefined;
  const items = [...list.querySelectorAll<HTMLElement>(':scope > li')];

  const fill = document.createElement('span');
  fill.className = 'tl-fill';
  fill.setAttribute('aria-hidden', 'true');
  list.prepend(fill);

  const tween = gsap.fromTo(fill, { scaleY: 0 }, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: list, ...DRAW, scrub: true },
  });
  // Filled once the line passes, emptied again only when scrolling back above it.
  const dots = items.map((item) => ScrollTrigger.create({
    trigger: item,
    start: DRAW.start,
    onEnter: () => item.classList.add('is-passed'),
    onLeaveBack: () => item.classList.remove('is-passed'),
  }));

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    dots.forEach((dot) => dot.kill());
    items.forEach((item) => item.classList.remove('is-passed'));
    fill.remove();
  };
}
