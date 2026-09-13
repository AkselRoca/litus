'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

function Preview() {
  return <div className="seo-demo-wrap" aria-hidden="true">
    <div className="seo-browser">
      <div className="seo-search-header"><span className="google-wordmark"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span><div className="seo-search-field"><span className="seo-query">Votre entreprise sur Google</span></div></div>
      <div className="seo-tabs"><span className="is-active">Tous</span><span>Maps</span><span>Images</span></div>
      <div className="seo-results-area" />
    </div>
  </div>
}

const SearchDemo = dynamic(() => import('./BentoSearchDemo').then(module => module.BentoSearchDemo), { ssr: false, loading: Preview })

export function DeferredSearchDemo() {
  const root = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState(false)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setReady(true); setActive(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting)
      if (entry.isIntersecting) setReady(true)
    }, { rootMargin: '250px 0px' })
    if (root.current) observer.observe(root.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={root}>{ready ? <SearchDemo active={active} /> : <Preview />}</div>
}
