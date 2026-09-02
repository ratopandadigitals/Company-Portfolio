'use client'

import React, { useState } from 'react'
import Container from '@/components/atoms/Container'

type WhyUsItem = {
  id: string
  title: string
  tag: string
}

const WHY_US_ITEMS: WhyUsItem[] = [
  {
    id: '01',
    title: 'Start with people, context and the actual problem.',
    tag: 'Human-Centered',
  },
  {
    id: '02',
    title: 'Every visual decision should have a reason.',
    tag: 'Purposeful Design',
  },
  {
    id: '03',
    title: 'Details, consistency and execution matter.',
    tag: 'Precision',
  },
  {
    id: '04',
    title: 'Technology should solve a real problem.',
    tag: 'Useful Technology',
  },
  {
    id: '05',
    title: 'Learn, test, improve and evolve.',
    tag: 'Continuous Growth',
  },
]

type WhyUsProps = {
  eyebrow?: string
  title?: string
  items?: WhyUsItem[]
}

const WhyUs = (props: WhyUsProps) => {

  const eyebrow = props.eyebrow || '(Why Us)'
  const title = props.title || 'Why Rato Panda?'
  const items = props.items || WHY_US_ITEMS

  const [activeId, setActiveId] = useState<string>(items[0].id)

  return (
    <section aria-labelledby='why-us-title' className='py-20 bg-surface-page border-border-subtle'>
      <Container>
        <div className='flex flex-col items-center gap-16 max-w-5xl mx-auto'>

          <header className='text-center space-y-3'>
            <span className='text-caption font-mono'>{eyebrow}</span>
            <h2
              id='why-us-title'
              className='text-h3 md:text-h1 font-bold tracking-tight text-heading uppercase font-primary'
            >
              {title}
            </h2>
          </header>

          <ul className='w-full border-t border-border-subtle list-none p-0 m-0'>
            {items.map((item) => {
              const isActive = activeId === item.id

              return (
                <li
                  key={item.id}
                  onMouseEnter={() => setActiveId(item.id)}
                  className='relative flex flex-col md:flex-row items-center justify-between py-8 px-4 border-b border-border-subtle transition-colors duration-300 cursor-pointer group'
                >
                  <span
                    className={`text-small font-mono w-12 transition-colors duration-300 ${
                      isActive ? 'text-primary font-semibold' : 'text-caption'
                    }`}
                  >
                    {item.id}
                  </span>

                  <p
                    className={`flex-1 text-center text-body md:text-cta font-secondary font-medium transition-colors duration-300 my-3 md:my-0 ${
                      isActive ? 'text-primary' : 'text-heading group-hover:text-primary'
                    }`}
                  >
                    {item.title}
                  </p>

                  <div className='flex items-center justify-end gap-3 min-w-[180px]'>
                    <span
                      className={`text-small font-secondary text-right transition-colors duration-300 ${
                        isActive ? 'text-primary font-medium' : 'text-caption'
                      }`}
                    >
                      {item.tag}
                    </span>

                    <span
                      aria-hidden='true'
                      className={`w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      }`}
                    >
                      RP
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}

export default WhyUs