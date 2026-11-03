// Generates PNG icons + the social share image (public/og-image.png).
// Run after changing branding:  npm run icons
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const mark = await readFile(new URL('../public/favicon.svg', import.meta.url));

const resized = async (size, file) => {
  const inner = Math.round(size * 0.72);
  const markPng = await sharp(mark, { density: 600 }).resize(inner, inner).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#f7f5f0' } })
    .composite([{ input: markPng, gravity: 'center' }])
    .png()
    .toFile(new URL(`../public/${file}`, import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
};

await resized(32, 'favicon-32.png');
await resized(180, 'apple-touch-icon.png');
await resized(192, 'icon-192.png');
await resized(512, 'icon-512.png');

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f7f5f0"/>
  <g style="mix-blend-mode:multiply">
    <circle cx="905" cy="250" r="190" fill="#00a3e0" style="mix-blend-mode:multiply"/>
    <circle cx="1075" cy="250" r="190" fill="#e6007e" style="mix-blend-mode:multiply"/>
    <circle cx="990" cy="420" r="190" fill="#ffd200" style="mix-blend-mode:multiply"/>
  </g>
  <rect x="80" y="92" width="36" height="10" fill="#00a3e0"/><rect x="116" y="92" width="36" height="10" fill="#e6007e"/>
  <rect x="152" y="92" width="36" height="10" fill="#ffd200"/><rect x="188" y="92" width="36" height="10" fill="#0d0f1a"/>
  <text x="80" y="160" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="600" letter-spacing="3" fill="#3b3f50">SHREE GAYATRI MULTI COLOUR PRINTERS</text>
  <text x="76" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="112" font-weight="800" letter-spacing="-4" fill="#0d0f1a">SGMC</text>
  <text x="76" y="400" font-family="Segoe UI, Arial, sans-serif" font-size="112" font-weight="800" letter-spacing="-4" fill="#0d0f1a">Printers</text>
  <text x="80" y="490" font-family="Segoe UI, Arial, sans-serif" font-size="32" fill="#3b3f50">Offset · Digital · Packaging · Finishing</text>
  <rect x="80" y="530" width="300" height="4" fill="#e6007e"/>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(new URL('../public/og-image.png', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
console.log('Icons and og-image generated.');
