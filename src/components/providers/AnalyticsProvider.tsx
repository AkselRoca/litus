'use client'

import { useEffect, useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { CONSENT_EVENT, readCookieConsent } from '@/lib/cookie-consent'

const ConsentedAnalytics = dynamic(() => import('./ConsentedAnalytics'), { ssr: false })

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [allowed, setAllowed] = useState(false)
  useEffect(() => {
    const sync = () => setAllowed(readCookieConsent()?.analytics === true)
    sync()
    window.addEventListener(CONSENT_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])
  return <>{children}{allowed && !pathname.startsWith('/admin') && <ConsentedAnalytics />}</>
}

export default AnalyticsProvider
