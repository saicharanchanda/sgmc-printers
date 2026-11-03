// Post-build: prefix root-relative links with BASE_PATH (only for GitHub Pages project sites,
// which are served from /<repo>/). Netlify / a custom domain need none of this.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
if (!base) process.exit(0);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(html|webmanifest)$/.test(e.name)) yield p;
  }
}

const attr = /((?:href|src|action|srcset|content)=["'])\/(?!\/)/g;
const already = `${base.slice(1)}/`;
let n = 0;
for await (const file of walk('dist')) {
  let s = await readFile(file, 'utf8');
  s = s.replace(attr, (m, pre, off, str) => (str.startsWith(already, off + m.length) ? m : `${pre}${base}/`));
  // Astro's redirect stubs: <meta http-equiv="refresh" content="0;url=/...">
  s = s.replace(/(content="\d+;\s*url=)\/(?!\/)/g, (m, pre, off, str) => (str.startsWith(already, off + m.length) ? m : `${pre}${base}/`));
  if (file.endsWith('.webmanifest')) s = s.replace(/"(src|start_url)":\s*"\/(?!\/)/g, `"$1": "${base}/`);
  await writeFile(file, s);
  n++;
}
console.log(`apply-base: prefixed links with ${base} in ${n} files`);
