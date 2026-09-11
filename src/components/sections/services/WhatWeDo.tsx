'use client'

import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import Section from '@/components/atoms/Section'
import Container from '@/components/atoms/Container'
import FoldText from '@/components/Animation/FoldText'
import { SERVICES_DATA, ServiceItem } from './Service'
import { LetterCascade } from '@/components/Animation/HoverText'

type WhatWeDoProps = {
  eyebrow?: string
  heading?: string
  services?: ServiceItem[]
}

const WhatWeDo = (props: WhatWeDoProps) => {
  const eyebrow = props.eyebrow || 'Services'
  const heading = props.heading || 'What We Can Do For You'
  const services = props.services || SERVICES_DATA

  const [activeItem, setActiveItem] = useState<ServiceItem | null>(null)

  // Split services into 2 rows preserving custom width layout
 const columns = useMemo(() => {
  
  return [
    { id: 1, elements: services.slice(0, 2) },
    { id: 2, elements: services.slice(2) },
  ]
}, [services]
  )

  return (
    <Section className="w-full bg-surface-page py-stack-section overflow-hidden">
      <Container className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header strictly styled with design tokens */}
        <div className="flex flex-col gap-2 text-heading">
          <span className="text-caption font-mono tracking-wider uppercase block">
            {eyebrow}
          </span>
          <FoldText
            text={heading}
            splitBy="char"
            hinge="top"
            duration={0.20}
            stagger={0.045}
            ease="power3.out"
            perspective={700}
            fontSize="clamp(1.75rem, 3.5vw, 2.75rem)"
            fontWeight={800}
          />
        </div>

        {/* Gallery / Morph Stage */}
        <div className="h-full w-full flex flex-col items-center justify-center gap-5 relative min-h-[480px] hover:cursor-pointer shadow-lg transition-shadow duration-300">
          {/* Matrix Row Layout preserving item.width */}
          {!activeItem && (
          <motion.div
            className="flex flex-col gap-5 w-full items-center"
            layout
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ pointerEvents: activeItem !== null ? 'none' : 'auto' }}
          >
            {columns.map((column) => (
              <motion.div
                className="flex items-center justify-center gap-5 flex-wrap"
                key={column.id}
                animate={{ opacity: activeItem !== null ? 0 : 1 }}
                style={{ willChange: 'opacity' }}
              >
                {column.elements.map((ele) => (
                  <ServiceCard
                    item={ele}
                    key={ele.id}
                  
                    onClick={() => setActiveItem(ele)}
                  />
                ))}
              </motion.div>
            ))}
          </motion.div>
          )}
          {/* Active Card Expanded View */}
          <AnimatePresence mode="popLayout">
            {activeItem && (
              <motion.div
                key="active-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{ willChange: 'opacity' }}
                className="absolute inset-0 w-full h-full overflow-hidden"
              >
                <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-8 overflow-hidden z-20">
                  {/* Expanded Hero Card */}
                  <motion.div
                   
                      layoutId={`card-${activeItem.id}`}
                      className=" group relative w-full max-w-[460px] min-h-[420px] rounded-2xl cursor-pointer overflow-hidden border border-border-subtle bg-surface-card shadow-2xl shrink-0"
                      onClick={() => setActiveItem(null)}
                    >
                    <img
                      src={activeItem.image}
                      alt={activeItem.title}
                      className="absolute inset-0 w-full h-full object-cover scale-110 filter blur-xs brightness-80 transition-transform duration-500 group-hover:scale-115"
                    />

                    {/* High contrast gradient overlay using surface tokens */}
                    <div className="absolute inset-0 bg-linear-to-t to-transparent flex flex-col p-6 sm:p-8 gap-3 text-left pointer-events-auto">
                    <LetterCascade
                                text={activeItem.title}
                                className="text-heading group-hover:text-primary font-primary font-bold text-size-h3 sm:text-2xl tracking-tight mt-4 mb-4 transition-colors duration-300"
                              />
                              {activeItem.description && (
                                <p className="text-size-body font-secondary leading-relaxed text-heading/90 line-clamp-3 mt-3 transition-transform duration-300 group-hover:-translate-y-1">
                                  {activeItem.description}
                                </p>
                      )}

                      {/* Tag Pills matching ServiceProcess token structure */}
                      {activeItem.tags && activeItem.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1 w-full">
                          {activeItem.tags.map((tag, tagIndex) => (
                            <div
                              key={tagIndex}
                             className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full  font-secondary text-heading text-size-caption font-semibold border border-border-subtle/40 backdrop-blur-md w-fit whitespace-nowrap"
                            >
                              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-success text-white shrink-0">
                                <Check className="w-2.5 h-2.5 stroke-3" />
                              </span>
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Footer pricing & timeline meta info */}
                      {(activeItem.price || activeItem.timeline) && (
                        <div className="flex items-center gap-32 text-size-body mt-auto pt-5 font-mono uppercase text-heading border-t border-border-subtle/40">
                          {activeItem.price && <span>{activeItem.price}</span>}
                         {activeItem.timeline && (
                          <div className="flex items-center gap-1.5">
                            {activeItem.price && (
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            )}
                            <span>{activeItem.timeline}</span>
                          </div>
    )}
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Thumbnail Switcher */}
                  <motion.div
                    className="flex flex-row lg:flex-col gap-4 justify-center items-center flex-wrap"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.2 }}
                  >
                    {services
                      .filter((ele) => ele.id !== activeItem.id)
                      .map((ele) => (
                        <ServiceCard
                          key={ele.id}
                          item={ele}
                          onClick={() => setActiveItem(ele)}
                          isSmall
                        />
                      ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  )
}
const ServiceCard = (props: {
  item: ServiceItem
  onClick: () => void
  isSmall?: boolean
}) => {
  const cardWidth = props.isSmall ? 80 : props.item.width || 250
  const cardHeight = props.isSmall ? 80 : 180
  const cardLabel = props.item.label || props.item.title

  return (
    <motion.div
      style={{
        width: cardWidth,
        minWidth: cardWidth,
        height: cardHeight,
      }}
      className={cn(
        'group relative shrink-0 overflow-hidden rounded-2xl border border-border-subtle/40  cursor-pointer'
      )}
      layoutId={props.isSmall ? undefined : `card-${props.item.id}`}
      onClick={props.onClick}
    >
      {/* Card Image */}
      <motion.img
        src={props.item.image}
        alt={props.item.title}
        className="h-full w-full object-cover  transition-transform duration-500 group-hover:scale-110"
      />

      {/* Title Overlay */}
      {!props.isSmall && (
        <div className="absolute inset-0 flex flex-col backdrop-blur-[1px] justify-end end p-4 pointer-events-auto">
          <LetterCascade
            text={cardLabel}
            frontClassName="text-heading"
    
            className= "font-secondary text-size-small font-medium uppercase tracking-wide line-clamp-2 leading-tight transition-colors duration-300"
          />
        </div>
      )}
    </motion.div>
  )
}

// const ServiceCard = (props: {
//   item: ServiceItem
//   onClick: () => void
//   isSmall?: boolean
// }) => {
//   // Respect custom width from ServiceItem
//   const cardWidth = props.isSmall ? 80 : props.item.width || 250
//   const cardHeight = props.isSmall ? 80 : 180
//   const cardLabel = props.item.label || props.item.title

//   return (
//     <motion.div
//    style={{
//   width: cardWidth,
//   minWidth: cardWidth, // <-- ADD THIS LINE
//   height: cardHeight,
// }}
//       className={cn(
//         'rounded-2xl cursor-pointer overflow-hidden relative border border-border-subtle/40 bg-surface-card shrink-0'
//       )}
//      layoutId={props.isSmall ? undefined : `card-${props.item.id}`}
//       onClick={props.onClick}
//     >
//       <motion.img
//         src={props.item.image}
//         alt={props.item.title}
//         className="w-full h-full object-cover"
//         whileHover={{ scale: 1.20 }}
//         transition={{ duration: 0.3 }}
//       />

//       {!props.isSmall && (
//        <div className="absolute inset-0 bg-linear-to-t from-surface-card/60 via-surface-card/ to-transparent flex flex-col p-6 sm:p-8 gap-3 text-left pointer-events-none">
//          <LetterCascade
//             text={cardLabel}
//             className="text-heading group-hover:text-primary font-secondary  text-size-body font-medium uppercase tracking-wider line-clamp-2 leading-tight transition-colors duration-300"
//           />
//         </div>
//       )}
//     </motion.div>
//   )
// }

export default WhatWeDo