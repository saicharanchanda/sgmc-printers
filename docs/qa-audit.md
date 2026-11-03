# SGMC Printers v4 — Senior QA & UX Audit

Nov 4, 2026 · @charan

https://saicharanchanda.github.io/sgmc-printers/v4/

## Executive summary

This is a well-engineered site with two layout failures that would embarrass the business in front of a customer, and a set of content and trust gaps that stop it reading like a printer that has been running since 1965. The underlying build quality is high — clean heading structure, alt text on every image, no console errors, 332 KB mobile homepage, zero broken links across 19 pages. The problems are concentrated, not systemic, and most are a day's work.

Two defects are urgent. On **/services/**, the five "Our process" cards overlap each other by 127–137 px at every desktop width, cutting each card's text off mid-word. On **/contact/**, the map forces the page to render in a 751 px canvas on every phone, so the whole page displays at roughly half scale. Both are single-line CSS fixes.

### The 10 biggest problems

| # | Problem | Page(s) | Priority |
| --- | --- | --- | --- |
| 1 | "Our process" cards overlap by 127–137 px and text is clipped mid-word | /services/ | P0 |
| 2 | Map forces a 751 px layout; page renders at \~50% scale on all phones | /contact/ | P0 |
| 3 | Quote form has no email backend — every enquiry depends on WhatsApp opening | all (form) | P0 |
| 4 | Phone validation is silently broken; "not a phone at all" passes | all (form) | P0 |
| 5 | "Photo coming soon" appears 9 times on the machinery page | /infrastructure/ | P1 |
| 6 | Every photo on the site is stock; none shows the actual press or team | all | P1 |
| 7 | Broken auto-generated labels: "Explore web", "Need pre-press & ctp?", "Planning specialised?" | 12 pages | P1 |
| 8 | Footer credits three typefaces the site does not use | all 19 | P1 |
| 9 | Six product pages are too thin to rank or to answer a buyer's questions | /products/\* | P1 |
| 10 | No founding story, no founder, no milestones — the 1965 claim is asserted, never evidenced | /about/ | P1 |

### Which pages need the most attention

1. **/contact/** — the conversion page, and the only page with a P0 rendering failure on mobile.
2. **/services/** — the P0 desktop overlap, plus six broken button labels.
3. **/infrastructure/** — nine "Photo coming soon" placeholders on the page meant to prove capability.
4. **The six /products/ detail pages** — roughly 60 words of unique copy each.
5. **/about/** — the heritage page that does not tell the heritage story.

### Which content should be rewritten

The services page hero lead (generic agency language), all six product detail pages (too thin), the About story section (no actual history), the footer colophon (factually wrong), and every auto-generated CTA heading and button label.

### Most urgent responsive issues

The contact map at every width below 768 px, and the services process grid at every width above 1000 px. Nothing else on the site produces a horizontal overflow a visitor would notice.

### What to fix first

In order: the two CSS one-liners, the form's email backend and phone pattern, then the nine machine photos. That is roughly a day of work and it removes every P0 and the worst of the trust problem.

### What would make this look like a premium printing company's site

Real photographs. The design system here is already good — the navy and gold palette is restrained, the type scale is calm, the spacing is generous. What undercuts it is that every single image is a stock photo of someone else's press, and the page that should prove 61 years of capability says "Photo coming soon" nine times. One afternoon with a camera on the shop floor — the Komori running, a stack of finished textbooks, the CTP unit, the bindery, and the four people named on the About page — would do more for credibility than any redesign. After that: a short, specific founding story with dates and names, and three real customer references.

## Method and scope

Every finding below was reproduced in a real Chrome browser, not read out of the HTML. The site was rebuilt locally from the exact source behind the live preview and served over HTTP, then driven with Chrome via Playwright: 19 pages × 11 viewports = 209 page loads, each scrolled top to bottom to trigger lazy loading and scroll reveals, then measured in-page for element geometry, overflow, clipping, tap-target size, computed fonts and image distortion. axe-core 4.x was injected into all 19 pages at WCAG 2.0/2.1/2.2 A + AA plus best-practice rules.

**What was audited.** Branch `design-v4`, commit `166116a` ("v4 home: replace 'Contents' list with product photo cards; calmer type scale"), built with `BASE_PATH=/sgmc-printers/v4` and `scripts/apply-base.mjs`, exactly as the GitHub Pages workflow does. Heading sequence and section content were compared against the live URL to confirm the local build matches what is deployed — they are identical.

**Verified** — reproduced with measurements or screenshots: all layout and overflow findings, accessibility violations, form validation behaviour, mobile menu behaviour, FAQ accordion, link integrity, page weight and request counts, and all copy quoted in this report.

**NOT VERIFIED** — could not be tested from this environment, flagged as such wherever they appear:

| Item | Why | What to test manually |
| --- | --- | --- |
| Google Maps embed rendering | `google.com` is unreachable from the test sandbox; the iframe rendered as an empty grey box | Open /contact/ on a real connection and confirm the map tiles load |
| WhatsApp deep links (13 of them) | Not opened, to avoid sending real enquiries | Tap each on a phone with WhatsApp installed; confirm the number and prefilled text |
| `tel:` and `mailto:` links | Cannot dial from a headless browser | Tap on a real phone |
| Web3Forms submission | No access key is configured, so the path is dead code | Configure a key, then submit a test enquiry |
| Hero background video playback | Loaded (1.9 MB) but autoplay in headless Chrome is not representative | Check on real desktop Chrome, Safari and Firefox |
| Real-device rendering | Chrome device emulation only; no iOS Safari or Android Chrome | Spot-check /contact/ and /services/ on a real iPhone and Android |
| Core Web Vitals | Field data needs real users; lab numbers from a sandbox would mislead | Run PageSpeed Insights after the production domain is live |

No Lighthouse scores or Core Web Vitals figures are quoted anywhere in this report, because none were measured. Page weights and request counts below are real measurements from the test browser. Nothing on the site was changed.

## Phase 1 — Page inventory and link crawl

**19 pages. Every internal link, anchor and asset resolves. No 404s, no orphans, no dead anchors.** This is the cleanest part of the site.

| # | Page | URL | Type | In nav |
| --- | --- | --- | --- | --- |
| 1 | Home | `/` | Landing | Yes |
| 2 | Services | `/services/` | Hub | Yes |
| 3 | Web Offset Printing | `/services/web-offset-printing/` | Detail | Footer |
| 4 | Sheet-Fed Offset Printing | `/services/sheet-fed-offset-printing/` | Detail | Footer |
| 5 | Pre-Press & CTP | `/services/prepress/` | Detail | Footer |
| 6 | Binding & Finishing | `/services/binding-finishing/` | Detail | Footer |
| 7 | Single to Full-Colour Printing | `/services/colour-printing/` | Detail | Footer |
| 8 | Bulk & Short-Run Printing | `/services/bulk-printing/` | Detail | Footer |
| 9 | Products | `/products/` | Hub | Yes |
| 10 | Books & Educational | `/products/books-educational/` | Detail | Footer |
| 11 | Publications & Commercial | `/products/publications/` | Detail | Footer |
| 12 | Advertising & Promotional | `/products/advertising-promotional/` | Detail | Footer |
| 13 | Packaging & Label | `/products/packaging-labels/` | Detail | Footer |
| 14 | Specialised | `/products/specialised/` | Detail | Footer |
| 15 | Additional Printing Services | `/products/colour-options/` | Detail | Footer |
| 16 | Infrastructure | `/infrastructure/` | Content | Yes |
| 17 | About | `/about/` | Content | Yes |
| 18 | Contact | `/contact/` | Conversion | Yes |
| 19 | 404 | `/404.html` | Error | No |

### Interactive elements and outbound links

| Element | Count | Target | Status |
| --- | --- | --- | --- |
| Internal page links | 30 distinct | All 19 pages + 12 prefilled contact URLs | All resolve |
| In-page anchors | 14 | `#main`, `#contents`, 12 service/product jump links | All have matching IDs |
| WhatsApp deep links | 13 | `wa.me/919701099777`, each with a service-specific prefilled message | NOT VERIFIED (not opened) |
| Phone links | 2 | `+919701099777` (Ramesh), `+919949177795` (Gopal Krishna) | NOT VERIFIED |
| Email link | 1 | `sgmcprinters@gmail.com` | NOT VERIFIED |
| Google Maps links | 2 | Amberpet head office, Choutuppal branch | Resolve to valid search URLs |
| Quote form | 1 component | Rendered on `/` and `/contact/` | See Phase 5 |
| FAQ accordions | 5 on `/`, 2 per service page | Native `<details>` | Working |
| Mobile menu | 1 | 6 links | Working |
| Floating WhatsApp button | 1 per page | `wa.me` | Present on all 19 |

### Notes on the inventory

**The slug and the title disagree on one page.** `/products/colour-options/` is titled "Additional Printing Services" everywhere in the UI. The URL says one thing, the page says another. Rename the slug to `/products/printing-options/` (or retitle the category) and add a redirect, before the site is indexed.

**Two features are built but not used anywhere.** The product filter bar (`initFilter`, `.filter` CSS) and the hero slideshow with dot controls (`initSlideshow`, `.hero__dots` CSS) both ship in the bundle; neither has any markup on any page — the filter bar does not exist on `/products/`, and the hero carries one image, not a set. This is dead code, not a bug, but it is worth deleting.

**There is no sitemap page, no search, and no blog.** All reasonable omissions for a site this size.

## Phase 2 — CSS and responsive testing

Tested at 1920×1080, 1440×900, 1366×768, 1280×800, 1024×768, 768×1024, 430×932, 390×844, 375×812, 360×800 and 320×568. Two genuine layout failures, one cosmetic overflow, and a structural warning about how overflow is being handled.

### R-01 — "Our process" cards overlap and clip their own text · /services/ · CRITICAL

**Viewports:** every width ≥ 1000 px (1024, 1280, 1366, 1440, 1920 all reproduce).

**Measured.** Each of the five `.process-step` cards renders 380 px wide inside a grid cell of 238–248 px. Every card overlaps the next by **127 px** at 1440/1920 and **137 px** at 1280. The last card's right edge sits **151–161 px past the container**, and 51–119 px past the viewport at 1280–1440. Because each card has an opaque white background, each one paints over its neighbour's body text, truncating it mid-word: "Share your product, quantit…", "Files are checked and impos…", "Your job runs on our web off…", "Folding, perfect binding or p…". The five cards also merge visually into one white slab, so the card design is lost entirely.

**Root cause.** `global.css` line \~466:

```css
@media (min-width: 1000px) {
  .process-step { width: 380px; min-height: 330px; padding: 2.4rem; }
}
```

That fixed width was written for the home page, where the steps sit in a horizontal flex track (`.process__track`) inside `.process.no-pin`. The services page reuses the same `.process-step` class inside an ordinary auto-fit grid, with no `.process` ancestor — so it inherits the 380 px width with nothing to accommodate it. The home page is unaffected: its five cards measure 379 px in a flex-wrap track and sit correctly.

**Fix.** Scope the width to the context it was written for:

```css
@media (min-width: 1000px) {
  .process .process__track > .process-step { width: 380px; }
  .process-step { min-height: 330px; padding: 2.4rem; }  /* width: auto */
}
```

Verify afterwards that the services grid falls back to `repeat(auto-fit, minmax(min(100%,200px),1fr))` as its inline style intends.

### R-02 — Map forces a 751 px layout; whole page renders at \~50% scale · /contact/ · CRITICAL

**Viewports:** 430, 390, 375, 360, 320 — every mobile width tested.

**Measured.** `.map` computes to **731.42 px wide inside a 335 px container**. The document's scroll width becomes 751 px against a 375 px viewport (+376 px; +431 px at 320). The header stretches to 751 px with it. Because `body { overflow-x: clip }`, the user **cannot scroll right** — `window.scrollTo(400,0)` leaves `scrollX` at 0 — so the right-hand half of the map is clipped and permanently unreachable. The visible result is the whole contact page rendered into the left half of a 751 px canvas: on a real phone, every element appears at roughly half its intended size.

**Root cause.** `global.css` line \~593:

```css
.map { aspect-ratio: 16 / 7; min-height: 320px; }
```

The element's width is `auto`. With a definite minimum height of 320 px and a 16:7 ratio, the browser resolves the width *from* the height: 320 × 16 ÷ 7 = **731.4 px**. The ratio is driving the wrong axis.

**Fix** — verified in the browser; adding `width: 100%` returns the map to 335 px and the document scroll width to exactly 375 px:

```css
.map { width: 100%; aspect-ratio: 16 / 7; min-height: 320px; }
```

### R-03 — Header overflows the viewport by 7 px at 320 px · all 19 pages · LOW

**Measured at 320×568:** container 280 px; brand 189 px + menu button 94 px + 24 px gap = 307 px. The menu button's right edge lands at **327 px**, 7 px past the viewport. The button is still tappable and the clipping is barely visible, but it is present on every page.

**Fix.** At ≤ 360 px, shrink the brand block or the toggle:

```css
@media (max-width: 360px) {
  .brand__name { font-size: 1rem; }
  .brand svg { height: 32px; }
  .menu-toggle { padding: 0 .6rem; gap: .4rem; }
  .site-header .container { gap: .75rem; }
}
```

### R-04 — `overflow-x: clip` is masking layout bugs rather than fixing them · global · MEDIUM

`body { overflow-x: clip }` means an element that overflows horizontally produces no scrollbar and no visible symptom — it just silently disappears off the right edge, as R-02 demonstrates. This is why the contact page's broken map was not obvious. Keep the clip if you like, but add a CI or pre-release check that asserts `documentElement.scrollWidth <= clientWidth` at 320, 375 and 768, so the next one is caught before release.

### What passed

These were tested and are clean at all 11 viewports, which is worth stating given how much of the layout is bespoke:

- **No horizontal overflow on 17 of 19 pages.** Only /services/ and /contact/ fail.
- **Grid and flex stacking.** `.grid-2/3/4`, `.tiles`, `.team`, `.why__grid`, `.zz__item`, `.heritage`, `.split` and `.contact-grid` all collapse to single column correctly at their breakpoints.
- **The machine spec table.** `.spec` restructures from a 4-column table to a stacked 2-column grid below 760 px — no horizontal table scroll anywhere.
- **No clipped text** found by the overflow probe on any page except the R-01 overlap.
- **No distorted images.** Every `img` uses `object-fit: cover` inside a fixed-ratio box; no stretching or squashing detected at any viewport.
- **No tap targets below 24 × 24 px** on any page at any mobile width.
- **Typography scales cleanly.** Body is 17 px, headings use `clamp()` throughout, nothing drops below 11.5 px, no text overflows its container.
- **Lazy loading works.** One eager image per page (the LCP hero), everything else deferred.

One cosmetic note: `font-stretch` is declared on headings at 62–92% in roughly 20 rules, but the site loads Manrope's weight axis only (`@fontsource-variable/manrope/wght.css`). Manrope has no width axis, so every one of those declarations is inert. Harmless, but it is \~20 lines of CSS doing nothing, and it will mislead the next developer.

## Phase 3 — UI/UX design audit

**The design system is the strongest asset here and should be preserved.** Navy `#0b1630` with gold `#c9a45c`, one typeface (Manrope), a 4–8 px radius, generous section padding and a calm type scale — it reads as considered rather than templated, and it suits a printer better than the bright-CMYK direction it replaced. The recommendations below improve what exists; none asks for a redesign.

### What works

- **Visual hierarchy is clear.** Eyebrow → heading → lead → content repeats on every section, so a first-time visitor always knows where they are.
- **The service detail pages are genuinely good.** Overview, what's included, machines used, ideal for, FAQ, related services. A buyer can self-serve.
- **The press-floor section on the home page** (hover a service, the photo swaps) is a nice, restrained interaction.
- **The 404 page is on-brand** — "This page went off-register" is a printer's joke, well judged.
- **CTAs are consistently styled** and the gold button is unambiguous against both navy and white.

### Issue log

| ID | Page / section | Problem | Recommendation | Priority |
| --- | --- | --- | --- | --- |
| UX-01 | Infrastructure — machine cards | "Photo coming soon" appears 9 times on the page whose entire job is proving capability. It reads as an unfinished site. | Shoot the 9 machines. Until then, show the department photo and drop the placeholder label entirely — an unlabelled photo beats an admission of absence. | P1 |
| UX-02 | Site-wide — imagery | All 32 photos are stock (per `docs/image-credits.md`). None shows SGMC's building, presses, staff or output. For a 61-year-old family printer this is the single biggest credibility gap. | Replace with real photos in this order: press floor wide shot, Komori running, finished textbook stack, CTP unit, bindery, team at the press. Keep the same filenames. | P1 |
| UX-03 | About — leadership | Four cards showing initials monograms (RV, GK, RM, HV). Initials signal "we had no photo", which is worse than no card. | Real headshots, or drop to a simple names-and-roles list until photos exist. | P1 |
| UX-04 | Home — length and repetition | 14 sections. Products, services, heritage, leadership, machinery, why-us, process, FAQ and the full quote form all appear, each duplicating a dedicated page. Three separate quote CTAs plus the footer CTA plus the floating WhatsApp button. | Cut to: hero → promise → products → services → heritage teaser → why → proof → single CTA. Move leadership entirely to About; move the machine spec table to Infrastructure; keep the FAQ, drop the inline form in favour of one strong CTA. | P2 |
| UX-05 | Products — 6 detail pages | Each is a heading, one line, a bulleted list of product names, and links away. There is nothing to read and no reason to stay. | See Phase 4 for rewritten copy. Add paper/size/binding options, typical quantities, turnaround and one photo of real output per page. | P1 |
| UX-06 | Services — "Our process" vs Home — "Five signatures, one book" | The same five process steps appear on both pages with different headings and different layouts. | Keep the process on /services/ only. On the home page, link to it. | P2 |
| UX-07 | Home — process grid | With `.no-pin`, five cards at 33% width lay out 3 + 2, leaving a large empty gap in row 2 at ≥1000 px. | Use `repeat(auto-fit, minmax(220px, 1fr))` so five cards distribute evenly, or restructure to a horizontal 5-step strip. | P2 |
| UX-08 | Home — product cards | Titles are generated by stripping " Printing" from the category name, so five cards read "Books & Educational", "Specialised" etc. and the sixth reads "Additional Printing Services". Inconsistent lengths, and "Specialised" alone says nothing. | Write the six card titles by hand. See Phase 4. | P2 |
| UX-09 | Site-wide — trust elements | No testimonials, no client names or logos, no certifications, no sample work, no delivery guarantee, no GST/registration details. A buyer placing a bulk textbook order has nothing to reassure them. | Add 3 real customer quotes (schools, publishers), a client logo strip if permitted, and a short "how we quote" note. All NEEDS BUSINESS CONFIRMATION. | P1 |
| UX-10 | Contact — form | The service dropdown defaults to "Books & Educational Printing" with no empty option, so `required` never fires and users can submit the wrong category by accident. | Add `<option value="" disabled selected>Select a product or service…</option>`. | P1 |
| UX-11 | Site-wide — `<em>` used for colour | Accent words use `<em>`, which carries semantic emphasis, purely to tint them gold. A global `font-style: normal !important` then strips the italic. | Use `<span class="proof">`. Reserve `<em>` for real emphasis. | P3 |
| UX-12 | Site-wide — ambient effects | A fixed full-viewport halftone + `feTurbulence` noise overlay at `z-index: 300` with `mix-blend-mode: multiply` sits above everything on every page. | Barely visible at 2.5% opacity; it costs a full-screen composited blend layer on every scroll. Drop it on mobile at least. | P3 |
| UX-13 | Services hero — jump pills | Six `white-space: nowrap` pills including "Single to Full-Colour Printing". They wrap to many rows on narrow screens and add clutter above the content. | Shorten the labels ("Web offset", "Sheet-fed", "Pre-press", "Binding", "Colour", "Bulk") or drop the row. | P3 |
| UX-14 | Home — stats | "45+ Kinds of product" is awkward, and "100% In-house" appears twice on the same page (hero facts and heritage facts). | Use "45+ product types"; show "100% in-house" once. | P3 |

### The 1965 question

The site says "since 1965" often — six times on the About page alone — but never *shows* it. There is no founder's name, no decade-by-decade milestone, no photograph of the original premises, no mention of what changed when. Repetition is not evidence. One short, specific paragraph with two or three dated facts would carry more weight than all six repetitions combined, and it is the cheapest credibility win available. Note that `docs/client-brief.md` already flags an unresolved conflict: the client's draft says "over 65 years" and "three generations", but 1965 is 61 years ago. That needs settling before any history copy is written.

## Phase 4 — Content and context review

The writing is better than most printer websites: it explains web offset versus sheet-fed in plain language, avoids superlatives, and does not claim capabilities the brief rules out (no digital presses, no lamination, no die-cutting, no cartons). The problems are auto-generated strings that produce broken English, one factually false statement in the footer, and six product pages that are too thin to do any work.

### C-01 — Six broken button labels · /services/ · P1

**Current:** the detail link on each service is generated as `Explore {title.split(' ')[0].toLowerCase()}`, producing: *Explore web* · *Explore sheet-fed* · *Explore pre-press* · *Explore binding* · *Explore single* · *Explore bulk*.

**Problem.** "Explore single" and "Explore web" are not English. These sit on the primary CTA of each service block.

**Replacement.** Hard-code a `cta` field per service: *See web offset printing* · *See sheet-fed printing* · *See pre-press & CTP* · *See binding & finishing* · *See colour options* · *See bulk & short-run*.

The same generator also sets the word overlaid on each service photo ("Web", "Single", "Bulk"). Use the same hand-written labels or remove the overlay.

### C-02 — Lower-cased acronym · /services/prepress/ · P1

**Current:** `Need pre-press & ctp?` — the CTA heading applies `.toLowerCase()` to a title containing an acronym.

**Replacement:** `Need pre-press or CTP plates?`

### C-03 — Six ungrammatical CTA headings · /products/\* · P1

**Current:** *Planning books & educational?* · *Planning publications & commercial?* · *Planning advertising & promotional?* · *Planning packaging & label?* · *Planning specialised?* · *Planning additional services?*

**Replacement** — one per page:

| Page | Replacement heading |
| --- | --- |
| Books & Educational | Printing textbooks or notebooks this year? |
| Publications & Commercial | Planning your next issue or annual report? |
| Advertising & Promotional | Need brochures, flyers or posters? |
| Packaging & Label | Need labels, stickers or inserts? |
| Specialised | Printing manuals, diaries or certificates? |
| Additional Printing Services | Not sure which colour option you need? |

### C-04 — The footer credits three typefaces the site does not use · all 19 pages · P1

**Current:** "Set in Archivo, Newsreader and JetBrains Mono. Proofed in vermilion, printed in press blue — and on paper, by Shree Gayatri Multi Colour Printers, since 1965."

**Problem.** The site is set entirely in **Manrope**; the loaded font file is `manrope-latin-wght-normal.woff2` and `--font-display`, `--font-serif` and `--font-body` all resolve to Manrope. There is no vermilion in the v4 palette either — the accents are gold `#c9a45c` and `#94702f`. A colophon is a statement of craft; getting it wrong does the opposite of what it is for. This text is on every page of the site.

**Replacement:** "Set in Manrope. Printed in press navy and gold on screen — and on paper, by Shree Gayatri Multi Colour Printers, since 1965."

Or simply delete the colophon. It is a designer's flourish that adds nothing for a textbook buyer.

### C-05 — Services hero lead is generic agency copy · /services/ · P1

**Current:** "We manage your project from idea to delivery — quickly, flexibly and with complete transparency. Whether you're a large brand or printing for the first time, you get the same care and quality."

**Problem.** Nothing in it is specific to SGMC, to printing, or to books. "Large brand" is the wrong audience — the core customers are schools, colleges and publishers. It could sit on any agency site in any industry.

**Replacement:** "Plate-making, printing and binding all happen in our own building, on our own machines. That means one team is accountable for your job from the first proof to the delivery note — whether it is ten thousand textbooks or three hundred brochures."

### C-06 — The six product pages are too thin · /products/\* · P1

**Current** (Packaging & Label, representative): an H1, one sentence, four product names as bullets, one line about colour options, then links away. Roughly 60 words of unique content.

**Problem.** A buyer cannot tell what sizes, papers, quantities or turnaround are possible, so they leave to ask a competitor who says. These pages also carry almost no indexable text.

**Replacement structure for every product page:** lead paragraph → what we print (the existing list) → **how it is produced** (press, colours, paper, binding) → **typical quantities and turnaround** → **what to send us** → CTA.

Worked example for Packaging & Label:

> **Printed labels, inserts and leaflets — accurate, consistent, in the quantity you need.**
>
> We print the paper components that go on and inside your packaging: product labels, stickers, packaging inserts and product information leaflets. These run on our sheet-fed offset presses, where colour accuracy matters most — so a label printed this month matches the one printed last year.
>
> **How it is produced.** Sheet-fed offset, single-colour through four-colour (CMYK) and full colour. Plates are made in-house on our CTP system, so text stays sharp at small sizes — important for ingredient lists, batch codes and statutory information.
>
> **Quantities and turnaround.** Both bulk runs and short runs. \[NEEDS BUSINESS CONFIRMATION: minimum order quantity and typical turnaround in working days.\]
>
> **What to send us.** A print-ready PDF with 3 mm bleed, or your artwork files — our in-house design team can prepare them for you. Tell us the finished size, the quantity and the paper or substrate.

Note the deliberate limits: no claim of die-cutting, lamination, foiling or carton manufacture, because `docs/client-brief.md` explicitly rules those out.

### C-07 — The About page asserts heritage but never shows it · /about/ · P1

**Current:** "Since 1965, Shree Gayatri Multi Colour Printers has grown into a complete, in-house printing facility trusted for textbooks, publications and commercial work." Plus "1965" five more times on the same page.

**Problem.** No founder, no dates, no milestones, nothing a reader can picture. And "The Vadlamani family and team have led Shree Gayatri Multi Colour Printers with one standard since 1965" implies the four currently named directors have led the company for 61 years, which cannot be right.

**Replacement** — the shape to fill once the business confirms the facts:

> **Three generations at the same press.**
>
> Shree Gayatri Multi Colour Printers was founded in 1965 by \[FOUNDER NAME — NEEDS BUSINESS CONFIRMATION\], printing \[WHAT FIRST — NEEDS BUSINESS CONFIRMATION\] from \[FIRST PREMISES — NEEDS BUSINESS CONFIRMATION\].
>
> &#91;MILESTONE: year the first offset press was installed — NEEDS BUSINESS CONFIRMATION\]. \[MILESTONE: year the web offset line was added — NEEDS BUSINESS CONFIRMATION\]. \[MILESTONE: year CTP replaced film — NEEDS BUSINESS CONFIRMATION\].
>
> Today the business runs from its own building in Amberpet with a second facility at Choutuppal, and is led by the second and third generations of the Vadlamani family. The work has not changed much: schools, colleges and publishers still need books printed well, priced fairly and delivered on the date agreed.

And for the leadership intro, replace the "since 1965" claim with: "The Vadlamani family leads the business today, with the same three commitments it has always traded on: quality printing, competitive prices and timely delivery."

**Before writing any of this, settle the arithmetic.** The brief records the client saying "over 65 years" and "three generations" while also giving 1965, which is 61 years. Publishing "over 65 years" alongside "Est. 1965" is the kind of inconsistency a careful buyer notices.

### C-08 — Six product card titles on the home page · / · P2

**Current** (auto-stripped): Books & Educational · Publications & Commercial · Advertising & Promotional · Packaging & Label · Specialised · Additional Printing Services.

**Replacement** (hand-written, parallel, each saying what it is): Textbooks & notebooks · Magazines & annual reports · Brochures & promotional print · Labels, stickers & inserts · Manuals, diaries & certificates · Colour, bulk & short-run options.

### C-09 — Smaller language fixes

| Location | Current | Issue | Replacement |
| --- | --- | --- | --- |
| Home — hero stats | "Kinds of product" | Awkward | "Product types" |
| Home — heritage | "Generations of experience, now running web and sheet-fed offset presses…" | Vague; no number of generations given | "Three generations of printing experience, now running web and sheet-fed offset presses, CTP pre-press and in-house finishing from our own building." \[NEEDS BUSINESS CONFIRMATION on "three"\] |
| Products hub | "All types of single & multi-colour printing." | Reads as a specification, not a benefit | "Everything we print, from textbooks to labels." |
| Products — card kicker | "9 products" on Additional Printing Services | These are printing *methods*, not products | "9 options" |
| Contact form note | "We usually reply within a few working hours." | A response-time promise | Keep only if the business will honour it. NEEDS BUSINESS CONFIRMATION |
| Contact form legend | Asterisk shown in magenta `var(--m)` while the real required markers are gold `var(--red)` | Two different colours for the same symbol | Change the inline style to `var(--red)` |
| Footer tagline | "Quality Printing · Competitive Prices · Timely Delivery" | Fine, but it appears in the footer, the promise band, the About page and the meta description | Keep in the footer and promise band; cut the other two |
| Infrastructure | "Photo coming soon" × 9 | Advertises incompleteness | Remove the label entirely |

### Claims that need verification before launch

These appear on the live site but are marked unconfirmed in `docs/client-brief.md`:

- **The Amberpet address and the Choutuppal branch address** — the brief lists address as still needed, yet both are published and embedded in the LocalBusiness structured data.
- **The email `sgmcprinters@gmail.com`** — also listed as still needed.
- **Opening hours** (Mon–Sat 9:30 AM – 7:30 PM) — marked `// TODO: confirm` in `src/config/site.ts`, and published in structured data where Google may surface them.
- **The WhatsApp number** — marked `// TODO: confirm this number is on WhatsApp`. All 13 WhatsApp links and the floating button depend on it.
- **"45+ kinds of printed products"** — derived by counting list items, not supplied by the business.
- **"We usually reply within a few working hours"** — a service promise nobody has agreed to.
- **`priceRange: '₹₹'`** in the structured data — invented.
- **"Short-Run Printing"** — the brief notes the client wrote "Shor-Printing" and asks for confirmation it means short-run. The site has committed to that reading across many pages.

## Phase 5 — Functional testing

No fabricated enquiry was ever sent. The form's submit path was tested with `window.open` stubbed in the browser, so the WhatsApp link was captured and inspected rather than opened. The Web3Forms path is unreachable (no key configured), so no request ever left the browser.

### F-01 — The quote form has no email backend · all pages with the form · CRITICAL

`SITE.web3formsKey` is `''` (marked `// TODO` in `src/config/site.ts`). The handler therefore takes its fallback branch on every submission: it builds a message and calls `window.open('https://wa.me/919701099777?text=…')`.

**Confirmed by test.** A valid submission produced exactly one call to `window.open` with `https://wa.me/919701099777?text=Hi%2C%20I'm%20QA%20Test.%0AService%3A%20Books%20%26%20Educ…` and the status message "Opening WhatsApp with your enquiry — just press send!".

**Why this matters.** The business receives no email, ever. Every enquiry depends on: the pop-up not being blocked, WhatsApp being installed (or WhatsApp Web being logged in on desktop), and the customer remembering to press send in the app. Each is a point of loss, and there is no record of enquiries that fail. For the page whose only job is generating quote requests, this is the highest-impact defect on the site.

**Fix.** Obtain a Web3Forms access key (free, delivers to the business's inbox) and set `web3formsKey`. Keep WhatsApp as a visible second option, not the only path.

### F-02 — Phone validation is silently broken · all pages with the form · CRITICAL

**The built HTML contains `pattern="[0-9+-s()]{8,}"`.** The source is `pattern="[0-9+\-\s()]{8,}"` — the backslashes are stripped during the Astro template build, which both corrupts the character class (`+-s` becomes a *range* from `+` to `s`) and leaves a pattern Chrome rejects outright. An invalid `pattern` is ignored, so the field validates nothing.

**Measured** — every one of these is accepted as a valid phone number:

| Input | `checkValidity()` | `patternMismatch` |
| --- | --- | --- |
| `12` | true | false |
| `abcdefgh` | true | false |
| `++++++++` | true | false |
| `not a phone at all` | true | false |
| `9701099777` | true | false |

**Fix** — tested in Chrome against the same inputs; this pattern rejects all four bad values and accepts `9701099777`, `+91 97010 99777` and `97010 99777`:

```
[0-9+\- ]{10,15}
```

The backslash must survive the build, so define it in the component's frontmatter and bind it, rather than writing it inline:

```astro
---
const PHONE_PATTERN = String.raw`[0-9+\- ]{10,15}`;
---
<input id="f-phone" name="phone" type="tel" pattern={PHONE_PATTERN}
       title="10–15 digits. You can include + and spaces." required />
```

**Check the built HTML afterwards** to confirm the backslash is present — that is exactly how this bug got through. Add a `title` attribute too: without one, the browser's failure message is generic.

### F-03 — The success message can be a lie; the form is never cleared · P1

The WhatsApp branch shows "Opening WhatsApp with your enquiry" unconditionally. `window.open` returns `null` when a pop-up blocker intervenes, and the return value is never checked — so a user whose pop-up was blocked is told their enquiry is on its way when nothing happened. The branch also never calls `form.reset()` (only the Web3Forms branch does), confirmed by test: fields still held their values after a "successful" submit, inviting duplicate sends.

```js
const win = window.open(waUrl, '_blank', 'noopener');
if (win) {
  form.reset();
  show('ok', 'Opening WhatsApp with your enquiry — just press send.');
} else {
  show('error', `Your browser blocked the WhatsApp window. Call us on ${SITE.phone} or WhatsApp us directly.`);
}
```

### F-04 — The service dropdown pre-selects a category · P1

The select opens on "Books & Educational Printing" with no empty option, so `required` can never fire and a user who skips the field silently sends the wrong category. Add `<option value="" disabled selected>Select a product or service…</option>`.

### Full functional results

| ID | Element | Expected | Actual | Status |
| --- | --- | --- | --- | --- |
| F-05 | Empty form submission | Blocked with a message | Blocked. `reportValidity()` false, first invalid field `name`, "Please fill out this field.", nothing opened | PASS |
| F-06 | Invalid email (`not-an-email`) | Rejected | Rejected, submission blocked | PASS |
| F-07 | Required fields | name, phone, service, message | All four carry `required` | PASS |
| F-08 | `?service=` prefill | Dropdown pre-selects the linked service | Works — `?service=Packaging %26 Label Printing` selects correctly. All 12 prefill links match option values exactly | PASS |
| F-09 | Honeypot | Silent bot rejection | `botcheck` present, off-screen, `tabindex=-1`, handler returns early | PASS |
| F-10 | Status region | Announced to screen readers | `role=status` + `aria-live=polite`, hidden until used | PASS |
| F-11 | Mobile menu open/close | Toggles, traps nothing broken | Opens, `aria-expanded` flips, body locks, 6 links | PASS |
| F-12 | Menu — Escape key | Closes | Closes and returns focus to the toggle | PASS |
| F-13 | Menu — inert when closed | Not reachable | `inert` applied when closed | PASS |
| F-14 | Menu — focus on open | Focus moves into the menu | Focus stays on the toggle; the page behind stays tabbable (`main` is not inert) | FAIL — see A-04 |
| F-15 | FAQ accordions | Open/close, multiple allowed, keyboard | Clicking toggles correctly; Enter works; multiple can be open; one open by default | PASS |
| F-16 | Press-floor hover | Hovering a service swaps the preview photo | Works — hovering item 3 activates image 3 | PASS |
| F-17 | Internal links (30) | All resolve | All resolve | PASS |
| F-18 | Anchor links (14) | All have targets | All have matching IDs | PASS |
| F-19 | Console errors | None | None on any of the 19 pages | PASS |
| F-20 | Product filter bar | — | Does not exist on `/products/`; `initFilter` is dead code | N/A |
| F-21 | Hero slideshow | — | One hero image, no dots rendered; `initSlideshow` is dead code | N/A |
| F-22 | Google Maps embed | Map tiles load | Rendered as an empty grey box — `google.com` is blocked in the test sandbox | NOT VERIFIED |
| F-23 | 13 WhatsApp links | Open WhatsApp with prefilled text | Not opened, to avoid sending real enquiries. URLs inspected and well-formed | NOT VERIFIED |
| F-24 | `tel:` / `mailto:` links | Dial / compose | Cannot test headless. Markup correct | NOT VERIFIED |
| F-25 | Hero background video | Plays muted on desktop | 1.9 MB `press-loop.mp4` fetched on desktop; playback not representative headless | NOT VERIFIED |
| F-26 | Web3Forms submission | Email delivered | No key configured — path unreachable | NOT VERIFIED |

## Phase 6 — Accessibility audit (WCAG 2.2 AA)

axe-core was run on all 19 pages at WCAG 2.0/2.1/2.2 A + AA plus best-practice rules. **Three rule types fire, identically across every page.** That is a good result — the common failures (missing alt text, unlabelled inputs, broken heading order, missing landmarks, unlabelled buttons) are all absent.

### Measured clean

| Check | Result |
| --- | --- |
| `<h1>` per page | Exactly one, on all 19 |
| Heading level skips | Zero, on all 19 |
| Images missing `alt` | Zero of 123 images site-wide |
| Decorative images | Correctly `alt=""` (14 on home, 6 per product page) |
| Form labels | Every input has a bound `<label for>` |
| Landmarks | `main`, `header`, `footer`, `nav` present on all pages |
| Skip link | Present, hidden until focused, targets `#main` |
| Focus indicator | `:focus-visible { outline: 2px solid }` with 3 px offset |
| `lang` attribute | `en-IN` on all pages |
| Reduced motion | Honoured — all animation disabled under `prefers-reduced-motion: reduce` |
| Tap targets | None below 24 × 24 px (WCAG 2.2 SC 2.5.8) |
| Console errors | None |

### A-01 — Gold accent text fails contrast · every page · SERIOUS (SC 1.4.3)

Two distinct failures, both in the gold family:

| Element | Foreground | Background | Measured | Required | Pages |
| --- | --- | --- | --- | --- | --- |
| `.eyebrow` (11.52 px, normal weight) | `#94702f` | `#f4f6fa` | **4.2:1** | 4.5:1 | All 19 |
| `.process-step__n` (12.8 px, normal) | `#c9a45c` | `#ffffff` | **2.34:1** | 4.5:1 | Home, /services/ |
| `.bigyear span` (decorative) | `#c9a45c` | `#f4f6fa` | 2.16:1 | 4.5:1 | Home |

The eyebrow is the worse problem: it is the section label on every section of every page, and at 11.52 px it is already small.

**Fix.** Darken the accent used for small text on light backgrounds. `#7a5b22` (already defined as `--red-deep`) gives **6.1:1** on `#f4f6fa` and **6.8:1** on white:

```css
.eyebrow { color: var(--red-deep); }
.process-step__n { color: var(--red-deep); }
```

Keep `--gold #c9a45c` for large display text and for anything on navy, where it passes comfortably. The `.bigyear` is `aria-hidden` decoration — exempt in principle, but it will keep appearing in automated scans, so consider darkening it too.

### A-02 — Logo link's accessible name does not include its visible text · every page · SERIOUS (SC 2.5.3)

The brand link carries an `aria-label` that omits the words shown inside it ("Shree Gayatri Multi Colour Printers"). Speech-input users who say "click Shree Gayatri" will not activate it. Two instances per page (header and footer).

**Fix.** Drop the `aria-label` and let the visible text be the name, or make the label start with the visible text.

### A-03 — The floating WhatsApp button sits outside all landmarks · every page · MODERATE

`.fab` is a direct child of `<body>`, after `</footer>`. Screen-reader users navigating by landmark will miss it.

**Fix.** Wrap it: `<aside aria-label="Quick contact"><a class="fab" …></aside>`.

### A-04 — Mobile menu: focus is not moved or trapped · every page · MODERATE (SC 2.4.3)

Confirmed by test. When the menu opens, focus stays on the toggle button, and `main` is not made inert — so a keyboard user tabbing forward walks straight into the page behind the full-screen overlay, where the content is visually covered. Escape closes correctly and focus returns correctly, which is the harder half already done.

**Fix.**

```js
const set = (open) => {
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  menu.toggleAttribute('inert', !open);
  document.querySelector('main').toggleAttribute('inert', open);
  document.querySelector('footer')?.toggleAttribute('inert', open);
  if (open) menu.querySelector('a')?.focus();
  else toggle.focus();
};
```

### A-05 — Keyboard users cannot drive the press-floor preview · home · LOW

The service list swaps the preview photo on `mouseenter` and `focus`. The items are links, so focus does fire and the image does change — but the preview container is `aria-hidden="true"`, so the change is invisible to screen-reader users. This is acceptable (the photo is decorative and the link text carries the meaning), but worth knowing it is decorative by design, not by accident.

### A-06 — `<em>` used for colour, not emphasis · every page · LOW

Accent words in headings are wrapped in `<em>` to tint them gold, then `font-style: normal !important` removes the italic. Screen readers may announce emphasis that is not intended, and genuine emphasis elsewhere would be indistinguishable. Use `<span class="proof">`.

### A-07 — Native validation messages only · contact, home · LOW

The form relies entirely on browser validation bubbles. They vanish on blur, are not persistently associated with the field, and cannot be styled. Combined with F-02 (the phone pattern that validates nothing) and the missing `title` attribute, error messaging is the weakest part of the form. Add inline `<span id="f-phone-err" role="alert">` messages wired with `aria-describedby`.

### Not an issue

Worth recording, because they are the usual suspects: there is **no auto-advancing carousel** on any page (the slideshow code never activates — the hero carries a single image), so SC 2.2.2 Pause/Stop/Hide does not apply. The marquee of product names is `aria-hidden` and stops under reduced motion. The honeypot field is correctly hidden from assistive technology.

## Phase 7 — SEO and performance

**No Lighthouse scores or Core Web Vitals are quoted here, because none were measured.** Field data needs real users and a production domain. The byte counts and request counts below are real measurements from the test browser.

### Measured page weight

|  | Home @ 1920 desktop | Home @ 390 mobile |
| --- | --- | --- |
| Requests | 22 | 13 |
| Total transferred | 3,116 KB | **332 KB** |
| Video | 1,894 KB | 0 (correctly skipped) |
| Images | 876 KB | 134 KB |
| CSS | 62 KB | 62 KB |
| JS | 22 KB | 22 KB |
| Fonts | 24 KB | 24 KB |
| HTML | 63 KB | 63 KB |

**Mobile performance is genuinely good.** 332 KB and 13 requests for an image-led homepage is better than most agency builds. Responsive `srcset`, WebP, and `loading="lazy"` on everything except the single LCP hero are all working as intended.

**The desktop story is one file.** `press-loop.mp4` is 1.9 MB — 61% of the desktop page weight — for a decorative hero loop. It is already well gated (desktop only, skipped under reduced motion and Data Saver, `preload="none"`, fades in after the still). Still, consider compressing to \~800 KB, or dropping it: the still underneath is the LCP image and the page works without it.

Also worth noting: the source repo ships **78 MB of generated image variants**, with originals up to 1.4 MB (`hero-4.jpg`). Only the right variant is served, so visitors are unaffected, but build time and repo size suffer. Downsample the originals to \~2400 px before committing.

### Dependencies that ship but are never used

`package.json` installs `@fontsource-variable/archivo`, `@fontsource-variable/newsreader` and `@fontsource/jetbrains-mono`, plus `gsap` and `lenis`. None is imported anywhere — the layout imports Manrope only, and all motion is CSS plus a small hand-written script. These add nothing to the shipped bundle but should be removed from `dependencies`. (They are also the likely origin of the wrong footer colophon — see C-04.)

### SEO — measured

| Check | Result |
| --- | --- |
| Unique `<title>` per page | Yes, all 19 |
| Title length | 30–65 characters — all within range |
| Unique meta description | Yes, all 19 |
| Description length | 48–158 characters — all within range |
| Canonical tag | Present on every page |
| Open Graph + Twitter cards | Complete, with 1200×630 image and alt |
| Structured data | LocalBusiness, WebSite, BreadcrumbList, ItemList, FAQPage, Service — well-formed |
| Sitemap | `sitemap-index.xml` generated, with per-type priority and changefreq |
| `robots.txt` | Present, correctly `Disallow: /` on the preview build |
| Heading structure | One `h1` per page, no skips |
| Image alt text | 100% coverage |
| URL structure | Clean, lowercase, hyphenated, logical hierarchy |
| Internal linking | Strong — hub → detail, detail → sibling, footer covers everything |
| Security headers | `_headers` sets nosniff, SAMEORIGIN, Referrer-Policy, Permissions-Policy |

This is a well-executed technical SEO setup. The issues are the ones below.

### S-01 — The production domain is a placeholder · P0 before launch

`SITE.url` is `https://www.sgmcprinters.com` with `// TODO: final domain bought on GoDaddy`. Every canonical tag, Open Graph URL, sitemap entry and structured-data `@id` points at it. If that domain is not the final one, every one of those is wrong on launch day. Settle the domain before going live.

### S-02 — Canonicals on the preview include the base path · preview only · P2

The live preview emits `<link rel="canonical" href="https://www.sgmcprinters.com/sgmc-printers/v4/">` — the GitHub Pages base path leaked into a canonical pointing at the production host. Harmless today (`noindex, follow` and `Disallow: /` are both set, correctly), but it will become a real problem if either guard is removed while the preview is still up. Build the canonical from `SITE.url` plus the path with `BASE_PATH` stripped.

### S-03 — Thin content on six product pages · P1

The `/products/*` pages carry roughly 60 words of unique copy each — a heading, a sentence, and a list of product names. They target commercial queries ("label printing Hyderabad", "textbook printing Hyderabad") and currently have almost nothing to rank with. The rewrite in C-06 is the fix.

### S-04 — Home/subpage duplication · P2

The home page reproduces the services list, the product categories, the machine spec table, the leadership team, the process steps and the full contact form — each of which is also the whole point of a dedicated page. This dilutes the subpages and gives Google overlapping signals. Trimming the home page (UX-04) fixes the SEO problem at the same time.

### S-05 — Local SEO for Hyderabad is good but incomplete · P1

**Present:** `geo.region`, `geo.placename`, `geo.position`, `ICBM` meta tags; LocalBusiness schema with full `PostalAddress`, `GeoCoordinates`, `openingHoursSpecification`, `areaServed` (Hyderabad + India), and a `department` entry for the Choutuppal branch; "Hyderabad" in most page titles.

**Missing or unverified:**

- **No Google Business Profile link.** `mapLink` is `// TODO: Google Business Profile link` and currently points at a Maps search. A verified GBP is the single highest-impact local SEO asset for a business like this — more than anything on the site.
- **Coordinates are approximate.** `geo: { lat: 17.3937, lng: 78.5166 }` is marked `// TODO: exact pin from Google Maps`. Wrong coordinates in structured data send customers to the wrong place.
- **`sameAs` is empty** — all four social URLs are blank. Create at least one profile and link it.
- **Only the head office is in the main schema.** Choutuppal is a `department`, which is semantically odd for a second facility. Consider two separate LocalBusiness entries.
- **No Telangana or neighbourhood targeting beyond "Hyderabad".** Consider "Amberpet" and "Telangana" in the contact page title and the About copy.
- **No reviews or ratings.** Once GBP has reviews, they become eligible for rich results.

### S-06 — `format-detection: telephone=no` · P3

The layout disables iOS phone-number auto-detection site-wide. That is a deliberate, defensible choice (explicit `tel:` links exist), but it means any phone number written in body copy is not tappable on iPhone. Check that every number a customer might want to tap is inside a real `tel:` link. The FAQ answer listing both numbers in prose is one to check.

## Phase 8 — Page-by-page reports

All 19 pages, each tested individually. For readability the CSS, UI/UX, content and functional tables asked for are merged into one issues table per page with a **Type** column; SEO and accessibility findings that are identical across all 19 pages are stated once in Phase 9 rather than repeated here. Scores are out of 10.

### Page: Home (`/`)

**Assessment.** The strongest page visually and the weakest structurally. The hero lands well — full-bleed press photo, uppercase headline, gold accents, three stat facts — and a first-time visitor immediately understands this is a printer with history. Then it keeps going for 14 sections and reproduces most of the rest of the site. Main strengths: hero, promise band, product photo cards, press-floor interaction, machine spec table. Main weaknesses: length, three competing quote CTAs, and content duplicated from five other pages.

| ID | Type | Component | Viewport | Issue | Severity | Fix |
| --- | --- | --- | --- | --- | --- | --- |
| H-1 | CSS | `.header-actions` | 320 only | Menu button's right edge at 327 px, 7 px past viewport | Low | R-03 media query |
| H-2 | CSS | `.process__track` | ≥1000 | 5 cards at 33% lay out 3+2, large gap in row 2 | Low | `repeat(auto-fit, minmax(220px,1fr))` |
| H-3 | UX | Whole page | All | 14 sections; products, services, leadership, machines, process, FAQ and form all duplicate dedicated pages | High | Cut to 8 sections (UX-04) |
| H-4 | UX | CTAs | All | "Get a quote" (hero), "Start a job" (why), inline form, footer CTA, floating WhatsApp — five competing asks | Medium | One primary CTA per screenful |
| H-5 | UX | Product cards | All | Titles auto-stripped: five short, one reads "Additional Printing Services" | Medium | Hand-write six titles (C-08) |
| H-6 | Content | Hero stats | All | "Kinds of product" is awkward; "100% In-house" repeats in the heritage band | Low | "Product types"; show once |
| H-7 | Content | Heritage | All | "Generations of experience" — no number, no names, no dates | Medium | C-07 rewrite |
| H-8 | Func | Quote form | All | No email backend; WhatsApp-only path | Critical | F-01 |
| H-9 | A11y | `.eyebrow` ×10 | All | `#94702f` on `#f4f6fa` = 4.2:1 | Serious | A-01 |
| H-10 | SEO | Whole page | — | Duplicates five subpages | Medium | S-04 |

**Scores.** Visual 8 · Responsive 8 · UI/UX 6 · Content 7 · Functionality 6 · Accessibility 7 · SEO 7 → **Overall 7.0.** Looks good, works, but tries to be the whole website and buries its own call to action.

**Actions, in order:** fix the form backend (F-01) · cut to 8 sections · hand-write the six card titles · darken the eyebrow · fix the 320 px header · even out the process grid.

### Page: Services (`/services/`)

**Assessment.** Good information architecture undermined by the worst rendering bug on the site. The zig-zag layout of six services with photo, intro and four-point checklist is clear and scannable. Below it, the "Our process" section is visibly broken on every desktop screen. Six of the page's primary buttons also read as broken English.

| ID | Type | Component | Viewport | Issue | Severity | Fix |
| --- | --- | --- | --- | --- | --- | --- |
| SV-1 | CSS | `.process-step` | ≥1000 (1024–1920) | Cards 380 px in 238–248 px cells; overlap 127–137 px each; body text clipped mid-word; last card 151–161 px past container; page overflows 51–119 px at 1024–1440 | **Critical** | R-01 |
| SV-2 | Content | Service CTA buttons ×6 | All | "Explore web", "Explore single", "Explore bulk" | High | C-01 |
| SV-3 | Content | Hero lead | All | Generic agency copy; "large brand" is the wrong audience | High | C-05 |
| SV-4 | Content | Photo overlay word | All | "Web", "Single", "Bulk" overlaid on photos | Medium | Use the C-01 labels |
| SV-5 | UX | Hero jump pills | <768 | Six `nowrap` pills including "Single to Full-Colour Printing" wrap to several rows | Low | Shorten labels (UX-13) |
| SV-6 | UX | Process section | All | Duplicates the home page's "Five signatures, one book" | Medium | UX-06 |
| SV-7 | CSS | `.header-actions` | 320 | 7 px overflow | Low | R-03 |
| SV-8 | CSS | `accent-c/m/y/k` | All | Six accent classes all resolve to the same colour; inline `--accent` styles unused | Low | Delete |

**Scores.** Visual 5 · Responsive 3 · UI/UX 6 · Content 5 · Functionality 7 · Accessibility 7 · SEO 7 → **Overall 5.5.** A page a customer may well see before any other, with a layout failure they cannot miss.

**Actions:** fix SV-1 first — it is the single most visible defect on the site · rewrite the six button labels · rewrite the hero lead · shorten the jump pills.

### Pages: the six service detail pages

`/services/web-offset-printing/` · `/services/sheet-fed-offset-printing/` · `/services/prepress/` · `/services/binding-finishing/` · `/services/colour-printing/` · `/services/bulk-printing/`

**Assessment.** The best pages on the site, and the template other sections should copy. Each runs: hero with kicker and lead → Overview (two substantial paragraphs) → What's included → Machines used → Ideal for → two FAQs → three related services → CTA. The web-offset page explains reel-fed printing in plain language and says plainly when *not* to choose it — that is the kind of honesty that wins a quote. All six are responsive-clean at all 11 viewports.

| ID | Type | Page | Issue | Severity | Fix |
| --- | --- | --- | --- | --- | --- |
| SD-1 | Content | prepress | CTA heading renders "Need pre-press & ctp?" — acronym lower-cased | High | C-02 |
| SD-2 | Content | All 6 | "Explore" on each related-service card gives no idea where it goes | Low | "See sheet-fed printing" etc. |
| SD-3 | UX | All 6 | No photo of actual output from that service | Medium | UX-02 |
| SD-4 | Content | All 6 | No indicative turnaround or minimum quantity — the two things a buyer wants | Medium | Add once confirmed (NEEDS BUSINESS CONFIRMATION) |
| SD-5 | CSS | All 6 | 320 px header overflow | Low | R-03 |
| SD-6 | A11y | All 6 | Two eyebrow contrast failures per page | Serious | A-01 |

**Scores** (all six): Visual 8 · Responsive 9 · UI/UX 8 · Content 8 · Functionality 7 · Accessibility 7 · SEO 8 → **Overall 7.9.** `/services/prepress/` drops to **7.7** for the "ctp" bug.

**Actions:** fix the prepress heading · add turnaround and minimum quantity to all six once confirmed · real photos.

### Page: Products (`/products/`)

**Assessment.** A clean hub: six categories, each with a lead paragraph and its full product list, so a visitor can scan every one of the \~46 items on a single page. "Don't see your product? Just ask" is a good touch. The weakness is that the lists are nouns with no supporting detail, and the page promises depth on the detail pages that is not there.

| ID | Type | Component | Issue | Severity | Fix |
| --- | --- | --- | --- | --- | --- |
| PH-1 | Content | H1 | "All types of single & multi-colour printing" is a spec, not a benefit | Medium | "Everything we print, from textbooks to labels." |
| PH-2 | Content | Card kickers | "9 products" on Additional Printing Services — these are methods, not products | Low | "9 options" |
| PH-3 | UX | Category blocks | Six near-identical blocks; nothing distinguishes the core business (books) from a minor line (packaging) | Medium | Lead with Books & Educational, visually weight it |
| PH-4 | UX | — | Filter bar styled in CSS and scripted in JS but absent from the markup | Low | Add it, or delete the dead code |
| PH-5 | IA | `colour-options` | Slug and title disagree | Medium | Rename slug + redirect |
| PH-6 | CSS | `.header-actions` | 320 px overflow | Low | R-03 |

**Scores.** Visual 8 · Responsive 9 · UI/UX 7 · Content 6 · Functionality 7 · Accessibility 7 · SEO 7 → **Overall 7.3.**

### Pages: the six product detail pages

`/products/books-educational/` · `/products/publications/` · `/products/advertising-promotional/` · `/products/packaging-labels/` · `/products/specialised/` · `/products/colour-options/`

**Assessment.** The weakest pages on the site. Each is a heading, one sentence, a list of product names, one line about colour, then links away — around 60 words of unique content. They are technically well-formed and responsive-clean, but there is nothing to read. A buyer who lands here from search learns less than the hub page already told them. Their CTA headings are also ungrammatical on all six.

| ID | Type | Page | Issue | Severity | Fix |
| --- | --- | --- | --- | --- | --- |
| PD-1 | Content | All 6 | \~60 words of unique copy; no sizes, papers, quantities, turnaround or examples | **High** | C-06 rewrite |
| PD-2 | Content | All 6 | CTA headings: "Planning specialised?", "Planning packaging & label?" | High | C-03 |
| PD-3 | SEO | All 6 | Too thin to rank for the commercial queries they target | High | C-06 |
| PD-4 | UX | All 6 | "4 products in this range" as an H2 is a count, not a heading | Medium | "What we print in this range" |
| PD-5 | UX | All 6 | No photo of real output | Medium | UX-02 |
| PD-6 | Content | books-educational | The core business of the company gets the same thin template as the smallest line | High | Expand this one first |

**Scores** (all six): Visual 7 · Responsive 9 · UI/UX 5 · Content 3 · Functionality 7 · Accessibility 7 · SEO 4 → **Overall 5.6.** Structurally sound, substantively empty.

**Actions:** rewrite all six to the C-06 structure, starting with Books & Educational · fix the six CTA headings · one real photo each.

### Page: Infrastructure (`/infrastructure/`)

**Assessment.** This page has the best content on the site and the worst presentation of it. The machine catalogue is organised exactly right — four departments, each with its machines, reference codes and a plain-language "what it's for". It is the page that should close the sale for a bulk textbook buyer. Instead, **"Photo coming soon" appears nine times**, once for every machine. The page meant to prove the plant exists currently proves the website is unfinished.

| ID | Type | Component | Issue | Severity | Fix |
| --- | --- | --- | --- | --- | --- |
| IN-1 | UX | Machine cards ×9 | "Photo coming soon" ×9 | **High** | Shoot the machines; meanwhile drop the label and show the department photo |
| IN-2 | Content | Headings | Department names and machine names are both `h3`, flattening the hierarchy | Medium | Department `h2`, machine `h3` |
| IN-3 | Content | Machine entries | No specs — no sheet size, no max colours, no speed | Medium | Add per machine (NEEDS BUSINESS CONFIRMATION) |
| IN-4 | Content | — | No building photo, no floor area, no staff count | Medium | NEEDS BUSINESS CONFIRMATION |
| IN-5 | UX | "Learn more" ×4 | Same label four times, different destinations | Low | Name the destination |
| IN-6 | CSS | `.header-actions` | 320 px overflow | Low | R-03 |

**Scores.** Visual 5 · Responsive 9 · UI/UX 5 · Content 7 · Functionality 7 · Accessibility 7 · SEO 7 → **Overall 6.6.** The highest-leverage page on the site: nine photographs would move it to about 8.5.

### Page: About (`/about/`)

**Assessment.** Well-structured, pleasant to read, and it does not tell the story. The sections are right — story, numbers, leadership, promise, facility — but the story section contains no history: no founder, no dates, no milestones. "1965" appears six times on this page as an assertion. The leadership cards show initials, not faces.

| ID | Type | Component | Issue | Severity | Fix |
| --- | --- | --- | --- | --- | --- |
| AB-1 | Content | Our story | No founder, no dates, no milestones — heritage asserted, never evidenced | **High** | C-07 |
| AB-2 | Content | Leadership intro | "The Vadlamani family and team have led… since 1965" implies the four named directors led for 61 years | High | C-07 rewrite |
| AB-3 | Content | Whole page | "1965" six times | Medium | Keep two; replace the rest with specifics |
| AB-4 | UX | Leadership cards | Initials monograms instead of headshots | High | UX-03 |
| AB-5 | Content | "Our facility" | A heading and a four-term tagline — thinnest section on the page | Medium | Fold into Infrastructure or expand |
| AB-6 | Content | Stats | "45+ Kinds of printed products" derived, not supplied | Low | NEEDS BUSINESS CONFIRMATION |
| AB-7 | Open | Whole page | Brief records "over 65 years"/"three generations" against 1965 = 61 years | High | Settle before publishing history |

**Scores.** Visual 7 · Responsive 9 · UI/UX 6 · Content 5 · Functionality 7 · Accessibility 7 · SEO 7 → **Overall 6.7.**

### Page: Contact (`/contact/`)

**Assessment.** The most important page on the site and the most broken. On desktop it is good: two named contacts with direct numbers, WhatsApp, email, both office addresses, working hours, and a well-designed "job ticket" form. On every phone tested it renders inside a 751 px canvas, so the whole page appears at roughly half scale, and the right-hand side is clipped with no way to scroll to it. The form behind it has no email backend.

| ID | Type | Component | Viewport | Issue | Severity | Fix |
| --- | --- | --- | --- | --- | --- | --- |
| CT-1 | CSS | `.map` | 320–430 | `aspect-ratio` + `min-height` resolves width to 731 px in a 335 px container; document 751 px; header stretches with it; `overflow-x: clip` makes the overflow unreachable | **Critical** | R-02 — add `width: 100%` |
| CT-2 | Func | Quote form | All | No email backend; every enquiry depends on WhatsApp opening | **Critical** | F-01 |
| CT-3 | Func | Phone field | All | `pattern` broken at build; "not a phone at all" validates | **Critical** | F-02 |
| CT-4 | Func | Service select | All | Pre-selects "Books & Educational Printing"; `required` never fires | High | F-04 |
| CT-5 | Func | Submit feedback | All | Success shown even if the pop-up was blocked; form never cleared | High | F-03 |
| CT-6 | Content | Required legend | All | Asterisk in the legend is magenta `var(--m)`; the real ones are gold | Low | Use `var(--red)` |
| CT-7 | Content | Form note | All | "We usually reply within a few working hours" — an unconfirmed promise | Medium | NEEDS BUSINESS CONFIRMATION |
| CT-8 | Func | Map embed | All | Rendered empty in test (sandbox blocks Google) | NOT VERIFIED | Check on a real connection |
| CT-9 | UX | Page | All | No indication of what happens after you send, or who replies | Low | "Ramesh or Gopal Krishna will reply…" |

**Scores.** Visual 6 · Responsive 2 · UI/UX 6 · Content 7 · Functionality 4 · Accessibility 7 · SEO 7 → **Overall 5.6.** Two critical defects on the page the whole site funnels into.

**Actions:** CT-1, CT-2, CT-3 — in that order, today.

### Page: 404 (`/404.html`)

**Assessment.** The best-executed page on the site for what it needs to do. "This page went off-register" is a printer's term used correctly and lightly, the oversized 404 with the rotated middle digit is a nice piece of type, and it offers two sensible routes out plus the full footer. Nothing is broken.

| ID | Type | Component | Issue | Severity | Fix |
| --- | --- | --- | --- | --- | --- |
| NF-1 | UX | Exits | Two links only (Home, Contact) | Low | Add Services and Products |
| NF-2 | SEO | — | GitHub Pages serves this; confirm the production host maps 404s to it | Low | Check at launch |
| NF-3 | CSS | `.header-actions` | 320 px overflow | Low | R-03 |

**Scores.** Visual 8 · Responsive 9 · UI/UX 8 · Content 8 · Functionality 9 · Accessibility 8 · SEO 7 → **Overall 8.1.**

### Score summary

| Page | Vis | Resp | UX | Content | Func | A11y | SEO | Overall |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 8 | 8 | 6 | 7 | 6 | 7 | 7 | **7.0** |
| Services | 5 | 3 | 6 | 5 | 7 | 7 | 7 | **5.5** |
| Service details (×6) | 8 | 9 | 8 | 8 | 7 | 7 | 8 | **7.9** |
| Products hub | 8 | 9 | 7 | 6 | 7 | 7 | 7 | **7.3** |
| Product details (×6) | 7 | 9 | 5 | 3 | 7 | 7 | 4 | **5.6** |
| Infrastructure | 5 | 9 | 5 | 7 | 7 | 7 | 7 | **6.6** |
| About | 7 | 9 | 6 | 5 | 7 | 7 | 7 | **6.7** |
| Contact | 6 | 2 | 6 | 7 | 4 | 7 | 7 | **5.6** |
| 404 | 8 | 9 | 8 | 8 | 9 | 8 | 7 | **8.1** |

**Overall website quality score: 6.6 / 10.** A well-engineered site with excellent technical foundations, held back by two critical layout failures, a quote form that cannot email anyone, and a trust problem it cannot code its way out of: no real photographs and no actual history. Fix the four P0 items and it reaches roughly 7.5 within a day. Add real photography and the rewritten product and history copy and it reaches 8.5 — which, for a 61-year-old regional printer, is a site that wins work.

## Phase 9 — Global issues

Problems that affect several pages at once, stated here rather than repeated per page.

### Shared components

| ID | Component | Pages | Issue | Severity |
| --- | --- | --- | --- | --- |
| G-01 | Footer colophon | All 19 | Credits Archivo, Newsreader and JetBrains Mono — the site uses Manrope only; also claims "vermilion" and "press blue", which are not the v4 palette | High |
| G-02 | Contact form | Home, Contact | No email backend; broken phone pattern; pre-selected service; false success message; no reset | Critical |
| G-03 | Header | All 19 | Overflows the viewport by 7 px at 320 px | Low |
| G-04 | Header | All 19 | Brand link's accessible name omits its visible text (SC 2.5.3) | Serious |
| G-05 | Mobile menu | All 19 | Focus not moved into the menu; page behind stays tabbable | Moderate |
| G-06 | Floating WhatsApp | All 19 | Outside all landmarks | Moderate |
| G-07 | `CTA` component | 12 pages | Same three buttons (Get a quote / phone / WhatsApp) on every page, directly above a footer that repeats the same CTA | Medium |
| G-08 | Footer | All 19 | `.socials` renders nothing — all four social URLs are empty strings | Low |

### Typography and colour

| ID | Issue | Detail | Severity |
| --- | --- | --- | --- |
| G-09 | Gold on light fails contrast | `#94702f` on `#f4f6fa` = 4.2:1; `#c9a45c` on white = 2.34:1 | Serious |
| G-10 | `font-stretch` is inert | \~20 declarations at 62–92%; Manrope has no width axis | Low |
| G-11 | Three font tokens, one font | `--font-display`, `--font-serif` and `--font-mono` all alias Manrope, so `.serif`, `.serif-i` and `.mono` carry no distinction | Low |
| G-12 | Global `font-style: normal !important` | `*, *::before, *::after` — kills italics everywhere, including legitimate emphasis | Low |
| G-13 | Orphan CMYK tokens | `--c`, `--m`, `--y` survive from v3; `--m` still leaks into the form's required-field legend | Low |
| G-14 | `--red` is not red | The variable named `--red` holds gold `#94702f`, a v3 leftover. Any new developer will misuse it | Low |

### Global CSS and dead code

`global.css` is 988 lines in which a v4 "Heritage Navy" block at the end overrides a v3 "Plant" layer, which overrides the original system. Both earlier layers are still fully present. Measured dead or unreachable:

- `.filter` / `initFilter` — no filter bar exists on any page
- `.hero__dots`, `initSlideshow`, `@keyframes dotfill` — the hero carries one image
- `.quote`, `.stars` — no testimonials anywhere
- `.toc`, `.toc__thumb` — the contents list was replaced by photo cards
- `.press-band`, `.machine-list`, `.btn--light {}` (empty rule), `.cta__dots`, `.footer-wordmark`, `.footer-promise`, `.footer-badges` (all `display: none`)
- `accent-c/m/y/k` — four classes resolving to one colour
- `.process.no-pin` scroll-jacking rules, superseded by `.process__pin { min-height: 0 }`

None of this breaks anything, but it is roughly a third of the stylesheet, and G-01 (the wrong colophon) is exactly the kind of error that stale layers produce. A cleanup pass before handover is worth half a day.

### Global responsive

| ID | Issue | Severity |
| --- | --- | --- |
| G-15 | `body { overflow-x: clip }` hides overflow bugs instead of surfacing them — this is why CT-1 went unnoticed | Medium |
| G-16 | A width rule scoped to one page's layout (`.process-step { width: 380px }`) leaks site-wide | Critical (causes SV-1) |
| G-17 | No automated viewport regression check | Medium |

### Repeated content

- The **process steps** appear on `/` and `/services/` with different headings and layouts.
- The **full contact form** appears on `/` and `/contact/`.
- The **machine list** appears on `/` (spec table), `/infrastructure/` (catalogue) and in service detail pages.
- The **leadership team** appears on `/` and `/about/`.
- The **tagline** "Quality Printing · Competitive Prices · Timely Delivery" appears in the footer, the promise band, the About page and the meta description.
- **"Since 1965"** appears in the header subtitle, hero eyebrow, hero stat, heritage section, About (×6), footer brand and footer colophon.

### Performance

| ID | Issue | Detail | Severity |
| --- | --- | --- | --- |
| G-18 | Hero video | 1.9 MB `press-loop.mp4` = 61% of desktop page weight, for decoration | Medium |
| G-19 | Full-screen blend overlay | `body::after` — fixed halftone + `feTurbulence` noise at `z-index: 300` with `mix-blend-mode: multiply`, composited on every scroll of every page, at 2.5% opacity | Low |
| G-20 | Unused dependencies | Archivo, Newsreader, JetBrains Mono, gsap, lenis installed, none imported | Low |
| G-21 | Source image weight | 78 MB of generated variants; originals up to 1.4 MB | Low |

### Global SEO

| ID | Issue | Severity |
| --- | --- | --- |
| G-22 | `SITE.url` is a placeholder domain, baked into every canonical, OG URL, sitemap entry and schema `@id` | Critical before launch |
| G-23 | Canonicals on the preview include the base path | Medium |
| G-24 | Home page duplicates five subpages | Medium |
| G-25 | Six thin product pages | High |
| G-26 | No Google Business Profile link; `mapLink` is still a Maps search | High |
| G-27 | Approximate geo-coordinates in structured data | Medium |
| G-28 | `sameAs` empty; no social presence linked | Low |
| G-29 | Published opening hours and addresses are unconfirmed but already in schema | High |

## Phase 10 — Prioritised fix plan

Effort is developer time, excluding photography and anything waiting on the business.

### P0 — Critical (do today; \~3.5 hours)

| ID | Page | Issue | Fix | Effort |
| --- | --- | --- | --- | --- |
| P0-1 | /services/ | Process cards overlap 127–137 px; text clipped mid-word; container overflow at every desktop width | Scope the 380 px width to `.process .process__track > .process-step` | 15 min |
| P0-2 | /contact/ | Map resolves to 731 px in a 335 px container; page renders at \~50% scale on every phone; overflow unreachable | Add `width: 100%` to `.map` | 5 min |
| P0-3 | Form (2 pages) | No email backend — every enquiry depends on WhatsApp opening | Get a Web3Forms key, set `web3formsKey`, test end to end | 45 min |
| P0-4 | Form (2 pages) | Phone `pattern` broken at build; any text validates | `String.raw` the pattern in frontmatter, add `title`, verify the backslash survives in the built HTML | 30 min |
| P0-5 | Global | `SITE.url` is a placeholder domain, baked into every canonical, OG tag, sitemap URL and schema `@id` | Settle the domain and set it | 10 min + decision |
| P0-6 | Global | Add a viewport regression check so the next overflow is caught before release | Assert `scrollWidth <= clientWidth` at 320/375/768 on all pages in CI | 1 hr |

### P1 — High (this week; \~2 days plus photography)

| ID | Page | Issue | Fix | Effort |
| --- | --- | --- | --- | --- |
| P1-1 | /infrastructure/ | "Photo coming soon" ×9 | Remove the label; add the 9 machine photos when available | 20 min + shoot |
| P1-2 | Global | Every photo is stock; none shows SGMC | Replace with real photos, same filenames | 2 hr + shoot |
| P1-3 | /about/ | Leadership shown as initials monograms | Headshots, or a plain names-and-roles list | 1 hr + shoot |
| P1-4 | /services/ | "Explore web", "Explore single", "Explore bulk" ×6 | Hand-written CTA label per service (C-01) | 30 min |
| P1-5 | /services/prepress/ | "Need pre-press & ctp?" | Hand-written heading (C-02) | 10 min |
| P1-6 | /products/\* | "Planning specialised?" ×6 | Hand-written headings (C-03) | 30 min |
| P1-7 | All 19 | Footer colophon credits three unused typefaces and a palette that is not used | Rewrite or delete (C-04) | 10 min |
| P1-8 | /products/\* | \~60 words per page; no specs, quantities or turnaround | Rewrite all six to the C-06 structure | 1 day (copy) |
| P1-9 | /services/ | Hero lead is generic agency copy | Rewrite (C-05) | 15 min |
| P1-10 | /about/ | No founder, no dates, no milestones; "led since 1965" claim is wrong | Rewrite (C-07) — blocked on business facts | 2 hr (copy) |
| P1-11 | Form | Service dropdown pre-selects a category; `required` never fires | Add a disabled empty option | 10 min |
| P1-12 | Form | Success message shown even when the pop-up is blocked; form never cleared | Check the `window.open` return value; reset on success (F-03) | 20 min |
| P1-13 | All 19 | Eyebrow and step-number contrast fail (4.2:1 and 2.34:1) | Use `--red-deep #7a5b22` for small text on light | 20 min |
| P1-14 | All 19 | Brand link's accessible name omits its visible text | Drop or rewrite the `aria-label` | 10 min |
| P1-15 | Global | No trust elements anywhere — no testimonials, clients or guarantees | Add 3 real customer quotes | 1 hr — blocked on business |
| P1-16 | Global | Opening hours, addresses, email and WhatsApp number are published but unconfirmed | Confirm, then remove the TODOs | 30 min — blocked on business |
| P1-17 | Global | No Google Business Profile | Create and verify it, link from `mapLink` | 1 hr — blocked on business |

### P2 — Medium (this month; \~2 days)

| ID | Page | Issue | Fix | Effort |
| --- | --- | --- | --- | --- |
| P2-1 | / | 14 sections duplicating five other pages | Cut to 8 sections (UX-04) | 4 hr |
| P2-2 | / | Five competing CTAs | One primary ask per screenful | 1 hr |
| P2-3 | / | Product card titles auto-stripped and inconsistent | Hand-write six titles (C-08) | 20 min |
| P2-4 | /products/colour-options/ | Slug and title disagree | Rename slug, add redirect | 30 min |
| P2-5 | /infrastructure/ | Departments and machines both `h3` | Promote departments to `h2` | 20 min |
| P2-6 | /infrastructure/ | No machine specs | Add sheet size, max colours, speed | 1 hr — blocked on business |
| P2-7 | All 19 | Mobile menu: focus not moved, page behind tabbable | Move focus, `inert` on `main` (A-04) | 30 min |
| P2-8 | All 19 | Floating WhatsApp outside all landmarks | Wrap in an `aside` with a label | 10 min |
| P2-9 | Global | Preview canonicals include the base path | Strip `BASE_PATH` when building the canonical | 30 min |
| P2-10 | Global | 1.9 MB hero video | Compress to \~800 KB or drop | 1 hr |
| P2-11 | / and /services/ | Process steps duplicated | Keep on /services/, link from home | 30 min |
| P2-12 | /products/ | Six undifferentiated category blocks | Weight Books & Educational as the core line | 1 hr |
| P2-13 | Form | Native validation bubbles only | Inline alert messages wired with `aria-describedby` | 2 hr |
| P2-14 | Global | `overflow-x: clip` masking layout bugs | Keep, but rely on P0-6 to catch regressions | — |

### P3 — Low (backlog; \~1 day)

| ID | Page | Issue | Fix | Effort |
| --- | --- | --- | --- | --- |
| P3-1 | All 19 | Header overflows 7 px at 320 px | Media query at ≤360 px (R-03) | 20 min |
| P3-2 | / | Process grid lays out 3+2 with a large gap | `repeat(auto-fit, minmax(220px,1fr))` | 15 min |
| P3-3 | /services/ | Six nowrap jump pills clutter the hero on mobile | Shorten labels or remove | 20 min |
| P3-4 | All 19 | `<em>` used for colour, not emphasis | Swap to a `proof` span class | 30 min |
| P3-5 | Global | About a third of `global.css` is dead v3 code | Cleanup pass | 4 hr |
| P3-6 | Global | `font-stretch` inert on a weight-only font | Delete the declarations | 30 min |
| P3-7 | Global | `--red` holds gold; orphan CMYK tokens | Rename tokens | 1 hr |
| P3-8 | Global | Unused dependencies (Archivo, Newsreader, JetBrains Mono, gsap, lenis) | Remove from `package.json` | 15 min |
| P3-9 | Global | 78 MB of source image variants, originals to 1.4 MB | Downsample originals to \~2400 px | 1 hr |
| P3-10 | Global | Full-screen blend overlay on every page | Disable below 768 px | 15 min |
| P3-11 | / and /products/ | Dead filter and slideshow code | Delete or implement | 1 hr |
| P3-12 | /404.html | Only two exit links | Add Services and Products | 10 min |
| P3-13 | Contact form | Legend asterisk magenta, real ones gold | Change to `var(--red)` | 5 min |
| P3-14 | Global | `format-detection: telephone=no` makes prose numbers untappable on iOS | Wrap every customer-facing number in a `tel:` link | 20 min |

### Suggested sequence

1. **Day 1** — all six P0 items. The site stops being visibly broken and starts capturing enquiries by email.
2. **Day 2** — the text-only P1 items: P1-4 to P1-9 and P1-11 to P1-14. Cheap, and they remove every piece of broken English and the false colophon.
3. **Week 1** — book the photographer; meanwhile write the six product pages (P1-8) and draft the history (P1-10) against whatever the business confirms.
4. **Week 2** — photography lands; P1-1, P1-2, P1-3 and the trust elements go in. This is the step that changes how the site feels.
5. **Month 1** — the P2 trim of the home page and the accessibility fixes.
6. **Backlog** — P3, with the CSS cleanup (P3-5) scheduled before any further feature work, not after.

## Open questions — NEEDS BUSINESS CONFIRMATION

Everything here is currently published on the live site, or needed to fix something that is. Several are already flagged as TODO in `src/config/site.ts` and `docs/client-brief.md`; they are collected here because they are now visible to customers and to Google, not just sitting in a backlog.

### Published but unconfirmed — highest risk

| # | Item | Currently on the site | Why it matters |
| --- | --- | --- | --- |
| 1 | Head office address | "Near Ali Cafe 'X' Roads, Amberpet, Hyderabad – 500 013" | In the footer, contact page and LocalBusiness schema. The brief lists address as still needed |
| 2 | Branch address | "Green Industrial Park, Dandu Malkapur (V), Choutuppal (M), Yadadri Bhuvanagiri – 508 252" | Same |
| 3 | Email | `sgmcprinters@gmail.com` | Published and in schema; the brief lists email as still needed |
| 4 | Opening hours | Mon–Sat 9:30 AM – 7:30 PM, Sunday closed | Marked `// TODO: confirm`, yet in structured data where Google may show it. Wrong hours send customers to a closed building |
| 5 | WhatsApp number | `919701099777` (Ramesh's) | Marked `// TODO: confirm this number is on WhatsApp`. All 13 WhatsApp links, the floating button and — because there is no email backend — **every form submission** depend on it |
| 6 | Map coordinates | 17.3937, 78.5166 | Marked `// TODO: exact pin`. Approximate coordinates in schema misdirect customers |
| 7 | Response-time promise | "We usually reply within a few working hours" | A commitment on the contact form. Only keep it if it will be met |
| 8 | Price range | `priceRange: '₹₹'` in schema | Invented. Remove or confirm |

### The heritage arithmetic

| # | Question | Detail |
| --- | --- | --- |
| 9 | Is the founding year 1965? | The brief records the client saying "over 65 years" and "three generations", but 1965 is 61 years ago. The site commits to 1965 in roughly 15 places |
| 10 | How many generations? | The site says "Generations of experience" and "across generations" without a number. Name it if it is three |
| 11 | Who founded the company, and when did each of the four named directors join? | Needed before any history copy. The current line implies all four have led since 1965 |
| 12 | Key milestones with years | First offset press, first web offset line, the move to CTP, the Choutuppal facility. Three dated facts would do more for credibility than any design change |

### Needed to fix the content

| # | Question | Blocks |
| --- | --- | --- |
| 13 | Minimum order quantity, per product type | The product page rewrite (C-06) |
| 14 | Typical turnaround in working days, per service | Product and service pages — the most common buyer question, currently unanswered |
| 15 | Machine specs: max sheet size, max colours, speed | Infrastructure page (P2-6) |
| 16 | Paper and board weights handled | Product pages |
| 17 | Three to five real customer references (schools, publishers) | All trust elements (P1-15). The brief already flags this as an ask |
| 18 | Any certifications, registrations or memberships | Trust elements |
| 19 | Does "Shor-Printing" mean short-run printing? | The site has committed to that reading across many pages |
| 20 | Is "45+ kinds of printed products" accurate? | Derived by counting list items, not supplied |
| 21 | Floor area, staff count, annual volume | Infrastructure credibility; any one real figure helps |

### Decisions

| # | Question |
| --- | --- |
| 22 | What is the final domain? Every canonical, Open Graph URL, sitemap entry and schema `@id` is currently built from a placeholder |
| 23 | Which inbox should quote requests arrive in? Required to configure the form backend (P0-3) |
| 24 | Are there social profiles to link? All four `sameAs` entries are empty |
| 25 | Can we photograph the press floor, the nine machines and the four directors, and is there any archive material from the early years? |

### The two that matter most

If only two things come back from the business, make them **#23** (an inbox for the form, so enquiries stop depending on WhatsApp) and **#25** (permission to photograph). The first closes the biggest functional hole on the site; the second closes the biggest credibility one.

---

## Sources

All findings were produced by testing the site itself. Build audited: `saicharanchanda/sgmc-printers`, branch `design-v4`, commit `166116a`, built with `BASE_PATH=/sgmc-printers/v4` and verified identical to [the live preview](https://saicharanchanda.github.io/sgmc-printers/v4/). Business facts and the list of unconfirmed items are drawn from the repository's own `docs/client-brief.md` (received 2026-11-03), `docs/image-credits.md` and `src/config/site.ts`. Accessibility results come from axe-core run at WCAG 2.0/2.1/2.2 A + AA plus best-practice rules; layout and performance figures are measurements from Chrome.
