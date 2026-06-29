'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { UseScrollTriggerOptions, UseScrollTriggerReturn } from '@/types'

export function useScrollTrigger({
  threshold = 0.3,
  rootMargin = '0px',
  triggerOnce = true,
}: UseScrollTriggerOptions = {}): UseScrollTriggerReturn {
  const [isInView, setIsInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const ref = useCallback(
    (node: HTMLElement | null) => {
      // Cleanup previous observer
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      if (!node) return

      elementRef.current = node

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          const inView = entry?.isIntersecting ?? false
          setIsInView(inView)
          if (inView) {
            setHasTriggered(true)
            if (triggerOnce && observerRef.current) {
              observerRef.current.disconnect()
            }
          }
        },
        { threshold, rootMargin },
      )

      observerRef.current.observe(node)
    },
    [threshold, rootMargin, triggerOnce],
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return { ref, isInView, hasTriggered }
}
