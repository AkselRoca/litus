'use client'
import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Caveat } from 'next/font/google'
import type { MarketAnalysis } from '@/lib/gemini'
import { ArrowRight, BarChart3, BriefcaseBusiness, Check, LockKeyhole, MapPin } from 'lucide-react'
import { ReferenceAnnotation, ReferenceReveal } from './home/ReferenceMotion'
import './estimator-reference.css'

const auditHandwriting = Caveat({ subsets: ['latin'], weight: '400', display: 'swap', variable: '--font-audit-handwriting' })

export function EstimatorSection() {
  const [metier, setMetier] = useState('')
  const [ville, setVille] = useState('')
  const [email, setEmail] = useState('')
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null)
  const [analysisId, setAnalysisId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  async function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const response = await fetch('/api/market-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metier: metier.trim(), ville: ville.trim() }),
      })
      const data = await response.json()
      if (!response.ok || !data.success || !data.analysis)
        throw new Error('unavailable')
      setAnalysis(data.analysis)
      setAnalysisId(data.analysisId)
      setSent(false)
    } catch {
      setError(
        'L’estimation est indisponible pour le moment. Vous pouvez nous contacter pour en parler.'
      )
    } finally {
      setBusy(false)
    }
  }
  async function requestAudit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setError('')
    try {
      const response = await fetch('/api/market-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metier, ville, email, analysisId }),
      })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error('unavailable')
      setSent(true)
    } catch {
      setError(
        'Votre demande n’a pas pu être enregistrée. Réessayez ou contactez-nous.'
      )
    } finally {
      setSending(false)
    }
  }
  return (
    <section id="estimateur" className={`home-reference-section reference-audit ${auditHandwriting.variable}`} aria-labelledby="reference-audit-title">
      <ReferenceReveal className="home-reference-container reference-audit-grid">
        <ReferenceAnnotation className="reference-audit-note-left">Des opportunités<br />près de chez vous ?</ReferenceAnnotation>
        <div className="reference-audit-copy">
          <p className="reference-eyebrow"><span>03 —</span> Faire le point</p>
          <h2 id="reference-audit-title" className="home-section-title">
            Quelle place pour{' '}
            <br />
            votre activité en ligne ?
          </h2>
          <p className="reference-intro">
            Indiquez votre métier et votre ville pour obtenir une première
            estimation de votre visibilité locale et des opportunités de croissance pour votre activité.
          </p>
          <div className="reference-audit-actions">
          <Link
            href="/contact?objet=audit"
            className="site-cta-primary"
          >
            Demander directement un audit <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <ul className="reference-reassurance">{['Gratuit et sans engagement', 'Résultats en quelques secondes', 'Conseils personnalisés'].map(text => <li key={text}><Check size={15} aria-hidden="true" />{text}</li>)}</ul>
          </div>
        </div>
        <figure className="reference-audit-photo">
          <Image
            src="/images/entrepreneuse-fleuriste-audit-local-v1.webp"
            alt="Illustration générée par IA : une fleuriste en tablier travaille sur son ordinateur dans sa boutique, entourée de plantes et de fleurs."
            width={960}
            height={1280}
            sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1199px) 38vw, (max-width: 1699px) 25vw, 380px"
            loading="lazy"
          />
          <figcaption><MapPin size={22} aria-hidden="true" /><span>Soutenir les<br />entrepreneurs locaux</span></figcaption>
        </figure>
        <div className="reference-audit-card">
          {!analysis ? (
            <form onSubmit={calculate} aria-busy={busy}>
              <div className="reference-audit-card-heading"><div>
              <h3>Votre marché local</h3>
              <p className="form-description">
                Deux informations pour commencer.
              </p>
              </div><span className="reference-analysis-mark"><BarChart3 size={20} aria-hidden="true" /><span>Une première lecture<br />de votre marché local</span></span></div>
              <label htmlFor="audit-metier">Votre activité</label>
              <div className="reference-input-wrap"><BriefcaseBusiness size={18} aria-hidden="true" />
              <input
                id="audit-metier"
                value={metier}
                onChange={e => setMetier(e.target.value)}
                placeholder="Ex. : Plombier, restaurant, cabinet d’avocat…"
                required
                minLength={2}
                maxLength={100}
                disabled={busy}
              />
              </div>
              <label htmlFor="audit-ville">Votre ville</label>
              <div className="reference-input-wrap"><MapPin size={18} aria-hidden="true" />
              <input
                id="audit-ville"
                value={ville}
                onChange={e => setVille(e.target.value)}
                placeholder="Ex. : Lorient, Le Mans, Vannes…"
                required
                minLength={2}
                maxLength={100}
                disabled={busy}
              />
              </div>
              <button
                className="site-cta-primary"
                disabled={busy}
                type="submit"
              >
                {busy ? 'Estimation en cours…' : 'Obtenir une estimation'}<ArrowRight size={17} aria-hidden="true" />
              </button>
              <p className="reference-privacy"><LockKeyhole size={13} aria-hidden="true" /><span>Vos données servent uniquement à traiter votre demande. <Link href="/politique-confidentialite">Confidentialité</Link></span></p>
            </form>
          ) : (
            <div aria-live="polite">
              <p className="editorial-eyebrow">
                {metier} · {ville}
              </p>
              <h3>Votre première estimation</h3>
              <dl className="audit-results">
                <div>
                  <dt>Recherches mensuelles estimées</dt>
                  <dd>
                    {analysis.recherchesMensuelles.toLocaleString('fr-FR')}
                  </dd>
                </div>
                <div>
                  <dt>Concurrence estimée</dt>
                  <dd>{analysis.concurrence}</dd>
                </div>
                <div>
                  <dt>Tendance estimée</dt>
                  <dd>{analysis.tendance}</dd>
                </div>
                <div>
                  <dt>Potentiel annuel estimé</dt>
                  <dd>{analysis.potentielAnnuel.toLocaleString('fr-FR')} €</dd>
                </div>
              </dl>
              <p>{analysis.analyse}</p>
              <p className="form-note">
                Ces estimations automatiques ne constituent ni des mesures de
                trafic ni une garantie de chiffre d’affaires.
              </p>
              {sent ? (
                <p role="status">
                  Votre demande est enregistrée. Nous reviendrons vers vous.
                </p>
              ) : (
                <form onSubmit={requestAudit} aria-busy={sending}>
                  <label htmlFor="audit-email">
                    Votre e-mail, pour approfondir avec notre équipe
                  </label>
                  <input
                    id="audit-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={sending}
                  />
                  <button
                    className="site-cta-primary"
                    disabled={sending}
                    type="submit"
                  >
                    {sending ? 'Enregistrement…' : 'Demander un audit'}
                  </button>
                  <p className="form-note">
                    Votre adresse sert à répondre à cette demande.{' '}
                    <Link href="/politique-confidentialite">
                      Confidentialité
                    </Link>
                  </p>
                </form>
              )}
              <button
                type="button"
                className="editorial-link section-link"
                onClick={() => {
                  setAnalysis(null)
                  setAnalysisId(null)
                  setError('')
                  setSent(false)
                  setEmail('')
                }}
              >
                Faire une autre estimation
              </button>
            </div>
          )}
          {error && (
            <p role="alert" className="form-error">
              {error} <Link href="/contact">Contacter Litus</Link>
            </p>
          )}
        </div>
        <ReferenceAnnotation className="reference-audit-note-right">Une vision claire<br />de votre potentiel</ReferenceAnnotation>
      </ReferenceReveal>
    </section>
  )
}
