'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { FaLinkedin, FaTwitter } from 'react-icons/fa'

export type Member = {
  id: string
  name: string
  title: string
  bio: string
  photo: string
  FalinkedinHref?: string
  FatwitterHref?: string
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
      className='relative rounded-2xl bg-surface-default border border-border-subtle cursor-pointer'
      transition={{ layout: { duration: 0.4, ease: 'easeInOut' } }}
    >
      {/* Floating badge */}
      {isActive && member.badgeText && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className='absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-primary text-white text-caption font-secondary font-medium whitespace-nowrap shadow-lg flex items-center gap-1'
        >
          {member.badgeText}
          <ArrowRight className='w-3 h-3' />
        </motion.div>
      )}

      <motion.div layout='position' className='p-6 flex flex-col gap-4'>
        {/* Active details (bio, title, socials) */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='flex flex-col gap-2'
          >
            <div className='flex flex-col'>
              <span className='text-body font-primary font-bold text-heading'>
                {member.name}
              </span>
              <span className='text-small font-secondary text-primary'>
                {member.title}
              </span>
            </div>
            <p className='text-small font-secondary text-caption leading-relaxed'>
              {member.bio}
            </p>
            <div className='flex items-center gap-3 pt-1'>
              {member.FalinkedinHref && (
                <a href={member.FalinkedinHref} onClick={(e) => e.stopPropagation()} aria-label='LinkedIn'>
                  <FaLinkedin className='w-4 h-4 text-caption hover:text-primary transition-colors' />
                </a>
              )}
              {member.FatwitterHref && (
                <a href={member.FatwitterHref} onClick={(e) => e.stopPropagation()} aria-label='X / Twitter'>
                  <FaTwitter className='w-4 h-4 text-caption hover:text-primary transition-colors' />
                </a>
              )}
            </div>
          </motion.div>
        )}

        {/* Member Portrait */}
        <motion.div layout='position' className='w-full aspect-square rounded-xl overflow-hidden'>
          <img
            src={member.photo}
            alt={member.name}
            className='w-full h-full object-cover transition-[filter] duration-500'
            style={{
              filter: isActive ? 'none' : 'grayscale(100%) contrast(110%)',
            }}
          />
        </motion.div>

        {/* Compact Name (Inactive State) */}
        {!isActive && (
          <span className='text-small font-secondary text-caption text-center'>
            {member.name}
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}

export default TeamMemberCard