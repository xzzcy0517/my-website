'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { COLORS } from '@/lib/constants'

interface Orb {
  x: number
  y: number
  baseX: number
  baseY: number
  radius: number
  color: string
  speedX: number
  speedY: number
  phase: number
  amplitude: number
}

function createOrbs(width: number, height: number): Orb[] {
  return [
    {
      x: width * 0.25,
      y: height * 0.3,
      baseX: width * 0.25,
      baseY: height * 0.3,
      radius: Math.min(width, height) * 0.45,
      color: COLORS.accentWarm,
      speedX: 0.0003,
      speedY: 0.0004,
      phase: 0,
      amplitude: 80,
    },
    {
      x: width * 0.75,
      y: height * 0.6,
      baseX: width * 0.75,
      baseY: height * 0.6,
      radius: Math.min(width, height) * 0.35,
      color: COLORS.accentCool,
      speedX: 0.0005,
      speedY: 0.0003,
      phase: Math.PI / 3,
      amplitude: 60,
    },
    {
      x: width * 0.5,
      y: height * 0.4,
      baseX: width * 0.5,
      baseY: height * 0.4,
      radius: Math.min(width, height) * 0.5,
      color: COLORS.accentWarm,
      speedX: 0.0002,
      speedY: 0.0005,
      phase: (Math.PI * 2) / 3,
      amplitude: 50,
    },
  ]
}

export default function GlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const orbsRef = useRef<Orb[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)
  const isMobile = useIsMobile()

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = window.innerWidth
    const height = window.innerHeight

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (ctx) ctx.scale(dpr, dpr)

    // Recreate orbs on resize
    orbsRef.current = createOrbs(width, height)
  }, [])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [resize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      timeRef.current += 1
      const t = timeRef.current
      const width = window.innerWidth
      const height = window.innerHeight
      const mouse = mouseRef.current
      const orbs = orbsRef.current
      const orbCount = isMobile ? 2 : 3

      // Clear with bg color
      ctx.clearRect(0, 0, width, height)

      // Draw orbs
      for (let i = 0; i < orbCount; i++) {
        const orb = orbs[i]
        if (!orb) continue

        // Calculate drift position using sinusoidal movement
        const driftX = Math.sin(t * orb.speedX + orb.phase) * orb.amplitude
        const driftY = Math.cos(t * orb.speedY + orb.phase) * orb.amplitude

        // Mouse attraction (subtle)
        const dx = mouse.x - orb.baseX
        const dy = mouse.y - orb.baseY
        const mouseDist = Math.sqrt(dx * dx + dy * dy)
        const maxMouseInfluence = 30
        const mouseInfluence = Math.max(0, 1 - mouseDist / 800) * maxMouseInfluence
        const mouseAngle = Math.atan2(dy, dx)
        const mouseX = Math.cos(mouseAngle) * mouseInfluence
        const mouseY = Math.sin(mouseAngle) * mouseInfluence

        orb.x = orb.baseX + driftX + mouseX
        orb.y = orb.baseY + driftY + mouseY

        // Draw radial gradient glow
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)

        if (orb.color === COLORS.accentWarm) {
          gradient.addColorStop(0, 'rgba(212, 165, 116, 0.15)')
          gradient.addColorStop(0.3, 'rgba(212, 165, 116, 0.06)')
          gradient.addColorStop(0.6, 'rgba(212, 165, 116, 0.02)')
          gradient.addColorStop(1, 'rgba(8, 8, 12, 0)')
        } else {
          gradient.addColorStop(0, 'rgba(94, 234, 212, 0.12)')
          gradient.addColorStop(0.3, 'rgba(94, 234, 212, 0.05)')
          gradient.addColorStop(0.6, 'rgba(94, 234, 212, 0.015)')
          gradient.addColorStop(1, 'rgba(8, 8, 12, 0)')
        }

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      }

      // Add subtle floating particles only on non-mobile
      if (!isMobile) {
        for (let i = 0; i < 15; i++) {
          const px =
            (Math.sin(t * 0.002 + i * 1.7) * width) / 2 +
            width / 2 +
            Math.cos(t * 0.003 + i) * 100
          const py =
            (Math.cos(t * 0.0025 + i * 2.1) * height) / 2 +
            height / 2 +
            Math.sin(t * 0.002 + i) * 100
          const alpha = 0.15 + Math.sin(t * 0.01 + i) * 0.08
          const isWarm = i % 3 !== 0
          const pColor = isWarm
            ? `rgba(212, 165, 116, ${alpha})`
            : `rgba(94, 234, 212, ${alpha})`

          ctx.beginPath()
          ctx.arc(px, py, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = pColor
          ctx.fill()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isMobile])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
