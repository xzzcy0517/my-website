'use client'

import { motion } from 'framer-motion'

const logoContainerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const subtitleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 0.8 },
  },
}

const dividerVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.6, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export default function AnimatedTitle() {
  return (
    <motion.div
      className="flex flex-col items-center gap-5"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      {/* Logo placeholder */}
      <motion.div
        variants={logoContainerVariants}
        className="relative mb-2 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-bg-secondary/60 backdrop-blur-sm md:h-24 md:w-24"
      >
        <span className="text-3xl md:text-4xl">🧑‍💻</span>
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full ring-1 ring-accent-cool/20" />
      </motion.div>

      {/* Site name */}
      <motion.h1
        variants={titleVariants}
        className="text-2xl font-semibold tracking-wide text-text-primary md:text-4xl lg:text-5xl"
      >
        最喜欢真真的小陈
      </motion.h1>

      {/* Divider */}
      <motion.div variants={dividerVariants} className="flex items-center gap-3" aria-hidden="true">
        <div className="h-px w-8 bg-accent-warm/30" />
        <span className="text-xs text-accent-warm/60">✦</span>
        <div className="h-px w-8 bg-accent-cool/30" />
      </motion.div>

      {/* Tagline with gradient text */}
      <motion.p
        variants={subtitleVariants}
        className="bg-gradient-to-r from-accent-warm via-accent-warm to-accent-cool bg-clip-text text-base font-light text-transparent md:text-lg"
      >
        生活养生&ensp;×&ensp;科技 AI 教程
      </motion.p>
    </motion.div>
  )
}
