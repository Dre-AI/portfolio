import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import Scene3D from './Scene3D'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as number[] },
})

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* 3D Background — mouse-reactive via CameraRig inside Scene3D */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20 pb-20">
        <div className="relative text-center max-w-5xl mx-auto">
          {/* Dark backing so text stays legible over the 3D wireframe behind it */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 sm:-inset-x-16 sm:-inset-y-12"
            style={{
              background:
                'radial-gradient(ellipse 65% 55% at 50% 45%, rgba(2,6,23,0.78) 0%, rgba(2,6,23,0.4) 55%, transparent 80%)',
            }}
          />

          {/* Role badge */}
          <motion.div {...fadeUp(0.15)}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase glass rounded-full text-cyan-400 border-cyan-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Fullstack · Automation · Python · AI
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-hero font-black mb-4 leading-[0.95] tracking-tight"
            {...fadeUp(0.3)}
          >
            <span className="block text-white">Full-Stack Developer</span>
            <span className="block gradient-text">Automation &amp; Python Engineer</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-base md:text-lg text-slate-400 mb-4 font-medium tracking-wide uppercase"
            {...fadeUp(0.45)}
          >
            Derrick Ndiga — AI Enthusiast
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg text-slate-300 mb-7 max-w-2xl mx-auto leading-relaxed"
            {...fadeUp(0.55)}
          >
            I build production full-stack apps, automation pipelines, and Python/AI tools that
            ship. From intelligent web platforms to on-device machine learning — I turn ideas
            into working software.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            {...fadeUp(0.68)}
          >
            <a
              href="#projects"
              data-cursor="hover"
              className="px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:from-cyan-400 hover:to-violet-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
            >
              View My Work
            </a>
            <a
              href="#contact"
              data-cursor="hover"
              className="px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide glass text-cyan-300 border-cyan-400/40 hover:bg-white/10 hover:border-cyan-400/60 hover:scale-105 transition-all duration-300"
            >
              Let&apos;s Talk
            </a>
          </motion.div>

          {/* Stat row */}
          <motion.div
            className="flex flex-wrap gap-6 sm:gap-10 justify-center mt-8 sm:mt-10 text-center"
            {...fadeUp(0.8)}
          >
            {[
              { value: '3+', label: 'Years Experience' },
              { value: '2', label: 'Flagship Projects' },
              { value: '5+', label: 'Tech Stacks' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-black gradient-text">{value}</div>
                <div className="text-xs text-slate-500 tracking-wide mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-widest uppercase text-slate-600">Scroll</span>
        <motion.div
          className="w-5 h-9 rounded-full border-2 border-white/20 flex justify-center pt-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-cyan-400 rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
