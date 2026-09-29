// @ts-check
import { defineConfig } from 'astro/config';

// Served from https://dre-ai.github.io/portfolio/
// If you move to a Dre-AI.github.io repo, set base to '/' .
export default defineConfig({
  site: 'https://dre-ai.github.io',
  base: '/portfolio',
  output: 'static',
  trailingSlash: 'ignore',
});
