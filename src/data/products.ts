// Product categories from docs/client-brief.md. Each category gets a page at /products/<slug>/.
// Photo: src/assets/images/cat-<slug>.jpg

export type ProductCategory = {
  slug: string;
  title: string;
  short: string;
  /** Hand-written CTA heading at the foot of the category page */
  ctaTitle: string;
  intro: string;
  items: string[];
  services: string[]; // related service slugs
  seoTitle: string;
  seoDescription: string;
};

export const categories: ProductCategory[] = [
  {
    slug: 'books-educational',
    title: 'Books & Educational Printing',
    short: 'Textbooks, workbooks, guides, question papers and notebooks for schools, colleges and publishers.',
    ctaTitle: 'Printing textbooks or notebooks this year?',
    intro:
      'Educational printing is our core strength. We print school and college textbooks, workbooks, guides and exam material in bulk, on schedule for every academic year.',
    items: [
      'School Textbooks & Workbooks',
      'College Textbooks & Study Materials',
      'Educational Content Books',
      'Academic Books & Reference Books',
      'Competitive Examination Books',
      'Guides, Manuals & Handbooks',
      'Question Papers & Answer Books',
      'Children’s Books & Storybooks',
      'Notebooks & Exercise Books',
    ],
    services: ['web-offset-printing', 'binding-finishing', 'bulk-printing'],
    seoTitle: 'Textbook, Notebook & Educational Book Printing',
    seoDescription:
      'Bulk printing of school and college textbooks, workbooks, guides, competitive exam books, question papers, answer books and notebooks.',
  },
  {
    slug: 'publications',
    title: 'Publications & Commercial Printing',
    short: 'Magazines, journals, annual reports, company profiles, catalogues and directories.',
    ctaTitle: 'Planning your next issue or annual report?',
    intro:
      'From monthly magazines to annual reports, we print publications with consistent quality issue after issue — on time, every time.',
    items: [
      'Magazines',
      'Journals & Periodicals',
      'Annual Reports',
      'Company Profiles',
      'Catalogues & Product Catalogues',
      'Directories',
      'Research Publications',
    ],
    services: ['sheet-fed-offset-printing', 'web-offset-printing', 'binding-finishing'],
    seoTitle: 'Magazine, Journal & Catalogue Printing',
    seoDescription:
      'Printing of magazines, journals, periodicals, annual reports, company profiles, catalogues, directories and research publications.',
  },
  {
    slug: 'advertising-promotional',
    title: 'Advertising & Promotional Printing',
    short: 'Brochures, flyers, pamphlets, posters, inserts and promotional booklets.',
    ctaTitle: 'Need brochures, flyers or posters?',
    intro:
      'Marketing material that looks sharp and arrives on time — brochures, flyers, posters and promotional booklets printed in vibrant colour.',
    items: [
      'Brochures',
      'Flyers & Leaflets',
      'Pamphlets',
      'Posters',
      'Product Inserts',
      'Promotional Booklets',
      'Advertising Materials',
      'Business Promotions',
    ],
    services: ['sheet-fed-offset-printing', 'colour-printing', 'bulk-printing'],
    seoTitle: 'Brochure, Flyer, Pamphlet & Poster Printing',
    seoDescription:
      'Full-colour printing of brochures, flyers, leaflets, pamphlets, posters, product inserts and promotional booklets in bulk.',
  },
  {
    slug: 'packaging-labels',
    title: 'Packaging & Label Printing',
    short: 'Product labels, stickers, packaging inserts and product information leaflets.',
    ctaTitle: 'Need labels, stickers or inserts?',
    intro:
      'Printed labels, inserts and information leaflets that go inside and on your product packaging — accurate, consistent and in the quantities you need.',
    items: ['Product Labels', 'Stickers', 'Packaging Inserts', 'Product Information Leaflets'],
    services: ['sheet-fed-offset-printing', 'colour-printing', 'binding-finishing'],
    seoTitle: 'Label, Sticker & Packaging Insert Printing',
    seoDescription:
      'Printing of product labels, stickers, packaging inserts and product information leaflets (PILs) in single to full colour.',
  },
  {
    slug: 'specialised',
    title: 'Specialised Printing',
    short: 'Manuals, technical, medical, religious and literary books, dictionaries, calendars, diaries and certificates.',
    ctaTitle: 'Printing manuals, diaries or certificates?',
    intro:
      'Specialised books and documents that need care and accuracy — from technical manuals and dictionaries to religious books and certificates.',
    items: [
      'Training Manuals',
      'Instruction Manuals',
      'Technical Books',
      'Hospital & Medical Books',
      'Religious Books',
      'Poetry & Literary Books',
      'Dictionaries',
      'Calendars & Diaries',
      'Certificates',
    ],
    services: ['sheet-fed-offset-printing', 'binding-finishing', 'colour-printing'],
    seoTitle: 'Manual, Technical & Religious Book Printing',
    seoDescription:
      'Printing of training and instruction manuals, technical, medical, religious and literary books, dictionaries, calendars, diaries and certificates.',
  },
  {
    slug: 'colour-options',
    title: 'Additional Printing Services',
    short: 'Black & white to full colour, variable data, offset, bulk and short-run printing.',
    ctaTitle: 'Not sure which colour option you need?',
    intro:
      'Every job is different. Choose the colour configuration, method and quantity that suits your content and budget — we will advise on the most economical option.',
    items: [
      'Black & White Printing',
      'Single-Colour Printing',
      'Two-Colour Printing',
      'Four-Colour Printing',
      'Full-Colour Printing',
      'Variable Data Printing',
      'Offset Printing',
      'Bulk Printing',
      'Short-Run Printing',
    ],
    services: ['colour-printing', 'bulk-printing', 'web-offset-printing'],
    seoTitle: 'Black & White and Colour Offset Printing',
    seoDescription:
      'All printing options: black & white, single-colour, two-colour, four-colour and full-colour offset printing, variable data, bulk and short-run.',
  },
];
