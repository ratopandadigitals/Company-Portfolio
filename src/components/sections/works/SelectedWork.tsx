'use client'

import React from 'react'
import Link from 'next/link'
import Container from '@/components/atoms/Container'
import FoldText from '@/components/Animation/FoldText'
import Section from '@/components/atoms/Section'
import StickyCard from '@/components/Animation/StickyCard'
import { WORK_ITEMS, WorkItem } from '@/data/works'

type SelectedWorkProps = {
  eyebrow?: string
  title?: string
  items?: WorkItem[]
} 



const SelectedWork = (props: SelectedWorkProps) => {
  const eyebrow = props.eyebrow || '(Why client love RatoPandadigitals)'
  const title = props.title || "(Selected Works)"
  const items = props.items || WORK_ITEMS

  return (
    <Section className="w-full bg-surface-page py-6 px-2 flex flex-col items-center justify-center">
      <Container className="max-w-work-card w-full flex flex-col -space-y-10">
        {/* Header */}
        <div className="flex flex-col items-center w-full gap-2">
          <span className="text-caption text-small font-secondary font-medium tracking-wide text-center">
            {eyebrow}
          </span>
          <h2 className="w-full text-center text-6xl sm:text-8xl lg:text-[100px] font-primary font-bold tracking-tight text-heading/10 leading-none select-none">
            {title}
          </h2>
        </div>

        {/* Animated Sticky Card Stack - LINES 58 to 123 */}
        <StickyCard 
          items={items}
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
                <div className="lg:col-span-4 flex flex-col justify-between h-full gap-stack-content">
                  <p className="font-secondary text-body leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                  <div className="flex flex-col gap-2 mt-auto text-heading">
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
                      fontSize="clamp(1.75rem, 3.5vw, 2.75rem)"
                      fontWeight={800}
                    />
                    
                  </div>
                </div>

                {/* Center column: mockup image */}
                <div className="lg:col-span-4 flex justify-center items-center">
                  <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={item.previewImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Right column: metadata */}
                <div className="lg:col-span-4 flex flex-col justify-between h-full gap-stack-content font-secondary text-small lg:pl-16">
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