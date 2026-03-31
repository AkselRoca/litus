import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Politique de Confidentialité | Litus',
    description: 'Découvrez comment Litus protège et gère vos données personnelles conformément au RGPD.',
    robots: { index: true, follow: true },
}

export default function PolitiqueConfidentialitePage() {
    return (
        <div className="pt-32 pb-20 bg-gray-50 dark:bg-[#0A0A0A] min-h-screen">
            <div className="container-fluid">
                <div className="max-w-4xl mx-auto bg-white dark:bg-[#111] rounded-3xl p-8 md:p-12 lg:p-16 shadow-sm border border-gray-100 dark:border-white/5">
                    <div className="mb-12 border-b border-gray-100 dark:border-white/5 pb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Politique de Confidentialité</h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400">
                            Chez Litus, nous accordons une importance primordiale à la confidentialité et à la sécurité de vos données personnelles. Cette politique explique en détail notre approche.
                        </p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-li:text-gray-600 dark:prose-li:text-gray-400 prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-gray-900 dark:prose-strong:text-white">
                        
                        <div className="space-y-12">
                            <section>
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                                    Introduction et Responsable du traitement
                                </h2>
                                <p>
                                    La présente politique de confidentialité vise à vous informer de la manière dont l'agence <strong>Litus</strong> collecte, utilise et protège vos données à caractère personnel lorsque vous naviguez sur notre site internet ou utilisez nos services. 
                                </p>
                                <p>
                                    Le responsable du traitement des données est l'agence Litus, joignable à l'adresse email suivante : <strong>litusagency@gmail.com</strong>.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                                    Données collectées
                                </h2>
                                <p>Dans le cadre de nos interactions, nous sommes susceptibles de collecter les données suivantes :</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 list-none pl-0">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Informations d'identité (Nom, Prénom)</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Coordonnées (Email, Téléphone)</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Informations professionnelles (Entreprise, Poste)</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Données de projet (Budget, Objectifs SEO)</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Données de navigation (Cookies, Adresse IP)</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">3</span>
                                    Utilisation de vos données
                                </h2>
                                <p>Vos données personnelles sont traitées pour les finalités suivantes :</p>
                                <ul>
                                    <li>L'analyse de vos besoins via notre outil d'audit SEO ou notre formulaire de contact afin d'établir un devis précis.</li>
                                    <li>La gestion de la relation client, incluant la facturation et le suivi de projet.</li>
                                    <li>L'amélioration continue de notre site web et de l'expérience utilisateur.</li>
                                    <li>L'envoi de communications commerciales ou de newsletters (uniquement si vous y avez expressément consenti).</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">4</span>
                                    Durée de conservation
                                </h2>
                                <p>
                                    Nous conservons vos données uniquement le temps nécessaire à l'accomplissement des finalités mentionnées ci-dessus ou pour satisfaire à nos obligations légales :
                                </p>
                                <ul>
                                    <li><strong>Données de prospects :</strong> conservées pendant un maximum de 3 ans après le dernier contact émanant du prospect.</li>
                                    <li><strong>Données clients :</strong> conservées pendant la durée de la relation commerciale, puis archivées pour des raisons comptables et légales (jusqu'à 10 ans).</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">5</span>
                                    Vos droits (RGPD)
                                </h2>
                                <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants sur vos informations :</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Droit d'accès</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 m-0">Vous pouvez demander une copie des données que nous détenons à votre sujet.</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Droit de rectification</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 m-0">Vous pouvez demander la correction de données inexactes ou incomplètes.</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Droit à l'effacement</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 m-0">Vous pouvez demander la suppression de vos données ("droit à l'oubli").</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Droit d'opposition</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 m-0">Vous pouvez vous opposer au traitement de vos données pour des motifs légitimes.</p>
                                    </div>
                                </div>
                                <p className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl text-primary text-sm font-medium">
                                    Pour exercer ces droits, veuillez nous contacter à l'adresse suivante : <strong>litusagency@gmail.com</strong> en joignant une copie d'un titre d'identité valide.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">6</span>
                                    Gestion des Cookies
                                </h2>
                                <p>
                                    Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d'un site. Nous utilisons des cookies pour assurer le bon fonctionnement du site (cookies essentiels) et mesurer anonymement notre audience (ex: Google Analytics).
                                </p>
                                <p>
                                    Vous pouvez à tout moment modifier vos préférences via notre bannière de gestion des cookies ou en configurant votre navigateur.
                                </p>
                            </section>
                        </div>

                        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                            <p className="text-gray-400 text-sm m-0">
                                Mise à jour : <strong>Mars 2026</strong>
                            </p>
                            <p className="text-gray-400 text-sm m-0">
                                Litus Agency
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
