import { ArrowDown, Check, FileText, GitBranch } from 'lucide-react'
import { connectedDefinitions } from '@/lib/expertise/connected-definitions'
import type { ExpertiseSlug } from '@/lib/expertise/types'
import './expertise-connected.css'

export function ConnectedVisual({ slug }: { slug: ExpertiseSlug }) {
  const d = connectedDefinitions.find(item => item.slug === slug)
  if (!d) return null
  return <div className={`ex-connected-demo ex-connected-${d.visual.kind}`}><p className="ex-connected-eyebrow">Scénario illustratif · {d.name}</p><div className="seo-visual-title">{d.visual.title}</div><div className="ex-connected-inputs">{d.visual.input.map((item, i) => <div key={item}><span>{d.visual.kind === 'code' ? <GitBranch size={15} /> : d.visual.kind === 'documents' ? <FileText size={15} /> : `0${i + 1}`}</span><p>{item}</p></div>)}</div><div className="ex-connected-gate"><ArrowDown size={18} /><span>Règles, droits et contrôles définis</span></div><div className="ex-connected-outputs">{d.visual.output.map(item => <div key={item}><Check size={15} /><span>{item}</span></div>)}</div><p className="ex-demo-note">Données fictives. Les actions et validations se définissent avec votre équipe.</p></div>
}
