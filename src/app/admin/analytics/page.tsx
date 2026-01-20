'use client'

import { useState } from 'react'
import {
    Users, Eye, Clock, TrendingUp, TrendingDown, Globe,
    Smartphone, Monitor, ArrowUpRight, ArrowDownRight,
    Activity, Zap, LayoutGrid, MousePointer
} from 'lucide-react'

// Mock data pour demo - sera remplacé par vraies données Vercel Analytics
const mockAnalyticsData = {
    visitors: {
        today: 47,
        todayChange: 12,
        week: 312,
        weekChange: 8,
        month: 1247,
        monthChange: 15,
    },
    pageViews: {
        today: 156,
        week: 892,
        month: 3456,
    },
    metrics: {
        bounceRate: 42,
        avgDuration: '2m 34s',
        pagesPerSession: 2.8,
    },
    webVitals: {
        lcp: { value: 1.8, status: 'good' }, // Largest Contentful Paint
        fid: { value: 45, status: 'good' },  // First Input Delay
        cls: { value: 0.05, status: 'good' }, // Cumulative Layout Shift
    },
    topPages: [
        { path: '/', views: 456, title: 'Accueil' },
        { path: '/services', views: 234, title: 'Services' },
        { path: '/contact', views: 189, title: 'Contact' },
        { path: '/blog', views: 156, title: 'Blog' },
        { path: '/realisations', views: 134, title: 'Réalisations' },
        { path: '/estimateur', views: 98, title: 'Estimateur' },
    ],
    sources: [
        { name: 'Direct', value: 45, color: '#f97316' },
        { name: 'Google', value: 32, color: '#3b82f6' },
        { name: 'Réseaux sociaux', value: 15, color: '#8b5cf6' },
        { name: 'Referral', value: 8, color: '#10b981' },
    ],
    devices: [
        { name: 'Mobile', value: 58, icon: Smartphone },
        { name: 'Desktop', value: 38, icon: Monitor },
        { name: 'Tablette', value: 4, icon: LayoutGrid },
    ],
    // Données pour le graphique des 7 derniers jours
    dailyVisitors: [
        { day: 'Lun', visitors: 42 },
        { day: 'Mar', visitors: 38 },
        { day: 'Mer', visitors: 56 },
        { day: 'Jeu', visitors: 48 },
        { day: 'Ven', visitors: 62 },
        { day: 'Sam', visitors: 35 },
        { day: 'Dim', visitors: 31 },
    ],
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
            {change !== undefined && (
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
    const max = Math.max(...data.map(d => d.visitors))

    return (
        <div className="flex items-end justify-between gap-2 h-32">
            {data.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                        className="w-full bg-gradient-to-t from-primary to-orange-400 rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${(item.visitors / max) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500">{item.day}</span>
                </div>
            ))}
        </div>
    )
}

export default function AdminAnalyticsPage() {
    const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('week')
    const data = mockAnalyticsData

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
                    <p className="text-gray-400">Statistiques de visites et performance</p>
                </div>

                {/* Time Range Selector */}
                <div className="flex bg-gray-900 rounded-xl p-1 border border-white/10">
                    {(['today', 'week', 'month'] as const).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeRange === range
                                    ? 'bg-primary text-white'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {range === 'today' ? "Aujourd'hui" : range === 'week' ? '7 jours' : '30 jours'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Users}
                    title="Visiteurs"
                    value={data.visitors[timeRange === 'today' ? 'today' : timeRange === 'week' ? 'week' : 'month']}
                    change={data.visitors[`${timeRange === 'today' ? 'today' : timeRange === 'week' ? 'week' : 'month'}Change` as keyof typeof data.visitors] as number}
                />
                <StatCard
                    icon={Eye}
                    title="Pages vues"
                    value={data.pageViews[timeRange === 'today' ? 'today' : timeRange === 'week' ? 'week' : 'month']}
                />
                <StatCard
                    icon={Clock}
                    title="Durée moyenne"
                    value={data.metrics.avgDuration}
                    subtitle="par session"
                />
                <StatCard
                    icon={MousePointer}
                    title="Taux de rebond"
                    value={`${data.metrics.bounceRate}%`}
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
                    <div className="space-y-4">
                        {data.sources.map((source) => (
                            <div key={source.name} className="flex items-center gap-3">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: source.color }}
                                />
                                <span className="text-gray-300 flex-1">{source.name}</span>
                                <span className="text-white font-medium">{source.value}%</span>
                            </div>
                        ))}
                    </div>
                    {/* Progress bars */}
                    <div className="mt-6 space-y-2">
                        {data.sources.map((source) => (
                            <div key={source.name} className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{ width: `${source.value}%`, backgroundColor: source.color }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Web Vitals & Top Pages */}
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
                    <div className="grid grid-cols-3 gap-4">
                        <WebVitalBadge
                            label="LCP"
                            value={data.webVitals.lcp.value}
                            unit="s"
                            status={data.webVitals.lcp.status}
                        />
                        <WebVitalBadge
                            label="FID"
                            value={data.webVitals.fid.value}
                            unit="ms"
                            status={data.webVitals.fid.status}
                        />
                        <WebVitalBadge
                            label="CLS"
                            value={data.webVitals.cls.value}
                            unit=""
                            status={data.webVitals.cls.status}
                        />
                    </div>
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
                    <div className="space-y-4">
                        {data.devices.map((device) => (
                            <div key={device.name} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                    <device.icon className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-300">{device.name}</span>
                                        <span className="text-white font-medium">{device.value}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full"
                                            style={{ width: `${device.value}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Pages */}
            <div className="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h3 className="text-lg font-semibold text-white">Pages les plus visitées</h3>
                </div>
                <div className="divide-y divide-white/10">
                    {data.topPages.map((page, i) => (
                        <div key={page.path} className="p-4 flex items-center hover:bg-white/5 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold mr-4">
                                {i + 1}
                            </div>
                            <div className="flex-1">
                                <div className="text-white font-medium">{page.title}</div>
                                <div className="text-gray-500 text-sm">{page.path}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-white font-medium">{page.views.toLocaleString()}</div>
                                <div className="text-gray-500 text-sm">vues</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Notice */}
            <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-white font-medium mb-1">Données de démonstration</h4>
                        <p className="text-gray-400 text-sm">
                            Ces statistiques sont des données fictives pour la démo.
                            Les vraies données Vercel Analytics seront visibles dans le dashboard Vercel
                            une fois le site en production.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
