import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Politique de Confidentialité | Litus',
    description: 'Politique de confidentialité et protection des données personnelles de Litus.',
    robots: { index: true, follow: true },
}

export default function PolitiqueConfidentialitePage() {
    return (
        <div className="py-20 bg-white dark:bg-dark">
            <div className="container-fluid">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                            <p>
                                Litus s'engage à protéger la vie privée des utilisateurs de son site.
                                Cette politique de confidentialité explique comment nous collectons,
                                utilisons et protégeons vos données personnelles.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Données collectées</h2>
                            <p>Nous pouvons collecter les informations suivantes :</p>
                            <ul>
                                <li>Nom et prénom</li>
                                <li>Adresse email</li>
                                <li>Numéro de téléphone</li>
                                <li>Nom de l'entreprise</li>
                                <li>Informations de navigation (cookies)</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Utilisation des données</h2>
                            <p>Vos données sont utilisées pour :</p>
                            <ul>
                                <li>Répondre à vos demandes de contact ou de devis</li>
                                <li>Vous envoyer des informations sur nos services (avec votre consentement)</li>
                                <li>Améliorer notre site et nos services</li>
                                <li>Respecter nos obligations légales</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Base légale du traitement</h2>
                            <p>
                                Le traitement de vos données repose sur votre consentement explicite
                                (formulaires de contact) ou sur notre intérêt légitime (amélioration du site).
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Conservation des données</h2>
                            <p>
                                Vos données sont conservées pendant une durée maximale de 3 ans à compter
                                de votre dernière interaction avec nous, sauf obligation légale contraire.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Vos droits</h2>
                            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                            <ul>
                                <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
                                <li><strong>Droit de rectification</strong> : corriger vos données</li>
                                <li><strong>Droit à l'effacement</strong> : supprimer vos données</li>
                                <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format lisible</li>
                                <li><strong>Droit d'opposition</strong> : vous opposer au traitement</li>
                            </ul>
                            <p>
                                Pour exercer ces droits, contactez-nous à : <strong>rgpd@litus.fr</strong>
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Cookies</h2>
                            <p>
                                Notre site utilise des cookies pour améliorer votre expérience.
                                Vous pouvez gérer vos préférences via la bannière cookies ou les paramètres de votre navigateur.
                            </p>
                            <p>Types de cookies utilisés :</p>
                            <ul>
                                <li><strong>Essentiels</strong> : nécessaires au fonctionnement du site</li>
                                <li><strong>Analytiques</strong> : mesure d'audience (anonymisés)</li>
                                <li><strong>Marketing</strong> : personnalisation (avec consentement)</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Contact</h2>
                            <p>
                                Pour toute question concernant cette politique, contactez notre DPO :<br />
                                Email : rgpd@litus.fr
                            </p>
                        </section>

                        <p className="text-gray-500 text-sm mt-12">
                            Dernière mise à jour : Janvier 2024
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
