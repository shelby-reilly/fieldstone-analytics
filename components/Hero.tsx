'use client'
import { motion } from 'framer-motion'
import HeroCanvas from './HeroCanvas'

const tags = ['Orthopedic Systems', 'Robotic Applications', 'Predictive Simulation', 'Data-Efficient AI']

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated particle mesh */}
      <HeroCanvas />

      {/* Radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% 38%, rgba(28,135,215,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-b from-transparent to-[#050508] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">

        {/* Status chip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-10 rounded-full border border-brand-400/20 bg-brand-400/[0.04] backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400" />
          </span>
          <span className="text-[11px] font-mono text-brand-400/75 tracking-[0.18em] uppercase">
            Digital Twin Platforms · Predictive Modeling
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl sm:text-6xl md:text-[5.5rem] font-extralight tracking-tight text-slate-100 leading-[1.08] mb-7"
        >
          Predictive Intelligence
          <br />
          <span
            className="font-light text-brand-400"
            style={{ textShadow: '0 0 60px rgba(28,135,215,0.35)' }}
          >
            For Physical Systems
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="max-w-2xl mx-auto text-lg text-slate-400 font-light leading-relaxed mb-12"
        >
          Fieldstone Analytics builds data-efficient digital twin platforms that model, simulate, and
          optimize orthopedic and robotic systems — bringing predictive foresight to the most
          demanding engineering challenges.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.92 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <a
            href="#what-we-do"
            className="px-9 py-3.5 text-sm font-medium text-[#050508] bg-brand-400 rounded-[2px] hover:bg-brand-300 transition-colors duration-200 tracking-wide"
            style={{ boxShadow: '0 0 35px rgba(28,135,215,0.35), 0 8px 24px rgba(0,0,0,0.3)' }}
          >
            Explore Our Platform
          </a>
          <a
            href="#contact"
            className="px-9 py-3.5 text-sm font-medium text-slate-300 border border-white/10 rounded-[2px] hover:border-brand-400/40 hover:text-brand-400 transition-all duration-200 tracking-wide"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Tag line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.15 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3"
        >
          {tags.map((tag) => (
            <span key={tag} className="text-[11px] font-mono text-slate-600 tracking-[0.2em] uppercase">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-slate-700 tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-700 to-transparent" />
      </motion.div>
    </section>
  )
}
