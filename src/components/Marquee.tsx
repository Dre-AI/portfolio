import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface MarqueeProps {
  items: string[]
  speed?: number
  direction?: 'left' | 'right'
  className?: string
}

export default function Marquee({ items, speed = 40, direction = 'left', className = '' }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const doubled = [...items, ...items]
  const duration = doubled.length * (60 / speed)
  const xAnim: [string, string] = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']

  const parallax = useTransform(scrollYProgress, [0, 1], ['0%', direction === 'left' ? '-5%' : '5%'])

  return (
    <div ref={containerRef} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex gap-12"
        style={{ x: parallax }}
        animate={{ x: xAnim }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-12 text-sm font-semibold tracking-widest uppercase text-white/20">
            {item}
            <span className="text-cyan-400/50">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
