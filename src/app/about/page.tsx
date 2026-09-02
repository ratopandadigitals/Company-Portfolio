import AboutHero from '@/components/sections/about/AboutHero'
import TrustedLogos from '@/components/sections/home/TrustedLogos'
import AboutStatement from '@/components/sections/about/AboutStatement'
import React from 'react'
import CompanySpecs from '@/components/sections/about/CompanySpecs'
import Marquee from '@/components/sections/home/Marquee'
import AboutSection from '@/components/sections/about/AboutHome'
import TeamSection from '@/components/sections/about/TeamSection'
import { FaQ } from 'react-icons/fa6'
import FaqSection from '@/components/sections/Faq/FaqSection'
import Cta from '@/components/sections/contact/Cta'

const About = () => {
  return (
    <div>
    <AboutHero />
    <TrustedLogos />
    <AboutSection />
    <AboutStatement />
    <CompanySpecs />
    <Marquee />
    <TeamSection />
    <FaqSection />
    <Cta />
    
    </div>
  )
}

export default About