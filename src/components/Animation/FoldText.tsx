import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type FoldTextProps = {
  text: string
  splitBy?: 'char' | 'word'
  hinge?: 'top' | 'bottom'
  duration?: number
  stagger?: number
  ease?: string
  perspective?: number
  fontSize?: string
  fontWeight?: number
  color?: string
}

const FoldText = (props: FoldTextProps) => {

  const splitBy = props.splitBy || 'char'
  const hinge = props.hinge || 'top'
  const duration = props.duration || 0.65
  const stagger = props.stagger || 0.045
  const ease = props.ease || 'power3.out'
  const perspective = props.perspective || 700
  const fontSize = props.fontSize || 'clamp(1.75rem, 3.5vw, 2.75rem)'
  const fontWeight = props.fontWeight || 800
  const color = props.color || 'currentColor'

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const items = containerRef.current.querySelectorAll('.fold-item')

    const animation = gsap.fromTo(
      items,
      {
        rotateX: hinge === 'top' ? -90 : 90,
        opacity: 0,
        transformOrigin: hinge === 'top' ? 'top center' : 'bottom center',
      },
      {
        rotateX: 0,
        opacity: 1,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    )

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [props.text, duration, stagger, ease, hinge])

  const elements = splitBy === 'char' ? props.text.split('') : props.text.split(' ')

  return (
    <div
      ref={containerRef}
      aria-label={props.text}
      className='inline-flex flex-wrap overflow-hidden'
      style={{
        perspective: `${perspective}px`,
        fontSize,
        fontWeight,
        color,
      }}
    >
      {elements.map((char, index) => (
        <span
          key={`${char}-${index}`}
          className='fold-item inline-block transform-gpu preserve-3d'
          style={{
            willChange: 'transform, opacity',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}

export default FoldText