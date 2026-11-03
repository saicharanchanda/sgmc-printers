# QA fixes log — 2026-11-04 (overnight)

Branch `qa-fixes-2026-11-04`, cut from `design-v4` @ `166116a`. Every commit is pushed to
`origin/qa-fixes-2026-11-04` (you asked in chat to push after each commit). I opened no PR and
did not touch `design-v4`, `main`, `design-v2` or `design-v3`. The live /v4/ preview is unchanged
until this branch is merged into `design-v4`.

Source: `docs/qa-audit.md`, the audit report exported to Markdown and committed in P0-6.

I verified every task against the **built** `dist/`. Each build used `BASE_PATH=/sgmc-printers/v4`
and then `scripts/apply-base.mjs`, as the Pages workflow does. After every task I re-ran
`scripts/qa-check.mjs` (19 pages × 7 viewports). For behaviour that harness can't see (the form,
the menu, contrast, redirects), I used one-off Playwright probes in Chrome.

Run the harness yourself:

```bash
BASE_PATH=/sgmc-printers/v4 npm run build && BASE_PATH=/sgmc-printers/v4 node scripts/apply-base.mjs && BASE_PATH=/sgmc-printers/v4 npm run qa
```

(On Windows Git Bash, also set `MSYS_NO_PATHCONV=1`, or Bash rewrites `/sgmc-printers/v4` into a
`C:/Program Files/Git/...` path. If Playwright can't find Chrome, set
`CHROME_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe"`.)

---

## 1. Task table

| Task | Status | Commit | Note |
| --- | --- | --- | --- |
| P0-6 harness | done | `52db39f` | `scripts/qa-check.mjs` + `npm run qa`. Baseline failed exactly where the audit said; see §2. Header-edge check added later in `33a7f08`. |
| P0-1 | done | `7f29715` | Audit fix used as written. /services/ now has 5 × 229px cards in its auto-fit grid; home cards unchanged (379px). |
| P0-2 | done | `9321c14` | `width: 100%` on `.map`. /contact/ overflow +431/+376px → 0. |
| P0-3 | blocked | `34b6f90` | Needs a Web3Forms key and the inbox to send to. TODO comments in `site.ts` and `initForm`. |
| P0-4 | done | `0e98ad0` | `String.raw` pattern + `title`. `dist/` contains `[0-9+\- ]{10,15}`. Chrome rejects all four bad inputs and accepts all three good ones from the audit. |
| P0-5 | blocked | `34b6f90` | Needs the final domain. TODO comment at `SITE.url`. |
| P1-4 | done | `1d6e19d` | Audit labels used as written, in a `cta` field. The short `label` field ("Web offset"…) feeds the overlay word and, later, the pills (UX-13). |
| P1-5 | done | `5d13988` | Optional `ctaTitle` on a service; set only for pre-press. |
| P1-6 | done | `3e83c90` | All six headings used as written. |
| P1-7 | done | `28c7f16` | Audit replacement colophon used as written. |
| P1-11 | done | `290a378` | Disabled empty option. `required` now fires; `?service=` prefill still works. |
| P1-12 | **reverted / skipped** | — | Audit code does not behave as predicted; see §4.1. |
| P1-13 | done | `7b55d88` | `--red-deep` for eyebrows and step numbers on light. Measured minimum is now 5.8:1 (was 4.2:1 and 2.34:1). |
| P1-14 | done | `225af05` | `aria-label` dropped; also added the missing space between "Gayatri" and "Multi". |
| P1-8 | done | `537748c` | All six product pages rewritten to the C-06 structure (~200 → 330–436 words each). Packaging & Label uses the worked example as written. Quantities/turnaround are left out, with NEEDS comments. |
| P2-5 | done | `0b0e611` | Departments are now h2, machines h3; no heading-level skips. |
| P2-7 | done (1 deviation) | `34738a5` | See §4.2. Focus moves into the menu, `main`/`footer`/fab go inert, Escape refocuses the toggle. |
| P2-8 | done | `e88748b` | `<aside aria-label="Quick contact">`; button position unchanged. |
| P2-9 | done | `86f5ddd` | Canonical and og:url have the base path stripped. |
| P3-1 | done | `3d2ce2b` | Audit R-03 CSS used as written. Header overflow at 320 on all 19 pages goes from +7px to 0. |
| P3-2 | skipped (superseded) | — | P2-11 removed the home process grid, so there is no 3+2 layout left to fix. |
| P3-13 | done | `9bc1bd8` | Legend asterisk now uses `var(--red)`. |
| C-05 / P1-9 | done | `9472a8b` | Audit lead used as written. |
| C-08 / P2-3 | done | `9b82e80` | Six hand-written card titles used as written. |
| C-09 | done | `480fae2` | "Product types"; new /products/ H1; "9 options"; 100% in-house shown once (heritage facts are now 2 columns). The "Three generations" heritage wording is **not** applied (needs confirmation). |
| UX-01 (code half) | done | `fa57376` | "Photo coming soon" ×9 → 0. Cards show the department photo with no label. |
| UX-06 / P2-11 | done | `bc144f2` | Home shows a compact band linking to `/services/#process`. Dead `.process` CSS left in place, as you asked. |
| UX-13 / P3-3 | done | `b4b11ba` | The pills wrap to 3 rows at 375px. |
| UX-11 / A-06 | done | `5faf98d` | 10 decorative `<em>` → `span.proof`. Computed styles of all 17 accent words are identical before and after. |
| UX-12 / P3-10 | done | `1de9a5c` | `body::after` is off below 768px. |
| A-07 / P2-13 | done | `7ad4366` | Inline `role="alert"` errors linked by `aria-describedby`; focus goes to the first invalid field. See §4.4. |
| P2-4 | done | `8dbe532` | Slug and photo renamed. Redirects: an Astro meta-refresh stub plus `public/_redirects` (301 on Cloudflare). Link crawl: 0 broken. See §4.5. |
| S-06 / P3-14 | done | `2cefd95` | Numbers in the FAQ answer are now `tel:` links; JSON-LD keeps the plain text. No untappable numbers on any page. |
| P3-12 | done | `4ca573b` | The 404 page adds Services and Products links. |
| P2-10 | **blocked** | — | No ffmpeg here. Getting one means downloading and running a binary, which I didn't do unattended without your OK. The video is untouched. |
| C-07 (partial) | done | `b5a14a3` | Leadership lead now uses the audit line. Founder, milestones and generations are NEEDS comments. |
| (extra) | done | `73d07b9` | NEEDS comments on the reply-time promise, the "generations" count and `priceRange`. Comments only. |

---

## 2. qa-check output — baseline vs final

**Baseline:** the original `design-v4` @ `166116a`, rebuilt in a temporary worktree and checked with
the *final* harness (all four checks).

```
page                                      320    375    768   1024   1280   1440   1920
/                                        FAIL     ok     ok     ok     ok     ok     ok
/404.html                                FAIL     ok     ok     ok     ok     ok     ok
/about/                                  FAIL     ok     ok     ok     ok     ok     ok
/contact/                                FAIL   FAIL     ok     ok     ok     ok     ok
/infrastructure/                         FAIL     ok     ok     ok     ok     ok     ok
/products/                               FAIL     ok     ok     ok     ok     ok     ok
/products/advertising-promotional/       FAIL     ok     ok     ok     ok     ok     ok
/products/books-educational/             FAIL     ok     ok     ok     ok     ok     ok
/products/colour-options/                FAIL     ok     ok     ok     ok     ok     ok
/products/packaging-labels/              FAIL     ok     ok     ok     ok     ok     ok
/products/publications/                  FAIL     ok     ok     ok     ok     ok     ok
/products/specialised/                   FAIL     ok     ok     ok     ok     ok     ok
/services/                               FAIL     ok     ok   FAIL   FAIL   FAIL   FAIL
/services/binding-finishing/             FAIL     ok     ok     ok     ok     ok     ok
/services/bulk-printing/                 FAIL     ok     ok     ok     ok     ok     ok
/services/colour-printing/               FAIL     ok     ok     ok     ok     ok     ok
/services/prepress/                      FAIL     ok     ok     ok     ok     ok     ok
/services/sheet-fed-offset-printing/     FAIL     ok     ok     ok     ok     ok     ok
/services/web-offset-printing/           FAIL     ok     ok     ok     ok     ok     ok

109/133 page loads pass (19 pages x 7 viewports)
  FAIL /contact/ @320: overflow +431px; header +7px past viewport
  FAIL /contact/ @375: overflow +376px
  FAIL /services/ @1024: overflow +119px; process-step overlap 139px
  FAIL /services/ @1280: overflow +117px; process-step overlap 137px
  FAIL /services/ @1440: overflow +51px; process-step overlap 127px
  FAIL /services/ @1920: process-step overlap 127px
  FAIL <every other page> @320: header +7px past viewport
```

Without the header check that I added later, the first-version harness failed 6/133 on the same
build. That run is the baseline the brief asked for: /services/ 1024–1920 and /contact/ 320–375.

**Final:** branch head.

```
page                                      320    375    768   1024   1280   1440   1920
/                                          ok     ok     ok     ok     ok     ok     ok
/404.html                                  ok     ok     ok     ok     ok     ok     ok
/about/                                    ok     ok     ok     ok     ok     ok     ok
/contact/                                  ok     ok     ok     ok     ok     ok     ok
/infrastructure/                           ok     ok     ok     ok     ok     ok     ok
/products/                                 ok     ok     ok     ok     ok     ok     ok
/products/advertising-promotional/         ok     ok     ok     ok     ok     ok     ok
/products/books-educational/               ok     ok     ok     ok     ok     ok     ok
/products/packaging-labels/                ok     ok     ok     ok     ok     ok     ok
/products/printing-options/                ok     ok     ok     ok     ok     ok     ok
/products/publications/                    ok     ok     ok     ok     ok     ok     ok
/products/specialised/                     ok     ok     ok     ok     ok     ok     ok
/services/                                 ok     ok     ok     ok     ok     ok     ok
/services/binding-finishing/               ok     ok     ok     ok     ok     ok     ok
/services/bulk-printing/                   ok     ok     ok     ok     ok     ok     ok
/services/colour-printing/                 ok     ok     ok     ok     ok     ok     ok
/services/prepress/                        ok     ok     ok     ok     ok     ok     ok
/services/sheet-fed-offset-printing/       ok     ok     ok     ok     ok     ok     ok
/services/web-offset-printing/             ok     ok     ok     ok     ok     ok     ok

133/133 page loads pass (19 pages x 7 viewports)
```

Notes on the harness:

- **First-run false positives.** The harness at first reported overlapping `.process-step` cards at
  375/768. These were cards caught mid-reveal: their `translateY` was still animating, so stacked
  cards briefly touched. I fixed the harness, not the site. It now waits for finite animations, and
  "same row" means the cards overlap vertically by more than half their height.
- **Header check.** `body { overflow-x: clip }` hides the 320px header overflow from `scrollWidth`.
  I added a fourth check: nothing in `.site-header` may extend past the viewport.
- **Flaky failure.** One run had a single `net::ERR_NO_BUFFER_SPACE` console error on `/` @1440.
  That is a Windows socket error from the local test server under load, not a site defect. A
  re-run passed 133/133.
- **Not covered:** 390/430 widths, real devices, Lighthouse, Core Web Vitals.

---

## 3. NEEDS BUSINESS CONFIRMATION — questions for the client

Line numbers are on branch head.

| # | File : line | Question |
| --- | --- | --- |
| 1 | `src/config/site.ts:20` | What is the final production domain? It is baked into every canonical, OG URL, sitemap entry and schema `@id`. (P0-5) |
| 2 | `src/config/site.ts:94` | Which inbox should quotes go to? We need it to set up a Web3Forms key. Until then every enquiry depends on WhatsApp opening. (P0-3) |
| 3 | `src/data/products.ts:44` | Books & Educational: minimum order quantity, typical turnaround (working days), paper weights. |
| 4 | `src/data/products.ts:76` | Publications & Commercial: same three facts. |
| 5 | `src/data/products.ts:109` | Advertising & Promotional: same three facts. |
| 6 | `src/data/products.ts:133` | Packaging & Label: same three facts. |
| 7 | `src/data/products.ts:166` | Specialised: same three facts. |
| 8 | `src/data/products.ts:201` | Additional Printing Services: same three facts. |
| 9 | `src/pages/products/[slug].astro:75` | Template note: the "Quantities and turnaround" subsection stays hidden until #3–8 come back. |
| 10 | `src/pages/about.astro:47` | Who founded the company, what was printed first, and where? Dated milestones: first offset press, web offset line, CTP replacing film, Choutuppal facility. Number of generations. Is it "over 65 years" (client draft) or 1965 (61 years)? |
| 11 | `src/pages/index.astro:173` | Is it "three generations"? If confirmed, the audit's line is "Three generations of printing experience, …". |
| 12 | `src/components/ContactForm.astro:15` | Will the business honour "We usually reply within a few working hours"? |
| 13 | `src/components/CTA.astro:7` | Same promise in the CTA ("usually within a few hours"), on 12 pages. |
| 14 | `src/layouts/BaseLayout.astro:67` | `priceRange: '₹₹'` in the structured data is invented. Confirm it or remove it. |

These existing TODOs in `src/config/site.ts` are also still open: exact map pin (`geo`), whether
Ramesh's number is on WhatsApp, opening hours, the Google Business Profile link and the social URLs.
The audit's *Open questions* section has the full list.

One more thing to check (not commented in code): the product pages tell customers to send "a
print-ready PDF with 3 mm bleed". That comes from the audit's worked example and the existing
pre-press FAQ. Confirm it is the bleed the pre-press team actually wants.

---

## 4. Where what I observed disagreed with the audit

1. **P1-12 (F-03): the audit's fix would show the error message to everyone.** I applied the code
   verbatim and tested it in Chrome. The WhatsApp window opened, but the page said "Your browser
   blocked the WhatsApp window…" and did not reset the form.
   - **Cause:** with the `'noopener'` feature, `window.open` always returns `null` (per the HTML
     spec). The `if (win)` branch can never run.
   - **What I did:** reverted it, per your rules. The form still shows the old unconditional
     success message and still doesn't reset after the WhatsApp fallback.
   - **Suggested fix (not applied):** call `window.open(waUrl, '_blank')` without `noopener`, then
     `if (win) { win.opener = null; form.reset(); … }`.

2. **P2-7: the audit snippet steals focus on every page load.** The snippet calls `toggle.focus()`
   whenever `set(false)` runs, and `initMenu` calls `set(false)` at startup. I applied the snippet
   with one guard: focus returns to the toggle only when the menu was actually open. Everything
   else is as written.

3. **SV-4 / C-01: the "photo overlay word" never renders on the built site.** `Media.astro`
   renders `word` only in the no-photo fallback, and every service has a photo. So "Web",
   "Single", "Bulk" never appeared over photos. I still switched the prop to the hand-written
   label, which does no harm.

4. **A-07 needed more than the brief described.** Native validation runs before the `submit`
   event, and `submit` never fires while a field is invalid. Cancelling `invalid` (to replace the
   bubbles) also cancels the browser's own focus move. So focus is moved from the `invalid`
   handler instead. Keyboard and screen-reader users land on the first invalid field.

5. **P2-4: Astro's redirect stub isn't base-aware.** On the preview, the generated stub refreshed
   to `/products/printing-options/`, outside `/sgmc-printers/v4/`. I extended `apply-base.mjs` to
   prefix `content="0;url=/…"`. On a root deploy, `public/_redirects` gives a real 301 on
   Cloudflare Pages.

6. **Baseline viewports.** The brief expected /contact/ to fail at 320–430. The harness checks 320
   and 375 only, and both failed (+431px, +376px). 390/430 aren't in its list.

7. **P3-2** is moot once P2-11 lands, so I skipped it rather than fixing code that would be
   deleted.

---

## 5. Problems the audit missed

1. **Some h1s read with no space between their lines.** PageHero (and the infrastructure hero)
   wrap each line in its own span with no whitespace between them. The h1 text is therefore
   "Additional Printing**Services**" and "Complete in-house**printing** facility". This is what
   screen readers announce and what search engines read as the heading. Fix: put a space (or
   `{' '}`) between the line spans. This is the same class of bug as the brand link I fixed in
   P1-14.
2. **"Archive · The press hall … Est. 1965" sits under a stock photo** on the home heritage
   section. It implies the photo is SGMC's own archive. Given the audit's trust concerns, change
   the caption or replace the photo with a real one.
3. **The preview sitemap's `<loc>` URLs include `/sgmc-printers/v4/`.** This is the same leak as
   S-02, in `sitemap-0.xml`. It's harmless while the preview is noindexed, but `pageMeta` in
   `astro.config.mjs` already knows the base and could strip it too.
4. **Service detail pages and product pages still auto-generate `word={title.split(' ')[0]}`.**
   This is invisible today (see §4.3) but becomes "Single" / "Additional" the moment a photo is
   missing. I left the service detail pages alone, as you asked.
5. **The About stat label "Kinds of printed products"** (`site.ts:127`) is the same awkward phrase
   C-09 fixed on the home page. C-09 only listed the home stat, so I didn't change it.
6. **The heritage facts block now has two items in a grid sized for three.** I set it to two
   columns inline. Worth a look when you review the home page structure (P2-1).

## Files left local (not committed)

- `scripts/_*.mjs`: the one-off Playwright probes (form, menu, contrast, redirect, screenshots).
  They are excluded through `.git/info/exclude`.
- `dist/`
