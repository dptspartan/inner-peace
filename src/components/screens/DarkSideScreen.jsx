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
          Your Dark Side...
        </h2>
        <p className="text-base leading-relaxed text-stone-400 md:text-xl">
        <span className="font-semibold text-white">
          Your inner shadow isn’t the enemy of peace
        </span>
        <span className="text-stone-400">
          —<span className="font-semibold text-stone-300">it is your anchor in the daily chaos.</span>
        </span>
        <br />
        <br />
        <blockquote className="border-l-2 border-stone-700 py-1 pl-4 font-serif text-[1.05em] leading-snug text-stone-300 italic text-justify md:pl-5">
          “One does not become enlightened by imagining figures of light, but by making the darkness conscious.”
          <span className="block mt-1 font-normal not-italic text-xs text-right text-stone-400">— Carl Jung</span>
        </blockquote>
        <br />
        <span className="text-justify">
          <b>Stop fighting the heavy weather inside.</b> Own your dark; it is where the quiet lives.
        </span>
        </p>
      </div>
    </motion.div>
  )
}
