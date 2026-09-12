'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { expertisePath, expertiseTools } from '@/lib/expertise/catalog'
import './logo-cloud-links.css'

type Tool = { name: string; src: string; color?: string }

const tools = [
  { name: 'Next.js', src: '/brands/nextdotjs.svg', color: 'var(--ink)' },
  { name: 'React', src: '/brands/react.svg', color: '#61DAFB' },
  { name: 'TypeScript', src: '/brands/typescript.svg', color: '#3178C6' },
  { name: 'Tailwind', src: '/brands/tailwindcss.svg', color: '#06B6D4' },
  { name: 'Framer', src: '/brands/framer.svg', color: '#0055FF' },
  { name: 'Vercel', src: '/brands/vercel.svg', color: 'var(--ink)' },
  { name: 'Stripe', src: '/brands/stripe.svg', color: '#635BFF' },
  { name: 'Shopify', src: '/brands/shopify.svg', color: '#7AB55C' },
  { name: 'WordPress', src: '/brands/wordpress.svg', color: '#21759B' },
  { name: 'Google Workspace', src: '/brands/google-workspace.png' },
  { name: 'Gemini', src: '/brands/gemini.png' },
  { name: 'Google Ads', src: '/brands/google-ads.svg' },
  { name: 'Meta Ads', src: '/brands/meta-ads-official.svg' },
  { name: 'Make', src: '/brands/make-official.svg' },
  { name: 'Notion', src: '/brands/notion-official.svg' },
  { name: 'Brevo', src: '/brands/brevo-official.svg' },
  { name: 'HubSpot', src: '/brands/hubspot-official.svg' },
  { name: 'Airtable', src: '/brands/airtable-official.png' },
  { name: 'Microsoft 365', src: '/brands/microsoft-365.svg' },
  { name: 'Microsoft Copilot', src: '/brands/microsoft-copilot.png' },
  { name: 'n8n', src: '/brands/n8n-official.svg' },
  { name: 'Zapier', src: '/brands/zapier-official.svg' },
  { name: 'Webflow', src: '/brands/webflow-official.svg' },
  { name: 'OpenAI', src: '/brands/openai-official.svg', color: 'var(--ink)' },
  { name: 'Claude', src: '/brands/claude-official.png' },
] satisfies Tool[]

function ToolList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul aria-hidden={duplicate || undefined}>
      {tools.map(tool => {
        const linkedTool = expertiseTools.find(item => item.name === tool.name || (tool.name === 'Tailwind' && item.slug === 'tailwind'))
        const identity = <>
          <span className="technology-logo-slot" aria-hidden="true">
            {tool.color ? (
              <span
                className="technology-logo"
                style={
                  {
                    '--technology-logo': `url('${tool.src}')`,
                    '--technology-color': tool.color,
                  } as CSSProperties
                }
              />
            ) : (
              <Image
                className="technology-brand-image"
                src={tool.src}
                width={26}
                height={26}
                alt=""
                loading="eager"
                unoptimized
              />
            )}
          </span>
          <span>{tool.name}</span>
        </>
        return <li key={tool.name}>{linkedTool ? <Link href={expertisePath(linkedTool.slug)} tabIndex={duplicate ? -1 : undefined} className="technology-tool-link" aria-label={`Découvrir notre expertise ${linkedTool.name}`}>{identity}</Link> : identity}</li>
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
