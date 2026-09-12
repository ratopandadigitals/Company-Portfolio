import { notFound } from 'next/navigation'
import { WORK_ITEMS } from '@/data/works'
import Container from '@/components/atoms/Container'
import Section from '@/components/atoms/Section'

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>
}

const WorkDetailPage = async (props: WorkDetailPageProps) => {
  const params = await props.params
  const project = WORK_ITEMS.find((item) => item.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <Section className='w-full bg-surface-page'>
        <Container className='flex flex-col gap-8 pt-8'>
          <div className='flex flex-col gap-2'>
            <span className='text-caption text-size-small font-secondary tracking-widest'>
              {project.id}
            </span>
            <h1 className='text-h1 sm:text-display font-primary font-bold text-heading tracking-tight'>
              {project.title}
            </h1>
            <p className='text-size-body font-secondary text-caption max-w-2xl leading-relaxed'>
              {project.description}
            </p>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border-subtle pt-6'>
            <div className='flex flex-col gap-1'>
              <span className='text-caption uppercase tracking-wider text-caption'>Year</span>
              <span className='text-size-body font-secondary font-bold text-heading'>{project.year}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-caption uppercase tracking-wider text-caption'>Role</span>
              <span className='text-size-body font-secondary font-bold text-heading'>{project.role}</span>
            </div>
            <div className='flex flex-col gap-1 col-span-2 sm:col-span-2'>
              <span className='text-caption uppercase tracking-wider text-size-caption'>Services</span>
              <span className='text-size-body font-secondary font-bold text-heading'>
                {project.services.join(', ')}
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <Section className='w-full bg-surface-page'>
        <Container>
          {/* CHANGED: was a plain w-full/h-auto img with object-cover (a
              no-op together — object-cover needs a fixed-size box to crop
              into, h-auto gave it none, so tall source photos rendered at
              full natural height and blew up the page). Now: a fixed
              aspect-ratio box (aspect-video) the image is cropped INTO via
              absolute inset-0 + object-cover, so every project page gets
              the same hero shape regardless of the source photo's
              dimensions. */}
          <div className='relative w-full aspect-video rounded-2xl overflow-hidden border border-border-subtle'>
            <img
              src={project.bgImage}
              alt={project.title}
              className='absolute inset-0 w-full h-full object-cover'
            />
          </div>
        </Container>
      </Section>
    </>
  )
}

export default WorkDetailPage