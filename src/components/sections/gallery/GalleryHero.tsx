import SplitHero from '@/components/organisms/SplitHero'

const GalleryHero = () => (
  <SplitHero
    headline={{
      line1: { text: 'CREATIVE', highlight: 'PROCESS' },
      line2: { text: '&', highlight: 'DIGITAL CRAFT.' },
    }}
    imageSrcs={[
      '/galleryimage/gallerypill.jpg',
      '/galleryimage/gallerypill1.jpg',
    ]}
    description='Explore selected visual gallery, project details, brand assets, process moments and media created by Rato Panda Digitals.'
    ctaLabel='Explore Our gallery'
    ctaHref='#bento-gallery'
  />
)

export default GalleryHero