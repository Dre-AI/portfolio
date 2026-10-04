import { gsap } from 'gsap';

const MAGNET_PULL = 0.25; // share of the pointer's offset a magnetic button follows
const MAGNET_MAX_PX = 8;

/** Pointer-driven details for mouse and trackpad: card spotlights, the hero's cursor light and parallax,
    and magnetic buttons. Everything is CSS custom properties or transforms, updated at most once a frame. */
export function setupInteract(): () => void {
  const cleanups: (() => void)[] = [];
  const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement, type: K, fn: (e: HTMLElementEventMap[K]) => void) => {
    el.addEventListener(type, fn as EventListener, { passive: true });
    cleanups.push(() => el.removeEventListener(type, fn as EventListener));
  };
  // Coalesce pointer events to one style write per frame.
  const perFrame = (write: (e: PointerEvent) => void) => {
    let last: PointerEvent | null = null;
    let queued = false;
    return (e: PointerEvent) => {
      last = e;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; if (last) write(last); });
    };
  };

  // Cards: the spotlight follows the pointer (see .card::before in global.css).
  document.querySelectorAll<HTMLElement>('.card').forEach((card) => {
    on(card, 'pointermove', perFrame((e) => {
      const box = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - box.left}px`);
      card.style.setProperty('--my', `${e.clientY - box.top}px`);
    }));
  });

  // Hero: cursor light plus a slight parallax on the video.
  const hero = document.querySelector<HTMLElement>('#hero');
  if (hero) {
    on(hero, 'pointermove', perFrame((e) => {
      const box = hero.getBoundingClientRect();
      const x = (e.clientX - box.left) / box.width;
      const y = (e.clientY - box.top) / box.height;
      hero.style.setProperty('--hx', `${x * 100}%`);
      hero.style.setProperty('--hy', `${y * 100}%`);
      hero.style.setProperty('--px', (x * 2 - 1).toFixed(3));
      hero.style.setProperty('--py', (y * 2 - 1).toFixed(3));
    }));
    on(hero, 'pointerleave', () => { ['--px', '--py'].forEach((p) => hero.style.setProperty(p, '0')); });
  }

  // Magnetic buttons ease toward the pointer and spring back on leave.
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((btn) => {
    const toX = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
    const toY = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
    const clamp = gsap.utils.clamp(-MAGNET_MAX_PX, MAGNET_MAX_PX);
    on(btn, 'pointermove', (e) => {
      const box = btn.getBoundingClientRect();
      toX(clamp((e.clientX - (box.left + box.width / 2)) * MAGNET_PULL));
      toY(clamp((e.clientY - (box.top + box.height / 2)) * MAGNET_PULL));
    });
    on(btn, 'pointerleave', () => { toX(0); toY(0); });
    cleanups.push(() => gsap.set(btn, { clearProps: 'transform' }));
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
