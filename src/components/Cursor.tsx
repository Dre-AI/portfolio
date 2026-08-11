import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isTouch, setIsTouch] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const dotX = useSpring(rawX, { stiffness: 600, damping: 40 })
  const dotY = useSpring(rawY, { stiffness: 600, damping: 40 })
  const ringX = useSpring(rawX, { stiffness: 150, damping: 25 })
  const ringY = useSpring(rawY, { stiffness: 150, damping: 25 })

  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    abortRef.current = new AbortController()
    const { signal } = abortRef.current

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.closest('[data-cursor="hover"]') !== null ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      setHovered(isInteractive)
    }

    window.addEventListener('mousemove', onMove, { signal })
    window.addEventListener('mouseover', onOver, { signal })

    return () => abortRef.current?.abort()
  }, [rawX, rawY, visible])

  if (isTouch) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-cyan-400/50"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hovered ? 56 : 36,
          height: hovered ? 56 : 36,
          borderColor: hovered ? 'rgba(167,139,250,0.7)' : 'rgba(34,211,238,0.5)',
          backgroundColor: hovered ? 'rgba(167,139,250,0.08)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-cyan-400"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{ width: hovered ? 6 : 4, height: hovered ? 6 : 4 }}
        transition={{ type: 'spring', stiffness: 600, damping: 40 }}
      />
    </>
  )
}
