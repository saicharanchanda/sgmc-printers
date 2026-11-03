// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config/site.ts';

export default defineConfig({
  site: SITE.url,
  // Only set for the temporary GitHub Pages preview (served from /<repo>/)
  base: process.env.BASE_PATH || undefined,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
