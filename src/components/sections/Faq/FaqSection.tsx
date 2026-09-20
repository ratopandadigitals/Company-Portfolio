'use client'

import React, { useState } from 'react'
import Container from '@/components/atoms/Container'

type FaqItem = {
  id: string
  question: string
  answer: string
}

const FAQ_DATA: FaqItem[] = [
  {
    id: '01',
    question: 'Why Rato Panda over a freelancer or in-house team?',
    answer:
      'We combine the strategic flexibility and speed of a specialized agency with the dedication of an in-house team—delivering higher efficiency without recruitment overhead.',
  },
  {
    id: '02',
    question: 'What services does Rato Panda offer?',
    answer:
      'We offer Brand Identity, UI/UX Design, Web and Software Development, Digital Products, AI and Automation, and Digital Growth and Media — everything from strategy to execution.',
  },
  {
    id: '03',
    question: "What is Rato Panda's process like?",
    answer:
      'Our process is rooted in deep discovery, iterative design, clear communication, and rapid execution tailored to your specific business goals.',
  },
  {
    id: '04',
    question: 'How do I start a project?',
    answer:
      'Simply reach out through our contact form or book an introductory call. We will discuss your goals, scope, timeline, and present a clear proposal.',
  },
  {
    id: '05',
    question: "What if I don't like the design?",
    answer:
      'We build feedback loops directly into every milestone. Revisions are included to ensure the output perfectly aligns with your brand vision.',
  },
  {
    id: '06',
    question: 'Do you work with startups and small businesses?',
    answer:
      'Yes, we partner with early-stage startups, scaling companies, and established brands alike to build high-impact digital solutions.',
  },
]

type FaqSectionProps = {
  eyebrow?: string
  title?: string
  description?: string
  items?: FaqItem[]
}

const FaqSection = (props: FaqSectionProps) => {

  const eyebrow = props.eyebrow || '(FAQs)'
  const title = props.title || 'Your Questions, Answered'
  const description = props.description || 'Helping you understand our process and offerings at Rato Panda Digitals.'
  const items = props.items || FAQ_DATA

  const [openId, setOpenId] = useState<string | null>(items[1]?.id || null)

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  const col1 = items.slice(0, Math.ceil(items.length / 2))
  const col2 = items.slice(Math.ceil(items.length / 2))

  return (
    <section aria-labelledby='faq-title' className='py-16 bg-surface-card border-t border-border-subtle'>
      <Container className='max-w-6xl mx-auto'>

        <header className='text-center space-y-2 mb-16'>
          <span className='text-small font-mono text-caption'>{eyebrow}</span>
          <h2
            id='faq-title'
            className='text-h3 md:text-h1 font-bold tracking-tight text-heading font-primary'
          >
            {title}
          </h2>
          <p className='text-caption font-secondary text-small md:text-body max-w-lg mx-auto'>
            {description}
          </p>
        </header>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-start'>
          {[col1, col2].map((column, colIdx) => (
            <div key={colIdx} className='flex flex-col gap-2 md:gap-4'>
              {column.map((item) => {
                const isOpen = openId === item.id

                return (
                  <article
                    key={item.id}
                    className='bg-surface-default shadow-md rounded-3xl p-6 md:p-8 transition-all duration-300'
                  >
                    <button
                      type='button'
                      onClick={() => toggleFaq(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                      className='w-full flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg'
                    >
                      <span className='text-body md:text-cta font-secondary font-medium  leading-snug'>
                        {item.question}
                      </span>

                      <span
                        className={`shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                        aria-hidden='true'
                      >
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M4 6L8 10L12 6'
                            stroke='currentColor'
                            strokeWidth='1.75'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </span>
                    </button>

                    <div
                      id={`faq-answer-${item.id}`}
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                      }`}
                    >
                      <div className='overflow-hidden'>
                        <p className='text-caption font-secondary text-small md:text-body leading-relaxed'>
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default FaqSection