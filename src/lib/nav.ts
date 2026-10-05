/** Resolve a nav href from studio.ts: '#x' stays local on the home page, otherwise it is relative to the site base. */
export function resolveNavHref(href: string, base: string, isHome: boolean): string {
  if (href.startsWith('#') && isHome) return href;
  return `${base}${href}`;
}

export function isHomePath(pathname: string, base: string): boolean {
  return pathname === base || pathname === base.replace(/\/$/, '');
}
