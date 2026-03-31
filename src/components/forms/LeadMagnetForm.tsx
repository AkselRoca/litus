'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Download, Loader2 } from 'lucide-react'

const leadMagnetSchema = z.object({
    fullName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Email invalide'),
    company: z.string().optional(),
    phone: z.string().optional(),
})

type LeadMagnetFormData = z.infer<typeof leadMagnetSchema>

interface LeadMagnetFormProps {
    magnetId: string
    magnetTitle: string
    downloadUrl?: string
    onSuccess?: () => void
}

export function LeadMagnetForm({
    magnetId,
    magnetTitle,
    downloadUrl,
    onSuccess,
}: LeadMagnetFormProps) {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LeadMagnetFormData>({
        resolver: zodResolver(leadMagnetSchema),
    })

    const onSubmit = async (data: LeadMagnetFormData) => {
        try {
            setError(null)

            // Envoyer les données au backend
            const response = await fetch('/api/lead-magnet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    magnetId,
                    magnetTitle,
                }),
            })

            if (!response.ok) throw new Error('Erreur lors de l\'envoi')

            const result = await response.json()
            onSuccess?.()

            // Téléchargement automatique du PDF
            if (result.downloadUrl) {
                const link = document.createElement('a')
                link.href = result.downloadUrl
                link.download = ''
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        } catch (err) {
            console.error('Erreur:', err)
            setError('Une erreur est survenue. Veuillez réessayer.')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium mb-2">
                    Nom complet <span className="text-red-500">*</span>
                </label>
                <Input
                    {...register('fullName')}
                    placeholder="Jean Dupont"
                    error={errors.fullName?.message}
                />
                {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Email professionnel <span className="text-red-500">*</span>
                </label>
                <Input
                    {...register('email')}
                    type="email"
                    placeholder="jean@entreprise.fr"
                    error={errors.email?.message}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Entreprise (optionnel)
                </label>
                <Input {...register('company')} placeholder="Nom de votre entreprise" />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Téléphone (optionnel)
                </label>
                <Input {...register('phone')} type="tel" placeholder="06 12 34 56 78" />
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                size="lg"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Envoi en cours...
                    </>
                ) : (
                    <>
                        <Download className="w-5 h-5 mr-2" />
                        Télécharger gratuitement
                    </>
                )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
                En téléchargeant, vous acceptez de recevoir nos conseils par email. Désinscription
                possible à tout moment.
            </p>
        </form>
    )
}
