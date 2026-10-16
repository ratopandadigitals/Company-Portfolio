
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '@/components/atoms/Container'
import Section from '@/components/atoms/Section'
import {
  STATS_ITEMS,
  TESTIMONIALS_ITEMS,
} from '@/data/client'
import type { StatItem, TestimonialItem } from '@/data/client'

type ClientProofSectionProps = {
  eyebrow?: string
  title?: string
  stats?: StatItem[]
  testimonials?: TestimonialItem[]
}

const CountUp = ({ value }: { value: string }) => {
  const numericTarget = parseInt(value.replace(/\D/g, ''), 10) || 0
  const suffix = value.replace(/[0-9]/g, '')

  const [count, setCount] = useState(0)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasTriggered) return

    if (numericTarget === 0) {
  return
}

    let current = 0
    const duration = 1500
    const steps = 40
    const increment = numericTarget / steps

    const timer = setInterval(() => {
      current += increment

      if (current >= numericTarget) {
        setCount(numericTarget)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [hasTriggered, numericTarget])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const ClientProofSection = ({
  eyebrow = 'Testimonials',
  title = 'Client Proof.',
  stats = STATS_ITEMS,
  testimonials = TESTIMONIALS_ITEMS,
}: ClientProofSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

const testimonialCount = testimonials.length

const safeIndex =
  testimonialCount > 0 && currentIndex < testimonialCount
    ? currentIndex
    : 0

  const handlePrev = useCallback(() => {
    if (testimonialCount === 0) return

    setCurrentIndex((previous) =>
      previous === 0 ? testimonialCount - 1 : previous - 1,
    )
  }, [testimonialCount])

  const handleNext = useCallback(() => {
    if (testimonialCount === 0) return

    setCurrentIndex((previous) =>
      previous === testimonialCount - 1 ? 0 : previous + 1,
    )
  }, [testimonialCount])

  useEffect(() => {
    if (testimonialCount <= 1) return

    const timer = setInterval(handleNext, 5000)

    return () => clearInterval(timer)
  }, [handleNext, testimonialCount])

  const current = testimonials[safeIndex]

  return (
    <Section className="flex w-full flex-col items-center bg-surface-page py-16">
      <Container className="flex w-full max-w-360 flex-col gap-6">
        {/* Section heading */}
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-center text-size-cta font-secondary font-medium tracking-wide text-caption">
            {eyebrow}
          </span>

          <h2 className="w-full select-none text-center text-6xl font-primary font-bold leading-none tracking-tight text-heading/30 sm:text-8xl lg:text-[100px]">
            {title}
          </h2>
        </div>

        {/* Stats and testimonial cards */}
        <div className="grid min-h-115 w-full grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Stats card */}
          <div className="group relative flex min-h-115 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-dark-500 p-8 sm:p-10 lg:col-span-4">
            <div
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
              style={{
                backgroundImage: "url('/client/testt.jpg')",
              }}
            />

            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-dark-500/60 via-transparent to-dark-500/80" />

            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col">
                  <span className="text-5xl font-primary font-extrabold leading-none tracking-tight text-white sm:text-6xl">
                    <CountUp value={stat.value} />
                  </span>

                  <span className="mt-1 text-size-cta font-secondary font-medium text-white/70">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial card */}
          <div className="group relative flex min-h-115 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-dark-500 p-8 sm:p-10 lg:col-span-8">
            {testimonials.map((item, index) => (
              <div
                key={item.id}
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out group-hover:scale-105 ${
                  safeIndex === index
                    ? 'z-0 opacity-100'
                    : 'z-0 opacity-0'
                }`}
                style={{
                  backgroundImage: `url(${item.bgImage})`,
                }}
              />
            ))}

            <div className="pointer-events-none absolute inset-0 z-[1] bg-dark-500/40 backdrop-brightness-90" />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-t from-dark-500/95 via-dark-500/40 to-transparent" />

            {current ? (
              <>
                <div className="relative z-10 text-size-caption font-secondary font-semibold tracking-widest text-white/70">
                  {current.id} / {String(testimonialCount).padStart(2, '0')}
                </div>

                <div className="relative z-10 flex flex-col justify-between gap-6 pt-16 sm:flex-row sm:items-end">
                  <div className="flex max-w-xl flex-col gap-4">
                    <p className="text-cta font-secondary font-medium leading-snug tracking-tight text-white transition-all duration-300 sm:text-h3">
                      {current.quote}
                    </p>

                    <div className="flex flex-col">
                      <span className="text-size-body font-secondary font-semibold text-white">
                        {current.name}
                      </span>

                      <span className="text-size-cta font-secondary text-white/70">
                        {current.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={testimonialCount <= 1}
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={testimonialCount <= 1}
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="relative z-10 flex flex-1 items-center justify-center">
                <p className="text-size-body text-white/70">
                  No testimonials available yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default ClientProofSection
