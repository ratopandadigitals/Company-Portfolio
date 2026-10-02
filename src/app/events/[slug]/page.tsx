import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { EVENTS_DATA } from '@/data/events'
import Container from '@/components/atoms/Container'

type EventDetailPageProps = {
  params: Promise<{ slug: string }>
}

const EventDetailPage = async (props: EventDetailPageProps) => {
  const params = await props.params
  const eventIndex = EVENTS_DATA.findIndex((item) => item.slug === params.slug)
  const event = EVENTS_DATA[eventIndex]

  if (!event) {
    notFound()
  }

  // Circular navigation logic
  const nextEvent = EVENTS_DATA[(eventIndex + 1) % EVENTS_DATA.length]
  const prevEvent = EVENTS_DATA[(eventIndex - 1 + EVENTS_DATA.length) % EVENTS_DATA.length]
  const position = eventIndex + 1
  const total = EVENTS_DATA.length

  return (
    <section className='w-full bg-surface-page pb-12'>
      {/* Back Link */}
      <Container className='flex flex-col gap-8 pt-4'>
        <Link
          href='/events'
          className='inline-flex items-center gap-2 text-caption text-size-small font-secondary hover:text-heading transition-colors w-fit'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Events
        </Link>
      </Container>

      {/* Hero Image */}
      <Container className='mt-6'>
        <div className='group max-w-4xl mx-auto aspect-video relative rounded-2xl overflow-hidden border border-border-subtle shadow-md'>
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            sizes='(max-width: 1024px) 100vw, 1024px'
            className='object-cover transition-transform duration-500 ease-out group-hover:scale-105'
          />
        </div>
      </Container>

      {/* Title, Overview & Metadata */}
      <Container className='flex flex-col gap-8 mt-12'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8'>
          {/* Left Column (7 cols): Title & Overview */}
          <div className='lg:col-span-7 flex flex-col gap-4'>
            <span className='text-caption text-size-small font-secondary tracking-widest'>
              {event.id}
            </span>
            <h1 className='text-h1 sm:text-display font-primary font-bold text-heading tracking-tight'>
              {event.title}
            </h1>
            <p className='text-size-body font-secondary text-caption max-w-2xl leading-relaxed'>
              {event.description}
            </p>
          </div>

          {/* Right Sidebar (5 cols): Metadata */}
          <div className='lg:col-span-5 flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-border-subtle pt-6 lg:pt-0 lg:pl-8'>
            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-1'>
                <span className='text-caption uppercase tracking-wider'>Date</span>
                <span className='text-size-body font-secondary font-bold text-heading'>{event.date}</span>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-caption uppercase tracking-wider'>Location</span>
                <span className='text-size-body font-secondary font-bold text-heading'>{event.location}</span>
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <span className='text-caption uppercase tracking-wider'>Status</span>
              <span className='text-size-body font-secondary font-bold text-heading'>
                {event.status}
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Prev/Next: exit navigation, placed at the end of the reading flow */}
      <Container className='mt-12'>
        <div className='flex items-center justify-between gap-3 sm:gap-6 w-full border-t border-border-subtle pt-6'>
          <Link
            href={`/events/${prevEvent.slug}`}
            className='group flex flex-col gap-1 text-left shrink-0 max-w-[140px] sm:max-w-[200px]'
          >
            <span className='inline-flex items-center gap-1.5 text-caption text-size-small font-secondary uppercase tracking-wider group-hover:text-heading transition-colors'>
              <ArrowLeft className='w-3.5 h-3.5 shrink-0' />
              Previous
            </span>
            <span className='text-small sm:text-size-body font-secondary font-bold text-heading truncate'>
              {prevEvent.title}
            </span>
          </Link>

          <span className='text-caption text-size-small font-secondary shrink-0'>
            {position} / {total}
          </span>

          <Link
            href={`/events/${nextEvent.slug}`}
            className='group flex flex-col gap-1 text-right items-end shrink-0 max-w-[140px] sm:max-w-[200px]'
          >
            <span className='inline-flex items-center gap-1.5 text-caption text-size-small font-secondary uppercase tracking-wider group-hover:text-heading transition-colors'>
              Next
              <ArrowRight className='w-3.5 h-3.5 shrink-0' />
            </span>
            <span className='text-small sm:text-size-body font-secondary font-bold text-heading truncate'>
              {nextEvent.title}
            </span>
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default EventDetailPage