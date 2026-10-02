import SplitHero from '@/components/organisms/SplitHero'

const EventHero = () => (
  <SplitHero
    headline={{
      line1: { text: 'EXPERIENCES', highlight: 'DESIGNED,' },
      line2: { text: 'WITH', highlight: 'PURPOSE.' },
    }}
    imageSrcs={[
      '/eventimg/eventpill.jpg',
      '/eventimg/eventpill1.jpg',
    ]}
    description='Events, workshops and experiences designed with intention. Real event information and registration details coming soon.'
    ctaLabel='View Upcoming Events'
    ctaHref='#events-section'
  />
)

export default EventHero