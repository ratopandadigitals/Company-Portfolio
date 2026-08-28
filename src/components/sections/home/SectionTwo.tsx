import React from 'react'
import Container from '@/components/atoms/Container'

type ProjectCard = {
  id: string
  src: string
  alt?: string
}

type CollageSectionProps = {
  projects?: ProjectCard[]
}

const defaultProjects: ProjectCard[] = [
  {
    id: '1',
    src: '/app.png',
    alt: 'Digital Experience',
  },
  {
    id: '2',
    src: 'Descriiption.png',
    alt: 'VNTNR Wine',
  },
  {
    id: '3',
    src: '/hamro.jpeg',
    alt: 'Sottozero',
  },
  {
    id: '4',
    src: 'thrift.png',
    alt: 'Archin Studio',
  },
  {
    id: '5',
    src: 'Vehicle.jpeg',
    alt: 'Logoipsum Display',
  },
  {
    id: '6',
    src: 'Visa.jpeg',
    alt: 'Creative Portfolio',
  },
]

const CollageSection = (props: CollageSectionProps) => {

  const projects = props.projects || defaultProjects

  return (
    <Container className='w-full pt-4 pb-12 sm:pb-16'>
      {/* Outer capsule box — now switches with light/dark mode */}
      <div className='relative w-full h-112.5 sm:h-145 md:h-162.5 rounded-3xl sm:rounded-[36px] bg-surface-page border border-border-subtle/40 overflow-hidden shadow-2xl flex items-center justify-center'>

        {/* Tilted grid, rotated as one block, oversized so it fills the edges */}
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-[130%] sm:w-[125%] md:w-[120%] -rotate-6 -skew-y-3 scale-110 transform-gpu'>
            {projects.map((project, index) => (
              <div
                key={project.id || index}
                className='relative rounded-2xl sm:rounded-3xl border border-border-subtle/40 bg-surface-default overflow-hidden shadow-2xl aspect-16/10'
              >
                <img
                  src={project.src}
                  alt={project.alt || `Project ${index + 1}`}
                  className='w-full h-full object-cover object-center select-none'
                />
                <div className='absolute inset-0 ring-1 ring-inset ring-border-subtle/40 rounded-2xl sm:rounded-3xl pointer-events-none' />
              </div>
            ))}
          </div>
        </div>

        {/* Edge vignette — fades the grid smoothly into the page background, switches with mode */}
        <div className='absolute inset-0 pointer-events-none bg-linear-to-t from-surface-page via-transparent to-surface-page opacity-90' />
        <div className='absolute inset-0 pointer-events-none bg-linear-to-r from-surface-page via-transparent to-surface-page opacity-60' />
      </div>
    </Container>
  )
}

export default CollageSection