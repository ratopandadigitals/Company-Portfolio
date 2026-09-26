import SplitHero from '@/components/organisms/SplitHero'

const ServiceHero = () => (
  <SplitHero
    headline={{
      line1: { text: 'Our Creative', highlight: 'Services,' },
      line2: { text: 'Excellence', highlight: 'Delivered.' },
    }}
    imageSrcs={[
      '/Service/servicepill.jpg',
      '/Service/servicepill1.jpg',
    ]}
    description='We turn ideas, stories, and strategies from the creative edge covering design development, and the tools that bring bold digital works to life.'
    ctaLabel='Get Started'
    ctaHref='/contact'
  />
)

export default ServiceHero