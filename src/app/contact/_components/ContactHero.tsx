import { ArrowRight, CalendarDays, Mail, MapPin, Phone } from 'lucide-react'
import { ContactRequestForm } from './ContactRequestForm'

const bookingUrl = 'https://calendar.app.google/wgC3a6rCBy5ADUzn6'

export function ContactHero({ subject = '', available = true }: { subject?: string; available?: boolean }) {
  return <section className="contact-reference" aria-labelledby="contact-title">
    <div className="contact-reference-container">
      <div className="contact-reference-grid">
        <div className="contact-reference-left">
          <p className="contact-location-label">AGENCE WEB · LORIENT & LE MANS</p>
          <h1 id="contact-title">Parlons de votre<br /><span>nouveau projet</span></h1>
          <p className="contact-reference-intro">Vous avez une idée, un objectif, ou simplement besoin de conseils ? Nous vous aidons à structurer votre projet et à créer un site web qui attire, convainc et performe.</p>
        </div>
        <div className="contact-form-card">
          <div className="contact-form-heading"><h2>Envoyez-nous votre demande</h2><p>Un retour sous 24 h ouvrées. Les champs marqués * sont obligatoires.</p></div>
          {!available && <p className="contact-service-notice" role="status">L’envoi par formulaire est momentanément indisponible. Vous pouvez nous écrire à <a href="mailto:litusagency@gmail.com">litusagency@gmail.com</a> ou nous appeler au <a href="tel:+33744985521">07 44 98 55 21</a>.</p>}
          <ContactRequestForm subject={subject} />
        </div>
        <div className="contact-reference-details">
          <div className="contact-details-card">
            <a className="contact-detail" href="tel:+33744985521"><span className="contact-detail-icon"><Phone aria-hidden="true" /></span><span><small>APPEL DIRECT</small><strong>07 44 98 55 21</strong><span>Lun. – Ven. 9 h – 18 h</span></span></a>
            <a className="contact-detail" href="mailto:litusagency@gmail.com"><span className="contact-detail-icon"><Mail aria-hidden="true" /></span><span><small>PAR ÉCRIT</small><strong>litusagency@gmail.com</strong></span></a>
            <div className="contact-detail"><span className="contact-detail-icon"><MapPin aria-hidden="true" /></span><span><small>PRÉSENCE LOCALE</small><strong>Lorient (56) & Le Mans (72)</strong><span>Sur place ou à distance, selon votre projet.</span></span></div>
          </div>
          <div className="contact-booking-band">
            <CalendarDays aria-hidden="true" />
            <div><h2>Réserver un appel découverte</h2><p>30 minutes pour faire le point, sans engagement.</p><a href={bookingUrl} target="_blank" rel="noopener noreferrer">Choisir un créneau <ArrowRight size={16} aria-hidden="true" /><span className="sr-only"> (nouvel onglet)</span></a></div>
          </div>
        </div>
      </div>
    </div>
  </section>
}
