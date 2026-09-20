'use client'

import React from 'react'

import { Check } from 'lucide-react'
import Section from '@/components/atoms/Section'
import Container from '@/components/atoms/Container'
import FoldText from '@/components/Animation/FoldText'
import { AnimatedStepper, Step } from '@/components/Animation/AnimatedStepper'
import { SERVICE_PROCESS, ServicePhase } from './ServicePhase'
import Image from 'next/image'

type ServiceProcessProps = {
  eyebrow?: string
  heading?: string
  services?: ServicePhase[]
}

const ServiceProcess = (props: ServiceProcessProps) => {
  const eyebrow = props.eyebrow || 'Our Process'
  const heading = props.heading || 'How We Work With You'
  const services = props.services || SERVICE_PROCESS

  return (
    <Section className="w-full bg-surface-page py-20 overflow-hidden">
      <Container className="max-w-5xl mx-auto flex flex-col gap-10">

        {/* Section Header */}
        <div className="flex flex-col gap-2 text-heading">
          <span className="text-caption font-mono tracking-wider uppercase block">
            {eyebrow}
          </span>
          <FoldText
            text={heading}
            splitBy="char"
            hinge="top"
            duration={0.65}
            stagger={0.045}
            ease="power3.out"
            perspective={700}
            fontSize="clamp(1.75rem, 3.5vw, 2.75rem)"
            fontWeight={800}
          />
        </div>

        {/* Animated Stepper Integration
            autoPlay: advances through phases on its own after a delay.
            autoPlayInterval: 5s per phase — long enough to read the
            description + deliverable tags before it moves on.
            Manual "Next Phase" clicks still work independently — the
            hook inside AnimatedStepper resets its own timer off of
            currentStep, so clicking early doesn't fight the autoplay,
            it just restarts the countdown for the next phase. */}
        <AnimatedStepper
          nextButtonText="Next Phase"
          backButtonText="Previous Phase"
          autoPlay
          autoPlayInterval={5000}
          onFinalStepCompleted={() => alert('Process overview finished!')}
        >
          {services.map((service: ServicePhase, index: number) => {
            const formattedNum = String(index + 1).padStart(2, '0')

            return (
              <Step key={service.id || index}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-2">

                  {/* Left Column: Text & Deliverables */}
                  <div className="lg:col-span-7 flex flex-col gap-5">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface-card border border-primary/25 text-heading text-size-caption caption font-secondary font-bold tracking-wider uppercase w-fit shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                      <span>{formattedNum} Process</span>
                    </div>

                    {/* Step Title */}
                    <h2 className="text-h1 font-primary font-bold text-heading tracking-tight">
                      {service.title}
                    </h2>

                    {/* Description */}
                    <p className="text-caption font-secondary leading-relaxed">
                      {service.description}
                    </p>

                    {/* Deliverable Tags */}
                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="flex flex-wrap gap-2.5 pt-2">
                        {service.deliverables.map((deliverable, tagIndex) => (
                          <div
                            key={tagIndex}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-page font-secondary text-heading text-size-small font-semibold border border-border-subtle/40"
                          >
                            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-success text-heading shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-3" />
                            </span>
                            <span>{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Visual Feature Image */}
                          <div className="lg:col-span-5 relative w-full h-64 lg:h-72 rounded-2xl overflow-hidden border border-border-subtle">
                            <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes='(max-width: 1024px) 100vw, 42vw'
                          className='object-cover'
                        />
                            <div className="absolute inset-0 bg-linear-to-t from-surface-card via-transparent to-transparent opacity-60" />
                  </div>

                </div>
              </Step>
            )
          })}
        </AnimatedStepper>

      </Container>
    </Section>
  )
}

export default ServiceProcess