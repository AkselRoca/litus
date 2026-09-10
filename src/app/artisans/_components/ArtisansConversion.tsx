'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, BookOpen, Check, ChevronDown, Download, Loader2, Mail, Phone } from 'lucide-react'
import { LEAD_MAGNETS } from '@/components/lead-magnets/config'
import './artisans-conversion.css'

const guide = LEAD_MAGNETS['checklist-gmb']
const guideSchema = z.object({
  fullName: z.string().trim().min(2, 'Indiquez un nom de 2 caractères minimum.'),
  email: z.string().trim().email('Indiquez une adresse email valide.'),
})
type GuideRequest = z.infer<typeof guideSchema>

const questions = [
  {
    question: 'À qui s’adresse votre accompagnement ?',
    answer: <>Notre accompagnement s’adresse aux artisans qui souhaitent être mieux trouvés dans leur zone et recevoir les demandes directement dans leur entreprise. Nous partons de votre métier, de vos services et du type de chantiers que vous recherchez : dépannage, rénovation, aménagement ou entretien.</>,
  },
  {
    question: 'Travaillez-vous avec tous les métiers ?',
    answer: <>Nous accompagnons notamment les plombiers, électriciens, chauffagistes, couvreurs, menuisiers, peintres, carreleurs, maçons, paysagistes et professionnels de la rénovation intérieure. Pour un autre métier, parlons de votre activité : nous étudions vos besoins avant de proposer des outils.</>,
  },
  {
    question: 'Proposez-vous Google Ads et un site internet ?',
    answer: <>Oui. Nous pouvons associer un <Link href="/creation-site-internet">site internet pour votre entreprise</Link>, des <Link href="/google-ads">campagnes Google Ads</Link> et un travail de <Link href="/seo-local">référencement local</Link>. Ces outils sont choisis selon votre situation ; chaque projet ne nécessite pas forcément l’ensemble des services.</>,
  },
  {
    question: 'Intervenez-vous uniquement à Lorient et au Mans ?',
    answer: <>Litus est présent à Lorient et au Mans et accompagne les artisans du Morbihan et de la Sarthe. Nous définissons la zone à travailler selon vos déplacements et vos chantiers. Pour une autre zone d’intervention, échangeons sur votre projet et les possibilités d’accompagnement.</>,
  },
  {
    question: 'En combien de temps peut-on être visible ?',
    answer: <>Cela dépend de votre présence actuelle, de la concurrence locale et des outils retenus. Une campagne publicitaire peut diffuser après validation des annonces et paramétrage ; le référencement naturel demande un travail progressif. Nous définissons les étapes du projet ensemble, sans promettre de position ni de volume de demandes.</>,
  },
  {
    question: 'Les demandes de contact sont-elles exclusives ?',
    answer: <>Les demandes issues de vos formulaires et de vos coordonnées vous sont adressées directement. Nous mettons en place votre propre présence en ligne, plutôt qu’une offre de contacts revendus à plusieurs entreprises. Un particulier reste bien sûr libre de contacter d’autres professionnels pour son projet.</>,
  },
]

export function ArtisansConversion() {
  const formId = useId()
  const downloadTitle = useRef<HTMLHeadingElement>(null)
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)
  const [downloadUrl, setDownloadUrl] = useState('')
  const [sendError, setSendError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<GuideRequest>({
    resolver: zodResolver(guideSchema),
    defaultValues: { fullName: '', email: '' },
  })

  useEffect(() => {
    if (downloadUrl) downloadTitle.current?.focus()
  }, [downloadUrl])

  async function requestGuide(values: GuideRequest) {
    setSendError('')
    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, magnetId: 'checklist-gmb', magnetTitle: guide.title }),
      })
      if (!response.ok) throw new Error('Demande impossible')
      const result: { success?: boolean; downloadUrl?: string } = await response.json()
      if (!result.success || result.downloadUrl !== guide.downloadUrl) throw new Error('Téléchargement indisponible')
      setDownloadUrl(result.downloadUrl)
    } catch {
      setSendError('Le téléchargement n’a pas pu être préparé. Réessayez ou contactez-nous au 07 44 98 55 21.')
    }
  }

  function fieldError(name: keyof GuideRequest) {
    return errors[name] ? <p id={`${formId}-${name}-error`} className="art-guide-error" role="alert">{errors[name]?.message}</p> : null
  }

  function accessibility(name: keyof GuideRequest) {
    return { 'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `${formId}-${name}-error` : undefined }
  }

  return (
    <div className="art-conversion">
      <section className="art-guide" aria-labelledby="art-guide-title">
        <div className="art-container art-guide-grid">
          <div className="art-guide-copy">
            <p className="art-kicker">Un premier pas, à votre rythme</p>
            <h2 id="art-guide-title">Pas encore prêt pour un site&nbsp;? <em>Commencez par corriger votre Google.</em></h2>
            <p>Votre fiche Google est un point de contact avec les clients de votre secteur. Notre checklist gratuite vous aide à repérer les erreurs courantes et les informations à compléter.</p>
            <ul><li><Check size={16} aria-hidden="true" />Horaires et informations pratiques</li><li><Check size={16} aria-hidden="true" />Photos, description et catégories</li><li><Check size={16} aria-hidden="true" />Réponses aux avis clients</li></ul>
          </div>
          <div className="art-guide-card">
            {downloadUrl ? <div className="art-guide-success" role="status">
              <span className="art-guide-icon"><Check size={24} aria-hidden="true" /></span>
              <h3 ref={downloadTitle} tabIndex={-1}>Votre guide est disponible.</h3>
              <p>Téléchargez la checklist PDF de 2 pages pour faire le point sur votre fiche Google.</p>
              <a className="site-cta-primary" href={downloadUrl} download="checklist-gmb-litus.pdf"><Download size={17} aria-hidden="true" />Télécharger le PDF</a>
            </div> : <>
              <div className="art-guide-card-heading"><span className="art-guide-icon"><BookOpen size={24} strokeWidth={1.6} aria-hidden="true" /></span><div><p>Guide gratuit · PDF · 2 pages</p><h3 id={`${formId}-title`}>{guide.title}</h3></div></div>
              <form className="art-guide-form" noValidate onSubmit={handleSubmit(requestGuide)} aria-labelledby={`${formId}-title`} aria-busy={isSubmitting}>
                <fieldset disabled={isSubmitting}><legend className="art-guide-sr-only">Vos coordonnées pour accéder au guide</legend>
                  <div className="art-guide-field"><label htmlFor={`${formId}-name`}>Votre nom <span aria-hidden="true">*</span></label><input id={`${formId}-name`} placeholder="Votre nom" autoComplete="name" required {...register('fullName')} {...accessibility('fullName')} />{fieldError('fullName')}</div>
                  <div className="art-guide-field"><label htmlFor={`${formId}-email`}>Votre email <span aria-hidden="true">*</span></label><input id={`${formId}-email`} placeholder="vous@entreprise.fr" type="email" autoComplete="email" required {...register('email')} {...accessibility('email')} />{fieldError('email')}</div>
                </fieldset>
                {sendError && <p className="art-guide-error art-guide-send-error" role="alert">{sendError}</p>}
                <button type="submit" className="site-cta-primary" disabled={isSubmitting}>{isSubmitting ? <><Loader2 size={17} className="art-guide-spinner" aria-hidden="true" />Traitement en cours…</> : <><Download size={17} aria-hidden="true" />Accéder au guide gratuit</>}</button>
                <p className="art-guide-privacy">Vos informations servent à traiter cette demande. <Link href="/politique-confidentialite" target="_blank" rel="noopener noreferrer">Politique de confidentialité<span className="art-guide-sr-only"> (nouvel onglet)</span></Link>.</p>
              </form>
            </>}
          </div>
        </div>
      </section>

      <section className="art-faq" aria-labelledby="art-faq-title">
        <div className="art-container">
          <div className="art-faq-heading"><p className="art-kicker">Questions fréquentes</p><h2 id="art-faq-title">Vos questions sur notre <em>accompagnement.</em></h2></div>
          <div className="art-faq-grid">{questions.map((item, index) => {
            const isOpen = openQuestion === index
            const questionId = `${formId}-question-${index}`
            const answerId = `${formId}-answer-${index}`
            return <article className={`art-faq-item${isOpen ? ' is-open' : ''}`} key={item.question}>
              <h3><button type="button" id={questionId} aria-controls={answerId} aria-expanded={isOpen} onClick={() => setOpenQuestion(isOpen ? null : index)}>{item.question}<ChevronDown size={18} aria-hidden="true" /></button></h3>
              <div id={answerId} className="art-faq-answer" role="region" aria-labelledby={questionId} aria-hidden={!isOpen} inert={!isOpen}><div><p>{item.answer}</p></div></div>
            </article>
          })}</div>
        </div>
      </section>

      <section className="art-final" aria-labelledby="art-final-title">
        <div className="art-container art-final-grid">
          <div><p className="art-kicker">Parlons de votre activité</p><h2 id="art-final-title">Prêt à donner plus de visibilité <em>à votre entreprise&nbsp;?</em></h2><p>Votre métier, votre zone, vos prochains projets : échangeons sur les solutions qui vous correspondent.</p><div className="art-final-actions"><Link href="/contact" className="site-cta-primary">Demander mon devis gratuit<ArrowRight size={18} aria-hidden="true" /></Link><Link href="#solutions-artisans" className="site-cta-secondary">Voir nos solutions<ArrowRight size={18} aria-hidden="true" /></Link></div></div>
          <div className="art-final-reassurance"><ul><li><Check size={17} aria-hidden="true" />Échange autour de votre activité</li><li><Check size={17} aria-hidden="true" />Des conseils adaptés à votre métier</li><li><Check size={17} aria-hidden="true" />Un interlocuteur à vos côtés</li></ul><div className="art-final-contact"><a href="tel:+33744985521"><Phone size={14} aria-hidden="true" />07 44 98 55 21</a><a href="mailto:litusagency@gmail.com"><Mail size={14} aria-hidden="true" />litusagency@gmail.com</a></div></div>
        </div>
      </section>
    </div>
  )
}
