'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { UseTypewriterOptions, UseTypewriterReturn, TypewriterState } from '@/types'

export function useTypewriter({
  texts,
  speed = 60,
  startDelay = 500,
  enabled = true,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayedTexts, setDisplayedTexts] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [state, setState] = useState<TypewriterState>('idle')
  const [isCursorVisible, setIsCursorVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasStartedRef = useRef(false)

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setIsCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Start typing after delay — but only when enabled
  useEffect(() => {
    if (!enabled || hasStartedRef.current) return

    hasStartedRef.current = true
    const startTimer = setTimeout(() => {
      setState('typing')
    }, startDelay)

    return () => clearTimeout(startTimer)
  }, [enabled, startDelay])

  // Typewriter effect
  useEffect(() => {
    if (state !== 'typing') return

    const currentText = texts[currentLineIndex]
    if (!currentText) {
      setState('done')
      return
    }

    if (currentCharIndex < currentText.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedTexts((prev) => {
          const updated = [...prev]
          if (updated.length <= currentLineIndex) {
            updated.push(currentText[currentCharIndex]!)
          } else {
            updated[currentLineIndex] = currentText.slice(0, currentCharIndex + 1)
          }
          return updated
        })
        setCurrentCharIndex((prev) => prev + 1)
      }, speed)
    } else {
      // Line complete, move to next
      if (currentLineIndex < texts.length - 1) {
        timerRef.current = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1)
          setCurrentCharIndex(0)
        }, speed * 4) // Longer pause between lines
      } else {
        setState('done')
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [state, currentLineIndex, currentCharIndex, texts, speed])

  const reset = useCallback(() => {
    setDisplayedTexts([])
    setCurrentLineIndex(0)
    setCurrentCharIndex(0)
    setState('idle')
    setTimeout(() => setState('typing'), startDelay)
  }, [startDelay])

  return { displayedTexts, currentLineIndex, currentCharIndex, state, isCursorVisible }
}
