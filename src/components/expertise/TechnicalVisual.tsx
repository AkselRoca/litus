import Image from 'next/image'
import { ArrowRight, Check, Code2 } from 'lucide-react'
import type { ExpertiseSlug } from '@/lib/expertise/types'

const examples = {
  python: { title: 'Des fichiers. Un traitement clair.', input: 'Commandes.csv + référentiel', operation: 'Normaliser · rapprocher · contrôler', output: 'Rapport + import CRM', code: 'lire → valider → transformer → transmettre', note: 'Les lignes ambiguës sont isolées, pas silencieusement importées.' },
  csharp: { title: 'La règle métier, au bon endroit.', input: 'Une demande de validation', operation: 'Identité · droits · état du dossier', output: 'Décision et historique', code: 'demande → autorisation → règle → résultat', note: 'Une action affichée dans l’interface reste contrôlée côté serveur.' },
  dotnet: { title: 'Une interface. Des services fiables.', input: 'Application web ou logiciel', operation: 'API ASP.NET Core', output: 'Données et règles métier', code: 'interface → API → service → stockage', note: 'Le choix de l’hébergement tient compte des dépendances et de l’exploitation.' },
  labview: { title: 'Du signal au compte rendu.', input: 'Instrument et canal', operation: 'Acquérir · traiter · visualiser', output: 'Mesures horodatées', code: 'instrument → acquisition → traitement → rapport', note: 'Simulation explicative : la chaîne réelle doit être validée sur le matériel cible.' },
}
export function TechnicalVisual({ slug }: { slug: ExpertiseSlug }) {
  const example = examples[slug as keyof typeof examples]
  if (!example) return null
  return <div className="ex-technical-demo"><div className="ex-technical-title"><div><small>Architecture illustrative</small><strong>{example.title}</strong></div>{slug === 'dotnet' ? <Image src="/expertise/images/dotnet-appareils-officiel.webp" alt="Illustration officielle .NET représentant plusieurs appareils" width={251} height={250} className="ex-dotnet-art" /> : <Code2 size={25} aria-hidden="true" />}</div><div className="ex-technical-flow">{[example.input, example.operation, example.output].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < 2 ? <ArrowRight size={17} aria-hidden="true" /> : <Check size={17} aria-hidden="true" />}</div>)}</div><p className="ex-technical-code">{example.code}</p><p className="ex-demo-note">{example.note}</p></div>
}
