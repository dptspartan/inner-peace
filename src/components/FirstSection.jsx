import YinYang from './YinYang'

export default function FirstSection() {
  return (
    <div className="h-[200vh] w-full">
      {/* Hero — peace kanji */}
      <div
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white"
        role="img"
        aria-label="平和 — peace"
      >
        {/* Mobile: stacked characters for true center (vertical-rl shifts sideways) */}
        <span
          aria-hidden
          className="flex select-none flex-col items-center justify-center font-serif text-[46vmin] font-bold leading-none text-black md:hidden"
          style={{
            textShadow: [
              '0 6px 0 rgba(0,0,0,0.08)',
              '0 18px 24px rgba(0,0,0,0.22)',
              '0 36px 56px rgba(0,0,0,0.28)',
              '0 56px 90px rgba(0,0,0,0.18)',
              '0 80px 120px rgba(0,0,0,0.12)',
            ].join(', '),
          }}
        >
          <span>平</span>
          <span>和</span>
        </span>

        {/* Desktop: horizontal */}
        <span
          aria-hidden
          className="hidden select-none font-serif text-[50vmin] font-bold leading-none text-black md:inline"
          style={{
            textShadow: [
              '0 6px 0 rgba(0,0,0,0.08)',
              '0 18px 24px rgba(0,0,0,0.22)',
              '0 36px 56px rgba(0,0,0,0.28)',
              '0 56px 90px rgba(0,0,0,0.18)',
              '0 80px 120px rgba(0,0,0,0.12)',
            ].join(', '),
          }}
        >
          平和
        </span>
      </div>

      {/* Mobile: yin top / copy bottom (tight). Desktop: copy left / yin right. */}
      <div className="flex h-screen w-full flex-col bg-white md:flex-row md:items-center">
        <div className="order-2 flex flex-col justify-start px-6 pt-8 pb-10 md:order-1 md:w-1/2 md:flex-1 md:justify-center md:overflow-visible md:px-16 md:py-0 lg:px-24">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-black md:mb-6 md:text-3xl lg:text-4xl">
            Finding True Peace...
          </h2>
          <div className="max-w-xl space-y-2 text-justify text-base leading-relaxed text-stone-700 md:space-y-4 md:text-sm lg:text-md">
            <p>
              Finding true peace doesn’t mean the chaos around you suddenly vanishes;
              it means finding a quiet, immovable sanctuary within your own heart
              despite it. When life feels overwhelmingly loud and the demands of the
              world pull you in every direction, remember that you do not have to
              match the frantic pace of your surroundings to survive them. You are
              allowed to slow down, breathe, and simply exist in the present moment,
              anchoring yourself in the knowledge that even the heaviest storms
              eventually run out of rain.
            </p>
            <p>
              To help you find that gentle stillness today, hold onto this beautiful
              reminder by John Green:
            </p>
            <blockquote className="border-l-2 border-stone-900 py-1 pl-4 font-serif text-[1.05em] leading-snug text-stone-900 italic md:pl-5">
              “There is hope, even when your brain tells you there isn’t.”
            </blockquote>
            <p>
              Give yourself permission to rest, take things one heartbeat at a time,
              and let your inner balance be your shield.
            </p>
          </div>
        </div>

        <div className="order-1 flex shrink-0 items-end justify-center pt-8 pb-8 md:order-2 md:w-1/2 md:flex-1 md:items-center md:pt-0 md:pb-0">
          <YinYang
            aria-hidden
            className="h-[min(50vmin,240px)] w-[min(50vmin,240px)] md:h-[min(80vmin,420px)] md:w-[min(80vmin,420px)]"
       
          />
        </div>
      </div>
    </div>
  )
}
