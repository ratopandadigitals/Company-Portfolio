'use client'

import React from 'react'
import { motion, Variants, useReducedMotion } from 'framer-motion'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Section from '@/components/atoms/Section'
import Image from 'next/image'

// Each line has plain text (gray) and a highlight (colored accent).
// e.g. line1: { text: 'WE TURN IDEAS', highlight: 'INTO USEFUL,' }
type HeroLine = {
  text: string
  highlight: string
}

export type SplitHeroProps = {
  headline: {
    line1: HeroLine
    line2: HeroLine
  }
  imageSrcs: [string, string]
  description: string
  ctaLabel: string
  ctaHref: string
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

const SplitHero = ({
  headline,
  imageSrcs,
  description,
  ctaLabel,
  ctaHref,
}: SplitHeroProps) => {
  const { line1, line2 } = headline

  // Respects OS-level reduced-motion — the two wobble loops below are JS
  // (Framer Motion), so the CSS prefers-reduced-motion rule in globals.css
  // can't reach them. This guard is the JS-side equivalent.
  const shouldReduceMotion = useReducedMotion()

  const wobbleA = shouldReduceMotion
    ? {}
    : {
        animate: {
          y: [0, -10, 4, 0],
          x: [0, 5, -5, 0],
          rotate: [0, -3, 3, 0],
        },
        transition: {
          duration: 5,
          repeat: Infinity,
          repeatType: 'mirror' as const,
          ease: 'easeInOut' as const,
        },
      }

  const wobbleB = shouldReduceMotion
    ? {}
    : {
        animate: {
          y: [0, -8, 6, 0],
          x: [0, -6, 4, 0],
          rotate: [0, 4, -2, 0],
        },
        transition: {
          duration: 5.5,
          repeat: Infinity,
          repeatType: 'mirror' as const,
          ease: 'easeInOut' as const,
          delay: 0.3,
        },
      }

  return (
    <Section className='bg-surface-page'>
      <Container>
        <motion.div
          className='flex flex-col items-center gap-6 text-center'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {/* Headline — 2 lines, 2 image circles. Fluid --text-size-display
              token only (no raw text-5xl/6xl mixing), wraps below sm where
              there isn't enough width for nowrap. */}
          <div className='flex flex-col items-center font-primary font-bold text-size-display leading-tight'>
            {/* Line 1 */}
            <motion.div
              variants={itemVariants}
              className='flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 sm:whitespace-nowrap justify-center'
            >
              <span className='text-caption opacity-40'>{line1.text}</span>
              <motion.div variants={pillEntranceVariants}>
                <motion.div
                  {...wobbleA}
                  className='relative h-10 sm:h-16 aspect-square rounded-full overflow-hidden shrink-0'
                >
                  <Image
                    src={imageSrcs[0]}
                    alt='Project preview'
                    fill
                    sizes='(max-width: 640px) 40px, 64px'
                    className='object-cover'
                  />
                </motion.div>
              </motion.div>
              <span className='text-primary'>{line1.highlight}</span>
            </motion.div>

            {/* Line 2 */}
            <motion.div
              variants={itemVariants}
              className='flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 mt-0 sm:mt-1 sm:whitespace-nowrap justify-center'
            >
              <span className='text-caption'>{line2.text}</span>
              <motion.div variants={pillEntranceVariants}>
                <motion.div
                  {...wobbleB}
                  className='relative h-10 sm:h-16 aspect-square rounded-full overflow-hidden shrink-0'
                >
                  <Image
                    src={imageSrcs[1]}
                    alt='Project preview'
                    fill
                    sizes='(max-width: 640px) 40px, 64px'
                    className='object-cover'
                  />
                </motion.div>
              </motion.div>
              <span className='text-caption opacity-40'>{line2.highlight}</span>
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

export default SplitHero