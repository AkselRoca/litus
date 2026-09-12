'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { expertisePath, homeTools } from '@/lib/expertise/catalog'
import './logo-cloud-links.css'

const tools = homeTools

function ToolList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul aria-hidden={duplicate || undefined}>
      {tools.map(tool => {
        return <li key={tool.slug}><Link href={expertisePath(tool.slug)} tabIndex={duplicate ? -1 : undefined} className="technology-tool-link" aria-label={`Découvrir notre expertise ${tool.name}`}><span className="technology-logo-slot" aria-hidden="true"><Image className="technology-brand-image" src={tool.logo} width={26} height={26} alt="" loading="lazy" unoptimized /></span><span>{tool.name}</span></Link></li>
      })}
    </ul>
  )
}

export function LogoCloud() {
  const [paused, setPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const list = track?.querySelector('ul')
    if (!track || !list) return

    // Keep the same comfortable speed as the catalogue grows or fonts resize.
    const measure = () => {
      track.style.setProperty('--technology-duration', `${list.getBoundingClientRect().width / 36}s`)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    measure()
    return () => observer.disconnect()
  }, [])

  return (
    <section className="technology-strip" aria-labelledby="technology-strip-title">
      <div className="editorial-container">
        <p id="technology-strip-title"><Link href="/expertise" className="technology-hub-link">Nos outils de travail<span>Explorer les expertises</span></Link></p>

        <div className="technology-marquee" role="group" tabIndex={0} aria-label="Les outils utilisés par Litus">
          <div className="technology-track" ref={trackRef} data-paused={paused}>
            <ToolList />
            <ToolList duplicate />
          </div>
        </div>
        <button
          className="technology-pause"
          type="button"
          aria-label={paused ? 'Reprendre le défilement des outils' : 'Mettre le défilement des outils en pause'}
          aria-pressed={paused}
          onClick={() => setPaused(value => !value)}
        >
          {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        </button>
      </div>
    </section>
  )
}
