'use client'

import React from 'react'
import FounderSection from './FounderSection'
import MemberSection from './MemberSection'

const TeamSection = () => {
  return (
    <div className='flex flex-col gap-12 md:gap-16'>
      <FounderSection />
      <MemberSection />
    </div>
  )
}

export default TeamSection