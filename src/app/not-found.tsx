import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Section from '@/components/atoms/Section'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'

const NotFound = () => {
  return (
    <Section className='relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-surface-page'>
      <Container className='relative flex flex-col items-center text-center gap-6 py-16 sm:py-24'>

        {/* Huge "404" watermark — same text-heading/10 technique already
            used for the "Client Proof." watermark, so this stays visually
            consistent with the rest of the site instead of introducing a
            new pattern. */}
        <span
          aria-hidden='true'
          className='absolute inset-0 flex items-center justify-center text-[38vw] sm:text-[26vw] font-primary font-bold text-heading/10 leading-none select-none pointer-events-none'
        >
          404
        </span>

        
        <div className='relative z-10 text-[100px] sm:text-[140px] leading-none select-none'>
          🐼
        </div>

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