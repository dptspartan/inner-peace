import { motion } from 'framer-motion'

const spring = { type: 'spring', stiffness: 160, damping: 22, mass: 0.8 }

/**
 * @param {number} gap - Separation between halves, as % of the symbol size (0 = joined)
 * @param {boolean} showBlack - Show the black (yin) half
 * @param {boolean} showWhite - Show the white (yang) half
 * @param {'black' | 'white' | null} activeHalf - Hovered half pops slightly larger
 */
export default function YinYang({
  className = '',
  inverted = false,
  gap = 0,
  showBlack = true,
  showWhite = true,
  activeHalf = null,
  'aria-hidden': ariaHidden,
  'aria-label': ariaLabel,
}) {
  const shadow = inverted
    ? [
        'drop-shadow(0 18px 10px rgba(255,255,255,0.2))',
        'drop-shadow(0 36px 48px rgba(255,255,255,0.35))',
        'drop-shadow(0 60px 80px rgba(255,255,255,0.2))',
      ].join(' ')
    : [
        'drop-shadow(0 18px 10px rgba(0,0,0,0.3))',
        'drop-shadow(0 36px 48px rgba(0,0,0,0.4))',
        'drop-shadow(0 60px 90px rgba(0,0,0,0.22))',
      ].join(' ')

  const offset = gap / 2
  const blackScale = !showBlack ? 0.86 : activeHalf === 'black' ? 1.12 : 1
  const whiteScale = !showWhite ? 0.86 : activeHalf === 'white' ? 1.12 : 1

  const blackMotion = {
    x: `${showBlack ? -offset : -(offset + 12)}%`,
    opacity: showBlack ? 1 : 0,
    scale: blackScale,
  }

  const whiteMotion = {
    x: `${showWhite ? offset : offset + 12}%`,
    opacity: showWhite ? 1 : 0,
    scale: whiteScale,
  }

  return (
    <div
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      className={`relative aspect-square ${className}`}
      style={{ filter: shadow }}
    >
      {/* 1. Black left fill */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={blackMotion}
        transition={spring}
        style={{ pointerEvents: showBlack ? 'auto' : 'none' }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(to right, #000 50%, transparent 50%)',
          }}
        />
      </motion.div>

      {/* 2. White right fill */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={whiteMotion}
        transition={spring}
        style={{ pointerEvents: showWhite ? 'auto' : 'none' }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(to right, transparent 50%, #fff 50%)',
          }}
        />
      </motion.div>

      {/* 3. Upper black bulb + white eye (must sit above both fills) */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={blackMotion}
        transition={spring}
        style={{ pointerEvents: showBlack ? 'auto' : 'none' }}
      >
        <div className="absolute left-1/2 top-0 h-1/2 w-1/2 -translate-x-1/2 rounded-full bg-black">
          <div className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        </div>
      </motion.div>

      {/* 4. Lower white bulb + black eye (top-most, same as original) */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={whiteMotion}
        transition={spring}
        style={{ pointerEvents: showWhite ? 'auto' : 'none' }}
      >
        <div className="absolute bottom-0 left-1/2 h-1/2 w-1/2 -translate-x-1/2 rounded-full bg-white">
          <div className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
        </div>
      </motion.div>
    </div>
  )
}
