export type ServiceItem = {
  id: string
  label: string
  title: string
  image: string
  description: string
  tags: string[]
  price: string
  timeline: string
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-design',
    label: 'Web Design',
    title: 'Web Design',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    description: 'We design visually compelling, user-centric websites that blend creativity with functional brand systems from scratch.',
    tags: ['UX UI Design', 'Responsive Layouts', 'Web Development'],
    price: '$250',
    timeline: '1 – 2 Months',
  },
  {
    id: 'brand-design',
    label: 'Brand Design',
    title: 'Brand Design',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop',
    description: 'From logo to language, we shape your brand identity. Strategic brand systems that tell your story and stand strong.',
    tags: ['Visual Identity', 'Style Guides', 'Brand Strategy'],
    price: '$130',
    timeline: '1 Month',
  },
  {
    id: 'logo-design',
    label: 'Logo Design',
    title: 'Logo Design',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1000&auto=format&fit=crop',
    description: 'Every brand deserves a signature mark. We craft logos that are bold and clear. Let your brand speak without saying a word.',
    tags: ['Logo Marks', 'Wordmarks', 'Icon Design'],
    price: '$100',
    timeline: '15 Days',
  },
  {
    id: 'growth-marketing',
    label: 'Growth & Ads',
    title: 'Digital Marketing & Growth',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    description: 'Targeted advertising campaigns, content publishing workflows, and digital media strategy built to scale performance.',
    tags: ['Paid Social', 'Performance Ads', 'Media Growth'],
    price: '$180',
    timeline: 'Ongoing',
  },
]