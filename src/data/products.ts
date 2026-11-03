// Product categories from docs/client-brief.md. Each category gets a page at /products/<slug>/.
// Photo: src/assets/images/cat-<slug>.jpg

export type ProductCategory = {
  slug: string;
  title: string;
  short: string;
  /** What the list items are called in counts ("9 options"); defaults to "products" */
  itemNoun?: string;
  /** Hand-written title for the home-page photo card */
  cardTitle: string;
  /** Hand-written CTA heading at the foot of the category page */
  ctaTitle: string;
  intro: string;
  items: string[];
  services: string[]; // related service slugs
  /** Product-page body (QA audit C-06): lead → what we print → how it is produced → what to send us */
  detail: { heading: string; body: string[]; produced: string; send: string };
  seoTitle: string;
  seoDescription: string;
};

export const categories: ProductCategory[] = [
  {
    slug: 'books-educational',
    title: 'Books & Educational Printing',
    short: 'Textbooks, workbooks, guides, question papers and notebooks for schools, colleges and publishers.',
    cardTitle: 'Textbooks & notebooks',
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
    // NEEDS BUSINESS CONFIRMATION: minimum order quantity, typical turnaround (working days) and paper/board weights — 'Quantities and turnaround' is left off the page until confirmed.
    detail: {
      heading: 'Textbooks, workbooks and notebooks — printed in bulk, bound in-house, delivered for the academic year.',
      body: [
        'Educational printing is our core work. We print school and college textbooks, workbooks, guides, competitive examination books, question papers, answer books and notebooks for schools, colleges, education boards and publishers.',
        'Large runs go on our web offset presses, which print from paper reels and deliver folded signatures straight to binding — the most economical way to produce thousands of copies. Covers and colour sections run on our sheet-fed offset presses.',
      ],
      produced: 'Web offset (Komori Coldset and Orient 4i) for text pages and sheet-fed offset for covers, in black & white through to four-colour (CMYK). Plates are made in-house on our CTP system, so text stays sharp from the first page to the last. Books are folded and perfect bound; notebooks, workbooks and thinner booklets are pinned (saddle-stitched). Answer books and question papers can carry variable data such as serial numbers.',
      send: 'A print-ready PDF with 3 mm bleed, or your artwork files — our in-house design team can prepare them for you. Tell us the book size, page count, colours for the text and the cover, the binding, the quantity and the date you need delivery.',
    },
    seoTitle: 'Textbook, Notebook & Educational Book Printing',
    seoDescription:
      'Bulk printing of school and college textbooks, workbooks, guides, competitive exam books, question papers, answer books and notebooks.',
  },
  {
    slug: 'publications',
    title: 'Publications & Commercial Printing',
    short: 'Magazines, journals, annual reports, company profiles, catalogues and directories.',
    cardTitle: 'Magazines & annual reports',
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
    // NEEDS BUSINESS CONFIRMATION: minimum order quantity, typical turnaround (working days) and paper/board weights — 'Quantities and turnaround' is left off the page until confirmed.
    detail: {
      heading: 'Magazines, journals and annual reports — consistent quality, issue after issue.',
      body: [
        'We print magazines, journals and periodicals, annual reports, company profiles, catalogues, directories and research publications for publishers, institutions and companies.',
        'A regular title needs every issue to look like the last and arrive on the same date. Because pre-press, printing and binding all happen in our own building, one team keeps your schedule and your colour under control.',
      ],
      produced: 'Longer runs of magazines and periodicals print on our web offset presses; colour-critical work such as annual reports, company profiles and catalogues runs on our sheet-fed offset presses in four-colour (CMYK). Plates are made in-house on our CTP system, and a proof is shared for approval before the run. Finished copies are perfect bound or pinned (saddle-stitched), depending on the page count.',
      send: 'A print-ready PDF with 3 mm bleed, or your artwork files — our in-house design team can prepare them for you. Tell us the finished size, page count, colours, binding, quantity and, for a periodical, how often it is published.',
    },
    seoTitle: 'Magazine, Journal & Catalogue Printing',
    seoDescription:
      'Printing of magazines, journals, periodicals, annual reports, company profiles, catalogues, directories and research publications.',
  },
  {
    slug: 'advertising-promotional',
    title: 'Advertising & Promotional Printing',
    short: 'Brochures, flyers, pamphlets, posters, inserts and promotional booklets.',
    cardTitle: 'Brochures & promotional print',
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
    // NEEDS BUSINESS CONFIRMATION: minimum order quantity, typical turnaround (working days) and paper/board weights — 'Quantities and turnaround' is left off the page until confirmed.
    detail: {
      heading: 'Brochures, flyers and posters — sharp colour, in the quantity your campaign needs.',
      body: [
        'We print brochures, flyers and leaflets, pamphlets, posters, product inserts, promotional booklets and other advertising material for businesses, institutions and events.',
        'Marketing print has to look right and arrive before the campaign starts. Our sheet-fed offset presses give the sharp detail and rich colour this work needs, and our in-house design team can help with the artwork.',
      ],
      produced: 'Sheet-fed offset on our Komori and L37 presses, in single-colour, two-colour, four-colour (CMYK) and full colour. Plates are made in-house on our CTP system and a proof is shared before printing. Leaflets and inserts are folded in-house; promotional booklets are pinned (saddle-stitched).',
      send: 'A print-ready PDF with 3 mm bleed, or your artwork files — our in-house design team can prepare them for you. Tell us the finished size, the fold (if any), the quantity and the paper you have in mind.',
    },
    seoTitle: 'Brochure, Flyer, Pamphlet & Poster Printing',
    seoDescription:
      'Full-colour printing of brochures, flyers, leaflets, pamphlets, posters, product inserts and promotional booklets in bulk.',
  },
  {
    slug: 'packaging-labels',
    title: 'Packaging & Label Printing',
    short: 'Product labels, stickers, packaging inserts and product information leaflets.',
    cardTitle: 'Labels, stickers & inserts',
    ctaTitle: 'Need labels, stickers or inserts?',
    intro:
      'Printed labels, inserts and information leaflets that go inside and on your product packaging — accurate, consistent and in the quantities you need.',
    items: ['Product Labels', 'Stickers', 'Packaging Inserts', 'Product Information Leaflets'],
    services: ['sheet-fed-offset-printing', 'colour-printing', 'binding-finishing'],
    // NEEDS BUSINESS CONFIRMATION: minimum order quantity, typical turnaround (working days) and paper/board weights — 'Quantities and turnaround' is left off the page until confirmed.
    detail: {
      heading: 'Printed labels, inserts and leaflets — accurate, consistent, in the quantity you need.',
      body: [
        'We print the paper components that go on and inside your packaging: product labels, stickers, packaging inserts and product information leaflets. These run on our sheet-fed offset presses, where colour accuracy matters most — so a label printed this month matches the one printed last year.',
      ],
      produced: 'Sheet-fed offset, single-colour through four-colour (CMYK) and full colour. Plates are made in-house on our CTP system, so text stays sharp at small sizes — important for ingredient lists, batch codes and statutory information.',
      send: 'A print-ready PDF with 3 mm bleed, or your artwork files — our in-house design team can prepare them for you. Tell us the finished size, the quantity and the paper or substrate.',
    },
    seoTitle: 'Label, Sticker & Packaging Insert Printing',
    seoDescription:
      'Printing of product labels, stickers, packaging inserts and product information leaflets (PILs) in single to full colour.',
  },
  {
    slug: 'specialised',
    title: 'Specialised Printing',
    short: 'Manuals, technical, medical, religious and literary books, dictionaries, calendars, diaries and certificates.',
    cardTitle: 'Manuals, diaries & certificates',
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
    // NEEDS BUSINESS CONFIRMATION: minimum order quantity, typical turnaround (working days) and paper/board weights — 'Quantities and turnaround' is left off the page until confirmed.
    detail: {
      heading: 'Manuals, reference books, diaries and certificates — printed with care for accuracy.',
      body: [
        'We print training and instruction manuals, technical books, hospital and medical books, religious books, poetry and literary books, dictionaries, calendars, diaries and certificates.',
        'This is work where a missing page or a blurred character matters — a dosage in a medical book, a definition in a dictionary, a name on a certificate. Files are checked in our pre-press department and a proof is shared for approval before anything is printed.',
      ],
      produced: 'Text pages run on our web offset or sheet-fed offset presses, depending on the quantity; covers and colour pages run sheet-fed. Plates are made in-house on our CTP system for sharp small type. Books are perfect bound; manuals and booklets can be pinned (saddle-stitched). Certificates can be printed with variable data such as names or serial numbers.',
      send: 'A print-ready PDF with 3 mm bleed, or your artwork files — our in-house design team can prepare them for you. Tell us the finished size, page count, colours, binding and quantity.',
    },
    seoTitle: 'Manual, Technical & Religious Book Printing',
    seoDescription:
      'Printing of training and instruction manuals, technical, medical, religious and literary books, dictionaries, calendars, diaries and certificates.',
  },
  {
    slug: 'colour-options',
    title: 'Additional Printing Services',
    short: 'Black & white to full colour, variable data, offset, bulk and short-run printing.',
    cardTitle: 'Colour, bulk & short-run options',
    itemNoun: 'options',
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
    // NEEDS BUSINESS CONFIRMATION: minimum order quantity, typical turnaround (working days) and paper/board weights — 'Quantities and turnaround' is left off the page until confirmed.
    detail: {
      heading: 'Black & white to full colour — the right colour option, method and quantity for your job and budget.',
      body: [
        'Not every job needs four colours. We print in black & white, single-colour, two-colour, four-colour (CMYK) and full colour, with variable data printing for numbering and personalisation, and we will advise on the most economical option for your content.',
        'Everything is offset printed in our own building. Large quantities run on our web offset presses for the lowest cost per copy; smaller quantities run economically on our sheet-fed presses as short runs.',
      ],
      produced: 'Web offset (Komori Coldset and Orient 4i) for bulk runs, and sheet-fed offset (Komori 25 × 36, Komori 18 × 25 and L37) for colour-critical work and short runs. Plates are made in-house on our CTP system. Variable data printing adds serial numbers, names or codes that change on every copy.',
      send: 'Tell us what you are printing, the quantity, and whether it has photographs or colour artwork — we will recommend the colour option and press that keep the cost down. A print-ready PDF with 3 mm bleed is ideal; our in-house design team can also prepare files for you.',
    },
    seoTitle: 'Black & White and Colour Offset Printing',
    seoDescription:
      'All printing options: black & white, single-colour, two-colour, four-colour and full-colour offset printing, variable data, bulk and short-run.',
  },
];
