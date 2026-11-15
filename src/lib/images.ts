import type { ImageMetadata } from 'astro';

// Every photo in src/assets/images (plus the client's work and design images), looked up by file name
// without extension. File names must stay unique across these folders.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/{images,work,design}/*.{jpg,jpeg,png,webp,avif}');

export async function findImage(name: string): Promise<ImageMetadata | null> {
  const key = Object.keys(files).find((k) => k.replace(/^.*\/|\.[^.]+$/g, '') === name);
  return key ? (await files[key]()).default : null;
}

export async function findImages(names: string[]): Promise<ImageMetadata[]> {
  return (await Promise.all(names.map(findImage))).filter((i): i is ImageMetadata => !!i);
}
