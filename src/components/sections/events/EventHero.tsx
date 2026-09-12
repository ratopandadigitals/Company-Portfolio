'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Section from '@/components/atoms/Section'

type EventHeroProps = {
  description?: string
  ctaLabel?: string
  ctaHref?: string
  eventImageSrcs?: string[]
}

// Parent stagger — triggers elements top to bottom
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

// Item fade and slide up
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

// Entrance pop for image pills
const pillEntranceVariants: Variants = {
  hidden: { opacity: 0, y: -25, scale: 0.7, rotate: -6 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 240, damping: 18 },
  },
}

const EventHero = (props: EventHeroProps) => {
  const description =
    props.description ||
    'Events, workshops and experiences designed with intention. Real event information and registration details coming soon.'
  const ctaLabel = props.ctaLabel || 'View Upcoming Events'
  const ctaHref = props.ctaHref || '/contact'

  const eventImageSrcs = props.eventImageSrcs || [
    'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80',
  ]

  return (
    <Section className='bg-surface-page'>
      <Container className=''>
        <motion.div
          className='flex flex-col items-center gap-6 text-center'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {/* Headline — 2 lines, 2 image circles */}
          <div className='flex flex-col items-center font-primary font-bold text-5xl sm:text-6xl md:text-display leading-tight'>
            
            {/* Line 1 */}
            <motion.div variants={itemVariants} className='flex items-center gap-2 sm:gap-3 flex-nowrap whitespace-nowrap justify-center'>
              <span className='text-caption opacity-40'>EXPERIENCES</span>
              <motion.div variants={pillEntranceVariants}>
                <motion.div
                  animate={{
                    y: [0, -10, 4, 0],
                    x: [0, 5, -5, 0],
                    rotate: [0, -3, 3, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  }}
                  className='h-10 sm:h-16 aspect-square rounded-full overflow-hidden shrink-0'
                >
                  <img src={eventImageSrcs[0]} alt='Project preview' className='w-full h-full object-cover' />
                  
                </motion.div>
              </motion.div>
              <span className='text-orange-500'>DESIGNED,</span>
            </motion.div>

            {/* Line 2 */}
            <motion.div variants={itemVariants} className='flex items-center gap-2 sm:gap-3 mt-0 sm:mt-1 flex-nowrap whitespace-nowrap justify-center'>
              <span className='text-caption'>WITH</span>
              <motion.div variants={pillEntranceVariants}>
                <motion.div
                  animate={{
                    y: [0, -8, 6, 0],
                    x: [0, -6, 4, 0],
                    rotate: [0, 4, -2, 0],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                    delay: 0.3,
                  }}
                  className='h-10 sm:h-16 aspect-square rounded-full overflow-hidden shrink-0'
                >
                  <img src={eventImageSrcs[1]} alt='Project preview' className='w-full h-full object-cover' />
                </motion.div>
              </motion.div>
              <span className='text-caption opacity-40'>PURPOSE.</span>
            </motion.div>

          </div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className='max-w-xl text-small sm:text-body text-caption font-secondary leading-relaxed'
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <Button href={ctaHref} variant='liquid'>
              {ctaLabel}
            </Button>
          </motion.div>

        </motion.div>
      </Container>
    </Section>
  )
}

export default EventHero 