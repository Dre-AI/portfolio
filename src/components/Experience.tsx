import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal, { RevealItem } from './Reveal'

const roles = [
  {
    title: 'IT Officer',
    company: 'Keton Group',
    period: 'Jul 2025 – Present',
    desc: 'Managed on-premise infrastructure, user provisioning, Active Directory, hardware maintenance, and IT support across multiple sites. Reduced mean time to resolution by standardising helpdesk triage procedures.',
    tags: ['Windows Server', 'Active Directory', 'Hardware', 'Helpdesk'],
    color: 'cyan' as const,
  },
  {
    title: 'QA Reviewer',
    company: 'AlignTurn',
    period: 'Jan 2026 – Apr 2026',
    desc: 'Performed manual and semi-automated quality assurance reviews, documented defect lifecycles, and collaborated with distributed dev teams on regression testing and release sign-off.',
    tags: ['QA', 'Test Cases', 'Bug Tracking', 'Documentation'],
    color: 'violet' as const,
  },
  {
    title: 'Self-Initiated Developer',
    company: 'Independent Projects',
    period: 'Ongoing',
    desc: 'Building full-stack web applications, Python automation, and on-device AI (Transformers.js). Maintains 8+ public repositories at github.com/Dre-AI — including Lumora (e-commerce) and InsightForge (ML) — and is actively building in public. Stack: React, TypeScript, Node, Python, FastAPI, n8n, LLMs.',
    tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'n8n', 'LLM Integration'],
    color: 'cyan' as const,
  },
  {
    title: 'Technical Sales Representative',
    company: 'Hi-Specs Innovation',
    period: 'Jun 2025 – Jul 2025',
    desc: 'Advised clients on hardware procurement decisions, configured systems to exact specifications, and delivered post-sale technical support — consistently exceeding monthly unit targets.',
    tags: ['Hardware', 'Networking', 'Sales', 'Support'],
    color: 'violet' as const,
  },
  {
    title: 'Industrial Attachment Intern',
    company: 'JKUAT Industrial Park',
    period: 'Feb 2025 – May 2025',
    desc: 'Built a full-stack Internship Management System using Laravel, MySQL, and Tailwind CSS. The platform tracked 200+ student placements, supervisor assignments, and evaluation reports for the academic office.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
    color: 'cyan' as const,
  },
  {
    title: 'Brand Ambassador',
    company: 'Safaricom PLC',
    period: 'Feb 2023 – Aug 2023',
    desc: 'Represented Safaricom at retail touchpoints and field activations. Drove customer acquisition for M-PESA and data products, met and exceeded monthly KPI targets across all assigned territories.',
    tags: ['Customer Acquisition', 'Sales', 'M-PESA', 'Brand Activation'],
    color: 'violet' as const,
  },
]

const neonTag = {
  cyan: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/8',
  violet: 'text-violet-400 border-violet-400/30 bg-violet-400/8',
}

const glowDot = {
  cyan: 'bg-cyan-400 shadow-[0_0_10px_3px_rgba(34,211,238,0.55)]',
  violet: 'bg-violet-400 shadow-[0_0_10px_3px_rgba(167,139,250,0.55)]',
}

const cardGlow = {
  cyan: 'hover:shadow-[0_0_24px_rgba(34,211,238,0.08)] hover:border-cyan-400/25',
  violet: 'hover:shadow-[0_0_24px_rgba(167,139,250,0.08)] hover:border-violet-400/25',
}

function RoleCard({ role, i }: { role: typeof roles[0]; i: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <RevealItem delay={i * 0.07} direction="left">
      <div className="relative pl-14">
        {/* Timeline dot */}
        <motion.span
          className={`absolute left-[18px] top-4 w-3 h-3 rounded-full ${glowDot[role.color]}`}
          whileHover={{ scale: 1.5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        />

        <motion.div
          className={`backdrop-blur-2xl bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 cursor-pointer transition-all duration-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] ${cardGlow[role.color]}`}
          onClick={() => setExpanded(e => !e)}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-white font-semibold text-base leading-tight">{role.title}</h3>
              <p className={`text-sm font-medium mt-0.5 ${role.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'}`}>
                {role.company}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                {role.period}
              </span>
              <motion.span
                className="text-slate-500 text-xs select-none"
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                ▾
              </motion.span>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="text-gray-300 text-sm leading-relaxed mt-2 mb-3">{role.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!expanded && (
            <p className="text-gray-400 text-xs mt-1 line-clamp-1">{role.desc}</p>
          )}

          <div className="flex flex-wrap gap-1.5 mt-3">
            {role.tags.map(tag => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-0.5 rounded-full border ${neonTag[role.color]}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </RevealItem>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase">Career</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">
            Experi<span className="gradient-text">ence</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm">Click any card to expand details</p>
        </Reveal>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-3 bottom-3 w-px bg-gradient-to-b from-cyan-400/60 via-violet-500/30 to-transparent" />

          <div className="space-y-5">
            {roles.map((role, i) => (
              <RoleCard key={role.title} role={role} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
