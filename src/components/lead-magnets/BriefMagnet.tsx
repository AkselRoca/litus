import Link from 'next/link'
import { ArrowUpRight, ListChecks, MailCheck } from 'lucide-react'

export function BriefMagnet({ compact = false }: { compact?: boolean }) {
  return <div className={`rounded-[24px] border border-orange-500/15 bg-[#fbf8f3] text-[#12283e] ${compact ? 'p-6' : 'p-8 md:p-10'}`}>
    <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#ce4319]"><ListChecks size={22} /> Votre projet, bien préparé</div>
    <h3 className={`${compact ? 'text-2xl' : 'text-3xl md:text-4xl'} font-semibold leading-tight tracking-tight`}>Un vrai cahier des charges.<br />Pas une page blanche.</h3>
    <p className="mt-4 leading-relaxed text-slate-600">Site vitrine, boutique en ligne, application ou automatisation : répondez aux questions adaptées à votre projet et recevez votre document de cadrage.</p>
    <Link href="/ressources/cahier-des-charges" className="mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-[#fa541c] px-6 py-3.5 text-center font-semibold text-white transition-colors hover:bg-[#de4212]">Préparer mon cahier des charges <ArrowUpRight size={19} className="shrink-0" /></Link>
    <p className="mt-4 flex items-center gap-2 text-xs leading-relaxed text-slate-500"><MailCheck size={17} className="shrink-0" /> Gratuit, sans engagement. Document envoyé par email.</p>
  </div>
}
