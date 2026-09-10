'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/** Content is visible by default, including without JavaScript or animations. */
export function GoogleAdsReveal({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!element || preference.matches || !('IntersectionObserver' in window)) return
    const animations: Animation[] = []
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      Array.from(element.children).forEach((child, index) => {
        if (typeof child.animate === 'function') animations.push(child.animate(
          [{ opacity: .45, transform: 'translateY(9px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 450, delay: index * 90, easing: 'cubic-bezier(.2,.6,.3,1)' },
        ))
      })
      observer.disconnect()
    }, { threshold: .12 })
    const cancel = () => { if (preference.matches) { animations.forEach(animation => animation.cancel()); observer.disconnect() } }
    observer.observe(element)
    preference.addEventListener('change', cancel)
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); preference.removeEventListener('change', cancel) }
  }, [])
  return <div ref={ref} className={className}>{children}</div>
}
