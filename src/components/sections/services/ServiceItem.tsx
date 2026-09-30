'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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
  const eyebrow = props.eyebrow || '(Services)'
  const heading = props.heading || 'WHAT WE BUILD.'
  const services = props.services || SERVICES_DATA
  const fullServicesHref = props.fullServicesHref || '/services'

  const activeInitialId = props.defaultActiveId || services[0]?.id || 'brand-identity'
  const [activeTab, setActiveTab] = useState(activeInitialId)

  const activeIndex = services.findIndex((s) => s.id === activeTab)
  const activeService = services[activeIndex] || services[0]
  const marqueeList = services.map((s) => s.label)

  const marqueeItems = [...marqueeList, ...marqueeList, ...marqueeList, ...marqueeList]

  // CHANGE A: respect the user's "reduce motion" setting
  const reduceMotion = useReducedMotion()

  // CHANGE B: refs so the active pill can be scrolled into view inside its own strip
  const tabsScrollerRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    const scroller = tabsScrollerRef.current
    const tab = tabRefs.current[activeTab]
    if (!scroller || !tab) return
    // Scroll only the strip. scrollIntoView could also scroll the whole page
    // when autoplay changes the tab while the user is reading elsewhere.
    scroller.scrollTo({
      left: tab.offsetLeft - (scroller.clientWidth - tab.clientWidth) / 2,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [activeTab, reduceMotion])

  const morphItems = useMemo(
    () => services.map((s) => ({ image: s.image, caption: s.title })),
    [services]
  )

  return (
    <Section className='relative w-full bg-surface-page text-heading  overflow-hidden flex flex-col justify-between transition-colors duration-300'>

            {/* CHANGE C: items-start on mobile so heading, button and tabs share one left edge */}
      <Container className='w-full z-10 flex flex-row flex-wrap items-end sm:items-center justify-between gap-x-4 gap-y-4'>
                <div className=''>
          <span className='text-xs md:text-small tracking-tight text-caption block mb-2 font-mono'>
            {eyebrow}
          </span>
          <h2 className='text-size-h2 md:text-size-h1 font-extrabold tracking-wider text-caption font-primary'>
            {heading}
          </h2>
        </div>

          <Link
        href={fullServicesHref}
        aria-label='Explore all services'
        className='group relative inline-flex ml-auto items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 min-h-11 rounded-full bg-primary text-white font-medium text-small overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5'
      >      
  <span className='relative z-10 font-semibold text-size-caption tracking-wide whitespace-nowrap'>
    <span className='sm:hidden'>All Services</span>
    <span className='hidden sm:inline'>Explore All Services</span>
  </span>
          <motion.div
            animate={reduceMotion ? undefined : { x: [0, 3, 0], y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className='relative z-10 flex items-center justify-center'
          >
            <ArrowUpRight className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
          </motion.div>
        </Link>
      </Container>

      {/* CHANGE D: mobile = one scrollable row; sm and up = your original wrapped layout */}
      <Container className='w-full z-10 pt-6 mt-6'>
        <div
          ref={tabsScrollerRef}
          className='relative flex gap-2 -mx-4 px-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-between sm:gap-6 sm:overflow-visible sm:snap-none'
        >
          {services.map((service) => {
            const isActive = service.id === activeTab
            return (
              <button
                key={service.id}
                ref={(el) => {
                  tabRefs.current[service.id] = el
                }}
                // CHANGE E: hover only for a real mouse; touch uses onClick
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') setActiveTab(service.id)
                }}
                onClick={() => setActiveTab(service.id)}
                aria-pressed={isActive}
                // CHANGE F: min-h-11 (44px touch target), font-semibold replaces the invalid text-bold
                className={`flex items-center gap-2 px-4 min-h-11 rounded-full whitespace-nowrap shrink-0 snap-center text-size-caption font-semibold transition-colors duration-200 cursor-pointer ${
                  isActive ? 'bg-primary text-white' : ' border border-border-subtle/80 text-caption hover:bg-surface-section/90'
                }`}
              >
                {/* CHANGE G: dot space is always reserved, so the pill width never changes */}
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-success' : 'bg-transparent'}`}
                />
                <span>{service.label}</span>
              </button>
            )
          })}
        </div>
      </Container>

      <div className='relative w-full flex items-center justify-center min-h-105 my-4'>
        <div className='absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0'>
          <motion.div
            animate={reduceMotion ? undefined : { x: ['0%', '-35%'] }}
            transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
            className='whitespace-nowrap flex items-center gap-8 md:gap-12 select-none'
          >
            {marqueeItems.map((title, index) => (
              <div key={index} className='flex items-center gap-8 md:gap-12'>
                <Sparkles className='w-6 h-6 sm:w-10 sm:h-10 shrink-0 text-primary' />
                {/* CHANGE H: much fainter on mobile so it doesn't compete with the card */}
                <span className='text-[3.5rem] sm:text-[6.5rem] lg:text-[7rem] font-bold text-heading/15 sm:text-heading/70 leading-none tracking-tight font-primary'>
                  {title}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <Link
          href={fullServicesHref}
          className='z-10 relative w-85 sm:w-120 h-70 sm:h-90 rounded-3xl overflow-hidden shadow-2xl border border-border-subtle group cursor-pointer block'
        >
          <MorphSlider
            items={morphItems}
            activeIndex={activeIndex}
            onIndexChange={(i: number) => setActiveTab(services[i]?.id)}
            autoplay={!reduceMotion}
            autoplayDelay={4}
            transition='melt'
            radius={24}
            showCaptions={false}
            showControls={false}
            showIndicators={false}
            className='w-full h-full'
          />

          <div className='absolute inset-0 bg-linear-to-t from-dark-500/80 via-transparent to-transparent flex items-end p-6 pointer-events-none z-20'>
            {/* CHANGE I: gap-3 plus min-w-0 and line-clamp-2 so long titles wrap instead of colliding */}
            <div className='flex items-center justify-between gap-3 w-full text-white'>
              <span className='min-w-0 line-clamp-2 font-bold text-white text-size-body'>{activeService.title}</span>
              <span className='text-size-caption font-secondary tracking-wider flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white font-medium shadow-sm whitespace-nowrap shrink-0'>
                <span className='hidden sm:inline'>View Details</span>
                <ArrowUpRight className='w-3.5 h-3.5' />
              </span>
            </div>
          </div>
        </Link>
      </div>

    </Section>
  )
}

export default ServicesTeaser