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
  {
    id: '01',
    slug: 'design-systems-workshop',
    title: 'Design Systems Workshop',
    date: 'March 14, 2026',
    location: 'Kathmandu, Nepal',
    description: 'A hands-on session on building scalable design systems, from raw tokens to production-ready components.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    status: 'upcoming',
    ctaLabel: 'Reserve a Seat',
  },
  {
    id: '02',
    slug: 'product-launch-night',
    title: 'Product Launch Night',
    date: 'April 22, 2026',
    location: 'Pokhara, Nepal',
    description: 'An evening showcasing our latest client launches, with live demos and conversations with the teams behind them.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
    status: 'upcoming',
    ctaLabel: 'Get Tickets',
  },
  {
    id: '03',
    slug: 'ai-in-product-design',
    title: 'AI in Product Design',
    date: 'January 18, 2026',
    location: 'Online',
    description: 'A panel discussion on where AI tooling genuinely helps product design workflows, and where it still falls short.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
    status: 'past',
    ctaLabel: 'Watch Recording',
  },
  {
    id: '04',
    slug: 'brand-identity-masterclass',
    title: 'Brand Identity Masterclass',
    date: 'November 9, 2025',
    location: 'Kathmandu, Nepal',
    description: 'A deep dive into how we build brand systems from strategy through to final logo, type, and color decisions.',
    image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1200&auto=format&fit=crop',
    status: 'past',
    ctaLabel: 'View Recap',
  },
]