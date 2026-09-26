import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  lightSrc?: string
  darkSrc?: string
  href?: string
}

const Logo = ({ lightSrc = '/Light.webp', darkSrc = '/Dark.webp', href = '/' }: LogoProps) => {
  return (
    <Link href={href} className="relative flex items-center gap-2.5 sm:gap-3 shrink-0">
      <Image
        src={lightSrc}
        alt="Rato Panda Digitals"
        width={859}
        height={620}
        priority
        className="w-8 h-8 sm:w-10 sm:h-10 object-contain dark:hidden"
      />
      <Image
        src={darkSrc}
        alt="Rato Panda Digitals"
        width={40}
        height={40}
        priority
        className="w-8 h-8 sm:w-10 sm:h-10 object-contain hidden dark:block"
      />
      <span className="text-lg sm:text-2xl font-extrabold tracking-widest font-primary">
        <span className="text-heading">RatoPanda</span>
        <span className="text-primary">Digitals</span>
      </span>
    </Link>
  )
}

export default Logo