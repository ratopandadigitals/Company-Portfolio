'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Section from '@/components/atoms/Section'

type FlowerIconProps = {
  colorClassName?: string
}

const FlowerIcon = (props: FlowerIconProps) => {

  const colorClassName = props.colorClassName || 'text=heading'

  return (
    <svg
      className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 opacity-90 ${colorClassName}`}
      viewBox='0 0 18 18'
      fill='currentColor'
    >
      <path d='M9 0C9 4.97056 4.97056 9 0 9C4.97056 9 9 13.0294 9 18C9 13.0294 13.0294 9 18 9C13.0294 4.97056 9 0 9 0Z' />
    </svg>
  )
}

const BLACK_TRACK_DEFAULT = [
  'Senior Designer',
  '10 Years of Experience',
  'Over 100 Customers',
]

const ORANGE_TRACK_DEFAULT = [
  'Brand Design',
  'Logo Design',
  'Website Design',
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