'use client'

import React, { useCallback,useEffect, useState,useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '@/components/atoms/Container'
import Section from '@/components/atoms/Section'
type StatItem = {
  value: string
  label: string
}

type TestimonialItem = {
  id: string
  quote: string
  name: string
  role: string
  bgImage: string
}

type ClientProofSectionProps = {
  eyebrow?: string
  title?: string
  stats?: StatItem[]
  testimonials?: TestimonialItem[]
}

const STATS: StatItem[] = [
  { value: '26+', label: 'Finalized Projects' },
  { value: '98%', label: 'Client satisfaction rate' },
  { value: '10M', label: 'Gross Revenue' },
]

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '01',
    quote: '"Franklin turned our ideas into a sharp, clean brand. Fast, easy, and right on point."',
    name: 'Ethan Moore',
    role: 'Co-founder, NovaTech',
    bgImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '02',
    quote: '"Exceeded expectations in every single sprint. The attention to detail is unmatched."',
    name: 'Sarah Jenkins',
    role: 'Product Lead, Apex',
    bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '03',
    quote: '"A true partner in engineering complex software into simple, elegant digital design."',
    name: 'David Chen',
    role: 'CTO, Pulse',
    bgImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
  },
]
const CountUp = ({ value }: { value: string }) => {
  const numericTarget = parseInt(value.replace(/\D/g, ''), 10) || 0
  const suffix = value.replace(/[0-9]/g, '')
  const [count, setCount] = useState(0)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasTriggered) return

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

  return <span ref={ref}>{count}{suffix}</span>
}
  const ClientProofSection = (props: ClientProofSectionProps) => {

  const [currentIndex, setCurrentIndex] = useState(0)

  // Guess/placeholder — the original file had a broken empty label here
  // (just a stray ")" character, no real text). Confirm the real copy.
  const eyebrow = props.eyebrow || 'Testimonials'
  const title = props.title || 'Client Proof.'
  const stats = props.stats || STATS
  const testimonials = props.testimonials || TESTIMONIALS

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

const handleNext = useCallback(() => {
  setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
}, [testimonials.length])

 useEffect(() => {
  const timer = setInterval(() => {
    handleNext()
  }, 5000)

  return () => clearInterval(timer)
}, [handleNext])

  const current = testimonials[currentIndex]

  return (
    <Section className='w-full bg-surface-page py-16 flex flex-col items-center'>
      <Container className='max-w-360 w-full flex flex-col gap-6'>

        {/* Header — watermark uses text-heading/10, which already switches
            light/dark on its own, instead of two hardcoded values */}
        <div className='flex flex-col items-center w-full gap-2'>
          <span className='text-caption text-size-cta font-secondary font-medium tracking-wide text-center'>
            {eyebrow}
          </span>
          <h2 className='w-full text-center text-6xl sm:text-8xl lg:text-[100px] font-primary font-bold tracking-tight text-heading/30 leading-none select-none'>
            {title}
          </h2>
        </div>

        {/* Main grid — stats card + testimonial card, both permanently
            dark (confirmed), matching Footer/CollageSection reasoning */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 w-full min-h-115'>

          {/* Left: stats card */}
          <div className='group lg:col-span-4 relative rounded-3xl overflow-hidden bg-dark-500 border border-white/10 p-8 sm:p-10 flex flex-col justify-between min-h-115'>
            <div
              className='absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity pointer-events-none'
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop')`,
              }}
            />
            <div className='absolute inset-0 bg-linear-to-b from-dark-500/60 via-transparent to-dark-500/80 pointer-events-none' />

            <div className='relative z-10 flex flex-col justify-between h-full gap-8'>
              {stats.map((stat, index) => (
                <div key={index} className='flex flex-col'>
                  <span className='text-5xl sm:text-6xl font-primary font-extrabold text-white tracking-tight leading-none'>
                    <CountUp value={stat.value} />
                  </span>
                  <span className='text-size-cta font-secondary font-medium text-white/70 mt-1'>
                   {stat.label} 
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: testimonial card */}
          <div className=' group lg:col-span-8 relative rounded-3xl overflow-hidden bg-dark-500 border border-white/10 min-h-115 flex flex-col justify-between p-8 sm:p-10'>

            {/* 3 stacked background layers, crossfading */}
            {testimonials.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-all duration-700 ease-in-out pointer-events-none ${
                  currentIndex === index ? 'opacity-100 z-0' : 'opacity-0 z-0'
                }`}
                style={{ backgroundImage: `url(${item.bgImage})` }}
              />
            ))}

            <div className='absolute inset-0 bg-dark-500/40 backdrop-brightness-90 pointer-events-none z-1' />
            <div className='absolute inset-0 bg-linear-to-t from-dark-500/95 via-dark-500/40 to-transparent pointer-events-none z-1' />

            <div className='relative z-10 text-size-caption font-secondary font-semibold tracking-widest text-white/70'>
              {current.id} / {String(testimonials.length).padStart(2, '0')}
            </div>

            <div className='relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-16'>
              <div className='max-w-xl flex flex-col gap-4'>
                <p className='text-cta sm:text-h3 font-secondary font-medium leading-snug tracking-tight text-white transition-all duration-300'>
                  {current.quote}
                </p>
                <div className='flex flex-col'>
                  <span className='text-size
                  body font-secondary font-semibold text-white'>
                    {current.name}
                  </span>
                  <span className='text-size-cta font-secondary text-white/70'>
                    {current.role}
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-3 shrink-0'>
                <button
                  onClick={handlePrev}
                  className='w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 cursor-pointer'
                  aria-label='Previous slide'
                >
                  <ChevronLeft className='w-5 h-5' />
                </button>
                <button
                  onClick={handleNext}
                  className='w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 cursor-pointer'
                  aria-label='Next slide'
                >
                  <ChevronRight className='w-5 h-5' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default ClientProofSection