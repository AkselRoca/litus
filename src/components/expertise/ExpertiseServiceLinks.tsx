import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { expertisePath, expertiseTool } from '@/lib/expertise/catalog'
import type { ExpertiseSlug } from '@/lib/expertise/types'
import './expertise-service-links.css'

export function ExpertiseServiceLinks({ tools, title, description }: { tools: ExpertiseSlug[]; title: string; description: string }) {
  return <section className="ex-service-links" aria-label={title}><div className="ex-service-links-container"><div><p>Nos outils de travail</p><h2>{title}</h2><p>{description}</p></div><div className="ex-service-links-grid">{tools.map(slug => { const tool = expertiseTool(slug); return <Link key={slug} href={expertisePath(slug)}><Image src={tool.logo} alt="" width={27} height={27} loading="lazy" unoptimized /><span><strong>{tool.name}</strong><small>{tool.summary}</small></span><ArrowUpRight size={17} aria-hidden="true" /></Link> })}</div></div></section>
}
