'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Minus, Search, Calendar, Mail, BarChart3, Target, DollarSign, ExternalLink } from 'lucide-react'

interface MarketAnalysisData {
    id: string
    metier: string
    ville: string
    keyword: string
    searchVolume: number
    cpc: number
    competition: string
    competitionIndex: number
    dataSource: string
    panierMoyen: number
    tauxCapture: number
    potentielMensuel: number
    potentielAnnuel: number
    tendance: string
    analyse: string
    leadId: string | null
    email: string | null
    createdAt: string
}

export default function MarketAnalysisPage() {
    const [analyses, setAnalyses] = useState<MarketAnalysisData[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedAnalysis, setSelectedAnalysis] = useState<MarketAnalysisData | null>(null)

    useEffect(() => {
        fetch('/api/admin/market-analysis')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setAnalyses(data)
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

    const TrendIcon = ({ trend }: { trend: string }) => {
        if (trend === 'Hausse') return <TrendingUp className="w-4 h-4 text-green-500" />
        if (trend === 'Baisse') return <TrendingDown className="w-4 h-4 text-red-500" />
        return <Minus className="w-4 h-4 text-gray-400" />
    }

    const CompetitionBadge = ({ level, index }: { level: string, index?: number }) => {
        const colors: Record<string, string> = {
            LOW: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            MEDIUM: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
            HIGH: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        }
        const labels: Record<string, string> = {
            LOW: 'Faible',
            MEDIUM: 'Moyenne',
            HIGH: 'Forte',
        }
        return (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[level] || colors.MEDIUM}`}>
                {labels[level] || level} {index !== undefined && `(${index}/100)`}
            </span>
        )
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Analyses de Marché</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {analyses.length} analyse{analyses.length > 1 ? 's' : ''} •
                        {analyses.filter(a => a.email).length} avec email
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Liste des analyses */}
                <div className="lg:col-span-1 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {analyses.map(analysis => (
                        <button
                            key={analysis.id}
                            onClick={() => setSelectedAnalysis(analysis)}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${selectedAnalysis?.id === analysis.id
                                    ? 'border-primary bg-primary/5 dark:bg-primary/10'
                                    : 'border-gray-200 dark:border-gray-800 hover:border-primary/50'
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="font-semibold">{analysis.metier}</div>
                                    <div className="text-sm text-gray-500">{analysis.ville}</div>
                                    {/* Email affiché directement */}
                                    {analysis.email && (
                                        <div className="text-xs text-blue-500 mt-1 flex items-center gap-1">
                                            <Mail className="w-3 h-3" />
                                            {analysis.email}
                                        </div>
                                    )}
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-primary">
                                        {formatCurrency(analysis.potentielAnnuel)}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Search className="w-3 h-3" />
                                        {analysis.searchVolume.toLocaleString('fr-FR')}/mois
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-xs">
                                <CompetitionBadge level={analysis.competition} />
                                <TrendIcon trend={analysis.tendance} />
                            </div>
                        </button>
                    ))}

                    {analyses.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            Aucune analyse pour le moment
                        </div>
                    )}
                </div>

                {/* Détail de l'analyse */}
                <div className="lg:col-span-2">
                    {selectedAnalysis ? (
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
                            {/* Header avec email visible */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">{selectedAnalysis.metier} à {selectedAnalysis.ville}</h2>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(selectedAnalysis.createdAt)}
                                        </span>
                                        {selectedAnalysis.email && (
                                            <a
                                                href={`mailto:${selectedAnalysis.email}`}
                                                className="flex items-center gap-1 text-blue-500 hover:underline font-medium"
                                            >
                                                <Mail className="w-4 h-4" />
                                                {selectedAnalysis.email}
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-primary">
                                        {formatCurrency(selectedAnalysis.potentielAnnuel)}
                                    </div>
                                    <div className="text-sm text-gray-500">potentiel annuel</div>
                                </div>
                            </div>

                            {/* Données SEO réelles */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    📊 Données Google (DataForSEO)
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400">Mot-clé analysé</div>
                                        <div className="font-medium text-blue-600 dark:text-blue-400">"{selectedAnalysis.keyword}"</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400">Volume mensuel</div>
                                        <div className="font-bold text-lg">{selectedAnalysis.searchVolume.toLocaleString('fr-FR')}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400">CPC moyen</div>
                                        <div className="font-medium">{selectedAnalysis.cpc.toFixed(2)}€</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400">Concurrence</div>
                                        <CompetitionBadge level={selectedAnalysis.competition} index={selectedAnalysis.competitionIndex} />
                                    </div>
                                </div>
                            </div>

                            {/* Calculs */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                        <Search className="w-4 h-4" />
                                        Recherches/mois
                                    </div>
                                    <div className="text-2xl font-bold">{selectedAnalysis.searchVolume.toLocaleString('fr-FR')}</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                        <Target className="w-4 h-4" />
                                        Taux capture
                                    </div>
                                    <div className="text-2xl font-bold">{(selectedAnalysis.tauxCapture * 100).toFixed(0)}%</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                        <DollarSign className="w-4 h-4" />
                                        Panier moyen
                                    </div>
                                    <div className="text-2xl font-bold">{formatCurrency(selectedAnalysis.panierMoyen)}</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                        <BarChart3 className="w-4 h-4" />
                                        CA mensuel
                                    </div>
                                    <div className="text-2xl font-bold text-green-500">{formatCurrency(selectedAnalysis.potentielMensuel)}</div>
                                </div>
                            </div>

                            {/* Formule de calcul */}
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 font-mono text-sm">
                                <div className="text-gray-500 mb-2">Formule de calcul :</div>
                                <div className="text-gray-900 dark:text-white">
                                    {selectedAnalysis.searchVolume.toLocaleString('fr-FR')} recherches × {(selectedAnalysis.tauxCapture * 100).toFixed(0)}% × {selectedAnalysis.panierMoyen}€ = <span className="text-primary font-bold">{formatCurrency(selectedAnalysis.potentielMensuel)}/mois</span>
                                </div>
                            </div>

                            {/* Analyse IA */}
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    🤖 Analyse IA
                                    <TrendIcon trend={selectedAnalysis.tendance} />
                                    <span className="text-sm font-normal text-gray-500">Tendance: {selectedAnalysis.tendance}</span>
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {selectedAnalysis.analyse}
                                </p>
                            </div>

                            {/* Ce que tu peux vendre */}
                            <div className="bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-xl p-4 border border-primary/20">
                                <h3 className="font-semibold mb-3">🎯 Services à proposer</h3>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                                        <div className="font-medium">Site Web</div>
                                        <div className="text-gray-500">Optimisé SEO local</div>
                                    </div>
                                    <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                                        <div className="font-medium">SEO Local</div>
                                        <div className="text-gray-500">Position Google</div>
                                    </div>
                                    <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                                        <div className="font-medium">Google Ads</div>
                                        <div className="text-gray-500">CPC: {selectedAnalysis.cpc.toFixed(2)}€</div>
                                    </div>
                                </div>
                            </div>

                            {/* Lien lead */}
                            {selectedAnalysis.leadId && (
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <a
                                        href={`/admin/leads`}
                                        className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Voir dans les leads
                                    </a>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center text-gray-500">
                            <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p>Sélectionnez une analyse pour voir les détails</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
