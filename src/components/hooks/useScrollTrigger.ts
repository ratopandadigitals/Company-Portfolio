import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

type ScrollAnimationOptions = {
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  markers?: boolean
}

export function useScrollTrigger(options: ScrollAnimationOptions = {}) {
  const targetRef = useRef<HTMLDivElement>(null)

  const {
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
    start = 'top 85%',
    end = 'bottom 20%',
    scrub = false,
    pin = false,
    markers = false,
  } = options

  useGSAP(
    () => {
      if (!targetRef.current) return

      gsap.fromTo(targetRef.current, from, {
        ...to,
        scrollTrigger: {
          trigger: targetRef.current,
          start,
          end,
          scrub,
          pin,
          markers,
        },
      })
    },
    { scope: targetRef }
  )

  return targetRef
}