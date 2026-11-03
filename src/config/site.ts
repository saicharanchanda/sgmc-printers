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
  name: 'SGMC Printers',
  legalName: 'Shree Gayatri Multi Colour Printers',
  shortName: 'SGMC',
  tagline: 'Quality Printing | Competitive Prices | Timely Delivery',
  description:
    'Shree Gayatri Multi Colour Printers — trusted since 1965 for textbook, book, magazine and commercial printing on our own web offset and sheet-fed offset presses. Single-colour to full-colour, bulk and short-run, all under one roof.',

  url: 'https://www.sgmcprinters.com', // TODO: final domain bought on GoDaddy (no trailing slash)

  foundedYear: FOUNDED,
  city: 'Your City', // TODO: e.g. Hyderabad — used heavily for local SEO
  region: 'Your State', // TODO: e.g. Telangana
  country: 'IN',

  address: {
    street: 'Your Street, Your Area', // TODO
    locality: 'Your City', // TODO
    region: 'Your State', // TODO
    postalCode: '000000', // TODO
    country: 'IN',
  },

  geo: { lat: 17.385, lng: 78.4867 }, // TODO: exact pin from Google Maps (right-click → coordinates)

  // Primary number (call buttons, WhatsApp, Google data)
  phone: '+91 97010 99777',
  phoneHref: '+919701099777',
  whatsapp: '919701099777', // TODO: confirm this number is on WhatsApp
  contacts: [
    { name: 'Ramesh', phone: '+91 97010 99777', phoneHref: '+919701099777' },
    { name: 'Gopal Krishna', phone: '+91 99491 77795', phoneHref: '+919949177795' },
  ],
  email: 'info@sgmcprinters.com', // TODO

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
  mapEmbed: 'https://www.google.com/maps?q=17.385,78.4867&z=15&output=embed', // TODO
  mapLink: 'https://maps.google.com/?q=17.385,78.4867', // TODO: Google Business Profile link

  social: {
    instagram: '', // TODO: full URLs, leave '' to hide
    facebook: '',
    youtube: '',
    linkedin: '',
  },

  // Free form backend — get a key at https://web3forms.com (sent to the client's email)
  // Leave '' and the form falls back to sending the enquiry via WhatsApp.
  web3formsKey: '', // TODO

  promise: ['Quality Printing', 'Competitive Prices', 'Timely Delivery'],
  strengths: ['Owned Infrastructure', 'In-House Machinery', 'Integrated Production', 'Complete Printing Solutions'],

  // Real machinery — from docs/client-brief.md
  machineGroups: [
    { group: 'Web Offset Printing', items: ['Komori Coldset Web Offset', 'Orient Web Offset – 4i'] },
    { group: 'Sheet-Fed Offset Printing', items: ['L37 Offset Printing Machine', 'Komori 25 × 36', 'Komori 18 × 25'] },
    { group: 'Pre-Press', items: ['CTP (Computer-to-Plate) System'] },
    { group: 'Post-Press & Finishing', items: ['Folding Machines', 'Perfect Binding', 'Pinning / Stitching'] },
  ],

  // One photo per machine: save the client's photo as src/assets/images/<file>.jpg (any of jpg/png/webp).
  // Until a photo exists, the card falls back to the department's general photo.
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

  // Only verifiable facts. Add real figures (books per year, clients served) when the client provides them.
  stats: [
    { value: FOUNDED, suffix: '', label: 'Printing since' },
    { value: 5, suffix: '', label: 'Offset presses in-house' },
    { value: 45, suffix: '+', label: 'Kinds of printed products' },
    { value: 100, suffix: '%', label: 'In-house, under one roof' },
  ],
} as const;

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Products', href: '/products/' },
  { label: 'Infrastructure', href: '/infrastructure/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const whatsappLink = (text = `Hi ${SITE.name}, I'd like a quote for printing.`) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
