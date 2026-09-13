'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { readCookieConsent } from '@/lib/cookie-consent'

function canMeasure() {
  return readCookieConsent()?.analytics === true && !window.location.pathname.startsWith('/admin')
}

function sessionId() {
  try {
    let id = sessionStorage.getItem('litus_session')
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem('litus_session', id)
    }
    return id
  } catch {
    return undefined
  }
}

function send(type: string, data: Record<string, unknown>) {
  if (!canMeasure()) return
  void fetch('/api/track', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data }), keepalive: true,
  }).catch(() => { /* Measurement must never interrupt navigation. */ })
}

function cleanReferrer() {
  try {
    const url = new URL(document.referrer)
    return `${url.origin}${url.pathname}`
  } catch { return '' }
}

let vitalsStarted = false
export default function ConsentedAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!canMeasure()) return
    send('pageview', { path: pathname, referrer: cleanReferrer(), sessionId: sessionId() })
    if (vitalsStarted) return
    vitalsStarted = true
    void import('web-vitals').then(({ onCLS, onLCP, onTTFB, onFCP }) => {
      const report = (metric: { name: string; value: number; rating: string }) => {
        send('webvital', { name: metric.name, value: metric.value, rating: metric.rating, path: window.location.pathname, sessionId: sessionId() })
      }
      onCLS(report); onLCP(report); onTTFB(report); onFCP(report)
    }).catch(() => { vitalsStarted = false })
  }, [pathname])

  return <>
    <Analytics beforeSend={event => canMeasure() ? event : null} />
    <SpeedInsights beforeSend={event => canMeasure() ? event : null} />
  </>
}
