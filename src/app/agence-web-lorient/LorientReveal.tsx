'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/** Progressive enhancement: the content remains visible without JavaScript. */
export function LorientReveal({ children, className }: { children: ReactNode; className?: string }) {
  const element = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = element.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!root || preference.matches || !('IntersectionObserver' in window)) return
    const animations: Animation[] = []
    const targets = Array.from(root.querySelectorAll('[data-lorient-reveal]'))
    const stop = () => animations.forEach(animation => animation.cancel())
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        if (!preference.matches) {
          const delay = window.innerWidth > 800 ? targets.indexOf(entry.target) * 90 : 0
          animations.push(entry.target.animate(
            [{ opacity: .65, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 550, delay, easing: 'cubic-bezier(.2,.7,.3,1)' },
          ))
          const line = entry.target.querySelector('.lorient-method-line')
          if (line) animations.push(line.animate(
            [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
            { duration: 900, delay, easing: 'ease-out' },
          ))
        }
        observer.unobserve(entry.target)
      })
    }, { threshold: .15 })
    targets.forEach(target => observer.observe(target))
    preference.addEventListener('change', stop)
    return () => { observer.disconnect(); preference.removeEventListener('change', stop); stop() }
  }, [])

  return <div ref={element} className={className}>{children}</div>
}
