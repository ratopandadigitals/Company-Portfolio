import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { WORK_ITEMS } from '@/data/works'
import Container from '@/components/atoms/Container'

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>
}

const WorkDetailPage = async (props: WorkDetailPageProps) => {
  const params = await props.params
  const projectIndex = WORK_ITEMS.findIndex((item) => item.slug === params.slug)
  const project = WORK_ITEMS[projectIndex]

  if (!project) {
    notFound()
  }

  // Circular navigation logic
  const nextProject = WORK_ITEMS[(projectIndex + 1) % WORK_ITEMS.length]
  const prevProject = WORK_ITEMS[(projectIndex - 1 + WORK_ITEMS.length) % WORK_ITEMS.length]
  const position = projectIndex + 1
  const total = WORK_ITEMS.length

  return (
    <section className='w-full bg-surface-page pb-12'>
      {/* Back Link */}
      <Container className='flex bg flex-col gap-8 pt-4'>
        <Link
          href='/works'
          className='inline-flex items-center gap-2 text-caption text-size-small font-secondary hover:text-heading transition-colors w-fit'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Works
        </Link>
      </Container>

      {/* Hero Image: leads immediately, full width, no nav competing for space */}
      <Container className='mt-6'>
      <div className='group max-w-4xl mx-auto aspect-video relative rounded-2xl overflow-hidden border border-border-subtle shadow-md'>
            <Image
            src={project.bgImage}
            alt={project.title}
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
              {project.id}
            </span>
            <h1 className='text-h1 sm:text-display font-primary font-bold text-heading tracking-tight'>
              {project.title}
            </h1>
            <p className='text-size-body font-secondary text-caption max-w-2xl leading-relaxed'>
              {project.description}
            </p>
          </div>

          {/* Right Sidebar (5 cols): Metadata + Tools */}
          <div className='lg:col-span-5 flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-border-subtle pt-6 lg:pt-0 lg:pl-8'>
            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-1'>
                <span className='text-caption uppercase tracking-wider'>Year</span>
                <span className='text-size-body font-secondary font-bold text-heading'>{project.year}</span>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-caption uppercase tracking-wider'>Role</span>
                <span className='text-size-body font-secondary font-bold text-heading'>{project.role}</span>
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <span className='text-caption uppercase tracking-wider'>Services</span>
              <span className='text-size-small font-secondary font-bold text-heading'>
                {project.services.join(', ')}
              </span>
            </div>

            {project.tools && project.tools.length > 0 && (
              <div className='flex flex-col gap-2'>
                <span className='text-caption uppercase tracking-wider font-secondary'>
                  Tools Used
                </span>
                <div className='flex flex-wrap gap-2'>
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className='inline-flex items-center px-2.5 py-1 rounded-full bg-surface-card border border-border-subtle text-caption text-size-small font-secondary font-medium text-heading shadow-2xs'
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Gallery */}
      {project.gallery.length > 1 && (
        <Container className='mt-12'>
          <div className='relative'>
            <div className='flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide'>
              {project.gallery.map((img, index) => (
                <div
                  key={img + index}
                  className=' group relative shrink-0 w-[180px] sm:w-[280px] aspect-video rounded-2xl overflow-hidden border border-border-subtle snap-start'
                >
                  <Image
                    src={img}
                    alt={`${project.title} gallery image ${index + 1}`}
                    fill
                    sizes='(max-width: 640px) 280px, 400px'
                    className='object-cover transition-transform duration-500 ease-out group-hover:scale-105'
                  />
                </div>
              ))}
            </div>
            {/* Edge fade signals horizontal overflow without adding visible chrome */}
            <div className='pointer-events-none absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-surface-page to-transparent' />
          </div>
        </Container>
      )}

      {/* Prev/Next: exit navigation, placed at the end of the reading flow */}
      <Container className='mt-12'>
        <div className='flex items-center justify-between gap-3 sm:gap-6 w-full border-t border-border-subtle pt-6'>
          <Link
            href={`/works/${prevProject.slug}`}
            className='group flex flex-col gap-1 text-left shrink-0 max-w-[140px] sm:max-w-[200px]'
          >
            <span className='inline-flex items-center gap-1.5 text-caption text-size-small font-secondary uppercase tracking-wider group-hover:text-heading transition-colors'>
              <ArrowLeft className='w-3.5 h-3.5 shrink-0' />
              Previous
            </span>
            <span className='text-small sm:text-size-body font-secondary font-bold text-heading truncate'>
              {prevProject.title}
            </span>
          </Link>

          <span className='text-caption text-size-small font-secondary shrink-0'>
            {position} / {total}
          </span>

          <Link
            href={`/works/${nextProject.slug}`}
            className='group flex flex-col gap-1 text-right items-end shrink-0 max-w-[140px] sm:max-w-[200px]'
          >
            <span className='inline-flex items-center gap-1.5 text-caption text-size-small font-secondary uppercase tracking-wider group-hover:text-heading transition-colors'>
              Next
              <ArrowRight className='w-3.5 h-3.5 shrink-0' />
            </span>
            <span className='text-small sm:text-size-body font-secondary font-bold text-heading truncate'>
              {nextProject.title}
            </span>
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default WorkDetailPage