'use client'

import { useState, useEffect } from 'react'
import { Users, Plus, Edit3, Trash2, Loader2, X, Save, Mail, Shield, Eye, EyeOff } from 'lucide-react'

interface TeamMember {
    id: string
    email: string
    name: string
    role: string
    avatar: string | null
    emailNotifications: boolean
    createdAt: string
    _count?: { assignedLeads: number }
}

const roles = [
    { value: 'admin', label: 'Administrateur', description: 'Accès complet à tout', color: 'text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-500/10 dark:border-red-500/20' },
    { value: 'commercial', label: 'Commercial', description: 'Leads + Analytics', color: 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20' },
    { value: 'dev', label: 'Développeur', description: 'Médias + Portfolio + Blog + Analytics', color: 'text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-500/10 dark:border-green-500/20' },
]

export default function TeamSettingsPage() {
    const [members, setMembers] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editing, setEditing] = useState<TeamMember | null>(null)
    const [saving, setSaving] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'commercial',
        emailNotifications: true,
    })

    useEffect(() => { loadMembers() }, [])

    const loadMembers = async () => {
        try {
            const res = await fetch('/api/admin/team')
            const data = await res.json()
            if (data.success) setMembers(data.data)
        } catch (error) {
            console.error('Error loading team:', error)
        } finally {
            setLoading(false)
        }
    }

    const openModal = (member?: TeamMember) => {
        if (member) {
            setEditing(member)
            setForm({
                name: member.name,
                email: member.email,
                password: '',
                role: member.role,
                emailNotifications: member.emailNotifications,
            })
        } else {
            setEditing(null)
            setForm({ name: '', email: '', password: '', role: 'commercial', emailNotifications: true })
        }
        setShowModal(true)
    }

    const saveMember = async () => {
        setSaving(true)
        try {
            const url = editing ? `/api/admin/team/${editing.id}` : '/api/admin/team'
            const method = editing ? 'PATCH' : 'POST'

            const body: any = {
                name: form.name,
                email: form.email,
                role: form.role,
                emailNotifications: form.emailNotifications,
            }
            if (form.password) body.password = form.password

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            const data = await res.json()

            if (data.success) {
                setShowModal(false)
                loadMembers()
            } else {
                alert(data.error || 'Erreur')
            }
        } catch (error) {
            console.error('Save error:', error)
        } finally {
            setSaving(false)
        }
    }

    const deleteMember = async (id: string) => {
        if (!confirm('Supprimer ce membre ? Les leads assignés seront désassignés.')) return
        try {
            const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' })
            if ((await res.json()).success) loadMembers()
        } catch (error) {
            console.error('Delete error:', error)
        }
    }

    const getRoleInfo = (role: string) => roles.find(r => r.value === role) || roles[1]

    if (loading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Équipe</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{members.length} membre{members.length > 1 ? 's' : ''}</p>
                </div>
                <button onClick={() => openModal()} className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium w-full sm:w-auto">
                    <Plus className="w-4 h-4" /> Ajouter un membre
                </button>
            </div>

            {/* Liste des membres */}
            <div className="grid gap-4">
                {members.map(member => {
                    const roleInfo = getRoleInfo(member.role)
                    return (
                        <div key={member.id} className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-5 hover:border-gray-300 dark:hover:border-white/20 transition-colors shadow-sm dark:shadow-none">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold shadow-md shadow-primary/20 shrink-0 border border-primary/20">
                                        {member.avatar ? (
                                            <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            member.name.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-base font-bold text-gray-900 dark:text-white truncate">{member.name}</div>
                                        <div className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1.5 truncate">
                                            <Mail className="w-3.5 h-3.5 flex-shrink-0" /> {member.email}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 border-t border-gray-100 dark:border-white/5 sm:border-0 pt-4 sm:pt-0">
                                    <div className="text-left sm:text-right">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${roleInfo.color} inline-block mb-1`}>
                                            {roleInfo.label}
                                        </span>
                                        <div className="text-gray-500 dark:text-gray-400 text-[11px] truncate max-w-[150px]">{roleInfo.description}</div>
                                    </div>
                                    {member._count && (
                                        <div className="text-center px-4 sm:border-l border-gray-200 dark:border-white/10">
                                            <div className="text-xl font-bold text-gray-900 dark:text-white leading-none">{member._count.assignedLeads}</div>
                                            <div className="text-gray-400 text-[10px] font-medium uppercase tracking-wider mt-1">Leads</div>
                                        </div>
                                    )}
                                    <div className="flex gap-1.5 shrink-0">
                                        <button onClick={() => openModal(member)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition-colors" title="Modifier">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => deleteMember(member.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-500/20" title="Supprimer">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {members.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-12 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl">
                        <Users className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                        <p className="text-sm">Aucun membre dans l'équipe</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900/60 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-white dark:bg-[#181818] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-white/5">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{editing ? 'Modifier le membre' : 'Nouveau membre'}</h2>
                            <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5">Nom complet</label>
                                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Prénom Nom" />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5">Email</label>
                                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="email@litus.fr" />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5">{editing ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe'}</label>
                                <div className="relative">
                                    <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary pr-12" placeholder={editing ? 'Laisser vide pour garder l\'actuel' : '••••••••'} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2 pb-2 border-b border-gray-100 dark:border-white/5">Niveau de permission</label>
                                <div className="grid gap-2">
                                    {roles.map(role => (
                                        <button key={role.value} type="button" onClick={() => setForm({ ...form, role: role.value })}
                                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all text-left ${form.role === role.value ? 'bg-primary/5 border-primary ring-1 ring-primary/20 shadow-sm' : 'bg-white dark:bg-[#111] border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'}`}>
                                            <Shield className={`w-5 h-5 shrink-0 mt-0.5 ${form.role === role.value ? 'text-primary' : 'text-gray-400'}`} />
                                            <div>
                                                <div className={`font-semibold text-sm ${form.role === role.value ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>{role.label}</div>
                                                <div className={`text-[11px] leading-snug mt-0.5 ${form.role === role.value ? 'text-primary/70' : 'text-gray-500'}`}>{role.description}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input type="checkbox" checked={form.emailNotifications} onChange={(e) => setForm({ ...form, emailNotifications: e.target.checked })}
                                            className="w-5 h-5 rounded border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 transition-colors" />
                                    </div>
                                    <div>
                                        <div className="text-gray-900 dark:text-white text-sm font-medium group-hover:text-primary transition-colors">Recevoir les notifications par email</div>
                                        <div className="text-gray-500 dark:text-gray-400 text-[11px] mt-0.5">Nouveaux leads, messages système, etc.</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8 pt-4 border-t border-gray-100 dark:border-white/5">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-sm">
                                Annuler
                            </button>
                            <button onClick={saveMember} disabled={saving} className="flex-1 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-md shadow-primary/20 text-sm">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {editing ? 'Enregistrer' : 'Créer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
