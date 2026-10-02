export type ServiceItem = {
  id: string
  label: string
  title: string
  image: string
  description: string
  tags: string[]
  width?: number
  price: string
  timeline: string
}

export const SERVICES_DATA: ServiceItem[] = [

  {
    id: 'brand-design-system',
    label: 'Brand & Design System',
    title: 'Brand & Design System',
    image: '/Service/Brand&DesignSystem.webp',
    description:
    'We design your logo, color palettes, and typography, and deliver visual guidelines and core design assets with them.',
    tags: ['Logo Design', 'Brand Guidelines', 'Color & Typography'],
    price: 'RS 1000,',
    width: 400,
    timeline: '2-3 Weeks',
  },
  {
    id: 'ux-research-planning',
    label: 'UX Research & Product Planning',
    title: 'UX Research & Product Planning',
    image: '/Service/UXResearch&ProductPlanning.webp',
    description:
        'Before any design begins, we write a full PRD from audience analysis and competitor benchmarking. It sets the technical scope, feature specifications, and milestones.',
    tags: ['User & Market Research', 'Information Architecture', 'PRD'],
    price: 'RS 1500,',
    width: 380,
    timeline: '3-4 Weeks',
  },
  {
    id: 'ui-design-prototyping',
    label: 'UI Design & Prototyping',
    title: 'UI Design & Prototyping',
    image: '/Service/UiDesign&Prototyping.webp',
    description:
  'You approve a clickable Figma prototype before we write a single line of code. It\u2019s built on your PRD and brand system.',
    tags: ['Wireframing', 'High-Fidelity UI Design', 'Interactive Prototyping'],
    price: 'RS 2000,',
    timeline: '4-5 Weeks',
    width: 300
  },
  {
    id: 'engineering-development',
    label: 'Engineering & Development',
    title: 'Engineering & Development',
    image: '/Service/Development.webp',
    description:
        'We turn the Figma designs into production React and Next.js front-ends, and build the full-stack side too: backend, database, and API integrations.',
    tags: ['Front-End Engineering', 'Full-Stack Development', 'Native iOS & Android Apps'],
    price: 'RS 2500.',
    timeline: '5-6 Weeks',
    width: 300
  },
  {
    id: 'digital-growth',
    label: 'Digital Growth',
    title: 'Digital Growth',
    image: '/Service/DigitalGrowth.webp',
    description:
  'We set up your paid ads and run the campaigns, then handle channel management, content deployment, and brand visibility after launch.',
    tags: ['Social Media Boosting', 'Digital Media Strategy'],
    price: 'RS 3000,',
    timeline: '1-2 Weeks',
    width: 200,
  },
  // {
  //   id: 'emerging-technologies',
  //   label: 'Emerging Technologies',
  //   title: 'Emerging Technologies (Coming Soon)',
  //   image: 'https://picsum.photos/seed/emerging-technologies/900/700',
  //   description:
  //     'Intelligent system integration and operational process automation \u2014 the next phase of what we offer.',
  //   tags: ['AI & Workflow Automation'],
  //   price: 'Custom Quote',
  //   timeline: 'Coming Soon',
  // },

]


