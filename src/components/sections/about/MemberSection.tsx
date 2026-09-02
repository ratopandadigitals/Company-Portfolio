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

const MemberSection = (props: MemberSectionProps) => {

  const eyebrow = props.eyebrow || 'Our Team'
  const heading = props.heading || 'Growing the team'
  const members = props.members

  const [activeId, setActiveId] = useState<string | null>(null)

  const handleActivate = (id: string) => {
    setActiveId(activeId === id ? null : id)
  }

  return (
    <Section>
      <Container className='flex flex-col items-center text-center gap-8'>
        <div className='flex flex-col items-center gap-4'>
          <span className='text-small font-mono text-caption tracking-wider uppercase'>
            {eyebrow}
          </span>
          <h2 className='text-h2 font-primary font-bold text-heading'>
            {heading}
          </h2>
        </div>

        {members && members.length > 0 ? (
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