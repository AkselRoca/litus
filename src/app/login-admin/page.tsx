'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react'
import { ADMIN_EMAIL } from '@/lib/admin/identity'

export default function AdminLoginPage() {
    const email = ADMIN_EMAIL
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                code,
                redirect: false,
            })

            if (result?.error) {
                setError(result.code === 'service_unavailable'
          ? 'Le service de connexion est temporairement indisponible. Impossible de vérifier les identifiants pour le moment. Réessaie dans quelques instants.'
          : 'Mot de passe ou code incorrect, expiré ou déjà utilisé. Après plusieurs essais, patiente cinq minutes.')
            } else {
                // Avoid reusing anonymous RSC/prefetch redirects after sign-in.
                window.location.replace('/admin')
            }
        } catch {
            setError('Une erreur est survenue')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-orange-500/15 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary mb-2">Litus</h1>
                    <p className="text-gray-400">Administration</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>

                    <h2 className="text-2xl font-bold text-white text-center mb-6">
                        Compte Litus
                    </h2>

                    {error && (
                        <div className="flex items-center gap-2 px-4 py-3 mb-6 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
                            <AlertCircle className="w-5 h-5" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Compte unique
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    readOnly
                                    autoComplete="username"
                                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="admin@litus.fr"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="admin-code" className="block text-sm font-medium text-gray-300 mb-2">Google Authenticator</label>
                            <input id="admin-code" type="text" autoComplete="one-time-code" autoCapitalize="off" spellCheck={false} maxLength={32} value={code} onChange={event => setCode(event.target.value)} placeholder="Code à 6 chiffres ou code de secours" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary" />
                            <p className="text-xs text-gray-400 mt-2">À renseigner si la double authentification est activée dans les paramètres.</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-primary to-orange-500 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Connexion...
                                </>
                            ) : (
                                'Se connecter'
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-gray-500 mt-6 text-sm">
                    Accès réservé aux administrateurs Litus
                </p>
            </div>
        </div>
    )
}
