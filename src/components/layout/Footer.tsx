import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  SearchCheck,
  Phone,
  UsersRound,
} from 'lucide-react'
import './footer.css'

const footerColumns = [
  {
    number: '01.', title: 'Nos services',
    links: [
      ['Sites vitrine', '/creation-site-internet'], ['E-commerce', '/creation-site-ecommerce'],
      ['SEO local', '/seo-local'], ['Google Ads', '/google-ads'],
      ['Applications web', '/creation-application-web'], ['Automatisation', '/automatisation'],
      ['Création d’outils IA', '/creation-outils-ia'],
    ],
  },
  {
    number: '02.', title: 'Vous êtes',
    links: [
      ['Artisan', '/artisan'], ['PME', '/pme'], ['Grand compte', '/grands-comptes'],
      ['Collectivité', '/collectivites'], ['Associations', '/association'],
    ],
  },
  {
    number: '03.', title: 'L’agence',
    links: [
      ['À propos', '/a-propos'], ['Agence web Le Mans', '/agence-web-le-mans'],
      ['Agence web Lorient', '/agence-web-lorient'],
      ['Réalisations', '/realisations'], ['Tarifs', '/tarifs'], ['Contact', '/contact'],
    ],
  },
  {
    number: '04.', title: 'Ressources',
    links: [
      ['Checklist GMB', '/ressources/checklist-gmb'], ['Cahier des charges', '/ressources/cahier-des-charges'],
      ['Audit de productivité', '/ressources/audit-productivite'], ['Guides & conseils', '/blog'],
      ['Expertises technologiques', '/expertise'],
    ],
  },
] as const

const socialLinks = [
  { label: 'LinkedIn', icon: Linkedin, href: 'https://fr.linkedin.com/company/litus-agency' },
  { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/litusagence' },
] as const

const reassurance = [
  { icon: BarChart3, title: 'Des sites performants', detail: 'Pensés pour vos résultats' },
  { icon: UsersRound, title: 'Un accompagnement humain', detail: 'Réactif et sur le long terme' },
  { icon: MapPin, title: 'Une expertise locale', detail: 'Lorient, Le Mans et toute la France' },
  { icon: SearchCheck, title: 'Expertise acquisition', detail: 'SEO local & Google Ads' },
]

export function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="site-footer-shell">
        <div className="site-footer-main">
          <section className="footer-identity" aria-label="Litus">
            <Link href="/" className="footer-brand" aria-label="Litus — Accueil">
              <span className="footer-logo-mark" aria-hidden="true" />
              <strong>Litus<span>.</span></strong>
            </Link>
            <p className="footer-signature">Des sites performants pour les entreprises d’aujourd’hui et de demain.</p>
            <p className="footer-description">Agence web locale à Lorient & Le Mans. Sites web, SEO local, Google Ads et accompagnement sur mesure pour développer votre visibilité.</p>

            <address className="footer-contact-list">
              <p><MapPin aria-hidden="true" /><span>Lorient (56) & Le Mans (72)</span></p>
              <p><Phone aria-hidden="true" /><a href="tel:+33744985521">07 44 98 55 21</a></p>
              <p><Mail aria-hidden="true" /><a href="mailto:litusagency@gmail.com">litusagency@gmail.com</a></p>
            </address>

            <div className="footer-socials" aria-label="Réseaux sociaux">
              {socialLinks.map(item => {
                const Icon = item.icon
                return (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}><Icon aria-hidden="true" /></a>
                )
              })}
            </div>
          </section>

          <nav className="footer-nav-grid" aria-label="Navigation du pied de page">
            {footerColumns.map(column => (
              <section className="footer-nav-column" key={column.number}>
                <p className="footer-column-number">{column.number}</p>
                <div className="seo-nav-title">{column.title}</div>
                <ul>
                  {column.links.map(([label, href]) => (
                    <li key={label}><Link href={href}><span>{label}</span><ChevronRight aria-hidden="true" /></Link></li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>

          <aside className="footer-cta" aria-labelledby="footer-cta-title">
            <span className="footer-cta-mark" aria-hidden="true" />
            <p className="footer-cta-label">UN PROJET ?</p>
            <div className="seo-nav-title" id="footer-cta-title">Parlons de vos <span>objectifs.</span></div>
            <p>Un échange de 15 minutes pour comprendre vos besoins et vous conseiller.</p>
            <Link href="/contact?objet=rendez-vous" className="footer-cta-button">Prendre rendez-vous <ArrowRight aria-hidden="true" /></Link>
            <Link href="/contact" className="footer-cta-link">Nous contacter directement <ArrowRight aria-hidden="true" /></Link>
          </aside>
        </div>

        <ul className="footer-reassurance" aria-label="Les engagements Litus">
          {reassurance.map(item => {
            const Icon = item.icon
            return <li key={item.title}><span className="footer-reassurance-icon"><Icon aria-hidden="true" /></span><span><strong>{item.title}</strong><small>{item.detail}</small></span></li>
          })}
        </ul>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>© 2026 Litus. Tous droits réservés.</p>
            <small>Conçu et développé en France, pour les entreprises locales.</small>
          <small className="footer-build">Build 1.20.c</small>
          </div>
          <nav className="footer-legal" aria-label="Informations légales">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-confidentialite">Confidentialité</Link>
            <a href="/sitemap.xml">Plan du site</a>
            <Link href="/politique-confidentialite#cookies">Politique de cookies</Link>
          </nav>
          <p className="footer-mission">Faire grandir les entreprises locales.<span aria-hidden="true" /></p>
        </div>
      </div>
    </footer>
  )
}
