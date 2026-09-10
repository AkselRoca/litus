import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ReferenceReveal } from './home/ReferenceMotion'
import { ProcessDemo } from './home/ProcessDemo'

export function ProcessTimeline() {
  return <section id="notre-methode" className="home-reference-section reference-method" aria-labelledby="reference-method-title"><ReferenceReveal className="home-reference-container">
    <div className="reference-method-heading"><div><p className="reference-eyebrow"><span>04 —</span> Notre méthode</p><h2 id="reference-method-title" className="home-section-title">Un projet clair, <br />du premier échange au suivi.</h2></div><p>Vous savez où nous en sommes et ce qui vient ensuite.<br />Une méthode simple et éprouvée pour des résultats concrets.</p><Link href="/a-propos" className="site-cta-secondary">Découvrir notre approche<ArrowRight size={15} /></Link></div>
    <ProcessDemo />
  </ReferenceReveal></section>
}
