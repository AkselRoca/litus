'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, FileText, Search, CalendarDays, Landmark } from 'lucide-react'

const services = [
  { name: 'Inscrire un enfant à la cantine', type: 'Démarche', words: 'ecole scolaire restauration enfants cantine', detail: 'Les conditions, le service à contacter et le portail utilisé par la commune.', href: '/collectivites/demarches-en-ligne' },
  { name: 'Demander un acte de naissance', type: 'État civil', words: 'naissance mariage civil certificat acte', detail: 'Identifier la mairie compétente et accéder à la démarche officielle.', href: '/collectivites/demarches-en-ligne#existant' },
  { name: 'Connaître les jours de collecte', type: 'Vie quotidienne', words: 'dechets poubelle collecte tri calendrier', detail: 'Retrouver le service compétent et les informations de son territoire.', href: '/collectivites/site-communaute-de-communes#competences' },
  { name: 'Préparer un projet d’urbanisme', type: 'Démarche', words: 'urbanisme permis travaux construire renovation', detail: 'Comprendre le parcours avant de rejoindre le guichet adapté.', href: '/collectivites/demarches-en-ligne#orientation' },
  { name: 'Consulter l’agenda de la commune', type: 'Vie locale', words: 'agenda evenement sortie culture spectacle bibliotheque', detail: 'Une date, un lieu, les conditions d’accès : l’essentiel pour participer.', href: '/collectivites/site-internet-mairie#contenus' },
]
const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export function CivicSearch() {
  const id = useId()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Tous')
  const words = normalize(query).split(/\s+/).filter(Boolean)
  const results = services.filter(item => (filter === 'Tous' || item.type === filter) && words.every(word => normalize(item.name + ' ' + item.words).includes(word)))
  return <div className="civic-demo civic-search">
    <p className="civic-demo-label"><Landmark size={15} aria-hidden="true" /> Votre collectivité <span>Démo interactive</span></p>
    <h3>Comment pouvons-nous vous aider ?</h3>
    <label htmlFor={id}>Rechercher un besoin du quotidien</label>
    <div className="civic-search-field"><Search size={20} aria-hidden="true" /><input id={id} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Cantine, naissance, déchets…" autoComplete="off" aria-describedby={`${id}-notice`} /></div>
    <div className="civic-filters" role="group" aria-label="Filtrer les exemples de services">{['Tous', 'Démarche', 'Vie locale'].map(value => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div>
    <p className="civic-result-count" role="status">{results.length} exemple{results.length > 1 ? 's' : ''} disponible{results.length > 1 ? 's' : ''}</p>
    <ul className="civic-results">{results.map(item => <li key={item.name}><Link href={item.href}><span><small>{item.type}</small><strong>{item.name}</strong><span>{item.detail}</span></span><ArrowRight size={18} aria-hidden="true" /></Link></li>)}</ul>
    {results.length === 0 && <div className="civic-empty"><p>Aucun exemple pour cette recherche. Essayez « cantine », « déchets » ou « agenda ».</p><button type="button" onClick={() => { setQuery(''); setFilter('Tous') }}>Afficher tous les exemples</button></div>}
    <p id={`${id}-notice`} className="civic-demo-note">Exemples fictifs, sans collecte ni envoi. Les liens présentent les solutions Litus, pas une démarche administrative réelle.</p>
  </div>
}

export function CivicCms() {
  const [type, setType] = useState<'Actualité' | 'Événement' | 'Alerte'>('Actualité')
  const [preview, setPreview] = useState(false)
  const id = useId()
  const text = { Actualité: ['La médiathèque vous accueille', 'Une information pratique, un contact et une date de mise à jour.'], Événement: ['Rencontre à la médiathèque', 'Une date, un lieu et les modalités de participation.'], Alerte: ['Modification des horaires d’accueil', 'Une période de validité et les services concernés.'] }[type]
  return <div className="civic-demo civic-cms">
    <p className="civic-demo-label"><Landmark size={15} aria-hidden="true" /> Espace agents <span>Démonstration</span></p>
    <div className="civic-cms-top"><h3>Une publication, simplement.</h3><span className="civic-status">Brouillon</span></div>
    <label htmlFor={id}>Type de publication</label><select id={id} value={type} onChange={event => { setType(event.target.value as typeof type); setPreview(false) }}>{['Actualité', 'Événement', 'Alerte'].map(value => <option key={value}>{value}</option>)}</select>
    <div className="civic-editor"><small>{type}</small><strong>{text[0]}</strong><p>{text[1]}</p><span><CalendarDays size={15} aria-hidden="true" /> Date de début et fin à renseigner</span></div>
    <div className="civic-cms-actions"><span><Check size={16} aria-hidden="true" /> Validation par le service</span><button type="button" aria-expanded={preview} aria-controls={`${id}-preview`} onClick={() => setPreview(value => !value)}>{preview ? 'Fermer l’aperçu' : 'Prévisualiser'}</button></div>
    <div id={`${id}-preview`} hidden={!preview} className="civic-preview"><strong>{text[0]}</strong><p>{text[1]}</p><small>Aperçu fictif : rien n’est publié.</small></div>
    <p className="civic-demo-note">Prototype Litus, pas la capture d’un logiciel livré. Les champs et droits sont adaptés à votre organisation.</p>
  </div>
}

export function CivicProcedure() {
  const [step, setStep] = useState(0)
  const id = useId()
  const stages = [
    { title: 'Comprendre la démarche', text: 'Le public concerné, le bon service et les conditions sont identifiés avant de commencer.', note: 'Pas de compte imposé pour lire une information.' },
    { title: 'Rejoindre le bon outil', text: 'L’habitant accède au téléservice ou au formulaire adapté, avec les consignes utiles.', note: 'Les pièces demandées dépendent de la démarche réelle.' },
    { title: 'Connaître la suite', text: 'La confirmation explique la prise en charge, le contact et le suivi disponible.', note: 'Aucun délai fictif : les engagements viennent de vos services.' },
  ]
  return <div className="civic-demo civic-procedure">
    <p className="civic-demo-label"><FileText size={15} aria-hidden="true" /> Un parcours sans détour <span>Exemple</span></p>
    <div className="civic-steps" role="group" aria-label="Explorer les étapes de la démarche">{stages.map((stage, index) => <button key={stage.title} type="button" aria-pressed={step === index} aria-controls={`${id}-panel`} onClick={() => setStep(index)}><span aria-hidden="true">{index + 1}</span>{['S’informer', 'Commencer', 'Être suivi'][index]}</button>)}</div>
    <div id={`${id}-panel`} className="civic-step-body" aria-live="polite"><span className="civic-icon"><FileText aria-hidden="true" /></span><h3>{stages[step].title}</h3><p>{stages[step].text}</p><small>{stages[step].note}</small></div>
    <p className="civic-demo-note">Parcours illustratif sans saisie, compte ni transmission de données.</p>
  </div>
}
