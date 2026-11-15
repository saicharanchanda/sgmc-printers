// Designs by SGMC's in-house design team, supplied by the client (2026-11-16).
// Groups follow the client's own labels: school books, customized, devotional books, pamphlets, brochures.
// Add a design: put the image in src/assets/design/ and add it to the right group below.
import type { WorkSample } from './work';
import brochureHighway from '../assets/design/brochure-real-estate-highway-project.jpg';
import brochureEnclave from '../assets/design/brochure-real-estate-enclave.jpg';
import pamphletCollege from '../assets/design/pamphlet-junior-college-admissions.jpg';
import recordBook from '../assets/design/school-book-practical-record-book.jpg';
import preschoolCover from '../assets/design/school-book-preschool-cover.jpg';
import ramayanam from '../assets/design/devotional-book-ramayanam.jpg';
import ayyappa from '../assets/design/devotional-book-ayyappa-puja.jpg';
import giftCard from '../assets/design/customized-jewellery-gift-card.jpg';
import wedding from '../assets/design/customized-wedding-invitation.jpg';

export type DesignGroup = { id: string; title: string; text: string; items: WorkSample[] };

export const designGroups: DesignGroup[] = [
  {
    id: 'brochures',
    title: 'Brochures',
    text: 'Project brochures that present a property clearly, from the cover image to the key selling points.',
    items: [
      { image: brochureHighway, category: 'design', title: 'Real-estate project brochure', text: 'Cover for an open-plot and villa-plot project facing the Warangal highway.', alt: 'Brochure cover for a Warangal highway-facing open plots and villa plots project' },
      { image: brochureEnclave, category: 'design', title: 'Residential enclave brochure', text: 'Bilingual English and Telugu cover for an open-plot enclave.', alt: 'Bilingual English and Telugu brochure cover for an open-plots enclave' },
    ],
  },
  {
    id: 'pamphlets',
    title: 'Pamphlets & posters',
    text: 'Bold, easy-to-read layouts for admissions, offers and announcements.',
    items: [
      { image: pamphletCollege, category: 'design', title: 'Junior college admissions', text: 'Admissions pamphlet listing courses, campuses and college codes.', alt: 'Junior college admissions pamphlet listing MPC and BiPC courses and campus locations' },
    ],
  },
  {
    id: 'school-books',
    title: 'School books',
    text: 'Covers for record books, workbooks and school publications, designed around the institution’s identity.',
    items: [
      { image: recordBook, category: 'design', title: 'Practical record book', text: 'Front and back covers for an educational institution’s practical record book.', alt: 'Front and back covers of a practical record book for an educational institution' },
      { image: preschoolCover, category: 'design', title: 'Preschool book cover', text: 'Bright, playful wrap-around cover for a preschool.', alt: 'Colourful wrap-around book cover for a preschool' },
    ],
  },
  {
    id: 'devotional-books',
    title: 'Devotional books',
    text: 'Devotional and cultural books with rich, detailed cover artwork in Telugu.',
    items: [
      { image: ramayanam, category: 'design', title: 'Ramayanam', text: 'Telugu Ramayanam book with an illustrated front cover and photo back cover.', alt: 'Front and back covers of a Telugu Ramayanam book with illustrated artwork' },
      { image: ayyappa, category: 'design', title: 'Ayyappa Swamy puja book', text: 'Telugu puja vidhanam book with a devotional cover and temple photo.', alt: 'Telugu Ayyappa Swamy puja vidhanam book cover and back cover' },
    ],
  },
  {
    id: 'customized',
    title: 'Customized print',
    text: 'One-off and branded pieces designed to order, from gift cards to wedding invitations.',
    items: [
      { image: giftCard, category: 'design', title: 'Jewellery gift card envelope', text: 'Branded gift card envelope with store locations and a QR code.', alt: 'Maroon and gold jewellery gift card envelope design with store locations' },
      { image: wedding, category: 'design', title: 'Wedding invitation', text: 'Bilingual English and Telugu wedding invitation with traditional artwork.', alt: 'Bilingual English and Telugu wedding invitation card with traditional artwork' },
    ],
  },
];

export const allDesigns = designGroups.flatMap((g) => g.items);
