'use client'

import { useEffect, useRef, type HTMLAttributes } from 'react'

/** All content remains visible before hydration and when motion is reduced. */
export function ServiceReveal({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    if (!root || preference.matches || !('IntersectionObserver' in window)) return
    const effects: Animation[] = []
    const stop = () => effects.forEach(effect => effect.cancel())
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        if (!preference.matches) effects.push(entry.target.animate(
          [{ opacity: .65, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 480, delay: Math.min(Array.from(root.children).indexOf(entry.target), 3) * 65, easing: 'cubic-bezier(.2,.7,.3,1)' },
        ))
        observer.unobserve(entry.target)
      })
    }, { threshold: .12 })
    Array.from(root.children).forEach(child => observer.observe(child))
    preference.addEventListener('change', stop)
    return () => { observer.disconnect(); preference.removeEventListener('change', stop); stop() }
  }, [])
  return <div ref={ref} className={className} {...props}>{children}</div>
}
