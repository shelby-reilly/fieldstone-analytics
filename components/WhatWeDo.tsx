'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SystemVisual, { type PillarKey } from './SystemVisual'

// Staggered fade-up preset for left-column text
const up = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: true, margin: '-80px' },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
})

// Pillar definitions — key maps to SystemVisual highlight state
const PILLARS: { key: PillarKey; value: string; label: string; hint: string }[] = [
  {
    key:   'twins',
    value: 'Digital Twins',
    label: 'Platform Foundation',
    hint:  'Hover to illuminate the twin relationship',
  },
  {
    key:   'efficient',
    value: 'Data-Efficient',
    label: 'ML Architecture',
    hint:  'Hover to activate data flow',
  },
  {
    key:   'predictive',
    value: 'Predictive',
    label: 'System Intelligence',
    hint:  'Hover to energize the outer field',
  },
]

export default function WhatWeDo() {
  const [hovPillar, setHovPillar] = useState<PillarKey>(null)

  return (
    <section id="what-we-do" className="relative py-32 px-6 overflow-hidden">

      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Ambient blue glow — left side */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[520px] h-[520px]
                      rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(28,135,215,0.030) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* ── Left column: copy ── */}
          <div>

            {/* Eyebrow */}
            <motion.div {...up(0)} className="flex items-center gap-3 mb-7">
              <div className="h-px w-8 bg-brand-400/50" />
              <span className="text-[11px] font-mono text-brand-400/65 tracking-[0.22em] uppercase">
                Our Mission
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2 {...up(0.08)}
              className="text-4xl md:text-5xl font-extralight text-slate-100 leading-[1.12] mb-7">
              Where Simulation Meets
              <br />
              <span className="text-brand-400/90">Intelligent Prediction</span>
            </motion.h2>

            {/* Body paragraphs */}
            <motion.p {...up(0.16)}
              className="text-slate-400 text-[17px] font-light leading-relaxed mb-5">
              We develop modeling platforms that bridge physical systems and predictive intelligence.
              By fusing digital twin architecture with data-efficient machine learning, we create
              simulation environments that accurately replicate the behavior of complex orthopedic
              and robotic systems.
            </motion.p>

            <motion.p {...up(0.22)} className="text-slate-400 leading-relaxed mb-12">
              Our approach reduces the gap between model and reality — giving engineers and
              researchers a reliable predictive lens before physical testing begins, enabling faster
              iteration, higher-confidence decisions, and scalable insight from limited data.
            </motion.p>

            {/* Interactive pillars */}
            <motion.div {...up(0.30)} className="flex gap-8">
              {PILLARS.map(({ key, value, label }) => {
                const active = hovPillar === key
                return (
                  <button
                    key={key}
                    className="text-left group focus:outline-none"
                    onMouseEnter={() => setHovPillar(key)}
                    onMouseLeave={() => setHovPillar(null)}
                    onFocus={()    => setHovPillar(key)}
                    onBlur={()     => setHovPillar(null)}
                    aria-label={`Highlight ${value} in diagram`}
                  >
                    {/* Value label */}
                    <div className="flex items-center gap-1.5 mb-1">
                      {/* Active indicator dot */}
                      <span
                        className="inline-block w-1 h-1 rounded-full shrink-0 transition-all duration-300"
                        style={{
                          background:  active ? '#38bdf8' : 'rgba(28,135,215,0.3)',
                          boxShadow:   active ? '0 0 6px rgba(28,135,215,0.8)' : 'none',
                          transform:   active ? 'scale(1.4)' : 'scale(1)',
                        }}
                      />
                      <span
                        className="text-sm font-mono transition-all duration-300"
                        style={{ color: active ? '#38bdf8' : 'rgba(28,135,215,0.6)' }}
                      >
                        {value}
                      </span>
                    </div>
                    {/* Sub-label */}
                    <div
                      className="text-[11px] uppercase tracking-wider font-mono transition-all duration-300 pl-2.5"
                      style={{ color: active ? 'rgba(148,163,184,0.7)' : 'rgba(71,85,105,1)' }}
                    >
                      {label}
                    </div>
                  </button>
                )
              })}
            </motion.div>

          </div>

          {/* ── Right column: interactive visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SystemVisual hoveredPillar={hovPillar} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
