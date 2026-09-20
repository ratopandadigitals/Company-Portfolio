'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export type DriftItem = {
  image: string
  title?: string
  href?: string
}

type SimpleDriftWallProps = {
  items: DriftItem[]
  columns?: number
  gap?: number
  duration?: number
  direction?: 'up' | 'down'
  tilt?: number
  className?: string
}

const SimpleDriftWall = ({
  items,
  columns = 5,
  gap = 16,
  duration = 18,
  direction = 'up',
  tilt = 10,
  className = '',
}: SimpleDriftWallProps) => {
  const columnItems: DriftItem[][] = Array.from({ length: columns }, () => [])
  items.forEach((item, i) => columnItems[i % columns].push(item))

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ perspective: '1400px' }}
    >
      <div
        className='absolute inset-0 flex items-center justify-center gap-4 px-4'
        style={{
          transform: `rotateX(${tilt}deg) rotateZ(-4deg) scale(1.15)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {columnItems.map((col, colIndex) => {
          const goingUp = colIndex % 2 === 0 ? direction === 'up' : direction === 'down'

          return (
            // FIX: was a fixed w-40 sm:w-52 — a fixed pixel width per
            // column left large empty gaps on either side of the whole
            // group on wide containers, since (columns * fixed width)
            // rarely equals the container's actual width. flex-1 makes
            // every column stretch to share the FULL available width
            // evenly, closing that gap regardless of screen size.
            <div key={colIndex} className='relative flex-1 min-w-0 overflow-hidden' style={{ height: '100%' }}>
              <motion.div
                className='flex flex-col'
                style={{ gap }}
                animate={{ y: goingUp ? ['0%', '-50%'] : ['-50%', '0%'] }}
                transition={{ duration, ease: 'linear', repeat: Infinity }}
              >
                {[...col, ...col].map((item, i) => (
                  <DriftTile key={i} item={item} />
                ))}
              </motion.div>
            </div>
          )
        })}
      </div>

      <div
        className='pointer-events-none absolute inset-0'
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 55%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 55%, black 85%, transparent)',
        }}
      />
    </div>
  )
}

function DriftTile({ item }: { item: DriftItem }) {
  const content = (
    <motion.div
      className='group/tile relative rounded-2xl overflow-hidden border border-border-subtle bg-surface-section shadow-lg'
      // FIX (per your feedback): tiles keep each screenshot's natural
      // shape instead of a fixed pixel height forcing an object-cover
      // crop — aspect-[4/5] gives a consistent-ish portrait box, and
      // object-contain (below, on the img) shows the WHOLE image
      // letterboxed inside it rather than cutting off text/content.
      style={{ aspectRatio: '4 / 5' }}
      initial={{ opacity: 0.55 }}
      whileHover={{ opacity: 1, scale: 1.04 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
     <Image
  src={item.image}
  alt={item.title || ''}
  fill
  sizes='(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw'
  draggable={false}
  className='object-contain select-none'
/>

Your parent al

      {/* Dim overlay — fades away on hover, restoring the "dim until
          hovered" look from the original DriftWall (its `dim`/overlay
          props did the same job with more machinery). */}
      <div className='pointer-events-none absolute inset-0 bg-surface-page/70 transition-opacity duration-300 group-hover/tile:opacity-0' />

      {item.title && (
        <div className='absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3'>
          <span className='text-small font-secondary font-semibold text-white'>{item.title}</span>
        </div>
      )}
    </motion.div>
  )

  return item.href ? (
    <a href={item.href} className='block'>
      {content}
    </a>
  ) : (
    content
  )
}

export default SimpleDriftWall