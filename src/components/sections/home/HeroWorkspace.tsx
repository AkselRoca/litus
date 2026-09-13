'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { ArrowUpRight, Search, Star, Users, Zap } from 'lucide-react'
import { Caveat } from 'next/font/google'

const handwriting = Caveat({ preload: false, subsets: ['latin'], weight: '400', display: 'swap' })

export function HeroWorkspace() {
  const scene = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLElement>(null)
  useEffect(() => {
    const element = scene.current
    if (!element) return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let start: number | null = null
    const tick = (time: number) => {
      start ??= time
      const progress = Math.min((time - start) / 1400, 1)
      if (count.current) count.current.textContent = `+${Math.round(245 * (1 - Math.pow(1 - progress, 3)))} %`
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    const reset = () => {element.style.setProperty('--pointer-x', '0px'); element.style.setProperty('--pointer-y', '0px')}
    const move = (event: PointerEvent) => {
      if (preference.matches || event.pointerType !== 'mouse') return
      const box = element.getBoundingClientRect()
      element.style.setProperty('--pointer-x', `${((event.clientX - box.left) / box.width - .5) * 10}px`)
      element.style.setProperty('--pointer-y', `${((event.clientY - box.top) / box.height - .5) * 7}px`)
    }
    const change = () => {
      if (preference.matches) {cancelAnimationFrame(frame); reset(); if (count.current) count.current.textContent = '+245 %'}
    }
    if (!preference.matches) frame = requestAnimationFrame(tick)
    element.addEventListener('pointermove', move)
    element.addEventListener('pointerleave', reset)
    preference.addEventListener('change', change)
    return () => {cancelAnimationFrame(frame);element.removeEventListener('pointermove', move);element.removeEventListener('pointerleave', reset);preference.removeEventListener('change', change)}
  }, [])

  return <div className="home-workspace" ref={scene}>
    <Image className="home-workspace-photo" src="/home-litus-workspace.webp" alt="Un ordinateur présentant le site Litus sur un bureau lumineux, accompagné d’une tasse au logo de l’agence." width={1536} height={1024} priority sizes="(max-width: 760px) 100vw, 65vw" />
    <div className="home-workspace-cards">
      <div className="home-floating home-google-card">
        <div className="home-google-search"><span className="home-google-g" aria-hidden="true">G</span><span>agence web Lorient<Search size={13} aria-hidden="true" /></span></div>
        <div className="home-google-result"><span className="home-google-rank">1</span><div><strong>Litus Agency</strong><span>https://litus-agency.fr</span><p>Agence web à Lorient & Le Mans<br />Sites internet, SEO et Google Ads.</p></div></div>
      </div>
      <div className="home-floating home-growth-card">
        <p>Visibilité en hausse</p><div className="home-growth-value" aria-label="Plus 245 pour cent"><strong ref={count} aria-hidden="true">+245 %</strong><ArrowUpRight size={18} aria-hidden="true" /></div>
        <svg className="home-growth-chart" viewBox="0 0 180 90" aria-hidden="true">
          <defs><linearGradient id="home-chart-bars" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#e95e2a" stopOpacity=".65"/><stop offset="1" stopColor="#e95e2a" stopOpacity=".04"/></linearGradient></defs>
          {[12,19,26,24,34,47,45,43,58,69,86].map((height,i)=><rect key={i} x={i*16+6} y={90-height} width="7" height={height} fill="url(#home-chart-bars)" />)}
          <path d="M3 81 16 78 32 67 48 65 64 68 80 56 96 42 112 43 128 43 144 28 160 20 175 4" fill="none" stroke="#e95e2a" strokeWidth="2" pathLength="1"/><circle cx="175" cy="4" r="3" fill="#e95e2a" />
        </svg><span className="home-chart-period">12 derniers mois</span>
      </div>
      <div className="home-floating home-clients-card"><Users size={22} aria-hidden="true" /><div><strong>+30</strong><span>entreprises<br />accompagnées</span></div></div>
      <div className="home-floating home-rating-card"><Star size={25} aria-hidden="true" /><div><strong>5/5</strong><span>sur Google</span></div></div>
      <div className="home-floating home-speed-card"><Zap size={26} aria-hidden="true" /><p>Un site plus rapide<br />= plus de clients</p></div>
      <span aria-hidden="true" className={`home-workspace-note home-note-google ${handwriting.className}`}>En top sur<br />Google<svg viewBox="0 0 70 60"><path d="M12 4c0 26 16 38 44 41m-10-9 11 10-14 5" /></svg></span>
      <span aria-hidden="true" className={`home-workspace-note home-note-growth ${handwriting.className}`}>Plus de visibilité,<br />plus de clients</span>
    </div>
  </div>
}
