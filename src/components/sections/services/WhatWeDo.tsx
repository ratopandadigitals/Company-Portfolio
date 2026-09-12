'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import Section from '@/components/atoms/Section'
import Container from '@/components/atoms/Container'
import FoldText from '@/components/Animation/FoldText'
import { SERVICES_DATA, ServiceItem} from './Service'

type WhatWeDoProps = {
  eyebrow?: string
  heading?: string
  services?: ServiceItem[]
}

const WhatWeDo = (props: WhatWeDoProps) => {

  const eyebrow = props.eyebrow || 'Services'
  const heading = props.heading || 'What We Can Do'
  const services = props.services || SERVICES_DATA

  const [active, setActive] = useState(0)

  return (
    <Section className='w-full bg-surface-page overflow-hidden'>
      <Container className='max-w-7xl mx-auto flex flex-col gap-10'>

        {/* Header */}
        <div className='flex flex-col gap-2  items-center text-heading'>
          <span className='text-caption text-size-body font-mono tracking-wider uppercase block'>
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
      <div className='w-full flex flex-col lg:flex-row gap-4 h-auto lg:h-115'>
          {services.map((service: ServiceItem, i: number) => {
            const isActive = i === active
            const formattedNum = String(i + 1).padStart(2, '0')

            return (
              <motion.div
                key={service.id || i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                animate={{ flex: isActive ? 5 : 1 }}
                transition={{ duration: 1.05, ease: [0.25, 1, 0.5, 1] }}
                className={`relative overflow-hidden rounded-2xl border cursor-pointer select-none transition-colors duration-500 min-h-30 lg:min-h-0 ${
                  isActive
                    ? 'bg-surface-card border-border-subtle shadow-2xl'
                    : 'bg-surface-section border-transparent hover:bg-surface-divider/20'
                }`}
              >
                {/* Background Image Layer with Zoom on Active & Blur on Inactive */}
                <div className='absolute inset-0 w-full h-full overflow-hidden '>
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    animate={{
                      scale: isActive ? 1.05 : 1.0,
                      filter: isActive ? 'blur(0px)' : 'blur(2px)',
                      opacity: isActive ? 0.55 : 0.35,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className='w-full h-full object-cover'
                  />

                  {/* Gradient & Darkening Overlay */}
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      isActive
                        ? 'bg-linear-to-t from-surface-card via-surface-card/80 to-transparent'
                        : 'bg-surface-card/80'
                    }`}
                  />
                </div>

                {/* Collapsed State Layout */}
                {!isActive && (
                  <>
                    {/* Desktop Vertical View */}
                    <div className='hidden lg:flex absolute inset-0 p-8 sh flex-col justify-between items-center z-10 pointer-events-none'>
                      <span className='text-caption font-mono font-bold tracking-widest'>
                        {formattedNum}
                      </span>
                      <div className='-rotate-90 origin-center  whitespace-nowrap mb-16'>
                        <h3 className='text-heading font-primary shadow-sky-500 font-bold text-small tracking-tight'>
                          {service.title}
                        </h3>
                      </div>
                      <div className='w-2 h-2' />
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

                {/* Expanded State: Content Layered Above Active Image */}
                <AnimatePresence mode='wait'>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.65, ease: 'easeOut' }}
                      className='relative z-20 w-full h-full p-6 sm:p-8 flex flex-col justify-end gap-4'
                    >
                      <div className='flex flex-col gap-3 max-w-2xl text-heading'>
                        {/* Animated Service Eyebrow Badge */}
                        <motion.div
                          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
                          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                          className='inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface-card/10 border border-primary/25 text-primary text-caption font-mono font-bold tracking-wider uppercase w-fit backdrop-blur-md shadow-xs'
                        >
                          <motion.span
                            animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                            className='w-1.5 h-1.5 rounded-full bg-primary shrink-0'
                          />
                          <span>{formattedNum} Our Services</span>
                        </motion.div>

                        <FoldText
                          text={service.title}
                          splitBy='char'
                          hinge='top'
                          duration={0.65}
                          stagger={0.045}
                          ease='power3.out'
                          perspective={700}
                          fontSize='clamp(1.35rem, 2.2vw, 1.85rem)'
                          fontWeight={800}
                        />
                        <p className='text-caption font-secondary shadow-2xl leading-relaxed max-w-xl'>
                          {service.description}
                        </p>
                      </div>

                      {/* Tag Pills */}
                      <div className='flex flex-wrap gap-2.5 pt-1'>
                        {service.tags?.map((tag, tagIndex) => (
                          <div
                            key={tagIndex}
                            className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card font-secondary text-heading text-small font-semibold border border-border-subtle/40'
                          >
                            <span className='flex items-center justify-center w-4 h-4 rounded-full bg-success text-white shrink-0'>
                              <Check className='w-2.5 h-2.5 stroke-3' />
                            </span>
                            <span>{tag}</span>
                          </div>
                        ))}
                      </div>
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