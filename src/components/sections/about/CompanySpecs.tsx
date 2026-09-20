'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/atoms/Container'
import Section from '@/components/atoms/Section'
import { ChevronDown } from 'lucide-react'

type SpecItem = {
  id: string
  label: string
  value: string
  description?: string
}

const SPECS_DEFAULT: SpecItem[] = [
  {
    id: 'established',
    label: 'Established',
    value: '2026',
    description: 'Founded as a creative digital and IT solutions studio to build purposeful digital experiences.',
  },
  {
    id: 'category',
    label: 'Category',
    value: 'Creative Tech',
    description: 'Combining strategic thinking, creative design, UI/UX, software development, and AI solutions.',
  },
  {
    id: 'promise',
    label: 'Promise',
    value: 'Think, Design, Build',
    description: 'Think deeply. Design purposefully. Build precisely.',
  },
  {
    id: 'process',
    label: 'Process',
    value: '4-Step Model',
    description: '01 Empathize → 02 Ideate → 03 Build → 04 Grow.',
  },
]

type CompanySpecsProps = {
  eyebrow?: string
  heading?: string
  paragraph?: string
  specs?: SpecItem[]
  defaultOpenId?: string
}

const CompanySpecs = (props: CompanySpecsProps) => {

  const eyebrow = props.eyebrow || 'Rato Panda Digitals'
  const heading = props.heading || 'Building technology with purpose and precision.'
  const paragraph = props.paragraph || 'We work at the intersection of strategy, design, and execution. Every interaction we craft is designed to solve real business challenges without unnecessary overhead.'
  const specs = props.specs || SPECS_DEFAULT
  const defaultOpenId = props.defaultOpenId || 'established'

  const [openId, setOpenId] = useState<string | null>(defaultOpenId)

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <Section className='bg-surface-page'>
      <Container className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>

        {/* Left column: heading + paragraph */}
        <div className='lg:col-span-5 gap-6 flex flex-col justify-center'>
          <span className='text-size-cta font-bold tracking-wider text-primary uppercase font-primary'>
            {eyebrow}
          </span>
          <h2 className='text-size-h3 sm:text-size-h2 font-secondary font-medium text-heading tracking-tight leading-tight'>
            {heading}
          </h2>
          <p className='text-size-caption font-secondary text-body sm:text-size-cta leading-relaxed'>
            {paragraph}
          </p>
        </div>

        {/* Right column: accordion specs */}
        <div className='lg:col-span-7 space-y-4'>
          {specs.map((spec) => {
            const isOpen = openId === spec.id
            return (
              <div
                key={spec.id}
                className='border border-border-subtle/60 rounded-xl bg-surface-default overflow-hidden transition-colors hover:border-primary/40'
              >
                <button
                  onClick={() => toggleAccordion(spec.id)}
                  className='w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer select-none'
                >
                  <span className='font-secondary text-size-caption font-medium text-caption'>
                    {spec.label}
                  </span>
                  <div className='flex items-center gap-4'>
                    <span className='font-primary text-size-body sm:text-cta font-semibold text-heading'>
                      {spec.value}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className='w-5 h-5 text-caption' />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && spec.description && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className='px-6 pb-5 pt-1 text-small text-caption font-secondary border-t border-border-subtle leading-relaxed'>
                        {spec.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </Container>
    </Section>
  )
}

export default CompanySpecs