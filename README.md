# SGMC Printers — Website

Static marketing site for **Shree Gayatri Multi Colour Printers**, built with **Astro 5**, GSAP + Lenis for motion, and zero backend. Hosted free on Cloudflare Pages.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run icons      # regenerate favicons + og-image.png after branding changes
```

## Project structure

```
src/
  config/site.ts        ← ALL business details (name, phone, address, domain, hours, stats…)
  data/services.ts      ← 6 services → each gets its own SEO page at /services/<slug>/
  docs/client-brief.md  ← client-supplied content (source of truth)
  data/products.ts      ← 6 product categories → /products/<slug>/
  data/faqs.ts          ← homepage FAQ (also output as FAQ rich-result schema)
  assets/images/        ← drop real photos here (see below)
  components/           ← Header, Footer, Media, CTA, FAQ, ContactForm, PageHero…
  layouts/BaseLayout    ← <head>, SEO meta, Open Graph, JSON-LD structured data
  pages/                ← routes: /, /services/, /services/*, /products/, /about/, /contact/, 404
  scripts/main.ts       ← smooth scroll, animations, mobile menu, form, filters
  styles/global.css     ← design system (CMYK brand)
public/                 ← favicon, icons, og-image, manifest, _headers
```

## ✅ Before launch — client checklist

1. **`src/config/site.ts`** — replace every value marked `// TODO`:
   domain, phone, WhatsApp number, email, full address, city/state, map coordinates,
   Google Maps embed URL, opening hours, founded year, stats, social links.
2. **Logo** — replace the placeholder mark in `src/components/Logo.astro` and `public/favicon.svg`, then `npm run icons`.
3. **Photos** — the site currently uses **free stock photos** (Unsplash/Pexels, listed in `docs/image-credits.md`) as stand-ins.
   Replace them with the client's real photos by saving files with the **same names** in `src/assets/images/` — no code changes:
   `hero-1..4` (home slideshow), `band-press` (infrastructure band), `bg-*` (page headers), `bg-<service-slug>` + `<service-slug>` (service pages),
   `cat-<product-slug>` (product categories), `home-about`, `about-heritage`, `facility-1..3`.
4. **Machines** — `machineGroups` in `src/config/site.ts` (already filled from the client brief).
5. **Content** — real company story & timeline (`src/pages/about.astro`), actual machines in `src/data/services.ts`.
6. **Contact form** — get a free access key at <https://web3forms.com> using the client's email and set `web3formsKey`.
   Without a key, the form sends the enquiry via WhatsApp instead.

## 🚀 Deploy (free) — Cloudflare Pages + GoDaddy domain

1. Push this folder to a GitHub repository.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
   - Framework preset: **Astro** · Build command: `npm run build` · Output: `dist`
   - Environment variable: `NODE_VERSION` = `20`
3. Every push to `main` now redeploys automatically. You get a `*.pages.dev` URL.
4. **Custom domain:** Pages project → **Custom domains → Set up a domain** → `www.yourdomain.com`.
   - Easiest: add the domain to Cloudflare (free plan) and change the nameservers in **GoDaddy → Domain → DNS → Nameservers** to the two Cloudflare gives you. Then also add the apex domain and a redirect `yourdomain.com → www`.
   - Alternative (keep GoDaddy DNS): add a `CNAME` record `www → <project>.pages.dev` in GoDaddy.
5. SSL is automatic.

## 📈 After launch — SEO setup (important for local ranking)

1. **Google Search Console** — add the domain, verify, submit `https://www.yourdomain.com/sitemap-index.xml`.
2. **Google Business Profile** — create/claim the listing with the *exact same* name, address and phone as the site (NAP consistency), add the website URL, photos and categories ("Printing service", "Offset printing service"). Ask happy clients for Google reviews — this is the #1 local ranking factor.
3. **Bing Webmaster Tools** — import from Search Console.
4. Test structured data: <https://search.google.com/test/rich-results>
5. Test speed: <https://pagespeed.web.dev>

## What's built in

- Per-page titles, descriptions, canonical URLs, Open Graph/Twitter cards
- JSON-LD: LocalBusiness (address, geo, hours), WebSite, BreadcrumbList, Service, FAQPage, OfferCatalog
- Auto sitemap (`/sitemap-index.xml`, all 18 pages with lastmod + priority) and `/robots.txt`, clean URLs, 404 page
- Preview builds (GitHub Pages, `BASE_PATH` set) are `noindex` with `Disallow: /`, so the temporary github.io copy never competes with the real domain
- Dedicated SEO landing page per service (`/services/offset-printing/` etc.)
- Responsive images (AVIF/WebP), self-hosted fonts, ~50 KB gzipped JS, prefetching
- View transitions between pages, smooth scrolling, scroll animations (disabled for reduced-motion users)
- Accessible: skip link, semantic landmarks, keyboard-friendly menu, focus styles
