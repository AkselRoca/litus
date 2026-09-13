'use client'
import { useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Caveat } from 'next/font/google'
import type { MarketAnalysis } from '@/lib/gemini'
import { ArrowRight, BarChart3, BriefcaseBusiness, Check, LockKeyhole, MapPin } from 'lucide-react'
import { ReferenceAnnotation, ReferenceReveal } from './home/ReferenceMotion'
import './estimator-reference.css'

const auditHandwriting = Caveat({ preload: false, subsets: ['latin'], weight: '400', display: 'swap', variable: '--font-audit-handwriting' })

export function EstimatorSection() {
  const [metier, setMetier] = useState('')
  const [ville, setVille] = useState('')
  const [email, setEmail] = useState('')
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null)
  const [step, setStep] = useState<'details' | 'email'>('details')
  const [websiteCheck, setWebsiteCheck] = useState('')
  const submission = useRef<{ payload: string; id: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  function continueToEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (metier.trim().length < 2 || ville.trim().length < 2) return
    setError('')
    setStep('email')
  }
  async function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    try {
      const payload = JSON.stringify({ metier: metier.trim(), ville: ville.trim(), email: email.trim().toLowerCase(), website_check: websiteCheck, page_path: window.location.pathname })
      if (submission.current?.payload !== payload) submission.current = { payload, id: crypto.randomUUID() }
      const response = await fetch('/api/market-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': submission.current.id },
        body: payload,
      })
      const data = await response.json()
      if (!response.ok || !data.success || !data.analysis) {
        throw new Error(data.error || 'L’estimation est indisponible pour le moment. Réessayez dans quelques instants.')
      }
      setAnalysis(data.analysis)
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'L’estimation est indisponible pour le moment. Réessayez.')
    } finally {
      setBusy(false)
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
          <span className="home-leaf-haze" aria-hidden="true" />
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
            <form onSubmit={step === 'details' ? continueToEmail : calculate} aria-busy={busy}>
              <div className="audit-honeypot" aria-hidden="true">
                <label htmlFor="audit-website-check">Laissez ce champ vide</label>
                <input id="audit-website-check" name="website_check" tabIndex={-1} autoComplete="off" value={websiteCheck} onChange={e => setWebsiteCheck(e.target.value)} />
              </div>
              <div className="reference-audit-card-heading"><div>
              <h3>Votre marché local</h3>
              <p className="form-description">
                {step === 'details' ? 'Deux informations pour commencer.' : 'Dernière étape : où envoyer votre estimation ?'}
              </p>
              </div><span className="reference-analysis-mark"><BarChart3 size={20} aria-hidden="true" /><span>Une première lecture<br />de votre marché local</span></span></div>
              <div hidden={step !== 'details'}>
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
              </div>
              {step === 'email' && <div className="audit-email-step">
                <p className="form-note">{metier} · {ville}</p>
                <label htmlFor="audit-email">Votre email <span aria-hidden="true">*</span></label>
                <input id="audit-email" name="email" type="email" autoComplete="email" autoFocus required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} disabled={busy} aria-describedby="audit-email-purpose" />
                <p id="audit-email-purpose" className="form-note">Email obligatoire : recevez votre estimation par mail et consultez-la ici. Litus pourra vous répondre au sujet de cette demande. Aucune inscription à une newsletter.</p>
              </div>}
              <button
                className="site-cta-primary"
                disabled={busy}
                type="submit"
              >
                {busy ? 'Calcul et envoi en cours…' : step === 'details' ? 'Obtenir une estimation' : 'Recevoir mon estimation'}<ArrowRight size={17} aria-hidden="true" />
              </button>
              {step === 'email' && <button type="button" className="editorial-link section-link" disabled={busy} onClick={() => { setStep('details'); setError('') }}>Modifier mon activité ou ma ville</button>}
              <p className="reference-privacy"><LockKeyhole size={13} aria-hidden="true" /><span>Vos données servent uniquement à traiter votre demande. <Link href="/politique-confidentialite">Confidentialité</Link></span></p>
            </form>
          ) : (
            <div aria-live="polite">
              <p className="editorial-eyebrow">
                {metier} · {ville}
              </p>
              <h3>Votre première estimation</h3>
              <p role="status" className="form-note">Votre estimation a été envoyée à {email}. Pensez à vérifier vos courriers indésirables.</p>
              <div className="audit-main-estimate"><span>Potentiel annuel estimé</span><strong>{analysis.potentielAnnuel.toLocaleString('fr-FR')} €</strong><small>Projection indicative, à confirmer avec un audit.</small></div>
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

              </dl>
              <p>{analysis.analyse}</p>
              <p className="form-note">
                Ces estimations automatiques ne constituent ni des mesures de
                trafic ni une garantie de chiffre d’affaires.
              </p>
              <Link href="/contact?objet=audit" className="site-cta-primary">Approfondir avec Litus <ArrowRight size={17} aria-hidden="true" /></Link>
              <button
                type="button"
                className="editorial-link section-link"
                onClick={() => {
                  setAnalysis(null)
                  setStep('details')
                  submission.current = null
                  setError('')
                  setWebsiteCheck('')
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
