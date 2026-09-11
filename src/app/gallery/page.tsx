import React from 'react'
import GalleryHero from '@/components/sections/gallery/GalleryHero'
import BentoGallery from '@/components/sections/gallery/BentoGallery '
import Cta from '@/components/sections/contact/Cta'

const Hero = () => {
  return (
    <div><GalleryHero />
    <BentoGallery />
    <Cta />
    </div>
  )
}

export default Hero