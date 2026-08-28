'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'

type HeroSectionProps = {
  eyebrow?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  avatarSrcs?: string[]
  workImageSrcs?: string[]
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

// Avatars pop in one after another on the left
const avatarVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4, x: -10 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      delay: index * 0.12,
      type: 'spring',
      stiffness: 260,
      damping: 18,
    },
  }),
}

// Eyebrow text slides in smoothly right after avatars
const eyebrowTextVariants: Variants = {
  hidden: { opacity: 0, x: 8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.3, duration: 0.4, ease: 'easeOut' },
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

const HeroSection = (props: HeroSectionProps) => {
  const eyebrow = props.eyebrow || 'Creative Technology · Est. 2026'
  const description =
    props.description ||
    'From strategy and UI/UX to development, we create purposeful digital experiences built around your brand and your users.'
  const ctaLabel = props.ctaLabel || 'Start a Project'
  const ctaHref = props.ctaHref || '/contact'

  // Cap team images to max 2 avatars matching the video design
  const avatarSrcs = (props.avatarSrcs || ['/Team1.jpeg', '/Team2.jpeg']).slice(0, 2)

  const workImageSrcs = props.workImageSrcs || [
    'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=200&q=80',
  ]

  return (
    <section className='bg-surface-page'>
      <Container className='py-stack-container'>
        <motion.div
          className='flex flex-col items-center gap-4 text-center'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {/* Top Badge: 2 Avatars (Left) + Text (Right) */}
          <motion.div
            variants={itemVariants}
            className='inline-flex items-center gap-4 px-3.5 py-1.5 rounded-full border border-border-subtle'
          >
            <div className='flex -space-x-1'>
              {avatarSrcs.map((src, index) => (
                <motion.img
                  key={src}
                  custom={index}
                  variants={avatarVariants}
                  src={src}
                  alt='Team member'
                  className='h-6 w-6 rounded-full ring-2 ring-surface-page object-cover'
                />
              ))}
            </div>

            <motion.span
              variants={eyebrowTextVariants}
              className='text-xs sm:text-small font-secondary tracking-wide text-caption uppercase'
            >
              {eyebrow}
            </motion.span>
          </motion.div>

          {/* Main Hero Header */}
          <div className='flex flex-col items-center font-primary font-semibold text-5xl sm:text-6xl md:text-display leading-tight'>
            {/* Row 1: WE DESIGN */}
            <motion.div variants={itemVariants} className='flex items-center gap-2 sm:gap-3'>
              <span className='text-heading'>WE DESIGN</span>
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
                  className='h-10 sm:h-16 aspect-81/64 rounded-full bg-primary overflow-hidden shrink-0'

                >
                  <img src={workImageSrcs[0]} alt='Project preview' className='w-full h-full object-cover' />
                </motion.div>
              </motion.div>
              <span className='text-primary'>/</span>
            </motion.div>

            {/* Row 2: CRAFT */}
            <motion.div variants={itemVariants} className='flex items-center gap-2 sm:gap-3 mt-0 sm:mt-1'>
              <span className='text-caption'>CRAFT</span>
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
                  className='h-10 sm:h-16 aspect-81/64 rounded-full overflow-hidden shrink-0'
                >
                  <img src={workImageSrcs[1]} alt='Project preview' className='w-full h-full object-cover' />
                </motion.div>
              </motion.div>
              <span className='text-heading'>/</span>
            </motion.div>

            {/* Row 3: BUILD */}
            <motion.div variants={itemVariants} className='flex items-center gap-2 sm:gap-3 mt-0 sm:mt-1'>
              <span className='text-caption'>BUILD</span>
              <motion.div variants={pillEntranceVariants}>
                <motion.div
                  animate={{
                    y: [0, -12, 3, 0],
                    x: [0, 4, -4, 0],
                    rotate: [0, -2, 3, 0],
                  }}
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                    delay: 0.6,
                  }}
                  className='h-10 sm:h-16 aspect-81/64 rounded-full overflow-hidden shrink-0'
                >
                  <img src={workImageSrcs[2]} alt='Project preview' className='w-full h-full object-cover' />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Paragraph */}
          <motion.p
            variants={itemVariants}
            className='max-w-xl text-sm sm:text-body text-caption font-secondary leading-relaxed'
          >
            {description}
          </motion.p>

          {/* Button (Shows hover arrow icon since icon prop is omitted) */}
          <motion.div variants={itemVariants}>
            <Button href={ctaHref} variant='outline'>
              {ctaLabel}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

export default HeroSection