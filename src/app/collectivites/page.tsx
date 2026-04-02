import { Metadata } from 'next'
import { CollectivitesHero } from './_components/CollectivitesHero'
import { CollectivitesStats } from './_components/CollectivitesStats'
import { CollectivitesPainPoints } from './_components/CollectivitesPainPoints'
import { CollectivitesSolutions } from './_components/CollectivitesSolutions'
import { ArrowRight, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
    title: 'Création de Sites Web & Portails pour Collectivités Locales | Litus',
    description: "Refonte de sites pour mairies et collectivités. Accessibilité RGAA 100%, protection anti-ransomware, et extranets citoyens sur-mesure (sans dette technique).",
}

export default function CollectivitesPage() {
    return (
        <div className="bg-slate-50 dark:bg-[#050505] min-h-screen">
            <CollectivitesHero />
            <CollectivitesStats />
            <CollectivitesPainPoints />
            <CollectivitesSolutions />

            {/* CTA Collectivités Direct (Pas de lead magnet abusif pour cette cible) */}
            <section className="py-24 relative overflow-hidden bg-white dark:bg-[#0a0a0a] border-t border-slate-200 dark:border-white/5">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                
                <div className="container-fluid relative z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-200 dark:border-emerald-500/20">
                            <FileText className="w-4 h-4" /> Analyse Gratuite
                        </span>
                        
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Votre site respecte-t-il les normes RGAA ?
                        </h2>
                        
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
                            La loi imposera bientôt des sanctions aux communes dont le site exclut les personnes en situation de handicap. Demandez un diagnostic gratuit de l'accessibilité et de la sécurité de votre portail actuel.
                        </p>
                        
                        <div className="max-w-xl mx-auto bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl p-2 pl-6 flex flex-col sm:flex-row items-center shadow-lg hover:shadow-xl transition-shadow">
                            <input 
                                type="email" 
                                placeholder="votre-email@mairie-exemple.fr" 
                                className="bg-transparent border-none outline-none flex-1 text-slate-900 dark:text-white placeholder:text-slate-400 w-full mb-4 sm:mb-0"
                            />
                            <Button className="shrink-0 w-full sm:w-auto bg-blue-600 hover:bg-blue-500 rounded-xl" href="/contact">
                                Demander un Diagnostic
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Massive CTA Collectivités */}
            <section className="relative py-32 bg-[#020617] overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

                <div className="container-fluid relative z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
                            Modernisez le lien avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">vos concitoyens.</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                            Rendez vos démarches accessibles, libérez du temps à vos agents de mairie, et protégez vos données face aux menaces numériques.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button size="lg" className="h-16 px-10 text-lg bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20 rounded-full" href="/contact">
                                <span className="mr-2">🏛️</span> Contacter notre équipe
                            </Button>

                            <Button size="lg" variant="secondary" className="h-16 px-10 text-lg border-white/20 text-white hover:bg-white hover:text-slate-900 rounded-full bg-white/5 backdrop-blur-sm" href="/portfolio">
                                <ArrowRight className="mr-2 w-5 h-5" />
                                Découvrir nos réalisations
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
