'use client'

import dynamic from 'next/dynamic'
import { useSyncExternalStore } from 'react'

const DesktopScene = dynamic(() => import('./TerritoryScene').then(module => module.TerritoryScene), { ssr: false })
const query = '(min-width: 1180px)'
function subscribe(callback: () => void) {
  const media = window.matchMedia(query)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}
const desktopSnapshot = () => window.matchMedia(query).matches
const serverSnapshot = () => false

export function TerritoryScene() {
  const desktop = useSyncExternalStore(subscribe, desktopSnapshot, serverSnapshot)
  return desktop ? <DesktopScene /> : null
}
