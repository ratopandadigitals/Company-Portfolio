'use client' // CHANGED 1: needed because motion components can't run in a server component

import Link from 'next/link'
import Image from 'next/image' // CHANGED 2: for the logo
import { motion } from 'framer-motion' // CHANGED 2: for the float animation
import { ArrowLeft } from 'lucide-react'
import Section from '@/components/atoms/Section'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'

const NotFound = () => {
  return (
<Section className='relative w-full min-h-[80vh] flex items-start justify-center overflow-hidden bg-surface-page pt-8 sm:pt-12 pb-16'>        <Container className='relative flex flex-col items-center text-center gap-6 '>
        {/* Huge "4 logo 4" watermark: same technique already
            used for the "Client Proof." watermark, so this stays visually
            consistent with the rest of the site instead of introducing a
            new pattern. The company logo takes the place of the "0". */}
        {/* CHANGED 3: "404" text replaced by 4, logo, 4 */}
        <span
          aria-hidden='true'
          className='relative flex items-center justify-center text-[38vw] sm:text-[26vw] font-primary font-bold text-heading/30 leading-none select-none pointer-events-none'
        >
          4
          <motion.span
          className='relative inline-block w-[1.2em] h-[1.2em] -mx-[0.15em] opacity-60'
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <Image
              src='/Light.webp'
              alt=''
              fill
              sizes='40vw'
              className='object-contain dark:hidden'
            />
            <Image
              src='/Dark.webp'
              alt=''
              fill
              sizes='40vw'
              className='object-contain hidden dark:block'
            />
          </motion.span>
          4
        </span>

        {/* <div className='relative z-10 text-[100px] sm:text-[140px] leading-none select-none'>
          🐼
        </div> */}

        <div className='relative z-10 flex flex-col items-center gap-2'>
          <h1 className='text-h2 sm:text-h1 font-primary font-bold text-heading'>
            Oops, we think we&apos;re lost
          </h1>
          <p className='text-size-body font-secondary text-caption max-w-md'>
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
        </div>

        <Link href='/' className='relative z-10'>
          <Button icon={false}>
            <span className='inline-flex items-center gap-2'>
              <ArrowLeft className='w-4 h-4' />
              Back to home
            </span>
          </Button>
        </Link>
      </Container>
    </Section>
  )
}

export default NotFound