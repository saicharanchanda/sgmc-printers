// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config/site.ts';

const buildDate = new Date();

/** Sitemap hints: home first, then hub pages, then detail pages. */
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const pageMeta = (/** @type {string} */ url) => {
  const path = new URL(url).pathname.slice(base.length) || '/';
  if (path === '/') return { priority: 1.0, changefreq: 'weekly' };
  if (/^\/(services|products)\/$/.test(path)) return { priority: 0.9, changefreq: 'monthly' };
  if (/^\/(services|products)\/[^/]+\/$/.test(path)) return { priority: 0.8, changefreq: 'monthly' };
  if (/^\/contact\/$/.test(path)) return { priority: 0.8, changefreq: 'yearly' };
  return { priority: 0.6, changefreq: 'yearly' };
};

export default defineConfig({
  site: SITE.url,
  // Only set for the temporary GitHub Pages preview (served from /<repo>/)
  base: process.env.BASE_PATH || undefined,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // P2-4: the 'Additional Printing Services' page moved from colour-options to printing-options
  redirects: { '/products/colour-options/': '/products/printing-options/' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/colour-options'),
      serialize: (item) => ({ ...item, lastmod: buildDate.toISOString(), ...pageMeta(item.url) }),
    }),
  ],
});
