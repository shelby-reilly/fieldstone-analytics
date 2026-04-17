'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  opacity: number
  phase: number
  phaseSpeed: number
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0
    const particles: Particle[] = []
    const COUNT = window.innerWidth < 768 ? 45 : 90
    const CONNECT = 140

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = () => {
      particles.length = 0
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.1 + 0.4,
          opacity: Math.random() * 0.45 + 0.15,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.008 + Math.random() * 0.016,
        })
      }
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      t += 0.008

      // Slow horizontal scan glow
      const scanY = (t * 30) % (h + 200) - 100
      const sg = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60)
      sg.addColorStop(0, 'transparent')
      sg.addColorStop(0.5, 'rgba(56,189,248,0.025)')
      sg.addColorStop(1, 'transparent')
      ctx.fillStyle = sg
      ctx.fillRect(0, scanY - 60, w, 120)

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECT) {
            const a = (1 - d / CONNECT) * 0.22
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(56,189,248,${a})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }
      }

      // Particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.phase += p.phaseSpeed
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        const pulse = Math.sin(p.phase)
        const o = Math.max(0.08, p.opacity + pulse * 0.08)
        const radius = p.r + pulse * 0.4

        // Outer glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 7)
        grd.addColorStop(0, `rgba(56,189,248,${o * 0.5})`)
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius * 7, 0, Math.PI * 2)
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(186,230,253,${o})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    const onResize = () => { setSize(); spawn() }
    window.addEventListener('resize', onResize)
    setSize()
    spawn()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  )
}
