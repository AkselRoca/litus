'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

let previousPath: string | null = null

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const navigating = previousPath !== null && previousPath !== pathname
    previousPath = pathname
    if (!navigating || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animation = root.current?.animate(
      [{ transform: 'translateY(6px)', opacity: 0.85 }, { transform: 'translateY(0)', opacity: 1 }],
      { duration: 180, easing: 'ease-out' },
    )
    return () => animation?.cancel()
  }, [pathname])

  return <div ref={root} className="w-full h-full">{children}</div>
}
