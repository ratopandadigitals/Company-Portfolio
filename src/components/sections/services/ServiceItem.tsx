
'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/atoms/Container'
import Section from '@/components/atoms/Section'
import { Sparkles, ArrowUpRight } from 'lucide-react'
import MorphSlider from '@/components/Animation/Morph'
import type { ServiceItem as ServiceItemType } from '@/components/sections/services/Service'

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
  const fullServicesHref = props.fullServicesHref || '/services'

  const [fetchedServices, setFetchedServices] = useState<ServiceItemType[]>([])
  const [selectedTabId, setSelectedTabId] = useState(props.defaultActiveId || '')

  // Use provided services when available; otherwise fetch from the API.
  const services = props.services ?? fetchedServices
  const activeTab = services.some((service) => service.id === selectedTabId)
    ? selectedTabId
    : services.find((service) => service.id === props.defaultActiveId)?.id ?? services[0]?.id ?? ''

  const activeIndex = services.findIndex((service) => service.id === activeTab)
  const activeService = activeIndex >= 0 ? services[activeIndex] : undefined
  const marqueeList = services.map((service) => service.label)

  const marqueeItems = [
    ...marqueeList,
    ...marqueeList,
    ...marqueeList,
    ...marqueeList,
  ]

  // Respect the user's reduced-motion setting.
  const reduceMotion = useReducedMotion()

  // Refs allow the active pill to scroll within its own strip.
  const tabsScrollerRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    if (props.services !== undefined) return

    let isActive = true

    const loadServices = async () => {
      try {
        const response = await fetch('/api/services', {
          cache: 'no-store',
        })

        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Unable to load services.')
        }

        if (isActive) {
          setFetchedServices(
            Array.isArray(result.data)
              ? (result.data as ServiceItemType[])
              : [],
          )
        }
      } catch (error) {
        if (isActive) {
          console.error('Failed to load public services:', error)
        }
      }
    }

    void loadServices()

    return () => {
      isActive = false
    }
  }, [props.services])

  useEffect(() => {
    const scroller = tabsScrollerRef.current
    const tab = tabRefs.current[activeTab]

    if (!scroller || !tab) return

    // Scroll only the tab strip, not the entire page.
    scroller.scrollTo({
      left: tab.offsetLeft - (scroller.clientWidth - tab.clientWidth) / 2,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [activeTab, reduceMotion])

  const morphItems = useMemo(
    () =>
      services.map((service) => ({
        image: service.image,
        caption: service.title,
      })),
    [services],
  )

  return (
    <Section className='relative w-full bg-surface-page text-heading overflow-hidden flex flex-col justify-between transition-colors duration-300'>
      {/* Heading and services link */}
      <Container className='w-full z-10 flex flex-row flex-wrap items-end sm:items-center justify-between gap-x-4 gap-y-4'>
        <div>
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
          className='group relative inline-flex ml-auto items-center justify-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 min-h-11 rounded-full bg-primary text-white font-medium text-small overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5'
        >
          <span className='relative z-10 font-semibold text-size-caption tracking-wide whitespace-nowrap'>
            <span className='sm:hidden'>All Services</span>
            <span className='hidden sm:inline'>Explore All Services</span>
          </span>

          <motion.div
            animate={
              reduceMotion ? undefined : { x: [0, 3, 0], y: [0, -3, 0] }
            }
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
            }}
            className='relative z-10 flex items-center justify-center'
          >
            <ArrowUpRight className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
          </motion.div>
        </Link>
      </Container>

      {/* Mobile: one scrollable row. Larger screens: wrapped tabs. */}
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
                ref={(element) => {
                  tabRefs.current[service.id] = element
                }}
                onPointerEnter={(event) => {
                  if (event.pointerType === 'mouse') {
                    setSelectedTabId(service.id)
                  }
                }}
                onClick={() => setSelectedTabId(service.id)}
                aria-pressed={isActive}
                className={`flex items-center gap-2 px-4 min-h-11 rounded-full whitespace-nowrap shrink-0 snap-center text-size-caption font-semibold transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'border border-border-subtle/80 text-caption hover:bg-surface-section/90'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isActive ? 'bg-success' : 'bg-transparent'
                  }`}
                />

                <span>{service.label}</span>
              </button>
            )
          })}
        </div>
      </Container>

      {/* Animated service showcase */}
      <div className='relative w-full flex items-center justify-center min-h-105 my-4'>
        <div className='absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0'>
          <motion.div
            animate={reduceMotion ? undefined : { x: ['0%', '-35%'] }}
            transition={{
              duration: 60,
              ease: 'linear',
              repeat: Infinity,
            }}
            className='whitespace-nowrap flex items-center gap-8 md:gap-12 select-none'
          >
            {marqueeItems.map((title, index) => (
              <div
                key={`${title}-${index}`}
                className='flex items-center gap-8 md:gap-12'
              >
                <Sparkles className='w-6 h-6 sm:w-10 sm:h-10 shrink-0 text-primary' />

                <span className='text-[3.5rem] sm:text-[6.5rem] lg:text-[7rem] font-bold text-heading/15 sm:text-heading/70 leading-none tracking-tight font-primary'>
                  {title}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <Link
          href={fullServicesHref}
          aria-label={
            activeService
              ? `View ${activeService.title} services`
              : 'Explore services'
          }
          className='z-10 relative w-85 sm:w-120 h-70 sm:h-90 rounded-3xl overflow-hidden shadow-2xl border border-border-subtle group cursor-pointer block'
        >
          {services.length > 0 && (
            <>
              <MorphSlider
                items={morphItems}
                activeIndex={Math.max(activeIndex, 0)}
                onIndexChange={(index: number) => {
                  const service = services[index]

                  if (service) {
                    setSelectedTabId(service.id)
                  }
                }}
                autoplay={!reduceMotion && services.length > 1}
                autoplayDelay={4}
                transition='melt'
                radius={24}
                showCaptions={false}
                showControls={false}
                showIndicators={false}
                className='w-full h-full'
              />

              <div className='absolute inset-0 bg-linear-to-t from-dark-500/80 via-transparent to-transparent flex items-end p-6 pointer-events-none z-20'>
                <div className='flex items-center justify-between gap-3 w-full text-white'>
                  <span className='min-w-0 line-clamp-2 font-bold text-white text-size-body'>
                    {activeService?.title ?? ''}
                  </span>

                  <span className='text-size-caption font-secondary tracking-wider flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white font-medium shadow-sm whitespace-nowrap shrink-0'>
                    <span className='hidden sm:inline'>View Details</span>
                    <ArrowUpRight className='w-3.5 h-3.5' />
                  </span>
                </div>
              </div>
            </>
          )}
        </Link>
      </div>
    </Section>
  )
}

export default ServicesTeaser
