'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/atoms/Container'
import { Sparkles } from 'lucide-react'

type ServiceItem = {
  id: string
  label: string
  title: string
  image: string
  description: string
  tags: string[]
}

type ServicesSectionProps = {
  eyebrow?: string
  heading?: string
  services?: ServiceItem[]
  defaultActiveId?: string
}

const SERVICES_DEFAULT: ServiceItem[] = [
  {
    id: 'web-design',
    label: 'Web Design',
    title: 'Web Design',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    description: 'We craft high-converting, modern web experiences tailored to scale your brand.',
    tags: ['UI/UX Design', 'Design Systems', 'Webflow / React'],
  },
  {
    id: 'brand-design',
    label: 'Brand Design',
    title: 'Brand Design',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop',
    description: 'We build bold, cohesive brand identities that leave a lasting impression.',
    tags: ['Visual Identity', 'Style Guides', 'Brand Strategy'],
  },
  {
    id: 'logo-design',
    label: 'Logo Design',
    title: 'Logo Design',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1000&auto=format&fit=crop',
    description: 'Iconic, memorable mark designs designed to stand out across all mediums.',
    tags: ['Iconography', 'Vector Assets', 'Brand Marks'],
  },
]

type FlowerIconProps = {
  colorClassName?: string
}

const FlowerIcon = (props: FlowerIconProps) => {

  const colorClassName = props.colorClassName || 'text-primary'

  return (
    
    <Sparkles className="w-6 h-6 sm:w-10 sm:h-10 shrink-0 text-primary" />
  )
}

const ServicesSection = (props: ServicesSectionProps) => {

  const eyebrow = props.eyebrow || '(What We Build)'
  const heading = props.heading || 'WHAT WE BUILD.'
  const services = props.services || SERVICES_DEFAULT
  const defaultActiveId = props.defaultActiveId || 'brand-design,Logo Design,Web Design'

  const [activeTab, setActiveTab] = useState(defaultActiveId)

  const activeService = services.find((s) => s.id === activeTab) || services[0]
  const marqueeList = services.map((s) => s.label)
  const marqueeItems = [...marqueeList, ...marqueeList, ...marqueeList, ...marqueeList]

  return (
    <section className='relative w-full bg-surface-page text-heading py-16 px-6 md:px-12 overflow-hidden min-h-screen flex flex-col justify-between transition-colors duration-300'>

      {/* Header */}
      <Container className='w-full z-10'>
        <span className='text-xs md:text-sm tracking-wider text-caption block mb-2 font-mono'>
          {eyebrow}
        </span>
        <h2 className='text-4xl md:text-6xl font-extrabold tracking-tight text-heading font-primary'>
          {heading}
        </h2>
      </Container>

      {/* Category nav — 1st left, 2nd center, 3rd right */}
      <Container className='w-full border-t border-border-subtle/30 pt-6 my-6 grid grid-cols-3 items-center z-10'>
        {services.map((service, index) => {
          const isActive = service.id === activeTab
          const alignClass =
            index === 0
              ? 'justify-start text-left'
              : index === 1
              ? 'justify-center text-center'
              : 'justify-end text-right'

          return (
            <div key={service.id} className={`flex items-center ${alignClass}`}>
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

      {/* Center stage — active card over a scrolling marquee */}
      <div className='relative w-full flex items-center justify-center min-h-[420px] my-4'>

        <div className='absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0'>
          <motion.div
            animate={{ x: ['0%', '-25%'] }}
            transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
            className='whitespace-nowrap flex items-center gap-8 md:gap-12 select-none'
          >
            {marqueeItems.map((title, index) => (
              <div key={index} className='flex items-center gap-8 md:gap-12'>
                <FlowerIcon colorClassName='text-primary' />
                <span className='text-[5rem] sm:text-[8rem] lg:text-[10rem] font-bold text-primary leading-none tracking-tight font-primary'>
                  {title}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className='relative z-10 w-[320px] sm:w-[480px] h-[360px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-border-subtle group cursor-pointer'>
          <img
            src={activeService.image}
            alt={activeService.title}
            className='w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105'
          />
        </div>
      </div>

      {/* Description + tags */}
      <div className='max-w-xl mx-auto w-full text-center flex flex-col items-center gap-6 z-10'>
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
      </div>
    </section>
  )
}

export default ServicesSection