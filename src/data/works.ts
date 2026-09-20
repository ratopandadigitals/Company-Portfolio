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
      'Engineering & Development',
    ],
    tools: ['Figma'],
    previewImage: '/thrift.png',
    bgImage: '/thrift.png',
    gallery: ['/thrift.png'],
  },

  {
    slug: 'Hamrodocs',
    id: '02/05',
    title: 'Hamrodocs',
    description:
      "We've partnered with businesses across various industries to help them achieve their goals.",
    year: '2018',
    role: 'Logo Designer',
    services: [
      'Brand & Design System',
      'Development & Engineering',
    ],
    tools: ['Visual Studio Code', 'Figma'],
    previewImage: '/hamro.jpeg',
    bgImage: '/hamro.jpeg',
    gallery: ['/thrift.png'],
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
    slug: 'lumina',
    id: '04/05',
    title: 'Lumina',
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
      '/thrift.png',
    bgImage:
      '/thrift.png',
      gallery: ['/thrift.png'],
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