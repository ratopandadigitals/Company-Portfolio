import { notFound } from 'next/navigation'
import { EVENTS_DATA } from '@/data/events'
import Container from '@/components/atoms/Container'
import Section from '@/components/atoms/Section'

type eventDetailPageProps = {
  params: Promise<{ slug: string }>
}

const eventDetailPage = async (props: eventDetailPageProps) => {
  const params = await props.params
  const event = EVENTS_DATA.find((item) => item.slug === params.slug)

  if (!event) {
    notFound()
  }

  return (
    <>
      <Section className='w-full bg-surface-page'>
        <Container className='flex flex-col gap-8 pt-8'>
          <div className='flex flex-col gap-2'>
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

          <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border-subtle pt-6'>
            <div className='flex flex-col gap-1'>
              <span className='text-caption uppercase tracking-wider text-size-caption'>Year</span>
              <span className='text-size-body font-secondary font-bold text-heading'>{event.date}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-caption uppercase tracking-wider text-size-caption'>Role</span>
              <span className='text-size-body font-secondary font-bold text-heading'>{event.location}</span>
            </div>
            <div className='flex flex-col gap-1 col-span-2 sm:col-span-2'>
              <span className='text-caption uppercase tracking-wider text-size-caption'>Services</span>
              <span className='text-size-body font-secondary font-bold text-heading'>
                {event.status}
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <Section className='w-full bg-surface-page'>
        <Container>
          <div className='w-full rounded-2xl overflow-hidden border border-border-subtle'>
            <img
            
              alt={event.title}
              className='w-full h-auto object-cover'
            />
          </div>
        </Container>
      </Section>
    </>
  )
}

export default eventDetailPage