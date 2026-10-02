import React from 'react'
import { Star,} from 'lucide-react'
import Container from '@/components/atoms/Container'
import Section from '@/components/atoms/Section'
import Button from '@/components/atoms/Button'
import Image from 'next/image'

type CtaProps = {
  headline?: string
  eyebrow?: string
  title?: string
  headlineAccent?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
]

const Cta = (props: CtaProps) => {

  const headline = props.headline || 'Project In Mind?'
  const eyebrow = props.eyebrow || 'Testimonials'
  const title = props.title || 'Lets Connect.'
  const headlineAccent = props.headlineAccent || 'Get In Touch'
  const description = props.description || 'Tell us about your project — we\u2019ll bring the tools, vision, and energy to make it real.'
  const ctaLabel = props.ctaLabel || 'Get Started'
  const ctaHref = props.ctaHref || '/contact/#contact-form'

  return (
    <Section className='pb-16'>
      <Container>
        <div className='flex flex-col items-center w-full gap-2'>
          <span className='text-caption text-sm font-medium tracking-wide text-center'>
            {eyebrow}
          </span>
          <h2 className='w-full text-center gap-2 text-6xl sm:text-8xl lg:text-[100px] font-bold tracking-tight text-heading/30 leading-none select-none'>
            {title}
          </h2>
        </div>
        <div className='relative rounded-3xl border border-border-subtle overflow-hidden px-8 py-8 md:px-10 md:py-10 flex flex-col justify-between shadow-2xl bg-surface-default'>

          {/* Ambient crimson glow — stays crimson in both modes, matches your fixed accent rule */}
          <div
            aria-hidden='true'
            className='absolute -bottom-24 -right-24 w-125 h-125 bg-primary/15 rounded-full blur-[130px] pointer-events-none'
          />

          <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 h-full min-h-70'>

            <div className='max-w-md flex flex-col gap-6 justify-between h-full'>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col text-size-h3 sm:text-size-h2 font-primary  gap-4 font-bold leading-tight'>
                  <span className='text-heading'>{headline}</span>
                  <span className='text-primary'>{headlineAccent}</span>
                </div>
                <p className='text-size-small font-secondary text-caption leading-relaxed'>
                  {description}
                </p>
              </div>

              <div className='flex items-center gap-3 pt-2'>
                <div className='flex -space-x-2.5 overflow-hidden'>
                  {AVATARS.map((url, idx) => (
                    <Image
                  key={idx}
                  src={url}
                  alt='User avatar'
                  width={36}
                  height={36}
                  className='inline-block h-9 w-9 rounded-full border-2 border-surface-default object-cover'
                />
                  ))}
                </div>

                <div className='flex flex-col gap-0.5'>
                  <div className='flex items-center gap-0.5 text-warning'>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className='w-3.5 h-3.5 fill-current' />
                    ))}
                  </div>
                  <span className='text-caption font-secondary  font-medium'>
                    Trusted by 500+ creators
                  </span>
                </div>
              </div>
            </div>

                <div className='shrink-0'>
      <Button href={ctaHref} variant='liquid'>
        {ctaLabel}
      </Button>
    </div>

          </div>
        </div>
      </Container>
    </Section>
  )
}

export default Cta