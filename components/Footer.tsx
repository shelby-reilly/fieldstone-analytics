const links = [
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Technology', href: '#technology' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-5 h-5 shrink-0">
            <div className="absolute inset-0 border border-sky-400/35 rotate-45 group-hover:border-sky-400/60 transition-colors duration-300" />
            <div className="absolute inset-[3px] bg-sky-400/10 rotate-45" />
          </div>
          <span className="text-xs tracking-[0.18em] uppercase text-slate-500">
            Fieldstone<span className="text-sky-400/50 ml-2">Analytics</span>
          </span>
        </a>

        {/* Nav */}
        <nav className="flex flex-wrap justify-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs text-slate-700 hover:text-slate-400 transition-colors duration-200 tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <div className="text-xs font-mono text-slate-800 tracking-wide">
          © {new Date().getFullYear()} Fieldstone Analytics, LLC
        </div>
      </div>
    </footer>
  )
}
