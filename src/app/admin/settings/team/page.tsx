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
    { value: 'admin', label: 'Administrateur', description: 'Accès complet à tout', color: 'text-red-400 bg-red-400/20' },
    { value: 'commercial', label: 'Commercial', description: 'Leads + Analytics', color: 'text-blue-400 bg-blue-400/20' },
    { value: 'dev', label: 'Développeur', description: 'Médias + Portfolio + Blog + Analytics', color: 'text-green-400 bg-green-400/20' },
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
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Gestion de l'équipe</h1>
                    <p className="text-gray-400">{members.length} membre{members.length > 1 ? 's' : ''}</p>
                </div>
                <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
                    <Plus className="w-5 h-5" /> Ajouter un membre
                </button>
            </div>

            {/* Liste des membres */}
            <div className="grid gap-4">
                {members.map(member => {
                    const roleInfo = getRoleInfo(member.role)
                    return (
                        <div key={member.id} className="bg-gray-900 rounded-2xl border border-white/10 p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white text-xl font-bold">
                                        {member.avatar ? (
                                            <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            member.name.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-xl font-semibold text-white">{member.name}</div>
                                        <div className="text-gray-400 text-sm flex items-center gap-2">
                                            <Mail className="w-4 h-4" /> {member.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleInfo.color}`}>
                                            {roleInfo.label}
                                        </span>
                                        <div className="text-gray-500 text-xs mt-1">{roleInfo.description}</div>
                                    </div>
                                    {member._count && (
                                        <div className="text-center px-4 border-l border-white/10">
                                            <div className="text-2xl font-bold text-white">{member._count.assignedLeads}</div>
                                            <div className="text-gray-500 text-xs">Leads assignés</div>
                                        </div>
                                    )}
                                    <div className="flex gap-2">
                                        <button onClick={() => openModal(member)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                            <Edit3 className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => deleteMember(member.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {members.length === 0 && (
                    <div className="text-center text-gray-400 py-12">Aucun membre dans l'équipe</div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
                    <div className="bg-gray-900 rounded-2xl border border-white/10 p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">{editing ? 'Modifier' : 'Nouveau membre'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Nom</label>
                                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white" placeholder="Prénom Nom" />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Email</label>
                                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white" placeholder="email@litus.fr" />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">{editing ? 'Nouveau mot de passe (laisser vide pour garder)' : 'Mot de passe'}</label>
                                <div className="relative">
                                    <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white pr-12" placeholder="••••••••" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Rôle</label>
                                <div className="grid gap-2">
                                    {roles.map(role => (
                                        <button key={role.value} type="button" onClick={() => setForm({ ...form, role: role.value })}
                                            className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${form.role === role.value ? 'bg-primary/20 border-primary' : 'bg-gray-800 border-white/10 hover:border-white/20'}`}>
                                            <Shield className={`w-5 h-5 ${form.role === role.value ? 'text-primary' : 'text-gray-400'}`} />
                                            <div className="text-left">
                                                <div className="text-white font-medium">{role.label}</div>
                                                <div className="text-gray-500 text-xs">{role.description}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="emailNotif" checked={form.emailNotifications} onChange={(e) => setForm({ ...form, emailNotifications: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/10 bg-gray-800 text-primary" />
                                <label htmlFor="emailNotif" className="text-white">Recevoir les notifications par email</label>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                                Annuler
                            </button>
                            <button onClick={saveMember} disabled={saving} className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                {editing ? 'Enregistrer' : 'Créer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
