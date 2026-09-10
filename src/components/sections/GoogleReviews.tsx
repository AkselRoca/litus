import Image from 'next/image'
import { Star } from 'lucide-react'
import './google-reviews.css'

const googleReviewsUrl = 'https://share.google/lLdX3i6x3tdKbaBCb'

const reviews = [
  { name: 'Léandre. dps', text: '', visited: 'Visité en avril', ago: 'il y a 4 mois' },
  { name: 'SARL PEAN J', text: 'Excellent. Grâce à Litus, ma communication internet est devenue vraiment professionnelle.', visited: 'Visité en mars', ago: 'il y a 5 mois' },
  { name: 'Ornel Afonso', text: 'Excellente expérience avec Arthur et son équipe ! Ils sont professionnels, à l’écoute et ont su créer un site web vivant, clair et efficace. Je recommande vivement pour tout projet web ou SEO.', visited: 'Visité en novembre 2025', ago: 'il y a 9 mois' },
  { name: 'Julie Langlais', text: 'Professionnel à l’écoute qui est très réactif. Fourni un travail rapide et sérieux. Merci.', visited: 'Visité en septembre 2025', ago: 'il y a un an' },
  { name: 'Sylvain Chamoux', text: 'Un résultat vraiment top ! Mon site est incroyable, exactement comme je l’imaginais. Arthur et son associé ont été très disponibles, à l’écoute et professionnels tout au long du projet. Je recommande vivement !', visited: 'Visité en septembre 2025', ago: 'il y a un an' },
  { name: 'Sylvie Bouvier', text: 'Je recommande vivement Arthur ! Très impliqué, toujours à l’écoute, il fait preuve d’une grande créativité, d’idées et d’un vrai sens pédagogique.', visited: 'Visité en juillet 2025', ago: 'il y a un an' },
  { name: 'Véronique Guillemot', text: 'J’ai connu Aksel de Litus par recommandation et je lui ai demandé de créer mon site internet de soins énergétiques. Un accompagnement attentif et professionnel.', visited: 'Visité en juin 2025', ago: 'il y a un an' },
  { name: 'Julien Hamon', text: 'Je recommande vivement l’agence Litus pour la création de sites. Leur équipe est professionnelle, réactive et à l’écoute de mes besoins.', visited: 'Visité en février 2025', ago: 'il y a un an' },
  { name: 'Alexandre Fletcher', text: 'Litus m’a accompagné avec efficacité et professionnalisme dans la mise en place d’un blog pour mon agence immobilière. Son équipe est très disponible et réactive. Entièrement satisfait, je recommande sans hésitation cette agence web.', visited: 'Visité en mai 2025', ago: 'il y a un an' },
  { name: 'Camille Bennadji', text: '', visited: 'Visité en mars 2025', ago: 'il y a un an' },
  { name: 'Amelie Van-Landschoot', text: '', visited: 'Visité en mars 2025', ago: 'il y a un an' },
  { name: 'Emma Stj22', text: '', visited: 'Visité en mars 2025', ago: 'il y a un an' },
  { name: 'Kim Buquen', text: '', visited: 'Visité en février 2025', ago: 'il y a un an' },
  { name: 'Hishem Belhaj', text: 'Litus m’a accompagné dès le lancement de mon entreprise et cela a été un vrai plus. Leur équipe est réactive, à l’écoute et m’a aidé à avoir un site professionnel.', visited: 'Visité en août 2024', ago: 'il y a un an' },
  { name: 'Pezzino Matys', text: 'Merci à Litus pour la création de notre site e-commerce B2B. L’équipe a été très professionnelle, avec un site bien pensé et un référencement qui porte ses fruits.', visited: 'Visité en février 2025', ago: 'il y a un an' },
  { name: 'Lucas Robert', text: 'Arthur et Aksel ont su être très professionnels et m’accompagnent encore aujourd’hui ! Merci pour votre expertise.', visited: 'Visité en juin 2024', ago: 'il y a un an' },
  { name: 'Yanis', text: 'Client depuis plus d’un an, super satisfait ! Litus est professionnel, réactif et toujours disponible. Merci pour votre excellent travail.', visited: 'Visité en janvier 2025', ago: 'il y a un an' },
  { name: 'Romain Brant', text: 'Collaboration avec l’équipe Litus depuis plus d’un an. Merci pour ce professionnalisme et votre disponibilité. Une équipe fiable sur qui on peut compter pour travailler sérieusement.', visited: 'Visité en décembre 2024', ago: 'il y a un an' },
  { name: 'N S', text: 'Merci à Arthur et à toute l’équipe Litus pour la création de mon site web. Un suivi régulier et un professionnalisme à toute épreuve. Des experts à qui on peut faire confiance les yeux fermés !', visited: 'Visité en décembre 2024', ago: 'il y a un an' },
  { name: 'Marius Le Nédic', text: 'Nous tenons à remercier chaleureusement l’équipe de Litus pour la création de notre site web. Leur professionnalisme et leur expertise ont permis de concevoir un site responsive et parfaitement adapté à nos besoins.', visited: 'Visité en décembre 2024', ago: 'il y a un an' },
  { name: 'Pierre-Louis Gaboriau', text: 'Création de mon site et suivi régulier de la part de Litus pour la réalisation West Clôtures.', visited: '', ago: 'il y a 2 ans' },
] as const

export function GoogleReviews() {
  return (
    <section className="google-reviews" aria-labelledby="google-reviews-title">
      <div className="google-reviews-heading">
        <div className="google-reviews-title-row">
          <Image src="/brands/google-color.svg" alt="Google" width={30} height={30} />
          <h2 id="google-reviews-title">Avis clients</h2>
        </div>
        <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="google-reviews-rating" aria-label="Voir les 21 avis Litus sur Google">
          <span className="google-review-stars" aria-label="5 étoiles sur 5">{Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" />)}</span>
          <strong>5/5</strong><span className="google-reviews-divider" aria-hidden="true" />
          <Image src="/brands/google-color.svg" alt="" width={21} height={21} /><span>+21 avis Google</span>
        </a>
      </div>

      <div className="google-reviews-viewport" tabIndex={0} aria-label="Avis Google. Le défilement se met en pause lorsque cette zone reçoit le focus.">
        <div className="google-reviews-track">
          <ReviewGroup />
          <ReviewGroup duplicate />
        </div>
      </div>
      <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="google-reviews-link">Voir tous nos avis sur Google <span aria-hidden="true">→</span></a>
    </section>
  )
}

function ReviewGroup({ duplicate = false }: { duplicate?: boolean }) {
  return <div className="google-reviews-group" aria-hidden={duplicate || undefined}>{reviews.map((review, index) => <ReviewCard key={`${review.name}-${index}`} review={review} />)}</div>
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  const initial = review.name.trim().charAt(0).toUpperCase()
  return (
    <article className="google-review-card">
      <div className="google-review-card-top">
        <span className="google-review-avatar" aria-hidden="true">{initial}</span>
        <div className="google-review-person"><strong>{review.name}</strong><span>{review.ago}</span></div>
        <Image src="/brands/google-color.svg" alt="Avis publié sur Google" width={20} height={20} />
      </div>
      <div className="google-review-card-stars" aria-label="5 étoiles sur 5">{Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" />)}</div>
      {review.text ? <p>{review.text}</p> : <p className="google-review-no-comment">Note attribuée sans commentaire.</p>}
      {review.visited && <footer>{review.visited}</footer>}
    </article>
  )
}
