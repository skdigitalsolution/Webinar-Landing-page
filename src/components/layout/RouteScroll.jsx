import { useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export default function RouteScroll() {
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const behavior = reduced || navigationType === 'POP' ? 'instant' : 'smooth'
      if (hash) {
        const aliases = { registration: 'register', 'register-consent': 'register', 'life-dimensions': 'circle-of-life', 'life-explorer': 'circle-of-life' }
        const target = document.getElementById(aliases[hash.slice(1)] || hash.slice(1))
        target?.scrollIntoView({ behavior })
        target?.focus({ preventScroll: true })
      } else if (pathname === '/') window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key, navigationType])
  return null
}
