'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import Section from '@/components/atoms/Section'
import Container from '@/components/atoms/Container'
import FoldText from '@/components/Animation/FoldText'
import { SERVICES_DATA, ServiceItem} from './Service'
import Image from 'next/image'

type WhatWeDoProps = {
  eyebrow?: string
  heading?: string
  services?: ServiceItem[]
}

const WhatWeDo = (props: WhatWeDoProps) => {

  const eyebrow = props.eyebrow || 'Services'
  const heading = props.heading || 'What We  Do'
  const services = props.services || SERVICES_DATA
  const [active, setActive] = useState(0)

  return (
    <Section className='w-full bg-surface-page overflow-hidden'>
      <Container className='max-w-7xl mx-auto mb-10 flex flex-col gap-10'>

        {/* Header */}
        <div id='what-we-do' className='flex flex-col gap-2  items-center text-heading scroll-mt-28'>          <span className='text-caption text-size-body font-secondary tracking-wider uppercase block'>
            {eyebrow}
          </span>
          <FoldText
            text={heading}
            splitBy='char'
            hinge='top'
            duration={0.65}
            stagger={0.045}
            ease='power3.out'
            perspective={700}
            fontSize='clamp(1.75rem, 3.0vw, 2.75rem)'
            fontWeight={700}
          />
        </div>

        {/* Responsive Container: Vertical stack on mobile, horizontal accordion on desktop */}
        <div className='w-full flex flex-col lg:flex-row gap-4 h-auto lg:h-120'>
          {services.map((service: ServiceItem, i: number) => {
            const isActive = i === active
            const formattedNum = String(i + 1).padStart(2, '0')

            return (
              <motion.div
                key={service.id || i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                animate={{ flex: isActive ? 5 : 1 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className={`relative overflow-hidden rounded-2xl border cursor-pointer select-none transition-colors duration-500 min-h-30 lg:min-h-0 ${
                  isActive
                    ? 'bg-surface-card border-border-subtle shadow-lg'
                    : 'bg-surface-card border-transparent hover:bg-surface-divider/20 lg:shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
                }`}
              >
                {/* Collapsed State: dim blurred backdrop */}
                {!isActive && (
                  <div className='absolute inset-0 overflow-hidden'>
                    <Image
                    src={service.image}
                    alt=''
                    fill
                    sizes='(min-width: 1024px) 20vw, 100vw'
                    className='object-cover blur-[3px] opacity-85'
                  />
                    <div className='absolute inset-0 bg-surface-card/90' />
                  </div>
                )}

                {/* Collapsed State Layout */}
                {!isActive && (
                  <>
                    {/* Desktop Vertical View */}
                    <div className='hidden lg:flex absolute inset-0 p-8 flex-col justify-between items-center z-10 pointer-events-none'>
                      <span className='text-caption font-mono font-bold tracking-widest'>
                        {formattedNum}
                      </span>
                      <div className='[writing-mode:vertical-rl] rotate-180 whitespace-nowrap'>
                        <h3 className='text-caption/90 font-primary font-bold text-size-body tracking-tight'>
                          {service.title}
                        </h3>
                      </div>
                      <div className='w-2 h-3' />
                    </div>

                    {/* Mobile Collapsed Bar View */}
                    <div className='flex lg:hidden absolute inset-0 p-6 items-center justify-between z-10'>
                      <span className='font-mono font-bold text-primary'>
                        {formattedNum}
                      </span>
                      <h3 className='text-heading font-primary font-bold tracking-tight'>
                        {service.title}
                      </h3>
                      <span className='text-caption uppercase font-mono'>
                        Expand +
                      </span>
                    </div>
                  </>
                )}

                {/* Expanded State: sharp image on top, text panel below */}
                <AnimatePresence mode='wait'>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className='relative z-20 w-full h-full flex flex-col'
                    >
                  
                     {/* Image zone */}
                <div className='relative h-52 lg:h-auto lg:flex-1 lg:min-h-0 px-5 pt-5'>
                  <div className='relative w-full h-full overflow-hidden rounded-xl'>
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      initial={{ scale: 1.12 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-surface-card/60 to-transparent' />

                    {/* Eyebrow badge over image */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                      className='absolute top-3 left-3 z-10 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface-card/70 border border-primary/25 text-heading font-mono font-bold tracking-wider uppercase w-fit backdrop-blur-md shadow-xs'
                    >
                      <motion.span
                        animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        className='w-1.5 h-1.5 rounded-full bg-success shrink-0'
                      />
                      {/* <span>{formattedNum} Our Services</span> */}
                    </motion.div>
                  </div>
                </div>

                      {/* Text zone */}
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
              className='px-6 pt-5 pb-6 flex flex-col gap-3'                      >
                        <div className='flex flex-col gap-3 max-w-2xl text-heading'>
                          <FoldText
                            text={service.title}
                            splitBy='char'
                            hinge='top'
                            duration={0.65}
                            stagger={0.045}
                            ease='power3.out'
                            perspective={700}
                            fontSize='clamp(1.35rem, 2.2vw, 1.85rem)'
                            fontWeight={700}
                          />
                          <p className='text-heading text-size-body font-secondary leading-relaxed max-w-xl'>
                            {service.description}
                          </p>
                        </div>

                        {/* Tag Pills */}
                        <div className='flex flex-wrap gap-2.5 pt-1'>
                          {service.tags?.map((tag, tagIndex) => (
                            <div
                              key={tagIndex}
                              className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card font-secondary text-caption text-size-caption font-semibold border border-border-subtle/40'
                            >
                              <span className='flex items-center justify-center w-4 h-4 rounded-full bg-success text-white shrink-0'>
                                <Check className='w-2.5 h-2.5 stroke-3' />
                              </span>
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

export default WhatWeDo