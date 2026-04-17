'use client'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.035) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* Left: copy */}
          <div>
            <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-7">
              <div className="h-px w-8 bg-sky-400/50" />
              <span className="text-[11px] font-mono text-sky-400/65 tracking-[0.22em] uppercase">
                Our Mission
              </span>
            </motion.div>

            <motion.h2
              {...fadeUp(0.08)}
              className="text-4xl md:text-5xl font-extralight text-slate-100 leading-[1.12] mb-7"
            >
              Where Simulation Meets
              <br />
              <span className="text-sky-400/90">Intelligent Prediction</span>
            </motion.h2>

            <motion.p {...fadeUp(0.16)} className="text-slate-400 text-[17px] font-light leading-relaxed mb-5">
              We develop modeling platforms that bridge physical systems and predictive intelligence.
              By fusing digital twin architecture with data-efficient machine learning, we create
              simulation environments that accurately replicate the behavior of complex orthopedic
              and robotic systems.
            </motion.p>

            <motion.p {...fadeUp(0.22)} className="text-slate-500 leading-relaxed mb-10">
              Our approach reduces the gap between model and reality — giving engineers and
              researchers a reliable predictive lens before physical testing begins, enabling faster
              iteration, higher-confidence decisions, and scalable insight from limited data.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex gap-10">
              {[
                { value: 'Digital Twins', label: 'Platform Foundation' },
                { value: 'Data-Efficient', label: 'ML Architecture' },
                { value: 'Predictive', label: 'System Intelligence' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-sky-400 font-mono text-sm mb-1">{value}</div>
                  <div className="text-[11px] text-slate-600 uppercase tracking-wider font-mono">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SystemVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SystemVisual() {
  const nodes = [
    { cx: 200, cy: 60 },
    { cx: 340, cy: 130 },
    { cx: 310, cy: 280 },
    { cx: 90, cy: 280 },
    { cx: 60, cy: 130 },
    { cx: 200, cy: 175 }, // center
  ]

  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
    [0, 5], [1, 5], [2, 5], [3, 5], [4, 5],
  ]

  return (
    <div className="relative w-full max-w-md mx-auto lg:ml-auto">
      <div className="relative aspect-square bg-[#0d0d16]/80 border border-white/[0.05] rounded-sm overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 grid-bg opacity-50" />

        {/* SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 350"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Outer ring hints */}
          <ellipse cx="200" cy="175" rx="170" ry="140" fill="none" stroke="rgba(56,189,248,0.05)" strokeWidth="1" />
          <ellipse cx="200" cy="175" rx="110" ry="90" fill="none" stroke="rgba(56,189,248,0.07)" strokeWidth="1" />
          <ellipse cx="200" cy="175" rx="55" ry="45" fill="none" stroke="rgba(56,189,248,0.10)" strokeWidth="1" />

          {/* Edges */}
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].cx} y1={nodes[a].cy}
              x2={nodes[b].cx} y2={nodes[b].cy}
              stroke="rgba(56,189,248,0.22)"
              strokeWidth="0.6"
            />
          ))}

          {/* Outer nodes */}
          {nodes.slice(0, 5).map((n, i) => (
            <g key={i}>
              <circle cx={n.cx} cy={n.cy} r="10" fill="rgba(56,189,248,0.06)" />
              <circle cx={n.cx} cy={n.cy} r="3" fill="rgba(56,189,248,0.7)" />
            </g>
          ))}

          {/* Center node — pulsing */}
          <circle cx="200" cy="175" r="20" fill="rgba(56,189,248,0.08)" className="animate-pulse" />
          <circle cx="200" cy="175" r="12" fill="rgba(56,189,248,0.12)" />
          <circle cx="200" cy="175" r="5" fill="rgba(186,230,253,0.9)" style={{ filter: 'blur(0.5px)' }} />
        </svg>

        {/* Readout labels */}
        <div className="absolute top-4 left-4">
          <div className="text-[10px] font-mono text-sky-400/45 tracking-widest uppercase">Physical System</div>
          <div className="text-[11px] text-slate-600 mt-0.5">Biomechanical Model</div>
        </div>
        <div className="absolute top-4 right-4 text-right">
          <div className="text-[10px] font-mono text-indigo-400/45 tracking-widest uppercase">Digital Twin</div>
          <div className="text-[11px] text-slate-600 mt-0.5">Predictive State</div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px rgba(52,211,153,0.8)' }} />
            <span className="text-[10px] font-mono text-emerald-400/65 tracking-wider uppercase">Model Active</span>
          </div>
          <div className="text-[10px] font-mono text-slate-700 mt-1">Δt = 0.02 ms</div>
        </div>
        <div className="absolute bottom-4 right-4 text-right">
          <div className="text-[10px] font-mono text-slate-700">STATE_v3.1</div>
        </div>

        {/* Center label overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="mt-16 text-center">
            <div className="text-[10px] font-mono text-sky-400/40 uppercase tracking-widest mb-1">Twin State</div>
            <div className="text-xl font-extralight text-slate-400">Δx → Δf</div>
          </div>
        </div>
      </div>
    </div>
  )
}
