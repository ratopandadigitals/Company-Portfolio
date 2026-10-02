import React from 'react'
import Link from 'next/link'
import Container from '@/components/atoms/Container'
import { WORK_ITEMS } from '@/data/works'
import Image from 'next/image'
import { SERVICES_DATA } from '@/components/sections/services/Service'
import Section from '@/components/atoms/Section'

type ProjectCard = {
  id: string
  src: string
  alt?: string
  // Only work items have a real detail page today (/works/[slug]).
  // Services don't have individual detail pages in the current route map,
  // so their tiles render without a link — no artificial slug needed.
  href?: string
}

type CollageSectionProps = {
  // Optional escape hatch: pass explicit projects to override the
  // works/services data entirely (e.g. for a curated homepage subset).
  projects?: ProjectCard[]
}

// Builds the collage from real portfolio data — no hardcoded cap. Add a new
// entry to WORK_ITEMS or SERVICES_DATA and it shows up here automatically,
// no code change needed.
//
// NOTE: one Service.ts entry ('brand-design-system') currently has
// image: '/' which is not a real image path — filtered out below so it
// doesn't render as a broken tile, but that source data should be fixed too.
const buildProjectsFromSharedData = (): ProjectCard[] => {
  const workCards: ProjectCard[] = WORK_ITEMS.map((work) => ({
    id: work.slug,
    src: work.previewImage,
    alt: work.title,
    href: `/works/${work.slug}`,
  }))

  const serviceCards: ProjectCard[] = SERVICES_DATA
    .filter((service) => service.image && service.image !== '/')
    .map((service) => ({
      id: service.id,
      src: service.image,
      alt: service.title,
      // no href — services don't have individual detail pages yet
    }))

  return [...workCards, ...serviceCards]
}

const tileClassName =
  'group relative block rounded-2xl sm:rounded-3xl border border-border-subtle/40 bg-surface-default overflow-hidden shadow-2xl aspect-16/10 pointer-events-auto'

const CollageSection = (props: CollageSectionProps) => {

  const projects = props.projects || buildProjectsFromSharedData()

  return (
    <Section className='w-full bg-surface-page'>
    <Container className='w-full '>
      {/* Outer capsule box — switches with light/dark mode */}
      <div className='relative w-full h-112.5 sm:h-145 md:h-162.5 rounded-3xl sm:rounded-[36px] bg-surface-page border border-border-subtle/40 overflow-hidden shadow-2xl flex items-center justify-center'>

        {/* Tilted grid, rotated as one block, oversized so it fills the edges */}
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-[130%] sm:w-[125%] md:w-[120%] -rotate-6 -skew-y-3 scale-110 transform-gpu'>
            {projects.map((project, index) => {
              const tileInner = (
                <>
                  {/* Blurred backdrop fills the tile so the foreground image
                      can show FULLY (uncropped) via object-contain, with no
                      empty letterbox gaps. */}
                  {/* Blurred backdrop */}
<Image
  src={project.src}
  alt=''
  aria-hidden='true'
  fill
  sizes='(max-width: 768px) 50vw, 33vw'
  className='object-cover object-center scale-125 blur-2xl opacity-50 select-none'
/>

{/* Foreground: full image */}
                  <Image
                    src={project.src}
                    alt={project.alt || `Project ${index + 1}`}
                    fill
                    loading='eager'
                    sizes='(max-width: 768px) 50vw, 33vw'
                    className='object-contain object-center select-none transition-transform duration-500 ease-out group-hover:scale-110'
                  />
                  {/* Foreground: the full, uncropped image */}
                  <Image
                  src={project.src}
                  alt={project.alt || `Project ${index + 1}`}
                  fill
                  sizes='(max-width: 768px) 50vw, 33vw'
                  className='object-contain object-center select-none transition-transform duration-500 ease-out group-hover:scale-110'
                />
                  {/* Hover overlay: subtle darken + label reveal */}
                  <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-3 sm:p-4'>
                    <span className='text-white text-xs sm:text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
                      {project.alt}
                    </span>
                  </div>
                  <div className='absolute inset-0 ring-1 ring-inset ring-border-subtle/40 rounded-2xl sm:rounded-3xl pointer-events-none' />
                </>
              )

              return project.href ? (
                <Link key={project.id || index} href={project.href} className={tileClassName}>
                  {tileInner}
                </Link>
              ) : (
                <div key={project.id || index} className={tileClassName}>
                  {tileInner}
                </div>
              )
            })}
          </div>
        </div>

        {/*
          Edge vignette — only fades the outer ~15% on each edge (previously
          faded the WHOLE grid with a near-opaque overlay, which washed out
          images in light mode). Center stays fully clear.
        */}
        <div className='absolute inset-0 pointer-events-none bg-linear-to-t from-surface-page from-0% via-transparent via-15% to-transparent to-85% opacity-70' />
        <div className='absolute inset-0 pointer-events-none bg-linear-to-t from-transparent from-85% to-surface-page to-100% opacity-70' />
        <div className='absolute inset-0 pointer-events-none bg-linear-to-r from-surface-page from-0% via-transparent via-15% to-transparent to-85% opacity-40' />
        <div className='absolute inset-0 pointer-events-none bg-linear-to-r from-transparent from-85% to-surface-page to-100% opacity-40' />
      </div>
    </Container>
    </Section>
  )
}

export default CollageSection