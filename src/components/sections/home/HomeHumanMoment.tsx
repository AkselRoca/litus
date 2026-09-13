import Image from 'next/image'
import { ReferenceAnnotation } from './ReferenceMotion'

/** Existing CC0 editorial photographs, not portraits of Litus staff or clients. */
export function HomeHumanMoment() {
  return (
    <div className="home-human-moment">
      <figure className="home-human-photo home-human-photo--conversation">
        <Image
          src="/blog/photos/echange-tablette.webp"
          alt="Deux personnes échangent autour d’une tablette et prennent des notes dans un carnet."
          width={1400}
          height={938}
          sizes="(max-width: 600px) 68vw, 320px"
          loading="lazy"
        />
      </figure>
      <figure className="home-human-photo home-human-photo--keyboard">
        <Image
          src="/blog/photos/ordinateur-saisie.webp"
          alt="Des mains travaillent sur le clavier d’un ordinateur portable près d’une fenêtre."
          width={1400}
          height={933}
          sizes="(max-width: 600px) 35vw, 170px"
          loading="lazy"
        />
      </figure>
      <ReferenceAnnotation className="home-human-note">Du concret,<br />ensemble.</ReferenceAnnotation>
    </div>
  )
}
