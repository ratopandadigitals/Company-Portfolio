'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/atoms/Container'
import Section from '@/components/atoms/Section'
import { Sparkles, ArrowUpRight } from 'lucide-react'
import { SERVICES_DATA, ServiceItem as ServiceItemType } from './Service'

type ServiceItemProps = {
  eyebrow?: string
  heading?: string
  services?: ServiceItemType[]
  defaultActiveId?: string
  fullServicesHref?: string
}

export default function ServiceItem({
  eyebrow = '(What We Build)',
  heading = 'WHAT WE BUILD.',
  services = SERVICES_DATA,
  defaultActiveId,
  fullServicesHref = '/services',
}: ServiceItemProps) {
  const activeInitialId = defaultActiveId || services[0]?.id || 'brand-identity'
  const [activeTab, setActiveTab] = useState(activeInitialId)

  const activeService = services.find((s) => s.id === activeTab) || services[0]
  const marqueeList = services.map((s) => s.label)
  const marqueeItems = [...marqueeList, ...marqueeList, ...marqueeList, ...marqueeList]

  return (
    <Section className='relative w-full bg-surface-page text-heading py-16 px-6 md:px-12 overflow-hidden flex flex-col justify-between transition-colors duration-300'>

      {/* Header + CTA Button */}
      <Container className='w-full z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6'>
        <div>
          <span className='text-xs md:text-sm tracking-wider text-caption block mb-2 font-mono'>
            {eyebrow}
          </span>
          <h2 className='text-4xl md:text-6xl font-extrabold tracking-tight text-heading font-primary'>
            {heading}
          </h2>
        </div>

        <Link 
          href={fullServicesHref}
          className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5"
        >
          <span className="relative z-10 font-semibold tracking-wide">
            Explore All Services
          </span>
          <motion.div
            animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="relative z-10 flex items-center justify-center"
          >
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.div>
        </Link>
      </Container>

      {/* Navigation Tabs */}
      <Container className='w-full border-t border-border-subtle/30 pt-6 my-6 grid grid-cols-2 md:grid-cols-4 items-center gap-4 z-10'>
        {services.map((service) => {
          const isActive = service.id === activeTab
          return (
            <div key={service.id} className="flex items-center justify-center">
              <button
                onClick={() => setActiveTab(service.id)}
                className={`flex items-center gap-2 text-sm md:text-base transition-colors duration-200 cursor-pointer ${
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

      {/* Visual Preview */}
      <div className='relative w-full flex items-center justify-center min-h-[440px] sm:min-h-[520px] my-6'>
        <div className='absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0'>
          <motion.div
            animate={{ x: ['0%', '-25%'] }}
            transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
            className='whitespace-nowrap flex items-center gap-8 md:gap-12 select-none'
          >
            {marqueeItems.map((title, index) => (
              <div key={index} className='flex items-center gap-8 md:gap-12'>
                <Sparkles className="w-6 h-6 sm:w-10 sm:h-10 shrink-0 text-primary" />
                <span className='text-[4.5rem] sm:text-[7.5rem] lg:text-[9rem] font-bold text-heading/70 leading-none tracking-tight font-primary'>
                  {title}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

      
      </div>

      {/* Service Details */}
      {/* <AnimatePresence mode="wait">
        <motion.div
          key={activeService.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className='max-w-xl mx-auto w-full text-center flex flex-col items-center gap-6 z-10'
        >
          <p className='text-caption text-sm md:text-base leading-relaxed max-w-md'>
            {activeService.description}
          </p>
          <div className='flex flex-wrap items-center justify-center gap-3'>
            {activeService.tags.map((tag, index) => (
              <span
                key={index}
                className='px-4 py-1.5 text-xs md:text-sm text-heading bg-surface-default border border-border-subtle rounded-full backdrop-blur-sm shadow-sm'
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence> */}
    </Section>
  )
}