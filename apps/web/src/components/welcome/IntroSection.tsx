'use client'

import { cloneElement, isValidElement } from 'react'
import { useScrollTrigger } from '@/hooks/useScrollTrigger'
import type { ReactNode } from 'react'

interface IntroSectionProps {
  children: ReactNode
  id?: string
  scrollToId?: string
}

export default function IntroSection({ children, id, scrollToId }: IntroSectionProps) {
  const { ref, isInView } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: true,
    rootMargin: '0px 0px -50px 0px',
  })

  const handleScrollClick = () => {
    if (!scrollToId) return
    const el = document.getElementById(scrollToId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      ref={ref}
      id={id}
      className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24"
    >
      <div
        className={`max-w-2xl transition-all duration-1000 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {isValidElement(children)
          ? cloneElement(children as React.ReactElement<{ enabled: boolean }>, {
              enabled: isInView,
            })
          : children}
      </div>

      {/* Scroll hint to next section */}
      {scrollToId && (
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
      )}
    </section>
  )
}
