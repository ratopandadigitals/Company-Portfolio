'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import Image from 'next/image'

type Founder = {
  id: string
  name: string
  title: string
  bio: string
  photo: string
  linkedinHref?: string
  githubHref?: string
  badgeText?: string
  projects?: string[]
}

const FOUNDERS: Founder[] = [
  {
    id: 'nischit',
    name: 'Nischit Shrestha',
    title: 'Co-Founder & CEO',
    bio: 'Drives overall strategic vision, growth strategy, and global client partnerships across all digital divisions.',
    photo: '/Team2.jpeg', // update path
    linkedinHref: 'https://www.linkedin.com/in/nischitshrestha',
    githubHref: 'https://github.com/nischitshrestha',
    badgeText: 'Strategic Vision',
    projects: ['Hamro Docs FullStack Web app', 'Global Client Operations', 'Product Innovation'],
  },
  {
    id: 'dipesh',
    name: 'Dipesh Basnet',
    title: 'Co-Founder & CTO',
    bio: 'UI/UX designer and frontend developer with an IT background. Dipesh designs in Figma and also builds the frontend, so the finished site matches the design instead of just looking good in a mockup. He works with design systems, reusable components and responsive layouts, and turns Figma files into working sites and web apps using React, Next.js and Tailwind CSS. Self-taught through building things and fixing what broke. AI tools are used for research and to speed up routine tasks.',    photo: '/Team1.jpeg', // update path
    linkedinHref: 'https://www.linkedin.com/in/dipesh-basnet98',
    githubHref: 'https://github.com/dipeshbasnt',
    badgeText: "Dipesh's latest build →",
    projects: ['Agency Portfolio','UI/UX Design','Portfolio Ui/UX Design','AgencyPortfolio UI/UX Design'],
  },
]

const FounderSection = () => {
  const [activeId, setActiveId] = useState<string>(FOUNDERS[0].id)
  const activeFounder = FOUNDERS.find((f) => f.id === activeId) || FOUNDERS[0]
  

  return (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className='mb-8'>
        <span className='text-size-h2 font-secondary text-primary tracking-wider uppercase  font-semibold'>
          BEHIND THE SCENES
        </span>
        <h2 className='text-size-h2 md:text-size-h3 font-primary font-bold text-heading mt-1'>
          The people behind Rato Panda
        </h2>
      </div>

      {/* Split Grid: Left Cards (5 Cols) + Right Spotlight Panel (7 Cols) */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        
        {/* LEFT COLUMN: Compact Selector Cards */}
        <div className='lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4'>
          {FOUNDERS.map((founder) => {
            const isActive = founder.id === activeId
            return (
              <div
                key={founder.id}
                onClick={() => setActiveId(founder.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'bg-surface-default border-primary/50 shadow-lg scale-[1.02]'
                    : 'bg-surface-default/40 border-border-subtle hover:border-border-default opacity-70 hover:opacity-100'
                }`}
              >
                <div className='w-20 h-20 rounded-xl overflow-hidden shrink-0'>
                   <Image
                    src={founder.photo}
                    alt={founder.name}
                    width={80}
                    height={80}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      isActive ? 'grayscale-0' : 'grayscale'
                    }`}
                  />
                </div>
                <div className='flex flex-col justify-center'>
                  <h3 className='text-size-cta font-primary font-bold text-heading'>
                    {founder.name}
                  </h3>
                  <p className='text-size-body font-secondary text-primary'>
                    {founder.title}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

     
        {/* RIGHT COLUMN: Premium Dynamic Spotlight Panel */}
    <div className='lg:col-span-7 bg-surface-default border border-border-subtle rounded-3xl p-4  md:p-6 min-h-[380px] relative overflow-hidden shadow-2xl'>

      {/* 1. ADD THIS: Blurred Image Background */}
      <div 
    className='absolute inset-0 bg-cover bg-center filter blur-3xl opacity-25 scale-125 pointer-events-none transition-all duration-700' 
    style={{ backgroundImage: `url(${activeFounder.photo})` }} 
  />

  {/* 2. ADD THIS: Gradient Overlay for sharp text readability */}
  <div className='absolute inset-0 bg-gradient-to-t from-surface-default via-surface-default/80 to-transparent pointer-events-none' />

  {/* Existing content stays inside (add 'relative z-10' so text stays crisp on top) */}
  <AnimatePresence mode='wait'>
    <motion.div
      key={activeFounder.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className='relative z-10 flex flex-col justify-between h-full gap-6'
    >
      ...
              {/* Top Badge & Socials */}
              <div className='flex items-center justify-between gap-4 flex-wrap'>
                {activeFounder.badgeText && (
                  <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-card/10 border border-primary/30 text-heading text-size-caption font-secondary font-medium'>
                    {activeFounder.badgeText}
                    <ArrowUpRight className='w-3.5 h-3.5' />
                  </span>
                )}
                <div className='flex items-center gap-3 ml-auto'>
                  {activeFounder.linkedinHref && (
                    <a href={activeFounder.linkedinHref} target='_blank' rel='noreferrer' className='text-caption hover:text-primary transition-colors'>
                      <FaLinkedin className='w-5 h-5' />
                    </a>
                  )}
                  {activeFounder.githubHref && (
                    <a href={activeFounder.githubHref} target='_blank' rel='noreferrer' className='text-caption hover:text-primary transition-colors'>
                      <FaGithub className='w-5 h-5' />
                    </a>
                  )}
                </div>
              </div>

              {/* Bio & Details */}
              <div className='flex flex-col gap-3'>
                <h3 className='text-2xl md:text-3xl font-primary font-bold text-heading'>
                  {activeFounder.name}
                </h3>
                <p className='text-sm font-secondary text-primary font-medium'>
                  {activeFounder.title}
                </p>
                <p className='text-caption font-secondary text-base leading-relaxed mt-2'>
                  {activeFounder.bio}
                </p>
              </div>

              {/* Projects / Pills */}
              {activeFounder.projects && (
                <div className='flex flex-wrap gap-2 pt-4 border-t border-border-subtle'>
                  {activeFounder.projects.map((item, idx) => (
                    <span
                      key={idx}
                      className='px-3 py-1 text-xs font-secondary rounded-lg bg-surface-subtle text-caption border border-border-subtle'
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}

export default FounderSection