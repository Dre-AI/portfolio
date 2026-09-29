import { gsap } from 'gsap';

const SVG_NS = 'http://www.w3.org/2000/svg';

/** "How my automations work": an SVG connector draws across the steps and each step lights up as it's reached. */
export function setupPipeline(isMobile: boolean): (() => void) | undefined {
  const list = document.querySelector<HTMLElement>('[data-pipeline]');
  const section = list?.closest<HTMLElement>('section');
  const steps = list ? [...list.querySelectorAll<HTMLElement>('[data-step]')] : [];
  if (!list || !section || steps.length < 2) return undefined;

  // The connector is decorative; the ordered list stays the real content.
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none';
  const line = document.createElementNS(SVG_NS, 'line');
  line.setAttribute('pathLength', '1');
  line.setAttribute('stroke', 'var(--accent)');
  line.setAttribute('stroke-width', '1.5');
  line.setAttribute('stroke-dasharray', '1');
  line.setAttribute('stroke-dashoffset', '1');
  svg.append(line);
  list.prepend(svg);
  list.classList.add('is-dim');

  // Node centres relative to the list; also where along the line each step sits (0..1).
  let thresholds: number[] = [];
  const measure = () => {
    const box = list.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    const centres = steps.map((step) => {
      const node = step.querySelector('.node')!.getBoundingClientRect();
      return { x: node.left + node.width / 2 - box.left, y: node.top + node.height / 2 - box.top };
    });
    const [a, b] = [centres[0], centres[centres.length - 1]];
    line.setAttribute('x1', String(a.x)); line.setAttribute('y1', String(a.y));
    line.setAttribute('x2', String(b.x)); line.setAttribute('y2', String(b.y));
    const span = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    thresholds = centres.map((c) => Math.hypot(c.x - a.x, c.y - a.y) / span);
  };
  measure();

  const light = (progress: number) => steps.forEach((step, i) => step.classList.toggle('is-on', progress >= thresholds[i] - 0.001));
  const tween = gsap.fromTo(line, { attr: { 'stroke-dashoffset': 1 } }, {
    attr: { 'stroke-dashoffset': 0 },
    ease: 'none',
    scrollTrigger: isMobile
      ? { trigger: list, start: 'top 75%', end: 'bottom 55%', scrub: true, onRefresh: measure, onUpdate: (s) => light(s.progress) }
      : { trigger: section, start: 'center center', end: () => `+=${window.innerHeight}`, pin: true, scrub: true, onRefresh: measure, onUpdate: (s) => light(s.progress) },
  });
  light(0);

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    svg.remove();
    list.classList.remove('is-dim');
    steps.forEach((step) => step.classList.remove('is-on'));
  };
}
