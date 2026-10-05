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
  // Gradient stroke (cyan fading to silver) along the connector, in the list's own pixel space.
  const defs = document.createElementNS(SVG_NS, 'defs');
  const gradient = document.createElementNS(SVG_NS, 'linearGradient');
  gradient.id = 'pipe-gradient';
  gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
  [['0', 'var(--accent)'], ['0.55', 'var(--accent)'], ['1', 'rgb(var(--silver-rgb))']].forEach(([offset, colour]) => {
    const stop = document.createElementNS(SVG_NS, 'stop');
    stop.setAttribute('offset', offset);
    stop.style.stopColor = colour; // CSS variables resolve in style, not in presentation attributes
    gradient.append(stop);
  });
  defs.append(gradient);
  const makeLine = (className: string, width: string, dash: string) => {
    const el = document.createElementNS(SVG_NS, 'line');
    el.setAttribute('class', className);
    el.setAttribute('pathLength', '1');
    el.setAttribute('stroke-width', width);
    el.setAttribute('stroke-linecap', 'round');
    el.setAttribute('stroke-dasharray', dash);
    return el;
  };
  const line = makeLine('pipe-line', '2.5', '1');
  line.setAttribute('stroke', 'url(#pipe-gradient)');
  line.setAttribute('stroke-dashoffset', '1');
  // A short bright dash that loops along the finished connector (CSS animates it; see Pipeline.astro).
  const packet = makeLine('pipe-packet', '4', '0.08 1');
  packet.setAttribute('stroke', '#e0fbff');
  svg.append(defs, line, packet);
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
    for (const el of [line, packet, gradient]) {
      el.setAttribute('x1', String(a.x)); el.setAttribute('y1', String(a.y));
      el.setAttribute('x2', String(b.x)); el.setAttribute('y2', String(b.y));
    }
    const span = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    thresholds = centres.map((c) => Math.hypot(c.x - a.x, c.y - a.y) / span);
  };
  measure();

  const light = (progress: number) => {
    steps.forEach((step, i) => step.classList.toggle('is-on', progress >= thresholds[i] - 0.001));
    list.classList.toggle('is-complete', progress >= 0.999);
  };
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
    list.classList.remove('is-dim', 'is-complete');
    steps.forEach((step) => step.classList.remove('is-on'));
  };
}
