import WhyUs from '@/components/sections/about/WhyUs'
import Cta from '@/components/sections/contact/Cta'

import ServiceHero from '@/components/sections/services/ServiceHero'
import ServiceProcess from '@/components/sections/services/ServiceProcess'
import WhatWeDo from '@/components/sections/services/WhatWeDo'
import React from 'react'


const Service = () => {
  return (
    <div><ServiceHero />
    <WhatWeDo />
    <ServiceProcess />
    <WhyUs />
    <Cta />
    </div>
  )
}

export default Service