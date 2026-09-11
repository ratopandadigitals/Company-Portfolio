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
    title: 'Research & Customer Study',
    subtitle: 'Knowing your audience.',
    description:
      'We study your target customers and analyze what works best in your industry. This ensures every page is designed to solve real user needs and outperform competitors.',
    icon: 'Search',
    image: '/images/services/01-research.webp',
    bullets: [
      'Target customer audience study',
      'Industry competitive benchmark analysis',
      'User pain point & need mapping',
    ],
    deliverables: ['Customer insights', 'Competitor benchmarks'],
    outputTag: 'Deliverables: Customer insights, competitor benchmarks',
  },
  {
    id: 'phase-02',
    phaseNumber: '02',
    category: 'Requirements & Strategy',
    title: 'Scope & Requirement Planning',
    subtitle: 'Setting a clear roadmap.',
    description:
      'We detail every page, feature, and goal in a simple requirement document. This keeps your project running smoothly, on budget, and completely transparent from day one.',
    icon: 'FileText',
    image: '/images/services/02-scope.webp',
    bullets: [
      'Page-by-page feature specification',
      'Budget and milestone alignment',
      'Transparent scope documentation',
    ],
    deliverables: ['Project scope document', 'Feature list'],
    outputTag: 'Deliverables: Project scope document, feature list',
  },
  {
    id: 'phase-03',
    phaseNumber: '03',
    category: 'UI/UX Design',
    title: 'Visual & Interface Design',
    subtitle: 'Creating the look and feel.',
    description:
      'Using Figma, we build simple wireframes to organize page layouts, followed by full visual designs tailored specifically to your brand identity.',
    icon: 'LayoutGrid',
    image: '/images/services/03-design.webp',
    bullets: [
      'Low-fidelity layout wireframing in Figma',
      'Brand-tailored high-fidelity UI design',
      'Design system & reusable components',
    ],
    deliverables: ['Page layouts', 'Full visual designs in Figma'],
    outputTag: 'Deliverables: Page layouts, full visual designs in Figma',
  },
  {
    id: 'phase-04',
    phaseNumber: '04',
    category: 'Prototyping',
    title: 'Interactive Prototype',
    subtitle: 'Testing before building.',
    description:
      'We turn static designs into a clickable prototype. You can navigate through every screen on your phone or desktop to test the user flow before development starts.',
    icon: 'MousePointerClick',
    image: '/images/services/04-prototype.webp',
    bullets: [
      'Clickable desktop & mobile user flow simulation',
      'Pre-development UX testing',
      'Stakeholder review & sign-off',
    ],
    deliverables: ['Clickable preview model', 'Final sign-off'],
    outputTag: 'Deliverables: Clickable preview model, final sign-off',
  },
  {
    id: 'phase-05',
    phaseNumber: '05',
    category: 'Engineering',
    title: 'Frontend Development',
    subtitle: 'Building for speed and performance.',
    description:
      'We convert approved designs into clean, production-ready code using React and Next.js. Your final website loads quickly, works on all devices, and is optimized for Google search.',
    icon: 'Code2',
    image: '/images/services/05-development.webp',
    bullets: [
      'Figma-to-code React & Next.js conversion',
      'Fully responsive & mobile-first implementation',
      'Performance, accessibility & SEO optimization',
    ],
    deliverables: ['Live, mobile-responsive website'],
    outputTag: 'Deliverables: Live, mobile-responsive website',
  },
]