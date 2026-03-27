'use client'

import { useState, useEffect, useCallback } from 'react'
import { Users, FileText, TrendingUp, Euro, Clock, Image, Briefcase, ArrowUpRight, ArrowDownRight, Settings, Check, Loader2, Mail, Phone, Eye, MousePointer, Calendar } from 'lucide-react'
import Link from 'next/link'

interface Stats {
    leadsThisMonth: number
    leadsChange: number
    totalLeads: number
    conversionRate: string
    publishedArticles: number
    articlesThisMonth: number
    totalOneShot: number
    totalMonthly: number
    projects: number
    media: number
    newLeads: number
    contacted: number
    quoteSent: number
    signed: number
    refused: number
    visitorsToday?: number
    pageViewsToday?: number
}

interface Lead {
    id: string
    email: string | null
    phone: string | null
    status: string
    createdAt: string
    parsedData: { nom?: string; name?: string }
}

const availableTiles = [
    { id: 'leadsMonth', label: 'Leads', icon: Users, category: 'leads' },
    { id: 'conversion', label: 'Taux de conversion', icon: TrendingUp, category: 'leads' },
    { id: 'caOneShot', label: 'CA One-shot', icon: Euro, category: 'finance' },
    { id: 'caRecurrent', label: 'CA Récurrent', icon: Clock, category: 'finance' },
    { id: 'articles', label: 'Articles publiés', icon: FileText, category: 'content' },
    { id: 'projects', label: 'Projets portfolio', icon: Briefcase, category: 'content' },
    { id: 'media', label: 'Médias', icon: Image, category: 'content' },
    { id: 'visitorsToday', label: 'Visiteurs', icon: Eye, category: 'analytics' },
    { id: 'pageViews', label: 'Pages vues', icon: Eye, category: 'analytics' },
    { id: 'bounceRate', label: 'Taux de rebond', icon: MousePointer, category: 'analytics' },
]

const defaultVisibleTiles = ['leadsMonth', 'conversion', 'caOneShot', 'caRecurrent', 'visitorsToday']

const datePresets = [
    { label: 'Aujourd\'hui', value: 'today' },
    { label: '7 derniers jours', value: '7d' },
    { label: '30 derniers jours', value: '30d' },
    { label: 'Ce mois', value: 'month' },
    { label: 'Cette année', value: 'year' },
    { label: 'Toute la période', value: 'all' },
]

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [recentLeads, setRecentLeads] = useState<Lead[]>([])
    const [recentMedia, setRecentMedia] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showSettings, setShowSettings] = useState(false)
    const [visibleTiles, setVisibleTiles] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('dashboardTiles')
            return saved ? JSON.parse(saved) : defaultVisibleTiles
        }
        return defaultVisibleTiles
    })
    const [datePreset, setDatePreset] = useState('30d')

    const getDateRange = useCallback(() => {
        const now = new Date()
        let startDate = ''
        const endDate = now.toISOString().split('T')[0]

        switch (datePreset) {
            case 'today': startDate = endDate; break
            case '7d': startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; break
            case '30d': startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; break
            case 'month': startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]; break
            case 'year': startDate = `${now.getFullYear()}-01-01`; break
            default: return { startDate: '', endDate: '' }
        }
        return { startDate, endDate }
    }, [datePreset])

    const loadStats = useCallback(async () => {
        setLoading(true)
        try {
            const { startDate, endDate } = getDateRange()
            const params = new URLSearchParams()
            if (startDate) params.set('startDate', startDate)
            if (endDate) params.set('endDate', endDate)

            const res = await fetch(`/api/admin/dashboard/stats?${params}`)
            const data = await res.json()
            if (data.success) {
                setStats(data.data.stats)
                setRecentLeads(data.data.recentLeads || [])
                setRecentMedia(data.data.recentMedia || [])
            }
        } catch (error) {
            console.error('Error loading stats:', error)
        } finally {
            setLoading(false)
        }
    }, [getDateRange])

    useEffect(() => {
        loadStats()
    }, [loadStats])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('dashboardTiles', JSON.stringify(visibleTiles))
        }
    }, [visibleTiles])

    const toggleTile = (tileId: string) => {
        setVisibleTiles(prev =>
            prev.includes(tileId)
                ? prev.filter(id => id !== tileId)
                : [...prev, tileId]
        )
    }

    const formatCurrency = (amount: number) => `${amount.toLocaleString('fr-FR')}€`
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const hours = Math.floor(diff / (1000 * 60 * 60))
        if (hours < 1) return 'À l\'instant'
        if (hours < 24) return `Il y a ${hours}h`
        const days = Math.floor(hours / 24)
        if (days < 7) return `Il y a ${days}j`
        return date.toLocaleDateString('fr-FR')
    }

    const getTileData = (tileId: string) => {
        if (!stats) return { value: '-', change: null }
        switch (tileId) {
            case 'leadsMonth': return { value: stats.leadsThisMonth.toString(), change: stats.leadsChange, trend: stats.leadsChange >= 0 ? 'up' : 'down' }
            case 'totalLeads': return { value: stats.totalLeads.toString(), change: null }
            case 'conversion': return { value: stats.conversionRate, change: null }
            case 'caOneShot': return { value: formatCurrency(stats.totalOneShot), change: null }
            case 'caRecurrent': return { value: `${formatCurrency(stats.totalMonthly)}/m`, change: null }
            case 'articles': return { value: stats.publishedArticles.toString(), change: null }
            case 'projects': return { value: stats.projects.toString(), change: null }
            case 'media': return { value: stats.media.toString(), change: null }
            case 'visitorsToday': return { value: (stats.visitorsToday || 0).toString(), change: null }
            case 'pageViews': return { value: (stats.pageViewsToday || 0).toString(), change: null }
            case 'bounceRate': return { value: '-', change: null }
            default: return { value: '-', change: null }
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        )
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Vue d&apos;ensemble de vos performances</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <select
                            value={datePreset}
                            onChange={(e) => setDatePreset(e.target.value)}
                            className="px-3 py-2 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            {datePresets.map(p => (
                                <option key={p.value} value={p.value}>{p.label}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${showSettings ? 'bg-primary text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                    >
                        <Settings className="w-4 h-4" />
                        Personnaliser
                    </button>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-5 mb-8">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Tuiles à afficher</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {availableTiles.map(tile => (
                            <button
                                key={tile.id}
                                onClick={() => toggleTile(tile.id)}
                                className={`flex items-center gap-2.5 p-2.5 rounded-xl transition-colors text-sm ${visibleTiles.includes(tile.id)
                                    ? 'bg-primary/10 text-primary border border-primary/30'
                                    : 'bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10'
                                    }`}
                            >
                                <tile.icon className="w-4 h-4" />
                                <span>{tile.label}</span>
                                {visibleTiles.includes(tile.id) && <Check className="w-3.5 h-3.5 ml-auto" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
                {availableTiles
                    .filter(tile => visibleTiles.includes(tile.id))
                    .map((tile) => {
                        const data = getTileData(tile.id)
                        return (
                            <div key={tile.id} className="bg-white dark:bg-[#111] rounded-2xl p-5 border border-gray-200 dark:border-white/10">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <tile.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    {data.change !== null && (
                                        <div className={`flex items-center gap-0.5 text-xs font-medium ${data.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                            {data.change > 0 ? '+' : ''}{data.change}%
                                            {data.change >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                                        </div>
                                    )}
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-0.5">{data.value}</div>
                                <div className="text-gray-500 dark:text-gray-400 text-xs">{tile.label}</div>
                            </div>
                        )
                    })}
            </div>

            {/* Contenu en 2 colonnes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Leads récents */}
                <div className="lg:col-span-2 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Leads récents</h2>
                        <Link href="/admin/leads" className="text-primary hover:underline text-xs font-medium">Voir tout →</Link>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-white/10">
                        {recentLeads.length === 0 ? (
                            <div className="p-8 text-center text-gray-400 text-sm">Aucun lead</div>
                        ) : (
                            recentLeads.map((lead) => (
                                <div key={lead.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                                            {(lead.parsedData?.nom || lead.parsedData?.name || lead.email || '?').charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="text-gray-900 dark:text-white font-medium text-sm">{lead.parsedData?.nom || lead.parsedData?.name || lead.email}</div>
                                            <div className="text-gray-400 text-xs">{lead.email}</div>
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center gap-3">
                                        <span className="text-gray-400 text-xs">{formatDate(lead.createdAt)}</span>
                                        <div className="flex gap-1">
                                            {lead.email && (
                                                <a href={`mailto:${lead.email}`} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                                    <Mail className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                            {lead.phone && (
                                                <a href={`tel:${lead.phone}`} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                                    <Phone className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Sidebar: Médias récents */}
                <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Médias récents</h2>
                        <Link href="/admin/media" className="text-primary hover:underline text-xs font-medium">Voir tout →</Link>
                    </div>
                    <div className="p-4">
                        {recentMedia.length === 0 ? (
                            <div className="text-center text-gray-400 py-8 text-sm">Aucun média</div>
                        ) : (
                            <div className="grid grid-cols-3 gap-2">
                                {recentMedia.map((media: any) => (
                                    <div key={media.id} className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-white/5">
                                        <img src={media.url} alt={media.alt || media.filename} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
