'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Loader2, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NEWSLETTER_CONSENT_TEXT, newsletterSchema, type NewsletterSubscription } from '@/lib/validations/newsletter'
import './blog-newsletter.css'

export function BlogNewsletter() {
  const id = useId()
  const successRef = useRef<HTMLParagraphElement>(null)
  const [subscribed, setSubscribed] = useState(false)
  const [sendError, setSendError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NewsletterSubscription>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '', consent: false },
  })

  useEffect(() => {
    if (subscribed) successRef.current?.focus()
  }, [subscribed])

  async function subscribe(values: NewsletterSubscription) {
    setSendError('')
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const result: { success?: boolean } = await response.json()
      if (!response.ok || result.success !== true) throw new Error('Registration failed')
      setSubscribed(true)
    } catch {
      setSendError('Votre inscription n’a pas pu être enregistrée. Réessayez dans un instant.')
    }
  }

  return (
    <section className="blog-newsletter" id="newsletter" aria-labelledby={`${id}-heading`}>
      <div className="blog-newsletter-panel">
        <div className="blog-newsletter-copy">
          <span className="blog-newsletter-icon" aria-hidden="true"><Mail size={24} strokeWidth={1.5} /></span>
          <h2 id={`${id}-heading`}>Prenez une <em>longueur d’avance</em></h2>
          <p>Recevez nos conseils sur le référencement local, les sites internet et Google Ads pour développer votre activité à Lorient et au Mans.</p>
        </div>
        <form className="blog-newsletter-form" onSubmit={handleSubmit(subscribe)} noValidate aria-labelledby={`${id}-heading`} aria-busy={isSubmitting}>
          {subscribed ? <div className="blog-newsletter-success" role="status">
            <Check size={23} aria-hidden="true" />
            <div><p ref={successRef} tabIndex={-1}>Votre inscription est bien enregistrée.</p><span>Merci de votre intérêt pour les conseils Litus.</span></div>
          </div> : <>
            <fieldset disabled={isSubmitting}>
              <legend className="blog-newsletter-sr-only">Inscription aux conseils Litus</legend>
              <label className="blog-newsletter-label" htmlFor={`${id}-email`}>Votre adresse email</label>
              <div className="blog-newsletter-row">
                <input id={`${id}-email`} type="email" autoComplete="email" placeholder="vous@entreprise.fr" maxLength={254} required {...register('email')} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${id}-email-error` : undefined} />
                <button type="submit" className="site-cta-primary" disabled={isSubmitting}>{isSubmitting ? <><Loader2 size={17} className="blog-newsletter-spinner" aria-hidden="true" /><span>Inscription…</span></> : <><span>S’abonner</span><ArrowRight size={17} aria-hidden="true" /></>}</button>
              </div>
              {errors.email && <p className="blog-newsletter-error" id={`${id}-email-error`} role="alert">{errors.email.message}</p>}
              <div className="blog-newsletter-consent"><input id={`${id}-consent`} type="checkbox" required {...register('consent')} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? `${id}-consent-error` : undefined} /><label htmlFor={`${id}-consent`}>{NEWSLETTER_CONSENT_TEXT}</label></div>
              {errors.consent && <p className="blog-newsletter-error" id={`${id}-consent-error`} role="alert">{errors.consent.message}</p>}
            </fieldset>
            {sendError && <p className="blog-newsletter-error blog-newsletter-send-error" role="alert">{sendError}</p>}
          </>}
          <p className="blog-newsletter-privacy">Retirez votre accord à tout moment en <a href="mailto:litusagency@gmail.com?subject=D%C3%A9sinscription%20newsletter">nous écrivant</a>. <Link href="/politique-confidentialite" target="_blank" rel="noopener noreferrer">Confidentialité<span className="blog-newsletter-sr-only"> (nouvel onglet)</span></Link>.</p>
        </form>
      </div>
    </section>
  )
}
