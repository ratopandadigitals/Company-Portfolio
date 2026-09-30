'use client'

import React, { useState } from 'react'
import Section from '@/components/atoms/Section'
import Container from '@/components/atoms/Container'
import TeamMemberCard, { Member } from '@/components/sections/about/TeamMember'

type MemberSectionProps = {
  eyebrow?: string
  heading?: string
  members?: Member[]
}

// Add your team members here directly — same idea as FOUNDERS in
// FounderSection.tsx. To add 2 new people, just add 2 more objects to this
// array below. No other file needs to change.
const MEMBERS: Member[] = [
  // {
  //   id: 'ram',
  //   name: 'Ram Thapa',
  //   title: 'UI Designer',
  //   bio: 'Designs clean, usable interfaces across every project.',
  //   photo: '/Team1.jpeg', // replace with this person's real photo path
  //   linkedinHref: '#',
  //   githubHref: '#',
  //   badgeText: 'New hire',
  // },
  // {
  //   id: 'sita',
  //   name: 'Sita Gurung',
  //   title: 'Frontend Developer',
  //   bio: 'Builds and ships the React/Next.js front-end features.',
  //   photo: '/Team2.jpeg', // replace with this person's real photo path
  //   linkedinHref: '#',
  //   githubHref: '',
  
  // },
]

const MemberSection = (props: MemberSectionProps) => {

  const eyebrow = props.eyebrow || 'Our Team'
  const heading = props.heading || 'Growing the team'
  // Same fallback pattern as everywhere else in your codebase:
  // use what's passed in via props, otherwise fall back to MEMBERS above.
  const members = props.members || MEMBERS

  const [activeId, setActiveId] = useState<string | null>(null)
  // // if no team is there than it wont show
  // if (members.length === 0) return null

  const handleActivate = (id: string) => {
    setActiveId(activeId === id ? null : id)
  }

  return (
    <Section className='py-12 sm:py-16 lg:py-20'>
      <Container className='flex flex-col items-center text-center gap-8'>
        <div className='flex flex-col items-center gap-4'>
          <span className='text-size-h1 font-secondary text-primary tracking-wider uppercase  font-semibold'>
            {eyebrow}
          </span>
          <h2 className='text-h2 font-primary font-bold text-heading'>
            {heading}
          </h2>
        </div>

        {members.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 w-full'>
            {members.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                isActive={activeId === member.id}
                onActivate={() => handleActivate(member.id)}
              />
            ))}
          </div>
        ) : (
          <div className='w-full max-w-md rounded-2xl border border-dashed border-border-subtle p-8 text-caption text-small font-secondary'>
            Pending real team data — names, roles, bios, and photos not yet confirmed.
            This section will populate once hires are made.
          </div>
        )}
      </Container>
    </Section>
  )
}

export default MemberSection