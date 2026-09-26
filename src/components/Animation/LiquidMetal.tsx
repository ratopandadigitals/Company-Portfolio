'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import { LiquidMetal as LiquidMetalShader } from '@paper-design/shaders-react'

type LiquidMetalProps = {
  className?: string
  speed?: number
  repetition?: number
  distortion?: number
  scale?: number
}

/**
 * Reads the resolved value of a CSS custom property at runtime.
 */
function useCssVar(name: string, fallback: string) {
  const [value, setValue] = useState(fallback)

  useEffect(() => {
    const updateValue = () => {
      const resolved = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim()

      if (resolved) {
        setValue(resolved)
      }
    }

    updateValue()

    const observer = new MutationObserver(updateValue)

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [name])

  return value
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => {
      mediaQuery.removeEventListener('change', updatePreference)
    }
  }, [])

  return prefersReducedMotion
}

export const LiquidMetal = memo(function LiquidMetal({
  className = '',
  speed = 0.4,
  repetition = 4,
  distortion = 0.15,
  scale = 1,
}: LiquidMetalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const prefersReducedMotion = usePrefersReducedMotion()

  const primary = useCssVar('--primary-500', '#888888')

  useEffect(() => {
    const element = containerRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const effectiveSpeed =
    prefersReducedMotion || !isVisible ? 0 : speed

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden ${className}`.trim()}
    >
      <LiquidMetalShader
        colorBack={primary}
        colorTint='#ffffff'
        speed={effectiveSpeed}
        repetition={repetition}
        distortion={distortion}
        softness={0}
        shiftRed={0.3}
        shiftBlue={-0.3}
        angle={45}
        shape='none'
        scale={scale}
        fit='cover'
        maxPixelCount={1920 * 1080}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
})

LiquidMetal.displayName = 'LiquidMetal'

export default LiquidMetal