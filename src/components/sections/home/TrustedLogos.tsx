
'use client'

import React from 'react'
import Image from 'next/image'
import Section from '@/components/atoms/Section'

// Types
type Logo = {
  name: string
  src: string
}

type TrustedLogosProps = {
  logos?: Logo[]
  speed?: number
  eyebrow?: string
  heading?: string
  direction?: 'left' | 'right'
  logoHeight?: string
  card?: boolean
  repeat?: number
}

type LogoItemProps = {
  logo: Logo
  card: boolean
  logoHeight: string
}

// Default data
const DEFAULT_LOGOS: Logo[] = [
  
  { name: 'Logoipsum 1', src: '/Light.webp' },
  { name: 'Logoipsum 2', src: '/olilogo.webp' },

]

// Default settings
const DEFAULT_SPEED = 20
const DEFAULT_LOGO_HEIGHT = 'h-16 sm:h-20'
const DEFAULT_REPEAT = 2

// Reusable logo item
const LogoItem = ({
  logo,
  card,
  logoHeight,
}: LogoItemProps) => {
  const wrapperClasses = [
    'relative shrink-0 flex items-center justify-center',
    card
      ? 'w-28 h-16 sm:w-36 sm:h-20 rounded-xl border border-border-subtle/40 bg-transparent transition-opacity duration-300 hover:opacity-100'
      : `w-24 ${logoHeight}`,
  ].join(' ')

  return (
    <div className={wrapperClasses}>
      <Image
        src={logo.src}
        alt={`${logo.name} logo`}
        fill
        sizes={
          card
            ? '(max-width: 640px) 112px, 144px'
            : '96px'
        }
        className={`object-contain ${
          card ? 'max-w-24' : ''
        }`}
      />
    </div>
  )
}

// Main component
const TrustedLogos = ({
  logos = DEFAULT_LOGOS,
  speed = DEFAULT_SPEED,
  eyebrow = '(Trusted by)',
  heading = 'Brands we’ve worked with.',
  direction = 'left',
  logoHeight = DEFAULT_LOGO_HEIGHT,
  card = false,
  repeat = DEFAULT_REPEAT,
}: TrustedLogosProps) => {
  const safeSpeed = Math.max(1, speed)
  const repeatCount = Math.max(1, Math.floor(repeat))

  if (logos.length === 0) return null

  // Repeat logos inside each group
  const groupLogos = Array.from(
    { length: repeatCount },
    () => logos
  ).flat()

  const animationStyle: React.CSSProperties = {
    animationDuration: `${safeSpeed}s`,
  }

  // Reusable marquee group
  const renderLogoGroup = (
    groupKey: string,
    isDuplicate = false
  ) => (
    <div
      key={groupKey}
      aria-hidden={isDuplicate}
      className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
    >
      {groupLogos.map((logo, index) => (
        <LogoItem
          key={`${groupKey}-${logo.name}-${index}`}
          logo={logo}
          card={card}
          logoHeight={logoHeight}
        />
      ))}
    </div>
  )

  return (
    <Section className="w-full overflow-hidden bg-surface-page mt-10 py-10 sm:py-14">

      {/* Section heading */}
      <div className='flex flex-col items-center mt-4 py-8 sm:py-12 w-full gap-2'>
          <span className='text-caption text-size-cta font-secondary font-medium tracking-wide text-center'>
            {eyebrow}
          </span>
          <h2 className='w-full text-center text-5xl sm:text-6xl lg:text-[50px] font-primary font-bold tracking-tight text-heading/30 leading-none select-none'>
            {heading}
          </h2>
        </div>

      {/* Marquee */}
      <div className="relative flex w-full items-center overflow-hidden">

        {/* Edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-surface-page to-transparent sm:w-32"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-surface-page to-transparent sm:w-32"
        />

        {/* Animated track */}
        <div className="flex w-full overflow-hidden select-none">
          <div
            className={`marquee-track flex w-max shrink-0 flex-nowrap ${
              direction === 'left'
                ? 'marquee-left'
                : 'marquee-right'
            }`}
            style={animationStyle}
          >
            {renderLogoGroup('original')}

            {/* Duplicate group for seamless animation */}
            {renderLogoGroup('duplicate', true)}
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .marquee-track {
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .marquee-left {
          animation-name: marquee-scroll-left;
        }

        .marquee-right {
          animation-name: marquee-scroll-right;
        }

        @keyframes marquee-scroll-left {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-scroll-right {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation-play-state: paused;
          }
        }
      `}</style>
    </Section>
  )
}

export default TrustedLogos