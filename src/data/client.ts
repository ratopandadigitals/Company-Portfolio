export type StatItem = {
  id: string
  value: string
  label: string
}

export const STATS_ITEMS: StatItem[] = [
  { id: '01', value: '4+', label: 'Finalized Projects' },
  { id: '02', value: '98%', label: 'Client satisfaction rate' },
  { id: '03', value: '1k', label: 'Gross Revenue' },
]
export type TestimonialItem = {
  id: string
  quote: string
  name: string
  role: string
  bgImage: string
}
export const TESTIMONIALS_ITEMS: TestimonialItem[] = [
  {
    id: '01',
    quote: '"Franklin turned our ideas into a sharp, clean brand. Fast, easy, and right on point."',
    name: 'Dipesh Basnet',
    role: 'Co-founder, NovaTech',
    bgImage:'/client/test.jpg'
  },
  {
    id: '02',
    quote: '"Exceeded expectations in every single sprint. The attention to detail is unmatched."',
    name: 'Nischit Shrestha',
    role: 'Product Lead, Apex',
    bgImage: '/client/test1.jpg',
  },
  // {
  //   id: '03',
  //   quote: '"A true partner in engineering complex software into simple, elegant digital design."',
  //   name: 'David Chen',
  //   role: 'CTO, Pulse',
  //   bgImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
  // },
]