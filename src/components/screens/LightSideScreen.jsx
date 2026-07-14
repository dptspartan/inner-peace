import { motion, useTransform } from 'framer-motion'
import useIsMobile from '../../hooks/useIsMobile'

/** Screen 3 — desktop: right copy / yin left. Mobile: bottom copy / yin top. */
export default function LightSideScreen({ progress }) {
  const isMobile = useIsMobile()

  const opacity = useTransform(progress, [0.62, 0.72, 1], [0, 1, 1])
  const desktopX = useTransform(progress, [0.62, 0.72], [28, 0])
  const desktopY = useTransform(progress, [0.62, 0.72], [18, 0])
  const mobileY = useTransform(progress, [0.62, 0.72], [24, 0])

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-0 flex h-1/2 items-start px-6 pt-4 md:inset-y-0 md:right-0 md:left-auto md:h-auto md:w-1/2 md:items-center md:justify-end md:px-16 md:pt-0 lg:px-24"
      style={{
        opacity,
        x: isMobile ? 0 : desktopX,
        y: isMobile ? mobileY : desktopY,
      }}
    >
      <div className="mx-auto max-w-md text-center md:mx-0 md:text-right">
        <h2 className="mb-3 font-serif text-3xl font-semibold tracking-tight text-white md:mb-6 md:text-5xl lg:text-6xl">
          Lighter Side
        </h2>
        <p className="text-base leading-relaxed text-stone-400 md:text-xl">
          Light is clarity, warmth, and the courage to open. It does not erase the
          dark — it moves with it. Peace is this bright half staying in conversation
          with shadow, never pretending either one is the whole story.
        </p>
      </div>
    </motion.div>
  )
}
