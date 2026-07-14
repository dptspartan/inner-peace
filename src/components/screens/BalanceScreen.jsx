import { motion, useTransform } from 'framer-motion'

/**
 * Screen 1 — arrows hug the yin-yang; labels on outer ends.
 * Mobile: Darkness top / Light bottom; vertical arrows into left/right of yin.
 * Desktop: unchanged side layout.
 */
export default function BalanceScreen({ progress }) {
  const draw = useTransform(progress, [0, 0.12, 0.28, 0.38], [0, 1, 1, 0])
  const labelOpacity = useTransform(progress, [0.08, 0.16, 0.28, 0.38], [0, 1, 1, 0])
  const labelXLeft = useTransform(progress, [0.08, 0.16, 0.28, 0.38], [-16, 0, 0, -10])
  const labelXRight = useTransform(progress, [0.08, 0.16, 0.28, 0.38], [16, 0, 0, 10])
  const labelYTop = useTransform(progress, [0.08, 0.16, 0.28, 0.38], [-12, 0, 0, -8])
  const labelYBottom = useTransform(progress, [0.08, 0.16, 0.28, 0.38], [12, 0, 0, 8])
  const arrowOpacity = useTransform(progress, [0, 0.04, 0.28, 0.38], [0, 1, 1, 0])

  // Sit just outside the larger yin edge (mobile ~56vmin / desktop ~68vmin)
  const edgeDesktop = 'calc(50% + min(35vmin, 238px))'
  const edgeMobile = 'calc(50% + min(29vmin, 168px))'

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* ——— Mobile ——— */}
      <div className="md:hidden">
        {/* Top: Darkness → arrow down into left of yin */}
        <div
          className="absolute left-0 right-0 flex flex-col items-center gap-0.5"
          style={{ bottom: edgeMobile }}
        >
          <motion.p
            className="font-serif text-lg tracking-[0.18em] text-white uppercase"
            style={{ opacity: labelOpacity, y: labelYTop }}
          >
            Darkness
          </motion.p>
          <CurvedArrow
            id="darkness-m"
            draw={draw}
            opacity={arrowOpacity}
            variant="mobileTop"
            className="h-24 w-20 -translate-x-6"
          />
        </div>

        {/* Bottom: arrow up into right of yin → Light */}
        <div
          className="absolute left-0 right-0 flex flex-col items-center gap-0.5"
          style={{ top: edgeMobile }}
        >
          <CurvedArrow
            id="light-m"
            draw={draw}
            opacity={arrowOpacity}
            variant="mobileBottom"
            className="h-24 w-20 translate-x-6"
          />
          <motion.p
            className="font-serif text-lg tracking-[0.18em] text-white uppercase"
            style={{ opacity: labelOpacity, y: labelYBottom }}
          >
            Light
          </motion.p>
        </div>
      </div>

      {/* ——— Desktop ——— */}
      <div className="hidden md:block">
        <div
          className="absolute top-1/2 flex -translate-y-1/2 items-center gap-2"
          style={{ right: edgeDesktop }}
        >
          <motion.p
            className="shrink-0 font-serif text-xl tracking-[0.18em] text-white uppercase md:text-2xl"
            style={{ opacity: labelOpacity, x: labelXLeft }}
          >
            Darkness
          </motion.p>
          <CurvedArrow
            id="darkness"
            draw={draw}
            opacity={arrowOpacity}
            variant="darkness"
            className="h-20 w-40 md:h-24 md:w-48"
          />
        </div>

        <div
          className="absolute top-1/2 flex -translate-y-1/2 items-center gap-2"
          style={{ left: edgeDesktop }}
        >
          <CurvedArrow
            id="light"
            draw={draw}
            opacity={arrowOpacity}
            variant="light"
            className="h-20 w-40 md:h-24 md:w-48"
          />
          <motion.p
            className="shrink-0 font-serif text-xl tracking-[0.18em] text-white uppercase md:text-2xl"
            style={{ opacity: labelOpacity, x: labelXRight }}
          >
            Light
          </motion.p>
        </div>
      </div>
    </div>
  )
}

function CurvedArrow({ id, draw, opacity, variant, className = '' }) {
  const curves = {
    // Desktop horizontal
    darkness: 'M 4 70 C 36 70, 42 22, 70 36 C 92 46, 102 28, 116 40',
    light: 'M 116 30 C 94 18, 88 72, 62 58 C 40 46, 28 78, 4 60',
    // Mobile vertical — tip into left / right of yin
    mobileTop: 'M 72 6 C 72 34, 28 48, 34 118',
    mobileBottom: 'M 28 134 C 28 106, 72 92, 66 22',
  }

  const curve = curves[variant]
  const isTall = variant === 'mobileTop' || variant === 'mobileBottom'
  const isDarkDash = variant === 'darkness' || variant === 'mobileTop'

  const markerId = `arrow-head-${id}`
  const maskId = `arrow-draw-${id}`

  return (
    <motion.svg
      viewBox={isTall ? '0 0 100 140' : '0 0 120 100'}
      className={`shrink-0 overflow-visible ${className}`}
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
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
          <path d="M 0 0 L 10 5 L 0 10 z" fill="white" />
        </marker>

        <mask id={maskId}>
          <motion.path
            d={curve}
            stroke="white"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            style={{ pathLength: draw }}
          />
        </mask>
      </defs>

      <path
        d={curve}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={isDarkDash ? '2.5 6' : '1.6 4.5'}
        mask={`url(#${maskId})`}
      />

      <motion.path
        d={curve}
        stroke="white"
        strokeOpacity={0}
        strokeWidth="2"
        fill="none"
        markerEnd={`url(#${markerId})`}
        style={{ pathLength: draw }}
      />
    </motion.svg>
  )
}
