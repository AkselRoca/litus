'use client'

import { useState, useEffect } from 'react'
import {
    Users, Eye, Clock, TrendingUp, TrendingDown, Globe,
    Smartphone, Monitor, ArrowUpRight, ArrowDownRight,
    Activity, Zap, LayoutGrid, MousePointer, Loader2, AlertCircle, RefreshCw
} from 'lucide-react'

interface AnalyticsData {
    visitors: { total: number; change: number }
    pageViews: { total: number }
    dailyVisitors: { day: string; visitors: number }[]
    topPages: { path: string; views: number; title: string }[]
    sources: { name: string; value: number; color: string }[]
    devices: { name: string; value: number }[]
    metrics: { bounceRate: number | null; avgDuration: string | null; pagesPerSession: number | null }
    webVitals?: {
        LCP: { value: number; rating: string } | null
        FID: { value: number; rating: string } | null
        CLS: { value: number; rating: string } | null
        TTFB: { value: number; rating: string } | null
        FCP: { value: number; rating: string } | null
    }
}

interface APIResponse {
    success: boolean
    source: 'database' | 'mock' | 'error'
    message?: string
    data: AnalyticsData
}

const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    subtitle
}: {
    title: string
    value: string | number
    change?: number
    icon: any
    subtitle?: string
}) => (
    <div className="bg-gray-900 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
        <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
            </div>
            {change !== undefined && change !== 0 && (
                <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {change > 0 ? '+' : ''}{change}%
                    {change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
            )}
        </div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-gray-400 text-sm">{title}</div>
        {subtitle && <div className="text-gray-500 text-xs mt-1">{subtitle}</div>}
    </div>
)

const WebVitalBadge = ({ label, value, unit, status }: { label: string; value: number; unit: string; status: string }) => {
    const statusColors = {
        good: 'bg-green-500/20 text-green-400 border-green-500/50',
        'needs-improvement': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
        poor: 'bg-red-500/20 text-red-400 border-red-500/50',
    }

    return (
        <div className={`rounded-xl p-4 border ${statusColors[status as keyof typeof statusColors]}`}>
            <div className="text-xs font-medium mb-2 opacity-80">{label}</div>
            <div className="text-2xl font-bold">{value}<span className="text-sm font-normal ml-1">{unit}</span></div>
            <div className="text-xs mt-1 capitalize">{status === 'good' ? '✓ Bon' : status === 'needs-improvement' ? '⚠ À améliorer' : '✗ Mauvais'}</div>
        </div>
    )
}

const MiniBarChart = ({ data }: { data: { day: string; visitors: number }[] }) => {
    const max = Math.max(...data.map(d => d.visitors), 1)

    return (
        <div className="flex items-end justify-between gap-2 h-32">
            {data.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                        className="w-full bg-gradient-to-t from-primary to-orange-400 rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${(item.visitors / max) * 100}%`, minHeight: item.visitors > 0 ? '4px' : '0' }}
                    />
                    <span className="text-xs text-gray-500">{item.day}</span>
                </div>
            ))}
        </div>
    )
}

const deviceIcons: Record<string, any> = {
    'Mobile': Smartphone,
    'Desktop': Monitor,
    'Tablet': LayoutGrid,
}

export default function AdminAnalyticsPage() {
    const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d')
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [source, setSource] = useState<'database' | 'mock' | 'error'>('mock')
    const [message, setMessage] = useState<string | null>(null)

    const fetchAnalytics = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`/api/admin/analytics?period=${timeRange}`)
            const result: APIResponse = await res.json()

            if (result.success) {
                setData(result.data)
                setSource(result.source)
                setMessage(result.message || null)
            } else {
                setError('Erreur lors du chargement des données')
                setData(result.data) // Use fallback mock data
            }
        } catch (err) {
            setError('Erreur de connexion')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAnalytics()
    }, [timeRange])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-gray-400">Chargement des analytics...</p>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <AlertCircle className="w-12 h-12 text-red-400" />
                <p className="text-gray-400">{error || 'Aucune donnée disponible'}</p>
                <button onClick={fetchAnalytics} className="text-primary hover:underline">
                    Réessayer
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
                    <p className="text-gray-400">Statistiques de visites et performance</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Refresh button */}
                    <button
                        onClick={fetchAnalytics}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Rafraîchir"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>

                    {/* Time Range Selector */}
                    <div className="flex bg-gray-900 rounded-xl p-1 border border-white/10">
                        {(['24h', '7d', '30d'] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeRange === range
                                    ? 'bg-primary text-white'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {range === '24h' ? "24h" : range === '7d' ? '7 jours' : '30 jours'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Source indicator */}
            {source === 'mock' && message && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-yellow-400 text-sm font-medium">Données de démonstration</p>
                        <p className="text-gray-400 text-sm">{message}</p>
                        <p className="text-gray-500 text-xs mt-2">
                            Pour activer les vraies données, ajoutez <code className="bg-white/10 px-1 rounded">VERCEL_API_TOKEN</code> et <code className="bg-white/10 px-1 rounded">VERCEL_PROJECT_ID</code> dans vos variables d'environnement Vercel.
                        </p>
                    </div>
                </div>
            )}

            {source === 'database' && (
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-primary animate-pulse" />
                        <div className="flex-1">
                            <p className="text-primary text-sm font-medium">Tracking actif - Donnees collectees</p>
                            <p className="text-gray-400 text-xs mt-1">
                                Visite le site depuis un autre navigateur pour voir les stats augmenter.
                            </p>
                        </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-gray-400 text-xs mb-2">Prompt IA pour Google Analytics (une fois le domaine configure) :</p>
                        <div className="bg-gray-800 rounded-lg p-3 text-xs font-mono text-gray-300 overflow-x-auto">
                            Ajoute Google Analytics 4 au site litus.fr avec le Measurement ID [GA_MEASUREMENT_ID]. Configure le tracking des evenements : soumission formulaire contact, clics CTA, scroll profondeur. Integre les donnees bounce rate et session duration dans l&apos;onglet analytics de l&apos;admin.
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Users}
                    title="Visiteurs"
                    value={data.visitors.total.toLocaleString()}
                    change={data.visitors.change}
                />
                <StatCard
                    icon={Eye}
                    title="Pages vues"
                    value={data.pageViews.total.toLocaleString()}
                />
                <StatCard
                    icon={TrendingUp}
                    title="Pages / session"
                    value={data.metrics.pagesPerSession !== null ? data.metrics.pagesPerSession.toFixed(1) : 'N/A'}
                    subtitle="moyenne"
                />
                <StatCard
                    icon={Activity}
                    title="Taux engagement"
                    value={data.visitors.total > 0 ? `${Math.round((data.pageViews.total / data.visitors.total) * 100)}%` : 'N/A'}
                    subtitle="pages vues / visiteurs"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bar Chart - Visiteurs par jour */}
                <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-6">Visiteurs - 7 derniers jours</h3>
                    <MiniBarChart data={data.dailyVisitors} />
                </div>

                {/* Sources de trafic */}
                <div className="bg-gray-900 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-6">Sources de trafic</h3>
                    {data.sources.length > 0 ? (
                        <>
                            <div className="space-y-4">
                                {data.sources.map((source) => (
                                    <div key={source.name} className="flex items-center gap-3">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: source.color }}
                                        />
                                        <span className="text-gray-300 flex-1">{source.name}</span>
                                        <span className="text-white font-medium">{source.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 space-y-2">
                                {data.sources.map((source) => {
                                    const total = data.sources.reduce((acc, s) => acc + s.value, 0)
                                    const percent = total > 0 ? (source.value / total) * 100 : 0
                                    return (
                                        <div key={source.name} className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all"
                                                style={{ width: `${percent}%`, backgroundColor: source.color }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500 text-center py-8">Aucune donnée</p>
                    )}
                </div>
            </div>

            {/* Web Vitals & Devices */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Core Web Vitals */}
                <div className="bg-gray-900 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Core Web Vitals</h3>
                            <p className="text-sm text-gray-400">Performance du site</p>
                        </div>
                    </div>
                    {data.webVitals && (data.webVitals.LCP || data.webVitals.FID || data.webVitals.CLS) ? (
                        <div className="grid grid-cols-3 gap-4">
                            {data.webVitals.LCP && (
                                <div className={`rounded-xl p-4 ${data.webVitals.LCP.rating === 'good' ? 'bg-green-500/10 border border-green-500/30' :
                                        data.webVitals.LCP.rating === 'poor' ? 'bg-red-500/10 border border-red-500/30' :
                                            'bg-yellow-500/10 border border-yellow-500/30'
                                    }`}>
                                    <p className="text-xs text-gray-400 mb-1">LCP</p>
                                    <p className={`text-2xl font-bold ${data.webVitals.LCP.rating === 'good' ? 'text-green-400' :
                                            data.webVitals.LCP.rating === 'poor' ? 'text-red-400' : 'text-yellow-400'
                                        }`}>{(data.webVitals.LCP.value / 1000).toFixed(1)}s</p>
                                    <p className={`text-xs ${data.webVitals.LCP.rating === 'good' ? 'text-green-500' :
                                            data.webVitals.LCP.rating === 'poor' ? 'text-red-500' : 'text-yellow-500'
                                        }`}>✓ {data.webVitals.LCP.rating === 'good' ? 'Bon' : data.webVitals.LCP.rating === 'poor' ? 'Mauvais' : 'A ameliorer'}</p>
                                </div>
                            )}
                            {data.webVitals.FID && (
                                <div className={`rounded-xl p-4 ${data.webVitals.FID.rating === 'good' ? 'bg-green-500/10 border border-green-500/30' :
                                        data.webVitals.FID.rating === 'poor' ? 'bg-red-500/10 border border-red-500/30' :
                                            'bg-yellow-500/10 border border-yellow-500/30'
                                    }`}>
                                    <p className="text-xs text-gray-400 mb-1">FID</p>
                                    <p className={`text-2xl font-bold ${data.webVitals.FID.rating === 'good' ? 'text-green-400' :
                                            data.webVitals.FID.rating === 'poor' ? 'text-red-400' : 'text-yellow-400'
                                        }`}>{Math.round(data.webVitals.FID.value)}ms</p>
                                    <p className={`text-xs ${data.webVitals.FID.rating === 'good' ? 'text-green-500' :
                                            data.webVitals.FID.rating === 'poor' ? 'text-red-500' : 'text-yellow-500'
                                        }`}>✓ {data.webVitals.FID.rating === 'good' ? 'Bon' : data.webVitals.FID.rating === 'poor' ? 'Mauvais' : 'A ameliorer'}</p>
                                </div>
                            )}
                            {data.webVitals.CLS && (
                                <div className={`rounded-xl p-4 ${data.webVitals.CLS.rating === 'good' ? 'bg-green-500/10 border border-green-500/30' :
                                        data.webVitals.CLS.rating === 'poor' ? 'bg-red-500/10 border border-red-500/30' :
                                            'bg-yellow-500/10 border border-yellow-500/30'
                                    }`}>
                                    <p className="text-xs text-gray-400 mb-1">CLS</p>
                                    <p className={`text-2xl font-bold ${data.webVitals.CLS.rating === 'good' ? 'text-green-400' :
                                            data.webVitals.CLS.rating === 'poor' ? 'text-red-400' : 'text-yellow-400'
                                        }`}>{data.webVitals.CLS.value.toFixed(3)}</p>
                                    <p className={`text-xs ${data.webVitals.CLS.rating === 'good' ? 'text-green-500' :
                                            data.webVitals.CLS.rating === 'poor' ? 'text-red-500' : 'text-yellow-500'
                                        }`}>✓ {data.webVitals.CLS.rating === 'good' ? 'Bon' : data.webVitals.CLS.rating === 'poor' ? 'Mauvais' : 'A ameliorer'}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-gray-800 rounded-xl p-4 text-center">
                            <p className="text-gray-400 text-sm mb-2">
                                Pas encore de donnees Web Vitals.
                            </p>
                            <p className="text-gray-500 text-xs">
                                Les metriques apparaitront apres quelques visites reelles sur le site.
                            </p>
                        </div>
                    )}
                    <p className="text-xs text-gray-500 mt-4">
                        * Donnees collectees automatiquement sur les visiteurs reels.
                    </p>
                </div>

                {/* Devices */}
                <div className="bg-gray-900 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Appareils</h3>
                            <p className="text-sm text-gray-400">Répartition des visiteurs</p>
                        </div>
                    </div>
                    {data.devices.length > 0 ? (
                        <div className="space-y-4">
                            {data.devices.map((device) => {
                                const Icon = deviceIcons[device.name] || Monitor
                                const total = data.devices.reduce((acc, d) => acc + d.value, 0)
                                const percent = total > 0 ? Math.round((device.value / total) * 100) : 0
                                return (
                                    <div key={device.name} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-300">{device.name}</span>
                                                <span className="text-white font-medium">{percent}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full"
                                                    style={{ width: `${percent}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">Aucune donnée</p>
                    )}
                </div>
            </div>

            {/* Top Pages */}
            <div className="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h3 className="text-lg font-semibold text-white">Pages les plus visitées</h3>
                </div>
                {data.topPages.length > 0 ? (
                    <div className="divide-y divide-white/10">
                        {data.topPages.map((page, i) => (
                            <div key={page.path} className="p-4 flex items-center hover:bg-white/5 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold mr-4">
                                    {i + 1}
                                </div>
                                <div className="flex-1">
                                    <div className="text-white font-medium">{page.title || page.path}</div>
                                    <div className="text-gray-500 text-sm">{page.path}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-white font-medium">{page.views.toLocaleString()}</div>
                                    <div className="text-gray-500 text-sm">vues</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500">Aucune donnée de pages</div>
                )}
            </div>
        </div>
    )
}
