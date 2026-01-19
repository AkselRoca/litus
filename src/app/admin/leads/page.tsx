'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Mail, Phone, Calendar, Download, Trash2, Loader2, X, Edit3, Save, Euro, Clock } from 'lucide-react'

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

// Statuts CRM
const crmStatuses = [
    { value: 'new', label: 'Nouveau', color: 'text-blue-400 bg-blue-400/20' },
    { value: 'contacted', label: 'Contacté', color: 'text-yellow-400 bg-yellow-400/20' },
    { value: 'quote_sent', label: 'Devis envoyé', color: 'text-purple-400 bg-purple-400/20' },
    { value: 'signed', label: 'Signé', color: 'text-green-400 bg-green-400/20' },
    { value: 'refused', label: 'Refusé', color: 'text-red-400 bg-red-400/20' },
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

    // Champs en édition
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

    // Initialiser le formulaire d'édition
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
        <div className="flex gap-6">
            <div className="flex-1">
                {/* Header avec stats financières */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">CRM - Gestion des Leads</h1>
                        <div className="flex gap-6 text-sm">
                            {crmStatuses.map(s => (
                                <span key={s.value} className={s.color.split(' ')[0]}>
                                    {stats[s.value as keyof Stats] || 0} {s.label.toLowerCase()}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white border border-white/20 rounded-xl hover:bg-white/10 transition-colors">
                        <Download className="w-5 h-5" /> Export CSV
                    </button>
                </div>

                {/* Stats financières */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-900 rounded-xl border border-white/10 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                                <Euro className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">{formatCurrency(stats.totalOneShot)}</div>
                                <div className="text-gray-400 text-sm">CA One-shot (signés)</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-xl border border-white/10 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">{formatCurrency(stats.totalMonthly)}<span className="text-sm text-gray-400">/mois</span></div>
                                <div className="text-gray-400 text-sm">Récurrent (signés)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filtres */}
                <div className="bg-gray-900 rounded-2xl border border-white/10 p-4 mb-6">
                    <div className="flex flex-wrap gap-4">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="text" placeholder="Rechercher..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-transparent border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="all">Tous statuts</option>
                            {crmStatuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                        <select value={datePreset} onChange={(e) => setDatePreset(e.target.value)}
                            className="px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary">
                            {datePresets.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                            <option value="custom">Période personnalisée</option>
                        </select>
                        {datePreset === 'custom' && (
                            <>
                                <input type="date" value={customStartDate} onChange={(e) => setCustomStartDate(e.target.value)} className="px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white" />
                                <input type="date" value={customEndDate} onChange={(e) => setCustomEndDate(e.target.value)} className="px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-white" />
                            </>
                        )}
                    </div>
                </div>

                {/* Liste des leads */}
                <div className="bg-gray-900 rounded-2xl border border-white/10 divide-y divide-white/10">
                    {loading ? (
                        <div className="p-12 text-center"><Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" /></div>
                    ) : leads.length === 0 ? (
                        <div className="p-12 text-center text-gray-400">Aucun lead trouvé</div>
                    ) : (
                        leads.map((lead) => {
                            const statusInfo = getStatusInfo(lead.status)
                            return (
                                <div key={lead.id} className={`p-4 hover:bg-white/5 transition-colors cursor-pointer ${selectedLead?.id === lead.id ? 'bg-white/5' : ''}`} onClick={() => { setSelectedLead(lead); setEditing(false) }}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                                {getLeadName(lead).charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-white font-medium">{getLeadName(lead)}</div>
                                                <div className="text-gray-400 text-sm">{lead.email}</div>
                                                <div className="text-gray-500 text-xs mt-1">{formatDate(lead.createdAt)}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {(lead.oneShot || lead.monthlyAmount) && (
                                                <span className="text-green-400 text-sm font-medium">
                                                    {lead.oneShot ? `${lead.oneShot}€` : ''}{lead.oneShot && lead.monthlyAmount ? ' + ' : ''}{lead.monthlyAmount ? `${lead.monthlyAmount}€/m` : ''}
                                                </span>
                                            )}
                                            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">{lead.type}</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>{statusInfo.label}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>

            {/* Panneau de détail avec édition */}
            {selectedLead && (
                <div className="w-[420px] bg-gray-900 rounded-2xl border border-white/10 p-6 sticky top-8 h-fit max-h-[calc(100vh-100px)] overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">{editing ? 'Modifier' : 'Détails'}</h2>
                        <div className="flex gap-2">
                            {editing ? (
                                <button onClick={saveLead} disabled={updating} className="p-2 text-green-400 hover:bg-green-400/20 rounded-lg transition-colors">
                                    {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                </button>
                            ) : (
                                <button onClick={() => setEditing(true)} className="p-2 text-gray-400 hover:bg-white/10 rounded-lg transition-colors">
                                    <Edit3 className="w-5 h-5" />
                                </button>
                            )}
                            <button onClick={() => { setSelectedLead(null); setEditing(false) }} className="p-2 text-gray-400 hover:bg-white/10 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {editing ? (
                            <>
                                {/* Formulaire d'édition */}
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Nom</label>
                                    <input type="text" value={editForm.nom} onChange={(e) => setEditForm({ ...editForm, nom: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-gray-400 text-xs mb-1">Email</label>
                                        <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-xs mb-1">Téléphone</label>
                                        <input type="tel" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Entreprise</label>
                                    <input type="text" value={editForm.entreprise} onChange={(e) => setEditForm({ ...editForm, entreprise: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Statut</label>
                                    <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm">
                                        {crmStatuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-gray-400 text-xs mb-1">One-shot (€)</label>
                                        <input type="number" value={editForm.oneShot} onChange={(e) => setEditForm({ ...editForm, oneShot: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm" placeholder="12000" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-xs mb-1">Mensuel (€)</label>
                                        <input type="number" value={editForm.monthlyAmount} onChange={(e) => setEditForm({ ...editForm, monthlyAmount: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm" placeholder="129" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-xs mb-1">Durée (mois)</label>
                                        <input type="number" value={editForm.contractMonths} onChange={(e) => setEditForm({ ...editForm, contractMonths: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm" placeholder="36" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Notes internes</label>
                                    <textarea value={editForm.notes} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} rows={3}
                                        className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm resize-none" placeholder="Notes, rappels..." />
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Affichage détails */}
                                <div className="text-2xl font-bold text-white">{getLeadName(selectedLead)}</div>
                                {selectedLead.email && (
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Mail className="w-4 h-4" />
                                        <a href={`mailto:${selectedLead.email}`} className="hover:text-primary">{selectedLead.email}</a>
                                    </div>
                                )}
                                {selectedLead.phone && (
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Phone className="w-4 h-4" />
                                        <a href={`tel:${selectedLead.phone}`} className="hover:text-primary">{selectedLead.phone}</a>
                                    </div>
                                )}

                                {/* Statut */}
                                <div>
                                    <label className="block text-gray-500 text-xs mb-2">Statut</label>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(selectedLead.status).color}`}>
                                        {getStatusInfo(selectedLead.status).label}
                                    </span>
                                </div>

                                {/* Montants */}
                                {(selectedLead.oneShot || selectedLead.monthlyAmount) && (
                                    <div className="bg-green-500/10 rounded-xl p-4">
                                        <label className="block text-green-400 text-xs mb-2">Montants</label>
                                        <div className="flex gap-4 text-white">
                                            {selectedLead.oneShot && <span>{formatCurrency(selectedLead.oneShot)} one-shot</span>}
                                            {selectedLead.monthlyAmount && (
                                                <span>{formatCurrency(selectedLead.monthlyAmount)}/mois {selectedLead.contractMonths && `× ${selectedLead.contractMonths} mois`}</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Infos */}
                                {selectedLead.parsedData.entreprise && (
                                    <div><label className="block text-gray-500 text-xs mb-1">Entreprise</label><div className="text-white">{selectedLead.parsedData.entreprise}</div></div>
                                )}
                                {selectedLead.parsedData.service && (
                                    <div><label className="block text-gray-500 text-xs mb-1">Service</label><div className="text-white capitalize">{selectedLead.parsedData.service.replace(/-/g, ' ')}</div></div>
                                )}
                                <div><label className="block text-gray-500 text-xs mb-1">Source</label><div className="text-white">{selectedLead.source}</div></div>
                                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-500" /><span className="text-white">{formatDate(selectedLead.createdAt)}</span></div>

                                {/* Message */}
                                {selectedLead.parsedData.message && (
                                    <div><label className="block text-gray-500 text-xs mb-1">Message</label><div className="text-white bg-white/5 rounded-xl p-3 text-sm">{selectedLead.parsedData.message}</div></div>
                                )}

                                {/* Notes */}
                                {selectedLead.notes && (
                                    <div><label className="block text-gray-500 text-xs mb-1">Notes</label><div className="text-yellow-200 bg-yellow-500/10 rounded-xl p-3 text-sm">{selectedLead.notes}</div></div>
                                )}
                            </>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-4 border-t border-white/10">
                            {selectedLead.email && (
                                <a href={`mailto:${selectedLead.email}`} className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
                                    <Mail className="w-4 h-4" /> Répondre
                                </a>
                            )}
                            {selectedLead.phone && (
                                <a href={`tel:${selectedLead.phone}`} className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                                    <Phone className="w-4 h-4" /> Appeler
                                </a>
                            )}
                        </div>
                        <button onClick={() => deleteLead(selectedLead.id)} className="w-full flex items-center justify-center gap-2 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors">
                            <Trash2 className="w-4 h-4" /> Supprimer
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
