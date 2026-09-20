'use client'

import Section from '@/components/atoms/Section'
import Container from '@/components/atoms/Container'
import FoldText from '@/components/Animation/FoldText'
import React, { useState } from 'react'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Image from 'next/image'

type ContactSectionProps = {
  eyebrow?: string
  heading?: string
  contactImageSrcs?: string[]
}
const ContactSection = (props:ContactSectionProps) => {

  const eyebrow = props.eyebrow || 'CONTACT'
  const heading = props.heading || 'Get In Touch'
  const ContactImageSrcs = props.contactImageSrcs || [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80'
  ]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [need, setNeed] = useState('')
  const [description, setDescription] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = { name, email, need, description }
    console.log(formData) // swap this for an actual API call / email send later
 
    // Same reset-after-submit pattern as your notes app
    setName('')
    setEmail('')
    setNeed('')
    setDescription('')
    setIsOpen(true)
  }
 
  


  return (
    <Section className="bg-surface-page text-heading py-9">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Form Inputs */}
        <form onSubmit={(e)=>{
          handleSubmit(e)
        }}
         className="flex flex-col gap-6 w-full">
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
            <Input
              type="text"
              placeholder="Enter your Name"
              value={name}
              required
              onChange={(e)=>setName(e.target.value)}
              className="w-full bg-transparent border-b border-border-subtle py-2 text-caption focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Your Email</label>
            <Input
              type="email"
              id="email"
              placeholder="Enter the Email"
              value={email}
              required
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-border-subtle py-2 text-caption focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="need" className="text-sm font-medium">What you need from us?</label>
            <Input
              type="text"
              id="need"
              placeholder="e.g. UI/UX Design"
              value={need}
              onChange={(e)=>setNeed(e.target.value)}
              className="w-full bg-transparent border-b border-border-subtle py-2 text-caption focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium">Project Description</label>
            <textarea
              id="description"
              rows={3}
              placeholder="Type Here..."
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
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
        <div className="relative w-full h-130 rounded-3xl overflow-hidden border border-border-subtle">
          <Image
          src={ContactImageSrcs[0]}
          alt='Contact Visual'
          fill
          sizes='(max-width: 1024px) 100vw, 50vw'
          className='object-cover'
        />
</div>
      </Container>
    {isOpen && (
  <div
    className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6'
    role='dialog'
    aria-modal='true'
    aria-labelledby='contact-success-message'
  >
    <div className='w-full max-w-md rounded-2xl border border-border-subtle bg-surface-page p-8 text-center shadow-lg'>
      <h3
        id='contact-success-message'
        className='text-h4 font-primary font-bold text-heading'
      >
        Thanks for reaching out!
      </h3>

      <p className='mt-2 text-caption font-secondary leading-relaxed'>
        We have received your details and will get back to you shortly.
      </p>

      <div className='mt-6'>
        <Button onClick={() => setIsOpen(false)} icon={false}>
          Close
        </Button>
      </div>
    </div>
  </div>
)}
    </Section>
  )
}
  export default ContactSection