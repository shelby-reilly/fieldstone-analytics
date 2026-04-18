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
          Our mission is to build the modeling infrastructure{' '}
          <br className="hidden md:block" />
          that makes that complexity{' '}
          <span className="text-sky-400/80">tractable.&rdquo;</span>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-slate-400 font-light leading-relaxed text-lg max-w-2xl mx-auto mb-14"
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
          <svg
            width="32"
            height="32"
            viewBox="0 0 142 142"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0 opacity-70"
          >
            <rect
              x="30" y="30" width="82" height="82"
              transform="rotate(45 71 71)"
              fill="none" stroke="#0D7AC7" strokeWidth="4" opacity="0.95"
            />
            <circle cx="71" cy="71" r="3.8"  fill="#1D8FE4" />
            <circle cx="78" cy="71" r="3.4"  fill="rgba(29,143,228,0.94)" />
            <circle cx="82" cy="77" r="3.2"  fill="rgba(29,143,228,0.90)" />
            <circle cx="81" cy="85" r="3.0"  fill="rgba(29,143,228,0.86)" />
            <circle cx="74" cy="91" r="2.8"  fill="rgba(29,143,228,0.82)" />
            <circle cx="64" cy="92" r="2.6"  fill="rgba(29,143,228,0.78)" />
            <circle cx="55" cy="87" r="2.5"  fill="rgba(29,143,228,0.74)" />
            <circle cx="49" cy="78" r="2.3"  fill="rgba(29,143,228,0.70)" />
            <circle cx="48" cy="67" r="2.2"  fill="rgba(29,143,228,0.66)" />
            <circle cx="53" cy="57" r="2.1"  fill="rgba(29,143,228,0.62)" />
            <circle cx="62" cy="50" r="2.0"  fill="rgba(29,143,228,0.58)" />
            <circle cx="74" cy="48" r="1.95" fill="rgba(29,143,228,0.54)" />
            <circle cx="86" cy="52" r="1.9"  fill="rgba(29,143,228,0.50)" />
            <circle cx="95" cy="61" r="1.85" fill="rgba(29,143,228,0.46)" />
          </svg>
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
