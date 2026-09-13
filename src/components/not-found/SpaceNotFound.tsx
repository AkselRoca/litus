'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Caveat } from 'next/font/google'
import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Code2, LayoutGrid, Monitor, Pause, Play, Search, ShoppingBag, Timer } from 'lucide-react'
import inventory from '@/lib/editorial/site-inventory.json'

const handwriting = Caveat({ preload: false, subsets: ['latin'], weight: ['500'], display: 'swap', variable: '--font-space-handwriting' })

type SearchEntry = { title: string; href: string; description?: string; kind: string }

const routeTitles: Record<string, string> = {
  '/': 'Accueil', '/a-propos': 'Nos agences : Lorient et Le Mans',
  '/contact': 'Contacter Litus', '/realisations': 'Nos réalisations',
  '/expertise': 'Expertises et outils de travail', '/tarifs': 'Tarifs et budget de votre projet',
  '/blog': 'Le blog Litus', '/ressources/cahier-des-charges': 'Générateur de cahier des charges',
}

const pages: SearchEntry[] = Array.from(new Map([
  ...inventory.services.map(service => ({ title: service.title, href: service.path, description: service.description, kind: 'Service' })),
  ...['/', ...inventory.routes].filter(path => !/^\/(admin|api|login)(\/|$)/.test(path)).map(path => ({
    title: routeTitles[path] ?? path.split('/').filter(Boolean).join(' · ').replaceAll('-', ' '), href: path, kind: 'Page',
  })),
].map(page => [page.href, page])).values())

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const shortcuts = [
  { title: 'Création de site internet', description: 'Un site clair, rapide et pensé pour vos clients.', href: '/creation-site-internet', icon: Monitor, accent: '#ff6927', tint: '255, 105, 39' },
  { title: 'E-commerce', description: 'Une boutique simple à gérer, qui vend.', href: '/creation-site-ecommerce', icon: ShoppingBag, accent: '#69c988', tint: '105, 201, 136' },
  { title: 'Référencement SEO', description: 'Des contenus visibles sur Google.', href: '/referencement-naturel', icon: Search, accent: '#a4ecfa', tint: '164, 236, 250' },
  { title: 'Google Ads', description: 'Des campagnes qui génèrent des résultats.', href: '/google-ads', icon: null, accent: '#87adff', tint: '135, 173, 255' },
  { title: 'Développement & IA', description: 'Des outils sur mesure pour votre activité.', href: '/developpement-web-sur-mesure', icon: Code2, accent: '#8daffd', tint: '141, 175, 253' },
  { title: 'Nos réalisations', description: 'Découvrez nos derniers projets.', href: '/realisations', icon: LayoutGrid, accent: '#b6caff', tint: '182, 202, 255' },
]

function HandArrow({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 100 65" fill="none" aria-hidden="true"><path d="M8 5c8 30 31 42 70 43M66 36l14 13-18 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export function SpaceNotFound() {
  const router = useRouter()
  const [remaining, setRemaining] = useState(10)
  const [paused, setPaused] = useState(false)
  const countdownControl = useRef<HTMLButtonElement>(null)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [articleIndex, setArticleIndex] = useState<SearchEntry[] | null>(null)
  const [articleError, setArticleError] = useState(false)
  const [loadingArticles, setLoadingArticles] = useState(false)

  useEffect(() => {
    const pause = (event: Event) => {
      // The control toggles its own state. Do not preempt it on pointerdown
      // or keyboard activation before its click handler has run.
      if (event.target instanceof Node && countdownControl.current?.contains(event.target)) return
      setPaused(true)
    }
    const visibility = () => { if (document.hidden) setPaused(true) }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true)
    document.addEventListener('pointerdown', pause, { passive: true })
    document.addEventListener('keydown', pause)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      document.removeEventListener('pointerdown', pause)
      document.removeEventListener('keydown', pause)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [])

  useEffect(() => {
    if (paused) return
    if (remaining === 0) { router.replace('/'); return }
    const timer = window.setTimeout(() => {
      if (!document.hidden) setRemaining(value => Math.max(0, value - 1))
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [paused, remaining, router])

  useEffect(() => {
    if (query.trim().length < 2 || articleIndex !== null || articleError) return
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      setLoadingArticles(true)
      try {
        const response = await fetch('/api/not-found-search', { signal: controller.signal })
        if (!response.ok) throw new Error('Search unavailable')
        const data = await response.json() as { articles: SearchEntry[] }
        if (!controller.signal.aborted) setArticleIndex(data.articles)
      } catch {
        if (!controller.signal.aborted) setArticleError(true)
      } finally {
        if (!controller.signal.aborted) setLoadingArticles(false)
      }
    }, 250)
    return () => { window.clearTimeout(timer); controller.abort(); setLoadingArticles(false) }
  }, [query, articleIndex, articleError])

  const results = useMemo(() => {
    const words = normalize(query.trim()).split(/\s+/).filter(Boolean)
    if (!words.length) return []
    return [...pages, ...(articleIndex ?? [])].map(entry => {
      const title = normalize(entry.title)
      const haystack = `${title} ${normalize(entry.description ?? '')}`
      return { entry, score: words.every(word => haystack.includes(word)) ? 1 + words.filter(word => title.includes(word)).length : 0 }
    }).filter(result => result.score > 0).sort((a, b) => b.score - a.score).slice(0, 6).map(result => result.entry)
  }, [query, articleIndex])

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPaused(true)
    setSearchOpen(true)
  }

  return <div className={`litus-404 ${handwriting.variable}`}>
    <title>Page introuvable (404) | Litus</title>
    <meta name="robots" content="noindex, follow" />

    <div className="space-scene" aria-hidden="true">
      <Image src="/images/404/astronaute-litus-lune-404.webp" alt="" width={1877} height={838} sizes="100vw" priority quality={90} className="space-scene-image" />
    </div>
    <div className="space-stars" aria-hidden="true" />
    <span className="space-meteor" aria-hidden="true" />

    <section className="space-hero" aria-labelledby="space-title">
      <p className="space-annotation space-annotation-orbit">Pas de panique,<br />on vous remet<br />sur orbite !<HandArrow /></p>
      <div className="space-hero-copy">
        <h1 id="space-title">Cette page n’existe pas<br /><span>(mais on a d’autres bonnes idées)</span></h1>
        <p className="space-explanation">La page que vous cherchez a peut-être été déplacée, supprimée<br className="space-wide-break" /> ou n’a jamais existé. En attendant, autant explorer ce qu’on fait de mieux !</p>

        <div className="space-search-area" onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setSearchOpen(false)
        }} onKeyDown={event => { if (event.key === 'Escape') setSearchOpen(false) }}>
          <form className="space-search" role="search" onSubmit={submitSearch}>
            <Search size={23} aria-hidden="true" />
            <label className="space-sr-only" htmlFor="space-search-input">Rechercher une page, un service ou un article</label>
            <input id="space-search-input" type="search" maxLength={100} autoComplete="off" placeholder="Rechercher une page, un service, un article..." value={query} aria-controls="space-search-results" aria-expanded={searchOpen && query.trim().length > 0} onFocus={() => { setPaused(true); setSearchOpen(true) }} onChange={event => { setQuery(event.target.value); setSearchOpen(true) }} />
            <button type="submit" aria-label="Lancer la recherche"><ArrowRight size={24} /></button>
          </form>
          {searchOpen && query.trim() && <div id="space-search-results" className="space-search-results">
            <p className="space-search-status" role="status">{results.length ? `${results.length} destination${results.length > 1 ? 's' : ''} pour repartir du bon pied` : loadingArticles ? 'Recherche en cours…' : 'Aucune destination trouvée pour cette recherche.'}</p>
            {results.length > 0 && <ul>{results.map(result => <li key={result.href}><Link href={result.href}><span><small>{result.kind}</small>{result.title}</span><ArrowRight size={17} aria-hidden="true" /></Link></li>)}</ul>}
            {articleError && <p className="space-search-status">La recherche d’articles est momentanément indisponible. Les pages et services restent accessibles.</p>}
            {!results.length && !loadingArticles && <Link className="space-search-help" href="/contact">Besoin d’un coup de main ? Contactez-nous <ArrowRight size={16} aria-hidden="true" /></Link>}
          </div>}
        </div>

        <div className="space-countdown">
          <Timer size={19} aria-hidden="true" />
          <p>{paused ? <>Redirection en pause. Prenez le temps d’explorer.</> : <>Redirection automatique vers l’accueil dans <strong>{remaining}</strong> seconde{remaining !== 1 ? 's' : ''}…</>}</p>
          <button ref={countdownControl} type="button" aria-label={paused ? 'Reprendre la redirection automatique' : 'Mettre la redirection automatique en pause'} onClick={event => {
            event.stopPropagation()
            if (paused && remaining === 0) setRemaining(10)
            setPaused(value => !value)
          }}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
        </div>
      </div>
    </section>

    <nav className="space-shortcuts" aria-label="Retrouvez les services Litus">
      {shortcuts.map(({ title, description, href, icon: Icon, accent, tint }) => <Link key={href} href={href} className="space-service" style={{ '--service-accent': accent, '--service-tint': tint } as CSSProperties}>
        <span className="space-service-icon" aria-hidden="true">{Icon ? <Icon size={30} strokeWidth={1.8} /> : <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M15 6 6 23" stroke="#fbbc04" strokeWidth="9" strokeLinecap="round" /><path d="m16 6 10 17" stroke="#4285f4" strokeWidth="9" strokeLinecap="round" /><circle cx="6" cy="23" r="4.5" fill="#34a853" /></svg>}</span>
        <span className="space-service-copy"><strong>{title}</strong><span>{description}</span></span>
        <span className="space-service-arrow" aria-hidden="true"><ArrowRight size={17} /></span>
      </Link>)}
    </nav>

    <footer className="space-footer">
      <Link href="/" className="space-footer-brand" aria-label="Litus, retour à l’accueil"><Image src="/logo-white.png" alt="" width={37} height={42} /><strong>Litus</strong></Link>
      <nav aria-label="Navigation de secours"><Link href="/">Accueil <ArrowRight size={17} aria-hidden="true" /></Link><Link href="/a-propos">Nos agences <ArrowRight size={17} aria-hidden="true" /></Link><Link href="/contact">Nous contacter <ArrowRight size={17} aria-hidden="true" /></Link></nav>
      <Link href="/" className="space-annotation space-return"><span aria-hidden="true">←</span> Retour à l’accueil</Link>
    </footer>
  </div>
}
