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
          Your Light Side...
        </h2>
        <p className="text-base leading-relaxed text-stone-400 md:text-xl">
          <span className="font-semibold text-white">
            Light isn't a cure for your daily chaos
          </span>
          <span className="text-stone-400">
            —<span className="font-semibold text-stone-300">it is the courage to meet it.</span>
          </span>
          <br />
          <br />
          <blockquote className="border-l-2 border-stone-700 py-1 pl-4 font-serif text-[1.05em] leading-snug text-stone-300 italic text-justify md:pl-5">
            “Both light and shadow are the dance of Love.”
            <span className="block mt-1 font-normal not-italic text-xs text-right text-stone-400">— Rumi</span>
          </blockquote>
          <br />
          <span className="text-justify">
            True peace doesn't mute the noise or pretend you aren't overwhelmed.
            It is letting your warmth and your shadow walk hand in hand through the storm.
          </span>
        </p>
   
      </div>
    </motion.div>
  )
}
