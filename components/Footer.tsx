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
          <svg
            width="22"
            height="22"
            viewBox="0 0 142 142"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0 opacity-60 group-hover:opacity-80 transition-opacity duration-300"
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
          <span className="text-xs tracking-[0.18em] uppercase text-slate-500">
            Fieldstone<span style={{ color: '#1D8FE4', opacity: 0.75 }} className="ml-2">Analytics</span>
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
