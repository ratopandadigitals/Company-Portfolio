'use client'

import React, {useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '@/components/atoms/Section'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import { EVENTS_DATA, EventItem } from '@/data/events'
import { useRouter } from 'next/navigation'

import { useStickyStack } from '@/components/hooks/useStickyStack'

type EventFilter = 'all' | 'upcoming' | 'past'

type EventsSectionProps = {
  eyebrow?: string
  heading?: string
  events?: EventItem[]
}
// const FILTERS: { label: string; value: EventFilter }[] = [
//   { label: 'All', value: 'all' },
//   { label: 'Upcoming', value: 'upcoming' },
//   { label: 'Past Events', value: 'past' },
// ]

const EventsSection = (props: EventsSectionProps) => {
  const eyebrow = props.eyebrow || '(Events)'
  const heading = props.heading || 'Where We Show Up'
  const events = props.events || EVENTS_DATA
  const router = useRouter()
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

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [phone, setPhone] = useState('')

const [registrationStatus, setRegistrationStatus] =
  useState<'idle' | 'success'>('idle')
  const { containerRef, cardClassName } = useStickyStack(filteredEvents)

  const handleFilterChange = (newFilter: EventFilter) => {
    setFilter(newFilter)
  }
  
const handleRegistrationSubmit = (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault()

  if (!selectedTicketEvent) return

  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  const trimmedPhone = phone.trim()

  if (!trimmedName || !trimmedEmail) {
    return
  }

  const registrationData = {
    name: trimmedName,
    email: trimmedEmail,
    phone: trimmedPhone,
    eventId: selectedTicketEvent.id,
    eventTitle: selectedTicketEvent.title,
  }

  console.log('Demo registration:', registrationData)

  setRegistrationStatus('success')
}

  return (
    <Section className='w-full bg-surface-page pb-24 lg:pb-32 '>
      <Container className='flex flex-col gap-10'>

        {/* Section Header */}
        <div className='flex flex-col items-center text-center gap-4'>
          <span className='text-caption text-size-small font-secondary tracking-wider uppercase'>
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
            className={`px-5 py-2 rounded-full text-size-small font-secondary font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-surface-page'
                : 'bg-surface-default text-caption border border-border-subtle hover:text-heading'
            }`}
          >
            All
          </button>
          <button
            type='button'
            onClick={() => handleFilterChange('upcoming')}
            className={`px-5 py-2 rounded-full text-size-small font-secondary font-medium transition-colors ${
              filter === 'upcoming'
                ? 'bg-primary text-surface-page'
                : 'bg-surface-default text-caption border border-border-subtle hover:text-heading'
            }`}
          >
            Upcoming
          </button>
          <button
            type='button'
            onClick={() => handleFilterChange('past')}
            className={`px-5 py-2 rounded-full text-size-small font-secondary font-medium transition-colors ${
              filter === 'past'
                ? 'bg-primary text-surface-page'
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
                <div className='flex items-center gap-4 text-size-small font-secondary text-caption'>
                  <span>{event.date}</span>
                  <span className='w-1 h-1 rounded-full bg-caption' />
                  <span>{event.location}</span>
                </div>
                <p className='text-size-body font-secondary text-caption max-w-lg leading-relaxed'>
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
      e.stopPropagation()

      if (event.status === 'upcoming') {
        setName('')
        setEmail('')
        setPhone('')
        setRegistrationStatus('idle')
        setSelectedTicketEvent(event)
      } else {
        router.push(`/events/${event.slug}`)
      }
    }}
  >
    {event.ctaLabel}
  </Button>
</div>
              </div>
            </div>
          ))}
        </div>

       

<AnimatePresence>
  {selectedTicketEvent && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-heading/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.2 }}
       className="bg-surface-section p-6 sm:p-8 rounded-3xl
  border border-border-subtle shadow-2xl
  max-w-lg w-full max-h-[90vh] overflow-y-auto
  relative z-10">
        <button
          type="button"
          onClick={() => {
            setSelectedTicketEvent(null)
            setRegistrationStatus('idle')
          }}
          className="absolute top-4 right-4 text-caption hover:text-heading"
          aria-label="Close registration"
        >
          ✕
        </button>

        {registrationStatus === 'success' ? (
          <div className="text-center">
            <h3
              id="registration-title"
              className="text-h3 font-bold mb-2 text-heading"
            >
              Registration submitted!
            </h3>

            <p className="text-size-small text-caption">
              Your demo registration for{' '}
              {selectedTicketEvent.title} has been submitted.
              No actual booking or email confirmation has been
              created yet.
            </p>

            <div className="mt-6">
              <Button
                onClick={() => {
                  setSelectedTicketEvent(null)
                  setRegistrationStatus('idle')
                }}
                icon={false}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h3
              id="registration-title"
              className="text-h3 font-bold mb-2 text-heading"
            >
              Register for Event
            </h3>

            <p className="text-size-small text-caption mb-6">
              {selectedTicketEvent.title}
              <br />
              {selectedTicketEvent.date} —{' '}
              {selectedTicketEvent.location}
            </p>

            <form
              onSubmit={handleRegistrationSubmit}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="registration-name"
                  className="text-sm font-medium text-heading"
                >
                  Full Name
                </label>

                <input
                  id="registration-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-border-subtle
                  bg-surface-page px-4 py-3.5 text-heading
                  placeholder:text-caption/70
                  focus:outline-none focus:border-primary
                  focus:ring-2 focus:ring-primary/20
                  transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="registration-email"
                  className="text-sm font-medium text-heading"
                >
                  Email Address
                </label>

                <input
                  id="registration-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-border-subtle
                  bg-surface-page px-4 py-3.5 text-heading
                  placeholder:text-caption/70
                  focus:outline-none focus:border-primary
                  focus:ring-2 focus:ring-primary/20
                  transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="registration-phone"
                  className="text-sm font-medium text-heading"
                >
                  Phone Number (Optional)
                </label>

                <input
                  id="registration-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-border-subtle
              bg-surface-page px-4 py-3.5 text-heading
              placeholder:text-caption/70
              focus:outline-none focus:border-primary
              focus:ring-2 focus:ring-primary/20
              transition-colors"
                            />
              </div>
                <button
              type="submit"
              className="w-full rounded-full bg-heading px-6 py-3.5
                font-secondary font-medium text-surface-page
                transition-opacity hover:opacity-90
                focus-visible:outline-2 focus-visible:outline-offset-4
                focus-visible:outline-primary"
            >
              Submit Registration
             </button>
              
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      </Container>
    </Section>
  )
}

export default EventsSection