'use client'

import React from 'react'
import { motion } from 'framer-motion'

type Logo = { name: string; src: string }
type TrustedLogosProps = { logos?: Logo[]; speed?: number }

const defaultLogos: Logo[] = [
  { name: 'Sum', src: '/logos/sum.svg' },
  { name: 'Logoipsum 1', src: '/logos/logoipsum-1.svg' },
  { name: 'Logoipsum 2', src: '/logos/logoipsum-2.svg' },
  { name: 'Logoipsum 3', src: '/logos/logoipsum-3.svg' },
  { name: 'Logoipsum 4', src: '/logos/logoipsum-4.svg' },
  { name: 'Logoipsum 5', src: '/logos/logoipsum-5.svg' },
]

const TrustedLogos = (props: TrustedLogosProps) => {

  const logos = props.logos || defaultLogos
  const speed = props.speed || 25
  const marqueeLogos = [...logos, ...logos]

  return (
    <section className='w-full py-10 sm:py-14 bg-surface-page overflow-hidden'>
      <div className='relative w-full overflow-hidden flex items-center'>

        {/* Side vignette fades */}
        <div className='absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-linear-to-r from-surface-page to-transparent z-10 pointer-events-none' />
        <div className='absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-linear-to-l from-surface-page to-transparent z-10 pointer-events-none' />

        {/* 1 row track — moves right (left to right), confirmed direction */}
        <div className='flex w-full overflow-hidden select-none'>
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
            className='flex flex-nowrap w-max shrink-0 items-center gap-12 sm:gap-20 pr-12 sm:pr-20'
          >
            {marqueeLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className='shrink-0 flex items-center justify-center grayscale opacity-70 hover:opacity-100 dark:invert transition-all duration-300'
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className='h-6 sm:h-7 w-auto object-contain max-w-35'
                />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default TrustedLogos