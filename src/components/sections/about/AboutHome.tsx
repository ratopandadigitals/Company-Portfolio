'use client'

import React from 'react'
import Container from '@/components/atoms/Container'
import Section  from '@/components/atoms/Section'
import Image from 'next/image'

type AboutSectionProps = {
  aboutSectionSrcs?: string[]
}

const ABOUT_DETAILS = [
  { label: 'THINK DEEPLY.', value: 'Philosophy' },
  { label: 'DESIGN PURPOSEFULLY.', value: 'Approach' },
  { label: 'BUILD PRECISELY.', value: 'Promise' },
  { label: 'Creative Technology', value: 'Est. 2026' },
]
  
const AboutSection = (props: AboutSectionProps) => {
const aboutSectionSrcs = props.aboutSectionSrcs || [
'/about/abouthome.webp'  ]
  return (
    <Section className='w-full mt-8 bg-surface-page'>
      {/* Container handles the 80px margin naturally — no py-16 needed */}
      <Container className='w-full flex flex-col gap-6'>
        
        {/* Eyebrow Header */}
        <div id='about' className='flex flex-col items-center w-full text-center scroll-mt-28'>          <span className='text-caption text-size-cta md:text-size-h2 font-secondary tracking-wider'>
            (About RatoPandaDigitals)
          </span>
        </div>

        {/* Hero Image Card */}
        <div className='relative w-full aspect-16/7 min-h-85 sm:min-h-120 rounded-3xl overflow-hidden border border-border-subtle/20'>
          <Image
            src={aboutSectionSrcs[0]}
            alt="About Rato Panda Digitals"
            className='w-full h-full object-cover'
            fill
          />
          
          {/* Carousel Dots */}
          <div className='absolute bottom-6 left-6 flex items-center gap-2 z-10'>
            <span className='w-3 h-3 rounded-full text-heading shadow-sm' />
            <span className='w-3 h-3 rounded-full text-heading/40 backdrop-blur-sm' />
            <span className='w-3 h-3 rounded-full text-heading/40 backdrop-blur-sm' />
          </div>

          {/* Badge */}
          <div className='absolute bottom-6 right-6 z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white p-2'>
            <div className='relative w-full h-full flex items-center justify-center'>
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                <text className="text-[8.5px] uppercase font-mono tracking-widest text-caption4">
                  <textPath href="#circlePath">
                    • SINCE 2020 • AWARD WINNING DESIGNER
                  </textPath>
                </text>
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold font-mono tracking-tighter">RP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className='flex flex-col gap-4 mt-4 max-w-4xl'>
          <h2 className='text-4xl sm:text-6xl font-primary font-bold text-heading tracking-tight'>
            Rato Panda Digitals
          </h2>
          <p className='text-base sm:text-lg font-secondary text-body leading-relaxed opacity-90'>
            Rato Panda Digitals is a creative digital and IT solutions company established in 2026. We combine strategy, design and technology to create brands, websites, digital products and technology solutions. Technology should solve real problems. Design should have a reason behind it.
          </p>
        </div>

        {/* Values List */}
        <div className='flex flex-col w-full border-t border-border-subtle/30 mt-6 pt-2'>
          {ABOUT_DETAILS.map((item, idx) => (
            <div 
              key={idx} 
              className='flex items-center justify-between py-4 border-b border-border-subtle/20'
            >
              <span className='text-xs sm:text-sm font-mono tracking-widest text-caption uppercase'>
                {item.label}
              </span>
              <span className='text-xs sm:text-sm font-secondary font-medium text-body'>
                {item.value}
              </span>
            </div>
          ))}
        </div>

      </Container>
    </Section>
  )
}

export default AboutSection