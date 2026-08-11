import { motion } from 'framer-motion'
import Reveal, { RevealItem } from './Reveal'
import Marquee from './Marquee'

const groups = [
  {
    label: 'IT & Infrastructure',
    color: 'cyan' as const,
    icon: '🖥',
    skills: ['Windows Server', 'Active Directory', 'VMware', 'Linux (Ubuntu/CentOS)', 'Hardware Troubleshooting', 'IT Support'],
  },
  {
    label: 'Networking & Security',
    color: 'violet' as const,
    icon: '🔒',
    skills: ['TCP/IP', 'DNS / DHCP', 'VLANs', 'Firewall Config', 'VPN Setup', 'Network Monitoring'],
  },
  {
    label: 'Software Development',
    color: 'cyan' as const,
    icon: '⚡',
    skills: ['React', 'TypeScript', 'Node/Express', 'Django', 'Laravel', 'PHP', 'REST APIs', 'PostgreSQL', 'SQLite', 'MySQL'],
  },
  {
    label: 'Python & Machine Learning',
    color: 'violet' as const,
    icon: '🐍',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Jupyter', 'Web Scraping', 'Automation Scripting', 'Data Analysis'],
  },
  {
    label: 'Automation & AI',
    color: 'cyan' as const,
    icon: '🤖',
    skills: ['n8n', 'FastAPI', 'LLM Integration', 'OpenAI API', 'Prompt Engineering', 'Webhook Pipelines'],
  },
  {
    label: 'Digital Operations',
    color: 'violet' as const,
    icon: '📋',
    skills: ['Project Management', 'Technical Documentation', 'QA Testing', 'Client Communication', 'Git / GitHub'],
  },
]

const marqueeItems = [
  'Python', 'pandas', 'scikit-learn', 'FastAPI', 'React', 'TypeScript',
  'Node/Express', 'n8n', 'OpenAI API', 'Windows Server', 'Active Directory',
  'Linux', 'PostgreSQL', 'MySQL', 'TCP/IP', 'VPN', 'Tailwind CSS',
  'Django', 'REST APIs', 'Git', 'VMware', 'NumPy', 'Jupyter',
]

const chipColor = {
  cyan: 'text-cyan-300/80 bg-cyan-400/8 border-cyan-400/20',
  violet: 'text-violet-300/80 bg-violet-400/8 border-violet-400/20',
}

const headingColor = {
  cyan: 'text-cyan-400',
  violet: 'text-violet-400',
}

const accentBar = {
  cyan: 'from-cyan-400 to-cyan-600',
  violet: 'from-violet-400 to-violet-600',
}

const panelGlow = {
  cyan: 'hover:border-cyan-400/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.07)]',
  violet: 'hover:border-violet-400/30 hover:shadow-[0_0_20px_rgba(167,139,250,0.07)]',
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">
            Tech <span className="gradient-text">Stack</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g, i) => (
            <RevealItem key={g.label} delay={i * 0.07} direction="up">
              <motion.div
                className={`h-full backdrop-blur-2xl bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 transition-all duration-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] ${panelGlow[g.color]}`}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <span className={`w-1 h-5 bg-gradient-to-b rounded-full ${accentBar[g.color]}`} />
                  <span className="text-base">{g.icon}</span>
                  <h3 className={`text-xs font-semibold uppercase tracking-wider ${headingColor[g.color]}`}>
                    {g.label}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {g.skills.map(skill => (
                    <span
                      key={skill}
                      className={`text-xs px-2.5 py-1 rounded-full border ${chipColor[g.color]}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </div>

        {/* Marquee strip */}
        <div className="mt-16 py-5 border-y border-white/[0.06]">
          <Marquee items={marqueeItems} speed={35} direction="left" className="py-1" />
        </div>
      </div>
    </section>
  )
}
