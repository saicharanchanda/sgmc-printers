import type { APIRoute } from 'astro';
import { SITE } from '../config/site';

// Temporary previews (GitHub Pages, BASE_PATH set) must not be indexed — they would
// compete with the real domain as duplicate content. Production allows everything.
const isPreview = Boolean(process.env.BASE_PATH);

const production = `# ${SITE.legalName}
User-agent: *
Allow: /
Disallow: /404

Sitemap: ${SITE.url}/sitemap-index.xml
`;

const preview = `# Preview build — not for indexing
User-agent: *
Disallow: /
`;

export const GET: APIRoute = () =>
  new Response(isPreview ? preview : production, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
