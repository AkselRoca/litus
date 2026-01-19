'use client'

import * as React from 'react'

/**
 * Provider Lenis pour smooth scroll global
 * DÉSACTIVÉ temporairement pour debug dev server
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
    // useLenis() - disabled for dev
    return <>{children}</>
}
