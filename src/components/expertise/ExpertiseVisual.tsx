import Image from 'next/image'
import { Check, Code2, Database, FileText, GitBranch, Layers3, LockKeyhole, Mail, Server, ShoppingBag } from 'lucide-react'
import { expertiseTool } from '@/lib/expertise/catalog'
import type { ExpertiseSlug } from '@/lib/expertise/types'
import { ExpertisePlayground } from './ExpertisePlayground'

export function ExpertiseVisual({ slug }: { slug: ExpertiseSlug }) {
  const tool = expertiseTool(slug)
  return <figure className={`ex-visual ex-visual-${slug}`}>
    <div className="ex-window-bar"><span className="ex-window-dots" aria-hidden="true"><i /><i /><i /></span><span>{tool.name} · atelier Litus</span><Image src={tool.logo} alt="" width={22} height={22} unoptimized /></div>
    {(['nextjs', 'react', 'tailwind', 'stripe'] as string[]).includes(slug) ? <ExpertisePlayground kind={(slug === 'nextjs' ? 'react' : slug) as 'react' | 'tailwind' | 'stripe'} /> : slug === 'typescript' ? <div className="ex-type-example">
      <div className="ex-demo-title"><div><small>Contrat de données</small><strong>Traiter l’absence. Avant l’erreur.</strong></div><Code2 aria-hidden="true" /></div>
      <div className="ex-type-input"><span>Réponse du CRM</span><code>{'{ email: null }'}</code></div>
      <div className="ex-type-code"><code><span>type</span>{' Contact = {\n  email: string | null\n}'}</code></div>
      <div className="ex-type-outcomes"><div><Check size={18} aria-hidden="true" /><span>Email présent<strong>Afficher le contact</strong></span></div><div><Check size={18} aria-hidden="true" /><span>Email absent<strong>Prévoir une alternative</strong></span></div></div>
      <p className="ex-demo-note">Le contrat guide le code. Les données entrantes restent à valider.</p>
    </div> : slug === 'framer' ? <div className="ex-framer-example">
      <div className="ex-demo-title"><div><small>Structure de site, illustration</small><strong>Publier sans tout redessiner.</strong></div><Layers3 aria-hidden="true" /></div>
      <div className="ex-cms-layout"><div className="ex-cms-sidebar"><span>Collection</span><strong>Réalisations</strong>{['Titre', 'Contexte', 'Visuel', 'Service lié'].map(label => <span key={label}><FileText size={13} aria-hidden="true" />{label}</span>)}</div><div className="ex-cms-page"><small>Modèle de page</small><strong>Votre projet.<br />Son histoire.</strong><div className="ex-cms-content"><span>Contexte</span><span>Intervention</span><span>Prochaine étape</span></div><span className="ex-cms-action">Une demande claire<Mail size={14} aria-hidden="true" /></span></div></div>
      <p className="ex-demo-note">Exemple de modèle CMS. Ce n’est pas une capture de l’éditeur Framer.</p>
    </div> : slug === 'vercel' ? <div className="ex-vercel-example">
      <div className="ex-demo-title"><div><small>Exemple de livraison</small><strong>Une version. Un chemin lisible.</strong></div><GitBranch aria-hidden="true" /></div>
      <div className="ex-deployment"><span className="ex-branch"><GitBranch size={15} aria-hidden="true" />feature/formulaire</span><code>git → preview → production</code></div>
      <ol className="ex-release-list">{[{ icon: Code2, title: 'Build', text: 'Code et types contrôlés' }, { icon: LockKeyhole, title: 'Preview', text: 'Accès et données de test séparés' }, { icon: Server, title: 'Production', text: 'Version validée, retour préparé' }, { icon: Database, title: 'Observabilité', text: 'Logs, erreurs et consommation' }].map(({ icon: Icon, title, text }) => <li key={title}><Icon aria-hidden="true" /><span><strong>{title}</strong><small>{text}</small></span><Check size={15} aria-hidden="true" /></li>)}</ol>
      <p className="ex-demo-note">Illustration du processus. Aucun déploiement réel n’est déclenché ici.</p>
    </div> : slug === 'shopify' ? <div className="ex-shopify-example">
      <div className="ex-demo-title"><div><small>Catalogue de démonstration</small><strong>Une boutique, une organisation.</strong></div><ShoppingBag aria-hidden="true" /></div>
      <div className="ex-catalogue">{[{ name: 'Carnet Atelier', variant: 'Sable · A5', color: '#c5a47e' }, { name: 'Sac Quotidien', variant: 'Bleu nuit', color: '#38536a' }, { name: 'Trousse Nomade', variant: 'Terre cuite', color: '#c77c58' }].map(item => <div key={item.name}><span className="ex-product-swatch" style={{ background: item.color }} aria-hidden="true"><ShoppingBag size={21} /></span><span><strong>{item.name}</strong><small>{item.variant}</small></span><span className="ex-demo-status">Synchronisé</span></div>)}</div>
      <div className="ex-commerce-systems"><span><ShoppingBag size={16} aria-hidden="true" />Boutique</span><span><Database size={16} aria-hidden="true" />Stock / ERP</span><span><Mail size={16} aria-hidden="true" />Suivi client</span></div>
      <p className="ex-demo-note">Produits et états fictifs. Exemple de catalogue relié aux outils métier.</p>
    </div> : <div className="ex-wordpress-example">
      <div className="ex-demo-title"><div><small>Avant une intervention</small><strong>Un diagnostic. Pas une supposition.</strong></div><Server aria-hidden="true" /></div>
      <div className="ex-wp-map"><div><Database aria-hidden="true" /><strong>Base + fichiers</strong><span>Sauvegarde</span></div><div><Layers3 aria-hidden="true" /><strong>Thème + plugins</strong><span>Compatibilité</span></div><div><Mail aria-hidden="true" /><strong>Formulaire</strong><span>Réception réelle</span></div><div><LockKeyhole aria-hidden="true" /><strong>Accès + logs</strong><span>Vérifications</span></div></div>
      <div className="ex-wp-flow"><span>Observer</span><span>Isoler</span><span>Corriger</span><span>Tester</span></div>
      <p className="ex-demo-note">Schéma de diagnostic, pas un audit automatique de votre site.</p>
    </div>}
    <figcaption>Illustration originale Litus · Exemple de fonctionnement</figcaption>
  </figure>
}
