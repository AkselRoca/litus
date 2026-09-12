import Link from 'next/link'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import pean from '@/lib/case-studies/sarl-pean-j.json'
import { AcquisitionResults } from '@/components/portfolio/AcquisitionResults'
import { GoogleAdsReveal } from './GoogleAdsReveal'
import './google-ads-client-case.css'

export function GoogleAdsClientCase() {
  return <section className="gad-section gad-client-case" aria-labelledby="gad-pean-title" id="cas-client-pean">
    <div className="gad-container">
      <GoogleAdsReveal className="gad-client-case-layout">
        <div className="gad-client-case-copy">
          <p className="gad-kicker"><span />Cas client · Google Ads / Acquisition</p>
          <h2 id="gad-pean-title">SARL Péan J :<br /><em>des demandes, pas seulement des clics.</em></h2>
          <p>Menuiserie extérieure, volets solaires et dépannage en Sarthe : pour cette entreprise locale, l’objectif n’est pas d’accumuler des impressions. C’est de recevoir régulièrement de nouvelles demandes commerciales.</p>
          <p>Litus pilote et optimise les campagnes Google Ads autour de cet objectif d’acquisition locale. La stratégie privilégie les besoins commerciaux de l’entreprise et le coût des conversions, plutôt que le volume de trafic seul.</p>
          <div className="gad-client-case-budget"><TrendingUp size={23} aria-hidden="true" /><div><h3>Des campagnes rentables.<br />Un budget qui grandit avec les résultats.</h3><p>{pean.performance.reinvestment}</p></div></div>
          <Link href="/realisations/sarl-pean-j" className="site-cta-secondary">Découvrir le cas SARL Péan J<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className="gad-client-case-results"><AcquisitionResults title={pean.title} results={pean.performance} /><p className="gad-client-case-note">{pean.performance.note}</p></div>
      </GoogleAdsReveal>
    </div>
  </section>
}
