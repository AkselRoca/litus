'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Minus, Search, Calendar, Mail, BarChart3, Target, Users } from 'lucide-react'

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
    tauxConversion: number
    tauxCapture: number
    potentielMensuel: number
    potentielAnnuel: number
    tendance: string
    analyse: string
    conseils: string[]
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

    const CompetitionBadge = ({ level }: { level: string }) => {
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
                {labels[level] || level}
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
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-primary">
                                        {formatCurrency(analysis.potentielAnnuel)}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Search className="w-3 h-3" />
                                        {analysis.searchVolume}/mois
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-xs">
                                <CompetitionBadge level={analysis.competition} />
                                <TrendIcon trend={analysis.tendance} />
                                {analysis.email && <Mail className="w-3 h-3 text-blue-500" />}
                                <span className="text-gray-400 ml-auto">
                                    {analysis.dataSource === 'dataforseo' ? '📊 API' : '📈 Est.'}
                                </span>
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
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">{selectedAnalysis.metier} à {selectedAnalysis.ville}</h2>
                                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4" />
                                        {formatDate(selectedAnalysis.createdAt)}
                                        {selectedAnalysis.email && (
                                            <>
                                                <span className="mx-2">•</span>
                                                <Mail className="w-4 h-4 text-blue-500" />
                                                <span className="text-blue-500">{selectedAnalysis.email}</span>
                                            </>
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

                            {/* Métriques */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                        <Search className="w-4 h-4" />
                                        Recherches/mois
                                    </div>
                                    <div className="text-2xl font-bold">{selectedAnalysis.searchVolume}</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                        <Users className="w-4 h-4" />
                                        Concurrence
                                    </div>
                                    <CompetitionBadge level={selectedAnalysis.competition} />
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                        <BarChart3 className="w-4 h-4" />
                                        Panier moyen
                                    </div>
                                    <div className="text-2xl font-bold">{formatCurrency(selectedAnalysis.panierMoyen)}</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                        <Target className="w-4 h-4" />
                                        Part captable
                                    </div>
                                    <div className="text-2xl font-bold">{(selectedAnalysis.tauxCapture * 100).toFixed(0)}%</div>
                                </div>
                            </div>

                            {/* Détails calcul */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                                <h3 className="font-semibold mb-2">📊 Détails du calcul</h3>
                                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    <p><strong>Source données:</strong> {selectedAnalysis.dataSource === 'dataforseo' ? 'DataForSEO (réel)' : 'Estimation (heuristique)'}</p>
                                    <p><strong>CPC moyen:</strong> {selectedAnalysis.cpc.toFixed(2)}€</p>
                                    <p><strong>Taux conversion:</strong> {(selectedAnalysis.tauxConversion * 100).toFixed(1)}%</p>
                                    <p><strong>Taux capture marché:</strong> {(selectedAnalysis.tauxCapture * 100).toFixed(0)}%</p>
                                    <p><strong>Potentiel mensuel:</strong> {formatCurrency(selectedAnalysis.potentielMensuel)}</p>
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

                            {/* Conseils */}
                            <div>
                                <h3 className="font-semibold mb-2">💡 Conseils personnalisés</h3>
                                <ul className="space-y-2">
                                    {selectedAnalysis.conseils.map((conseil, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                                {i + 1}
                                            </span>
                                            {conseil}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Lien lead */}
                            {selectedAnalysis.leadId && (
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <a
                                        href={`/admin/leads?id=${selectedAnalysis.leadId}`}
                                        className="text-primary hover:underline text-sm font-medium"
                                    >
                                        Voir le lead associé →
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
