// Viewport regression check against the BUILT site (dist/), not the source.
// Serves dist/ under BASE_PATH, loads every page at every viewport in Chrome and asserts:
//   1. no horizontal overflow  (documentElement.scrollWidth <= clientWidth)
//   2. no two .process-step cards on the same row overlap
//   3. no console errors / uncaught page errors
// Usage: build first (with BASE_PATH + apply-base), then
//   BASE_PATH=/sgmc-printers/v4 node scripts/qa-check.mjs [--json out.json]
// Needs a local Chrome (playwright-core, channel 'chrome', or CHROME_PATH). Exits 1 if anything fails.
import { createServer } from 'node:http';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, extname, relative, sep } from 'node:path';
import { chromium } from 'playwright-core';

const DIST = 'dist';
const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
const VIEWPORTS = [320, 375, 768, 1024, 1280, 1440, 1920];
const HEIGHT = { 320: 568, 375: 812, 768: 1024, 1024: 768, 1280: 800, 1440: 900, 1920: 1080 };
const jsonOut = process.argv.includes('--json') ? process.argv[process.argv.indexOf('--json') + 1] : null;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json', '.json': 'application/json',
};

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

// Every built page, as a URL path: dist/services/index.html -> /services/
const pages = [];
for await (const f of walk(DIST)) {
  const rel = relative(DIST, f).split(sep).join('/');
  pages.push('/' + rel.replace(/(^|\/)index\.html$/, '$1'));
}
pages.sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length) || '/';
  let file = join(DIST, p);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end(await readFile(join(DIST, '404.html')).catch(() => 'not found'));
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;

// CHROME_PATH overrides Playwright's own lookup of the installed Chrome.
const browser = await chromium.launch(process.env.CHROME_PATH
  ? { executablePath: process.env.CHROME_PATH, headless: true }
  : { channel: 'chrome', headless: true });

async function check(path, width) {
  const ctx = await browser.newContext({ viewport: { width, height: HEIGHT[width] } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); });
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
  // Third-party iframes (Google Maps) are not part of the build under test.
  await page.route((u) => !u.href.startsWith(origin), (r) => r.abort());
  await page.goto(origin + BASE + path, { waitUntil: 'load', timeout: 30000 });
  // Scroll through so lazy images and scroll reveals settle, then back to the top.
  await page.evaluate(async () => {
    const step = innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
    scrollTo(0, 0);
    // Let reveal transitions finish; a card mid-slide is not a layout defect.
    await Promise.race([
      Promise.all(document.getAnimations().filter((a) => a.effect?.getTiming().iterations !== Infinity).map((a) => a.finished.catch(() => {}))),
      new Promise((r) => setTimeout(r, 3000)),
    ]);
  });
  const m = await page.evaluate(() => {
    const de = document.documentElement;
    const steps = [...document.querySelectorAll('.process-step')]
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.width > 0 && r.height > 0);
    let overlap = 0;
    for (let i = 0; i < steps.length; i++) {
      for (let j = i + 1; j < steps.length; j++) {
        const a = steps[i], b = steps[j];
        const v = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        const h = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        // Same row = vertical ranges overlap by more than half the shorter card.
        if (v > Math.min(a.height, b.height) / 2 && h > 1) overlap = Math.max(overlap, Math.round(h));
      }
    }
    return { sw: de.scrollWidth, cw: de.clientWidth, steps: steps.length, overlap };
  });
  await ctx.close();
  // Blocked third-party requests log "Failed to load resource" errors; those are not build defects.
  const real = errors.filter((e) => !/net::ERR_FAILED|ERR_BLOCKED_BY_CLIENT/.test(e));
  const fails = [];
  if (m.sw > m.cw) fails.push(`overflow +${m.sw - m.cw}px`);
  if (m.overlap) fails.push(`process-step overlap ${m.overlap}px`);
  if (real.length) fails.push(`console: ${real[0]}`);
  return { path, width, ...m, errors: real, fails };
}

const jobs = pages.flatMap((p) => VIEWPORTS.map((w) => [p, w]));
const results = [];
const CONCURRENCY = 4;
let next = 0;
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (next < jobs.length) {
    const [p, w] = jobs[next++];
    try { results.push(await check(p, w)); }
    catch (e) { results.push({ path: p, width: w, fails: [`load: ${String(e).slice(0, 120)}`] }); }
  }
}));
await browser.close();
server.close();

// Pass/fail table: one row per page, one column per viewport.
const col = 7;
const pad = Math.max(...pages.map((p) => p.length)) + 2;
const lines = [];
lines.push('page'.padEnd(pad) + VIEWPORTS.map((w) => String(w).padStart(col)).join(''));
for (const p of pages) {
  lines.push(p.padEnd(pad) + VIEWPORTS.map((w) => {
    const r = results.find((x) => x.path === p && x.width === w);
    return (r.fails.length ? 'FAIL' : 'ok').padStart(col);
  }).join(''));
}
const failed = results.filter((r) => r.fails.length).sort((a, b) => pages.indexOf(a.path) - pages.indexOf(b.path) || a.width - b.width);
lines.push('');
lines.push(`${results.length - failed.length}/${results.length} page loads pass (${pages.length} pages x ${VIEWPORTS.length} viewports)`);
for (const r of failed) lines.push(`  FAIL ${r.path} @${r.width}: ${r.fails.join('; ')}`);
console.log(lines.join('\n'));
if (jsonOut) await writeFile(jsonOut, JSON.stringify({ pages, viewports: VIEWPORTS, results, table: lines.join('\n') }, null, 2));
process.exit(failed.length ? 1 : 0);
