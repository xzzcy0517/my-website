'use client'

import { motion } from 'framer-motion'

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.6, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

interface WechatQRButtonProps {
  onClick: () => void
}

export default function WechatQRButton({ onClick }: WechatQRButtonProps) {
  return (
    <motion.button
      variants={buttonVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{
        scale: 1.04,
        boxShadow: '0 0 20px rgba(212, 165, 116, 0.3)',
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="mx-auto mt-4 flex items-center gap-3 rounded-full border border-border bg-bg-secondary/60 px-6 py-3 text-sm text-text-primary backdrop-blur-sm transition-colors hover:border-border-hover cursor-pointer min-h-[44px]"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-accent-warm"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      <span>微信公众号 · 扫码关注小陈</span>
      <span className="text-xs text-text-secondary">[点击查看二维码]</span>
    </motion.button>
  )
}
