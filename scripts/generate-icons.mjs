// Generates PNG icons + the social share image (public/og-image.png).
// Run after changing branding:  npm run icons
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const mark = await readFile(new URL('../public/favicon.svg', import.meta.url));

const resized = async (size, file) => {
  const inner = Math.round(size * 0.72);
  const markPng = await sharp(mark, { density: 600 }).resize(inner, inner).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: markPng, gravity: 'center' }])
    .png()
    .toFile(new URL(`../public/${file}`, import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
};

await resized(32, 'favicon-32.png');
await resized(180, 'apple-touch-icon.png');
await resized(192, 'icon-192.png');
await resized(512, 'icon-512.png');

// Social share image: the client's title card, centred on white.
const card = await sharp(new URL('../src/assets/brand/sgmc-title-card.png', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'))
  .resize({ width: 1000 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#ffffff' } })
  .composite([{ input: card, gravity: 'center' }])
  .png()
  .toFile(new URL('../public/og-image.png', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
console.log('Icons and og-image generated.');
