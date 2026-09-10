'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Check, ChevronDown, Loader2, Mail, Phone, Search, Target } from 'lucide-react'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import { submitContact } from '@/lib/contact/client'
import './google-ads-conversion.css'

const offers = [
  {
    id: 'lancement',
    title: 'Lancer vos campagnes',
    description: 'Pour les entreprises qui démarrent et souhaitent construire des campagnes adaptées à leur activité.',
    points: ['Analyse de votre activité et de vos objectifs', 'Recherche de mots-clés pertinents', 'Création des annonces', 'Paramétrage du suivi des contacts'],
    action: 'Parlons de votre lancement',
    icon: Target,
  },
  {
    id: 'optimisation',
    title: 'Optimiser votre compte',
    description: 'Pour les entreprises qui diffusent déjà des annonces et souhaitent améliorer leur gestion.',
    points: ['Analyse des campagnes existantes', 'Identification des améliorations possibles', 'Ajustement du ciblage et des annonces', 'Accompagnement et suivi réguliers'],
    action: 'Faisons le point sur vos campagnes',
    icon: Search,
  },
] as const

type Need = 'a-definir' | typeof offers[number]['id']

const needLabels: Record<Need, string> = {
  'a-definir': 'Définir mon besoin ensemble',
  lancement: 'Lancer vos campagnes',
  optimisation: 'Optimiser votre compte',
}

const questions = [
  {
    question: 'Combien coûte une campagne Google Ads ?',
    answer: <>Deux budgets sont à distinguer : le budget publicitaire, payé à Google pour la diffusion, et les honoraires de gestion de l’agence. Nous établissons ces honoraires sur devis. L’enveloppe publicitaire dépend de votre activité, de votre zone, de la concurrence et de vos objectifs ; nous la définissons avec vous avant de lancer les campagnes.</>,
  },
  {
    question: 'En combien de temps obtient-on des résultats ?',
    answer: <>Une campagne peut commencer à diffuser une fois les annonces approuvées et le paramétrage finalisé. Il faut ensuite recueillir des données pour comprendre ce qui fonctionne et ajuster les campagnes. Le délai et les performances varient selon l’activité, la concurrence, le budget et la qualité de la page de destination. Aucun délai d’acquisition de clients ne peut être garanti.</>,
  },
  {
    question: 'Quelle différence entre Google Ads et le SEO ?',
    answer: <>Google Ads relève du référencement payant, ou SEA : les annonces sont diffusées avec un budget publicitaire. Le <Link href="/seo-local">référencement naturel, ou SEO</Link>, travaille la visibilité des pages dans les résultats non sponsorisés. Les deux approches peuvent se compléter, avec des objectifs, un calendrier et un suivi propres à chacune.</>,
  },
  {
    question: 'Quels types d’entreprises pouvez-vous accompagner ?',
    answer: <>Nous accompagnons notamment les artisans, les entreprises de services et les commerces à Lorient, dans le Morbihan, au Mans et en Sarthe. Avant de proposer une campagne, nous étudions votre offre, les recherches de vos clients et vos objectifs pour déterminer si Google Ads est adapté à votre activité.</>,
  },
  {
    question: 'Comment mesurez-vous les résultats ?',
    answer: <>Nous définissons avec vous les actions utiles : formulaires envoyés, appels ou autres prises de contact. Leur suivi dépend des outils et du paramétrage mis en place, dans le respect des choix de consentement. Nous analysons ensuite les conversions mesurées, leur coût et la pertinence des demandes, en complément des clics et des dépenses. Une <Link href="/creation-site-internet">page de destination claire</Link> fait aussi partie du travail.</>,
  },
  {
    question: 'Y a-t-il un engagement de durée ?',
    answer: <>Les conditions et la durée de l’accompagnement sont précisées dans l’offre et le devis qui vous sont proposés. Nous les présentons avant le démarrage, avec le périmètre de gestion, les honoraires et les modalités de suivi. Vous disposez ainsi des éléments nécessaires pour décider.</>,
  },
]

export function GoogleAdsConversion() {
  const formId = useId()
  const contactSection = useRef<HTMLElement>(null)
  const needSelect = useRef<HTMLSelectElement>(null)
  const successTitle = useRef<HTMLHeadingElement>(null)
  const [need, setNeed] = useState<Need>('a-definir')
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [sendError, setSendError] = useState('')
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { nom: '', email: '', telephone: '', entreprise: '', message: '', service: 'google-ads', budget: 'ne-sais-pas', rgpd: false },
  })

  useEffect(() => {
    if (isSuccess) successTitle.current?.focus()
  }, [isSuccess])

  function chooseOffer(value: Need) {
    setNeed(value)
    setIsSuccess(false)
    setSendError('')
    contactSection.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
    window.requestAnimationFrame(() => needSelect.current?.focus({ preventScroll: true }))
  }

  async function onSubmit(data: ContactFormData) {
    setSendError('')
    try {
      const response = await submitContact({ ...data, message: `Besoin Google Ads : ${needLabels[need]}\n\n${data.message}` })
      if (!response.ok) throw new Error('Envoi impossible')
      const result: { success?: boolean } = await response.json()
      if (!result.success) throw new Error('Demande non confirmée')
      reset()
      setIsSuccess(true)
    } catch {
      setSendError('Votre demande n’a pas pu être envoyée. Vos informations sont conservées dans le formulaire. Réessayez ou appelez-nous au 07 44 98 55 21.')
    }
  }

  function fieldError(name: keyof ContactFormData) {
    return errors[name] ? <p id={`${formId}-${name}-error`} className="gad-form-error" role="alert">{errors[name]?.message}</p> : null
  }

  function accessibility(name: keyof ContactFormData) {
    return { 'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `${formId}-${name}-error` : undefined }
  }

  const trimValue = (value: unknown) => typeof value === 'string' ? value.trim() : value

  return (
    <div className="gad-conversion">
      <section className="gad-offers" aria-labelledby="gad-offers-title">
        <div className="gad-conversion-container">
          <div className="gad-offers-heading">
            <p className="gad-conversion-eyebrow">Un accompagnement adapté</p>
            <h2 id="gad-offers-title">Des campagnes adaptées <em>à vos objectifs.</em></h2>
            <p>Honoraires de gestion sur devis. Budget publicitaire payé séparément à Google.</p>
          </div>
          <div className="gad-offers-grid">
            {offers.map(offer => <article className={`gad-offers-card gad-offers-card-${offer.id}`} key={offer.id}>
              <span className="gad-offers-icon"><offer.icon size={25} strokeWidth={1.6} aria-hidden="true" /></span>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <ul>{offer.points.map(point => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}</ul>
              <button type="button" className={offer.id === 'lancement' ? 'site-cta-primary' : 'site-cta-secondary'} onClick={() => chooseOffer(offer.id)}>{offer.action}<ArrowRight size={17} aria-hidden="true" /></button>
            </article>)}
          </div>
        </div>
      </section>

      <section className="gad-faq" aria-labelledby="gad-faq-title">
        <div className="gad-conversion-container">
          <div className="gad-faq-heading"><p className="gad-conversion-eyebrow">Questions fréquentes</p><h2 id="gad-faq-title">Vos questions sur <em>Google Ads.</em></h2></div>
          <div className="gad-faq-grid">
            {questions.map((item, index) => {
              const isOpen = openQuestion === index
              const questionId = `${formId}-question-${index}`
              const answerId = `${formId}-answer-${index}`
              return <article className={`gad-faq-item${isOpen ? ' is-open' : ''}`} key={item.question}>
                <h3><button type="button" id={questionId} aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenQuestion(isOpen ? null : index)}>{item.question}<ChevronDown size={18} aria-hidden="true" /></button></h3>
                <div id={answerId} className="gad-faq-answer" role="region" aria-labelledby={questionId} aria-hidden={!isOpen} inert={!isOpen}><div><p>{item.answer}</p></div></div>
              </article>
            })}
          </div>
        </div>
      </section>

      <section className="gad-contact" id="google-ads-contact" ref={contactSection} aria-labelledby="gad-contact-title">
        <div className="gad-conversion-container gad-contact-grid">
          <div className="gad-contact-copy">
            <p className="gad-conversion-eyebrow">Votre prochaine étape</p>
            <h2 id="gad-contact-title">Parlons de votre projet <em>Google Ads.</em></h2>
            <p>Vous souhaitez lancer vos premières campagnes ou améliorer un compte existant ? Parlez-nous de votre activité, de votre zone et des demandes que vous aimeriez recevoir.</p>
            <p>Nous pourrons définir ensemble les objectifs et le périmètre d’un accompagnement adapté.</p>
            <div className="gad-contact-details">
              <a href="tel:+33744985521"><Phone size={19} aria-hidden="true" /><span>07 44 98 55 21</span></a>
              <a href="mailto:litusagency@gmail.com"><Mail size={19} aria-hidden="true" /><span>litusagency@gmail.com</span></a>
            </div>
            <p className="gad-contact-location">Lorient · Le Mans<br />Un interlocuteur pour vos campagnes et vos objectifs.</p>
          </div>

          {isSuccess ? <div className="gad-form gad-form-success" role="status">
            <span className="gad-form-success-icon"><Check size={25} aria-hidden="true" /></span>
            <h3 ref={successTitle} tabIndex={-1}>Votre demande est bien arrivée.</h3>
            <p>Merci pour ces précisions. Nous vous recontacterons pour échanger sur votre projet Google Ads.</p>
            <button type="button" className="site-cta-secondary" onClick={() => setIsSuccess(false)}>Envoyer une autre demande<ArrowRight size={17} aria-hidden="true" /></button>
          </div> : <form className="gad-form" noValidate onSubmit={handleSubmit(onSubmit)} aria-labelledby={`${formId}-title`} aria-busy={isSubmitting}>
            <h3 id={`${formId}-title`}>Votre projet, en quelques mots.</h3>
            <p className="gad-form-required">Les champs marqués d’un * sont obligatoires.</p>
            <fieldset className="gad-form-fields" disabled={isSubmitting}>
              <legend className="gad-form-sr-only">Vos coordonnées et votre projet Google Ads</legend>
              <div className="gad-form-row">
                <div className="gad-form-field"><label htmlFor={`${formId}-nom`}>Nom complet <span aria-hidden="true">*</span></label><input id={`${formId}-nom`} autoComplete="name" placeholder="Votre nom" required {...register('nom', { setValueAs: trimValue })} {...accessibility('nom')} />{fieldError('nom')}</div>
                <div className="gad-form-field"><label htmlFor={`${formId}-email`}>Email <span aria-hidden="true">*</span></label><input id={`${formId}-email`} type="email" autoComplete="email" placeholder="vous@entreprise.fr" required {...register('email', { setValueAs: trimValue })} {...accessibility('email')} />{fieldError('email')}</div>
              </div>
              <div className="gad-form-row">
                <div className="gad-form-field"><label htmlFor={`${formId}-entreprise`}>Entreprise <small>(facultatif)</small></label><input id={`${formId}-entreprise`} autoComplete="organization" placeholder="Votre entreprise" {...register('entreprise', { setValueAs: trimValue })} {...accessibility('entreprise')} />{fieldError('entreprise')}</div>
                <div className="gad-form-field"><label htmlFor={`${formId}-telephone`}>Téléphone <small>(facultatif)</small></label><input id={`${formId}-telephone`} type="tel" autoComplete="tel" placeholder="06 12 34 56 78" {...register('telephone', { setValueAs: trimValue })} {...accessibility('telephone')} />{fieldError('telephone')}</div>
              </div>
              <div className="gad-form-field"><label htmlFor={`${formId}-besoin`}>Votre besoin</label><select id={`${formId}-besoin`} ref={needSelect} name="besoin" value={need} onChange={event => setNeed(event.target.value as Need)}>{Object.entries(needLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></div>
              <div className="gad-form-field"><label htmlFor={`${formId}-message`}>Votre message <span aria-hidden="true">*</span></label><textarea id={`${formId}-message`} rows={4} placeholder="Votre activité, votre zone, vos objectifs ou vos campagnes actuelles…" required {...register('message', { setValueAs: trimValue })} {...accessibility('message')} />{fieldError('message')}</div>
              <div className="gad-form-consent"><input id={`${formId}-rgpd`} type="checkbox" required {...register('rgpd')} {...accessibility('rgpd')} /><label htmlFor={`${formId}-rgpd`}>J’accepte que Litus utilise mes données pour répondre à ma demande, conformément à la <Link href="/politique-confidentialite" target="_blank" rel="noopener noreferrer">politique de confidentialité<span className="gad-form-sr-only"> (nouvel onglet)</span></Link>.</label></div>
              {fieldError('rgpd')}
            </fieldset>
            {sendError && <p className="gad-form-send-error" role="alert">{sendError}</p>}
            <button type="submit" className="site-cta-primary gad-form-submit" disabled={isSubmitting}>{isSubmitting ? <><Loader2 size={18} className="gad-form-spinner" aria-hidden="true" />Envoi en cours…</> : <>Parlons de vos campagnes<ArrowRight size={18} aria-hidden="true" /></>}</button>
          </form>}
        </div>
      </section>
    </div>
  )
}
