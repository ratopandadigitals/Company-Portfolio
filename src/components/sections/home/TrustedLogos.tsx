'use client'

import React from 'react'
import Section from '@/components/atoms/Section';
import Image from 'next/image'

type Logo = { name: string; src: string }

type TrustedLogosProps = {
  logos?: Logo[]
  speed?: number                    // seconds for one full loop (lower = faster)
  direction?: 'left' | 'right'      // which way the marquee scrolls
  logoHeight?: string               // e.g. 'h-6 sm:h-7' — controls logo image size
  card?: boolean                    // true = each logo sits in a bordered card
  repeat?: number                   // how many times to repeat the logo list (default 2)
}

const defaultLogos: Logo[] = [
  { name: 'Sum', src: '/icon.webp' },
  { name: 'Logoipsum 1', src: '/Light.webp' },
  { name: 'Logoipsum 2', src: '/Light.webp' },
  { name: 'Logoipsum 3', src: '/Light.webp' },
  { name: 'Logoipsum 4', src: '/Light.webp' },
  { name: 'Logoipsum 5', src: '/Light.webp' },
]

const TrustedLogos = (props: TrustedLogosProps) => {

  const logos = props.logos || defaultLogos
  const speed = props.speed || 20
  const direction = props.direction || 'left'
  const logoHeight = props.logoHeight || 'h-12 sm:h-14'
  const card = props.card ?? false

  // Minimum of 2 — the seamless-loop trick requires at least two identical
  // copies. Raise this if you have very few logos and want a fuller-looking
  // marquee on wide screens (e.g. repeat={4}).
  const repeatCount = Math.max(2, props.repeat ?? 4)

    const marqueeLogos = Array.from({ length: repeatCount }, () => logos).flat()

  const marqueeStyle = {
    animationDuration: `${speed}s`,
    ['--marquee-repeat' as string]: repeatCount,
  } as React.CSSProperties

  return (
    <Section className='w-full py-10 sm:py-14 bg-surface-page overflow-hidden'>
      <div className='relative w-full overflow-hidden flex items-center'>

        {/* Side vignette fades */}
        <div className='absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-linear-to-r from-surface-page to-transparent z-10 pointer-events-none' />
        <div className='absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-linear-to-l from-surface-page to-transparent z-10 pointer-events-none' />

        {/*
          Continuous CSS-driven loop (no JS restart hitch). The shift amount
          (calc(-100% / var(--marquee-repeat))) always equals exactly "one
          copy's width," so it stays seamless regardless of how many times
          the logo list is repeated.
        */}
        <div className='flex w-full overflow-hidden select-none'>
          <div
            className={`marquee-track ${direction === 'left' ? 'marquee-left' : 'marquee-right'} flex flex-nowrap w-max shrink-0 items-center gap-6 sm:gap-10`}
            style={marqueeStyle}
          >
            {marqueeLogos.map((logo, index) =>
              card ? (
                // CARD MODE — each logo in its own bordered, padded box
                <div
                  key={`${logo.name}-${index}`}
                  className='relative shrink-0 flex items-center justify-center w-28 h-16 sm:w-36 sm:h-20 rounded-xl border border-border-subtle/40 bg-surface-default grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300'
                >
                <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                fill
                sizes='(max-width: 640px) 112px, 144px'
                className={`${logoHeight} w-auto object-contain max-w-24`}
              />
                </div>
              ) : (
                // PLAIN MODE — no card, just the logo (original style)
                <div
                  key={`${logo.name}-${index}`}
                 className={`relative shrink-0 flex items-center justify-center w-24 ${logoHeight} grayscale opacity-70 hover:opacity-100 dark:invert transition-all duration-300`}>
                    <Image
                    src={logo.src}
                    alt={`${logo.name} logo`}
                     fill
                    sizes='96px'
                    className='object-contain'
                  
                  />
                </div>
              )
            )}
          </div>
        </div>

      </div>

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
          from { transform: translateX(0%); }
          to   { transform: translateX(calc(-100% / var(--marquee-repeat))); }
        }
        @keyframes marquee-scroll-right {
          from { transform: translateX(calc(-100% / var(--marquee-repeat))); }
          to   { transform: translateX(0%); }
        }
      `}</style>
    </Section>
  )
}

export default TrustedLogos