'use client'

import { Button } from '@/components/ui'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import { submitContact } from '@/lib/contact/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Loader2, MapPin, Mail, Phone, Instagram, Linkedin } from 'lucide-react'
import * as React from 'react'
import { useForm } from 'react-hook-form'

export function ContactForm() {
    const [isSuccess, setIsSuccess] = React.useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    })

    const onSubmit = async (data: ContactFormData) => {
        try {
            const response = await submitContact(data)

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi')
            }

            setIsSuccess(true)
            reset()

            // Reset success message après 5s
            setTimeout(() => setIsSuccess(false), 5000)
        } catch {
            alert('Erreur lors de l\'envoi. Réessayez ou appelez-nous directement.')
        }
    }

    if (isSuccess) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500 bg-green-50/50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/20">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message envoyé avec succès !</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    Merci de nous avoir contactés. Nous revenons vers vous très rapidement.
                </p>
            </div>
        )
    }

    // Enhanced styling - Light/Dark Theme Support
    const inputClasses = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 backdrop-blur-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 hover:border-gray-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/10"
    const selectClasses = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#232323] text-gray-900 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 hover:border-gray-300 dark:hover:border-white/20 appearance-none cursor-pointer [&>option]:bg-white [&>option]:dark:bg-[#232323] [&>option]:text-gray-900 [&>option]:dark:text-white"
    const labelClasses = "block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5 ml-1"

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nom */}
                <div>
                    <label htmlFor="nom" className={labelClasses}>
                        Nom complet <span className="text-primary">*</span>
                    </label>
                    <input
                        id="nom"
                        {...register('nom')}
                        className={inputClasses}
                        placeholder="Votre nom"
                    />
                    {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className={labelClasses}>
                        Email professionnel <span className="text-primary">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={inputClasses}
                        placeholder="email@entreprise.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Téléphone */}
                <div>
                    <label htmlFor="telephone" className={labelClasses}>
                        Téléphone <span className="text-primary">*</span>
                    </label>
                    <input
                        id="telephone"
                        type="tel"
                        {...register('telephone')}
                        className={inputClasses}
                        placeholder="06 12 34 56 78"
                    />
                </div>

                {/* Entreprise */}
                <div>
                    <label htmlFor="entreprise" className={labelClasses}>
                        Entreprise / Site web
                    </label>
                    <input
                        id="entreprise"
                        {...register('entreprise')}
                        className={inputClasses}
                        placeholder="Votre société"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Service */}
                <div>
                    <label htmlFor="service" className={labelClasses}>
                        Service souhaité <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                        <select
                            id="service"
                            {...register('service')}
                            className={selectClasses}
                        >
                            <option value="">Sélectionnez une option</option>
                            <option value="sites-vitrine">Site Vitrine</option>
                            <option value="seo-local">Référencement (SEO)</option>
                            <option value="google-ads">Publicité Google Ads</option>
                            <option value="e-commerce">Site E-commerce</option>
                            <option value="audit">Audit</option>
                            <option value="autre">Autre demande</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                </div>

                {/* Budget */}
                <div>
                    <label htmlFor="budget" className={labelClasses}>
                        Budget estimé <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                        <select
                            id="budget"
                            {...register('budget')}
                            className={selectClasses}
                        >
                            <option value="">Sélectionnez une fourchette</option>
                            <option value="moins-1000">Moins de 1 000€</option>
                            <option value="1000-3000">Entre 1 000€ et 3 000€</option>
                            <option value="3000-10000">Entre 3 000€ et 10 000€</option>
                            <option value="10000-30000">Entre 10 000€ et 30 000€</option>
                            <option value="plus-30000">Plus de 30 000€</option>
                            <option value="ne-sais-pas">Je ne sais pas encore</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
                </div>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className={labelClasses}>
                    Votre projet <span className="text-primary">*</span>
                </label>
                <textarea
                    id="message"
                    {...register('message')}
                    rows={5}
                    placeholder="Décrivez-nous vos besoins, vos objectifs ou posez-nous simplement vos questions..."
                    className={`${inputClasses} resize-none`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            {/* RGPD */}
            <div className="flex items-start gap-3 pt-2">
                <input
                    type="checkbox"
                    id="rgpd"
                    {...register('rgpd')}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary bg-white dark:bg-white/5 dark:border-white/10 cursor-pointer"
                />
                <label htmlFor="rgpd" className="text-xs text-gray-500 dark:text-gray-400 leading-snug cursor-pointer select-none">
                    J&apos;autorise Litus à utiliser ces données pour traiter ma demande. <br className="hidden sm:block" />
                    Vos données sont protégées et ne seront jamais partagées.
                </label>
            </div>
            {errors.rgpd && <p className="text-red-500 text-xs ml-1">{errors.rgpd.message}</p>}

            {/* Submit */}
            <Button
                type="submit"
                size="xl"
                className="w-full font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Traitement en cours...
                    </>
                ) : (
                    "Envoyer ma demande"
                )}
            </Button>
        </form>
    )
}

/**
 * Informations de contact (Sidebar Version)
 */
export function ContactInfo() {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Canaux Directs</h3>
                <div className="space-y-6">
                    {/* Phone */}
                    <a href="tel:+33744985521" className="group flex items-center gap-4 hover:translate-x-2 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Appel direct</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">07 44 98 55 21</p>
                        </div>
                    </a>

                    {/* Email */}
                    <a href="mailto:litusagency@gmail.com" className="group flex items-center gap-4 hover:translate-x-2 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Par écrit</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">litusagency@gmail.com</p>
                        </div>
                    </a>

                    {/* Address */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Bureaux</p>
                            <p className="text-base font-bold text-gray-900 dark:text-white">Lorient (56) & Le Mans (72)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-white/10 my-8" />

            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Réseaux Sociaux</h3>
                <div className="flex gap-4">
                    {['LinkedIn', 'Instagram'].map((social) => (
                        <a key={social} href="#" className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors">
                            {social === 'LinkedIn' && <Linkedin className="w-4 h-4" />}
                            {social === 'Instagram' && <Instagram className="w-4 h-4" />}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

