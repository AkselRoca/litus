'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowRight, ArrowUpRight, Building2, ChevronDown, ChevronRight,
  FileChartColumn, FileText, Landmark, Mail, Menu, Newspaper, Phone,
  MapPin, Sun, Tag, UsersRound, Wrench, X,
} from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { expertiseGroups, isExpertisePath, type ExpertiseLink } from '@/lib/expertises'
import './header.css'
import './expertise-menu.css'
import { ExpertiseMenu } from './ExpertiseMenu'

const personas = [
  { label: 'Artisans', href: '/artisans', icon: Wrench },
  { label: 'PME', href: '/pme', icon: Building2 },
  { label: 'Grands Comptes', href: '/grands-comptes', icon: UsersRound },
  { label: 'Collectivités', href: '/collectivites', icon: Landmark },
]
const resources = [
  { label: 'Blog', href: '/blog', icon: Newspaper },
  { label: 'Guide des tarifs web', href: '/ressources/guide-prix', icon: FileText },
  { label: 'Tarifs', href: '/tarifs', icon: Tag },
]
const agencies = [
  { label: 'Le Mans', description: 'Notre présence en Sarthe et vos rendez-vous sur place.', href: '/agence-web-le-mans', icon: MapPin },
  { label: 'Lorient', description: 'Notre présence dans le pays de Lorient.', href: '/agence-web-lorient', icon: MapPin },
  { label: 'À propos de Litus', description: 'Deux expertises réunies autour de vos objectifs.', href: '/a-propos', icon: UsersRound },
]
const mobileSecondary = [
  { label: 'Réalisations', href: '/realisations', icon: FileChartColumn },
  ...resources,
  { label: 'Contact', href: '/contact', icon: Mail },
]

type Dropdown = 'expertises' | 'solutions' | 'agencies' | 'resources'

function MegaLink({ item, close, pathname, mobile = false }: { item: ExpertiseLink; close: () => void; pathname: string; mobile?: boolean }) {
  const Icon = item.icon
  return <Link className={`mega-service-link${mobile ? ' mobile-expertise-link' : ''}`} href={item.href} onClick={close} aria-current={pathname === item.href ? 'page' : undefined}>
    <span className="mega-service-icon"><Icon aria-hidden="true" /></span>
    <span><strong>{item.label}</strong><small>{item.description}</small></span>
    <ChevronRight aria-hidden="true" />
  </Link>
}

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown] = useState<Dropdown | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const mobileCloseRef = useRef<HTMLButtonElement>(null)
  const mobilePanelRef = useRef<HTMLDivElement>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openMode = useRef<'hover' | 'press'>('hover')
  const clearHoverTimer = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = null
  }, [])
  const close = useCallback(() => { clearHoverTimer(); setMobileOpen(false); setDropdown(null) }, [clearHoverTimer])
  const closeAndReturnFocus = useCallback(() => {
    close()
    requestAnimationFrame(() => menuToggleRef.current?.focus())
  }, [close])
  const openDropdown = (name: Dropdown, mode: 'hover' | 'press' = 'hover') => {
    clearHoverTimer()
    // When switching from keyboard navigation to another hovered menu, move
    // focus before its old panel becomes inert and the browser blurs it.
    const focusedPanel = document.activeElement?.closest('.header-mega-menu, .header-small-menu')
    if (mode === 'hover' && focusedPanel && focusedPanel.id !== `nav-${name}`) {
      headerRef.current?.querySelector<HTMLButtonElement>(`button[aria-controls="nav-${name}"]`)?.focus({ preventScroll: true })
    }
    openMode.current = mode; setDropdown(name)
  }
  const leaveDropdown = (entry: HTMLDivElement) => {
    if (entry.contains(document.activeElement) && document.activeElement?.tagName !== 'BUTTON') return
    clearHoverTimer()
    hoverTimer.current = setTimeout(() => setDropdown(null), 180)
  }
  const toggleDropdown = (name: Dropdown) => {
    clearHoverTimer()
    if (dropdown === name && openMode.current === 'press') setDropdown(null)
    else openDropdown(name, 'press')
  }
  const dropdownKey = (event: ReactKeyboardEvent<HTMLButtonElement>, name: Dropdown) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault(); openDropdown(name, 'press')
    const last = event.key === 'ArrowUp'
    requestAnimationFrame(() => {
      const links = headerRef.current?.querySelectorAll<HTMLAnchorElement>(`#nav-${name} a`)
      if (links?.length) links[last ? links.length - 1 : 0].focus()
    })
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && (mobileOpen || dropdown)) {
        event.preventDefault()
        if (mobileOpen) closeAndReturnFocus()
        else {
          const trigger = headerRef.current?.querySelector<HTMLButtonElement>(`button[aria-controls="nav-${dropdown}"]`)
          close(); requestAnimationFrame(() => trigger?.focus())
        }
      }
      if (event.key === 'Tab' && mobileOpen) {
        const links = [...(mobilePanelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), summary, [tabindex="0"]') ?? [])].filter(node => node.getClientRects().length > 0)
        const first = links[0], last = links[links.length - 1]
        if (event.shiftKey && (document.activeElement === first || !mobilePanelRef.current?.contains(document.activeElement))) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (dropdown && headerRef.current && !headerRef.current.contains(event.target as Node)) setDropdown(null)
    }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('keydown', onKey); window.addEventListener('pointerdown', onPointer)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onPointer) }
  }, [dropdown, mobileOpen, close, closeAndReturnFocus])

  useEffect(() => () => clearHoverTimer(), [clearHoverTimer])

  useEffect(() => {
    if (!mobileOpen) return
    const bodyOverflow = document.body.style.overflow
    const htmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'; document.documentElement.style.overflow = 'hidden'; mobileCloseRef.current?.focus()
    return () => { document.body.style.overflow = bodyOverflow; document.documentElement.style.overflow = htmlOverflow }
  }, [mobileOpen])

  useEffect(() => {
    const desktop = matchMedia('(min-width: 1180px)')
    const handle = () => close()
    desktop.addEventListener('change', handle)
    return () => desktop.removeEventListener('change', handle)
  }, [close])

  const expertiseActive = isExpertisePath(pathname) || pathname === '/expertise' || pathname.startsWith('/expertise/')
  const solutionsActive = personas.some(item => pathname.startsWith(item.href))
  const resourcesActive = resources.some(item => pathname.startsWith(item.href))
  const agenciesActive = pathname === '/a-propos' || pathname.startsWith('/agence-web-')

  return <header ref={headerRef} className="site-header" data-home={pathname === '/' || undefined} data-compact={scrolled || undefined} data-menu-open={dropdown || undefined} onBlurCapture={event => {
    const activeEntry = dropdown ? event.currentTarget.querySelector(`button[aria-controls="nav-${dropdown}"]`)?.parentElement : null
    if (!event.currentTarget.contains(event.relatedTarget) || (activeEntry && !activeEntry.contains(event.relatedTarget))) { clearHoverTimer(); setDropdown(null) }
  }}>
    <div className="site-header-inner">
      <Link href="/" aria-label="Litus — Accueil" onClick={close} className="header-brand">
        <span className="header-logo"><span className="header-logo-mark" aria-hidden="true" /></span>
        <strong>Litus</strong>
        <span className="header-brand-note">Agence web —<br />Lorient · Le Mans</span>
      </Link>

      <nav className="header-desktop-nav" aria-label="Navigation principale">
        <div className="header-nav-entry header-expertise-entry" onMouseEnter={() => openDropdown('expertises')} onMouseLeave={event => leaveDropdown(event.currentTarget)}>
          <button type="button" className={expertiseActive ? 'is-active' : ''} aria-expanded={dropdown === 'expertises'} aria-controls="nav-expertises" onClick={() => toggleDropdown('expertises')} onKeyDown={event => dropdownKey(event, 'expertises')}>
            Expertises <ChevronDown aria-hidden="true" />
          </button>
          <div className="header-mega-menu header-expertise-panel" id="nav-expertises" data-open={dropdown === 'expertises' || undefined} aria-hidden={dropdown !== 'expertises'} inert={dropdown !== 'expertises'}>
            <ExpertiseMenu key={dropdown === 'expertises' ? 'open' : 'closed'} close={close} pathname={pathname} />
          </div>
        </div>

        <div className="header-nav-entry" onMouseEnter={() => openDropdown('solutions')} onMouseLeave={event => leaveDropdown(event.currentTarget)}>
          <button type="button" className={solutionsActive ? 'is-active' : ''} aria-expanded={dropdown === 'solutions'} aria-controls="nav-solutions" onClick={() => toggleDropdown('solutions')} onKeyDown={event => dropdownKey(event, 'solutions')}>Solutions <ChevronDown aria-hidden="true" /></button>
          <div className="header-small-menu" id="nav-solutions" data-open={dropdown === 'solutions' || undefined} aria-hidden={dropdown !== 'solutions'} inert={dropdown !== 'solutions'}>{personas.map(item => <Link key={item.href} href={item.href} onClick={close}>{item.label}<ChevronRight /></Link>)}</div>
        </div>
        <Link className={pathname.startsWith('/realisations') ? 'is-active' : ''} href="/realisations" onClick={close}>Réalisations</Link>
        <div className="header-nav-entry" onMouseEnter={() => openDropdown('agencies')} onMouseLeave={event => leaveDropdown(event.currentTarget)}>
          <button type="button" className={agenciesActive ? 'is-active' : ''} aria-expanded={dropdown === 'agencies'} aria-controls="nav-agencies" onClick={() => toggleDropdown('agencies')} onKeyDown={event => dropdownKey(event, 'agencies')}>Agences <ChevronDown aria-hidden="true" /></button>
          <div className="header-small-menu header-agencies-menu" id="nav-agencies" data-open={dropdown === 'agencies' || undefined} aria-hidden={dropdown !== 'agencies'} inert={dropdown !== 'agencies'}>
            {agencies.map(item => { const Icon = item.icon; return <Link key={item.label} href={item.href} onClick={close}><span className="header-agency-icon"><Icon aria-hidden="true" /></span><span><strong>{item.label}</strong><small>{item.description}</small></span><ChevronRight aria-hidden="true" /></Link> })}
          </div>
        </div>
        <div className="header-nav-entry" onMouseEnter={() => openDropdown('resources')} onMouseLeave={event => leaveDropdown(event.currentTarget)}>
          <button type="button" className={resourcesActive ? 'is-active' : ''} aria-expanded={dropdown === 'resources'} aria-controls="nav-resources" onClick={() => toggleDropdown('resources')} onKeyDown={event => dropdownKey(event, 'resources')}>Ressources <ChevronDown aria-hidden="true" /></button>
          <div className="header-small-menu" id="nav-resources" data-open={dropdown === 'resources' || undefined} aria-hidden={dropdown !== 'resources'} inert={dropdown !== 'resources'}>{resources.map(item => <Link key={item.href} href={item.href} onClick={close}>{item.label}<ChevronRight /></Link>)}</div>
        </div>
      </nav>

      <div className="header-tools">
        <a href="tel:+33744985521" className="header-phone" aria-label="Appeler Litus au 07 44 98 55 21"><Phone aria-hidden="true" />07 44 98 55 21</a>
        <div className="header-theme"><ThemeToggle /></div>
        <Link className="header-project-cta" href="/contact">Démarrer un projet <ArrowUpRight aria-hidden="true" /></Link>
        <button ref={menuToggleRef} type="button" className="header-menu-toggle" aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
      </div>
    </div>

    {mobileOpen && <div className="mobile-menu-overlay" role="dialog" aria-modal="true" aria-label="Menu principal" onMouseDown={event => event.target === event.currentTarget && closeAndReturnFocus()}>
      <div ref={mobilePanelRef} className="mobile-menu-panel" id="mobile-navigation">
        <div className="mobile-menu-topbar">
          <Link href="/" aria-label="Litus — Accueil" onClick={close} className="header-logo"><span className="header-logo-mark" aria-hidden="true" /></Link>
          <a href="tel:+33744985521" className="mobile-menu-top-phone" onClick={close}><Phone aria-hidden="true" />07 44 98 55 21</a>
          <button ref={mobileCloseRef} type="button" className="mobile-menu-close" aria-label="Fermer le menu" onClick={closeAndReturnFocus}><X aria-hidden="true" /></button>
        </div>
        <div className="mobile-menu-scroll">
          <div className="mobile-menu-theme"><span className="mobile-menu-theme-icon"><Sun aria-hidden="true" /></span><span>Thème d’affichage</span><ThemeToggle /></div>
          <section className="mobile-menu-section mobile-menu-expertises" aria-labelledby="mobile-expertises"><h2 id="mobile-expertises">Expertises</h2>
            <ExpertiseMenu key={mobileOpen ? 'mobile-open' : 'mobile-closed'} close={close} pathname={pathname} mobile />
          </section>
          {[{ id: 'mobile-solutions', title: 'Solutions', items: personas },{ id: 'mobile-agencies', title: 'Agences', items: agencies }].map(group => <section className="mobile-menu-section" key={group.id} aria-labelledby={group.id}><h2 id={group.id}>{group.title}</h2><ul className="mobile-menu-list">{group.items.map(item => {const Icon=item.icon;return <li key={`${item.href}-${item.label}`}><Link href={item.href} onClick={close}><span className="mobile-menu-link-icon"><Icon aria-hidden="true" /></span><span>{item.label}</span><ChevronRight className="mobile-menu-chevron" aria-hidden="true" /></Link></li>})}</ul></section>)}
          <nav className="mobile-menu-secondary" aria-label="Liens secondaires"><ul className="mobile-menu-list">{mobileSecondary.map(item=>{const Icon=item.icon;return <li key={item.href}><Link href={item.href} onClick={close}><span className="mobile-menu-link-icon"><Icon aria-hidden="true" /></span><span>{item.label}</span><ChevronRight className="mobile-menu-chevron" aria-hidden="true" /></Link></li>})}</ul></nav>
        </div>
        <div className="mobile-menu-footer"><Link href="/contact" onClick={close}><span>Démarrer un projet</span><ArrowUpRight aria-hidden="true" /></Link><p>Devis gratuit · Réponse sous 24 h ouvrées</p></div>
      </div>
    </div>}
  </header>
}
