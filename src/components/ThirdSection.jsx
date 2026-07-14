import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import YinYang from './YinYang'
import useIsMobile from '../hooks/useIsMobile'

/**
 * Interactive split-world: hover (desktop) or tap-and-stay (mobile).
 * Revealed when SecondSection lifts upward.
 */
export default function ThirdSection() {
  const yinRef = useRef(null)
  const isMobile = useIsMobile()
  const [activeHalf, setActiveHalf] = useState(null) // 'black' | 'white' | null

  const leftInverted = activeHalf === 'black'
  const rightInverted = activeHalf === 'white'

  const leftBg = leftInverted ? '#ffffff' : '#000000'
  const rightBg = rightInverted ? '#000000' : '#ffffff'
  const leftFg = leftInverted ? '#000000' : '#ffffff'
  const rightFg = rightInverted ? '#ffffff' : '#000000'

  function halfFromEvent(event) {
    const el = yinRef.current
    if (!el) return null
    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left
    return x < rect.width / 2 ? 'black' : 'white'
  }

  function handlePointerMove(event) {
    if (isMobile) return
    setActiveHalf(halfFromEvent(event))
  }

  function handlePointerLeave() {
    if (isMobile) return
    setActiveHalf(null)
  }

  function handleSelect(event) {
    if (!isMobile) return
    const half = halfFromEvent(event)
    if (!half) return
    // Stay on the tapped side (switch if the other side is tapped)
    setActiveHalf(half)
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* Split backgrounds — overlap 1px to kill the center seam */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-y-0 left-0 w-[calc(50%+1px)]"
          initial={false}
          animate={{ backgroundColor: leftBg }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute inset-y-0 right-0 w-[calc(50%+1px)]"
          initial={false}
          animate={{ backgroundColor: rightBg }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>

      {/* Heading — desktop: one line at top. Mobile: top + bottom of screen. */}
      <div className="pointer-events-none absolute inset-x-0 top-[6%] z-10 hidden h-[5.5rem] md:top-[10%] md:block md:h-[5.5rem] lg:h-[6.5rem]">
        <motion.h2
          className="absolute inset-0 flex items-center justify-center px-4 text-center font-serif text-5xl leading-snug tracking-tight uppercase lg:text-6xl"
          style={{ clipPath: 'inset(0 49.5% 0 0)' }}
          animate={{ color: leftFg }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          Which Side Will You Feed Today
        </motion.h2>
        <motion.h2
          aria-hidden
          className="absolute inset-0 flex items-center justify-center px-4 text-center font-serif text-5xl leading-snug tracking-tight uppercase lg:text-6xl"
          style={{ clipPath: 'inset(0 0 0 49.5%)' }}
          animate={{ color: rightFg }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          Which Side Will You Feed Today
        </motion.h2>
      </div>

      {/* Mobile heading: top line */}
      <div className="pointer-events-none absolute inset-x-0 top-[9%] z-10 h-14 md:hidden">
        <motion.p
          className="absolute inset-0 flex items-center justify-center px-4 text-center font-serif text-4xl tracking-tight uppercase"
          style={{ clipPath: 'inset(0 49.5% 0 0)' }}
          animate={{ color: leftFg }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          Which Side Will
        </motion.p>
        <motion.p
          aria-hidden
          className="absolute inset-0 flex items-center justify-center px-4 text-center font-serif text-4xl tracking-tight uppercase"
          style={{ clipPath: 'inset(0 0 0 49.5%)' }}
          animate={{ color: rightFg }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          Which Side Will
        </motion.p>
      </div>

      {/* Mobile heading: bottom of screen */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[8%] z-10 h-14 md:hidden">
        <motion.p
          className="absolute inset-0 flex items-center justify-center px-4 text-center font-serif text-4xl tracking-tight uppercase"
          style={{ clipPath: 'inset(0 49.5% 0 0)' }}
          animate={{ color: leftFg }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          You Feed Today
        </motion.p>
        <motion.p
          aria-hidden
          className="absolute inset-0 flex items-center justify-center px-4 text-center font-serif text-4xl tracking-tight uppercase"
          style={{ clipPath: 'inset(0 0 0 49.5%)' }}
          animate={{ color: rightFg }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          You Feed Today
        </motion.p>
      </div>

      {/* Callouts + arrows */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Mobile — above/below yin; shift fully into left / right half */}
        <div className="md:hidden">
          <div
            className="absolute left-0 flex w-1/2 translate-x-3 flex-col items-center gap-0.5 pr-2"
            style={{ bottom: 'calc(50% + min(29vmin, 168px))' }}
          >
            <motion.p
              className="font-serif text-lg tracking-[0.18em] uppercase"
              animate={{ color: leftFg }}
              transition={{ duration: 0.35 }}
            >
              Darkness
            </motion.p>
            <StaticArrow
              id="t-dark-m"
              variant="mobileAimYin"
              color={leftFg}
              className="h-24 w-24 translate-x-2"
            />
          </div>

          <div
            className="absolute right-0 flex w-1/2 -translate-x-3 flex-col items-center gap-0.5 pl-2"
            style={{ top: 'calc(50% + min(29vmin, 168px))' }}
          >
            <StaticArrow
              id="t-light-m"
              variant="mobileAimYinFromLight"
              color={rightFg}
              className="h-24 w-24 -translate-x-2"
            />
            <motion.p
              className="font-serif text-lg tracking-[0.18em] uppercase"
              animate={{ color: rightFg }}
              transition={{ duration: 0.35 }}
            >
              Light
            </motion.p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block">
          <div
            className="absolute top-1/2 flex -translate-y-1/2 items-center gap-2"
            style={{ right: 'calc(50% + min(35vmin, 238px))' }}
          >
            <motion.p
              className="shrink-0 font-serif text-xl tracking-[0.18em] uppercase md:text-2xl"
              animate={{ color: leftFg }}
              transition={{ duration: 0.35 }}
            >
              Darkness
            </motion.p>
            <StaticArrow
              id="t-dark"
              variant="darkness"
              color={leftFg}
              className="h-20 w-40 md:h-24 md:w-48"
            />
          </div>
          <div
            className="absolute top-1/2 flex -translate-y-1/2 items-center gap-2"
            style={{ left: 'calc(50% + min(35vmin, 238px))' }}
          >
            <StaticArrow
              id="t-light"
              variant="light"
              color={rightFg}
              className="h-20 w-40 md:h-24 md:w-48"
            />
            <motion.p
              className="shrink-0 font-serif text-xl tracking-[0.18em] uppercase md:text-2xl"
              animate={{ color: rightFg }}
              transition={{ duration: 0.35 }}
            >
              Light
            </motion.p>
          </div>
        </div>
      </div>

      {/* Interactive yin-yang — hover on desktop, tap-and-stay on mobile */}
      <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div
          ref={yinRef}
          className="cursor-pointer"
          onPointerMove={handlePointerMove}
          onPointerEnter={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handleSelect}
          onClick={handleSelect}
        >
          <YinYang
            activeHalf={activeHalf}
            aria-label="Choose a side of the yin yang"
            className="h-[min(56vmin,320px)] w-[min(56vmin,320px)] md:h-[min(68vmin,460px)] md:w-[min(68vmin,460px)]"
          />
        </div>
      </div>
    </div>
  )
}

function StaticArrow({ id, variant, color, className = '' }) {
  const curves = {
    darkness: 'M 4 70 C 36 70, 42 22, 70 36 C 92 46, 102 28, 116 40',
    light: 'M 116 30 C 94 18, 88 72, 62 58 C 40 46, 28 78, 4 60',
    mobileTop: 'M 72 6 C 72 34, 28 48, 34 118',
    mobileBottom: 'M 28 134 C 28 106, 72 92, 66 22',
    // From top-left label → tip toward yin (down-right), more curved
    mobileAimYin: 'M 14 8 C 8 48, 92 52, 88 118',
    // From bottom-right label → tip toward yin (up-left), more curved
    mobileAimYinFromLight: 'M 86 132 C 92 92, 8 88, 12 22',
  }
  const curve = curves[variant]
  const tallVariants = new Set([
    'mobileTop',
    'mobileBottom',
    'mobileAimYin',
    'mobileAimYinFromLight',
  ])
  const isTall = tallVariants.has(variant)
  const isDarkDash =
    variant === 'darkness' ||
    variant === 'mobileTop' ||
    variant === 'mobileAimYin'
  const markerId = `t-arrow-head-${id}`

  return (
    <motion.svg
      viewBox={isTall ? '0 0 100 140' : '0 0 120 100'}
      className={`shrink-0 overflow-visible ${className}`}
      fill="none"
      aria-hidden="true"
      animate={{ color }}
      transition={{ duration: 0.35 }}
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          markerWidth="4"
          markerHeight="4"
          refX="8"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      <path
        d={curve}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={isDarkDash ? '2.5 6' : '1.6 4.5'}
        markerEnd={`url(#${markerId})`}
      />
    </motion.svg>
  )
}
