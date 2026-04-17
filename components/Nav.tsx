'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Technology', href: '#technology' },
  { label: 'About', href: '#about' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050508]/85 backdrop-blur-2xl border-b border-white/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo mark */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-6 h-6 shrink-0">
            <div className="absolute inset-0 border border-sky-400/50 rotate-45 group-hover:border-sky-400/80 transition-colors duration-300" />
            <div className="absolute inset-[4px] bg-sky-400/15 rotate-45 group-hover:bg-sky-400/25 transition-colors duration-300" />
          </div>
          <span className="text-sm tracking-[0.18em] uppercase text-slate-200 font-light">
            Fieldstone
            <span className="text-sky-400/70 ml-2">Analytics</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-slate-500 hover:text-slate-200 transition-colors duration-200 tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-[13px] font-medium text-sky-400 border border-sky-400/30 rounded-[2px] hover:bg-sky-400/8 hover:border-sky-400/60 transition-all duration-200 tracking-wide"
        >
          Contact
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          aria-label="Toggle navigation"
        >
          <span
            className={`h-px bg-slate-400 transition-all duration-300 ${open ? 'w-5 rotate-45 translate-y-[6px]' : 'w-5'}`}
          />
          <span
            className={`h-px bg-slate-400 transition-all duration-300 w-5 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-px bg-slate-400 transition-all duration-300 ${open ? 'w-5 -rotate-45 -translate-y-[6px]' : 'w-4'}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#0d0d16]/95 backdrop-blur-2xl border-t border-white/[0.04]"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-slate-300 hover:text-sky-400 transition-colors text-sm tracking-wide"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-2.5 text-sm text-sky-400 border border-sky-400/30 rounded-[2px] text-center hover:bg-sky-400/8 transition-colors"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
