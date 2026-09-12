import Link from 'next/link'
export function MassiveCTA() {
  return (
    <section className="editorial-section contact-section">
      <div className="editorial-container contact-grid">
        <div className="contact-brand-panel" aria-hidden="true">
          <span className="contact-logo-mark" />
          <p>Un échange clair, une suite concrète.</p>
        </div>
        <div className="contact-copy">
          <p className="editorial-eyebrow">Et votre projet ?</p>
          <h2 className="home-section-title">
            Prenons le temps
            <br />
            d’en parler.
          </h2>
          <p>
            Un site à créer, une refonte ou une question sur votre visibilité :
            commençons par un échange.
          </p>
        </div>
        <div className="contact-actions">
          <Link href="/contact" className="editorial-button">
            Contacter Litus ↗
          </Link>
          <Link
            href="/contact?objet=audit"
            className="editorial-button-secondary section-link"
          >
            Demander un audit gratuit
          </Link>
          <p className="hero-note">
            Sans engagement. Réponse sous 24 h ouvrées.
          </p>
        </div>
      </div>
    </section>
  )
}
