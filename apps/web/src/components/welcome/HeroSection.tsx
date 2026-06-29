'use client'

import type { ReactNode } from 'react'

interface HeroSectionProps {
  children: ReactNode
  scrollToId: string
}

export default function HeroSection({ children, scrollToId }: HeroSectionProps) {
  const handleScrollClick = () => {
    const el = document.getElementById(scrollToId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="flex flex-col items-center gap-6" style={{ marginTop: '-5vh' }}>
        {children}
      </div>

      {/* Scroll hint */}
      <button
        onClick={handleScrollClick}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-40 transition-opacity hover:opacity-80"
        aria-label="向下滚动"
        style={{ background: 'none', border: 'none', padding: 0 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-secondary"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </button>
    </section>
  )
}
