export type ServicePhase = {
  id: string
  phaseNumber: string
  category: string
  title: string
  subtitle: string
  description: string
  icon: string
  image: string
  bullets: string[]
  deliverables: string[]
  outputTag: string
}

export const SERVICE_PROCESS: ServicePhase[] = [
  {
    id: 'phase-01',
    phaseNumber: '01',
    category: 'Research & Discovery',
    title: 'Research & User Discovery',
    subtitle: 'Understanding the people you are building for.',
    description:
      'We learn about your target users, industry, and competitors to understand what people need, where they struggle, and what already works in the market. This gives us a clear direction before we start designing.',
    icon: 'Search',
    image: '/Rd.png',
    bullets: [
      'Target audience and user research',
      'Industry and competitor analysis',
      'User needs and pain point mapping',
    ],
    deliverables: [
      'User insights',
      'Competitor benchmarks',
    ],
    outputTag: 'Deliverables: User insights, competitor benchmarks',
  },

  {
    id: 'phase-02',
    phaseNumber: '02',
    category: 'Requirements & Strategy',
    title: 'Scope & Requirement Planning',
    subtitle: 'Turning ideas into a clear project plan.',
    description:
      'We define what the product needs to include, from pages and features to content and functionality. This gives everyone a clear understanding of what we are building before design and development begin.',
    icon: 'FileText',
    image: '/Rs.png',
    bullets: [
      'Page and feature requirements',
      'Content and functionality mapping',
      'Project scope and milestone planning',
    ],
    deliverables: [
      'Project scope document',
      'Feature requirements',
    ],
    outputTag:
      'Deliverables: Project scope document, feature requirements',
  },

  {
    id: 'phase-03',
    phaseNumber: '03',
    category: 'UI/UX Design',
    title: 'Visual & Interface Design',
    subtitle: 'Turning the plan into a clear interface.',
    description:
      'We start with low-fidelity wireframes to work out the structure and user flow. Once the foundation is right, we create the final interface in Figma with your brand, responsive layouts, and a reusable design system.',
    icon: 'LayoutGrid',
    image: '/images/services/03-design.webp',
    bullets: [
      'Low-fidelity wireframes and page layouts',
      'High-fidelity UI design in Figma',
      'Design system and reusable components',
    ],
    deliverables: [
      'Wireframes and page layouts',
      'High-fidelity Figma designs',
    ],
    outputTag:
      'Deliverables: Wireframes, page layouts, high-fidelity Figma designs',
  },

  {
    id: 'phase-04',
    phaseNumber: '04',
    category: 'Prototyping',
    title: 'Interactive Prototype',
    subtitle: 'Experiencing the product before it is built.',
    description:
      'We connect the approved screens into an interactive prototype so you can experience the main user flows before development starts. This gives us a chance to review the experience and make changes while they are still easy to make.',
    icon: 'MousePointerClick',
    image: '/images/services/04-prototype.webp',
    bullets: [
      'Interactive desktop and mobile flows',
      'Pre-development flow validation',
      'Stakeholder review and approval',
    ],
    deliverables: [
      'Interactive prototype',
      'Design approval',
    ],
    outputTag:
      'Deliverables: Interactive prototype, design approval',
  },

  {
    id: 'phase-05',
    phaseNumber: '05',
    category: 'Engineering',
    title: 'Frontend Development',
    subtitle: 'Bringing the approved design to life.',
    description:
      'We turn the approved Figma designs into a working frontend using React or Next.js. The interface is built to work across screen sizes, with attention to accessibility, performance, and a solid technical foundation for search engines.',
    icon: 'Code2',
    image: '/images/services/05-development.webp',
    bullets: [
      'Figma-to-code React and Next.js development',
      'Responsive and mobile-first implementation',
      'Performance, accessibility, and SEO foundations',
    ],
    deliverables: [
      'Production-ready frontend',
      'Responsive live website',
    ],
    outputTag:
      'Deliverables: Production-ready frontend, responsive live website',
  },
]