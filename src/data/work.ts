// Genuine printed work supplied by the client (SGMC) for the site.
// Add a sample: drop the photo/scan in src/assets/work/ and add an entry below.
// Client brief: show client names only with their permission — captions here stay generic.
// `representative: true` = an illustration supplied by the client (generated, not a photo of a real
// job); it is labelled "Representative image" on the page. Two of them were cropped on 2026-11-08 to
// remove claims the brief rules out: a lamination / hard-case binding options strip and a "65+ years" badge.
import type { ImageMetadata } from 'astro';
import calJanFeb from '../assets/work/calendar-2027-jan-feb.jpg';
import calJulAug from '../assets/work/calendar-2027-jul-aug.jpg';
import scTextbooks from '../assets/work/showcase-textbooks-workbooks.jpg';
import scEducational from '../assets/work/showcase-educational-range.jpg';
import scPublications from '../assets/work/showcase-publications.jpg';
import scJournals from '../assets/work/showcase-journals-periodicals.jpg';
import scHospital from '../assets/work/showcase-hospital-printing.jpg';
import scHospitalPress from '../assets/work/showcase-hospital-forms-press.jpg';
import scCalendar from '../assets/work/showcase-telugu-calendar-2027.jpg';
import scNotepads from '../assets/work/showcase-branded-notepads.jpg';
import scL37 from '../assets/work/showcase-l37-print-run.jpg';

export type WorkSample = {
  image: ImageMetadata;
  title: string;
  text: string;
  alt: string;
  /** product category slug the sample belongs to (src/data/products.ts) */
  category: string;
  /** illustration rather than a photo/scan of a real job — shown with a "Representative image" label */
  representative?: boolean;
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
  // Product showcase illustrations supplied by the client (2026-11-08)
  { image: scTextbooks, category: 'books-educational', representative: true,
    title: 'School textbooks & workbooks', text: 'Subject textbooks and matching workbooks for schools.',
    alt: 'School textbooks and workbooks for mathematics, science, English and social science (representative image)' },
  { image: scEducational, category: 'books-educational', representative: true,
    title: 'Educational & institutional printing', text: 'Textbooks, workbooks, notebooks, lab manuals, question papers, training manuals and study material.',
    alt: 'Range of educational printing: textbooks, workbooks, notebooks, lab manuals, question paper booklets and study material (representative image)' },
  { image: scPublications, category: 'publications', representative: true,
    title: 'Publications', text: 'Books, magazines, journals, annual reports and catalogues.',
    alt: 'Printed publications including a magazine, journal, annual report, product catalogue and textbooks (representative image)' },
  { image: scJournals, category: 'publications', representative: true,
    title: 'Journals & periodicals', text: 'Academic and professional journals printed issue after issue.',
    alt: 'Printed academic journals and periodicals with an open research journal (representative image)' },
  { image: scHospital, category: 'specialised', representative: true,
    title: 'Hospital & medical printing', text: 'Patient case files, registration forms, records and prescription pads.',
    alt: 'Hospital stationery: patient case file, patient record, registration form and prescription pad (representative image)' },
  { image: scHospitalPress, category: 'specialised', representative: true,
    title: 'Hospital forms on press', text: 'Hospital files and forms coming off a sheet-fed offset press.',
    alt: 'Printed hospital files stacked at the delivery end of a Komori offset press (representative image)' },
  { image: scCalendar, category: 'specialised', representative: true,
    title: 'Telugu wall calendar', text: 'Multi-colour wall calendar with a devotional artwork header and panchangam grid.',
    alt: 'Telugu wall calendar page for January 2027 with a devotional artwork header (representative image)' },
  { image: scNotepads, category: 'advertising-promotional', representative: true,
    title: 'Branded notepads', text: 'Company-branded notepads and stationery for business promotion.',
    alt: 'Stacks of company-branded notepads at a printing press (representative image)' },
  { image: scL37, category: 'advertising-promotional', representative: true,
    title: 'Commercial print run', text: 'Commercial print coming off the Komori Lithrone L37 sheet-fed press.',
    alt: 'Printed sheets stacked at the delivery of a Komori Lithrone L37 press (representative image)' },
];
