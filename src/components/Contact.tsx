import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Reveal, { RevealItem } from './Reveal'

const contacts = [
  {
    label: 'Email',
    value: 'ndigaderrick6@gmail.com',
    href: 'mailto:ndigaderrick6@gmail.com',
    color: 'cyan' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+254 713 314 118',
    href: 'tel:+254713314118',
    color: 'violet' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/derrick-ndiga-76a119311',
    href: 'https://www.linkedin.com/in/derrick-ndiga-76a119311/',
    color: 'cyan' as const,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/Dre-AI',
    href: 'https://github.com/Dre-AI/',
    color: 'violet' as const,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
]

const cardBorder = {
  cyan: 'border-cyan-400/15 hover:border-cyan-400/40 hover:shadow-[0_0_16px_rgba(34,211,238,0.08)]',
  violet: 'border-violet-400/15 hover:border-violet-400/40 hover:shadow-[0_0_16px_rgba(167,139,250,0.08)]',
}

const iconBg = {
  cyan: 'bg-cyan-400/10 text-cyan-400',
  violet: 'bg-violet-400/10 text-violet-400',
}

function MagneticCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 280, damping: 18 })
  const sy = useSpring(y, { stiffness: 280, damping: 18 })

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.4)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <motion.a
        href="mailto:ndigaderrick6@gmail.com"
        className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_24px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.45)] transition-all duration-300"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        data-cursor="hover"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75" />
        </svg>
        Send an Email
      </motion.a>
    </motion.div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-4 pb-36">
      <div className="max-w-2xl mx-auto text-center">
        <Reveal>
          <span className="text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase">Contact</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-gray-400 mt-4 mb-10 leading-relaxed text-sm max-w-md mx-auto">
            Open to Full-Stack, Automation, and Python / AI roles. Reach out — I respond within 24 hours.
          </p>
        </Reveal>

        <RevealItem delay={0.1}>
          <MagneticCTA />
        </RevealItem>

        <div className="mt-12 grid sm:grid-cols-2 gap-3">
          {contacts.map((c, i) => (
            <RevealItem key={c.label} delay={0.15 + i * 0.07}>
              <motion.a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex items-center gap-4 backdrop-blur-2xl bg-white/[0.04] border ${cardBorder[c.color]} rounded-2xl p-4 transition-all duration-300 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]`}
                data-cursor="hover"
              >
                <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${iconBg[c.color]}`}>
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5 font-medium">{c.label}</p>
                  <p className="text-sm text-white truncate font-medium">{c.value}</p>
                </div>
                <svg className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 ml-auto shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  )
}
