import { MapPin, DollarSign, Cog } from 'lucide-react'

// Configuration des lead magnets
export const LEAD_MAGNETS = {
    'checklist-gmb': {
        title: 'Les 5 erreurs Google qui envoient vos clients chez la concurrence',
        subtitle: 'Checklist gratuite — 2 pages',
        description: 'Corrigez les erreurs les plus courantes sur votre fiche Google Business et gagnez en visibilité locale.',
        icon: MapPin,
        color: 'emerald',
        gradient: 'from-emerald-500/20 via-emerald-400/5 to-transparent',
        gradientDark: 'dark:from-emerald-500/30 dark:to-transparent',
        buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
        iconBg: 'bg-emerald-50 dark:bg-gradient-to-br dark:from-emerald-500 dark:to-teal-600',
        ringColor: 'focus:ring-emerald-500/50',
        downloadUrl: '/lead-magnets/checklist-gmb-litus.pdf',
    },
    'guide-prix': {
        title: 'Le vrai prix d\'un site internet en 2026',
        subtitle: 'Guide comparatif gratuit — 3 pages',
        description: 'Comparez les tarifs du marché et évitez les arnaques. Freelance, agence, Wix : on vous dit tout.',
        icon: DollarSign,
        color: 'blue',
        gradient: 'from-blue-500/20 via-blue-400/5 to-transparent',
        gradientDark: 'dark:from-blue-500/30 dark:to-transparent',
        buttonBg: 'bg-blue-600 hover:bg-blue-700',
        iconBg: 'bg-blue-50 dark:bg-gradient-to-br dark:from-blue-500 dark:to-indigo-600',
        ringColor: 'focus:ring-blue-500/50',
        downloadUrl: '/lead-magnets/guide-prix-site-web-litus.pdf',
    },
    'audit-productivite': {
        title: 'Calculez combien d\'heures vous perdez chaque semaine',
        subtitle: 'Diagnostic productivité gratuit',
        description: 'Identifiez les tâches répétitives qui freinent votre entreprise et découvrez comment les automatiser.',
        icon: Cog,
        color: 'purple',
        gradient: 'from-purple-500/20 via-purple-400/5 to-transparent',
        gradientDark: 'dark:from-purple-500/30 dark:to-transparent',
        buttonBg: 'bg-purple-600 hover:bg-purple-700',
        iconBg: 'bg-purple-50 dark:bg-gradient-to-br dark:from-purple-500 dark:to-pink-600',
        ringColor: 'focus:ring-purple-500/50',
        downloadUrl: '/lead-magnets/audit-productivite-litus.pdf',
    },
} as const

export type LeadMagnetId = keyof typeof LEAD_MAGNETS
