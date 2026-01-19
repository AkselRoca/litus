import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mentions Légales | Litus',
    description: 'Mentions légales de Litus, agence web à Lorient et Le Mans.',
    robots: { index: true, follow: true },
}

export default function MentionsLegalesPage() {
    return (
        <div className="py-20 bg-white dark:bg-dark">
            <div className="container-fluid">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Éditeur du site</h2>
                            <p>
                                <strong>Litus</strong><br />
                                Agence Web<br />
                                Lorient (56) & Le Mans (72)<br />
                                France
                            </p>
                            <p>
                                Email : contact@litus.fr<br />
                                Téléphone : 02 97 00 00 00
                            </p>
                            <p>
                                SIRET : [À compléter]<br />
                                TVA Intracommunautaire : [À compléter]
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Directeur de la publication</h2>
                            <p>
                                Aksel [Nom], Gérant
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Hébergement</h2>
                            <p>
                                Ce site est hébergé par :<br />
                                <strong>Vercel Inc.</strong><br />
                                440 N Barranca Ave #4133<br />
                                Covina, CA 91723<br />
                                États-Unis
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Propriété intellectuelle</h2>
                            <p>
                                L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.)
                                est la propriété exclusive de Litus, à l'exception des marques, logos ou contenus
                                appartenant à d'autres sociétés partenaires ou auteurs.
                            </p>
                            <p>
                                Toute reproduction, distribution, modification, adaptation, retransmission ou publication,
                                même partielle, de ces différents éléments est strictement interdite sans l'accord
                                express par écrit de Litus.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Limitation de responsabilité</h2>
                            <p>
                                Les informations contenues sur ce site sont aussi précises que possible et le site
                                est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes,
                                des omissions ou des lacunes.
                            </p>
                            <p>
                                Litus ne pourra être tenu responsable des dommages directs et indirects causés au
                                matériel de l'utilisateur, lors de l'accès au site.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Droit applicable</h2>
                            <p>
                                Le présent site et les mentions légales qui y figurent sont régis par le droit français.
                                En cas de litige, les tribunaux français seront seuls compétents.
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
