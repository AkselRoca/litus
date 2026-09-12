import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { ServiceReveal } from '@/components/sections/services/BusinessService'
import { expertiseTool } from '@/lib/expertise/catalog'
import { expertiseImage, expertiseScenes } from '@/lib/expertise/visuals'
import type { ExpertiseSlug } from '@/lib/expertise/types'

export function ExpertiseGallery({ slug, index }: { slug: ExpertiseSlug; index: 0 | 1 }) {
  const scene = expertiseScenes[slug][index]
  const tool = expertiseTool(slug)
  return <section className={`business-section ex-gallery-section${index === 1 ? ' ex-gallery-reverse' : ''}`} aria-labelledby={`visual-${slug}-${index}`}>
    <ServiceReveal className="business-container ex-gallery-grid">
      <div className="ex-gallery-copy"><p className="business-kicker">{tool.name} en pratique · 0{index + 1}</p><h2 id={`visual-${slug}-${index}`}>{scene.title}</h2><p>{scene.text}</p><ul>{scene.points.map(point => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}</ul><Link href={scene.link.href}>{scene.link.label}<ArrowRight size={17} aria-hidden="true" /></Link></div>
      <figure className="ex-gallery-figure"><div className="ex-gallery-stage"><div className="ex-gallery-orbit" aria-hidden="true" /><div className="ex-gallery-browser"><div className="ex-gallery-chrome"><span aria-hidden="true"><i /><i /><i /></span><span>{scene.source ? 'Ressource officielle · démonstration' : 'Atelier Litus · exemple illustratif'}</span><Image src={tool.logo} alt="" width={18} height={18} unoptimized /></div><Image className="ex-gallery-image" src={expertiseImage(scene.file)} alt={scene.alt} width={scene.width} height={scene.height} sizes="(max-width: 760px) 92vw, (max-width: 1100px) 56vw, 700px" loading="lazy" /></div><div className="ex-gallery-note"><span aria-hidden="true">0{index + 1}</span><p>{scene.points[index]}<small>Un point concret de l’intervention.</small></p></div></div><figcaption>{scene.caption}{scene.source && <span><a href={scene.source.href} target="_blank" rel="noopener noreferrer">{scene.source.label}<ArrowUpRight size={12} aria-hidden="true" /></a><a href={scene.source.license}>Licence de la ressource</a></span>}</figcaption></figure>
    </ServiceReveal>
  </section>
}
