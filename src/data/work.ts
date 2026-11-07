// Genuine printed work supplied by the client (SGMC) for the site.
// Add a sample: drop the photo/scan in src/assets/work/ and add an entry below.
// Client brief: show client names only with their permission — captions here stay generic.
import type { ImageMetadata } from 'astro';
import calJanFeb from '../assets/work/calendar-2027-jan-feb.jpg';
import calJulAug from '../assets/work/calendar-2027-jul-aug.jpg';

export type WorkSample = {
  image: ImageMetadata;
  title: string;
  text: string;
  alt: string;
  /** product category slug the sample belongs to (src/data/products.ts) */
  category: string;
};

export const work: WorkSample[] = [
  {
    image: calJanFeb,
    title: '2027 wall calendar — January & February',
    text: 'Multi-colour Telugu wall calendar with daily panchangam details, festival listings and a full-height advertisement panel.',
    alt: '2027 Telugu wall calendar page for January and February, printed in full colour with a festival list and an advertisement panel',
    category: 'specialised',
  },
  {
    image: calJulAug,
    title: '2027 wall calendar — July & August',
    text: 'Multi-colour Telugu wall calendar with a devotional artwork header, two-month panchangam grid and an advertisement band.',
    alt: '2027 Telugu wall calendar page for July and August, printed in full colour with a devotional header and an advertisement band',
    category: 'specialised',
  },
];
