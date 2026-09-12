'use client'

import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/atoms/Container'
import Section from '@/components/atoms/Section'
import { Sparkles, ArrowUpRight } from 'lucide-react'
import MorphSlider from '@/components/Animation/Morph'
import { SERVICES_DATA, ServiceItem as ServiceItemType } from '@/components/sections/services/Service'

type ServicesTeaserProps = {
  eyebrow?: string
  heading?: string
  services?: ServiceItemType[]
  defaultActiveId?: string
  fullServicesHref?: string
}

const ServicesTeaser = (props: ServicesTeaserProps) => {
  const eyebrow = props.eyebrow || '(What We Build)'
  const heading = props.heading || 'WHAT WE BUILD.'
  const services = props.services || SERVICES_DATA
  const fullServicesHref = props.fullServicesHref || '/services'

  const activeInitialId = props.defaultActiveId || services[0]?.id || 'brand-identity'
  const [activeTab, setActiveTab] = useState(activeInitialId)

  const activeIndex = services.findIndex((s) => s.id === activeTab)
  const activeService = services[activeIndex] || services[0]
  const marqueeList = services.map((s) => s.label)
  
  const marqueeItems = [...marqueeList, ...marqueeList, ...marqueeList, ...marqueeList]

  // Stable reference — without this, MorphSlider's engine gets torn down
  // and rebuilt (back to slide 0) on every hover, since .map() otherwise
  // creates a new array every render.
  const morphItems = useMemo(
    () => services.map((s) => ({ image: s.image, caption: s.title })),
    [services]
  )

  return (
    <Section className='relative w-full bg-surface-page text-heading py-16 px-6 md:px-12 overflow-hidden flex flex-col justify-between transition-colors duration-300'>

      {/* Header + CTA Button — unchanged */}
      <Container className='w-full z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6'>
        <div>
          <span className='text-xs md:text-small tracking-wider text-caption block mb-2 font-mono'>
            {eyebrow}
          </span>
          <h2 className='text-h2 md:text-h1 font-extrabold tracking-tight text-heading font-primary'>
            {heading}
          </h2>
        </div>

        <Link
          href={fullServicesHref}
          className='group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-white font-medium text-small overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5'
        >
          <span className='relative z-10 font-semibold tracking-wide'>Explore All Services</span>
          <motion.div
            animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className='relative z-10 flex items-center justify-center'
          >
            <ArrowUpRight className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
          </motion.div>
        </Link>
      </Container>

      {/* Navigation Tabs — unchanged, still onClick + onMouseEnter */}
      <Container className='w-full border-t border-border-subtle/30 pt-6 my-6 grid grid-cols-2 md:grid-cols-4 items-center gap-4 z-10'>
        {services.map((service) => {
          const isActive = service.id === activeTab
          return (
            <div key={service.id} className='flex items-center justify-center'>
              <button
                onMouseEnter={() => setActiveTab(service.id)}
                onClick={() => setActiveTab(service.id)}
                className={`flex items-center gap-2 text-small md:text-body transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-primary font-semibold' : 'text-caption hover:opacity-80'
                }`}
              >
                {isActive && <span className='w-2 h-2 rounded-full bg-primary shrink-0' />}
                <span>{service.label}</span>
              </button>
            </div>
          )
        })}
      </Container>

      {/* Visual Preview — marquee unchanged; image block is now MorphSlider */}
      <div className='relative w-full flex items-center justify-center min-h-105 my-4'>
        <div className='absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0'>
          <motion.div
            animate={{ x: ['0%', '-35%'] }}
            transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
            className='whitespace-nowrap flex items-center gap-8 md:gap-12 select-none'
          >
            {marqueeItems.map((title, index) => (
              <div key={index} className='flex items-center gap-8 md:gap-12'>
                <Sparkles className='w-6 h-6 sm:w-10 sm:h-10 shrink-0 text-primary' />
                <span className='text-[4.5rem] sm:text-[7.5rem] lg:text-[9rem] font-bold text-heading/70 leading-none tracking-tight font-primary'>
                  {title}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <Link
          href={fullServicesHref}
          className='z-10 relative w-75 sm:w-110 h-80 sm:h-100 rounded-3xl overflow-hidden shadow-2xl border border-border-subtle group cursor-pointer block'
        >
          <MorphSlider
            items={morphItems}
            activeIndex={activeIndex}
            onIndexChange={(i:number) => setActiveTab(services[i]?.id)}
            autoplay
            autoplayDelay={4}
            transition='melt'
            radius={24}
            showCaptions={false}
            showControls={false}
            showIndicators={false}
            className='w-full h-full'
          />

          <div className='absolute inset-0 bg-linear-to-t from-dark-500/80 via-transparent to-transparent flex items-end p-6 pointer-events-none z-20'>
            <div className='flex items-center justify-between w-full text-white'>
              <span className='font-bold text-body'>{activeService.title}</span>
              <span className='text-size-caption font-secondary tracking-wider flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white font-medium shadow-sm whitespace-nowrap shrink-0'>
                View Details <ArrowUpRight className='w-3.5 h-3.5' />
              </span>
            </div>
          </div>
        </Link>
      </div>

    </Section>
  )
}

export default ServicesTeaser