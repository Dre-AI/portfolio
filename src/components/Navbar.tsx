import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

const links = [
  { label: 'Home', id: 'home', href: '#home' },
  { label: 'About', id: 'about', href: '#about' },
  { label: 'Experience', id: 'experience', href: '#experience' },
  { label: 'Projects', id: 'projects', href: '#projects' },
  { label: 'Skills', id: 'skills', href: '#skills' },
  { label: 'Contact', id: 'contact', href: '#contact' },
]

function MagneticLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 350, damping: 22 })
  const sy = useSpring(y, { stiffness: 350, damping: 22 })

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave} className="relative">
      <a
        href={href}
        className={`relative text-sm font-medium pb-0.5 transition-colors duration-200 ${
          active ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
        }`}
      >
        {label}
        {active && (
          <motion.span
            layoutId="nav-pill"
            className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </a>
    </motion.div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links
      .map(l => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (!visible.length) return
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        )
        setActiveSection(topmost.target.id)
      },
      { threshold: 0.25, rootMargin: '-72px 0px -40% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-2xl bg-black/50 border-b border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-3'
          : 'py-5'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#home"
          aria-label="Derrick Ndiga, home"
          className="text-slate-50 hover:text-cyan-300 transition-colors duration-300 select-none"
        >
          <svg viewBox="34 40 188 176" className="h-7 w-auto" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M34.5,40 H102.5 L142.5,160 V40 H162.5 A59,56 0 0 1 221.5,96 V160 A59,56 0 0 1 162.5,216 H114.5 L74.5,96 V216 H34.5 Z"
            />
          </svg>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <li key={link.id}>
              <MagneticLink label={link.label} href={link.href} active={activeSection === link.id} />
            </li>
          ))}
        </ul>

        <motion.a
          href="mailto:ndigaderrick6@gmail.com"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-cyan-300 border border-cyan-400/40 hover:bg-cyan-400/10 hover:border-cyan-400/70 transition-all duration-300"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          data-cursor="hover"
        >
          Hire Me
        </motion.a>

        <button
          className="md:hidden text-slate-300 hover:text-white transition-colors"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden backdrop-blur-2xl bg-black/70 border-t border-white/[0.07] px-6 py-5 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col gap-5">
              {links.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    className={`font-medium transition-colors ${
                      activeSection === link.id ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
