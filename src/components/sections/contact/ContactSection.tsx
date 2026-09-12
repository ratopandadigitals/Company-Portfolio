'use client'
import React from 'react'
import Section from '@/components/atoms/Section'
import Container from '@/components/atoms/Container'
import FoldText from '@/components/Animation/FoldText'
type ContactSectionProps = {
  eyebrow?: string
  heading?: string
}
const ContactSection = (props:ContactSectionProps) => {

  const eyebrow = props.eyebrow || 'CONTACT'
  const heading = props.heading || 'Get In Touch'


  return (
    <Section className="bg-surface-page text-heading py-9">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Form Inputs */}
        <form className="flex flex-col gap-6 w-full">
                  <div className='flex flex-col gap-2 text-heading'>
          <span className='text-caption text-size-body font-mono tracking-wider uppercase block'>
            {eyebrow}
          </span>
          <FoldText
            text={heading}
            splitBy='char'
            hinge='top'
            duration={0.65}
            stagger={0.045}
            ease='power3.out'
            perspective={700}
            fontSize='clamp(1.75rem, 3.0vw, 2.75rem)'
            fontWeight={700}
          />
        </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Your Name</label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full bg-transparent border-b border-border-subtle py-2 text-caption focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Your Email</label>
            <input
              type="email"
              placeholder="Enter the Email"
              className="w-full bg-transparent border-b border-border-subtle py-2 text-caption focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">What you need from us?</label>
            <input
              type="text"
              placeholder="e.g. UI/UX Design"
              className="w-full bg-transparent border-b border-border-subtle py-2 text-caption focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Project Description</label>
            <textarea
              rows={3}
              placeholder="Type Here..."
              className="w-full bg-transparent border-b border-border-subtle py-2 text-caption focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-heading text-surface-page font-medium hover:opacity-90 transition-opacity mt-2 cursor-pointer"
          >
            Send Now!
          </button>
        </form>

        {/* Right Column: Image */}
        <div className="w-full h-[520px] rounded-3xl overflow-hidden border border-border-subtle">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"
            alt="Contact Visual"
            className="w-full h-full object-cover"
          />
        </div>

      </Container>
    </Section>
  )
}
  export default ContactSection