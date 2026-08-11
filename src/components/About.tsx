import Reveal, { RevealItem } from './Reveal'

const education = [
  {
    degree: 'BSc Cyber Security & Digital Forensics',
    school: 'Open University of Kenya',
    period: null,
    color: 'cyan' as const,
  },
  {
    degree: 'Diploma in Information Technology',
    school: 'Co-operative University of Kenya',
    period: 'Sep 2023 – Dec 2025',
    color: 'violet' as const,
  },
]

const certs = [
  'Networking Basics',
  'Network Protocols Basics',
  'Operating Systems Basics',
  'Linux OS',
  'Windows OS',
  'IT Customer Support Basics',
  'Mobile Security Basics',
  'Internet Protocol Basics',
]

const chipColor = {
  cyan: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/25',
  violet: 'text-violet-300 bg-violet-400/10 border-violet-400/25',
}

const dotColor = {
  cyan: 'bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.5)]',
  violet: 'bg-violet-400 shadow-[0_0_8px_2px_rgba(167,139,250,0.5)]',
}

export default function About() {
  return (
    <section id="about" className="py-28 px-6 bg-mesh">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase">
            Who I Am
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">
            About <span className="gradient-text">Me</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Bio */}
          <RevealItem direction="left">
            <div className="backdrop-blur-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/25 rounded-2xl p-8 h-full transition-all duration-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
              <h3 className="text-lg font-bold text-cyan-400 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full" />
                Bio
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed text-[0.93rem]">
                <p>
                  Full-stack developer, automation engineer, and Python developer with hands-on
                  experience spanning enterprise infrastructure, cybersecurity operations, and
                  production web applications. I have deployed Active Directory environments,
                  administered network hardware, and shipped full-stack systems from the ground up.
                </p>
                <p>
                  My work sits at the intersection of systems thinking and software craft —
                  whether that's building React/TypeScript and Node platforms, engineering
                  automation pipelines with Python, n8n and LLMs, or hardening network perimeters
                  with VLAN segmentation and CCTV integrations.
                </p>
                <p>
                  I'm an <span className="text-cyan-400 font-medium">AI enthusiast</span> actively
                  deepening my Python through structured learning — data analysis with pandas,
                  scripting, and machine-learning fundamentals — and I bring a security-first
                  mindset to every layer of the stack. I write clean, purposeful code and automate
                  what can be automated.
                </p>
              </div>
            </div>
          </RevealItem>

          <div className="flex flex-col gap-6">
            {/* Education timeline */}
            <RevealItem direction="right">
              <div className="backdrop-blur-2xl bg-white/[0.04] border border-white/10 hover:border-violet-400/25 rounded-2xl p-8 transition-all duration-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                <h3 className="text-lg font-bold text-violet-400 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-gradient-to-b from-violet-400 to-violet-600 rounded-full" />
                  Education
                </h3>
                <div className="relative flex flex-col gap-6 pl-5">
                  <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/40 via-violet-400/30 to-transparent" />
                  {education.map((edu) => (
                    <div key={edu.degree} className="relative">
                      <span className={`absolute -left-[22px] top-1.5 w-2.5 h-2.5 rounded-full ${dotColor[edu.color]}`} />
                      <p className="font-semibold text-white text-sm leading-tight">{edu.degree}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{edu.school}</p>
                      {edu.period && (
                        <p className="text-cyan-500 text-xs mt-1 font-medium">{edu.period}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </RevealItem>

            {/* Certifications as glass chips */}
            <RevealItem direction="right" delay={0.1}>
              <div className="backdrop-blur-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/25 rounded-2xl p-8 transition-all duration-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                <h3 className="text-lg font-bold text-violet-400 mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-gradient-to-b from-violet-400 to-violet-600 rounded-full" />
                  Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {certs.map((cert, i) => (
                    <span
                      key={cert}
                      className={`text-xs px-3 py-1.5 rounded-full border backdrop-blur-sm font-medium ${
                        i % 2 === 0 ? chipColor.cyan : chipColor.violet
                      }`}
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </RevealItem>
          </div>
        </div>
      </div>
    </section>
  )
}
