'use client'

import { useState, useEffect } from 'react'
import { Users, FileText, TrendingUp, Euro, Clock, Image, Briefcase, ArrowUpRight, ArrowDownRight, Settings, Check, Loader2, Mail, Phone } from 'lucide-react'
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
}

interface Lead {
    id: string
    email: string | null
    phone: string | null
    status: string
    createdAt: string
    parsedData: { nom?: string; name?: string }
}

// Tuiles disponibles
const availableTiles = [
    { id: 'leadsMonth', label: 'Leads ce mois', icon: Users, category: 'leads' },
    { id: 'totalLeads', label: 'Leads total', icon: Users, category: 'leads' },
    { id: 'conversion', label: 'Taux de conversion', icon: TrendingUp, category: 'leads' },
    { id: 'caOneShot', label: 'CA One-shot', icon: Euro, category: 'finance' },
    { id: 'caRecurrent', label: 'CA Récurrent', icon: Clock, category: 'finance' },
    { id: 'articles', label: 'Articles publiés', icon: FileText, category: 'content' },
    { id: 'projects', label: 'Projets portfolio', icon: Briefcase, category: 'content' },
    { id: 'media', label: 'Médias', icon: Image, category: 'content' },
]

const defaultVisibleTiles = ['leadsMonth', 'totalLeads', 'conversion', 'caOneShot', 'caRecurrent', 'articles']

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

    useEffect(() => {
        loadStats()
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('dashboardTiles', JSON.stringify(visibleTiles))
        }
    }, [visibleTiles])

    const loadStats = async () => {
        try {
            const res = await fetch('/api/admin/dashboard/stats')
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
    }

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
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400">Vue d'ensemble de vos performances</p>
                </div>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${showSettings ? 'bg-primary text-white' : 'text-gray-400 hover:text-white border border-white/20 hover:bg-white/10'}`}
                >
                    <Settings className="w-5 h-5" />
                    Personnaliser
                </button>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className="bg-gray-900 rounded-2xl border border-white/10 p-6 mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Tuiles à afficher</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {availableTiles.map(tile => (
                            <button
                                key={tile.id}
                                onClick={() => toggleTile(tile.id)}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${visibleTiles.includes(tile.id)
                                        ? 'bg-primary/20 text-primary border border-primary/50'
                                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                <tile.icon className="w-5 h-5" />
                                <span className="text-sm">{tile.label}</span>
                                {visibleTiles.includes(tile.id) && <Check className="w-4 h-4 ml-auto" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {availableTiles
                    .filter(tile => visibleTiles.includes(tile.id))
                    .map((tile) => {
                        const data = getTileData(tile.id)
                        return (
                            <div key={tile.id} className="bg-gray-900 rounded-2xl p-6 border border-white/10">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                        <tile.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    {data.change !== null && (
                                        <div className={`flex items-center gap-1 text-sm ${data.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {data.change > 0 ? '+' : ''}{data.change}%
                                            {data.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                        </div>
                                    )}
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{data.value}</div>
                                <div className="text-gray-400 text-sm">{tile.label}</div>
                            </div>
                        )
                    })}
            </div>

            {/* Contenu en 2 colonnes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Leads récents */}
                <div className="lg:col-span-2 bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Leads récents</h2>
                        <Link href="/admin/leads" className="text-primary hover:underline text-sm">Voir tout →</Link>
                    </div>
                    <div className="divide-y divide-white/10">
                        {recentLeads.length === 0 ? (
                            <div className="p-6 text-center text-gray-400">Aucun lead</div>
                        ) : (
                            recentLeads.map((lead) => (
                                <div key={lead.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white font-bold">
                                            {(lead.parsedData?.nom || lead.parsedData?.name || lead.email || '?').charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="text-white font-medium">{lead.parsedData?.nom || lead.parsedData?.name || lead.email}</div>
                                            <div className="text-gray-400 text-sm">{lead.email}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-gray-500 text-xs">{formatDate(lead.createdAt)}</div>
                                        <div className="flex gap-2 mt-1">
                                            {lead.email && (
                                                <a href={`mailto:${lead.email}`} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                                    <Mail className="w-4 h-4" />
                                                </a>
                                            )}
                                            {lead.phone && (
                                                <a href={`tel:${lead.phone}`} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                                    <Phone className="w-4 h-4" />
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
                <div className="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-white">Médias récents</h2>
                        <Link href="/admin/media" className="text-primary hover:underline text-sm">Voir tout →</Link>
                    </div>
                    <div className="p-4">
                        {recentMedia.length === 0 ? (
                            <div className="text-center text-gray-400 py-6">Aucun média</div>
                        ) : (
                            <div className="grid grid-cols-3 gap-2">
                                {recentMedia.map((media: any) => (
                                    <div key={media.id} className="aspect-square rounded-lg overflow-hidden bg-gray-800">
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
