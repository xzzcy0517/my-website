'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollTrigger } from '@/hooks/useScrollTrigger'
import { platforms, wechatPublic } from '@/lib/platforms'
import PlatformIcon from './PlatformIcon'
import WechatQRButton from './WechatQRButton'
import QRCodeModal from './QRCodeModal'

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

interface PlatformSectionProps {
  id?: string
}

export default function PlatformSection({ id }: PlatformSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { ref, isInView } = useScrollTrigger({
    threshold: 0.15,
    triggerOnce: true,
    rootMargin: '0px 0px -30px 0px',
  })

  return (
    <>
      <section
        ref={ref}
        id={id}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24"
      >
        <div
          className={`flex flex-col items-center gap-8 transition-all duration-1000 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Heading */}
          <motion.div
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col items-center gap-3"
          >
            <h2 className="text-2xl font-semibold tracking-wide text-text-primary md:text-3xl">
              🔗 找到我
            </h2>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-border-hover to-transparent" />
          </motion.div>

          {/* Platform Grid */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            {platforms.map((platform, i) => (
              <PlatformIcon
                key={platform.id}
                platform={platform}
                index={i}
                onClick={() => window.open(platform.url, '_blank', 'noopener,noreferrer')}
              />
            ))}
          </div>

          {/* WeChat QR Button */}
          <WechatQRButton onClick={() => setIsModalOpen(true)} />
        </div>
      </section>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        qrcodeSrc={wechatPublic.qrcodePath}
      />
    </>
  )
}
