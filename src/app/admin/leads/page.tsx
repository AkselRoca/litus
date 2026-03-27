'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Mail, Phone, Calendar, Download, Trash2, Loader2, X, Edit3, Save, Euro, Clock, CheckSquare, Square, ChevronDown } from 'lucide-react'

interface Lead {
    id: string
    type: string
    email: string | null
    phone: string | null
    source: string
    status: string
    oneShot: number | null
    monthlyAmount: number | null
    contractMonths: number | null
    notes: string | null
    createdAt: string
    parsedData: {
        nom?: string
        name?: string
        entreprise?: string
        company?: string
        service?: string
        budget?: string
        message?: string
    }
}

interface Stats {
    total: number
    new: number
    contacted: number
    quote_sent: number
    signed: number
    refused: number
    totalOneShot: number
    totalMonthly: number
}

const crmStatuses = [
    { value: 'new', label: 'Nouveau', color: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-400/20' },
    { value: 'contacted', label: 'Contacté', color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-400/20' },
    { value: 'quote_sent', label: 'Devis envoyé', color: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-400/20' },
    { value: 'signed', label: 'Signé', color: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-400/20' },
    { value: 'refused', label: 'Refusé', color: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-400/20' },
]

const datePresets = [
    { label: '7 derniers jours', value: '7d' },
    { label: '30 derniers jours', value: '30d' },
    { label: '3 derniers mois', value: '3m' },
    { label: 'Cette année', value: 'year' },
    { label: 'Toute la période', value: 'all' },
]

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [stats, setStats] = useState<Stats>({ total: 0, new: 0, contacted: 0, quote_sent: 0, signed: 0, refused: 0, totalOneShot: 0, totalMonthly: 0 })
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [datePreset, setDatePreset] = useState('all')
    const [customStartDate, setCustomStartDate] = useState('')
    const [customEndDate, setCustomEndDate] = useState('')
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const [updating, setUpdating] = useState(false)
    const [editing, setEditing] = useState(false)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
    const [bulkActionOpen, setBulkActionOpen] = useState(false)
    const [bulkUpdating, setBulkUpdating] = useState(false)

    const [editForm, setEditForm] = useState({
        nom: '',
        email: '',
        phone: '',
        entreprise: '',
        status: '',
        oneShot: '',
        monthlyAmount: '',
        contractMonths: '',
        notes: '',
    })

    const getDateRange = useCallback(() => {
        const now = new Date()
        let startDate = ''
        const endDate = now.toISOString().split('T')[0]

        switch (datePreset) {
            case '7d': startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; break
            case '30d': startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; break
            case '3m': startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; break
            case 'year': startDate = `${now.getFullYear()}-01-01`; break
            case 'custom': return { startDate: customStartDate, endDate: customEndDate }
            default: return { startDate: '', endDate: '' }
        }
        return { startDate, endDate }
    }, [datePreset, customStartDate, customEndDate])

    const loadLeads = useCallback(async () => {
        setLoading(true)
        try {
            const { startDate, endDate } = getDateRange()
            const params = new URLSearchParams()
            if (filterStatus !== 'all') params.set('status', filterStatus)
            if (startDate) params.set('startDate', startDate)
            if (endDate) params.set('endDate', endDate)
            if (searchQuery) params.set('search', searchQuery)

            const res = await fetch(`/api/admin/leads?${params}`)
            const data = await res.json()
            if (data.success) {
                setLeads(data.data)
                setStats(data.stats)
            }
        } catch (error) {
            console.error('Error loading leads:', error)
        } finally {
            setLoading(false)
        }
    }, [filterStatus, getDateRange, searchQuery])

    useEffect(() => { loadLeads() }, [loadLeads])

    useEffect(() => {
        if (selectedLead && editing) {
            setEditForm({
                nom: selectedLead.parsedData?.nom || selectedLead.parsedData?.name || '',
                email: selectedLead.email || '',
                phone: selectedLead.phone || '',
                entreprise: selectedLead.parsedData?.entreprise || selectedLead.parsedData?.company || '',
                status: selectedLead.status || 'new',
                oneShot: selectedLead.oneShot?.toString() || '',
                monthlyAmount: selectedLead.monthlyAmount?.toString() || '',
                contractMonths: selectedLead.contractMonths?.toString() || '',
                notes: selectedLead.notes || '',
            })
        }
    }, [selectedLead, editing])

    const saveLead = async () => {
        if (!selectedLead) return
        setUpdating(true)
        try {
            const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: editForm.email || null,
                    phone: editForm.phone || null,
                    status: editForm.status,
                    oneShot: editForm.oneShot ? parseFloat(editForm.oneShot) : null,
                    monthlyAmount: editForm.monthlyAmount ? parseFloat(editForm.monthlyAmount) : null,
                    contractMonths: editForm.contractMonths ? parseInt(editForm.contractMonths) : null,
                    notes: editForm.notes || null,
                    parsedData: {
                        nom: editForm.nom,
                        entreprise: editForm.entreprise,
                    }
                }),
            })
            const data = await res.json()
            if (data.success) {
                setLeads(prev => prev.map(l => l.id === selectedLead.id ? data.data : l))
                setSelectedLead(data.data)
                setEditing(false)
                loadLeads()
            }
        } catch (error) {
            console.error('Save error:', error)
        } finally {
            setUpdating(false)
        }
    }

    const deleteLead = async (id: string) => {
        if (!confirm('Supprimer ce lead ?')) return
        try {
            const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' })
            if ((await res.json()).success) {
                setLeads(prev => prev.filter(l => l.id !== id))
                if (selectedLead?.id === id) setSelectedLead(null)
                loadLeads()
            }
        } catch (error) {
            console.error('Delete error:', error)
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
        if (selectedIds.size === leads.length) {
            setSelectedIds(new Set())
        } else {
            setSelectedIds(new Set(leads.map(l => l.id)))
        }
    }

    const bulkDelete = async () => {
        if (selectedIds.size === 0) return
        if (!confirm(`Supprimer ${selectedIds.size} lead(s) ?\n\nCette action est irréversible.`)) return
        setBulkUpdating(true)
        try {
            const deletePromises = Array.from(selectedIds).map(id =>
                fetch(`/api/admin/leads/${id}`, { method: 'DELETE' })
            )
            await Promise.all(deletePromises)
            setSelectedIds(new Set())
            setSelectedLead(null)
            loadLeads()
        } catch (error) {
            console.error('Bulk delete error:', error)
        } finally {
            setBulkUpdating(false)
        }
    }

    const bulkUpdateStatus = async (newStatus: string) => {
        if (selectedIds.size === 0) return
        setBulkUpdating(true)
        try {
            const updatePromises = Array.from(selectedIds).map(id =>
                fetch(`/api/admin/leads/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus })
                })
            )
            await Promise.all(updatePromises)
            setSelectedIds(new Set())
            setBulkActionOpen(false)
            loadLeads()
        } catch (error) {
            console.error('Bulk update error:', error)
        } finally {
            setBulkUpdating(false)
        }
    }

    const exportCSV = () => {
        const { startDate, endDate } = getDateRange()
        const params = new URLSearchParams()
        if (filterStatus !== 'all') params.set('status', filterStatus)
        if (startDate) params.set('startDate', startDate)
        if (endDate) params.set('endDate', endDate)
        window.location.href = `/api/admin/leads/export?${params}`
    }

    const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    const formatCurrency = (amount: number | null) => amount ? `${amount.toLocaleString('fr-FR')}€` : '-'
    const getLeadName = (lead: Lead) => lead.parsedData?.nom || lead.parsedData?.name || lead.email || 'Inconnu'
    const getStatusInfo = (status: string) => crmStatuses.find(s => s.value === status) || crmStatuses[0]

    return (
        <div className="flex flex-col lg:flex-row gap-6 relative items-start">
            <div className="flex-1 w-full min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">CRM - Gestion des Leads</h1>
                        <div className="flex flex-wrap gap-4 text-sm">
                            {crmStatuses.map(s => (
                                <span key={s.value} className={`${s.color.split(' ')[0]} font-medium`}>
                                    {stats[s.value as keyof Stats] || 0} {s.label.toLowerCase()}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button onClick={exportCSV} className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/20 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-sm font-medium">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>

                {/* Stats financières */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
                                <Euro className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.totalOneShot)}</div>
                                <div className="text-gray-500 dark:text-gray-400 text-sm">CA One-shot (signés)</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.totalMonthly)}<span className="text-sm text-gray-400 dark:text-gray-500 font-normal">/mois</span></div>
                                <div className="text-gray-500 dark:text-gray-400 text-sm">Récurrent (signés)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filtres */}
                <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-5 mb-6">
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Rechercher..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        </div>
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50">
                            <option value="all">Tous statuts</option>
                            {crmStatuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                        <select value={datePreset} onChange={(e) => setDatePreset(e.target.value)}
                            className="px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50">
                            {datePresets.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                            <option value="custom">Personnalisé</option>
                        </select>
                        {datePreset === 'custom' && (
                            <div className="flex gap-2 w-full sm:w-auto">
                                <input type="date" value={customStartDate} onChange={(e) => setCustomStartDate(e.target.value)} className="w-full sm:w-auto px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white" />
                                <input type="date" value={customEndDate} onChange={(e) => setCustomEndDate(e.target.value)} className="w-full sm:w-auto px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Barre actions bulk */}
                {selectedIds.size > 0 && (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-primary font-medium text-sm">{selectedIds.size} lead(s) sélectionné(s)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <button
                                    onClick={() => setBulkActionOpen(!bulkActionOpen)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/20 text-gray-700 dark:text-white rounded-lg text-xs font-medium transition-colors"
                                    disabled={bulkUpdating}
                                >
                                    Modifier statut <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                                {bulkActionOpen && (
                                    <div className="absolute right-0 top-full mt-1 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 rounded-lg shadow-xl z-20 min-w-[150px] py-1">
                                        {crmStatuses.map(s => (
                                            <button
                                                key={s.value}
                                                onClick={() => bulkUpdateStatus(s.value)}
                                                className={`w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/10 text-xs font-medium ${s.color.split(' ')[0]}`}
                                            >
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={bulkDelete}
                                disabled={bulkUpdating}
                                className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-xs font-medium transition-colors"
                            >
                                {bulkUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                                Supprimer
                            </button>
                            <button
                                onClick={() => setSelectedIds(new Set())}
                                className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Liste Leads */}
                <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 divide-y divide-gray-100 dark:divide-white/10 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center"><Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" /></div>
                    ) : leads.length === 0 ? (
                        <div className="p-12 text-center text-gray-500 dark:text-gray-400 text-sm">Aucun lead trouvé</div>
                    ) : (
                        <>
                            <div className="px-5 py-3 flex items-center gap-3 bg-gray-50 dark:bg-[#1a1a1a]">
                                <button onClick={selectAll} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                                    {selectedIds.size === leads.length && leads.length > 0 ? (
                                        <CheckSquare className="w-4 h-4 text-primary" />
                                    ) : (
                                        <Square className="w-4 h-4" />
                                    )}
                                </button>
                                <span className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Tout sélectionner ({leads.length})</span>
                            </div>
                            {leads.map((lead) => {
                                const statusInfo = getStatusInfo(lead.status)
                                const isSelected = selectedIds.has(lead.id)
                                return (
                                    <div key={lead.id} className={`px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${selectedLead?.id === lead.id ? 'bg-gray-50 dark:bg-white/5' : ''} ${isSelected ? 'bg-primary/5' : ''}`} onClick={() => { setSelectedLead(lead); setEditing(false) }}>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-start gap-3">
                                                <button onClick={(e) => toggleSelect(lead.id, e)} className="mt-1 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors flex-shrink-0">
                                                    {isSelected ? <CheckSquare className="w-4 h-4 text-primary" /> : <Square className="w-4 h-4" />}
                                                </button>
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                                                    {getLeadName(lead).charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-gray-900 dark:text-white font-medium text-sm truncate">{getLeadName(lead)}</div>
                                                    <div className="text-gray-500 dark:text-gray-400 text-xs truncate">{lead.email}</div>
                                                    <div className="text-gray-400 dark:text-gray-500 text-[11px] mt-0.5">{formatDate(lead.createdAt)}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 pl-10 sm:pl-0 sm:justify-end flex-wrap">
                                                {(lead.oneShot || lead.monthlyAmount) && (
                                                    <span className="text-green-600 dark:text-green-400 text-xs font-semibold whitespace-nowrap hidden md:inline-block">
                                                        {lead.oneShot ? `${lead.oneShot}€` : ''}{lead.oneShot && lead.monthlyAmount ? ' + ' : ''}{lead.monthlyAmount ? `${lead.monthlyAmount}€/m` : ''}
                                                    </span>
                                                )}
                                                <span className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-[11px] font-medium rounded-md whitespace-nowrap">{lead.type}</span>
                                                <span className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap ${statusInfo.color}`}>{statusInfo.label}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    )}
                </div>
            </div>

            {/* Panneau latéral détail */}
            {selectedLead && (
                <div className="w-full lg:w-[400px] bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 lg:sticky lg:top-8 h-fit lg:max-h-[calc(100vh-100px)] overflow-y-auto">
                    <div className="flex items-start justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{editing ? 'Modifier le lead' : 'Détails du lead'}</h2>
                        <div className="flex gap-1">
                            {editing ? (
                                <button onClick={saveLead} disabled={updating} className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-400/10 rounded-lg transition-colors">
                                    {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                </button>
                            ) : (
                                <button onClick={() => setEditing(true)} className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                            )}
                            <button onClick={() => { setSelectedLead(null); setEditing(false) }} className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {editing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium mb-1.5">Nom complet</label>
                                    <input type="text" value={editForm.nom} onChange={(e) => setEditForm({ ...editForm, nom: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium mb-1.5">Email</label>
                                        <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium mb-1.5">Téléphone</label>
                                        <input type="tel" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium mb-1.5">Entreprise</label>
                                    <input type="text" value={editForm.entreprise} onChange={(e) => setEditForm({ ...editForm, entreprise: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                    <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium mb-1.5">Statut</label>
                                    <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                                        {crmStatuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium mb-1.5">One-shot (€)</label>
                                        <input type="number" value={editForm.oneShot} onChange={(e) => setEditForm({ ...editForm, oneShot: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="0" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium mb-1.5">Mensuel (€)</label>
                                        <input type="number" value={editForm.monthlyAmount} onChange={(e) => setEditForm({ ...editForm, monthlyAmount: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="0" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium mb-1.5">Mois</label>
                                        <input type="number" value={editForm.contractMonths} onChange={(e) => setEditForm({ ...editForm, contractMonths: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="12" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium mb-1.5">Notes internes</label>
                                    <textarea value={editForm.notes} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} rows={4}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Détails du projet..." />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                <div>
                                    <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">{getLeadName(selectedLead)}</div>
                                    <div className="flex flex-col gap-1.5">
                                        {selectedLead.email && (
                                            <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                                <Mail className="w-3.5 h-3.5" /> {selectedLead.email}
                                            </a>
                                        )}
                                        {selectedLead.phone && (
                                            <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                                <Phone className="w-3.5 h-3.5" /> {selectedLead.phone}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 dark:border-white/10 pt-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="block text-xs font-medium text-gray-500 dark:text-gray-500 mb-1">Statut</span>
                                        <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-medium ${getStatusInfo(selectedLead.status).color}`}>
                                            {getStatusInfo(selectedLead.status).label}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-medium text-gray-500 dark:text-gray-500 mb-1">Date</span>
                                        <span className="flex items-center gap-1.5 text-sm text-gray-900 dark:text-white">
                                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                            {formatDate(selectedLead.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                {(selectedLead.oneShot || selectedLead.monthlyAmount) && (
                                    <div className="bg-green-50 dark:bg-green-500/5 border border-green-100 dark:border-green-500/10 rounded-xl p-4">
                                        <span className="block text-xs font-medium text-green-700 dark:text-green-500 mb-2">Montants</span>
                                        <div className="flex gap-4">
                                            {selectedLead.oneShot && (
                                                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {formatCurrency(selectedLead.oneShot)} <span className="text-xs font-normal text-gray-500">one-shot</span>
                                                </div>
                                            )}
                                            {selectedLead.monthlyAmount && (
                                                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {formatCurrency(selectedLead.monthlyAmount)}<span className="text-xs font-normal text-gray-500">/m</span>
                                                    {selectedLead.contractMonths && <span className="text-xs font-normal text-gray-500 ml-1">×{selectedLead.contractMonths}</span>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3 border-t border-gray-100 dark:border-white/10 pt-4">
                                    {selectedLead.parsedData.entreprise && (
                                        <div><span className="block text-xs font-medium text-gray-500 mb-0.5">Entreprise</span><span className="text-sm text-gray-900 dark:text-white">{selectedLead.parsedData.entreprise}</span></div>
                                    )}
                                    {selectedLead.parsedData.service && (
                                        <div><span className="block text-xs font-medium text-gray-500 mb-0.5">Service</span><span className="text-sm text-gray-900 dark:text-white capitalize">{selectedLead.parsedData.service.replace(/-/g, ' ')}</span></div>
                                    )}
                                    <div><span className="block text-xs font-medium text-gray-500 mb-0.5">Source</span><span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-[11px] rounded font-medium mt-1">{selectedLead.source}</span></div>
                                </div>

                                {selectedLead.type === 'market-analysis' && selectedLead.parsedData && (
                                    <a
                                        href={`/admin/market-analysis?email=${encodeURIComponent(selectedLead.email || '')}`}
                                        className="flex items-center gap-2 p-3 bg-primary/5 text-primary hover:bg-primary/10 transition-colors rounded-xl text-sm font-medium border border-primary/10 mt-4"
                                    >
                                        📊 Voir l&apos;analyse de marché →
                                    </a>
                                )}

                                {selectedLead.parsedData.message && (
                                    <div className="pt-2">
                                        <span className="block text-xs font-medium text-gray-500 mb-1.5">Message</span>
                                        <div className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/5 rounded-xl p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedLead.parsedData.message}</div>
                                    </div>
                                )}

                                {selectedLead.notes && (
                                    <div className="pt-2">
                                        <span className="block text-xs font-medium text-yellow-600 dark:text-yellow-500 mb-1.5">Notes internes</span>
                                        <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/20 rounded-xl p-3 text-sm text-yellow-800 dark:text-yellow-200 whitespace-pre-wrap">{selectedLead.notes}</div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex gap-2 pt-6 mt-6 border-t border-gray-100 dark:border-white/10">
                            {selectedLead.email && (
                                <a href={`mailto:${selectedLead.email}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors">
                                    <Mail className="w-4 h-4" /> Email
                                </a>
                            )}
                            {selectedLead.phone && (
                                <a href={`tel:${selectedLead.phone}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white text-sm font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                                    <Phone className="w-4 h-4" /> Appeler
                                </a>
                            )}
                            <button onClick={() => deleteLead(selectedLead.id)} title="Supprimer" className="px-3 py-2.5 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
