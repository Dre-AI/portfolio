import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Reveal, { RevealItem } from './Reveal'

interface GithubUser {
  public_repos: number
  followers: number
}

interface GithubRepo {
  stargazers_count: number
  language: string | null
}

interface GithubStats {
  publicRepos: number
  followers: number
  totalStars: number
  topLanguages: string[]
}

interface StatusEndpoint {
  label: string
  url: string
}

type EndpointState = 'checking' | 'online' | 'asleep'

const STATUS_ENDPOINTS: StatusEndpoint[] = [
  { label: 'Portfolio', url: 'https://dre-ai.github.io/portfolio/' },
  { label: 'Store', url: 'https://dre-ai.github.io/Lumora/' },
  { label: 'InsightForge', url: 'https://insightf0rge.streamlit.app/' },
  { label: 'Lumora API', url: 'https://lumora-api-82c2.onrender.com/api/health' },
]

const STATUS_POLL_INTERVAL_MS = 30000

const TERMINAL_LINES = [
  '$ curl -s lumora-api.onrender.com/api/health',
  '{"ok":true}',
  '$ npm run build && gh deploy',
  '> portfolio published to github pages',
]

function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(query.matches)
    const handleChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return prefersReduced
}

function useGithubStats() {
  const [stats, setStats] = useState<GithubStats | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function loadStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/Dre-AI', { signal: controller.signal }),
          fetch('https://api.github.com/users/Dre-AI/repos?per_page=100&sort=updated', { signal: controller.signal }),
        ])

        if (!userRes.ok || !reposRes.ok) {
          throw new Error('GitHub API request failed')
        }

        const user = (await userRes.json()) as GithubUser
        const repos = (await reposRes.json()) as GithubRepo[]

        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

        const languageCounts = new Map<string, number>()
        for (const repo of repos) {
          if (!repo.language) continue
          languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1)
        }
        const topLanguages = [...languageCounts.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([language]) => language)

        setStats({
          publicRepos: user.public_repos,
          followers: user.followers,
          totalStars,
          topLanguages,
        })
        setStatus('ready')
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setStatus('error')
      }
    }

    loadStats()
    return () => controller.abort()
  }, [])

  return { stats, status }
}

function useStatusBoard() {
  const [states, setStates] = useState<Record<string, EndpointState>>(() =>
    Object.fromEntries(STATUS_ENDPOINTS.map(endpoint => [endpoint.label, 'checking']))
  )

  useEffect(() => {
    const controller = new AbortController()
    let intervalId: ReturnType<typeof setInterval>

    async function checkEndpoint(endpoint: StatusEndpoint) {
      try {
        await fetch(endpoint.url, {
          method: 'GET',
          mode: 'no-cors',
          cache: 'no-store',
          signal: controller.signal,
        })
        setStates(prev => ({ ...prev, [endpoint.label]: 'online' }))
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setStates(prev => ({ ...prev, [endpoint.label]: 'asleep' }))
      }
    }

    function checkAll() {
      STATUS_ENDPOINTS.forEach(endpoint => {
        checkEndpoint(endpoint)
      })
    }

    checkAll()
    intervalId = setInterval(checkAll, STATUS_POLL_INTERVAL_MS)

    return () => {
      controller.abort()
      clearInterval(intervalId)
    }
  }, [])

  return states
}

function useTypewriter(lines: string[], prefersReducedMotion: boolean) {
  const [visibleText, setVisibleText] = useState('')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const fullText = lines.join('\n')

    if (prefersReducedMotion) {
      setVisibleText(fullText)
      setIsDone(true)
      return
    }

    let charIndex = 0
    const intervalId = setInterval(() => {
      charIndex += 1
      setVisibleText(fullText.slice(0, charIndex))
      if (charIndex >= fullText.length) {
        clearInterval(intervalId)
        setIsDone(true)
      }
    }, 22)

    return () => clearInterval(intervalId)
  }, [lines, prefersReducedMotion])

  return { visibleText, isDone }
}

function StatCard({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <RevealItem delay={delay} direction="up">
      <div className="h-full backdrop-blur-2xl bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
        <div className="text-2xl font-black gradient-text">{value}</div>
        <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{label}</div>
      </div>
    </RevealItem>
  )
}

function GithubStatsGrid() {
  const { stats, status } = useGithubStats()

  if (status === 'error') {
    return (
      <p className="text-sm text-gray-500 italic text-center py-6">
        Live GitHub stats unavailable right now — try again shortly.
      </p>
    )
  }

  if (status === 'loading' || !stats) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-2xl border border-white/[0.08] bg-white/[0.03] animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <StatCard label="Public Repos" value={String(stats.publicRepos)} delay={0} />
      <StatCard label="Total Stars" value={String(stats.totalStars)} delay={0.07} />
      <StatCard label="Followers" value={String(stats.followers)} delay={0.14} />
      <StatCard
        label="Top Languages"
        value={stats.topLanguages.length > 0 ? stats.topLanguages.join(' · ') : '—'}
        delay={0.21}
      />
    </div>
  )
}

const dotColor: Record<EndpointState, string> = {
  checking: 'bg-gray-500',
  online: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]',
  asleep: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
}

const statusLabel: Record<EndpointState, string> = {
  checking: 'checking…',
  online: 'online',
  asleep: 'asleep',
}

function StatusBoard() {
  const states = useStatusBoard()

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {STATUS_ENDPOINTS.map((endpoint, i) => {
        const state = states[endpoint.label] ?? 'checking'
        return (
          <RevealItem key={endpoint.label} delay={i * 0.05} direction="up">
            <div className="flex items-center justify-between gap-3 backdrop-blur-2xl bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3">
              <span className="text-sm text-white/90">{endpoint.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{statusLabel[state]}</span>
                <span
                  role="status"
                  aria-label={`${endpoint.label} is ${statusLabel[state]}`}
                  className={`w-2.5 h-2.5 rounded-full ${dotColor[state]} ${state === 'checking' ? 'animate-pulse' : ''}`}
                />
              </div>
            </div>
          </RevealItem>
        )
      })}
    </div>
  )
}

function TerminalPanel() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { visibleText, isDone } = useTypewriter(TERMINAL_LINES, prefersReducedMotion)

  return (
    <div className="backdrop-blur-2xl bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.08]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 text-xs text-gray-500 font-mono">derrick@dev-machine</span>
      </div>
      <pre className="p-5 font-mono text-xs sm:text-sm text-cyan-300/90 whitespace-pre-wrap leading-relaxed min-h-[9rem]">
        {visibleText}
        {!isDone && <span className="inline-block w-2 h-4 bg-violet-400 ml-0.5 animate-pulse" aria-hidden="true" />}
      </pre>
    </div>
  )
}

export default function LiveProof() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="live-proof" ref={sectionRef} className="py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase">Real-Time</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">
            Live from the <span className="gradient-text">trenches</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
            Not a screenshot. These numbers and status checks are fetched live, right now, from GitHub and my deployed projects.
          </p>
        </Reveal>

        <motion.div className="mb-12">
          <GithubStatsGrid />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-violet-400 mb-4">Deployment Status</h3>
            <StatusBoard />
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-4">What I've been running</h3>
            <TerminalPanel />
          </div>
        </div>
      </div>
    </section>
  )
}
