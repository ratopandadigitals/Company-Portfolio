'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '@/components/atoms/Section'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import { EVENTS_DATA, EventItem } from '@/data/events'

import { useStickyStack, containerVariants, itemVariants } from '@/components/hooks/useStickyStack'

type EventFilter = 'all' | 'upcoming' | 'past'

type EventsSectionProps = {
  eyebrow?: string
  heading?: string
  events?: EventItem[]
}

const EventsSection = (props: EventsSectionProps) => {
  const eyebrow = props.eyebrow || '(Events)'
  const heading = props.heading || 'Where We Show Up'
  const events = props.events || EVENTS_DATA

  const [filter, setFilter] = useState<EventFilter>('all')

  // FIX 1: stable reference. Before, `.filter()` ran fresh on every render
  // (even ones unrelated to the filter), handing useStickyStack a new
  // array identity each time and forcing GSAP to tear down + rebuild the
  // whole ScrollTrigger for no reason. useMemo makes the reference only
  // change when `filter` or `events` actually change.
  const filteredEvents = useMemo(
    () => (filter === 'all' ? events : events.filter((event) => event.status === filter)),
    [filter, events]
  )
const [selectedTicketEvent, setSelectedTicketEvent] = useState<EventItem | null>(null)
  const { containerRef, cardClassName } = useStickyStack(filteredEvents)

  const handleFilterChange = (newFilter: EventFilter) => {
    setFilter(newFilter)
  }

  return (
    <Section className='w-full bg-surface-page pb-24 lg:pb-32 '>
      <Container className='flex flex-col gap-10'>

        {/* Section Header */}
        <div className='flex flex-col items-center text-center gap-4'>
          <span className='text-caption text-small font-secondary tracking-wider uppercase'>
            {eyebrow}
          </span>
          <h1 className='text-h1 sm:text-display font-primary font-bold text-heading tracking-tight'>
            {heading}
          </h1>
        </div>

        {/* Filter Controls */}
        <div className='flex items-center justify-center gap-3'>
          <button
            type='button'
            onClick={() => handleFilterChange('all')}
            className={`px-5 py-2 rounded-full text-small font-secondary font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-surface-default text-caption border border-border-subtle hover:text-heading'
            }`}
          >
            All
          </button>
          <button
            type='button'
            onClick={() => handleFilterChange('upcoming')}
            className={`px-5 py-2 rounded-full text-small font-secondary font-medium transition-colors ${
              filter === 'upcoming'
                ? 'bg-primary text-white'
                : 'bg-surface-default text-caption border border-border-subtle hover:text-heading'
            }`}
          >
            Upcoming
          </button>
          <button
            type='button'
            onClick={() => handleFilterChange('past')}
            className={`px-5 py-2 rounded-full text-small font-secondary font-medium transition-colors ${
              filter === 'past'
                ? 'bg-primary text-white'
                : 'bg-surface-default text-caption border border-border-subtle hover:text-heading'
            }`}
          >
            Past Events
          </button>
        </div>

        {/* Desktop Sticky Pinned Stack */}
        <div ref={containerRef} className='block relative w-full h-[75vh] max-h-150 z-10'>
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`${cardClassName} absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-surface-section border border-border-subtle shadow-lg`}
            >
              <motion.div
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className='absolute inset-0 bg-cover bg-center'
                style={{ backgroundImage: `url(${event.image})` }}
              />
              <div className='absolute inset-0 bg-linear-to-t from-surface-page via-surface-page/85 to-transparent' />

              <div className='relative z-10 h-full flex flex-col justify-end p-10 gap-4'>
                <span className='font-secondary tracking-widest text-heading'>
                  {event.id} / {String(filteredEvents.length).padStart(2, '0')}
                </span>
                <h2 className='text-h1 font-primary font-bold text-heading tracking-tight leading-tight max-w-xl'>
                  {event.title}
                </h2>
                <div className='flex items-center gap-4 text-small font-secondary text-caption'>
                  <span>{event.date}</span>
                  <span className='w-1 h-1 rounded-full bg-caption' />
                  <span>{event.location}</span>
                </div>
                <p className='text-body font-secondary text-size-caption max-w-lg leading-relaxed'>
                  {event.description}
                </p>
                {/* Full-card background link for slug navigation */}
          <Link 
            href={`/events/${event.slug}`} 
            className="absolute inset-0 z-0" 
            aria-label={event.title}
          />

          {/* Button isolated with stopPropagation for modal popup */}
          <div className="pt-2 relative z-10 pointer-events-auto">
            <Button 
              icon 
              onClick={(e) => {
                e.stopPropagation() // Prevents triggering the background Link
                setSelectedTicketEvent(event) // Triggers modal popup
              }}
            >
              {event.ctaLabel}
            </Button>
          </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View
            FIX 2: this is the actual reason mobile animation "isn't working" —
            it was `animate='visible'`, which fires the instant the component
            mounts (i.e. on page load), regardless of whether it's on-screen.
            On mobile this section sits well below the fold, so by the time
            someone scrolls down to it, the animation already finished a
            second or two earlier off-screen — it LOOKS like nothing is
            animating, because nothing is, anymore, by the time it's visible.
            `whileInView` fixes that: it only plays once this block actually
            scrolls into the viewport. */}
        {/* <AnimatePresence mode='wait'>
          <motion.div
            key={filter}
            className='flex lg:hidden flex-col gap-5'
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-60px' }}
            exit='hidden'
          >
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className='relative rounded-2xl overflow-hidden bg-surface-section border border-border-subtle shadow-md'
              >
                <div className='relative w-full aspect-4/3 overflow-hidden'>
                  <img
                    src={event.image}
                    alt={event.title}
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute inset-0 bg-linear-to-t from-surface-page via-surface-page/50 to-transparent' />
                </div>

                <div className='p-6 flex flex-col gap-3'>
                  <span className='font-secondary tracking-widest text-caption'>
                    {event.id} / {String(filteredEvents.length).padStart(2, '0')}
                  </span>
                  <h2 className='text-h3 font-primary font-bold text-heading tracking-tight'>
                    {event.title}
                  </h2>
                  <div className='flex items-center gap-3 text-small font-secondary text-caption'>
                    <span>{event.date}</span>
                    <span className='w-1 h-1 rounded-full bg-caption' />
                    <span>{event.location}</span>
                  </div>
                  <p className='text-small font-secondary text-caption leading-relaxed'>
                    {event.description}
                  </p>
                  <div className='pt-1'>
                    <Link href={`/events/${event.slug}`}>
                      <Button icon>{event.ctaLabel}</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence> */}
<AnimatePresence>
  {selectedTicketEvent && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-surface-section p-8 rounded-3xl border border-border-subtle max-w-md w-full relative z-10">
        <button 
          onClick={() => setSelectedTicketEvent(null)}
          className="absolute top-4 right-4 text-caption hover:text-heading"
        >
          ✕
        </button>
        <h3 className="text-h3 font-bold mb-2 text-heading">{selectedTicketEvent.title}</h3>
        <p className="text-small text-caption mb-6">{selectedTicketEvent.date} — {selectedTicketEvent.location}</p>
        
      </div>
    </div>
  )}
</AnimatePresence>
      </Container>
    </Section>
  )
}

export default EventsSection  