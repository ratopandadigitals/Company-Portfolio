export type EventItem = {
  id: string
  slug: string
  title: string
  date: string
  location: string
  description: string
  image: string
  status: 'upcoming' | 'past'
  ctaLabel: string
}

// Placeholder events — replace with real dates/details when ready,
// same process as everywhere else in the project.
export const EVENTS_DATA: EventItem[] = [
  // {
  //   id: '01',
  //   slug: 'design-systems-workshop',
  //   title: 'Design Systems Workshop',
  //   date: 'March 14, 2026',
  //   location: 'Kathmandu, Nepal',
  //   description: 'A hands-on session on building scalable design systems, from raw tokens to production-ready components.',
  //   image: '/eventimg/designworkshop.avif',
  //   status: 'upcoming',
  //   ctaLabel: 'Reserve a Seat',
  // },
  // {
  //   id: '02',
  //   slug: 'product-launch-night',
  //   title: 'Product Launch Night',
  //   date: 'April 22, 2026',
  //   location: 'Pokhara, Nepal',
  //   description: 'An evening showcasing our latest client launches, with live demos and conversations with the teams behind them.',
  //   image: '/eventimg/productlaunch.avif',
  //   status: 'upcoming',
  //   ctaLabel: 'Get Tickets',
  // },
  // {
  //   id: '03',
  //   slug: 'ai-in-product-design',
  //   title: 'AI in Product Design',
  //   date: 'January 18, 2026',
  //   location: 'Online',
  //   description: 'A panel discussion on where AI tooling genuinely helps product design workflows, and where it still falls short.',
  //   image: '/eventimg/aidesign.avif',
  //   status: 'past',
  //   ctaLabel: 'Watch Recording',
  // },
  // {
  //   id: '04',
  //   slug: 'brand-identity-masterclass',
  //   title: 'Brand Identity Masterclass',
  //   date: 'November 9, 2025',
  //   location: 'Kathmandu, Nepal',
  //   description: 'A deep dive into how we build brand systems from strategy through to final logo, type, and color decisions.',
  //   image: '/eventimg/brandclass.avif',
  //   status: 'past',
  //   ctaLabel: 'View Recap',
  // },
]