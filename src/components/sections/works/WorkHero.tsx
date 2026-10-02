import SplitHero from '@/components/organisms/SplitHero'

const WorkHero = () => (
  <SplitHero
    headline={{
      line1: { text: 'OUR WORK', highlight: 'IN ACTION,' },
      line2: { text: 'FEATURED', highlight: 'Work.' },
    }}
    imageSrcs={[
      '/workimg/workpill.jpg',
      '/workimg/workpill1.jpg',
    ]}
    description='We have helped businesses across industries achieve their goals. Here are some of our selected works.'
    ctaLabel='Explore Our Work'
    ctaHref='#selected-work'
  />
)

export default WorkHero