import * as simpleIcons from 'simple-icons';

// Phosphor icons (regular weight), inlined at build time so they take the current colour.
// Uses import.meta.glob (Vite), so import this from Astro components only, not from node --test files.
const iconFiles = import.meta.glob('/node_modules/@phosphor-icons/core/assets/regular/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const icon = (name: string): string =>
  (iconFiles[`/node_modules/@phosphor-icons/core/assets/regular/${name}.svg`] ?? '').replace(
    '<svg ',
    '<svg aria-hidden="true" focusable="false" fill="currentColor" ',
  );

// Brand logos from simple-icons (CC0), single-colour so they take the current colour like the Phosphor set.
const brands = new Map(Object.values(simpleIcons).map((i) => [i.slug, i.path]));

export const brandIcon = (slug: string): string => {
  const path = brands.get(slug);
  return path
    ? `<svg aria-hidden="true" focusable="false" fill="currentColor" viewBox="0 0 24 24"><path d="${path}"/></svg>`
    : '';
};
