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

  return (
    <section className='w-full bg-surface-page pb-12'>
      {/* Top Section: Back Button + Metadata Grid */}
      <Container className='flex flex-col gap-8 pt-4'>
        {/* Back Link */}
        <Link
          href='/works'
          className='inline-flex items-center gap-2 text-caption text-size-small font-secondary hover:text-heading transition-colors w-fit'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Works
        </Link>

        {/* 12-Column Responsive Layout */}
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
             <div className='flex flex-col gap-1'>
              <span className='text-caption uppercase tracking-wider'>Services</span>
              <span className='text-size-body font-secondary font-bold text-heading'>
                {project.services.join(', ')}
              </span>
            </div>
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

            {/* Services */}
           

            {/* Tools Pill Badges */}
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

      {/* Hero Frame: Previous | Hero Image | Next */}
      <Container className='mt-12'>
        <div className='flex items-center gap-3 sm:gap-6 w-full'>
          {/* Previous Link */}
          <Link
            href={`/works/${prevProject.slug}`}
            className='group flex flex-col gap-1 text-left shrink-0 max-w-[120px] sm:max-w-[160px]'
          >
            <span className='inline-flex items-center gap-1.5 text-caption text-size-small font-secondary uppercase tracking-wider group-hover:text-heading transition-colors'>
              <ArrowLeft className='w-3.5 h-3.5 shrink-0' />
              Previous
            </span>
            <span className='text-small sm:text-size-body font-secondary font-bold text-heading truncate'>
              {prevProject.title}
            </span>
          </Link>

          {/* Center Image Container */}
          <div className='flex-1 max-w-2xl lg:max-w-3xl aspect-video relative rounded-2xl overflow-hidden border border-border-subtle shadow-md mx-auto'>
            <Image
              src={project.bgImage}
              alt={project.title}
              fill
              priority
              className='object-cover'
            />
          </div>

          {/* Next Link */}
          <Link
            href={`/works/${nextProject.slug}`}
            className='group flex flex-col gap-1 text-right items-end shrink-0 max-w-[120px] sm:max-w-[160px]'
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