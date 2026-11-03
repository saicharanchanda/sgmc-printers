// Each service gets its own SEO landing page at /services/<slug>/
// Header photo: src/assets/images/bg-<slug>.jpg · Body photo: src/assets/images/<slug>.jpg
// Content is based on docs/client-brief.md — do not claim equipment the client does not own.

export type Service = {
  slug: string;
  title: string;
  kicker: string;
  /** Short hand-written name for pills and photo overlays ("Web offset") */
  label: string;
  /** Hand-written button text for the link to this service's page */
  cta: string;
  short: string;
  intro: string;
  body: string[];
  features: string[];
  equipment: string[];
  idealFor: string[];
  seoTitle: string;
  seoDescription: string;
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: 'web-offset-printing',
    title: 'Web Offset Printing',
    label: 'Web offset',
    cta: 'See web offset printing',
    kicker: 'High-volume production',
    short: 'Reel-fed web offset for textbooks, notebooks, magazines and long runs — fast, consistent and economical.',
    intro:
      'Our web offset presses print continuously from paper reels, making them the most economical choice for large quantities of textbooks, notebooks, magazines and periodicals.',
    body: [
      'Web offset printing runs paper from a reel through the press at high speed, printing both sides and delivering folded signatures ready for binding. For long runs this gives the lowest cost per copy and the fastest turnaround.',
      'With two web offset lines in our own facility, we handle bulk orders for schools, publishers and institutions without outsourcing — so schedules and quality stay in our control.',
    ],
    features: [
      'Coldset web offset for books, notebooks and periodicals',
      'Single-colour to four-colour web printing',
      'Fast production of large quantities',
      'Lowest cost per copy on long runs',
      'Folded signatures delivered straight to binding',
    ],
    equipment: ['Komori Coldset Web Offset', 'Orient Web Offset – 4i'],
    idealFor: ['School textbooks & workbooks', 'Notebooks & exercise books', 'Magazines & periodicals', 'Question papers & answer books'],
    seoTitle: 'Web Offset Printing — Textbooks & Magazines',
    seoDescription:
      'Web offset printing for textbooks, notebooks, magazines and bulk publications on Komori and Orient web offset presses. Fast, consistent, economical long runs.',
    faqs: [
      {
        q: 'When should I choose web offset over sheet-fed?',
        a: 'Web offset is best for large quantities — typically several thousand copies of a book, notebook or magazine. For smaller runs or premium colour work, sheet-fed offset is usually the better choice. We will recommend the most economical option for your job.',
      },
      {
        q: 'Can you print textbooks for the new academic year on a deadline?',
        a: 'Yes. Bulk textbook and notebook printing is our core work, and with our own web offset lines we plan production around academic-year deadlines.',
      },
    ],
  },
  {
    slug: 'sheet-fed-offset-printing',
    title: 'Sheet-Fed Offset Printing',
    label: 'Sheet-fed',
    cta: 'See sheet-fed printing',
    kicker: 'Sharp, rich colour',
    short: 'Sheet-fed offset for colour-critical work — book covers, brochures, catalogues, annual reports and posters.',
    intro:
      'Sheet-fed offset prints on individual sheets for the sharpest detail and richest colour — ideal for covers, brochures, catalogues and any job where colour quality matters most.',
    body: [
      'Our sheet-fed presses handle a wide range of paper and board, from thin text paper to heavy cover stock. Single-colour, two-colour and four-colour (CMYK) work is printed with consistent registration from the first sheet to the last.',
      'Combined with our CTP pre-press and in-house finishing, sheet-fed printing lets us produce complete books, catalogues and promotional material under one roof.',
    ],
    features: [
      'Four-colour (CMYK) and full-colour printing',
      'Single-colour and two-colour work',
      'Book covers, jackets and inserts',
      'Wide range of paper and board weights',
      'Consistent colour from first sheet to last',
    ],
    equipment: ['Komori 25 × 36', 'Komori 18 × 25', 'L37 Offset Printing Machine'],
    idealFor: ['Book covers', 'Brochures & catalogues', 'Annual reports & company profiles', 'Posters & calendars'],
    seoTitle: 'Sheet-Fed Offset Printing — Brochures & Catalogues',
    seoDescription:
      'Sheet-fed offset printing on Komori and L37 presses: brochures, catalogues, annual reports, book covers and posters in single to full colour.',
    faqs: [
      {
        q: 'What sizes can you print?',
        a: 'Our sheet-fed presses include Komori 25 × 36 and 18 × 25 machines, covering most book, brochure, catalogue and poster formats. Share your size and we will confirm the best press for it.',
      },
      {
        q: 'Can you match a specific brand colour?',
        a: 'Yes. We print in CMYK and can work to your colour references; a proof is shared before the full run.',
      },
    ],
  },
  {
    slug: 'prepress',
    title: 'Pre-Press & CTP',
    label: 'Pre-press',
    cta: 'See pre-press & CTP',
    kicker: 'Where quality starts',
    short: 'File checking, imposition and computer-to-plate (CTP) plate making — accurate plates for a perfect run.',
    intro:
      'Every job starts in our pre-press department, where files are checked, imposed and output directly to printing plates using our computer-to-plate (CTP) system.',
    body: [
      'CTP produces plates straight from digital files — no film — giving sharper dots, accurate registration and faster make-ready on press. It means cleaner text in textbooks and crisper images in colour work.',
      'Our team checks fonts, images, bleed and page order before plates are made, and shares a proof for your approval so there are no surprises on delivery.',
    ],
    features: [
      'Computer-to-Plate (CTP) plate making',
      'Pre-flight checks: fonts, images, bleed, page order',
      'Imposition for books, notebooks and booklets',
      'Proofs for approval before printing',
      'Faster make-ready and sharper print',
    ],
    equipment: ['CTP (Computer-to-Plate) System'],
    idealFor: ['Publishers', 'Schools & colleges', 'Authors', 'Corporate print buyers'],
    seoTitle: 'Pre-Press & CTP Plate Making',
    seoDescription:
      'In-house pre-press with computer-to-plate (CTP): file checking, imposition, proofs and plate making for books, magazines and commercial print.',
    faqs: [
      {
        q: 'Which file formats should I send?',
        a: 'A print-ready PDF with fonts embedded and 3 mm bleed is best. We also accept open files (InDesign, CorelDRAW, Illustrator) and will check everything before plates are made.',
      },
      {
        q: 'Will I see a proof before printing?',
        a: 'Yes — we share a proof for approval before the full run.',
      },
    ],
  },
  {
    slug: 'binding-finishing',
    title: 'Binding & Finishing',
    label: 'Binding',
    cta: 'See binding & finishing',
    kicker: 'Ready to deliver',
    short: 'Folding, perfect binding and pinning / stitching — books, notebooks and booklets finished in-house.',
    intro:
      'Printed sheets become finished products in our post-press department — folded, gathered and bound into books, notebooks, magazines and booklets.',
    body: [
      'Perfect binding gives textbooks, reference books and reports a clean, square spine. Pinning (saddle stitching) is ideal for notebooks, magazines, booklets and question papers.',
      'Because finishing happens in the same building as printing, jobs move straight from press to binding — saving time and avoiding transport damage.',
    ],
    features: [
      'Folding for books, leaflets and inserts',
      'Perfect binding (square-spine books)',
      'Pinning / stitching (saddle-stitch)',
      'Cutting, trimming and counting',
      'Careful packing for safe delivery',
    ],
    equipment: ['Folding Machines', 'Perfect Binding', 'Pinning / Stitching'],
    idealFor: ['Textbooks & reference books', 'Notebooks', 'Magazines & booklets', 'Manuals & handbooks'],
    seoTitle: 'Book Binding — Perfect Binding, Folding & Stitching',
    seoDescription:
      'In-house post-press: folding, perfect binding and pinning / saddle stitching for textbooks, notebooks, magazines, manuals and booklets.',
    faqs: [
      {
        q: 'Which binding is right for my book?',
        a: 'Perfect binding suits thicker books like textbooks and reference books. Pinning / stitching is ideal for notebooks, magazines and thinner booklets. We will suggest the best option based on page count and use.',
      },
      {
        q: 'Is binding done in-house?',
        a: 'Yes. Folding, perfect binding and pinning / stitching are all done in our own facility.',
      },
    ],
  },
  {
    slug: 'colour-printing',
    title: 'Single to Full-Colour Printing',
    label: 'Colour',
    cta: 'See colour options',
    kicker: 'Every colour option',
    short: 'Black & white, single-colour, two-colour, four-colour and full-colour printing — plus variable data.',
    intro:
      'From economical black & white text to vibrant full-colour pages, we print in whatever colour configuration suits your content and budget.',
    body: [
      'Many textbooks and notebooks need only one or two colours, while covers, brochures and magazines need full four-colour reproduction. Choosing the right option keeps costs down without compromising the look.',
      'We also offer variable data printing — numbering, names or codes that change on each copy — for answer books, certificates and forms.',
    ],
    features: [
      'Black & white printing',
      'Single-colour and two-colour printing',
      'Four-colour (CMYK) and full-colour printing',
      'Variable data printing (numbering, names, codes)',
      'Advice on the most economical colour option',
    ],
    equipment: ['Komori 25 × 36', 'Komori 18 × 25', 'L37 Offset Printing Machine', 'Orient Web Offset – 4i'],
    idealFor: ['Textbooks', 'Answer books & question papers', 'Certificates', 'Brochures & magazines'],
    seoTitle: 'Single, Two & Four-Colour Offset Printing',
    seoDescription:
      'Black & white, single-colour, two-colour, four-colour and full-colour offset printing, plus variable data printing for numbering and personalisation.',
    faqs: [
      {
        q: 'How do I decide how many colours I need?',
        a: 'Text-heavy books often work well in one or two colours, which is more economical. Photos and colourful layouts need four-colour. Share your content and we will advise.',
      },
      {
        q: 'What is variable data printing?',
        a: 'It prints information that changes on every copy — serial numbers, names or codes — useful for answer books, certificates and forms.',
      },
    ],
  },
  {
    slug: 'bulk-printing',
    title: 'Bulk & Short-Run Printing',
    label: 'Bulk',
    cta: 'See bulk & short-run',
    kicker: 'Any quantity',
    short: 'Large bulk orders for institutions and publishers — and short runs when you need smaller quantities.',
    intro:
      'Whether you need lakhs of copies for a school board or a few hundred booklets for an event, we plan the job on the right press for the best price and timeline.',
    body: [
      'Bulk printing is where our web offset lines and integrated finishing shine — large volumes produced, bound and packed in-house on schedule.',
      'For smaller quantities, our sheet-fed presses offer economical short runs without compromising on quality.',
    ],
    features: [
      'Bulk printing for institutions and publishers',
      'Short-run printing for smaller quantities',
      'Right press chosen for the best cost',
      'Printing, binding and packing under one roof',
      'Planned, on-time delivery',
    ],
    equipment: ['Komori Coldset Web Offset', 'Orient Web Offset – 4i', 'Komori 25 × 36', 'Komori 18 × 25', 'L37 Offset Printing Machine'],
    idealFor: ['Schools & education boards', 'Publishers', 'Corporates', 'Hospitals & institutions'],
    seoTitle: 'Bulk & Short-Run Printing',
    seoDescription:
      'Bulk printing for schools, publishers and institutions on web offset presses, plus economical short-run printing — all printed and bound in-house.',
    faqs: [
      {
        q: 'Is there a minimum order quantity?',
        a: 'It depends on the product. We handle both bulk orders and short runs — tell us your quantity and we will quote the most economical method.',
      },
      {
        q: 'Do you deliver bulk orders?',
        a: 'Yes, bulk orders are packed carefully and dispatched to your location. Share the delivery address when you request a quote.',
      },
    ],
  },
];

export const process = [
  { title: 'Enquiry & Estimate', text: 'Share your product, quantity, size and colours. We recommend the right press and send a clear quote.' },
  { title: 'Pre-Press & CTP', text: 'Files are checked and imposed, a proof is approved, and plates are made on our CTP system.' },
  { title: 'Printing', text: 'Your job runs on our web offset or sheet-fed offset presses, checked throughout the run.' },
  { title: 'Binding & Finishing', text: 'Folding, perfect binding or pinning / stitching, followed by trimming and quality checks.' },
  { title: 'Delivery', text: 'Counted, packed carefully and dispatched — on the promised date.' },
];
