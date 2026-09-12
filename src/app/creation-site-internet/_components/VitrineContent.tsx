import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, BarChart3, Check, CheckCheck, ChevronDown, Clock3, Code2, Eye, FileCheck2, Globe2, MapPin, MessageCircle, Monitor, MousePointerClick, Phone, Search, Send, ShieldCheck, Sparkles, Star, UsersRound } from 'lucide-react'
import { VitrineGrowthDemos } from './VitrineGrowthDemos'
import { VitrineJourney } from './VitrineJourney'
import { VitrineContactForm } from './VitrineContactForm'
import './vitrine-content.css'

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="vitrine-kicker"><span aria-hidden="true" />{children}</p>
}

function Action({ children, href, secondary = false }: { children: ReactNode; href: string; secondary?: boolean }) {
  return <Link href={href} className={secondary ? 'site-cta-secondary' : 'site-cta-primary'}>{children}<ArrowRight size={17} aria-hidden="true" /></Link>
}

const problems = [
  { icon: Eye, title: 'Vous n’êtes pas visible sur Google', text: 'Vos concurrents apparaissent avant vous sur les recherches de vos futurs clients.', color: 'blue' },
  { icon: Monitor, title: 'Votre design ne vous ressemble plus', text: 'Votre site ne reflète plus la qualité de votre travail. La première impression en pâtit.', color: 'orange' },
  { icon: UsersRound, title: 'Vos visiteurs ne vous contactent pas', text: 'Ils consultent vos pages, mais ne trouvent pas de raison claire de passer à l’action.', color: 'orange' },
  { icon: BarChart3, title: 'Vous dépendez du bouche-à-oreille', text: 'Un excellent début, mais un seul canal ne suffit pas toujours pour développer votre activité.', color: 'blue' },
]

const faqs = [
  { question: 'Combien de temps faut-il pour créer mon site ?', answer: 'Le calendrier dépend du nombre de pages, des contenus disponibles et des fonctionnalités. Nous le définissons dès le premier échange, avec des étapes de validation claires. Vous savez ce qui est prévu et quand votre site pourra être mis en ligne.' },
  { question: 'Puis-je modifier mon site moi-même ?', answer: 'Oui. Nous vous accompagnons dans la prise en main pour faire évoluer vos textes et vos images. Avec la formule mensuelle, vous pouvez aussi nous confier ces modifications : elles font partie de l’accompagnement.' },
  { question: 'Le référencement est-il inclus ?', answer: <>Les bases techniques du SEO font partie de la création : structure des pages, rapidité, version mobile et balises. Pour développer votre visibilité dans la durée, nous proposons également un <Link href="/seo-local">accompagnement en référencement naturel</Link> adapté à votre marché.</> },
  { question: 'Que comprend la formule à 99 € par mois ?', answer: 'La création d’un site vitrine professionnel et responsive, le formulaire de contact, les bases SEO, l’hébergement, la maintenance, un reporting trimestriel ainsi que de petites modifications et des ajustements SEO légers chaque trimestre. Le périmètre et la durée sont précisés dans la proposition.' },
  { question: 'Proposez-vous aussi des sites e-commerce ?', answer: <>Oui. Si vous souhaitez vendre en ligne, découvrez notre offre de <Link href="/creation-site-ecommerce">création de boutiques e-commerce</Link>. Nous vous aidons à choisir une solution adaptée à votre catalogue, à vos paiements et à votre organisation.</> },
  { question: 'Comment démarrer un projet avec vous ?', answer: <>Décrivez votre activité et votre besoin dans le <a href="#parlons-de-votre-site">formulaire ci-dessous</a>, ou appelez le <a href="tel:+33744985521">07 44 98 55 21</a>. Nous faisons le point ensemble, puis vous recevez une proposition claire. Le premier échange est gratuit et sans engagement.</> },
]

export function VitrineContent() {
  return <div className="vitrine-content">
    <section id="votre-site" className="vitrine-section vitrine-value-section" aria-labelledby="vitrine-value-title">
      <div className="vitrine-container">
        <div className="vitrine-heading vitrine-heading-center">
          <Eyebrow>Plus qu’un site, un véritable moteur de croissance</Eyebrow>
          <h2 id="vitrine-value-title">Un site qui doit vous rapporter des clients,<br className="vitrine-wide-break" /> <em>pas simplement être joli.</em></h2>
          <p>Nous concevons des sites pensés pour être trouvés sur Google et transformer vos visiteurs en prospects.</p>
        </div>
        <VitrineGrowthDemos />
      </div>
    </section>

    <section id="refonte" className="vitrine-section vitrine-problems-section" aria-labelledby="vitrine-problems-title">
      <div className="vitrine-container">
        <div className="vitrine-heading vitrine-heading-row">
          <div><Eyebrow>Des problèmes qui coûtent des clients</Eyebrow><h2 id="vitrine-problems-title">Votre site vous fait-il <em>perdre des clients ?</em></h2><p>Un site mal optimisé ou dépassé peut faire fuir vos futurs clients sans que vous le sachiez.<br />Voici les problèmes que nous rencontrons le plus souvent.</p></div>
          <Action href="/contact" secondary>Faire analyser mon site</Action>
        </div>
        <div className="vitrine-problems-grid">{problems.map(({ icon: Icon, title, text, color }) => <article className={`vitrine-problem vitrine-tone-${color}`} key={title}><Icon size={26} strokeWidth={1.7} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>

    <section className="vitrine-section vitrine-case-section" aria-labelledby="vitrine-case-title">
      <div className="vitrine-container">
        <div className="vitrine-heading"><Eyebrow>Réalisations concrètes, résultats mesurables</Eyebrow><h2 id="vitrine-case-title">Des sites qui produisent <em>de vrais résultats.</em></h2></div>
        <div className="vitrine-case-grid">
          <div className="vitrine-case-copy"><span className="vitrine-case-sector">Paysagisme · Morbihan</span><h3>West Clôtures & Paysage</h3><p>Un site repensé pour valoriser le savoir-faire, un référencement local travaillé et des campagnes Google Ads pour générer des demandes de chantiers.</p>
            <dl className="vitrine-case-facts"><div><dt>Site</dt><dd>un parcours pensé<br />pour les demandes de devis</dd></div><div><dt>SEO + Ads</dt><dd>deux leviers<br />d’acquisition</dd></div><div><dt>56</dt><dd>un ciblage précis<br />dans le Morbihan</dd></div></dl>
            <Action href="/realisations/west-clotures-paysage">Voir l’étude de cas</Action>
            <p className="vitrine-case-note">Création, visibilité et acquisition réunies dans un même projet.</p>
          </div>
          <Link href="/realisations/west-clotures-paysage" className="vitrine-case-visual" aria-label="Découvrir le projet West Clôtures & Paysage">
            <Image src="/realisations/west-workspace-wide.webp" alt="Le site West Clôtures & Paysage présenté sur un ordinateur portable" width={1792} height={768} sizes="(max-width: 850px) 100vw, 57vw" />
            <span className="vitrine-case-caption"><span><Globe2 size={16} />Un projet local. Une présence plus forte.</span><ArrowUpRight size={18} /></span>
          </Link>
        </div>
      </div>
    </section>

    <section id="landing-pages" className="vitrine-section vitrine-journey-section" aria-labelledby="vitrine-journey-title">
      <div className="vitrine-container">
        <div className="vitrine-heading"><Eyebrow>Un parcours qui rapproche vos clients de vous</Eyebrow><h2 id="vitrine-journey-title">Votre site devient <em>votre meilleur commercial.</em></h2><p>Site vitrine ou landing page : chaque étape est pensée pour attirer, convaincre et faciliter le contact.</p></div>
        <VitrineJourney />
        <div className="vitrine-journey-benefits">{[
          { icon: Clock3, title: 'Visible 24 h/24', text: 'Même quand vous êtes sur le terrain.' },
          { icon: Search, title: 'Pensé pour Google', text: 'Des fondations SEO durables.' },
          { icon: MousePointerClick, title: 'Optimisé pour convertir', text: 'Un parcours sans détour.' },
          { icon: BarChart3, title: 'Des résultats suivis', text: 'Des indicateurs clairs et utiles.' },
        ].map(({icon: Icon, title, text}) => <div key={title}><span><Icon size={21} aria-hidden="true" /></span><p><strong>{title}</strong><small>{text}</small></p></div>)}</div>
      </div>
    </section>

    <section id="notre-methode" className="vitrine-section vitrine-method-section" aria-labelledby="vitrine-method-title">
      <div className="vitrine-container">
        <div className="vitrine-heading"><Eyebrow>Une méthode simple et efficace</Eyebrow><h2 id="vitrine-method-title">Vous nous confiez votre objectif.<br className="vitrine-mobile-break" /> <em>On gère le reste.</em></h2><p>Un interlocuteur, un calendrier clair et des validations ensemble à chaque étape.</p></div>
        <ol className="vitrine-method-grid">
          <li><div className="vitrine-method-head"><span>01</span><div><h3>Audit & stratégie</h3><p>Votre activité, vos concurrents et les attentes de vos futurs clients.</p></div></div><ul className="vitrine-method-checks"><li><Check />Analyse de votre marché</li><li><Check />Recherche de mots-clés</li><li><Check />Un plan d’action partagé</li></ul></li>
          <li><div className="vitrine-method-head"><span>02</span><div><h3>Design sur mesure</h3><p>Une maquette à votre image, validée ensemble avant de construire.</p></div></div><div className="vitrine-method-design"><span><i /><i /><i /><b>Votre futur site</b></span><Image src="/realisations/Demetis-website.webp" alt="Exemple de direction graphique du site Demetis Immobilier" width={350} height={160} sizes="(max-width: 560px) 80vw, 260px" /></div></li>
          <li><div className="vitrine-method-head"><span>03</span><div><h3>Création & référencement</h3><p>Développement, contenus, vitesse et SEO : des bases solides.</p></div></div><div className="vitrine-method-code" aria-hidden="true"><span><Code2 size={15} />votre-site.html</span><code><i>&lt;main&gt;</i><br />&nbsp; &lt;h1&gt;<b>Votre savoir-faire</b>&lt;/h1&gt;<br />&nbsp; &lt;section&gt;<b>Vos projets</b>&lt;/section&gt;<br /><i>&lt;/main&gt;</i></code><span><Check size={12} />Rapide <Check size={12} />Accessible <Check size={12} />SEO</span></div></li>
          <li><div className="vitrine-method-head"><span>04</span><div><h3>Mise en ligne & suivi</h3><p>Votre site est lancé. Nous restons à vos côtés pour le faire évoluer.</p></div></div><div className="vitrine-method-launch"><span><Send size={27} strokeWidth={1.6} aria-hidden="true" /></span><strong><Check size={14} />Votre site est en ligne !</strong><small>Et l’accompagnement continue.</small></div></li>
        </ol>
      </div>
    </section>

    <section className="vitrine-section vitrine-team-section" aria-labelledby="vitrine-team-title">
      <div className="vitrine-container">
        <div className="vitrine-heading"><Eyebrow>Une équipe à taille humaine</Eyebrow><h2 id="vitrine-team-title">Une équipe <em>à vos côtés.</em></h2><p>Deux experts, un objectif : la réussite de votre projet. Vous échangez directement avec nous,<br className="vitrine-wide-break" /> pour un suivi personnalisé et une relation de confiance.</p></div>
        <div className="vitrine-team-grid">
          <div className="vitrine-team-people"><div className="vitrine-team-portraits"><Image src="/team/portrait-clair.png" alt="Un membre de l’équipe Litus, photographie originale" width={112} height={128} /><Image src="/team/portrait-brun.png" alt="Un membre de l’équipe Litus, photographie originale" width={112} height={128} /></div><div className="vitrine-team-names"><div><h3>Arthur</h3><p>SEO & création<br />de sites sur mesure</p></div><div><h3>Aksel</h3><p>Google, création web<br />& e-commerce</p></div></div><Link href="/a-propos">Rencontrer l’équipe<ArrowUpRight size={15} /></Link></div>
          <div className="vitrine-team-proof"><Image src="/brands/google-color.svg" alt="Google" width={26} height={26} /><strong>5/5 sur Google</strong><span className="vitrine-stars" aria-label="5 étoiles sur 5">{Array.from({length: 5}, (_, i) => <Star key={i} size={16} fill="currentColor" aria-hidden="true" />)}</span><p>Une relation de confiance se construit avec de l’écoute, des échanges simples et un travail soigné.</p><span className="vitrine-team-local"><MapPin size={14} />Lorient & Le Mans</span></div>
          <ul className="vitrine-team-checks"><li><CheckCheck />Un lien direct avec les fondateurs</li><li><CheckCheck />Des conseils honnêtes et transparents</li><li><CheckCheck />Des choix adaptés à votre activité</li><li><CheckCheck />Un suivi bien après la mise en ligne</li></ul>
        </div>
      </div>
    </section>

    <section id="tarifs" className="vitrine-section vitrine-pricing-section" aria-labelledby="vitrine-pricing-title">
      <div className="vitrine-container"><div className="vitrine-heading vitrine-heading-row"><div><Eyebrow>Des offres adaptées à vos besoins</Eyebrow><h2 id="vitrine-pricing-title">Deux façons de lancer <em>votre nouveau site.</em></h2></div><Link href="/tarifs" className="vitrine-text-link">Tous nos tarifs<ArrowRight size={16} /></Link></div>
        <div className="vitrine-pricing-grid">
          <article className="vitrine-price-card"><div className="vitrine-price-heading"><span>Pour se lancer sereinement</span><Monitor size={25} aria-hidden="true" /></div><h3>À partir de <strong>99 €</strong><span> / mois</span></h3><p>Un site vitrine professionnel pour présenter votre activité, générer des contacts et rester suivi dans le temps.</p><ul>{['Design responsive', 'Formulaire de contact', 'Bases SEO', 'Hébergement & maintenance', 'Reporting trimestriel', 'Petites modifications trimestrielles'].map(item => <li key={item}><Check size={15} />{item}</li>)}</ul><div className="vitrine-price-bottom"><span>Périmètre et durée précisés au devis</span><Action href="#parlons-de-votre-site" secondary>Commençons votre projet</Action></div></article>
          <article className="vitrine-price-card vitrine-price-custom"><div className="vitrine-price-heading"><span>Pour aller plus loin</span><Sparkles size={24} aria-hidden="true" /></div><h3>Votre projet <strong>sur mesure.</strong></h3><p>Une présence qui accompagne vos ambitions, avec les fonctionnalités dont vous avez réellement besoin.</p><ul>{['Site vitrine multipage', 'Fonctionnalités métier', 'Réservation en ligne', 'Stratégie SEO & acquisition', 'Espace client', 'Intégrations sur mesure'].map(item => <li key={item}><Check size={15} />{item}</li>)}</ul><div className="vitrine-price-bottom"><span>Un devis clair, adapté à votre projet</span><Action href="#parlons-de-votre-site">Discutons de votre projet</Action></div></article>
        </div>
      </div>
    </section>

    <section id="questions-frequentes" className="vitrine-section vitrine-faq-section" aria-labelledby="vitrine-faq-title">
      <div className="vitrine-container"><div className="vitrine-heading"><Eyebrow>Vos questions, nos réponses</Eyebrow><h2 id="vitrine-faq-title">Questions fréquentes<span>.</span></h2></div><div className="vitrine-faq-grid">{faqs.map(({question,answer}) => <details key={question} className="vitrine-faq"><summary><span>{question}</span><ChevronDown size={17} aria-hidden="true" /></summary><div><p>{answer}</p></div></details>)}</div></div>
    </section>

    <section id="parlons-de-votre-site" className="vitrine-section vitrine-contact-section" aria-labelledby="vitrine-contact-title">
      <div className="vitrine-container vitrine-contact-grid"><div className="vitrine-contact-copy"><div className="vitrine-heading"><Eyebrow>Prêt à passer à l’action ?</Eyebrow><h2 id="vitrine-contact-title">Parlons de<br /><em>votre futur site.</em></h2><p>Expliquez-nous votre activité et vos objectifs. Nous vous recontactons avec une première recommandation, concrète et adaptée.</p></div><ul className="vitrine-contact-benefits"><li><Clock3 />Réponse sous 24 h ouvrées</li><li><FileCheck2 />Devis clair et transparent</li><li><MessageCircle />Premier échange gratuit</li><li><ShieldCheck />Aucun engagement</li></ul><a className="vitrine-contact-phone" href="tel:+33744985521"><Phone size={20} /><span><small>Vous préférez en parler de vive voix ?</small><strong>07 44 98 55 21</strong></span><ArrowUpRight size={18} /></a></div><VitrineContactForm /></div>
    </section>
  </div>
}

