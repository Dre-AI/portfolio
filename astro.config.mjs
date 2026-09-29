// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served from https://dre-ai.github.io/portfolio/
// If you move to a Dre-AI.github.io repo, set base to '/' .
export default defineConfig({
  site: 'https://dre-ai.github.io',
  base: '/portfolio',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    // The style guide is noindex, so keep it out of the sitemap too.
    sitemap({ filter: (page) => !page.includes('/styleguide') }),
  ],
});
