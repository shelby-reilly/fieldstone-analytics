'use client'
import { motion } from 'framer-motion'
import { Network, TrendingUp, Cpu, Activity, Bot } from 'lucide-react'

const capabilities = [
  {
    Icon: Network,
    label: '01',
    title: 'Digital Twin Platforms',
    body: 'High-fidelity virtual replicas of physical systems that mirror mechanical behavior in real time. Our architectures capture geometry, material properties, and dynamics that define real-world performance.',
    accent: '#38bdf8',
  },
  {
    Icon: TrendingUp,
    label: '02',
    title: 'Predictive Simulation',
    body: 'Physics-informed models that forecast system behavior before physical testing begins. Domain knowledge embedded directly into model architectures enables accurate predictions in data-sparse regimes.',
    accent: '#38bdf8',
  },
  {
    Icon: Cpu,
    label: '03',
    title: 'Data-Efficient Modeling',
    body: 'ML frameworks engineered to extract maximum signal from minimal experimental data — essential in orthopedic and robotic domains where labeled data is expensive, rare, or difficult to obtain.',
    accent: '#818cf8',
  },
  {
    Icon: Activity,
    label: '04',
    title: 'Orthopedic Applications',
    body: 'Simulation platforms purpose-built for implant design, biomechanical modeling, surgical planning, surgical execution, and longitudinal assessments — translating clinical complexity into tractable, high-confidence computational models.',
    accent: '#818cf8',
  },
  {
    Icon: Bot,
    label: '05',
    title: 'Robotic Applications',
    body: 'Predictive models for robotic motion, load estimation, and performance optimization. Simulate edge cases, stress test designs, and validate behavior before physical deployment.',
    accent: '#38bdf8',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-32 px-6 overflow-hidden">
      {/* Dot pattern background */}
      <div className="absolute inset-0 dot-bg opacity-60 pointer-events-none" />

      {/* Top glow */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(28,135,215,0.15), transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-brand-400/50" />
            <span className="text-[11px] font-mono text-brand-400/65 tracking-[0.22em] uppercase">
              Core Capabilities
            </span>
            <div className="h-px w-8 bg-brand-400/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-4xl md:text-5xl font-extralight text-slate-100 leading-tight mb-4"
          >
            Built for Precision,
            <br />
            <span className="text-brand-400/85">Designed for Complexity</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="max-w-xl mx-auto text-slate-400 font-light leading-relaxed"
          >
            Five interconnected platform capabilities — from twin architecture to domain-specific applications.
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {capabilities.map(({ Icon, label, title, body, accent }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="interactive-panel group relative bg-[#0d0d16]/70 border border-white/[0.05] rounded-[3px] p-8 overflow-hidden"
              style={{ ['--panel-glow-rgb' as string]: accent === '#38bdf8' ? '56 189 248' : '129 140 248' }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to bottom, transparent, ${accent}, transparent)` }}
              />

              <div
                className="panel-accent-line absolute top-0 inset-x-6 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}66, transparent)` }}
              />

              {/* Corner number */}
              <span className="panel-label absolute top-6 right-7 text-[11px] font-mono text-slate-700 tracking-widest">
                {label}
              </span>

              {/* Icon */}
              <div
                className="panel-icon w-10 h-10 rounded-sm flex items-center justify-center mb-6 border border-white/[0.06]"
                style={{ background: `rgba(${accent === '#38bdf8' ? '28,135,215' : '129,140,248'},0.07)` }}
              >
                <Icon
                  size={18}
                  style={{ color: accent, opacity: 0.8 }}
                />
              </div>

              <h3 className="panel-title text-[17px] font-light text-slate-200 mb-3 leading-snug">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">{body}</p>

              {/* Hover corner glow */}
              <div
                className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 100% 100%, ${accent}18 0%, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}

          {/* Final empty filler to keep grid even on lg */}
          <motion.div
            variants={cardVariants}
            className="hidden lg:block bg-[#0d0d16]/30 border border-white/[0.03] rounded-[3px] p-8"
          >
            <div className="h-full flex flex-col justify-end">
              <div className="text-[11px] font-mono text-slate-700 tracking-widest uppercase mb-2">Expanding</div>
              <p className="text-sm text-slate-700 font-light leading-relaxed">
                Our platform capabilities are actively expanding to new application domains.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
