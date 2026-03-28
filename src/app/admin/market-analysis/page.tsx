'use client'

import { useEffect, useState, useMemo } from 'react'
import { TrendingUp, TrendingDown, Minus, Search, Calendar, Mail, BarChart3, Target, DollarSign, ExternalLink, Trash2, CheckSquare, Square, X, Loader2, Filter, MailX } from 'lucide-react'

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

type EmailFilter = 'all' | 'with' | 'without'
type DateFilter = 'all' | 'today' | '7days' | '30days'

export default function MarketAnalysisPage() {
    const [analyses, setAnalyses] = useState<MarketAnalysisData[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedAnalysis, setSelectedAnalysis] = useState<MarketAnalysisData | null>(null)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
    const [deleting, setDeleting] = useState(false)
    const [emailFilter, setEmailFilter] = useState<EmailFilter>('all')
    const [dateFilter, setDateFilter] = useState<DateFilter>('all')

    const filteredAnalyses = useMemo(() => {
        return analyses.filter(a => {
            // Email filter
            if (emailFilter === 'with' && !a.email) return false
            if (emailFilter === 'without' && a.email) return false
            // Date filter
            if (dateFilter !== 'all') {
                const created = new Date(a.createdAt)
                const now = new Date()
                const diffMs = now.getTime() - created.getTime()
                const diffDays = diffMs / (1000 * 60 * 60 * 24)
                if (dateFilter === 'today' && diffDays > 1) return false
                if (dateFilter === '7days' && diffDays > 7) return false
                if (dateFilter === '30days' && diffDays > 30) return false
            }
            return true
        })
    }, [analyses, emailFilter, dateFilter])

    useEffect(() => {
        loadAnalyses()
    }, [])

    const loadAnalyses = async () => {
        try {
            const res = await fetch('/api/admin/market-analysis')
            const data = await res.json()
            if (Array.isArray(data)) {
                setAnalyses(data)
            }
        } catch (error) {
            console.error('Error loading analyses:', error)
        } finally {
            setLoading(false)
        }
    }

    const deleteAnalysis = async (id: string) => {
        if (!confirm('Supprimer cette analyse ?')) return
        setDeleting(true)
        try {
            await fetch(`/api/admin/market-analysis/${id}`, { method: 'DELETE' })
            setAnalyses(prev => prev.filter(a => a.id !== id))
            if (selectedAnalysis?.id === id) setSelectedAnalysis(null)
        } catch (error) {
            console.error('Delete error:', error)
        } finally {
            setDeleting(false)
        }
    }

    const bulkDelete = async () => {
        if (selectedIds.size === 0) return
        if (!confirm(`Supprimer ${selectedIds.size} analyse(s) ?`)) return
        setDeleting(true)
        try {
            await Promise.all(
                Array.from(selectedIds).map(id =>
                    fetch(`/api/admin/market-analysis/${id}`, { method: 'DELETE' })
                )
            )
            setAnalyses(prev => prev.filter(a => !selectedIds.has(a.id)))
            setSelectedIds(new Set())
            setSelectedAnalysis(null)
        } catch (error) {
            console.error('Bulk delete error:', error)
        } finally {
            setDeleting(false)
        }
    }

    const toggleSelect = (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedIds(prev => {
            const newSet = new Set(prev)
            if (newSet.has(id)) newSet.delete(id)
            else newSet.add(id)
            return newSet
        })
    }

    const selectAll = () => {
        const filteredIds = filteredAnalyses.map(a => a.id)
        const allFilteredSelected = filteredIds.every(id => selectedIds.has(id))
        if (allFilteredSelected) {
            setSelectedIds(new Set())
        } else {
            setSelectedIds(new Set(filteredIds))
        }
    }

    const selectAllWithoutEmail = () => {
        const noEmailIds = filteredAnalyses.filter(a => !a.email).map(a => a.id)
        setSelectedIds(new Set(noEmailIds))
    }

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

    const TrendIcon = ({ trend }: { trend: string }) => {
        if (trend === 'Hausse') return <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-500" />
        if (trend === 'Baisse') return <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-500" />
        return <Minus className="w-4 h-4 text-gray-400" />
    }

    const CompetitionBadge = ({ level, index }: { level: string, index?: number }) => {
        const colors: Record<string, string> = {
            LOW: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20',
            MEDIUM: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20',
            HIGH: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
        }
        const labels: Record<string, string> = {
            LOW: 'Faible',
            MEDIUM: 'Moyenne',
            HIGH: 'Forte',
        }
        return (
            <span className={`px-2 py-0.5 rounded-md border text-[11px] font-medium ${colors[level] || colors.MEDIUM}`}>
                {labels[level] || level} {index !== undefined && `(${index}/100)`}
            </span>
        )
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Analyses de Marché</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {filteredAnalyses.length} sur {analyses.length} analyse{analyses.length > 1 ? 's' : ''} •
                        {analyses.filter(a => a.email).length} avec email
                    </p>
                </div>
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                    <Filter className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Filtres</span>
                </div>
                <div className="w-px h-6 bg-gray-200 dark:bg-white/10" />

                {/* Email filter */}
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-white/5 rounded-lg p-0.5 border border-gray-100 dark:border-white/10">
                    {([['all', 'Tous'], ['with', '✉️ Avec email'], ['without', '🚫 Sans email']] as const).map(([value, label]) => (
                        <button
                            key={value}
                            onClick={() => { setEmailFilter(value); setSelectedIds(new Set()) }}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                emailFilter === value
                                    ? 'bg-white dark:bg-white/15 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-white/10'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Date filter */}
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-white/5 rounded-lg p-0.5 border border-gray-100 dark:border-white/10">
                    {([['all', 'Tout'], ['today', 'Aujourd\'hui'], ['7days', '7 jours'], ['30days', '30 jours']] as const).map(([value, label]) => (
                        <button
                            key={value}
                            onClick={() => { setDateFilter(value); setSelectedIds(new Set()) }}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                dateFilter === value
                                    ? 'bg-white dark:bg-white/15 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-white/10'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Raccourci suppression sans email */}
                {emailFilter !== 'with' && filteredAnalyses.some(a => !a.email) && (
                    <>
                        <div className="w-px h-6 bg-gray-200 dark:bg-white/10" />
                        <button
                            onClick={selectAllWithoutEmail}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-100 dark:border-red-500/10 rounded-lg transition-colors"
                        >
                            <MailX className="w-3.5 h-3.5" />
                            Sélectionner sans email ({filteredAnalyses.filter(a => !a.email).length})
                        </button>
                    </>
                )}
            </div>

            {/* Barre d'actions bulk */}
            {selectedIds.size > 0 && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-center justify-between">
                    <span className="text-primary text-sm font-medium">{selectedIds.size} analyse(s) sélectionnée(s)</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={bulkDelete}
                            disabled={deleting}
                            className="flex items-center gap-2 px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:border-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-xs font-medium transition-colors"
                        >
                            {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                            Supprimer
                        </button>
                        <button
                            onClick={() => setSelectedIds(new Set())}
                            className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Liste des analyses */}
                <div className="lg:col-span-1 space-y-3 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto pr-1 pb-10">
                    {/* Header sélection */}
                    {filteredAnalyses.length > 0 && (
                        <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl">
                            <button onClick={selectAll} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                                {filteredAnalyses.length > 0 && filteredAnalyses.every(a => selectedIds.has(a.id)) ? (
                                    <CheckSquare className="w-4 h-4 text-primary" />
                                ) : (
                                    <Square className="w-4 h-4" />
                                )}
                            </button>
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Tout sélectionner ({filteredAnalyses.length})</span>
                        </div>
                    )}

                    {filteredAnalyses.map(analysis => {
                        const isSelected = selectedIds.has(analysis.id)
                        return (
                            <div
                                key={analysis.id}
                                className={`relative p-4 rounded-xl border transition-all cursor-pointer bg-white dark:bg-[#111] ${selectedAnalysis?.id === analysis.id
                                        ? 'border-primary shadow-sm bg-primary/[0.02] dark:bg-primary/5'
                                        : isSelected
                                            ? 'border-primary/50 bg-primary/5'
                                            : 'border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    {/* Checkbox */}
                                    <button
                                        onClick={(e) => toggleSelect(analysis.id, e)}
                                        className="mt-1 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors flex-shrink-0"
                                    >
                                        {isSelected ? (
                                            <CheckSquare className="w-4 h-4 text-primary" />
                                        ) : (
                                            <Square className="w-4 h-4" />
                                        )}
                                    </button>

                                    {/* Content */}
                                    <div
                                        className="flex-1 min-w-0"
                                        onClick={() => setSelectedAnalysis(analysis)}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">{analysis.metier}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{analysis.ville}</div>
                                                {analysis.email && (
                                                    <div className="text-[11px] font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-1 truncate">
                                                        <Mail className="w-3 h-3 flex-shrink-0" />
                                                        <span className="truncate">{analysis.email}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <div className="font-bold text-sm text-primary">
                                                    {formatCurrency(analysis.potentielAnnuel)}
                                                </div>
                                                <div className="flex items-center justify-end gap-1 text-[11px] text-gray-500 font-medium">
                                                    <Search className="w-3 h-3" />
                                                    {analysis.searchVolume.toLocaleString('fr-FR')} /m
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                                            <CompetitionBadge level={analysis.competition} />
                                            <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 ml-auto bg-gray-50 dark:bg-white/5 px-2 py-0.5 rounded border border-gray-100 dark:border-white/5">
                                                <TrendIcon trend={analysis.tendance} />
                                                <span>Tendance {analysis.tendance.toLowerCase()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {filteredAnalyses.length === 0 && (
                        <div className="text-center py-12 text-gray-500 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl text-sm">
                            <BarChart3 className="w-8 h-8 mx-auto mb-3 opacity-30" />
                            {analyses.length === 0 ? 'Aucune analyse pour le moment' : 'Aucune analyse ne correspond aux filtres'}
                        </div>
                    )}
                </div>

                {/* Détail de l'analyse */}
                <div className="lg:col-span-2">
                    {selectedAnalysis ? (
                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 space-y-6 lg:sticky lg:top-8 lg:max-h-[calc(100vh-100px)] overflow-y-auto">
                            {/* Header avec email visible */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-gray-100 dark:border-white/10">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedAnalysis.metier} à {selectedAnalysis.ville}</h2>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-md border border-gray-100 dark:border-white/5 text-xs font-medium">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(selectedAnalysis.createdAt)}
                                        </span>
                                        {selectedAnalysis.email && (
                                            <a
                                                href={`mailto:${selectedAnalysis.email}`}
                                                className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-md text-xs border border-blue-100 dark:border-blue-500/20"
                                            >
                                                <Mail className="w-3.5 h-3.5" />
                                                {selectedAnalysis.email}
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="sm:text-right bg-primary/5 border border-primary/10 rounded-xl p-3">
                                    <div className="text-2xl font-bold text-primary leading-none">
                                        {formatCurrency(selectedAnalysis.potentielAnnuel)}
                                    </div>
                                    <div className="text-xs font-medium text-primary/70 uppercase tracking-wider mt-1">potentiel annuel</div>
                                </div>
                            </div>

                            {/* Données SEO réelles */}
                            <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-5">
                                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-400 mb-4 flex items-center gap-2">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                                    Données Google (DataForSEO)
                                </h3>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <div className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium mb-1 uppercase tracking-wider">Mot-clé analysé</div>
                                        <div className="font-semibold text-sm text-gray-900 dark:text-white">&quot;{selectedAnalysis.keyword}&quot;</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium mb-1 uppercase tracking-wider">Volume mensuel</div>
                                        <div className="font-bold text-lg text-gray-900 dark:text-white">{selectedAnalysis.searchVolume.toLocaleString('fr-FR')}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium mb-1 uppercase tracking-wider">CPC moyen</div>
                                        <div className="font-semibold text-sm text-gray-900 dark:text-white">{selectedAnalysis.cpc.toFixed(2)}€</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium mb-1 uppercase tracking-wider">Concurrence</div>
                                        <CompetitionBadge level={selectedAnalysis.competition} index={selectedAnalysis.competitionIndex} />
                                    </div>
                                </div>
                            </div>

                            {/* Calculs rapides */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5 relative overflow-hidden group">
                                    <Search className="absolute -right-2 -bottom-2 w-12 h-12 text-gray-200 dark:text-white/5 group-hover:scale-110 transition-transform" />
                                    <div className="relative">
                                        <div className="text-[10px] text-gray-500 uppercase font-medium tracking-wider mb-1">Recherches /m</div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedAnalysis.searchVolume.toLocaleString('fr-FR')}</div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5 relative overflow-hidden group">
                                    <Target className="absolute -right-2 -bottom-2 w-12 h-12 text-gray-200 dark:text-white/5 group-hover:scale-110 transition-transform" />
                                    <div className="relative">
                                        <div className="text-[10px] text-gray-500 uppercase font-medium tracking-wider mb-1">Taux capture</div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">{(selectedAnalysis.tauxCapture * 100).toFixed(0)}%</div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5 relative overflow-hidden group">
                                    <DollarSign className="absolute -right-2 -bottom-2 w-12 h-12 text-gray-200 dark:text-white/5 group-hover:scale-110 transition-transform" />
                                    <div className="relative">
                                        <div className="text-[10px] text-gray-500 uppercase font-medium tracking-wider mb-1">Panier moyen</div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(selectedAnalysis.panierMoyen)}</div>
                                    </div>
                                </div>
                                <div className="bg-green-50 dark:bg-green-500/10 p-4 rounded-xl border border-green-100 dark:border-green-500/20 relative overflow-hidden group">
                                    <BarChart3 className="absolute -right-2 -bottom-2 w-12 h-12 text-green-200 dark:text-green-500/10 group-hover:scale-110 transition-transform" />
                                    <div className="relative">
                                        <div className="text-[10px] text-green-700 dark:text-green-400 uppercase font-bold tracking-wider mb-1">CA Mensuel</div>
                                        <div className="text-lg font-bold text-green-600 dark:text-green-400">{formatCurrency(selectedAnalysis.potentielMensuel)}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Analyse IA */}
                            <div className="pt-2">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    🤖 Analyse de l'IA experte Litus
                                </h3>
                                <div className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 p-4 rounded-xl text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                                    {selectedAnalysis.analyse.replace(/\n\n/g, ' ').split('\n').map((paragraph, i) => (
                                        <p key={i} className={i > 0 ? 'mt-3' : ''}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Ce que tu peux vendre */}
                            <div className="bg-gradient-to-r from-primary/10 to-orange-500/5 rounded-xl p-5 border border-primary/20">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    🎯 Propositions commerciales
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                    <div className="bg-white/80 dark:bg-[#111] p-3 rounded-lg border border-primary/10 shadow-sm">
                                        <div className="font-bold text-gray-900 dark:text-white mb-0.5">Création Site Web</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Optimisé conversion locale</div>
                                    </div>
                                    <div className="bg-white/80 dark:bg-[#111] p-3 rounded-lg border border-primary/10 shadow-sm">
                                        <div className="font-bold text-gray-900 dark:text-white mb-0.5">Forfait SEO Local</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Objectif 1ère Google locale</div>
                                    </div>
                                    <div className="bg-white/80 dark:bg-[#111] p-3 rounded-lg border border-primary/10 shadow-sm">
                                        <div className="font-bold text-gray-900 dark:text-white mb-0.5">Campagne Ads</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Rentabilité (CPC {selectedAnalysis.cpc.toFixed(2)}€)</div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100 dark:border-white/10">
                                {selectedAnalysis.leadId && (
                                    <a
                                        href="/admin/leads"
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white font-medium rounded-xl transition-colors text-sm"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Consulter dans le CRM
                                    </a>
                                )}
                                <button
                                    onClick={() => deleteAnalysis(selectedAnalysis.id)}
                                    disabled={deleting}
                                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-50 hover:bg-red-100 border border-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:border-red-500/10 text-red-600 dark:text-red-400 font-medium rounded-xl transition-colors text-sm"
                                >
                                    {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    Supprimer l'analyse
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-12 text-center text-gray-500 h-[calc(100vh-200px)] flex flex-col items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4">
                                <BarChart3 className="w-8 h-8 opacity-40 text-gray-500" />
                            </div>
                            <p className="font-medium text-gray-900 dark:text-white mb-1">Aucune analyse sélectionnée</p>
                            <p className="text-sm">Cliquez sur une analyse dans la liste pour voir les détails et les données Google Ads.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
