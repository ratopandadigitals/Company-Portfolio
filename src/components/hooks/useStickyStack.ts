'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
} as const

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
} as const

export const useStickyStack = <T>(items: T[]) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      // 1. Wait for React's DOM render batch to settle before running GSAP
      const rafId = requestAnimationFrame(() => {
        // Kill existing triggers and revert DOM completely
        ScrollTrigger.getAll().forEach((st) => st.kill(true))

        const cards = gsap.utils.toArray('.event-card', containerRef.current) as HTMLDivElement[]
        const totalCards = cards.length

        if (totalCards === 0 || !containerRef.current) return

        // Clear inline styles from prior animations
        gsap.set(cards, { clearProps: 'all' })

        // Explicitly set Card 0 to top, Card 1+ offset 100% down
        cards.forEach((card, i) => {
          gsap.set(card, {
            yPercent: i === 0 ? 0 : 100,
            scale: 1,
            rotation: 0,
            zIndex: i + 1,
          })
        })

        if (totalCards <= 1) {
          ScrollTrigger.refresh()
          return
        }

        // Build stack timeline
        const scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${window.innerHeight * (totalCards - 1)}`,
            pin: true,
            scrub: 0.5,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        })

        for (let i = 0; i < totalCards - 1; i++) {
          scrollTimeline
            .to(cards[i], { scale: 0.9, rotation: i % 2 === 0 ? -3 : 3, duration: 1, ease: 'none' }, i)
            .to(cards[i + 1], { yPercent: 0, duration: 1, ease: 'none' }, i)
        }

        ScrollTrigger.refresh()
      })

      return () => {
        cancelAnimationFrame(rafId)
        ScrollTrigger.getAll().forEach((st) => st.kill())
      }
    },
    { scope: containerRef, dependencies: [items] }
  )

  return { containerRef }
}