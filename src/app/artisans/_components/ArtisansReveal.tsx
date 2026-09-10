'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/** Content is already visible in the server HTML; entry effects are optional. */
export function ArtisansReveal({ children, className }: { children: ReactNode; className?: string }) {
  const element = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = element.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!root || preference.matches || !('IntersectionObserver' in window)) return
    const effects: Animation[] = []
    const stop = () => effects.forEach(effect => effect.cancel())
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        if (!preference.matches) effects.push(entry.target.animate(
          [{ opacity: .55, transform: 'translateY(9px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 430, delay: Array.from(root.children).indexOf(entry.target) * 75, easing: 'cubic-bezier(.2,.7,.3,1)' },
        ))
        observer.unobserve(entry.target)
      })
    }, { threshold: .12 })
    Array.from(root.children).forEach(child => observer.observe(child))
    preference.addEventListener('change', stop)
    return () => { observer.disconnect(); preference.removeEventListener('change', stop); stop() }
  }, [])
  return <div ref={element} className={className}>{children}</div>
}
