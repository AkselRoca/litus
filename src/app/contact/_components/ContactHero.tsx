import Image from 'next/image'
import { Caveat } from 'next/font/google'
import { ArrowRight, CalendarDays, Leaf, MapPin, Phone, ShieldCheck, Star, UsersRound } from 'lucide-react'
import { ContactRequestForm } from './ContactRequestForm'

const handwriting = Caveat({ preload: false, subsets: ['latin'], weight: '400', display: 'swap', variable: '--font-contact-hand' })
const bookingUrl = 'https://calendar.app.google/wgC3a6rCBy5ADUzn6'
const reviewsUrl = 'https://share.google/lLdX3i6x3tdKbaBCb'
const photoUrl = 'https://unsplash.com/photos/people-collaborating-on-office-laptop-Qx7A7SChpnI'

export function ContactHero({ subject = '', available = true }: { subject?: string; available?: boolean }) {
  return <section className={`contact-reference ${handwriting.variable}`} aria-labelledby="contact-title">
    <div className="contact-reference-container">
      <div className="contact-reference-grid">
        <div className="contact-form-wrap">
          <aside className="contact-handwritten contact-form-note" aria-hidden="true">Des projets<br />qui ont du sens<svg viewBox="0 0 62 72" fill="none"><path d="M45 4c6 23-3 38-31 51m0 0 6-16m-6 16 18-1" /></svg></aside>
          <div className="contact-form-card">
            <div className="contact-form-heading"><div className="contact-form-title">Envoyez-nous votre demande</div><p>Un retour sous 24 h ouvrées. Les champs marqués <span>*</span> sont obligatoires.</p></div>
            {!available && <p className="contact-service-notice" role="status">L’envoi par formulaire est momentanément indisponible. Vous pouvez nous écrire à <a href="mailto:litusagency@gmail.com">litusagency@gmail.com</a> ou nous appeler au <a href="tel:+33744985521">07 44 98 55 21</a>.</p>}
            <ContactRequestForm subject={subject} />
            <ul className="contact-form-reassurance" aria-label="Nos engagements">
              <li><span><ShieldCheck aria-hidden="true" /></span><p><strong>Réponse sous 24 h</strong>par notre équipe</p></li>
              <li><span><UsersRound aria-hidden="true" /></span><p><strong>Échanges</strong>confidentiels</p></li>
              <li><span><Leaf aria-hidden="true" /></span><p><strong>Une équipe basée</strong>en France <i className="contact-french-flag" aria-hidden="true" /></p></li>
            </ul>
          </div>
        </div>
        <div className="contact-reference-stage">
          <div className="contact-reference-copy">
            <p className="contact-location-label">AGENCE WEB · LORIENT & LE MANS</p>
            <h1 id="contact-title">Parlons de votre<br /><span>nouveau projet<svg className="contact-title-rays" viewBox="0 0 38 48" fill="none" aria-hidden="true"><path d="m8 14 17-12M12 25l23-5M13 36l22 7" /></svg></span></h1>
            <p className="contact-reference-intro">Vous avez une idée, un objectif ou un besoin digital ? Nous vous aidons à structurer votre projet et à créer un site web qui attire, convainc et performe.</p>
            <div className="contact-reference-details">
              <div className="contact-details-card">
                <a className="contact-detail" href="tel:+33744985521"><span className="contact-detail-icon"><Phone aria-hidden="true" /></span><span><small>Appelez-nous</small><strong>07 44 98 55 21</strong><span>Lun. – Ven. 9 h – 18 h</span></span></a>
                <div className="contact-detail"><span className="contact-detail-icon"><MapPin aria-hidden="true" /></span><span><small>Nos agences</small><strong>Lorient & Le Mans</strong><span>Sur place ou à distance</span></span></div>
              </div>
              <div className="contact-booking-band"><a className="contact-booking-button" href={bookingUrl} target="_blank" rel="noopener noreferrer"><CalendarDays size={22} aria-hidden="true" /><span>Réserver un appel découverte</span><ArrowRight size={19} aria-hidden="true" /><span className="sr-only"> (nouvel onglet)</span></a><p>30 minutes pour faire le point, sans engagement.</p></div>
            </div>
          </div>
          <div className="contact-reference-visual">
            <figure className="contact-team-photo">
              <Image src="/images/contact/collaboration-equipe-ordinateur-cherrydeck.webp" alt="Trois collègues réunis autour d’un ordinateur portable dans un bureau, photographie d’illustration." width={960} height={1440} sizes="(max-width: 439px) calc(100vw - 72px), (max-width: 760px) 340px, (max-width: 1199px) 380px, (max-width: 1499px) 27vw, 360px" />
              <figcaption className="sr-only">Photo d’illustration par Cherrydeck sur <a href={photoUrl} target="_blank" rel="noopener noreferrer">Unsplash (nouvel onglet)</a>.</figcaption>
            </figure>
            <figure className="contact-client-review">
              <span className="contact-review-quote" aria-hidden="true">“</span>
              <blockquote>Professionnel à l’écoute qui est très réactif. Fourni un travail rapide et sérieux. Merci.</blockquote>
              <figcaption><div><strong>Julie Langlais</strong><a href={reviewsUrl} target="_blank" rel="noopener noreferrer">Avis publié sur Google<span className="sr-only"> (nouvel onglet)</span></a></div><span className="contact-review-stars" role="img" aria-label="5 étoiles sur 5">{Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" />)}</span></figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
}
