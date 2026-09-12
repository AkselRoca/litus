'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, CheckCheck, Download, Loader2, Mail, Pencil, ShieldCheck } from 'lucide-react'
import { activeQuestions, activeSteps, cleanAnswers, documentMarkdown, questionError, type Answers, type BriefContact, type BriefDocument } from '@/lib/brief/model'

export default function BriefWizard() {
  const [answers, setAnswers] = useState<Answers>({})
  const [contact, setContact] = useState<BriefContact>({ fullName: '', email: '', company: '', phone: '' })
  const [consent, setConsent] = useState(false)
  const [index, setIndex] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [failure, setFailure] = useState('')
  const [result, setResult] = useState<BriefDocument | null>(null)
  const started = useRef(Date.now())
  const honey = useRef<HTMLInputElement>(null)
  const busyRef = useRef(false)
  const requestRef = useRef<{ fingerprint: string; id: string } | null>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const steps = activeSteps(answers)
  const total = steps.length + 2
  const current = steps[index]
  const isContact = index === steps.length
  const isReview = index === steps.length + 1
  function move(next: number) { setIndex(next); setErrors({}); setFailure(''); requestAnimationFrame(() => { titleRef.current?.focus(); titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }) }
  function update(id: string, value: string | string[]) { setAnswers(prev => cleanAnswers({ ...prev, [id]: value }, false)); setErrors(prev => ({ ...prev, [id]: '' })) }
  function validateContact() {
    const next: Record<string, string> = {}
    if (contact.fullName.trim().length < 2) next.fullName = 'Indiquez votre nom complet.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) next.email = 'Indiquez une adresse email valide.'
    if (!consent) next.consent = 'Votre accord est nécessaire pour cet envoi.'
    return next
  }
  function advance() {
    const next = isContact ? validateContact() : Object.fromEntries(activeQuestions(current, answers).flatMap(q => { const e = questionError(q, answers[q.id]); return e ? [[q.id, e]] : [] }))
    setErrors(next)
    if (Object.keys(next).length) return
    move(index + 1)
  }
  async function submit() {
    if (busyRef.current) return
    const contactErrors = validateContact()
    if (Object.keys(contactErrors).length) { move(steps.length); setErrors(contactErrors); return }
    busyRef.current = true; setBusy(true); setFailure('')
    try {
      const data = { answers: cleanAnswers(answers), contact: { fullName: contact.fullName.trim(), email: contact.email.trim().toLowerCase(), company: contact.company?.trim() || '', phone: contact.phone?.trim() || '' }, consent: true }
      const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(data)))
      const fingerprint = Array.from(new Uint8Array(hash)).map(n => n.toString(16).padStart(2, '0')).join('')
      if (requestRef.current?.fingerprint !== fingerprint) {
        let id = ''
        try { const saved = JSON.parse(sessionStorage.getItem('litus-brief-request') || 'null'); if (saved?.fingerprint === fingerprint && typeof saved.id === 'string') id = saved.id } catch { /* Storage is optional. */ }
        requestRef.current = { fingerprint, id: id || crypto.randomUUID() }
        try { sessionStorage.setItem('litus-brief-request', JSON.stringify(requestRef.current)) } catch { /* Keep the in-memory retry key. */ }
      }
      const response = await fetch('/api/project-brief', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, submissionId: requestRef.current.id, website: honey.current?.value || '', elapsedMs: Date.now() - started.current, pageUrl: window.location.origin + window.location.pathname, referrer: document.referrer }), signal: AbortSignal.timeout(55000) })
      const payload = await response.json()
      if (!response.ok || !payload.document) throw new Error(payload.error || 'L’envoi n’a pas pu être confirmé. Vos réponses sont conservées : vous pouvez réessayer.')
      setResult(payload.document)
      requestAnimationFrame(() => titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    } catch (error) { setFailure(error instanceof Error && error.name !== 'TimeoutError' ? error.message : 'L’envoi prend plus de temps que prévu. Réessayez sans fermer la page : votre demande ne sera pas envoyée en double.') }
    finally { busyRef.current = false; setBusy(false) }
  }
  function download() {
    if (!result) return
    const url = URL.createObjectURL(new Blob([documentMarkdown(result)], { type: 'text/markdown;charset=utf-8' }))
    const a = document.createElement('a'); a.href = url; a.download = `cahier-des-charges-litus-${result.reference}.md`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return <div className="brief-layout">
    <aside className="brief-aside">
      <span className="brief-eyebrow">RESSOURCE GRATUITE · LITUS</span>
      <h1>Votre projet.<br />Les bonnes questions.<br /><span>Un vrai point de départ.</span></h1>
      <p>Construisez un cahier des charges adapté à votre activité, prêt à partager et à affiner avec notre équipe.</p>
      <ul className="brief-benefits"><li><Check size={18} /> Un parcours adapté à vos choix</li><li><Check size={18} /> Des besoins précis, pas du jargon</li><li><Check size={18} /> Votre document complet par email</li></ul>
      <div className="brief-aside-note"><span>Le bon départ</span><p>Vous hésitez sur un point ? Les choix « À définir » nous permettront de vous conseiller, sans figer le projet trop tôt.</p></div>
      <p className="brief-small">Gratuit et sans engagement. Aucun mot de passe, secret technique ou fichier client n’est nécessaire.</p>
    </aside>
    <section className="brief-card" aria-label="Générateur de cahier des charges">
      {result ? <>
        <div className="brief-success-icon"><CheckCheck size={30} /></div>
        <h2 ref={titleRef} tabIndex={-1}>Votre projet a maintenant un cadre.</h2>
        <p className="brief-intro">Le document a été envoyé à <strong>{contact.email}</strong> et à Litus. Pensez à vérifier vos courriers indésirables.</p>
        <div className="brief-actions"><button type="button" className="brief-primary" onClick={download}><Download size={18} /> Télécharger le document (.md)</button><Link href="/contact" className="brief-secondary">En parler avec Litus <ArrowRight size={17} /></Link></div>
        <p className="brief-small">Le format Markdown s’ouvre dans un éditeur de texte et se partage facilement. Le contenu complet figure aussi dans votre email.</p>
        <div className="brief-document"><span className="brief-eyebrow">{result.reference}</span><h3>{result.title}</h3>{result.sections.map(section => <section key={section.title}><h4>{section.title}</h4><dl>{section.rows.map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>{section.bullets.length > 0 && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}<p className="brief-small">Document de cadrage à valider ensemble. Il ne constitue ni un devis ni un engagement contractuel.</p></div>
      </> : <>
        <div className="brief-progress-label"><span>VOTRE CAHIER DES CHARGES</span><span>Étape {index + 1} / {total}</span></div>
        <div className="brief-progress" role="progressbar" aria-label="Progression" aria-valuenow={index + 1} aria-valuemin={0} aria-valuemax={total}><span style={{ width: `${((index + 1) / total) * 100}%` }} /></div>
        <h2 ref={titleRef} tabIndex={-1}>{isContact ? 'Où vous l’envoyer ?' : isReview ? 'Votre projet, en clair.' : current.title}</h2>
        <p className="brief-intro">{isContact ? 'Une dernière étape pour recevoir le document complet. Litus en reçoit une copie pour pouvoir échanger avec vous sur ce projet.' : isReview ? 'Relisez vos réponses. Vous pouvez revenir sur chaque étape avant de recevoir votre cahier des charges.' : current.intro}</p>
        <form onSubmit={e => { e.preventDefault(); if (isReview) void submit(); else advance() }} noValidate>
          <div className="brief-honeypot" aria-hidden="true"><label htmlFor="brief-website">Ne pas remplir ce champ</label><input id="brief-website" ref={honey} name="website" autoComplete="off" tabIndex={-1} /></div>
          {!isContact && !isReview && activeQuestions(current, answers).map(q => <fieldset key={q.id} className="brief-question">
            <legend>{q.label}{q.required && <span aria-label="obligatoire"> *</span>}</legend>
            {q.options ? <div className={`brief-options ${q.options.length > 3 ? 'brief-options-grid' : ''}`}>{q.options.map(option => {
              const value = answers[q.id]
              const selected = Array.isArray(value) ? value.includes(option) : value === option
              return <label key={option} className={`brief-option ${selected ? 'is-selected' : ''}`}><input type={q.kind === 'multi' ? 'checkbox' : 'radio'} name={q.id} value={option} checked={selected} aria-describedby={errors[q.id] ? `error-${q.id}` : undefined} onChange={() => {
                if (q.kind !== 'multi') { update(q.id, option); return }
                const neutral = ['À définir', 'Aucun pour le moment', 'Aucun besoin particulier', 'Pas d’accompagnement à ce stade']
                const old = Array.isArray(value) ? value : []
                update(q.id, selected ? old.filter(v => v !== option) : neutral.includes(option) ? [option] : [...old.filter(v => !neutral.includes(v)), option])
              }} /><span>{option}</span><Check size={16} className="brief-option-check" /></label>
            })}</div> : q.kind === 'textarea' ? <textarea aria-label={q.label} aria-required={q.required} aria-invalid={Boolean(errors[q.id])} aria-describedby={errors[q.id] ? `error-${q.id}` : undefined} value={typeof answers[q.id] === 'string' ? answers[q.id] as string : ''} onChange={e => update(q.id, e.target.value)} maxLength={2000} rows={4} placeholder="Quelques éléments concrets suffisent…" /> : <input aria-label={q.label} aria-required={q.required} aria-invalid={Boolean(errors[q.id])} aria-describedby={errors[q.id] ? `error-${q.id}` : undefined} type={q.kind === 'url' ? 'url' : 'text'} value={typeof answers[q.id] === 'string' ? answers[q.id] as string : ''} onChange={e => update(q.id, e.target.value)} maxLength={400} placeholder={q.kind === 'url' ? 'https://votre-site.fr' : ''} />}
            {q.kind === 'multi' && <p className="brief-small">Plusieurs choix possibles.</p>}{errors[q.id] && <p role="alert" id={`error-${q.id}`} className="brief-error">{errors[q.id]}</p>}
          </fieldset>)}
          {isContact && <>
            <div className="brief-contact-grid">{([{ key: 'fullName', label: 'Nom complet', required: true, type: 'text', auto: 'name' }, { key: 'email', label: 'Email', required: true, type: 'email', auto: 'email' }, { key: 'company', label: 'Entreprise', required: false, type: 'text', auto: 'organization' }, { key: 'phone', label: 'Téléphone', required: false, type: 'tel', auto: 'tel' }] as const).map(f => <label className="brief-question" key={f.key}>{f.label}{f.required ? ' *' : ' (facultatif)'}<input type={f.type} autoComplete={f.auto} maxLength={f.key === 'email' ? 254 : f.key === 'phone' ? 40 : 150} value={contact[f.key] || ''} aria-required={f.required} aria-invalid={Boolean(errors[f.key])} onChange={e => setContact(prev => ({ ...prev, [f.key]: e.target.value }))} />{errors[f.key] && <span className="brief-error" role="alert">{errors[f.key]}</span>}</label>)}</div>
            <label className="brief-consent"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} /><span>J’accepte que mes réponses et coordonnées soient utilisées pour m’envoyer mon cahier des charges, en transmettre une copie à Litus et être recontacté au sujet de ce projet. <Link href="/politique-confidentialite" target="_blank" rel="noopener noreferrer">Politique de confidentialité</Link>.</span></label>
            {errors.consent && <p className="brief-error" role="alert">{errors.consent}</p>}
            <p className="brief-small"><ShieldCheck size={15} className="inline" /> Aucune inscription automatique à une newsletter. Vos réponses ne sont transmises qu’au clic sur le bouton d’envoi final.</p>
          </>}
          {isReview && <div className="brief-review">{steps.map((step, stepIndex) => <section key={step.id}><div className="brief-review-heading"><h3>{step.title}</h3><button type="button" onClick={() => move(stepIndex)} aria-label={`Modifier : ${step.title}`}><Pencil size={15} /> Modifier</button></div><dl>{activeQuestions(step, answers).flatMap(q => { const value = answers[q.id]; return value && value.length ? [<div key={q.id}><dt>{q.label}</dt><dd>{Array.isArray(value) ? value.join(', ') : value}</dd></div>] : [] })}</dl></section>)}<section><div className="brief-review-heading"><h3>Destinataire</h3><button type="button" onClick={() => move(steps.length)}><Pencil size={15} /> Modifier</button></div><p>{contact.fullName}<br />{contact.email}</p><p className="brief-small">Une copie sera transmise à Litus pour l’étude de votre projet.</p></section></div>}
          {failure && <div className="brief-error-box" role="alert">{failure}</div>}
          <div className="brief-navigation">{index > 0 ? <button type="button" className="brief-back" onClick={() => move(index - 1)} disabled={busy}><ArrowLeft size={17} /> Retour</button> : <span className="brief-small">* Champs nécessaires</span>}<button type="submit" className="brief-primary" disabled={busy}>{busy ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours…</> : isReview ? <><Mail size={18} /> Recevoir mon cahier des charges</> : <>Continuer <ArrowRight size={18} /></>}</button></div>
          {isReview && <p className="brief-small">Le document reprend vos choix et propose des livrables et points de recette à valider ensemble. Il ne constitue pas un devis.</p>}
        </form>
      </>}
    </section>
  </div>
}
