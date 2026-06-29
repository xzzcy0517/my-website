'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/hooks/useMediaQuery'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
}

const desktopContentVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
}

const mobileContentVariants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } },
}

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  qrcodeSrc: string
}

export default function QRCodeModal({ isOpen, onClose, qrcodeSrc }: QRCodeModalProps) {
  const isMobile = useIsMobile()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Content */}
          <motion.div
            variants={isMobile ? mobileContentVariants : desktopContentVariants}
            className={`relative z-10 border border-border-hover bg-bg-secondary/90 backdrop-blur-xl ${
              isMobile
                ? 'fixed inset-x-0 bottom-0 rounded-t-2xl p-6 pb-10'
                : 'mx-4 w-full max-w-sm rounded-2xl p-8'
            }`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary cursor-pointer"
              aria-label="关闭"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* QR Code */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg font-semibold text-text-primary">微信公众号</h3>
              <p className="text-sm text-text-secondary">扫码关注小陈，获取更多内容</p>

              <div className="relative mt-2 flex aspect-square w-full max-w-[220px] items-center justify-center overflow-hidden rounded-xl border border-border bg-white">
                {/* WeChat Public Account QR Code */}
                <img
                  src={qrcodeSrc}
                  alt="微信公众号二维码"
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Drag handle on mobile */}
              {isMobile && (
                <div className="mt-2 h-1 w-10 rounded-full bg-border" />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
