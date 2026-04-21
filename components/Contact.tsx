'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'

export default function Contact() {
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState('submitting')

    try {
      // Replace this simulated delay with your actual async submission logic.
      await new Promise((resolve) => setTimeout(resolve, 700))
      setSubmitState('success')
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-bg opacity-50 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(28,135,215,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(28,135,215,0.12) 50%, transparent 95%)' }}
      />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: CTA copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="h-px w-8 bg-brand-400/50" />
              <span className="text-[11px] font-mono text-brand-400/65 tracking-[0.22em] uppercase">
                Get in Touch
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="text-4xl md:text-5xl font-extralight text-slate-100 leading-[1.12] mb-7"
            >
              Let&apos;s Build Something
              <br />
              <span className="text-brand-400/85">Precise</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="text-slate-400 font-light leading-relaxed text-[17px] mb-10"
            >
              Whether you&apos;re working on next-generation orthopedic implants, autonomous robotic
              systems, or somewhere in between — we&apos;d like to understand your modeling challenges.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="flex items-center gap-3 text-sm"
            >
              <Mail size={15} className="text-brand-400/60" />
              <a
                href="mailto:hello@fieldstoneanalytics.com"
                className="interactive-link font-mono text-slate-400"
              >
                hello@fieldstoneanalytics.com
              </a>
            </motion.div>
          </div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            {submitState === 'success' ? (
              <div className="interactive-panel h-full flex flex-col items-center justify-center text-center py-16 bg-[#0d0d16]/60 border border-white/[0.05] rounded-[3px] overflow-hidden"
                style={{ ['--panel-glow-rgb' as string]: '52 211 153' }}
              >
                <div className="panel-accent-line absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-emerald-400/45 to-transparent" />
                <div
                  className="w-12 h-12 rounded-full border border-emerald-400/30 flex items-center justify-center mb-5"
                  style={{ boxShadow: '0 0 20px rgba(52,211,153,0.15)' }}
                >
                  <span className="text-emerald-400 text-lg">✓</span>
                </div>
                <h3 className="text-xl font-light text-slate-200 mb-2">Message Received</h3>
                <p className="text-sm text-slate-400 font-light">We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="interactive-panel bg-[#0d0d16]/60 border border-white/[0.05] rounded-[3px] p-8 flex flex-col gap-5 overflow-hidden"
                style={{ ['--panel-glow-rgb' as string]: '56 189 248', ['--panel-glow-x' as string]: '74%', ['--panel-glow-y' as string]: '14%' }}
              >
                <div className="panel-accent-line absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-brand-400/35 to-transparent" />

                <div className="field-shell">
                  <label className="field-label block text-[11px] font-mono text-slate-500 tracking-widest uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="field-input w-full bg-white/[0.03] border border-white/[0.07] rounded-[2px] px-4 py-3 text-sm text-slate-300 placeholder-slate-700 focus:outline-none focus:border-brand-400/40 focus:bg-white/[0.04]"
                    placeholder="Your name"
                  />
                </div>

                <div className="field-shell">
                  <label className="field-label block text-[11px] font-mono text-slate-500 tracking-widest uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="field-input w-full bg-white/[0.03] border border-white/[0.07] rounded-[2px] px-4 py-3 text-sm text-slate-300 placeholder-slate-700 focus:outline-none focus:border-brand-400/40 focus:bg-white/[0.04]"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="field-shell">
                  <label className="field-label block text-[11px] font-mono text-slate-500 tracking-widest uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="field-input w-full bg-white/[0.03] border border-white/[0.07] rounded-[2px] px-4 py-3 text-sm text-slate-300 placeholder-slate-700 focus:outline-none focus:border-brand-400/40 focus:bg-white/[0.04] resize-none"
                    placeholder="Tell us about your modeling challenges..."
                  />
                </div>

                <div aria-live="polite" className="min-h-5 text-[11px] font-mono tracking-[0.12em] uppercase">
                  {submitState === 'submitting' && <span className="text-brand-400/60">Transmitting inquiry...</span>}
                  {submitState === 'error' && <span className="text-rose-400/70">Submission unavailable. Please email us directly.</span>}
                </div>

                <button
                  type="submit"
                  disabled={submitState === 'submitting'}
                  className="button-primary group flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#050508] bg-brand-400 rounded-[2px] disabled:opacity-80 disabled:cursor-not-allowed"
                  style={{ boxShadow: '0 0 25px rgba(28,135,215,0.25)' }}
                >
                  <span>{submitState === 'submitting' ? 'Sending Message' : 'Start a Conversation'}</span>
                  <ArrowRight size={15} className="button-arrow" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
