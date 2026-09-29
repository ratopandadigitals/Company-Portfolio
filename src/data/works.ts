export type WorkItem = {
  slug: string
  id: string
  title: string
  description: string
  year: string
  role: string
  services: string[]
  tools: string[]
  previewImage: string
  bgImage: string
  gallery: string[]
}

export const WORK_ITEMS: WorkItem[] = [
  {
    slug: 'thrift',
    id: '01/05',
    title: 'ThriftStore',
    description:
      "We've helped businesses across industries achieve their goals.",
    year: '2025',
    role: 'Lead Designer',
    services: [
      'UI Design & Prototyping',
      'UX Research & Product Planning',
    ],
    tools: ['Figma'],
    previewImage: '/projectimg/thriftwork.webp',
    bgImage: '/projectimg/thriftwork.webp',
    gallery: ['/projectimg/thriftwork.webp',
      '/projectimg/thriftwork1.webp',
      '/projectimg/thriftwork2.webp',
    
    ],
  },

  {
    slug: 'Hamrodocs',
    id: '02/05',
    title: 'Hamrodocs',
    description:
      'HamroDocs is a free, browser-based document and payroll platform built specifically for businesses in Nepal, featuring automated tax calculations, Bikram Sambat (B.S.) calendar integration, and IRD-compliant format.',
    year: '2026',
    role: 'Logo Designer',
    services: [
      'Brand & Design System',
      'Development & Engineering',
    ],
    tools: ['Visual Studio Code', 'Figma'],
    previewImage: '/projectimg/hamrowork.webp',
    bgImage: '/projectimg/hamrowork.webp',
    gallery: ['/projectimg/hamrowork.webp',
            '/projectimg/hamrowork1.webp',
    ],
  },

  {
    slug: 'VehicleRental',
    id: '03/05',
    title: 'VehicleRental',
    description:
      "We've collaborated with companies from diverse sectors to turn their visions into reality.",
    year: '2023',
    role: 'Website Designer',
    services: [
      'UI Design & Prototyping',
      'Engineering & Development',
    ],
    tools: ['Figma', 'Visual Studio Code'],
    previewImage:
      '/thrift.png',
    bgImage:
      '/thrift.png',
      gallery: ['/thrift.png'],
  },
  

  {
    slug: 'Freshbite',
    id: '04/05',
    title: 'Freshbite',
    description:
      'Crafted an intuitive fintech interface and design system to streamline digital transactions.',
    year: '2024',
    role: 'UI/UX Architect',
    services: [
      'UX Research & Product Planning',
      'UI Design & Prototyping',
      'Brand & Design System',
    ],
    tools: ['Figma'],
    previewImage:
      '/projectimg/freshwork.webp',
    bgImage:
      '/projectimg/freshwork.webp',
      gallery: ['/projectimg/freshwork.webp',
        '/projectimg/freshwork0.webp',
      '/projectimg/freshwork1.webp',
      '/projectimg/freshwork2.webp'
      ],
  },

  {
    slug: 'kora',
    id: '05/05',
    title: 'Kora',
    description:
      'Engineered an e-commerce platform and brand identity tailored for modern sustainable fashion.',
    year: '2025',
    role: 'Full Stack Engineer',
    services: [
      'Brand & Design System',
      'UI Design & Prototyping',
      'Engineering & Development',
    ],
    tools: [],
    previewImage:
      '/visa.jpeg',
    bgImage:
       '/visa.jpeg',
      gallery: ['/thrift.png'],
  },
]