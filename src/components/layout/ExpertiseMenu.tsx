import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown, ChevronRight, Layers3 } from 'lucide-react'
import { expertiseGroups, type ExpertiseLink } from '@/lib/expertises'
import { expertisePath, expertiseTools } from '@/lib/expertise/catalog'

const shortDescriptions: Record<string, string> = {
  nextjs: 'Sites & applications', react: 'Interfaces interactives', typescript: 'Code plus fiable',
  tailwind: 'Design & responsive', framer: 'Sites marketing & CMS', vercel: 'Déploiement & hosting',
  stripe: 'Paiements en ligne', shopify: 'Boutiques e-commerce', wordpress: 'Sites & maintenance',
}

export function ExpertiseMenu({ close, pathname, mobile = false }: { close: () => void; pathname: string; mobile?: boolean }) {
  const prefix = mobile ? 'mobile-compact' : 'desktop-compact'
  function ServiceLink({ item, primary = false }: { item: ExpertiseLink; primary?: boolean }) {
    const Icon = item.icon
    return <Link href={item.href} onClick={close} className={`compact-service${primary ? ' compact-service-primary' : ''}`} aria-current={pathname === item.href ? 'page' : undefined}>
      <span className="compact-service-icon"><Icon size={19} aria-hidden="true" /></span><span><strong>{item.label}</strong><small>{item.description}</small></span><ChevronRight size={13} aria-hidden="true" />
    </Link>
  }
  return <div className={`compact-expertise${mobile ? ' compact-expertise-mobile' : ''}`}>
    <div className="compact-services">
      {expertiseGroups.map((group, index) => {
        const mainItems = index < 2 ? group.items.slice(0, 2) : group.items.filter(item => item.href === '/developpement-web-sur-mesure')
        const otherItems = group.items.filter(item => !mainItems.includes(item))
        return <section key={group.title} aria-labelledby={`${prefix}-${index}`} className="compact-service-group">
          <div className="compact-group-heading"><span>0{index + 1}</span><h2 id={`${prefix}-${index}`}>{group.title}</h2></div>
          <p className="compact-group-intro">{group.description}</p>
          <ul>{mainItems.map(item => <li key={item.href}><ServiceLink item={item} primary={index < 2} /></li>)}</ul>
          <details className="compact-secondary"><summary>{['Autres solutions web', 'Visibilité locale', 'Applications, API & automatisation'][index]}<ChevronDown size={14} aria-hidden="true" /></summary><ul>{otherItems.map(item => <li key={item.href}><ServiceLink item={item} /></li>)}</ul></details>
        </section>
      })}
    </div>
    <section className="compact-tools" aria-labelledby={`${prefix}-tools`}>
      <div className="compact-tools-heading"><h2 id={`${prefix}-tools`}>Nos outils de travail</h2><Link href="/expertise" onClick={close}>Voir toutes les expertises<ArrowRight size={14} aria-hidden="true" /></Link></div>
      <ul>{expertiseTools.map(tool => <li key={tool.slug}><Link href={expertisePath(tool.slug)} onClick={close} data-tool={tool.slug} className="compact-tool" aria-current={pathname === expertisePath(tool.slug) ? 'page' : undefined}><span className="compact-tool-logo"><Image src={tool.logo} alt="" width={26} height={26} unoptimized /></span><span><strong>{tool.name}</strong><small>{shortDescriptions[tool.slug]}</small></span><ChevronRight size={13} aria-hidden="true" /></Link></li>)}</ul>
    </section>
    <div className="compact-menu-footer"><p><Layers3 size={25} aria-hidden="true" /><span><strong>Un projet en tête ?</strong><small>Choisissons les bons outils, ensemble.</small></span></p><Link className="compact-menu-cta" href="/contact" onClick={close}>Parlons de votre projet<ArrowRight size={16} aria-hidden="true" /></Link><Link className="compact-menu-work" href="/realisations" onClick={close}>Nos réalisations<ChevronRight size={15} aria-hidden="true" /></Link></div>
  </div>
}
