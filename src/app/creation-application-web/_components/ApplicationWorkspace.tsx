'use client'

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowRight, Check, CheckCheck, ClipboardList, FileCheck2, FileText, RotateCcw, ShieldCheck, UsersRound } from 'lucide-react'

const roles = [
  { name: 'Votre équipe', heading: 'Le dossier avance, sans se perdre.', description: 'Les informations, le responsable et les pièces attendues restent réunis dans un même espace.', access: 'Gérer les dossiers et préparer les documents.', icon: ClipboardList },
  { name: 'Votre client', heading: 'Un espace simple pour vos clients.', description: 'Votre client consulte uniquement son projet et retrouve les documents que vous avez partagés.', access: 'Consulter son projet et confirmer une réception.', icon: UsersRound },
  { name: 'Le responsable', heading: 'Les bonnes informations pour décider.', description: 'Le responsable retrouve l’avancement et les points à traiter, avec une trace des actions effectuées.', access: 'Suivre l’avancement et les actions de l’équipe.', icon: ShieldCheck },
]

export function ApplicationWorkspace() {
  const id = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const [role, setRole] = useState(0)
  const [shared, setShared] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const model = roles[role]
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (event.key === 'ArrowRight') next = (index + 1) % roles.length
    else if (event.key === 'ArrowLeft') next = (index + roles.length - 1) % roles.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = roles.length - 1
    else return
    event.preventDefault(); setRole(next); refs.current[next]?.focus()
  }
  return <div className="application-workspace">
    <div className="application-workspace-copy"><div role="tablist" aria-label="Choisir un rôle dans l’application" className="application-role-tabs">{roles.map(({ name, icon: Icon }, index) => <button type="button" role="tab" id={`${id}-role-${index}`} aria-controls={`${id}-panel`} aria-selected={role === index} tabIndex={role === index ? 0 : -1} ref={element => { refs.current[index] = element }} onClick={() => setRole(index)} onKeyDown={event => keyboard(event, index)} key={name}><Icon aria-hidden="true" /><span>{name}</span><ArrowRight aria-hidden="true" /></button>)}</div><p className="application-workspace-hint">Essayez le parcours : partagez le document, puis passez dans la vue client pour confirmer sa réception.</p><p className="application-example-label">Dossier fictif · modifications locales uniquement</p></div>
    <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-role-${role}`} tabIndex={0} className="application-workspace-panel">
      <div className="application-workspace-panel-head"><span>ESPACE PROJET</span><button type="button" onClick={() => { setShared(false); setConfirmed(false); setRole(0) }} aria-label="Réinitialiser le dossier d’exemple"><RotateCcw aria-hidden="true" />Réinitialiser</button></div>
      <h3>{model.heading}</h3><p>{model.description}</p>
      <div className="application-workspace-record"><div><span>DOSSIER P-014</span><strong>Aménagement des bureaux</strong></div><span>{confirmed ? 'Réception confirmée' : shared ? 'Document partagé' : 'En préparation'}</span></div>
      {role === 0 && <div className="application-workspace-action"><FileText aria-hidden="true" /><div><strong>Compte rendu du projet</strong><span>{shared ? 'Accessible dans l’espace client.' : 'Prêt à être partagé avec votre client.'}</span></div><button type="button" disabled={shared} onClick={() => setShared(true)}>{shared ? <Check aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}{shared ? 'Partagé' : 'Partager'}</button></div>}
      {role === 1 && <div className="application-workspace-action"><FileCheck2 aria-hidden="true" /><div><strong>{shared ? 'Votre compte rendu est disponible' : 'Votre équipe prépare le document'}</strong><span>{confirmed ? 'Votre confirmation figure dans le suivi.' : shared ? 'Vous pouvez confirmer sa réception.' : 'Il apparaîtra ici dès qu’il sera partagé.'}</span></div><button type="button" disabled={!shared || confirmed} onClick={() => setConfirmed(true)}>{confirmed ? <CheckCheck aria-hidden="true" /> : <Check aria-hidden="true" />}{confirmed ? 'Confirmé' : 'Confirmer'}</button></div>}
      {role === 2 && <ol className="application-workspace-history"><li><Check aria-hidden="true" /><span>Dossier créé par votre équipe</span></li><li data-pending={!shared}><Check aria-hidden="true" /><span>{shared ? 'Compte rendu partagé avec le client' : 'Compte rendu en attente de partage'}</span></li><li data-pending={!confirmed}><Check aria-hidden="true" /><span>{confirmed ? 'Réception confirmée par le client' : 'Réception à confirmer par le client'}</span></li></ol>}
      <p className="application-workspace-access"><ShieldCheck aria-hidden="true" />{model.access}</p><span role="status" className="application-workspace-status">{confirmed ? 'Exemple : le client a confirmé la réception du document.' : shared ? 'Exemple : le document est partagé. Ouvrez la vue client pour poursuivre.' : 'Exemple : le document attend le partage par votre équipe.'}</span>
    </div>
  </div>
}
