'use client'

import { compactContactFormSchema as contactFormSchema, type CompactContactFormData as ContactFormData } from '@/lib/validations/contact'
import { submitContact } from '@/lib/contact/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

export function ContactRequestForm({ subject = '' }: { subject?: string }) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [sendError, setSendError] = useState('')
  const [isSending, setIsSending] = useState(false)
  const busy = useRef(false)
  const trap = useRef<HTMLInputElement>(null)
  const successHeading = useRef<HTMLHeadingElement>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError, watch } = useForm<ContactFormData>({ resolver: zodResolver(contactFormSchema) })
  const messageLength = watch('message', '')?.length || 0
  const messageLimit = subject ? 4790 : 5000
  const pending = isSubmitting || isSending
  useEffect(() => { if (isSuccess) successHeading.current?.focus() }, [isSuccess])

  const onSubmit = async (data: ContactFormData) => {
    if (busy.current) return
    busy.current = true
    setIsSending(true)
    setSendError('')
    try {
      const response = await submitContact({ ...data, message: subject ? `Objet : ${subject}\n\n${data.message}` : data.message, website_check: trap.current?.value || '' })
      const result = await response.json()
      if (!response.ok || result.success !== true) {
        if (response.status === 400 && result.errors) {
          for (const name of Object.keys(data) as (keyof ContactFormData)[]) {
            if (Array.isArray(result.errors[name]) && result.errors[name][0]) setError(name, { message: String(result.errors[name][0]) }, { shouldFocus: true })
          }
        }
        setSendError(response.status === 429 ? 'Trop de tentatives rapprochées. Patientez quelques minutes avant de réessayer.' : response.status === 409 ? 'Cette demande est déjà en cours ou ne peut pas être renvoyée. Patientez puis réessayez, ou contactez-nous directement.' : 'Votre demande n’a pas pu être envoyée. Vos informations sont conservées : réessayez ou contactez-nous au 07 44 98 55 21.')
        return
      }
      reset()
      setIsSuccess(true)
    } catch { setSendError('L’envoi n’a pas pu être confirmé. Vos informations sont conservées : réessayez ou appelez-nous au 07 44 98 55 21.') }
    finally { busy.current = false; setIsSending(false) }
  }

  if (isSuccess) return <div className="contact-success" role="status"><span><Check size={26} aria-hidden="true" /></span><h3 ref={successHeading} tabIndex={-1}>Votre demande a bien été envoyée.</h3><p>Un email de confirmation vient de vous être envoyé. Arthur ou Aksel vous recontactera pour vous proposer la suite la plus adaptée.</p><button type="button" className="site-cta-secondary" onClick={() => setIsSuccess(false)}>Envoyer une autre demande</button></div>
  const error = (name: keyof ContactFormData) => errors[name] ? <p id={`${name}-error`} className="contact-field-error" role="alert">{errors[name]?.message}</p> : null
  const a11y = (name: keyof ContactFormData) => ({ 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `${name}-error` : undefined })

  return <form className="contact-request-form" noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={pending}>
    <div className="contact-honeypot" aria-hidden="true"><label htmlFor="website_check">Votre autre site</label><input ref={trap} id="website_check" name="website_check" type="text" tabIndex={-1} autoComplete="off" /></div>
    {subject && <p className="contact-subject">Votre demande : {subject}</p>}
    <fieldset disabled={pending} className="contact-fields-grid">
      <legend className="sr-only">Vos coordonnées et votre projet</legend>
      <div className="contact-field"><label htmlFor="nom">Nom complet <span>*</span></label><input id="nom" autoComplete="name" maxLength={100} {...register('nom')} {...a11y('nom')} aria-required="true" placeholder="Votre nom" />{error('nom')}</div>
      <div className="contact-field"><label htmlFor="email">Email <span>*</span></label><input id="email" type="email" autoComplete="email" maxLength={254} {...register('email')} {...a11y('email')} aria-required="true" placeholder="votre@email.com" />{error('email')}</div>
      <div className="contact-field"><label htmlFor="telephone">Téléphone <span>*</span></label><input id="telephone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} required {...register('telephone')} {...a11y('telephone')} aria-required="true" placeholder="06 12 34 56 78" />{error('telephone')}</div>
      <div className="contact-field contact-message"><label htmlFor="message">Votre projet <span>*</span></label><textarea id="message" maxLength={messageLimit} {...register('message')} {...a11y('message')} aria-required="true" rows={5} placeholder="Décrivez votre projet, vos objectifs ou vos besoins…" /><output htmlFor="message" className="contact-message-count" aria-live="off">{messageLength}/{messageLimit}</output>{error('message')}</div>
    </fieldset>
    <div className="contact-consent"><input id="rgpd" type="checkbox" disabled={pending} {...register('rgpd')} {...a11y('rgpd')} aria-required="true" /><label htmlFor="rgpd">J’accepte que Litus utilise mes données pour traiter ma demande. <a href="/politique-confidentialite" target="_blank" rel="noopener noreferrer">Politique de confidentialité<span className="sr-only"> (nouvel onglet)</span></a>.</label></div>{error('rgpd')}
    {sendError && <p className="contact-send-error" role="alert">{sendError}</p>}
    <button type="submit" disabled={pending} className="site-cta-primary contact-submit">{pending ? <><Loader2 size={18} className="contact-spinner" aria-hidden="true" />Envoi en cours…</> : <>{sendError ? 'Réessayer l’envoi' : 'Envoyer ma demande'}<ArrowRight size={18} aria-hidden="true" /></>}</button>
  </form>
}
