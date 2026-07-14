import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FirstSection from './components/FirstSection'
import SecondSection from './components/SecondSection'
import ThirdSection from './components/ThirdSection'

export default function App() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // First: hero → copy (stays under second, then under third)
  const firstY = useTransform(scrollYProgress, [0, 0.16], ['0%', '-50%'])

  // Second slides ON TOP of first → screens → slides OFF upward
  const secondY = useTransform(
    scrollYProgress,
    [0.16, 0.26, 0.7, 0.86],
    ['100%', '0%', '0%', '-100%'],
  )

  const screenProgress = useTransform(scrollYProgress, [0.26, 0.7], [0, 1])

  // Hidden until second starts leaving, then hard 100% forever after (no fade)
  const thirdOpacity = useTransform(scrollYProgress, (v) => (v >= 0.69 ? 1 : 0))

  return (
    <div ref={containerRef} className="relative h-[640vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <motion.div
          className="absolute inset-x-0 top-0 z-[1] w-full"
          style={{ y: firstY }}
        >
          <FirstSection />
        </motion.div>

        {/* Above first only when active — never semi-transparent */}
        <motion.div
          className="absolute inset-0 z-[2] w-full"
          style={{ opacity: thirdOpacity }}
        >
          <ThirdSection />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-10 w-full"
          style={{ y: secondY }}
        >
          <SecondSection progress={screenProgress} />
        </motion.div>
      </div>
    </div>
  )
}
