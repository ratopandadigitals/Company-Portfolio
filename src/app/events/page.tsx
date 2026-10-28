import React from 'react'
import EventHero from '@/components/sections/events/EventHero'
import EventsSection from '@/components/sections/events/EventsSection'
import clientPromise from '@/lib/mongodb'
import type { EventDocument } from '@/types/database'

const Hero = async () => {
  const client = await clientPromise
  const events = await client
    .db('rato_panda_portfolio')
    .collection<EventDocument>('events')
    .find({})
    .sort({ date: 1 })
    .toArray()

  return (
   <main>
      <EventHero />
    <EventsSection
      events={events.map((event) => ({
        id: event.id,
        slug: event.slug,
        title: event.title,
        date: event.date,
        location: event.location,
        description: event.description,
        image: event.image,
        status: event.status,
        ctaLabel: event.ctaLabel,
      }))}
    />
  </main>
  )
}

export default Hero