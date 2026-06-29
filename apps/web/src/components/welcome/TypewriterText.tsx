'use client'

import { motion } from 'framer-motion'
import { useTypewriter } from '@/hooks/useTypewriter'
import { INTRO_TEXTS } from '@/lib/constants'

interface TypewriterTextProps {
  enabled?: boolean
}

export default function TypewriterText({ enabled = true }: TypewriterTextProps) {
  const { displayedTexts, currentLineIndex, state, isCursorVisible } = useTypewriter({
    texts: [...INTRO_TEXTS],
    speed: 55,
    startDelay: 400,
    enabled,
  })

  return (
    <div className="space-y-3 text-lg leading-relaxed text-text-primary md:text-xl lg:text-2xl">
      {INTRO_TEXTS.map((_, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: i <= currentLineIndex ? 1 : 0.3 }}
          transition={{ duration: 0.4 }}
          className="flex items-start gap-1"
        >
          <span className="text-accent-cool/60 font-mono text-sm mt-1 mr-1 select-none">
            {i <= currentLineIndex ? '>' : ' '}
          </span>
          <span>
            {displayedTexts[i] ?? ''}
            {/* Show cursor on the current line being typed */}
            {i === currentLineIndex && state !== 'done' && (
              <span
                className={`ml-0.5 inline-block w-[2px] h-[1.1em] align-text-bottom transition-opacity duration-100 ${
                  isCursorVisible ? 'bg-accent-cool opacity-80' : 'bg-transparent'
                }`}
              />
            )}
            {/* Show completed marker */}
            {i === currentLineIndex && state === 'done' && (
              <span className="ml-1 text-accent-cool/50 select-none">▎</span>
            )}
          </span>
        </motion.p>
      ))}
    </div>
  )
}
