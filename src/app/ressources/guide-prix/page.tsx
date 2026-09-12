import { permanentRedirect } from 'next/navigation'

export default function LegacyPriceGuidePage() {
  permanentRedirect('/ressources/cahier-des-charges')
}
