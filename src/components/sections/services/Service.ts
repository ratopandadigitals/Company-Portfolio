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
      'We build the full foundation of your brand\u2019s visual identity \u2014 logo design, visual guidelines, color palettes, typography, and core design assets.',
    tags: ['Brand Identity'],
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
      'We start with target audience analysis, competitor benchmarking, and modern reference mapping, then map user flows and navigation structure, and define technical scope, feature specifications, and project milestones in a full PRD before any design begins.',
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
      'From low-fidelity wireframes defining content order and page flow, to high-fidelity Figma UI design built on your PRD and brand system, to fully clickable prototypes you can preview and approve before a single line of code is written.',
    tags: ['Wireframing', 'Figma UI Design', 'Interactive Prototyping'],
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
      'Figma designs become production React and Next.js front-ends, backed by full-stack web applications with backend setup, database management, and API integrations \u2014 plus native iOS and Android app builds when you need them.',
    tags: ['Front-End Engineering', 'Full-Stack Development', 'Mobile App Development'],
    price: 'RS 2500,',
    timeline: '5-6 Weeks',
    width: 300
  },
  {
    id: 'digital-growth',
    label: 'Digital Growth',
    title: 'Digital Growth',
    image: '/Service/DigitalGrowth.webp',
    description:
      'Paid advertisement setup and targeted campaign execution, paired with channel management, content deployment, and brand visibility optimization to keep growth compounding after launch.',
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


