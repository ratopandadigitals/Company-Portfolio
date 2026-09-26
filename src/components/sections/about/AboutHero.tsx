import SplitHero from '@/components/organisms/SplitHero'

const AboutHero = () => (
  <SplitHero
    headline={{
      line1: { text: 'WE TURN IDEAS', highlight: 'INTO USEFUL,' },
      line2: { text: 'REFINED &', highlight: 'PURPOSEFUL.' },
    }}
    imageSrcs={[
      '/about/aboutpill.jpg',
      '/about/aboutpill1.jpg',
    ]}
    description='Rato Panda Digitals is a creative digital and IT solutions company established in 2026. We combine strategy, design and technology to create brands, websites, digital products and technology solutions.'
    ctaLabel='Start a Project'
    ctaHref='/contact'
  />
)

export default AboutHero