'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Section from '@/components/atoms/Section'
import { Sparkle } from 'lucide-react'

type FlowerIconProps = {
  colorClassName?: string
}

const FlowerIcon = (props: FlowerIconProps) => {

  const colorClassName = props.colorClassName || 'text-heading'

 return (
  <Sparkle
    className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 opacity-90 ${colorClassName}`}
    fill='currentColor'
  />
)
}

const BLACK_TRACK_DEFAULT = [
  'Creative Technology Company',
  'Based in Biratnagar, Nepal',
  'Available for New Projects',
]

const ORANGE_TRACK_DEFAULT = [
  'Brand & Design System',
  'UX Research & Product Planning',
  'UI Design & Prototyping',
  'Engineering & Development',
  'Digital Growth',
]

type DiagonalBannerProps = {
  blackTrackItems?: string[]
  orangeTrackItems?: string[]
}

const DiagonalBanner = (props: DiagonalBannerProps) => {

  const blackTrackItems = props.blackTrackItems || BLACK_TRACK_DEFAULT
  const orangeTrackItems = props.orangeTrackItems || ORANGE_TRACK_DEFAULT

  // Duplicate arrays for continuous infinite looping
  const track1 = [...blackTrackItems, ...blackTrackItems]
  const track2 = [...orangeTrackItems, ...orangeTrackItems]

  return (
    <Section className='relative w-full h-90 sm:h-105 bg-surface-page overflow-hidden flex items-center justify-center select-none'>

      {/* Black banner — switches with theme (bg-heading), tilted down-left to up-right */}
      <div className='absolute w-[140%] -rotate-6 z-10 pointer-events-none'>
        <div className='bg-heading text-surface-page py-4 sm:py-5 flex overflow-hidden shadow-xl'>
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
            className='flex flex-nowrap shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12'
          >
            {[...track1, ...track1].map((item, index) => (
              <div key={`black-${index}`} className='flex items-center gap-8 sm:gap-12 shrink-0'>
                <span className='text-xl sm:text-3xl font-bold tracking-tight whitespace-nowrap font-primary'>
                  {item}
                </span>
                <FlowerIcon colorClassName='text-surface-page' />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Orange banner — fixed crimson always, matches your brand's action color */}
      <div className='absolute w-[140%] rotate-3 sm:rotate-4 z-20 pointer-events-none'>
        <div className='bg-warning text-surface-page py-4 sm:py-5 flex overflow-hidden shadow-2xl'>
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
            className='flex flex-nowrap shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12'
          >
            { [...track2, ...track2, ...track2].map((item, index) => (
              <div key={`orange-${index}`} className='flex items-center gap-8 sm:gap-12 shrink-0'>
                <span className='text-xl sm:text-3xl font-bold tracking-tight whitespace-nowrap font-primary'>
                  {item}
                </span>
                <FlowerIcon colorClassName='text-surface-page' />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </Section>
  )
}

export default DiagonalBanner