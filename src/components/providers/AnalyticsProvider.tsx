'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// Generate a simple session ID
const getSessionId = () => {
    if (typeof window === 'undefined') return null

    let sessionId = sessionStorage.getItem('litus_session')
    if (!sessionId) {
        sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        sessionStorage.setItem('litus_session', sessionId)
    }
    return sessionId
}

// Send tracking data to our API
const sendToApi = async (type: string, data: any) => {
    try {
        await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, data }),
        })
    } catch (error) {
        console.error('[Analytics] Failed to send:', error)
    }
}

// Track page view
const trackPageView = (path: string) => {
    const sessionId = getSessionId()
    sendToApi('pageview', {
        path,
        referrer: typeof document !== 'undefined' ? document.referrer : null,
        sessionId,
    })
}

// Track Web Vital
const trackWebVital = (metric: { name: string; value: number; rating: string }) => {
    const sessionId = getSessionId()
    const path = typeof window !== 'undefined' ? window.location.pathname : '/'

    sendToApi('webvital', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        path,
        sessionId,
    })
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isFirstRender = useRef(true)

    // Track page views on route change
    useEffect(() => {
        // Skip admin pages
        if (pathname?.startsWith('/admin')) return

        // Track on mount and route changes
        trackPageView(pathname || '/')

        // Only initialize web vitals once
        if (isFirstRender.current) {
            isFirstRender.current = false
            initWebVitals()
        }
    }, [pathname])

    return <>{children}</>
}

// Initialize Web Vitals tracking using the web-vitals library pattern
function initWebVitals() {
    if (typeof window === 'undefined') return

    // Dynamic import to avoid SSR issues
    import('web-vitals').then(({ onCLS, onFID, onLCP, onTTFB, onFCP }) => {
        // Largest Contentful Paint
        onLCP((metric) => {
            trackWebVital({
                name: 'LCP',
                value: metric.value,
                rating: metric.rating,
            })
        })

        // First Input Delay
        onFID((metric) => {
            trackWebVital({
                name: 'FID',
                value: metric.value,
                rating: metric.rating,
            })
        })

        // Cumulative Layout Shift
        onCLS((metric) => {
            trackWebVital({
                name: 'CLS',
                value: metric.value,
                rating: metric.rating,
            })
        })

        // Time to First Byte
        onTTFB((metric) => {
            trackWebVital({
                name: 'TTFB',
                value: metric.value,
                rating: metric.rating,
            })
        })

        // First Contentful Paint
        onFCP((metric) => {
            trackWebVital({
                name: 'FCP',
                value: metric.value,
                rating: metric.rating,
            })
        })
    }).catch((err) => {
        console.warn('[Analytics] Web Vitals not available:', err)
    })
}
