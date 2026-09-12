'use client'

import React, { useState, useEffect, Children, useRef, useLayoutEffect, HTMLAttributes, ReactNode } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Check } from 'lucide-react'

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  initialStep?: number
  onStepChange?: (step: number) => void
  onFinalStepCompleted?: () => void
  stepCircleContainerClassName?: string
  stepContainerClassName?: string
  contentClassName?: string
  footerClassName?: string
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  backButtonText?: string
  nextButtonText?: string
  disableStepIndicators?: boolean
  autoPlay?: boolean             // Add this
  autoPlayInterval?: number
  renderStepIndicator?: (props: {
    step: number
    currentStep: number
    onStepClick: (clicked: number) => void
  }) => ReactNode
}

export function AnimatedStepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  autoPlay = true,               // Add this
  autoPlayInterval = 5000,
  renderStepIndicator,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep)
  const [direction, setDirection] = useState<number>(0)
  const stepsArray = Children.toArray(children)
  const totalSteps = stepsArray.length
  const isCompleted = currentStep > totalSteps
  const isLastStep = currentStep === totalSteps

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep)
    if (newStep > totalSteps) {
      onFinalStepCompleted()
    } else {
      onStepChange(newStep)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1)
      updateStep(currentStep - 1)
    }
  }

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1)
      updateStep(currentStep + 1)
    }
  }

  const handleComplete = () => {
    setDirection(1)
    updateStep(totalSteps + 1)
  }
useEffect(() => {
    if (!autoPlay || isCompleted) return

    const timer = setInterval(() => {
      if (isLastStep) {
        setDirection(1)
        updateStep(1) // Loops back to Step 1
      } else {
        setDirection(1)
        updateStep(currentStep + 1)
      }
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [autoPlay, autoPlayInterval, currentStep, isCompleted, isLastStep])
  return (
    <div
      className={`flex w-full flex-col items-center justify-center ${rest.className || ''}`}
      {...rest}
    >
      <div
        className={`mx-auto w-full overflow-hidden rounded-3xl bg-surface-card border border-border-subtle shadow-2xl ${stepCircleContainerClassName}`}
      >
        {/* Step Indicators Header */}
        <div className={`flex w-full items-center p-6 sm:p-8 pb-4 ${stepContainerClassName}`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1
            const isNotLastStep = index < totalSteps - 1
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1)
                      updateStep(clicked)
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1)
                      updateStep(clicked)
                    }}
                  />
                )}
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
              </React.Fragment>
            )
          })}
        </div>

        {/* Dynamic Height Content Area */}
        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`px-6 sm:px-10 ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {/* Footer Actions */}
        {!isCompleted && (
          <div className={`px-6 sm:px-10 pb-8 pt-6 border-t border-border-subtle/50 ${footerClassName}`}>
            <div className={`flex items-center ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}>
              {currentStep !== 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className={`text-small font-secondary font-semibold transition-colors duration-300 hover:text-heading text-caption cursor-pointer ${
                    currentStep === 1 ? 'pointer-events-none opacity-0' : 'opacity-100'
                  }`}
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button
                type="button"
                onClick={isLastStep ? handleComplete : handleNext}
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-small font-secondary font-semibold tracking-wide text-white transition-all duration-300 hover:opacity-90 active:scale-95 cursor-pointer shadow-md"
                {...nextButtonProps}
              >
                {isLastStep ? 'Complete' : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = '',
}: {
  isCompleted: boolean
  currentStep: number
  direction: number
  children: ReactNode
  className?: string
}) {
  const [parentHeight, setParentHeight] = useState<number>(0)

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: isCompleted ? 0 : parentHeight || 'auto' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={(h) => setParentHeight(h)}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function SlideTransition({
  children,
  direction,
  onHeightReady,
}: {
  children: ReactNode
  direction: number
  onHeightReady: (height: number) => void
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight)
    }
  }, [children, onHeightReady])

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? 24 : -24,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? -24 : 24,
    opacity: 0,
  }),
}

export function Step({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="py-4 flex flex-col gap-4">
      {title && <h2 className="text-h2 font-primary font-bold tracking-tight text-heading">{title}</h2>}
      <div className="text-caption font-secondary leading-relaxed">{children}</div>
    </div>
  )
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators = false,
}: {
  step: number
  currentStep: number
  onClickStep: (clicked: number) => void
  disableStepIndicators?: boolean
}) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete'

  return (
    <motion.div
      onClick={() => !disableStepIndicators && onClickStep(step)}
      className={`relative flex items-center justify-center ${!disableStepIndicators ? 'cursor-pointer' : ''}`}
      animate={status}
    >
      <motion.div
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: 'var(--color-surface-section, #18181b)',
            color: 'var(--color-text-caption, #a1a1aa)',
            borderColor: 'var(--color-border-subtle, #27272a)',
          },
          active: {
            scale: 1,
            backgroundColor: 'var(--color-surface-card, #09090b)',
            color: 'var(--color-primary, #3b82f6)',
            borderColor: 'var(--color-primary, #3b82f6)',
          },
          complete: {
            scale: 1,
            backgroundColor: 'var(--color-primary, #3b82f6)',
            color: '#ffffff',
            borderColor: 'var(--color-primary, #3b82f6)',
          },
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-small font-bold transition-colors duration-300"
      >
        {status === 'complete' ? (
          <Check className="h-5 w-5 stroke-3" />
        ) : (
          <span>{String(step).padStart(2, '0')}</span>
        )}
      </motion.div>

      {status === 'active' && (
        <motion.div
          layoutId="active-glow"
          className="absolute -inset-1 rounded-full bg-primary/20 blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  )
}

function StepConnector({ isComplete }: { isComplete: boolean }) {
  return (
    <div className="relative mx-3 h-[2px] flex-1 overflow-hidden rounded-full bg-border-subtle">
      <motion.div
        className="absolute inset-0 bg-primary origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isComplete ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      />
    </div>
  )
}

export default AnimatedStepper