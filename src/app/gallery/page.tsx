import React from 'react'
import GalleryHero from '@/components/sections/gallery/GalleryHero'
import BentoGallery from '@/components/sections/gallery/BentoGallery'
import Cta from '@/components/sections/contact/Cta'
import clientPromise from '@/lib/mongodb'
import type { GalleryDocument } from '@/types/database'

const Hero = async () => {
  const client = await clientPromise
  const gallery = await client
    .db('rato_panda_portfolio')
    .collection<GalleryDocument>('gallery')
    .find({})
    .sort({ id: 1 })
    .toArray()

  return (
    <div><GalleryHero />
    <BentoGallery
      initialItems={gallery.map((item) => ({
        id: item.id,
        type: item.type,
        title: item.title,
        url: item.url,
        span: item.span,
      }))}
    />
    <Cta />
    </div>
  )
}

export default Hero