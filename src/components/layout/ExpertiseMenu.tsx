'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown, ChevronRight, Layers3, Pause, Play } from 'lucide-react'
import { expertiseGroups, type ExpertiseLink } from '@/lib/expertises'
import { expertisePath, expertiseTools, expertiseTool, expertiseStyle } from '@/lib/expertise/catalog'

const shortDescriptions: Record<string, string> = { shopify: 'Votre boutique en ligne', react: 'Vos interfaces métier', wordpress: 'Votre site administrable' }
const featured = (['shopify', 'react', 'wordpress'] as const).map(expertiseTool)
const secondary = expertiseTools.filter(tool => !featured.some(item => item.slug === tool.slug))
const offer = (href: string) => href.includes('google-ads') ? 'ads' : href.includes('ecommerce') ? 'commerce' : /seo|referencement/.test(href) ? 'seo' : /automatisation|outils-ia/.test(href) ? 'automation' : /application|developpement|api/.test(href) ? 'development' : 'web'

export function ExpertiseMenu({ close, pathname, mobile = false }: { close: () => void; pathname: string; mobile?: boolean }) {
  const [paused, setPaused] = useState(false)
  const prefix = mobile ? 'mobile-compact' : 'desktop-compact'
  function ServiceLink({ item, primary = false }: { item: ExpertiseLink; primary?: boolean }) {
    const Icon = item.icon
    return <Link href={item.href} onClick={close} data-offer={offer(item.href)} className={`compact-service${primary ? ' compact-service-primary' : ''}`} aria-current={pathname === item.href ? 'page' : undefined}><span className="compact-service-icon">{item.href === '/google-ads' ? <Image src="/brands/color/google-ads.png" alt="" width={26} height={26} /> : <Icon size={20} aria-hidden="true" />}</span><span><strong>{item.label}</strong><small>{item.description}</small></span><ChevronRight size={13} aria-hidden="true" /></Link>
  }
  return <div className={`compact-expertise${mobile ? ' compact-expertise-mobile' : ''}`}>
    <div className="compact-services">{expertiseGroups.map((group, index) => {
      const mainItems = group.items.slice(0, 2)
      const otherItems = group.items.filter(item => !mainItems.includes(item))
      return <section key={group.title} aria-labelledby={`${prefix}-${index}`} className="compact-service-group"><div className="compact-group-heading"><span>0{index + 1}</span><div className="seo-nav-title" id={`${prefix}-${index}`}>{group.title}</div></div><p className="compact-group-intro">{group.description}</p><ul>{mainItems.map(item => <li key={item.href}><ServiceLink item={item} primary={index < 2} /></li>)}</ul><details className="compact-secondary"><summary>{['Autres solutions web', 'Visibilité locale', 'API, automatisation & IA'][index]}<ChevronDown size={14} aria-hidden="true" /></summary><ul>{otherItems.map(item => <li key={item.href}><ServiceLink item={item} /></li>)}</ul></details></section>
    })}</div>
    <section className="compact-tools" aria-labelledby={`${prefix}-tools`}>
      <div className="compact-tools-heading"><div className="seo-nav-title" id={`${prefix}-tools`}>Nos outils de travail</div><Link href="/expertise" onClick={close}>Voir toutes les expertises<ArrowRight size={14} aria-hidden="true" /></Link></div>
      <div className="compact-tools-layout"><ul className="compact-featured-tools">{featured.map(tool => <li key={tool.slug}><Link href={expertisePath(tool.slug)} onClick={close} data-tool={tool.slug} style={expertiseStyle(tool.slug)} className="compact-tool" aria-current={pathname === expertisePath(tool.slug) ? 'page' : undefined}><span className="compact-tool-logo"><Image src={tool.logo} alt="" width={26} height={26} unoptimized /></span><span><strong>{tool.name}</strong><small>{shortDescriptions[tool.slug]}</small></span><ChevronRight size={13} aria-hidden="true" /></Link></li>)}</ul>
        <div className="compact-tools-secondary"><div className="compact-marquee-heading"><span>IA, collaboration et autres outils</span><button type="button" aria-label={paused ? 'Reprendre le défilement des technologies' : 'Mettre en pause le défilement des technologies'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={12} /> : <Pause size={12} />}</button></div><div className="compact-marquee" data-paused={paused || undefined}><div className="compact-tools-track"><div className="compact-tools-run">{secondary.map(tool => <Link href={expertisePath(tool.slug)} onClick={close} key={tool.slug}><Image src={tool.logo} alt="" width={22} height={22} unoptimized /><span>{tool.name}</span></Link>)}</div><div className="compact-tools-run compact-tools-repeat" aria-hidden="true">{secondary.map(tool => <span key={tool.slug}><Image src={tool.logo} alt="" width={22} height={22} unoptimized /><span>{tool.name}</span></span>)}</div></div></div></div>
      </div>
    </section>
    <div className="compact-menu-footer"><p><Layers3 size={25} aria-hidden="true" /><span><strong>Un projet en tête ?</strong><small>Un site, une boutique ou un outil métier.</small></span></p><Link className="compact-menu-cta" href="/contact" onClick={close}>Parlons de votre projet<ArrowRight size={16} aria-hidden="true" /></Link><Link className="compact-menu-work" href="/realisations" onClick={close}>Nos réalisations<ChevronRight size={15} aria-hidden="true" /></Link></div>
  </div>
}
