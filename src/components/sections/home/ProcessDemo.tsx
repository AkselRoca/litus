'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Check,
  Code2,
  LoaderCircle,
  MousePointer2,
  Rocket,
  Search,
  Target,
  TrendingUp,
} from 'lucide-react'

const LOOP_DURATION = 18_500
const phaseStarts = [0, 4_300, 7_600, 11_500]

function activePhase(elapsed: number) {
  if (elapsed < phaseStarts[1]) return 0
  if (elapsed < phaseStarts[2]) return 1
  if (elapsed < phaseStarts[3]) return 2
  return 3
}

function progress(value: number, start: number, duration: number) {
  return Math.max(0, Math.min(1, (value - start) / duration))
}

function MiniTrend({ active }: { active: boolean }) {
  return <svg className="method-mini-trend" viewBox="0 0 92 30" aria-hidden="true">
    <path className={active ? 'is-drawn' : ''} pathLength="1" d="M2 27C13 25 17 20 27 21C38 22 42 14 52 16C62 18 68 9 77 11C84 12 87 5 90 3" />
  </svg>
}

export function ProcessDemo() {
  const [paused, setPaused] = useState(false)
  const root = useRef<HTMLOListElement>(null)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => {
      setReduced(media.matches)
      if (media.matches) setElapsed(16_400)
    }
    updateMotion()
    media.addEventListener('change', updateMotion)

    const element = root.current
    if (!element || !('IntersectionObserver' in window)) setPlaying(true)
    const observer = element && 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), { threshold: 0.12 })
      : null
    if (element && observer) observer.observe(element)
    return () => {
      observer?.disconnect()
      media.removeEventListener('change', updateMotion)
    }
  }, [])

  useEffect(() => {
    if (!playing || reduced || paused) return
    const startedAt = performance.now() - elapsed
    const timer = window.setInterval(() => setElapsed((performance.now() - startedAt) % LOOP_DURATION), 80)
    return () => window.clearInterval(timer)
    // Restart from the paused elapsed value whenever the section returns onscreen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, reduced, paused])

  const phase = reduced ? 3 : activePhase(elapsed)
  const auditQuery = 'agence web Lorient'
  const typedQuery = auditQuery.slice(0, Math.round(auditQuery.length * progress(elapsed, 500, 1_250)))
  const auditLoading = elapsed >= 1_800 && elapsed < 2_450
  const strategyProgress = progress(elapsed, 4_450, 2_100)
  const code = "const site = {\n  seo: true,\n  performance: 'optimized',\n  responsive: true,\n};"
  const typedCode = code.slice(0, Math.round(code.length * progress(elapsed, 7_850, 2_550)))
  const launchStep = elapsed < 12_650 ? 0 : elapsed < 13_700 ? 1 : elapsed < 14_600 ? 2 : 3

  const sliders = useMemo(() => [
    { label: 'Google Ads', sub: 'Générer du trafic rapidement', start: 30, end: 80 },
    { label: 'Référencement naturel', sub: 'Croissance durable', start: 24, end: 70 },
    { label: 'Création du site', sub: 'Une base solide et performante', start: 20, end: 60 },
  ], [])

  return <><div className="method-demo-controls"><button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "Reprendre la démonstration" : "Mettre la démonstration en pause"}</button></div><ol ref={root} className="reference-method-steps" data-phase={phase + 1}>
    <li className="method-card method-audit" data-active={phase === 0} data-complete={phase > 0}>
      <MethodHeader number="01" icon={Search} title="Audit & analyse">
        Nous analysons votre présence actuelle, vos besoins et votre concurrence pour identifier les meilleures opportunités.
      </MethodHeader>
      <div className="method-ui method-audit-ui">
        <div className="method-search-field"><Search size={15} /><span>{typedQuery || 'Rechercher un mot-clé…'}</span><i className="method-type-caret" /><LoaderCircle size={18} className={auditLoading ? 'is-loading' : ''} /></div>
        <div className="method-keyword-list">
          <KeywordRow label="agence web Lorient" state={elapsed >= 2_450 ? 'Opportunité locale' : 'Analyse en cours…'} tone="green" loading={auditLoading || elapsed < 2_450} visible={elapsed >= 1_750 || reduced} />
          <KeywordRow label="création site internet Le Mans" state="Fort potentiel" tone="green" visible={elapsed >= 3_000 || reduced} />
          <KeywordRow label="référencement naturel Morbihan" state="Concurrence élevée" tone="amber" visible={elapsed >= 3_550 || reduced} />
        </div>
      </div>
      <Connector index={0} phase={phase} />
    </li>

    <li className="method-card method-strategy" data-active={phase === 1} data-complete={phase > 1}>
      <MethodHeader number="02" icon={Target} title="Stratégie sur mesure">
        Nous définissons les priorités, l’architecture du site et une stratégie adaptée à vos objectifs.
      </MethodHeader>
      <div className="method-ui method-strategy-ui">
        {sliders.map(item => {
          const value = Math.round(item.start + (item.end - item.start) * strategyProgress)
          return <div className="method-slider-row" key={item.label}>
            <div><strong>{item.label}</strong><small>{item.sub}</small></div>
            <div className="method-slider"><span style={{ width: `${value}%` }}><i style={{ left: `${value}%` }} /></span></div><b>{value} %</b>
          </div>
        })}
      </div>
      <div className={`method-result-line ${elapsed >= 6_700 || reduced ? 'is-visible' : ''}`}><span><Check size={14} /> Stratégie optimisée</span><small>Objectifs alignés<br />et plan d’action prêt.</small></div>
      <Connector index={1} phase={phase} />
    </li>

    <li className="method-card method-development" data-active={phase === 2} data-complete={phase > 2}>
      <MethodHeader number="03" icon={Code2} title="Développement & optimisation">
        Nous concevons, développons et optimisons votre site avec une attention particulière à la performance et au référencement.
      </MethodHeader>
      <div className="method-ui method-code-window">
        <div className="method-code-bar"><span /><span /><span /><small>index.ts</small></div>
        <pre><code>{typedCode}</code><i className="method-code-caret" /></pre>
      </div>
      <div className="method-code-badges">
        {['SEO', 'Performance', 'Responsive'].map((label, index) => <span key={label} className={elapsed >= 10_250 + index * 360 || reduced ? 'is-visible' : ''}><Check size={13} />{label}</span>)}
      </div>
      <Connector index={2} phase={phase} />
    </li>

    <li className="method-card method-launch" data-active={phase === 3} data-complete={reduced || elapsed >= 15_850}>
      <MethodHeader number="04" icon={BarChart3} title="Lancement & suivi">
        Nous assurons la mise en ligne puis le suivi pour faire évoluer votre site et maximiser ses résultats.
      </MethodHeader>
      <div className="method-ui method-launch-ui">
        <div aria-hidden="true" className={`method-launch-button ${launchStep > 0 ? 'is-launched' : ''}`}><Rocket size={17} />{launchStep > 0 ? 'Site en ligne' : 'Lancer le site'}<MousePointer2 className="method-demo-pointer" size={27} /></div>
        <div className="method-launch-progress">
          {['Préparation', 'Mise en ligne', 'En ligne'].map((label, index) => <span key={label} className={launchStep > index ? 'is-done' : ''}><i>{launchStep > index ? <Check size={12} /> : index + 1}</i><small>{label}</small></span>)}
        </div>
        <div className="method-stats">
          {[['Visiteurs', '+124 %'], ['Positions Google', '+37'], ['Demandes de contact', '+68 %']].map(([label, value], index) => <div key={label} className={elapsed >= 14_650 + index * 250 || reduced ? 'is-visible' : ''}><small>{label}</small><strong>{value} <TrendingUp size={13} /></strong><MiniTrend active={elapsed >= 14_650 + index * 250 || reduced} /></div>)}
        </div>
      </div>
    </li>
  </ol></>
}

function MethodHeader({ number, icon: Icon, title, children }: { number: string; icon: typeof Search; title: string; children: React.ReactNode }) {
  return <div className="method-card-copy"><span className="reference-step-icon"><Icon size={24} /></span><div><span className="reference-step-number">{number}</span><h3>{title}</h3><p>{children}</p></div></div>
}

function KeywordRow({ label, state, tone, visible, loading = false }: { label: string; state: string; tone: 'green' | 'amber'; visible: boolean; loading?: boolean }) {
  return <div className={visible ? 'is-visible' : ''}><strong>{label}</strong><BarChart3 size={13} /><span data-tone={tone}>{state}</span>{loading ? <LoaderCircle size={14} className="is-loading" /> : <Check size={14} />}</div>
}

function Connector({ index, phase }: { index: number; phase: number }) {
  return <span className="method-connector" data-lit={phase > index}><i /><b><ArrowRight size={16} /></b></span>
}
