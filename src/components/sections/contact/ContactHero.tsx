import SplitHero from '@/components/organisms/SplitHero'

const ContactHero = () => (
  <SplitHero
    headline={{
      line1: { text: "LET'S BUILT", highlight: 'SOMETHING' },
      line2: { text: 'TOGETHER', highlight: 'CONTACT.' },
    }}
    imageSrcs={[
      '/contactimg/contactpill.jpg',
      '/contactimg/contactpill1.jpg',
    ]}
    description='Have a project, idea, or challenge? We would love to hear it. Let’s collaborate and bring something meaningful to life.'
    ctaLabel='Contact'
    ctaHref='#contact-form'
  />
)

export default ContactHero