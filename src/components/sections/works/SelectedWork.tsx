'use client'

import React from 'react'
import Container from '@/components/atoms/Container'

type WorkItem = {
  id: string
  title: string
  description: string
  year: string
  role: string
  services: string[]
  previewImage: string
  bgImage: string
}

type SelectedWorkProps = {
  eyebrow?: string
  title?: string
  items?: WorkItem[]
}

const WORK_ITEMS: WorkItem[] = [
  {
    id: '01/03',
    title: 'Archin',
    description: "We've helped businesses across industries achieve their goals. Here are some of our selected works.",
    year: '2025',
    role: 'Lead Designer',
    services: ['Website Design', 'Product Design', 'Branding', 'Development'],
    previewImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '02/03',
    title: 'VNTNR',
    description: "We've partnered with businesses across various industries to help them achieve their goals.",
    year: '2018',
    role: 'Logo Designer',
    services: ['Designing', 'Branding', 'Redesigning', 'Development'],
    previewImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    bgImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '03/03',
    title: 'Aeorim',
    description: "We've collaborated with companies from diverse sectors to turn their visions into reality. Here's a look at some of our featured work.",
    year: '2023',
    role: 'Website Designer',
    services: ['Branding', 'Revamp', 'Development', 'Designing'],
    previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    bgImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
  },
]

const SelectedWork = (props: SelectedWorkProps) => {

  const eyebrow = props.eyebrow || '(Why client love RatoPandadigitals)'
  const title = props.title || 'Recent Work'
  const items = props.items || WORK_ITEMS

  return (
    <section className='w-full bg-surface-page py-10 px-2 flex flex-col items-center justify-center'>
      <Container className='max-w-work-card w-full flex flex-col gap-4'>

        {/* Header — text-heading/10 already switches on its own */}
        <div className='flex flex-col items-center w-full gap-2'>
          <span className='text-heading/10 text-small font-secondary font-medium tracking-wide text-center'>
            {eyebrow}
          </span>
          <h2 className='w-full text-center text-6xl sm:text-8xl lg:text-[100px] font-primary font-bold tracking-tight text-heading/10 leading-none select-none'>
            {title}
          </h2>
        </div>

        {/* Vertical stacked cards — permanently dark (confirmed pattern) */}
        <div className='flex flex-col gap-stack-container w-full items-center justify-center'>
          {items.map((item) => (
            <div
              key={item.id}
              className='relative w-full max-w-work-card rounded-2xl backdrop-blur-xl overflow-hidden bg-surface-section border-primary-subtle-hover p-inset-card flex items-center justify-between  shadow-lg transition-transform duration-300 hover:scale-[1.01]'
            >
              <div
                className='absolute inset-0 bg-cover bg-center opacity-40 blur-3xl scale-125 pointer-events-none'
                style={{ backgroundImage: `url(${item.bgImage})` }}
              />
             <div
              className="absolute inset-0 bg-cover bg-center blur-2xl scale-125 opacity-50 pointer-events-none transition-all duration-700"
              style={{ backgroundImage: `url(${item.previewImage})` }}
            />

              <div className='relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full h-full'>

                {/* Left column */}
                <div className='lg:col-span-4 flex flex-col justify-between h-full gap-stack-content'>
                  <p className='text-body-body:text-body font-secondary text-body leading-relaxed max-w-xs'>
                    {item.description}
                  </p>
                  <div className='flex flex-col gap-2 mt-auto'>
                    <span className='text-caption font-secondary tracking-widest'>
                      {item.id}
                    </span>
                    <h3 className='text-h2 sm:text-h1 lg:text-display font-primary font-bold text-heading tracking-tight leading-none'>
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Center column: mockup image */}
                <div className='lg:col-span-4 flex justify-center items-center'>
                  <div className='relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl'>
                    <img
                      src={item.previewImage}
                      alt={item.title}
                      className='w-full h-full object-cover'
                    />
                  </div>
                </div>

                {/* Right column: metadata */}
                <div className='lg:col-span-4 flex flex-col justify-between h-full gap-stack-content font-secondary text-body text-small lg:pl-16'>
                  <div className='flex flex-col gap-1'>
                    <span className='text-caption uppercase tracking-wider'>Year</span>
                    <span className='text-body font-bold '>{item.year}</span>
                  </div>

                  <div className='flex flex-col gap-1'>
                    <span className='text-caption uppercase tracking-wider'>Role</span>
                    <span className='text-small font-medium text=body'>{item.role}</span>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <span className='text-caption uppercase tracking-wider'>Services</span>
                    <ul className='flex flex-col gap-1 text-body sm:text-small '>
                      {item.services.map((service, idx) => (
                        <li key={idx}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default SelectedWork