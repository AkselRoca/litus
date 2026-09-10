'use client'

import Image from 'next/image'
import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react'
import { useInView } from 'framer-motion'
import { Camera, Check, Clock3, Globe2, ImageIcon, MapPin, MessageSquare, Pause, Phone, Play, RotateCcw, Store } from 'lucide-react'
import './business-profile-demo.css'

const topics = [{ title: 'Informations', icon: Store }, { title: 'Photos', icon: Camera }, { title: 'Avis', icon: MessageSquare }] as const
const subscribeHydration = () => () => {}
const hydratedSnapshot = () => true
const serverHydration = () => false
const subscribeMotion = (cb: () => void) => { const media=window.matchMedia('(prefers-reduced-motion: reduce)');media.addEventListener('change',cb);return()=>media.removeEventListener('change',cb) }
const motionSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const serverMotion = () => false
const subscribeVisibility = (cb: () => void) => { document.addEventListener('visibilitychange',cb);return()=>document.removeEventListener('visibilitychange',cb) }
const visibilitySnapshot = () => document.visibilityState==='visible'
const serverVisibility = () => true

export function BusinessProfileDemo() {
  const id=useId(), ref=useRef<HTMLDivElement>(null), tabs=useRef<(HTMLButtonElement|null)[]>([])
  const inView=useInView(ref,{amount:.3})
  const hydrated=useSyncExternalStore(subscribeHydration,hydratedSnapshot,serverHydration)
  const reduced=useSyncExternalStore(subscribeMotion,motionSnapshot,serverMotion)
  const visible=useSyncExternalStore(subscribeVisibility,visibilitySnapshot,serverVisibility)
  const [elapsed,setElapsed]=useState(0),[playing,setPlaying]=useState(true),[manual,setManual]=useState<number|null>(null)
  const phase=manual??(!hydrated||reduced?0:Math.min(2,Math.floor(elapsed/3000)))
  const complete=elapsed>=9000
  const running=hydrated&&!reduced&&visible&&inView&&playing&&!complete&&manual===null
  useEffect(()=>{if(!running)return;let last=performance.now();const timer=window.setInterval(()=>{const now=performance.now(),delta=Math.min(now-last,200);last=now;setElapsed(v=>Math.min(9000,v+delta))},80);return()=>clearInterval(timer)},[running])
  function select(index:number){setManual(index);setElapsed(index*3000);setPlaying(false)}
  function onKey(event:KeyboardEvent<HTMLButtonElement>,index:number){const next=event.key==='ArrowRight'?(index+1)%3:event.key==='ArrowLeft'?(index+2)%3:event.key==='Home'?0:event.key==='End'?2:-1;if(next<0)return;event.preventDefault();select(next);tabs.current[next]?.focus()}
  function replay(){setManual(null);setElapsed(0);setPlaying(true)}
  function playback(){if(manual!==null){setManual(null);setPlaying(true)}else setPlaying(v=>!v)}
  return <div ref={ref} className="gbp-demo" data-phase={phase} data-running={running} role="group" aria-label="Aperçu illustratif d’une fiche Google Business Profile">
    <div className="gbp-demo-window"><div className="gbp-demo-top"><Image src="/brands/google-color.svg" alt="Google" width={24} height={24}/><strong>Votre fiche d’établissement</strong><small>Démonstration</small></div>
      <div className="gbp-demo-profile"><div className="gbp-demo-photo"><Image src="/blog/photos/commerce-disquaire.webp" alt="Photographie d’illustration : les rayons d’un magasin de disques" fill sizes="(max-width:560px) 80px, 260px"/><span><Camera aria-hidden="true"/>Photo réelle d’illustration</span></div><div className="gbp-demo-identity"><span className="gbp-demo-category">Commerce de proximité</span><h3>Votre établissement</h3><p>Votre activité, présentée avec soin.</p><div className="gbp-demo-actions" aria-label="Exemples d’actions de la fiche"><span><Globe2 aria-hidden="true"/>Site web</span><span><Phone aria-hidden="true"/>Appeler</span><span><MapPin aria-hidden="true"/>Itinéraire</span></div></div></div>
      <div className="gbp-demo-tabs" role="tablist" aria-label="Explorer le contenu de la fiche">{topics.map((item,index)=>{const Icon=item.icon;return <button type="button" role="tab" key={item.title} ref={el=>{tabs.current[index]=el}} id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={phase===index} tabIndex={phase===index?0:-1} onClick={()=>select(index)} onKeyDown={event=>onKey(event,index)}><Icon aria-hidden="true"/>{item.title}</button>})}</div>
      <div className="gbp-demo-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${phase}`}>
        <div key={phase} className="gbp-demo-panel-content">
          {phase===0&&<ul className="gbp-demo-fields"><li><MapPin aria-hidden="true"/><div><strong>Un établissement facile à situer</strong><span>Adresse ou zone de service exacte</span></div><Check aria-hidden="true"/></li><li><Clock3 aria-hidden="true"/><div><strong>Des horaires fiables</strong><span>Ouverture habituelle et jours exceptionnels</span></div><Check aria-hidden="true"/></li><li><Store aria-hidden="true"/><div><strong>Une activité bien renseignée</strong><span>Catégorie, services et informations utiles</span></div><Check aria-hidden="true"/></li></ul>}
          {phase===1&&<div className="gbp-demo-photos"><div><Image src="/blog/photos/commerce-disquaire.webp" alt="Rayons d’un magasin de disques, exemple de photo intérieure" fill sizes="180px"/><span>Vos lieux</span></div><div><Image src="/blog/photos/commerce-vitrine.webp" alt="Une passante regarde une vitrine, exemple de photo extérieure" fill sizes="180px"/><span>Votre accueil</span></div><p><ImageIcon aria-hidden="true"/>Des photos authentiques pour préparer la visite.</p></div>}
          {phase===2&&<div className="gbp-demo-reviews"><span><MessageSquare aria-hidden="true"/>Vos réponses comptent.</span><h4>Un retour mérite une attention.</h4><p>Lire l’expérience, répondre avec précision et garder un ton professionnel, même face à une remarque.</p><div><Check aria-hidden="true"/>Des avis issus d’expériences réelles.</div></div>}
        </div>
      </div>
      <div className="gbp-demo-controls"><p>Une fiche claire, à entretenir dans la durée.</p><div>{!reduced&&!complete&&<button type="button" onClick={playback} aria-label={playing&&manual===null?'Mettre la démonstration de fiche en pause':'Reprendre la démonstration de fiche'}>{playing&&manual===null?<Pause aria-hidden="true"/>:<Play aria-hidden="true"/>}</button>}<button type="button" onClick={replay} aria-label={reduced?'Revenir aux informations de la fiche':'Rejouer la démonstration de fiche'}><RotateCcw aria-hidden="true"/></button></div></div>
    </div><p className="gbp-demo-caption">Exemple de présentation · Aucun avis ni résultat client simulé</p>
  </div>
}
