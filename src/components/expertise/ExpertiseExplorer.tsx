'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Search, X, Code2, Monitor, ShoppingBag, Gauge, Workflow, Server, PanelsTopLeft, AppWindow } from 'lucide-react'
import { expertiseTools, expertisePath, expertiseStyle } from '@/lib/expertise/catalog'
import { expertiseScenes, expertiseImage } from '@/lib/expertise/visuals'
import { expertiseCategories } from '@/lib/expertise/categories'
import type { ExpertiseSlug } from '@/lib/expertise/types'
import './expertise-explorer.css'

const categories = expertiseCategories
const clean = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

export function ExpertiseExplorer() {
  const [categoryId, setCategoryId] = useState('web')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<ExpertiseSlug>('shopify')
  const category = categories.find(item => item.id === categoryId)!
  const visible = useMemo(() => {
    const search = clean(query)
    return search ? expertiseTools.filter(tool => clean(`${tool.name} ${tool.category} ${tool.summary}`).includes(search)) : category.tools.map(slug => expertiseTools.find(tool => tool.slug === slug)!)
  }, [category, query])
  const tool = visible.find(item => item.slug === selected) ?? visible[0]
  const scene = tool ? expertiseScenes[tool.slug][0] : undefined

  return <section id="outils" className="business-section ex-explorer-section" aria-labelledby="explorer-title">
    <div className="business-container">
      <header className="ex-explorer-heading"><div><p className="business-kicker">Choisissez un sujet, explorez les possibilités</p><h2 id="explorer-title">Ce que vous voulez faire.<br /><em>Les outils pour y arriver.</em></h2></div><label className="ex-explorer-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Rechercher une technologie ou un usage</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="ChatGPT, CRM, boutique, API…" autoComplete="off" />{query && <button type="button" aria-label="Effacer la recherche" onClick={() => setQuery('')}><X size={16} /></button>}</label></header>
      <div className="ex-explorer-shell">
        <nav className="ex-explorer-categories" aria-label="Explorer par besoin">{categories.map(item => { const Icon = item.icon; return <button key={item.id} type="button" aria-pressed={categoryId === item.id && !query} data-category={item.id} onClick={() => { setCategoryId(item.id); setQuery(''); setSelected(item.tools[0]) }}><Icon size={19} aria-hidden="true" /><span>{item.label}</span><ArrowUpRight size={14} aria-hidden="true" /></button> })}<p>Un même outil peut servir plusieurs besoins. Nous le choisissons après le cadrage, pas avant.</p></nav>
        <div className="ex-explorer-workspace">
          <div className="ex-explorer-context"><div><span>{query ? 'Recherche dans toutes les technologies' : category.description}</span><p role="status">{visible.length} technologie{visible.length > 1 ? 's' : ''} disponible{visible.length > 1 ? 's' : ''}</p></div><span className="ex-explorer-counter">{String(expertiseTools.length).padStart(2, '0')} outils / {String(categories.length).padStart(2, '0')} univers</span></div>
          {tool && scene ? <>
            <div className="ex-explorer-picks" aria-label="Choisir une technologie">{visible.map(item => <button type="button" key={item.slug} data-tool={item.slug} style={expertiseStyle(item.slug)} aria-pressed={tool.slug === item.slug} onClick={() => setSelected(item.slug)}><Image src={item.logo} alt="" width={24} height={24} unoptimized /><span>{item.name}</span></button>)}</div>
            <article key={tool.slug} className="ex-explorer-detail" data-tool={tool.slug} style={expertiseStyle(tool.slug)} aria-label={`Aperçu de l’expertise ${tool.name}`}>
              <div className="ex-explorer-media"><Image src={expertiseImage(scene.file)} alt={scene.alt} width={scene.width} height={scene.height} sizes="(max-width: 760px) 88vw, (max-width: 1100px) 58vw, 600px" /><span>{scene.source ? 'Ressource officielle' : 'Exemple illustratif Litus'}</span></div>
              <div className="ex-explorer-copy"><p>{tool.category}</p><h3><Image src={tool.logo} alt="" width={34} height={34} unoptimized />{tool.name}</h3><p>{tool.summary}</p><ul>{scene.points.map(point => <li key={point}>{point}</li>)}</ul><Link href={expertisePath(tool.slug)}>Explorer l’expertise {tool.name}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
            </article>
            <div className="ex-explorer-next"><span>On peut aussi partir de votre besoin.</span><Link href={category.href}>{category.action}<ArrowRight size={16} aria-hidden="true" /></Link></div>
          </> : <div className="ex-explorer-empty"><h3>Aucun outil ne correspond à « {query} ».</h3><p>Un nom de technologie ne résume pas toujours le besoin. Essayez « API », « données » ou décrivez-nous votre projet.</p><button type="button" onClick={() => setQuery('')}>Réinitialiser la recherche</button><Link href="/contact">Parler de mon besoin<ArrowUpRight size={15} aria-hidden="true" /></Link></div>}
        </div>
      </div>
    </div>
  </section>
}
