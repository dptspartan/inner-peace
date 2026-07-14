import { useEffect, useState } from 'react'

/** True below Tailwind `md` (768px). Desktop layout is unchanged at md+. */
export default function useIsMobile(query = '(max-width: 767px)') {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return isMobile
}
