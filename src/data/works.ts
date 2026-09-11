export type WorkItem = {
  slug: string
  id: string
  title: string
  description: string
  year: string
  role: string
  services: string[]
  previewImage: string
  bgImage: string
}

export const WORK_ITEMS: WorkItem[] = [
  {
    slug: 'archin',
    id: '01/05',
    title: 'Archin',
    description:
      "We've helped businesses across industries achieve their goals. Here are some of our selected works.",
    year: '2025',
    role: 'Lead Designer',
    services: ['Website Design', 'Product Design', 'Branding', 'Development'],
    previewImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    bgImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'vntnr',
    id: '02/05',
    title: 'VNTNR',
    description:
      "We've partnered with businesses across various industries to help them achieve their goals.",
    year: '2018',
    role: 'Logo Designer',
    services: ['Designing', 'Branding', 'Redesigning', 'Development'],
    previewImage:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    bgImage:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'aeorim',
    id: '03/05',
    title: 'Aeorim',
    description:
      "We've collaborated with companies from diverse sectors to turn their visions into reality.",
    year: '2023',
    role: 'Website Designer',
    services: ['Branding', 'Revamp', 'Development', 'Designing'],
    previewImage:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    bgImage:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'lumina',
    id: '04/05',
    title: 'Lumina',
    description:
      'Crafted an intuitive fintech interface and design system to streamline digital transactions.',
    year: '2024',
    role: 'UI/UX Architect',
    services: ['Mobile App', 'Design System', 'Fintech', 'UX Research'],
    previewImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    bgImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'kora',
    id: '05/05',
    title: 'Kora',
    description:
      'Engineered an e-commerce platform and brand identity tailored for modern sustainable fashion.',
    year: '2025',
    role: 'Full Stack Engineer',
    services: ['E-Commerce', 'Brand Strategy', 'Next.js', 'UI/UX Design'],
    previewImage:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
    bgImage:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
  },
]