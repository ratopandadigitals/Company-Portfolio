'use client'


import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/atoms/Container'
import FoldText from '@/components/Animation/FoldText'
import Section from '@/components/atoms/Section'
import StickyCard from '@/components/Animation/StickyCard'
import { WORK_ITEMS, WorkItem } from '@/data/works'
import { SERVICES_DATA } from '@/components/sections/services/Service'

type SelectedWorkProps = {
  eyebrow?: string
  title?: string
  items?: WorkItem[]
  showFilter?: boolean
} 



const SelectedWork = (props: SelectedWorkProps) => {
  const eyebrow = props.eyebrow || '(Why client love RatoPandadigitals)'
  const title = props.title || "(Selected Works)"
  const items = props.items || WORK_ITEMS
  const [filter, setFilter] = useState<string>('all')

  const showFilter= props.showFilter ?? true

  // Extract all unique services dynamically for filter options
 const categories = useMemo(
  () => ['all', ...SERVICES_DATA.map((s) => s.label)],
  []
)

  // Filter items based on active selection
  const filteredItems = useMemo(
    () => (filter === 'all' ? items : items.filter((item) => item.services.includes(filter))),
    [filter, items]
  )
  
  return (
    <Section className="w-full bg-surface-page py-6 px-2 flex flex-col items-center justify-center">
      <Container className="max-w-work-card w-full flex flex-col space-y-10">
        {/* Header */}
      <div id="selected-work" className="flex flex-col items-center w-full gap-2 scroll-mt-28">          <span className="text-caption text-size-cta font-secondary font-semibold tracking-wide text-center">
            {eyebrow}
          </span>
          <h2 className="w-full text-center text-6xl sm:text-8xl lg:text-[100px] font-primary font-bold tracking-tight text-heading/30 leading-none select-none">
            {title}
          </h2>
        </div>
        {/* Filter Bar */}
        {showFilter && (
        <div className="flex flex-wrap items-center justify-center gap-3 z-20 mb-0 py-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-size-caption font-semibold font-secondary transition-colors duration-500 ease-out cursor-pointer ${
                filter === cat
                  ? 'bg-primary border border-border-subtle hover:bg-primary/90 transition '
                  : 'bg-surface-section text-caption border border-border-subtle hover:text-heading transition  '
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
        )}
        {/* Animated Sticky Card Stack - LINES 58 to 123 */}
        <StickyCard 
          key={filter}
           items={filteredItems}
          renderCard={(item) => (
             <Link
                href={`/works/${item.slug}`}
                className="group relative block w-full h-full rounded-2xl backdrop-blur-xl overflow-hidden bg-surface-section border border-border-subtle p-inset-card shadow-lg hover:border-border-strong transition-all duration-300"
              >
              <div
                className="absolute inset-0 bg-cover bg-center blur-2xl scale-125 opacity-50 pointer-events-none transition-all duration-700"
                style={{ backgroundImage: `url(${item.previewImage})` }}
              />
              <div className="absolute inset-0 bg-surface-page/70 pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full h-full">
                {/* Left column */}
                  <div className="lg:col-span-4 flex flex-col justify-start lg:justify-between lg:h-full py-2 gap-3 lg:gap-16 font-secondary text-size-cta lg:text-body">                  <p className="order-2 lg:order-none line-clamp-3 lg:line-clamp-none font-secondary text-body leading-relaxed max-w-xs">                    {item.description}
                  </p>
                    <div className="hidden lg:flex flex-col gap-2">
                    <span className="text-size-body text-heading font-bold uppercase tracking-wider">
                      tools
                    </span>
                    <ul className="flex flex-col gap-1 text-size-cta sm:text-size-cta">
                      {item.tools.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                      <div className="order-1 lg:order-none flex flex-col gap-2 lg:mt-auto text-heading">
                      <span className="text-caption font-secondary tracking-widest">
                      {item.id}
                    </span>
                   
                      <FoldText
                        text={item.title}
                        splitBy="char"
                        hinge="top"
                        duration={0.65}
                      stagger={0.045}
                      ease="power3.out"
                      perspective={700}
                      fontSize="clamp(1.75rem, 2.8vw, 2.75rem)"
                      fontWeight={800}
                    />
                    
                  </div>
                </div>

                {/* Center column: mockup image */}
                      <div className="order-first lg:order-none lg:col-span-4 flex justify-center items-center">
                        <div className="relative w-full h-44 sm:h-auto max-w-[280px] sm:max-w-[320px] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                      src={item.previewImage}
                      alt={item.title}
                      fill
                      loading="eager"
                      sizes='(max-width: 640px) 200px, 320px'
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Right column: metadata */}
                          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between h-full gap-stack-content font-secondary text-small lg:pl-16">
                        <div className="flex flex-col gap-1">
                    <span className="text-caption uppercase tracking-wider">
                      Year
                    </span>
                    <span className="text-body font-bold">{item.year}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-caption uppercase tracking-wider">
                      Role
                    </span>
                    <span className="text-small font-medium text-body">
                      {item.role}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-caption uppercase tracking-wider">
                      Services
                    </span>
                    <ul className="flex flex-col gap-1 text-body sm:text-small">
                      {item.services.map((service) => (
                        <li key={service}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              </Link>

          
          )}
        />
      </Container>
    </Section>
  )
}

export default SelectedWork