import WhyUs from '@/components/sections/about/WhyUs'
import Cta from '@/components/sections/contact/Cta'
import FaqSection from '@/components/sections/Faq/FaqSection'
import ServiceHero from '@/components/sections/services/ServiceHero'
import ServiceProcess from '@/components/sections/services/ServiceProcess'
import WhatWeDo from '@/components/sections/services/WhatWeDo'
import React from 'react'
import { FaQ } from 'react-icons/fa6'

const Service = () => {
  return (
    <div><ServiceHero />
    <WhatWeDo />
    <ServiceProcess />
    <Cta />
    </div>
  )
}

export default Service