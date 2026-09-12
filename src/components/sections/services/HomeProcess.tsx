'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/atoms/Section'
import Container from '@/components/atoms/Container'
import { SERVICE_PROCESS, ServicePhase } from '@/components/sections/services/ServicePhase'

type ProcessTeaserProps = {
  eyebrow?: string
  heading?: string
  services?: ServicePhase[]
  ctaHref?: string
}

const Homeprocess = ({
  eyebrow = 'Our Process',
  heading = 'How We Bring Ideas to Life',
  services = SERVICE_PROCESS,
  ctaHref = '/services',
}: ProcessTeaserProps) => {
  return (
    <Section className="w-full bg-surface-page py-16 border-y border-border-subtle/50 overflow-hidden">
      <Container className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Top Header Row with Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-size-caption text-primary font-mono tracking-wider uppercase font-bold">
              {eyebrow}
            </span>
            <h2 className="text-h2 font-primary font-bold text-heading tracking-tight">
              {heading}
            </h2>
          </div>

          <Link
            href={ctaHref}
            className="inline-flex items-center gap-1.5 text-small font-mono font-semibold text-caption hover:text-primary transition-colors group"
          >
            <span>Explore Full Process</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Title-Only Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, index) => {
            const stepNum = String(index + 1).padStart(2, '0')

            return (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-surface-card border border-border-subtle/60 hover:border-primary/40 transition-all duration-300 shadow-md min-h-40"
              >
                {/* Step Indicator Top Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-size-caption font-mono font-bold text-primary">
                    {stepNum}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-border-subtle group-hover:bg-primary transition-colors duration-300" />
                </div>

                {/* Title Only */}
                <h3 className="text-size-body font-primary font-bold text-heading group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
              </motion.div>
            )
          })}
        </div>

      </Container>
    </Section>
  )
}

export default Homeprocess