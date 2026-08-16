import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Reveal, { RevealItem } from './Reveal'

const projects = [
  {
    title: 'Lumora',
    desc: 'A complete full-stack e-commerce storefront with a real backend — not a mock-up. Node/Express + SQLite API with JWT authentication (bcrypt-hashed), server-side per-user cart persistence, and a multi-step checkout (address → delivery → payment → review) that writes confirmed orders to the database. React 18 + TypeScript + Vite frontend with guarded routes, search, category filtering, and order history.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Node', 'Express', 'SQLite', 'JWT'],
    accent: 'cyan' as const,
    label: 'Full-Stack',
    preview: 'from-cyan-500/30 via-cyan-900/20 to-transparent',
    spotColor: 'rgba(34,211,238',
    repo: 'https://github.com/Dre-AI/Lumora',
    live: 'https://dre-ai.github.io/Lumora/',
  },
  {
    title: 'InsightForge',
    desc: 'A privacy-first, browser-based ML playground: upload any CSV and it profiles the data, auto-detects classification vs regression, trains and ranks a zoo of scikit-learn models, and returns metrics, feature importance, and a correlation heatmap — all processed locally, no data leaves the machine. Generates a downloadable self-contained HTML report.',
    stack: ['Python', 'pandas', 'scikit-learn', 'seaborn', 'Streamlit'],
    accent: 'violet' as const,
    label: 'Python / ML',
    preview: 'from-violet-500/30 via-violet-900/20 to-transparent',
    spotColor: 'rgba(167,139,250',
    repo: 'https://github.com/Dre-AI/insightforge',
    live: 'https://insightf0rge.streamlit.app/',
  },
]

const borderColor = {
  cyan: 'border-cyan-400/20 hover:border-cyan-400/40',
  violet: 'border-violet-400/20 hover:border-violet-400/40',
  fuchsia: 'border-fuchsia-400/20 hover:border-fuchsia-400/40',
}

const labelStyle = {
  cyan: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30',
  violet: 'bg-violet-400/10 text-violet-300 border-violet-400/30',
  fuchsia: 'bg-fuchsia-400/10 text-fuchsia-300 border-fuchsia-400/30',
}

const tagStyle = {
  cyan: 'text-cyan-400/80 bg-cyan-400/5 border-cyan-400/20',
  violet: 'text-violet-400/80 bg-violet-400/5 border-violet-400/20',
  fuchsia: 'text-fuchsia-400/80 bg-fuchsia-400/5 border-fuchsia-400/20',
}

type Accent = 'cyan' | 'violet' | 'fuchsia'

interface Project {
  title: string
  desc: string
  stack: string[]
  accent: Accent
  label: string
  preview: string
  spotColor: string
  repo: string
  live?: string
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springCfg = { stiffness: 180, damping: 22 }
  const rotateX = useSpring(useTransform(mouseY, [-120, 120], [7, -7]), springCfg)
  const rotateY = useSpring(useTransform(mouseX, [-120, 120], [-7, 7]), springCfg)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - r.left - r.width / 2)
    mouseY.set(e.clientY - r.top - r.height / 2)
    setSpotPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    })
  }

  const onLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
  }

  return (
    <RevealItem delay={i * 0.1} direction="up">
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        className={`group relative backdrop-blur-2xl bg-white/[0.04] border ${borderColor[p.accent as Accent]} rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]`}
        data-cursor="hover"
      >
        {/* Cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: hovered
              ? `radial-gradient(280px circle at ${spotPos.x}% ${spotPos.y}%, ${p.spotColor},0.12), transparent 70%)`
              : 'none',
          }}
        />

        {/* Preview area */}
        <div className={`relative h-28 bg-gradient-to-br ${p.preview} flex items-end justify-between px-5 pb-4 shrink-0`}>
          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${labelStyle[p.accent as Accent]}`}>
            {p.label}
          </span>
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>

        {/* Body */}
        <div className="relative z-10 flex flex-col flex-1 p-6">
          <h3 className="text-white font-bold text-lg mb-2 leading-tight">{p.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed flex-1">{p.desc}</p>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {p.stack.map(s => (
              <span
                key={s}
                className={`text-xs px-2.5 py-0.5 rounded-full border ${tagStyle[p.accent as Accent]}`}
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-4">
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-semibold flex items-center gap-1.5 ${
                p.accent === 'cyan' ? 'text-cyan-400' : p.accent === 'violet' ? 'text-violet-400' : 'text-fuchsia-400'
              } hover:underline`}
              data-cursor="hover"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              View Code
            </a>
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs font-semibold ${
                  p.accent === 'cyan' ? 'text-cyan-400' : p.accent === 'violet' ? 'text-violet-400' : 'text-fuchsia-400'
                } hover:underline`}
                data-cursor="hover"
              >
                Live Demo ↗
              </a>
            )}
            </div>
            <motion.div
              className={`flex items-center gap-1 text-xs font-semibold ${
                p.accent === 'cyan' ? 'text-cyan-400' : p.accent === 'violet' ? 'text-violet-400' : 'text-fuchsia-400'
              }`}
              whileHover="hover"
              initial="rest"
            >
              <motion.span variants={{ rest: { x: 0 }, hover: { x: 4 } }} transition={{ duration: 0.2 }}>
                →
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </RevealItem>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase">Work</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">
            Selected <span className="gradient-text">Projects</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
