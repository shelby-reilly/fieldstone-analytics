'use client'
import { motion } from 'framer-motion'

const pillars = [
  {
    code: 'PHYS_INF',
    title: 'Physics-Informed Learning',
    body: 'Known physical laws are embedded directly into model architectures as soft or hard constraints — reducing the solution space and enabling accurate generalization with far less training data.',
    detail: 'Governing equations as inductive bias',
  },
  {
    code: 'SURR_MDL',
    title: 'Surrogate Modeling',
    body: 'High-fidelity simulations are computationally expensive. Our surrogate models capture the input-output behavior of complex systems at a fraction of the cost, enabling rapid design-space exploration.',
    detail: 'Full-order → reduced-order fidelity mapping',
  },
  {
    code: 'STATE_EST',
    title: 'Real-Time State Estimation',
    body: 'Kalman filtering, Bayesian inference, and learned state estimators continuously update digital twin states as new sensor measurements arrive — keeping models synchronized with physical reality.',
    detail: 'Continuous measurement assimilation',
  },
  {
    code: 'MULTI_FID',
    title: 'Multi-Fidelity Simulation',
    body: 'We combine low-cost approximate models with high-fidelity simulations in a principled framework — intelligently allocating computational resources where accuracy demands them most.',
    detail: 'Hierarchical model fusion',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Technology() {
  return (
    <section id="technology" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-bg opacity-50 pointer-events-none" />
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.12), transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-sky-400/50" />
            <span className="text-[11px] font-mono text-sky-400/65 tracking-[0.22em] uppercase">
              Technology & Approach
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-4xl md:text-5xl font-extralight text-slate-100 leading-[1.12] mb-5"
          >
            Simulation, AI, and
            <br />
            <span className="text-sky-400/85">Data Working Together</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-slate-500 font-light leading-relaxed text-[17px]"
          >
            Our platform methodology combines four complementary technical pillars —
            each designed to maximize predictive accuracy while minimizing data and compute requirements.
          </motion.p>
        </div>

        {/* Pillar cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
        >
          {pillars.map(({ code, title, body, detail }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="card-hover group relative bg-[#0d0d16]/70 border border-white/[0.05] rounded-[3px] p-8 overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Code label */}
              <div className="flex items-center gap-3 mb-6">
                <span className="px-2 py-1 bg-sky-400/[0.07] border border-sky-400/[0.12] rounded-[2px] text-[10px] font-mono text-sky-400/60 tracking-widest">
                  {code}
                </span>
              </div>

              <h3 className="text-xl font-light text-slate-200 mb-4 leading-snug">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-light mb-6">{body}</p>

              {/* Detail line */}
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-sky-400/40" />
                <span className="text-[11px] font-mono text-sky-400/40 tracking-wide">{detail}</span>
              </div>

              {/* Hover bg glow */}
              <div className="absolute bottom-0 left-0 w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 0% 100%, rgba(56,189,248,0.05) 0%, transparent 70%)' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
