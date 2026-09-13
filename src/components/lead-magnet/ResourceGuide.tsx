import Link from 'next/link'

const guides = {
  'checklist-gmb': {
    title: 'Une checklist pour une fiche Google Business Profile plus fiable',
    intro: 'Cette ressource s’adresse aux commerces, artisans et entreprises de services qui reçoivent des clients ou interviennent dans une zone locale. Elle vous aide à repérer les informations à corriger avant de chercher à multiplier les publications ou les avis.',
    sections: [
      { title: 'Que vérifier sur votre fiche établissement ?', text: 'Commencez par votre catégorie principale, vos services, vos horaires et votre zone d’intervention. Comparez ensuite le téléphone, le nom de l’entreprise et l’adresse avec les informations publiées sur votre site. Des photos représentatives et des réponses utiles aux avis aident aussi un futur client à comprendre votre activité.' },
      { title: 'Comment utiliser la checklist ?', text: 'Ouvrez votre fiche et votre site côte à côte. Notez les écarts, priorisez les informations qui peuvent empêcher un client de vous joindre et gardez une trace des corrections. Ne partagez ni votre mot de passe Google ni vos codes de connexion : un accompagnement se fait avec les accès de gestion appropriés.' },
      { title: 'Faut-il aussi travailler le site internet ?', text: 'La fiche et le site répondent à des besoins complémentaires. La fiche facilite la découverte locale et la prise de contact ; vos pages présentent les prestations, les réalisations et les réponses détaillées. La checklist constitue un premier diagnostic, pas une garantie de position sur Google Maps.' },
    ],
    links: [{ href: '/google-business-profile', text: 'Optimiser une fiche Google Business Profile' }, { href: '/seo-local', text: 'Construire une stratégie de référencement local' }],
  },
  'audit-productivite': {
    title: 'Repérer les tâches répétitives avant de les automatiser',
    intro: 'Ce diagnostic s’adresse aux dirigeants et aux équipes qui recopient des informations, relancent manuellement des dossiers ou passent du temps à produire les mêmes documents. L’objectif est de choisir un premier processus utile, pas de remplacer tous vos outils.',
    sections: [
      { title: 'Quels processus observer ?', text: 'Listez les étapes qui reviennent chaque semaine : réception des demandes, qualification des contacts, saisie dans le CRM, préparation des devis, relances ou reporting. Pour chaque étape, relevez sa fréquence, le temps consacré et les erreurs qui obligent à recommencer. Distinguez les actions prévisibles des décisions qui nécessitent une validation humaine.' },
      { title: 'Comment prioriser un premier scénario ?', text: 'Choisissez une tâche fréquente, avec des règles explicites et des données accessibles. Un formulaire transmis au CRM puis suivi d’un email de confirmation est souvent plus simple à cadrer qu’un processus avec de nombreuses exceptions. Le gain potentiel doit être comparé au temps de mise en place, aux abonnements et à la maintenance.' },
      { title: 'L’intelligence artificielle est-elle indispensable ?', text: 'Non. Une synchronisation ou un rappel planifié peut fonctionner sans IA. L’analyse de texte ou de documents peut justifier une étape assistée, avec contrôle humain et précautions sur les données. Le diagnostic prépare la discussion : les gains réels dépendent de vos volumes, de vos outils et des exceptions rencontrées.' },
    ],
    links: [{ href: '/automatisation', text: 'Cadrer une automatisation métier' }, { href: '/expertise/n8n', text: 'Connecter vos outils avec n8n' }, { href: '/integrations-api', text: 'Comprendre les intégrations API' }],
  },
} as const

export function ResourceGuide({ magnetId }: { magnetId: string }) {
  const guide = guides[magnetId as keyof typeof guides]
  if (!guide) return null
  return (
    <section className="mt-16 text-left space-y-7 text-gray-600 dark:text-gray-300" aria-labelledby="resource-guide-title">
      <h2 id="resource-guide-title" className="text-2xl font-bold text-gray-900 dark:text-white">{guide.title}</h2>
      <p className="leading-relaxed">{guide.intro}</p>
      {guide.sections.map(section => (
        <div key={section.title}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{section.title}</h3>
          <p className="leading-relaxed">{section.text}</p>
        </div>
      ))}
      <nav aria-label="Approfondir cette ressource" className="flex flex-wrap gap-x-6 gap-y-3">
        {guide.links.map(link => <Link key={link.href} href={link.href} className="underline underline-offset-4">{link.text}</Link>)}
      </nav>
    </section>
  )
}
