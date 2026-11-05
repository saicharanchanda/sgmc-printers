/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR BUSINESS DETAILS
 *  Every page, the footer, SEO tags and Google structured data
 *  read from this file. Client-supplied facts: docs/client-brief.md
 *  Values still marked  // TODO  are waiting on the client.
 * ─────────────────────────────────────────────────────────────
 */

const FOUNDED = 1965;

export const SITE = {
  name: 'Shree Gayathri Multi Colour Printers',
  legalName: 'Shree Gayathri Multi Colour Printers',
  shortName: 'SGMC',
  tagline: 'Quality Printing | Competitive Pricing | Timely Delivery',
  // Client copy, 2026-11-05
  motto: 'Established 1965. Built on Trust. Driven by Quality.',
  legacyLine: 'Printing Excellence Across Generations Since 1965.',
  description:
    'Shree Gayathri Multi Colour Printers — trusted since 1965 for textbook, book, magazine and commercial printing on our own web offset and sheet-fed offset presses. Single-colour to full-colour, bulk and short-run, all under one roof.',

  // TODO(P0-5) NEEDS BUSINESS CONFIRMATION: final production domain. Placeholder below is baked
  // into every canonical, OG URL, sitemap entry and schema @id — set it before launch.
  url: 'https://www.sgmcprinters.com', // TODO: final domain bought on GoDaddy (no trailing slash)

  foundedYear: FOUNDED,
  city: 'Hyderabad',
  region: 'Telangana',
  country: 'IN',

  // Head office (used for Google structured data and the map)
  address: {
    street: "Near Ali Cafe 'X' Roads, Amberpet",
    locality: 'Hyderabad',
    region: 'Telangana',
    postalCode: '500013',
    country: 'IN',
  },
  offices: [
    {
      label: 'Head Office',
      lines: ["Near Ali Cafe 'X' Roads, Amberpet", 'Hyderabad – 500 013, Telangana, India'],
      map: 'https://www.google.com/maps/search/?api=1&query=Ali+Cafe+X+Roads+Amberpet+Hyderabad+500013',
    },
    {
      label: 'Branch Office',
      lines: ['Green Industrial Park, Dandu Malkapur (V)', 'Choutuppal (M), Yadadri Bhuvanagiri District – 508 252, Telangana, India'],
      map: 'https://www.google.com/maps/search/?api=1&query=Green+Industrial+Park+Dandu+Malkapur+Choutuppal+508252',
    },
  ],

  geo: { lat: 17.3937, lng: 78.5166 }, // approx. Ali Cafe X Roads, Amberpet — TODO: exact pin from Google Maps

  // Primary number (call buttons, WhatsApp, Google data)
  phone: '+91 97010 99777',
  phoneHref: '+919701099777',
  whatsapp: '919701099777', // TODO: confirm this number is on WhatsApp
  contacts: [
    { name: 'Ramesh Vadlamani', phone: '+91 97010 99777', phoneHref: '+919701099777' },
    { name: 'Gopal Krishna Vadlamani', phone: '+91 99491 77795', phoneHref: '+919949177795' },
  ],
  email: 'sgmcprinters@gmail.com',

  // Leadership team — names, designations and descriptions as written by the client (2026-11-05)
  leadership: [
    { name: 'Ramesh Vadlamani', role: 'Chairman', bio: 'Providing leadership and direction while upholding the company’s long-standing values and commitment to quality.' },
    { name: 'Gopal Krishna Vadlamani', role: 'Director — Business Development & Client Relations', bio: 'Strengthening customer partnerships, developing business opportunities and maintaining relationships with clients.' },
    { name: 'P. Radha Madhav', role: 'Director — Sales & Marketing', bio: 'Representing the company’s capabilities, developing market opportunities and connecting customers with appropriate printing solutions.' },
    { name: 'Hrushikesh Vadlamani', role: 'Executive Director — Strategy & Operations', bio: 'Supporting operational development, business strategy and the company’s continued modernization and growth.' },
  ],

  hours: [
    { days: 'Monday – Saturday', time: '9:30 AM – 7:30 PM' }, // TODO: confirm
    { days: 'Sunday', time: 'Closed' },
  ],
  // Used for Google structured data (openingHoursSpecification)
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:30',
    closes: '19:30',
  },

  // Google Maps "Embed a map" src URL (Share → Embed a map → copy src)
  mapEmbed: 'https://www.google.com/maps?q=Ali+Cafe+X+Roads,+Amberpet,+Hyderabad+500013&z=15&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Ali+Cafe+X+Roads+Amberpet+Hyderabad+500013', // TODO: Google Business Profile link

  social: {
    instagram: '', // TODO: full URLs, leave '' to hide
    facebook: '',
    youtube: '',
    linkedin: '',
  },

  // Free form backend — get a key at https://web3forms.com (sent to the client's email)
  // Leave '' and the form falls back to sending the enquiry via WhatsApp.
  // TODO(P0-3) NEEDS BUSINESS CONFIRMATION: Web3Forms access key + the inbox quotes should go to.
  // Until set, every enquiry depends on WhatsApp opening — no email is ever sent.
  web3formsKey: '', // TODO

  promise: ['Quality Printing', 'Competitive Pricing', 'Timely Delivery'],
  strengths: ['Owned Infrastructure', 'In-House Machinery', 'Integrated Production', 'Complete Printing Solutions'],

  // Real machinery — from docs/client-brief.md
  machineGroups: [
    { group: 'Web Offset Printing', items: ['Komori Coldset Web Offset', 'Orient Web Offset – 4i'] },
    { group: 'Sheet-Fed Offset Printing', items: ['L37 Offset Printing Machine', 'Komori 25 × 36', 'Komori 18 × 25'] },
    { group: 'Pre-Press', items: ['CTP (Computer-to-Plate) System'] },
    { group: 'Post-Press & Finishing', items: ['Folding Machines', 'Perfect Binding', 'Pinning / Stitching'] },
  ],

  // One photo per machine: save the client's photo as src/assets/images/<file>.jpg (any of jpg/png/webp).
  // Until a photo exists the card is text-only (one stock photo must not stand in for several machines).
  machinePhotos: {
    'Komori Coldset Web Offset': 'machine-komori-coldset-web',
    'Orient Web Offset – 4i': 'machine-orient-web-4i',
    'L37 Offset Printing Machine': 'machine-l37-offset',
    'Komori 25 × 36': 'machine-komori-25x36',
    'Komori 18 × 25': 'machine-komori-18x25',
    'CTP (Computer-to-Plate) System': 'machine-ctp',
    'Folding Machines': 'machine-folding',
    'Perfect Binding': 'machine-perfect-binding',
    'Pinning / Stitching': 'machine-pinning-stitching',
  } as Record<string, string>,

  // Only verifiable facts. "45+ products" and "100% in-house" were removed (client brief, 2026-11-05):
  // add real figures (books per year, clients served) only when the client confirms them.
  stats: [
    { value: FOUNDED, suffix: '', label: 'Printing since' },
    { value: 6, suffix: '', label: 'Printing services' },
    { value: 4, suffix: '', label: 'Production departments' },
  ],
} as const;

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Products', href: '/products/' },
  { label: 'Services', href: '/services/' },
  { label: 'Infrastructure', href: '/infrastructure/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/** Pre-filled WhatsApp enquiry; pass a product/service name for context (client brief §12). */
export const waMessage = (product?: string) =>
  `Hello SGMC team, I’m interested in discussing a printing project.${product ? ` The product is ${product}.` : ''} Please let me know what details you need for a quotation.`;
export const whatsappLink = (text = waMessage()) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
