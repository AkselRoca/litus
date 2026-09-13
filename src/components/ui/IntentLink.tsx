'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ComponentProps } from 'react'

/** Prefetch on intent, not every time a carousel brings another link onscreen. */
export default function IntentLink({ onMouseEnter, onFocus, ...props }: ComponentProps<typeof Link>) {
  const router = useRouter()
  function prepare() {
    if (typeof props.href !== 'string') return
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (connection?.saveData) return
    const target = new URL(props.href, window.location.href)
    if (target.origin === window.location.origin && target.pathname !== window.location.pathname) {
      router.prefetch(`${target.pathname}${target.search}`)
    }
  }
  return <Link {...props} prefetch={false} onMouseEnter={event => { onMouseEnter?.(event); prepare() }} onFocus={event => { onFocus?.(event); prepare() }} />
}
