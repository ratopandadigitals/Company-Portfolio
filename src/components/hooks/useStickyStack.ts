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

type UseStickyStackOptions = {
  /**
   * Class name applied to each stacked card. Defaults to a generic,
   * domain-agnostic name so this hook works for events, testimonials,
   * portfolio pieces, or anything else — override it only if you need
   * multiple different stacks with different selectors on the same page.
   *
   * IMPORTANT: don't hardcode this string again at the call site. Apply
   * the `cardClassName` this hook RETURNS to your card elements instead
   * (see EventsSection.tsx). That way the hook is the single source of
   * truth for the selector — the query inside this file and the class
   * on your JSX can never drift out of sync / typo apart from each other.
   */
  cardSelector?: string
}

export const useStickyStack = <T>(items: T[], options?: UseStickyStackOptions) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardSelector = options?.cardSelector ?? 'sticky-stack-card'

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const rafId = requestAnimationFrame(() => {
        ScrollTrigger.getAll().forEach((st) => st.kill(true))

        // Scoped to containerRef.current, so even if two different
        // useStickyStack instances on the same page both use the default
        // selector, each only ever queries cards inside its own container.
        const cards = gsap.utils.toArray(`.${cardSelector}`, containerRef.current) as HTMLDivElement[]
        const totalCards = cards.length

        if (totalCards === 0 || !containerRef.current) return

        gsap.set(cards, { clearProps: 'all' })

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

  return { containerRef, cardClassName: cardSelector }
}