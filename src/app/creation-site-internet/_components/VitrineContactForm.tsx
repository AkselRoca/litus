'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import { submitContact } from '@/lib/contact/client'
import './vitrine-contact-form.css'

export function VitrineContactForm() {
  const formId = useId()
  const successTitle = useRef<HTMLHeadingElement>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [sendError, setSendError] = useState('')
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nom: '',
      email: '',
      entreprise: '',
      message: '',
      telephone: '',
      service: 'sites-vitrine',
      budget: 'ne-sais-pas',
      rgpd: false,
    },
  })

  useEffect(() => {
    if (isSuccess) successTitle.current?.focus()
  }, [isSuccess])

  async function onSubmit(data: ContactFormData) {
    setSendError('')
    try {
      const response = await submitContact(data)
      if (!response.ok) throw new Error('Envoi impossible')
      const result: { success?: boolean } = await response.json()
      if (!result.success) throw new Error('Demande non confirmée')
      reset()
      setIsSuccess(true)
    } catch {
      setSendError('Votre demande n’a pas pu être envoyée. Réessayez ou contactez-nous au 07 44 98 55 21.')
    }
  }

  function fieldError(name: keyof ContactFormData) {
    return errors[name] ? <p id={`${formId}-${name}-error`} className="vitrine-form-error" role="alert">{errors[name]?.message}</p> : null
  }

  function accessibility(name: keyof ContactFormData) {
    return {
      'aria-invalid': Boolean(errors[name]),
      'aria-describedby': errors[name] ? `${formId}-${name}-error` : undefined,
    }
  }

  if (isSuccess) {
    return (
      <div className="vitrine-form vitrine-form-success" role="status">
        <span className="vitrine-form-success-icon"><Check size={24} aria-hidden="true" /></span>
        <h3 ref={successTitle} tabIndex={-1}>Votre demande est bien arrivée.</h3>
        <p>Nous revenons vers vous sous 24 h ouvrées avec une première recommandation pour votre projet de site.</p>
        <button type="button" className="vitrine-form-retry" onClick={() => setIsSuccess(false)}>Envoyer une autre demande <ArrowRight size={16} aria-hidden="true" /></button>
      </div>
    )
  }

  return (
    <form className="vitrine-form" noValidate onSubmit={handleSubmit(onSubmit)} aria-labelledby={`${formId}-title`} aria-busy={isSubmitting}>
      <h3 id={`${formId}-title`} className="vitrine-form-sr-only">Parlez-nous de votre projet.</h3>
      <fieldset className="vitrine-form-fields" disabled={isSubmitting}>
        <legend className="vitrine-form-sr-only">Vos coordonnées et votre projet</legend>
        <div className="vitrine-form-row">
          <div className="vitrine-form-field">
            <label htmlFor={`${formId}-nom`}>Nom complet <span aria-hidden="true">*</span></label>
            <input id={`${formId}-nom`} autoComplete="name" placeholder="Votre nom" required {...register('nom', { setValueAs: value => typeof value === 'string' ? value.trim() : value })} {...accessibility('nom')} />
            {fieldError('nom')}
          </div>
          <div className="vitrine-form-field">
            <label htmlFor={`${formId}-email`}>Email <span aria-hidden="true">*</span></label>
            <input id={`${formId}-email`} type="email" autoComplete="email" placeholder="vous@entreprise.fr" required {...register('email', { setValueAs: value => typeof value === 'string' ? value.trim() : value })} {...accessibility('email')} />
            {fieldError('email')}
          </div>
        </div>
        <div className="vitrine-form-row">
          <div className="vitrine-form-field">
            <label htmlFor={`${formId}-entreprise`}>Activité / entreprise <small>(facultatif)</small></label>
            <input id={`${formId}-entreprise`} autoComplete="organization" placeholder="Artisan, commerce, PME…" {...register('entreprise')} {...accessibility('entreprise')} />
            {fieldError('entreprise')}
          </div>
          <div className="vitrine-form-field">
            <label htmlFor={`${formId}-message`}>Votre projet <span aria-hidden="true">*</span></label>
            <textarea id={`${formId}-message`} rows={3} placeholder="Un premier site, une refonte… Quel est votre objectif ?" required {...register('message', { setValueAs: value => typeof value === 'string' ? value.trim() : value })} {...accessibility('message')} />
            {fieldError('message')}
          </div>
        </div>
        <div className="vitrine-form-consent">
          <input id={`${formId}-rgpd`} type="checkbox" required {...register('rgpd')} {...accessibility('rgpd')} />
          <label htmlFor={`${formId}-rgpd`}>J’accepte que Litus utilise mes données pour répondre à ma demande, conformément à la <Link href="/politique-confidentialite" target="_blank" rel="noopener noreferrer">politique de confidentialité<span className="vitrine-form-sr-only"> (nouvel onglet)</span></Link>.</label>
        </div>
        {fieldError('rgpd')}
      </fieldset>
      {sendError && <p className="vitrine-form-send-error" role="alert">{sendError}</p>}
      <button type="submit" className="vitrine-form-submit" disabled={isSubmitting}>
        {isSubmitting ? <><Loader2 size={18} className="vitrine-form-spinner" aria-hidden="true" />Envoi en cours…</> : <>Recevoir une première recommandation <ArrowRight size={18} aria-hidden="true" /></>}
      </button>
      <p className="vitrine-form-reassurance">Sans engagement · Réponse sous 24 h ouvrées</p>
    </form>
  )
}
