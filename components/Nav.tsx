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
          <svg
            width="28"
            height="28"
            viewBox="0 0 142 142"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0 transition-all duration-200 group-hover:scale-110 group-hover:brightness-125"
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
          <span className="text-sm tracking-[0.18em] uppercase text-slate-200 font-light">
            Fieldstone
            <span style={{ color: '#1D8FE4' }} className="ml-2">Analytics</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="interactive-link text-[13px] text-slate-500 tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="button-secondary hidden md:inline-flex items-center gap-2 px-5 py-2 text-[13px] font-medium text-brand-400 border border-brand-400/30 rounded-[2px] tracking-wide"
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
                  className="interactive-link w-fit text-slate-300 text-sm tracking-wide"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="button-secondary mt-2 px-4 py-2.5 text-sm text-brand-400 border border-brand-400/30 rounded-[2px] text-center"
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
