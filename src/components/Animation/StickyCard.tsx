'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useRef } from 'react'

interface StickyCardProps<T> {
  items: T[]
  renderCard: (item: T, index: number) => React.ReactNode
  className?: string
}

export default function StickyCard<T>({
  items,
  renderCard,
  className = '',
}: StickyCardProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      const totalCards = cards.length

      if (totalCards === 0) return

      // Initial positions
      gsap.set(cards[0], { y: '0%', scale: 1, rotation: 0 })
      for (let i = 1; i < totalCards; i++) {
        gsap.set(cards[i], { y: '100%', scale: 1, rotation: 0 })
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      })

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cards[i]
        const nextCard = cards[i + 1]
        const tiltAngle = i % 2 === 0 ? -4 : 4

        // Scale down and rotate current card
        scrollTimeline.to(
          currentCard,
          {
            scale: 0.88,
            rotation: tiltAngle,
            duration: 1,
            ease: 'none',
          },
          i
        )

        // Slide next card over top
        scrollTimeline.to(
          nextCard,
          {
            y: '0%',
            duration: 1,
            ease: 'none',
          },
          i
        )
      }

      return () => {
        scrollTimeline.kill()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className={`relative h-screen w-full overflow-hidden ${className}`}
    >
      <div className="relative flex h-full w-full items-center justify-center p-2 sm:p-4">
        <div className="relative h-[85vh] w-full max-w-work-card">
          {items.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className="absolute inset-0 h-full w-full"
            >
              {renderCard(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}