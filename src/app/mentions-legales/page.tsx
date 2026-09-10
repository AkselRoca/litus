import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site litus.fr, édité par Aksel Roca et Arthur Geveaux.',
  alternates: { canonical: '/mentions-legales' },
  robots: { index: true, follow: true },
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2] px-5 pb-24 pt-36 text-[#142238] dark:bg-[#111820] dark:text-[#f7f6f2] md:px-8 md:pt-40">
      <article className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-[#142238]/10 bg-white shadow-[0_24px_70px_rgba(20,34,56,0.07)] dark:border-white/10 dark:bg-[#18212b]">
        <header className="border-b border-[#142238]/10 bg-[radial-gradient(circle_at_top_right,rgba(233,94,42,0.12),transparent_38%)] px-7 py-12 dark:border-white/10 md:px-14 md:py-16">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#c7431b]">Informations juridiques</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Mentions légales</h1>
          <p className="mt-5 text-[15px] text-[#667185] dark:text-[#bac2cd]">En vigueur au 10 septembre 2026</p>
        </header>

        <div className="space-y-12 px-7 py-10 text-[16px] leading-7 text-[#536176] dark:text-[#c7cdd5] md:px-14 md:py-14 md:text-[17px] md:leading-8">
          <p>Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique, les présentes mentions légales informent les utilisateurs du site <strong className="text-[#142238] dark:text-white">litus.fr</strong> de l’identité de ses éditeurs et de ses conditions d’utilisation. La consultation du site implique leur acceptation sans réserve.</p>

          <LegalSection number="01" title="Éditeurs et directeur de la publication">
            <p><strong className="text-[#142238] dark:text-white">Litus est une marque exploitée conjointement par deux entreprises individuelles indépendantes, collaborant dans le cadre d’un partenariat commercial.</strong></p>
            <p>Les coordonnées légales de chacune des deux entreprises individuelles sont indiquées séparément ci-dessous.</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <ContactCard title="Aksel Roca — Litus Agency">
                <p>Entreprise individuelle</p>
                <p>7 rue des Forges<br />56440 Languidic, France</p>
                <p><a href="tel:+33789603321">07 89 60 33 21</a><br /><a href="mailto:aksel@litus.fr">aksel@litus.fr</a><br /><a href="mailto:litusagency@gmail.com">litusagency@gmail.com</a></p>
                <p>TVA non applicable — article 293 B du CGI</p>
              </ContactCard>
              <ContactCard title="Arthur Geveaux">
                <p>Entreprise individuelle</p>
                <p>88 rue du Pô<br />56340 Carnac, France</p>
                <p><a href="tel:+33695403432">06 95 40 34 32</a><br /><a href="mailto:arthur.gev@hotmail.fr">arthur.gev@hotmail.fr</a></p>
                <p>SIRET : 892 401 753 00017<br />TVA non applicable</p>
              </ContactCard>
            </div>
            <p><strong className="text-[#142238] dark:text-white">Directeur de la publication : Arthur Geveaux.</strong></p>
            <h3>Nature de la collaboration</h3>
            <p>Ces entreprises sont juridiquement et financièrement indépendantes. Chacune conserve sa clientèle, ses contrats, sa facturation et sa responsabilité. Leur collaboration ne constitue ni une société de fait, ni un partage de bénéfices, ni une mise en commun permanente de leurs activités.</p>
          </LegalSection>

          <LegalSection number="02" title="Hébergement"><p>Le site est hébergé par <strong className="text-[#142238] dark:text-white">Vercel Inc.</strong>, 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.</p></LegalSection>
          <LegalSection number="03" title="Accès au site"><p>Le site est normalement accessible 7 jours sur 7 et 24 heures sur 24. Son accès peut toutefois être interrompu en cas de force majeure, de maintenance ou de nécessité technique. Les éditeurs ne peuvent être tenus responsables d’une modification, interruption ou suspension du service.</p></LegalSection>
          <LegalSection number="04" title="Données personnelles et cookies">
            <p>Les données transmises au moyen des formulaires sont utilisées pour répondre aux demandes, préparer un devis ou assurer le suivi de la relation commerciale. Les journaux techniques peuvent être conservés par l’hébergeur à des fins de sécurité et de maintenance.</p>
            <p>Le site utilise les stockages et cookies nécessaires à son fonctionnement. Les outils facultatifs de mesure ou de marketing ne sont activés qu’en fonction du choix exprimé dans le bandeau de consentement. Les préférences peuvent être refusées ou configurées lors de la première visite.</p>
            <p>Les modalités de traitement et les droits des utilisateurs sont détaillés dans la <Link href="/politique-confidentialite">politique de confidentialité</Link>.</p>
          </LegalSection>
          <LegalSection number="05" title="Propriété intellectuelle">
            <p>Les textes, créations graphiques, logos, icônes, programmes et autres éléments propres au site sont protégés par le Code de la propriété intellectuelle. Les marques, photographies et contenus appartenant à des partenaires ou à des tiers demeurent la propriété de leurs titulaires respectifs.</p>
            <p>Toute reproduction, diffusion, adaptation, commercialisation ou publication d’un élément propriétaire du site, même partielle, nécessite l’autorisation écrite préalable de l’éditeur concerné. Les contenus issus de banques d’images, de licences libres ou d’outils de création restent soumis aux conditions de leur licence respective.</p>
          </LegalSection>
          <LegalSection number="06" title="Responsabilité">
            <p>Chaque éditeur répond individuellement de ses prestations, contenus et engagements. Toute réclamation liée à une prestation doit être adressée à l’entreprise individuelle identifiée sur le devis, le contrat ou la facture correspondante.</p>
            <p>Les éditeurs s’efforcent de fournir des informations fiables et un site accessible, sans pouvoir garantir l’absence totale d’erreur, d’anomalie ou d’interruption. Ils ne répondent pas du contenu des sites tiers accessibles par des liens externes.</p>
          </LegalSection>
          <LegalSection number="07" title="Droit applicable et règlement des litiges"><p>Les présentes mentions sont soumises au droit français. Les parties s’engagent à rechercher une solution amiable avant toute procédure. À défaut d’accord, le litige relève des juridictions françaises compétentes selon les règles de droit commun.</p></LegalSection>
          <LegalSection number="08" title="Contact et réclamations"><p>Pour toute question relative au site ou aux présentes mentions, contactez l’éditeur concerné aux coordonnées indiquées plus haut ou écrivez à <a href="mailto:contact@litus.fr">contact@litus.fr</a>. Une réclamation écrite doit préciser l’identité et les coordonnées du demandeur, son objet et les éléments nécessaires à son traitement.</p></LegalSection>
          <LegalSection number="09" title="Prestations, facturation et relation contractuelle"><p>Chaque éditeur réalise ses prestations de façon indépendante. Toute commande fait l’objet d’un devis, d’un contrat et d’une facturation émis par l’entreprise individuelle qui réalise la prestation, avec ses propres informations légales. Il n’existe aucune solidarité entre les deux entreprises.</p></LegalSection>
          <LegalSection number="10" title="Modification des mentions légales"><p>Ces mentions peuvent évoluer pour tenir compte des modifications du site, de l’organisation des éditeurs ou du cadre légal. La version publiée sur cette page est celle applicable au jour de la consultation.</p></LegalSection>
        </div>
      </article>
    </main>
  )
}

function LegalSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <section className="border-t border-[#142238]/10 pt-9 first:border-0 first:pt-0 dark:border-white/10 [&_a]:font-medium [&_a]:text-[#c7431b] [&_a]:underline [&_a]:decoration-[#c7431b]/30 [&_a]:underline-offset-4 [&_h3]:mb-2 [&_h3]:mt-7 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#142238] dark:[&_h3]:text-white [&_p+p]:mt-4"><p className="mb-2 text-[12px] font-bold tracking-[0.18em] text-[#e95e2a]">ARTICLE {number}</p><h2 className="mb-5 text-2xl font-semibold tracking-[-0.025em] text-[#142238] dark:text-white md:text-3xl">{title}</h2>{children}</section>
}

function ContactCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-2xl border border-[#142238]/10 bg-[#faf9f6] p-6 dark:border-white/10 dark:bg-white/[0.035] [&_p]:mt-3 [&_p]:text-[15px] [&_p]:leading-6"><h3 className="!mt-0 !text-xl">{title}</h3>{children}</div>
}
