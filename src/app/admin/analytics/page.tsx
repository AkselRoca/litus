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
    <div className="bg-white dark:bg-[#111] rounded-2xl p-5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-colors">
        <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            {change !== undefined && change !== 0 && (
                <div className={`flex items-center gap-0.5 text-xs font-medium ${change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                    {change > 0 ? '+' : ''}{change}%
                    {change >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                </div>
            )}
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-0.5">{value}</div>
        <div className="text-gray-500 dark:text-gray-400 text-xs">{title}</div>
        {subtitle && <div className="text-gray-400 dark:text-gray-500 text-[11px] mt-1">{subtitle}</div>}
    </div>
)

const WebVitalBadge = ({ label, value, unit, status }: { label: string; value: number; unit: string; status: string }) => {
    const statusColors = {
        good: 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30',
        'needs-improvement': 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30',
        poor: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/30',
    }

    return (
        <div className={`rounded-xl p-4 border ${statusColors[status as keyof typeof statusColors]}`}>
            <div className="text-xs font-medium mb-1 opacity-80">{label}</div>
            <div className="text-2xl font-bold">{value}<span className="text-sm font-normal ml-1">{unit}</span></div>
            <div className="text-xs mt-1 font-medium capitalize flex items-center gap-1">
                {status === 'good' ? '✓ Bon' : status === 'needs-improvement' ? '⚠ À améliorer' : '✗ Mauvais'}
            </div>
        </div>
    )
}

const MiniBarChart = ({ data }: { data: { day: string; visitors: number }[] }) => {
    const max = Math.max(...data.map(d => d.visitors), 1)

    return (
        <div className="flex items-end justify-between gap-2 h-40">
            {data.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        {item.visitors} visiteurs
                    </div>
                    <div
                        className="w-full bg-primary/80 group-hover:bg-primary rounded-t-lg transition-all"
                        style={{ height: `${(item.visitors / max) * 100}%`, minHeight: item.visitors > 0 ? '4px' : '0' }}
                    />
                    <span className="text-[11px] text-gray-500">{item.day}</span>
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
            <div className="flex flex-col items-center justify-center h-64 gap-3">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">Chargement des analytics...</p>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
                <AlertCircle className="w-10 h-10 text-red-500" />
                <p className="text-gray-600 dark:text-gray-400 text-sm">{error || 'Aucune donnée disponible'}</p>
                <button onClick={fetchAnalytics} className="text-primary hover:underline text-sm font-medium">
                    Réessayer
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Analytics</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Statistiques de visites et performance</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchAnalytics}
                        className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                        title="Rafraîchir"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>

                    <div className="flex bg-white dark:bg-[#111] rounded-xl p-1 border border-gray-200 dark:border-white/10 shadow-sm">
                        {(['24h', '7d', '30d'] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${timeRange === range
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
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
                <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-2xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-yellow-800 dark:text-yellow-400 text-sm font-semibold">Données de démonstration</p>
                        <p className="text-yellow-700 dark:text-yellow-500/80 text-sm mt-0.5">{message}</p>
                        <p className="text-yellow-600/80 dark:text-yellow-500/60 text-xs mt-2 font-medium">
                            Pour activer les vraies données, ajoutez <code className="bg-white/50 dark:bg-black/20 px-1 py-0.5 rounded text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-500/20">VERCEL_API_TOKEN</code> et <code className="bg-white/50 dark:bg-black/20 px-1 py-0.5 rounded text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-500/20">VERCEL_PROJECT_ID</code>.
                        </p>
                    </div>
                </div>
            )}

            {source === 'database' && (
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-primary animate-pulse" />
                        <div className="flex-1">
                            <p className="text-primary text-sm font-semibold">Tracking actif</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">
                                Données collectées depuis la base de données.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={Users}
                    title="Visiteurs uniques"
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
                    subtitle="pages vues / visiteurs uniques"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bar Chart - Visiteurs par jour */}
                <div className="lg:col-span-2 bg-white dark:bg-[#111] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-6">Visiteurs - {timeRange === '24h' ? '24h' : timeRange === '7d' ? '7 derniers jours' : '30 derniers jours'}</h3>
                    <MiniBarChart data={data.dailyVisitors} />
                </div>

                {/* Sources de trafic */}
                <div className="bg-white dark:bg-[#111] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-6">Sources de trafic</h3>
                    {data.sources.length > 0 ? (
                        <>
                            <div className="space-y-4">
                                {data.sources.map((source) => (
                                    <div key={source.name} className="flex items-center gap-3">
                                        <div
                                            className="w-2.5 h-2.5 rounded-full"
                                            style={{ backgroundColor: source.color }}
                                        />
                                        <span className="text-gray-600 dark:text-gray-300 text-sm flex-1">{source.name}</span>
                                        <span className="text-gray-900 dark:text-white text-sm font-semibold">{source.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 flex h-1.5 rounded-full overflow-hidden bg-gray-100 dark:bg-white/5">
                                {data.sources.map((source) => {
                                    const total = data.sources.reduce((acc, s) => acc + s.value, 0)
                                    const percent = total > 0 ? (source.value / total) * 100 : 0
                                    return (
                                        <div
                                            key={source.name}
                                            className="h-full transition-all"
                                            style={{ width: `${percent}%`, backgroundColor: source.color }}
                                        />
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-400 dark:text-gray-500 text-center py-8 text-sm">Aucune donnée</p>
                    )}
                </div>
            </div>

            {/* Web Vitals & Devices */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Core Web Vitals */}
                <div className="bg-white dark:bg-[#111] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Core Web Vitals</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Performance du site</p>
                        </div>
                    </div>
                    {data.webVitals && (data.webVitals.LCP || data.webVitals.FID || data.webVitals.CLS) ? (
                        <div className="grid grid-cols-3 gap-3">
                            {data.webVitals.LCP && (
                                <WebVitalBadge label="LCP" value={parseFloat((data.webVitals.LCP.value / 1000).toFixed(1))} unit="s" status={data.webVitals.LCP.rating} />
                            )}
                            {data.webVitals.FID && (
                                <WebVitalBadge label="FID" value={Math.round(data.webVitals.FID.value)} unit="ms" status={data.webVitals.FID.rating} />
                            )}
                            {data.webVitals.CLS && (
                                <WebVitalBadge label="CLS" value={parseFloat(data.webVitals.CLS.value.toFixed(3))} unit="" status={data.webVitals.CLS.rating} />
                            )}
                        </div>
                    ) : (
                        <div className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/5 rounded-xl p-6 text-center">
                            <p className="text-gray-900 dark:text-gray-300 text-sm font-medium mb-1">
                                Pas encore de web vitals.
                            </p>
                            <p className="text-gray-500 text-xs">
                                Les métriques apparaîtront après quelques visites.
                            </p>
                        </div>
                    )}
                </div>

                {/* Devices */}
                <div className="bg-white dark:bg-[#111] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Appareils</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Répartition des visiteurs</p>
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
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/5">
                                            <Icon className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between text-sm mb-1.5">
                                                <span className="text-gray-700 dark:text-gray-300 font-medium">{device.name}</span>
                                                <span className="text-gray-900 dark:text-white font-semibold">{percent}%</span>
                                            </div>
                                            <div className="h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full transition-all"
                                                    style={{ width: `${percent}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-400 dark:text-gray-500 text-center py-8 text-sm">Aucune donnée</p>
                    )}
                </div>
            </div>

            {/* Top Pages */}
            <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-white/10">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Pages les plus visitées</h3>
                </div>
                {data.topPages.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-white/10">
                        {data.topPages.map((page, i) => (
                            <div key={page.path} className="px-6 py-3 flex items-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 font-semibold text-xs mr-4">
                                    {i + 1}
                                </div>
                                <div className="flex-1 min-w-0 pr-4">
                                    <div className="text-gray-900 dark:text-white font-medium text-sm truncate">{page.title || page.path}</div>
                                    <div className="text-gray-500 dark:text-gray-400 text-xs truncate mt-0.5">{page.path}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray-900 dark:text-white font-semibold text-sm">{page.views.toLocaleString()}</div>
                                    <div className="text-gray-400 text-[11px] font-medium uppercase mt-0.5">vues</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500 text-sm">Aucune donnée de pages</div>
                )}
            </div>
        </div>
    )
}
