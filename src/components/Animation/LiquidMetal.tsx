'use client'

import React, { memo, useEffect, useState } from 'react'
import { LiquidMetal as LiquidMetalShader } from '@paper-design/shaders-react'

type LiquidMetalProps = {
  className?: string
  speed?: number
  repetition?: number
  distortion?: number
  scale?: number
}

/**
 * Reads the resolved value of a CSS custom property at runtime, instead
 * of hardcoding a hex string here. The shader needs a real color value
 * (it's a GPU uniform, not a CSS property), so it can't just be told
 * `var(--primary-500)` the way a DOM element could — but hardcoding an
 * actual hex guess would silently drift out of sync if the token ever
 * changes, and would be inventing a brand color value rather than
 * reading the one that already exists.
 */
function useCssVar(name: string, fallback: string) {
  const [value, setValue] = useState(fallback)

  useEffect(() => {
    const resolved = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    if (resolved) setValue(resolved)
  }, [name])

  return value
}

export const LiquidMetal = memo(function LiquidMetal({
  className = '',
  speed = 0.4,
  repetition = 4,
  distortion = 0.15,
  scale = 1,
}: LiquidMetalProps) {
  // Reads your actual brand primary token — whatever it's set to per
  // project (red here, green/navy on a future project) — rather than a
  // color guessed and hardcoded into this file.
  const primary = useCssVar('--primary-500', '#888888')

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`.trim()}>
      <LiquidMetalShader
        colorBack={primary}
        colorTint="#ffffff"
        speed={speed}
        repetition={repetition}
        distortion={distortion}
        softness={0}
        shiftRed={0.3}
        shiftBlue={-0.3}
        angle={45}
        shape="none"
        scale={scale}
        fit="cover"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
})

LiquidMetal.displayName = 'LiquidMetal'

export default LiquidMetal