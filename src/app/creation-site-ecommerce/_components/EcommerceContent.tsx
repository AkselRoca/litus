import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BarChart3, Boxes, Check, ChevronDown, Code2, CreditCard, GraduationCap, Layers3, Plug, Search, ShoppingBag, Smartphone, Truck } from 'lucide-react'
import { BusinessSectionHeading, ServiceReveal } from '@/components/sections/services/BusinessService'
import { EcommerceJourney, EcommerceOperations } from './EcommerceModules'
import { ecommerceContactHref, ecommerceFaq } from '../ecommerce-content'
import '../ecommerce.css'

const features = [
  { icon: Boxes, title: 'Un catalogue bien organisé', text: 'Produits, collections, variantes et filtres : une structure qui aide à trouver le bon article et vous simplifie la gestion.' },
  { icon: CreditCard, title: 'Un paiement sans détour', text: 'Un panier compréhensible, des frais visibles et des moyens de paiement adaptés à vos clients et à votre plateforme.' },
  { icon: Truck, title: 'Une livraison bien préparée', text: 'Zones, tarifs, seuils de gratuité et options de retrait : nous traduisons vos règles commerciales dans la boutique.' },
  { icon: Search, title: 'Des produits prêts pour Google', text: 'Collections, fiches, images et balises travaillées. Lors d’une refonte, les anciennes adresses sont prises en compte.' },
  { icon: Plug, title: 'Des outils qui se parlent', text: 'Stocks, facturation, CRM ou emailing : les connexions utiles sont définies avec vous, selon les API et applications disponibles.' },
  { icon: GraduationCap, title: 'Une équipe autonome', text: 'Vous apprenez à ajouter un produit, préparer une commande et lancer une promotion. Nous restons disponibles pour la suite.' },
]

export function EcommerceContent() {
  return <div className="business-service ec-page"><div className="business-content">
    <section className="ec-platform-strip" aria-label="Nos plateformes e-commerce">
      <div className="business-container ec-platform-inner">
        <p>Des plateformes solides.<br /><strong>Une vraie expertise e-commerce.</strong></p>
        <a href="#shopify" className="ec-platform-brand" aria-label="Découvrir notre expertise Shopify"><Image className="ec-shopify-wordmark" src="/brands/shopify-wordmark.svg" width={140} height={40} alt="Shopify" /><ArrowRight aria-hidden="true" /></a>
        <a href="#woocommerce" className="ec-platform-brand" aria-label="Découvrir notre expertise WooCommerce"><Image src="/brands/woocommerce-official.svg" width={92} height={24} alt="WooCommerce" /><span>sur WordPress</span><ArrowRight aria-hidden="true" /></a>
        <span className="ec-platform-note">Création · Refonte · Accompagnement</span>
      </div>
    </section>

    <section id="shopify" className="business-section ec-shopify-section" aria-labelledby="ec-shopify-title">
      <div className="business-container business-split ec-shopify-grid">
        <div className="business-copy">
          <p className="business-kicker">Notre expertise Shopify</p>
          <h2 id="ec-shopify-title">Vos produits ont une histoire.<br /><em>Donnons-leur la bonne boutique.</em></h2>
          <p>Shopify est au cœur de notre accompagnement e-commerce. Nous construisons une boutique à votre image, avec un catalogue clair, un parcours mobile soigné et une gestion accessible à votre équipe.</p>
          <p>Du thème personnalisé aux développements Liquid, nous choisissons ce qui sert réellement votre marque. L’objectif : une boutique où l’on aime acheter, simple à faire vivre et capable d’évoluer avec votre activité.</p>
          <ul className="business-check-list">
            <li><Check aria-hidden="true" /><span><strong>Votre marque, jusque dans les détails.</strong> Design, navigation et fiches produits conçus ensemble.</span></li>
            <li><Check aria-hidden="true" /><span><strong>Un lancement préparé.</strong> Catalogue, paiements, livraison et commandes de test.</span></li>
            <li><Check aria-hidden="true" /><span><strong>Des choix durables.</strong> Des applications sélectionnées pour leur utilité et leur coût.</span></li>
          </ul>
          <Link className="site-cta-primary" href={ecommerceContactHref}>Parlons de votre boutique Shopify<ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        <ServiceReveal className="ec-shopify-media">
          <figure className="ec-editor-image"><Image src="/ecommerce/shopify-storefront.png" width={808} height={1020} sizes="(max-width: 550px) 100vw, 480px" alt="Exemple du thème Tinker de Shopify, avec présentation de produits et catalogue" /><figcaption>Du design à la vente · Visuel Shopify</figcaption></figure>
          <div className="ec-media-note"><span className="business-icon"><ShoppingBag aria-hidden="true" /></span><div><strong>Une boutique à votre image.</strong><p>Un outil que votre équipe sait utiliser.</p></div></div>
        </ServiceReveal>
      </div>
    </section>

    <section className="business-section ec-journey-section" id="parcours-achat" aria-labelledby="ec-journey-title">
      <div className="business-container business-split">
        <div className="business-copy">
          <p className="business-kicker">L’expérience d’achat, dans les détails</p>
          <h2 id="ec-journey-title">Donner envie.<br />Rassurer.<br /><em>Faciliter l’achat.</em></h2>
          <p>Une belle boutique doit aussi répondre aux bonnes questions. Que vais-je recevoir ? Quel est le prix total ? Comment serai-je livré ? Chaque étape apporte une réponse, au bon moment.</p>
          <ol className="ec-numbered-list">
            <li><span>01</span><div><h3>Un produit qui se comprend</h3><p>Des photos utiles, des variantes claires et des informations complètes.</p></div></li>
            <li><span>02</span><div><h3>Un panier qui rassure</h3><p>Le contenu, le montant et la prochaine étape restent visibles.</p></div></li>
            <li><span>03</span><div><h3>Une commande qui aboutit</h3><p>Un paiement adapté, puis une confirmation et un suivi cohérents.</p></div></li>
          </ol>
        </div>
        <EcommerceJourney />
      </div>
    </section>

    <section className="business-section" aria-labelledby="ec-features-title">
      <div className="business-container">
        <BusinessSectionHeading eyebrow="La boutique, de bout en bout" id="ec-features-title" description="Nous travaillons le parcours client et ce qui se passe après la vente. Le périmètre est défini selon votre catalogue, vos habitudes et vos ambitions.">Tout ce qui fait tourner<br /><em>votre e-commerce.</em></BusinessSectionHeading>
        <ServiceReveal className="ec-features-grid">{features.map(({ icon: Icon, title, text }) => <article key={title} className="ec-feature"><span className="business-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></article>)}</ServiceReveal>
      </div>
    </section>

    <section className="business-section ec-operations-section" id="pilotage-boutique" aria-labelledby="ec-operations-title">
      <div className="business-container">
        <BusinessSectionHeading eyebrow="Le commerce, au quotidien" id="ec-operations-title" description="Retrouver vos commandes, connaître vos stocks et suivre vos ventes : Shopify rassemble ces informations. Nous préparons les réglages et les connexions qui rendent ce pilotage utile à votre équipe.">Vous développez votre activité.<br /><em>Votre boutique suit le mouvement.</em></BusinessSectionHeading>
        <div className="ec-operations-grid">
          <figure className="ec-admin-media"><Image src="/ecommerce/shopify-commerce.png" width={1854} height={1041} sizes="(max-width: 950px) 100vw, 53vw" alt="L’interface Shopify sur mobile et montre connectée : commandes, ventes et tableaux de bord" /><figcaption><Smartphone size={18} aria-hidden="true" /><div><strong>Votre activité, à portée de main.</strong><span>Interface et données d’illustration fournies par Shopify.</span></div></figcaption></figure>
          <EcommerceOperations />
        </div>
        <div className="ec-operations-bottom"><p>Une nouvelle commande peut aussi alimenter vos autres outils, avec des règles et des contrôles définis.</p><Link href="/automatisation" className="business-text-link">Découvrir nos automatisations<ArrowRight size={17} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <section className="business-section ec-woo-section" id="woocommerce" aria-labelledby="ec-woo-title">
      <div className="business-container business-split">
        <div className="ec-woo-card">
          <div className="ec-woo-brand"><Image src="/brands/woocommerce-official.svg" alt="WooCommerce" width={150} height={39} /><span>+ WordPress</span></div>
          <p className="ec-woo-intro">Un environnement ouvert,<br /><strong>adapté à votre projet.</strong></p>
          <ul className="ec-woo-capabilities"><li><Layers3 aria-hidden="true" /><span>Contenus & catalogue réunis</span></li><li><Code2 aria-hidden="true" /><span>Personnalisation du parcours</span></li><li><Plug aria-hidden="true" /><span>Extensions & connexions métier</span></li></ul>
          <p className="ec-platform-detail">Hébergement, mises à jour et maintenance sont prévus dans l’organisation du projet.</p>
        </div>
        <div className="business-copy">
          <p className="business-kicker">Aussi experts de votre environnement</p>
          <h2 id="ec-woo-title">Déjà sur WordPress ?<br /><em>Il y a WooCommerce.</em></h2>
          <p>Votre site repose sur WordPress, votre contenu occupe une place importante ou votre projet demande des adaptations spécifiques ? WooCommerce peut être la bonne base pour votre boutique.</p>
          <p>Nous concevons le parcours, choisissons les extensions nécessaires et préparons un environnement suivi. Vous bénéficiez d’un interlocuteur pour le design, le développement et la maintenance.</p>
          <details className="ec-platform-choice"><summary>Shopify ou WooCommerce : comment choisir ?<ChevronDown size={17} aria-hidden="true" /></summary><p>Nous comparons votre catalogue, les usages de l’équipe, vos connexions et les coûts sur la durée. Shopify simplifie la gestion de l’infrastructure ; WooCommerce offre la souplesse de WordPress, avec un hébergement et une maintenance à organiser.</p></details>
          <Link href={ecommerceContactHref} className="business-text-link">Choisissons la bonne plateforme<ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>

    <section className="business-section ec-case-section" aria-labelledby="ec-case-title">
      <div className="business-container ec-case-grid">
        <div className="business-copy">
          <p className="business-kicker">Une boutique réalisée par Litus</p>
          <h2 id="ec-case-title">Japan Hunter.<br /><em>Un univers, une boutique.</em></h2>
          <p>Une boutique Shopify sur mesure, avec une expérience mobile travaillée et des fondations SEO. Un projet qui réunit identité de marque, développement Liquid et suivi du parcours d’achat.</p>
          <ul className="ec-case-tags"><li>Shopify & Liquid</li><li>UX mobile</li><li>SEO & mesure</li></ul>
          <Link href="/realisations/japan-hunter" className="site-cta-primary">Découvrir ce projet<ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link href="/realisations" className="business-text-link">Voir toutes nos réalisations<ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <Link href="/realisations/japan-hunter" className="ec-case-image" aria-label="Voir la réalisation Japan Hunter"><div className="ec-browser-bar"><span /><span /><span /><small>Japan Hunter · Shopify</small><ArrowUpRight size={16} aria-hidden="true" /></div><Image src="/realisations/japan hunter boutique en ligne crée par litus agence web.jpg" alt="Aperçu de la boutique en ligne Japan Hunter créée par Litus" width={1920} height={1080} sizes="(max-width: 850px) 100vw, 52vw" /></Link>
      </div>
    </section>

    <section className="business-section" id="methode-ecommerce" aria-labelledby="ec-method-title">
      <div className="business-container">
        <BusinessSectionHeading eyebrow="Notre méthode" id="ec-method-title" description="Un périmètre clair, des validations ensemble et des tests avant la mise en ligne. Vous savez ce qui se prépare et ce qu’il reste à décider.">Du premier échange<br /><em>aux premières commandes.</em></BusinessSectionHeading>
        <ServiceReveal className="ec-method-grid">{[
          { title: 'Cadrer votre commerce', text: 'Votre offre, vos clients, votre catalogue et vos outils. Nous choisissons la plateforme et posons le budget.', result: 'Une feuille de route.' },
          { title: 'Dessiner le parcours', text: 'Navigation, collections et fiches produits. Une maquette à votre image, pensée d’abord pour vos acheteurs.', result: 'Un design validé ensemble.' },
          { title: 'Construire & tester', text: 'Catalogue, paiements, livraison et connexions. Nous testons les commandes et les cas particuliers.', result: 'Une boutique prête à lancer.' },
          { title: 'Lancer & accompagner', text: 'Mise en ligne, formation et suivi convenu. Nous identifions les ajustements et les prochaines priorités.', result: 'Une équipe qui sait piloter.' },
        ].map(({ title, text, result }, index) => <article key={title}><span className="ec-method-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p><strong><Check size={15} aria-hidden="true" />{result}</strong></article>)}</ServiceReveal>
        <div className="ec-growth-links"><span><BarChart3 aria-hidden="true" /><strong>Et pour attirer vos futurs clients ?</strong></span><Link href="/referencement-naturel">Référencement naturel<ArrowUpRight size={16} aria-hidden="true" /></Link><Link href="/google-ads">Campagnes Google Ads<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <section className="business-section business-section-warm" id="faq" aria-labelledby="ec-faq-title">
      <div className="business-container"><BusinessSectionHeading eyebrow="Vos questions, nos réponses" id="ec-faq-title">Votre projet e-commerce,<br /><em>avec les bons repères.</em></BusinessSectionHeading><div className="business-faq">{ecommerceFaq.map(({ question, answer }) => <details key={question}><summary>{question}<ChevronDown size={17} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div>
    </section>

    <section className="business-section ec-final-section" id="tarifs" aria-labelledby="ec-contact-title">
      <div className="business-container business-final"><div><p className="business-kicker">Création ou refonte de boutique</p><h2 id="ec-contact-title">Votre prochain chapitre<br /><em>commence par votre boutique.</em></h2><p>Parlez-nous de vos produits, de votre site actuel et de vos objectifs. Nous vous proposons une direction claire et un devis qui distingue la réalisation des coûts de plateforme et de fonctionnement.</p></div><div className="business-final-actions"><Link href={ecommerceContactHref} className="site-cta-primary">Parlons de votre boutique<ArrowRight size={18} aria-hidden="true" /></Link><span>Premier échange gratuit · Devis sur mesure</span><a href="tel:+33744985521">07 44 98 55 21</a></div></div>
    </section>
  </div></div>
}
