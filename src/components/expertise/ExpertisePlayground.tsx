'use client'

import { useState } from 'react'
import { ArrowRight, Check, CreditCard, FileCheck2, ShieldCheck } from 'lucide-react'

/** Local demonstrations only: no data is sent, no payment or account is created. */
export function ExpertisePlayground({ kind }: { kind: 'react' | 'tailwind' | 'stripe' }) {
  const [filter, setFilter] = useState('Tous')
  const [theme, setTheme] = useState('Clair')
  const [received, setReceived] = useState(false)

  if (kind === 'react') {
    const rows = [{ name: 'Aménagement de bureaux', status: 'À qualifier', date: 'Aujourd’hui' }, { name: 'Espace partenaire', status: 'En cours', date: 'Hier' }, { name: 'Catalogue professionnel', status: 'À qualifier', date: 'Hier' }]
    return <div className="ex-playground">
      <div className="ex-demo-title"><div><small>Espace équipe · exemple</small><strong>Les demandes, au bon endroit.</strong></div><FileCheck2 aria-hidden="true" /></div>
      <div className="ex-demo-filters" role="group" aria-label="Filtrer les demandes fictives">{['Tous', 'À qualifier', 'En cours'].map(value => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div>
      <div className="ex-demo-rows" aria-live="polite">{rows.filter(row => filter === 'Tous' || row.status === filter).map(row => <div key={row.name}><span className="ex-demo-file"><FileCheck2 aria-hidden="true" /></span><div><strong>{row.name}</strong><small>{row.date}</small></div><span className="ex-demo-status">{row.status}</span></div>)}</div>
      <p className="ex-demo-note">Essayez les filtres. Données fictives, aucune demande réelle.</p>
    </div>
  }
  if (kind === 'tailwind') return <div className="ex-playground">
    <div className="ex-demo-title"><div><small>Bibliothèque de composants</small><strong>Une identité. Des règles partagées.</strong></div><span className="ex-code-mark">{'{ }'}</span></div>
    <div className="ex-demo-filters" role="group" aria-label="Thème de l’exemple">{['Clair', 'Contraste'].map(value => <button key={value} type="button" aria-pressed={theme === value} onClick={() => setTheme(value)}>{value}</button>)}</div>
    <div className="ex-component-preview" data-theme={theme}>
      <span className="ex-sample-label">Exemple de carte</span><div className="seo-visual-title">Un projet bien cadré.</div><p>Les mêmes espacements, les mêmes états et une action identifiable.</p>
      <a href="#composants" className="ex-sample-button">Voir les composants<ArrowRight size={16} aria-hidden="true" /></a>
      <div className="ex-token-row" aria-label="Couleurs de cet exemple"><span style={{ background: '#e95e2a' }} /><span style={{ background: '#172536' }} /><span style={{ background: '#f7f6f2' }} /><code>brand / ink / paper</code></div>
    </div><p className="ex-demo-note">Exemple Litus, pas un thème imposé par Tailwind.</p>
  </div>
  return <div className="ex-playground">
    <div className="ex-demo-title"><div><small>Parcours fictif · aucun encaissement</small><strong>Après le paiement, tout s’enchaîne.</strong></div><CreditCard aria-hidden="true" /></div>
    <div className="ex-payment-example"><span>Exemple d’abonnement</span><strong>49 € <small>/ mois</small></strong><p>Montant fictif, sans valeur d’offre.</p></div>
    <button className="ex-sample-button" type="button" onClick={() => setReceived(value => !value)}>{received ? 'Réinitialiser l’exemple' : 'Simuler la confirmation serveur'}<ArrowRight size={16} aria-hidden="true" /></button>
    <ol className="ex-payment-events" aria-live="polite">{['Signature du webhook contrôlée', 'Traitement enregistré une seule fois', 'Accès client et suivi CRM'].map((text, index) => <li key={text} data-active={received}><span>{received ? <Check size={14} aria-hidden="true" /> : String(index + 1).padStart(2, '0')}</span>{text}</li>)}</ol>
    <p className="ex-demo-note"><ShieldCheck size={14} aria-hidden="true" />Aucune carte, aucun appel à Stripe. Démonstration locale.</p>
  </div>
}
