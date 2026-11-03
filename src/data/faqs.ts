import { SITE } from '../config/site';

export const faqs = [
  {
    q: 'What kind of printing do you specialise in?',
    a: 'Our core work is books and educational printing — school and college textbooks, workbooks, notebooks and exam material — along with magazines, catalogues, brochures and commercial printing in single to full colour.',
  },
  {
    q: 'What is the difference between web offset and sheet-fed offset?',
    a: 'Web offset prints from paper reels at high speed and is most economical for large quantities like textbooks and notebooks. Sheet-fed offset prints on individual sheets and is ideal for colour-critical work like covers, brochures and catalogues. We have both in-house and choose the right one for your job.',
  },
  {
    q: 'How do I get a quote?',
    a: `Call ${SITE.contacts[0].name} on ${SITE.contacts[0].phone} or ${SITE.contacts[1].name} on ${SITE.contacts[1].phone}, WhatsApp us, or send your requirement through the contact form — product, quantity, size, page count, colours and binding.`,
  },
  {
    q: 'Is everything done in-house?',
    a: 'Yes. We operate from our own building with CTP pre-press, web and sheet-fed offset presses, and folding, perfect binding and stitching — the complete process under one roof.',
  },
  {
    q: 'Do you take both bulk and small orders?',
    a: 'Yes. Our web offset lines handle large bulk orders, and our sheet-fed presses handle short runs economically.',
  },
];
