import { motion, useTransform } from 'framer-motion'
import useIsMobile from '../../hooks/useIsMobile'

/** Screen 2 — desktop: left copy / yin right. Mobile: top copy / yin bottom. */
export default function DarkSideScreen({ progress }) {
  const isMobile = useIsMobile()

  const opacity = useTransform(progress, [0.32, 0.42, 0.58, 0.68], [0, 1, 1, 0])
  const desktopX = useTransform(progress, [0.32, 0.42, 0.58, 0.68], [-28, 0, 0, -16])
  const desktopY = useTransform(progress, [0.32, 0.42], [18, 0])
  const mobileY = useTransform(progress, [0.32, 0.42, 0.58, 0.68], [-24, 0, 0, -14])

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 top-0 flex h-1/2 items-end px-6 pb-4 md:inset-y-0 md:left-0 md:right-auto md:h-auto md:w-1/2 md:items-center md:px-16 md:pb-0 lg:px-24"
      style={{
        opacity,
        x: isMobile ? 0 : desktopX,
        y: isMobile ? mobileY : desktopY,
      }}
    >
      <div className="mx-auto max-w-md text-center md:mx-0 md:text-left">
        <h2 className="mb-3 font-serif text-3xl font-semibold tracking-tight text-white md:mb-6 md:text-5xl lg:text-6xl">
          Your Dark Side
        </h2>
        <p className="text-base leading-relaxed text-stone-400 md:text-xl">
          The dark half is not the enemy of peace — it is where weight, grief, and
          shadow live. Naming it without judgment is the first step toward balance.
          Darkness holds the quiet that lets light mean something.
        </p>
      </div>
    </motion.div>
  )
}
