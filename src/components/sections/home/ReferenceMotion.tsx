'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { animateNumber as animate } from '@/lib/animate-number'

export function ReferenceReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        element.dataset.revealed = 'true'
        observer.disconnect()
      }
    }, { threshold: .08 })
    element.dataset.revealed = 'false'
    observer.observe(element)
    const show = () => { if (reduced.matches) { element.dataset.revealed = 'true'; observer.disconnect() } }
    reduced.addEventListener('change', show)
    return () => { observer.disconnect(); reduced.removeEventListener('change', show) }
  }, [])
  return <div ref={ref} className={`reference-reveal ${className}`}>{children}</div>
}

export function ReferenceNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return
    let stop: (() => void) | undefined
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer.disconnect()
      const controls = animate(0, value, {
        duration: .9, ease: [0.22, 1, 0.36, 1],
        onUpdate: current => { element.textContent = `${Math.round(current)}${suffix}` },
        onComplete: () => { element.textContent = `${value}${suffix}` },
      })
      stop = () => controls.stop()
    }, { threshold: .7 })
    observer.observe(element)
    const finish = () => { if (reduced.matches) { stop?.(); element.textContent = `${value}${suffix}`; observer.disconnect() } }
    reduced.addEventListener('change', finish)
    return () => { observer.disconnect(); stop?.(); reduced.removeEventListener('change', finish) }
  }, [value, suffix])
  return <><span ref={ref} aria-hidden="true">{value}{suffix}</span><span className="sr-only">{value}{suffix}</span></>
}

export function ReferenceAnnotation({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`reference-annotation ${className}`} aria-hidden="true">{children}<svg viewBox="0 0 76 66" fill="none"><path d="M14 5C10 35 32 55 63 52m0 0L50 42m13 10-16 5" /></svg></div>
}
