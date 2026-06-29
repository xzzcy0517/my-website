'use client'

import { motion } from 'framer-motion'
import type { Platform } from '@/types'

const iconMap: Record<Platform['icon'], React.ReactNode> = {
  video: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  music: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  tv: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  ),
  book: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
}

const iconItem = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
}

interface PlatformIconProps {
  platform: Platform
  index: number
  onClick: () => void
}

export default function PlatformIcon({ platform, index, onClick }: PlatformIconProps) {
  const glowColor = platform.color === 'accent-warm' ? 'rgba(212, 165, 116, 0.3)' : 'rgba(94, 234, 212, 0.3)'
  const accentClass = platform.color === 'accent-warm' ? 'text-accent-warm' : 'text-accent-cool'
  const isClickable = !!platform.url

  return (
    <motion.button
      custom={index}
      variants={iconItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={
        isClickable
          ? {
              scale: 1.08,
              boxShadow: `0 0 24px ${glowColor}, 0 0 48px ${glowColor}`,
              borderColor: platform.color === 'accent-warm' ? 'rgba(212, 165, 116, 0.4)' : 'rgba(94, 234, 212, 0.4)',
            }
          : {}
      }
      whileTap={isClickable ? { scale: 0.96 } : {}}
      onClick={onClick}
      className={`flex flex-col items-center gap-3 rounded-2xl border border-border bg-bg-secondary/50 px-6 py-5 backdrop-blur-sm transition-colors duration-200 min-w-[120px] min-h-[88px] ${
        isClickable ? 'cursor-pointer' : 'cursor-default opacity-70'
      }`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className={accentClass}>{iconMap[platform.icon]}</div>
      <div className="text-sm font-medium text-text-primary">{platform.name}</div>
      <div className="text-xs text-text-secondary">{platform.label}</div>
    </motion.button>
  )
}
