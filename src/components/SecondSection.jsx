import { motion, useTransform } from 'framer-motion'
import YinYang from './YinYang'
import BalanceScreen from './screens/BalanceScreen'
import DarkSideScreen from './screens/DarkSideScreen'
import LightSideScreen from './screens/LightSideScreen'
import useIsMobile from '../hooks/useIsMobile'

/**
 * Black cover section with three scroll-driven screens.
 * Desktop: yin slides left ↔ right.
 * Mobile: same timeline, yin slides top ↔ bottom.
 */
export default function SecondSection({ progress }) {
  const isMobile = useIsMobile()

  // Shared keyframe values: center → “right/bottom” → “left/top”
  const yinPos = useTransform(
    progress,
    [0, 0.3, 0.4, 0.58, 0.68, 1],
    ['50%', '50%', '75%', '75%', '25%', '25%'],
  )

  const yinScale = useTransform(
    progress,
    [0, 0.3, 0.4, 0.58, 0.68, 1],
    [1, 1, 0.85, 0.85, 0.85, 0.85],
  )

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <BalanceScreen progress={progress} />
      <DarkSideScreen progress={progress} />
      <LightSideScreen progress={progress} />

      <motion.div
        className="absolute z-20"
        style={
          isMobile
            ? {
                top: yinPos,
                left: '50%',
                x: '-50%',
                y: '-50%',
                scale: yinScale,
              }
            : {
                left: yinPos,
                top: '50%',
                x: '-50%',
                y: '-50%',
                scale: yinScale,
              }
        }
      >
        <YinYang
          inverted
          aria-label="Yin yang"
          className="h-[min(56vmin,320px)] w-[min(56vmin,320px)] md:h-[min(68vmin,460px)] md:w-[min(68vmin,460px)]"
        />
      </motion.div>
    </div>
  )
}
