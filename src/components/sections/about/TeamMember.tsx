'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import Image from 'next/image'

export type Member = {
  id: string
  name: string
  title: string
  bio: string
  photo: string
  linkedinHref?: string
  githubHref?: string
  badgeText?: string
}

type TeamMemberCardProps = {
  member: Member
  isActive: boolean
  onActivate: () => void
}
const TeamMemberCard = ({ member, isActive, onActivate }: TeamMemberCardProps) => {
  return (
    <motion.div
      layout
      onClick={onActivate}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onActivate()
      }}
      className='relative rounded-2xl bg-surface-default border border-border-subtle cursor-pointer'
      transition={{ layout: { duration: 0.4, ease: 'easeInOut' } }}
    >
      <motion.div layout='position' className='p-6 flex flex-col gap-4'>
        {/* Member Portrait with Floating Top-Right Overlay Badge */}
        <motion.div layout='position' className='group relative w-full aspect-square rounded-xl overflow-hidden'>
         <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes='(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 240px'
          className='object-cover object-top transition-[filter,transform] duration-500 ease-out group-hover:scale-110'
          style={{
            filter: isActive ? 'none' : 'grayscale(100%) contrast(110%)',
          }}
        />

          {/* Floating Badge (UI Standard Position) */}
          {isActive && member.badgeText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className='absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-primary text-white text-size-caption font-secondary font-medium whitespace-nowrap shadow-md flex items-center gap-1 backdrop-blur-md'
            >
              {member.badgeText}
              <ArrowRight className='w-3 h-3' />
            </motion.div>
          )}
        </motion.div>

        {/* Inactive State Name */}
        {!isActive && (
          <span className='text-small font-secondary text-caption text-center'>
            {member.name}
          </span>
        )}

        {/* Active Details (Immediate Name -> Title -> Bio flow) */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='flex flex-col gap-2'
          >
            <div className='flex flex-col'>
              <span className='text-size-body font-primary font-bold text-heading'>
                {member.name}
              </span>
              <span className='text-small font-secondary text-primary font-medium'>
                {member.title}
              </span>
            </div>
            <p className='text-small font-secondary text-caption leading-relaxed'>
              {member.bio}
            </p>
            <div className='flex items-center gap-3 pt-3 mt-1 border-t border-border-subtle'>
              {member.linkedinHref && (
                <a href={member.linkedinHref} onClick={(e) => e.stopPropagation()} aria-label='LinkedIn'>
                  <FaLinkedin className='w-4 h-4 text-caption hover:text-primary transition-colors' />
                </a>
              )}
              {member.githubHref && (
                <a href={member.githubHref} onClick={(e) => e.stopPropagation()} aria-label='GitHub'>
                  <FaGithub className='w-4 h-4 text-caption hover:text-primary transition-colors' />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default TeamMemberCard