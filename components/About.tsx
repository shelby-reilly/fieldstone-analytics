'use client'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="relative py-36 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(56,189,248,0.03) 0%, transparent 70%)',
        }}
      />

      {/* Horizontal rules */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(56,189,248,0.1) 50%, transparent 90%)' }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(56,189,248,0.1) 50%, transparent 90%)' }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="h-px w-8 bg-sky-400/40" />
          <span className="text-[11px] font-mono text-sky-400/55 tracking-[0.22em] uppercase">
            About & Vision
          </span>
          <div className="h-px w-8 bg-sky-400/40" />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl md:text-4xl lg:text-[2.6rem] font-extralight text-slate-200 leading-[1.3] mb-10"
        >
          &ldquo;The physical world generates{' '}
          <span className="text-sky-400/80">enormous complexity.</span>
          <br />
          Our mission is to build the modeling infrastructure
          <br className="hidden md:block" />
          that makes that complexity{' '}
          <span className="text-sky-400/80">tractable.&rdquo;</span>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-slate-500 font-light leading-relaxed text-lg max-w-2xl mx-auto mb-14"
        >
          We believe the next generation of medical devices and robotic systems will be built with
          simulation at their core. Fieldstone Analytics exists to make that future more accessible,
          more efficient, and more reliable — giving engineers, researchers, and clinicians a
          predictive lens into the systems they design, deploy, and operate.
        </motion.p>

        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="inline-flex items-center gap-4"
        >
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 border border-sky-400/40 rotate-45" />
            <div className="absolute inset-[5px] bg-sky-400/10 rotate-45" />
          </div>
          <div className="text-left">
            <div className="text-sm tracking-[0.2em] uppercase text-slate-300 font-light">
              Fieldstone Analytics
            </div>
            <div className="text-[11px] font-mono text-sky-400/40 tracking-widest mt-0.5 uppercase">
              Intelligent Modeling Platforms
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
