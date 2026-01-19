import Link from 'next/link'
import { MapPin, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
            {/* Modern Pattern Background */}
            <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#footer-grid)" />
                </svg>
            </div>

            {/* Orange glow effects */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-[128px]" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-[128px]" />
            </div>

            {/* CTA Section */}
            <div className="relative z-10 border-b border-white/10">
                <div className="container-fluid py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Prêt à booster votre visibilité locale ?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Devis gratuit sous 24h. Sans engagement.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" href="/contact" className="shadow-xl shadow-primary/20">
                                Demander un devis gratuit
                            </Button>
                            <Button size="lg" variant="secondary" href="tel:+33123456789" className="bg-white/10 hover:bg-white/20 border-white text-white">
                                <Phone className="w-5 h-5 mr-2" />
                                01 23 45 67 89
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="relative z-10">
                <div className="container-fluid py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                        {/* Litus - 2 cols */}
                        <div className="lg:col-span-2">
                            <div className="text-2xl font-bold text-primary mb-4">Litus</div>
                            <p className="text-gray-400 text-sm mb-4">
                                Agence web locale pour PME et artisans à Lorient & Le Mans.
                                Sites web, SEO local et Google Ads pour booster votre visibilité.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>Lorient (56) & Le Mans (72)</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                <Phone className="w-4 h-4 text-primary" />
                                <a href="tel:+33123456789" className="hover:text-white transition-colors">
                                    01 23 45 67 89
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Mail className="w-4 h-4 text-primary" />
                                <a href="mailto:contact@litus.fr" className="hover:text-white transition-colors">
                                    contact@litus.fr
                                </a>
                            </div>
                        </div>

                        {/* Services */}
                        <div>
                            <div className="font-bold mb-4 text-white">Services</div>
                            <nav className="flex flex-col gap-2">
                                <Link href="/services/sites-vitrine" className="text-gray-400 hover:text-primary transition-colors text-sm">
                                    Sites Vitrine
                                </Link>
                                <Link href="/services/e-commerce" className="text-gray-400 hover:text-primary transition-colors text-sm">
                                    E-commerce
                                </Link>
                                <Link href="/services/seo-local" className="text-gray-400 hover:text-primary transition-colors text-sm">
                                    SEO Local
                                </Link>
                                <Link href="/services/google-ads" className="text-gray-400 hover:text-primary transition-colors text-sm">
                                    Google Ads
                                </Link>
                            </nav>
                        </div>

                        {/* Secteurs */}
                        <div>
                            <div className="font-bold mb-4 text-white">Secteurs</div>
                            <nav className="flex flex-col gap-2">
                                <Link href="/metiers/paysagiste-lorient" className="text-gray-400 hover:text-primary transition-colors text-sm">
                                    Paysagistes
                                </Link>
                                <Link href="/metiers/plombier-le-mans" className="text-gray-400 hover:text-primary transition-colors text-sm">
                                    Plombiers
                                </Link>
                                <Link href="/metiers/electricien-lorient" className="text-gray-400 hover:text-primary transition-colors text-sm">
                                    Électriciens
                                </Link>
                                <Link href="/collectivites" className="text-gray-400 hover:text-primary transition-colors text-sm">
                                    Collectivités
                                </Link>
                            </nav>
                        </div>

                        {/* Entreprise */}
                        <div>
                            <div className="font-bold mb-4 text-white">Entreprise</div>
                            <nav className="flex flex-col gap-2">
                                <Link href="/tarifs" className="text-gray-400 hover:text-primary transition-colors text-sm">
                                    Tarifs
                                </Link>
                                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors text-sm">
                                    Contact
                                </Link>
                                <Link href="/ressources/audit-google-ads" className="text-gray-400 hover:text-primary transition-colors text-sm">
                                    Audit Gratuit
                                </Link>
                            </nav>
                        </div>

                        {/* Ressources */}
                        <div>
                            <div className="font-bold mb-4 text-white">Ressources</div>
                            <nav className="flex flex-col gap-2">
                                <Link href="/ressources/audit-google-ads" className="text-gray-400 hover:text-primary transition-colors text-sm">
                                    Audit Google Ads
                                </Link>
                                <Link href="/ressources/carto-productivite" className="text-gray-400 hover:text-primary transition-colors text-sm">
                                    Carto Productivité
                                </Link>
                                <Link href="/ressources/guide-appel-offres" className="text-gray-400 hover:text-primary transition-colors text-sm">
                                    Guide Collectivités
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="container-fluid py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                            <div>© 2025 Litus. Tous droits réservés.</div>
                            <div className="flex gap-6">
                                <Link href="/mentions-legales" className="hover:text-white transition-colors">
                                    Mentions Légales
                                </Link>
                                <Link href="/confidentialite" className="hover:text-white transition-colors">
                                    Confidentialité
                                </Link>
                                <Link href="/cookies" className="hover:text-white transition-colors">
                                    Cookies
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
