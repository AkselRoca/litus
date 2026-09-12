/** Reproducible original artwork. Not run during builds; no remote image hotlinking. */
import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import sharp from 'sharp'

const out = path.resolve('public/expertise/images')
const sourceDir = path.resolve('public/expertise/sources')
await fs.mkdir(out, { recursive: true })
await fs.mkdir(sourceDir, { recursive: true })
await fs.mkdir('public/expertise/licenses', { recursive: true })
await fs.mkdir('public/brands/color', { recursive: true })
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const rect = (x,y,w,h,fill='#fff',r=14,stroke='none') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`
const txt = (x,y,s,size=20,fill='#14283c',weight=400) => `<text x="${x}" y="${y}" font-family="Segoe UI, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(s)}</text>`
const line = (x,y,x2,y2,c='#e2e7eb') => `<path d="M${x} ${y} L${x2} ${y2}" fill="none" stroke="${c}" stroke-width="2"/>`
const pill = (x,y,label,color='#537e26',bg='#edf6e6',w=110) => rect(x,y,w,29,bg,14)+txt(x+13,y+20,label,13,color,600)
const vase = (x,y,scale=1,color='#bd9275') => `<g transform="translate(${x} ${y}) scale(${scale})"><ellipse cx="65" cy="135" rx="65" ry="11" fill="#18233310"/><path d="M43 15 Q38 44 24 61 C-8 115 16 136 65 136 C115 136 133 106 107 63 Q89 44 85 15 Z" fill="${color}"/><ellipse cx="64" cy="15" rx="21" ry="7" fill="#674d3f"/><path d="M42 39 Q14 108 41 121" stroke="#ffffff35" stroke-width="7" fill="none"/></g>`
const base = (body,bg='#f4f6f8') => `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">${rect(0,0,1280,800,bg,0)}${body}${txt(34,778,'LITUS / ATELIER VISUEL / DONNÉES FICTIVES',11,'#738091',500)}</svg>`
function dashboard({ title, accent='#537e26', dark=false, rows=['Vase Horizon','Collection Terre','Carnet de bord'], labels=['Produits','Collections','Commandes'], subtitle='Un catalogue organisé pour le quotidien' }) {
  const ink=dark?'#edf2f7':'#14283c', muted=dark?'#94a3b8':'#728091', panel=dark?'#121a27':'#fff', border=dark?'#263345':'#e6e9ed'
  let b=rect(0,0,210,748,dark?'#0a111b':'#f8fafb',0)+txt(26,49,'ATELIER / DÉMO',15,ink,650)+line(0,75,1280,75,border)+rect(231,20,704,35,dark?'#1b2637':'#f0f3f5',9)+txt(249,44,'Rechercher dans le projet',14,muted)+pill(1080,24,'EXEMPLE',accent,dark?'#202c3c':'#f1f5ef',120)
  for(const [i,l] of ['Vue d’ensemble',...labels,'Réglages'].entries()) b+=(i===1?rect(14,100+i*52,182,42,dark?'#213144':'#eaf0e7',8):'')+txt(30,127+i*52,l,15,i===1?accent:muted,i===1?600:400)
  b+=txt(250,136,title,31,ink,650)+txt(250,169,subtitle,16,muted)
  for(const [i,[a,c]] of [['Contenu','Structuré'],['Équipe','Autonome'],['Publication','À valider']].entries())b+=rect(250+i*318,200,298,94,panel,12,border)+txt(270+i*318,231,a,13,muted)+txt(270+i*318,268,c,24,ink,600)
  b+=rect(250,319,934,374,panel,12,border)+txt(274,356,labels[0],18,ink,600)+txt(274,399,'ÉLÉMENT',11,muted,600)+txt(826,399,'STATUT',11,muted,600)+txt(1034,399,'SUIVI',11,muted,600)
  rows.forEach((r,i)=>{const y=429+i*79;b+=line(271,y-16,1163,y-16,border)+rect(274,y,52,51,dark?'#24354b':['#f0e5d7','#e4eee8','#f2e8e1'][i],8)+(dark?txt(288,y+33,['01','02','03'][i],18,'#b9c9dc',600):vase(280,y+3,.31,['#bf9d82','#849c89','#c68c76'][i]))+txt(346,y+24,r,16,ink,600)+txt(346,y+46,'Exemple de travail · Litus',12,muted)+pill(822,y+11,['À relire','Préparé','Brouillon'][i],accent,dark?'#233143':'#f1f5ef',115)+txt(1034,y+32,['Catalogue','Éditorial','Équipe'][i],13,muted)})
  return base(b,dark?'#0d1522':'#f2f4f6')
}
function storefront(editor=false, editorial=false){
 let canvas=rect(0,0,1280,800,'#f8f3e9',0)+txt(55,67,'ATELIER HORIZON',22,'#233b35',650)+txt(795,67,'Collection     À propos     Contact',16,'#53625b')+line(55,95,1225,95,'#dbdfd4')+txt(64,176,editorial?'LE JOURNAL / CONSEILS':'OBJETS DURABLES / COLLECTION 01',12,'#7e886c',600)+txt(62,242,editorial?'Des idées simples.':'La matière.',56,'#20392f',650)+txt(62,309,editorial?'Des projets utiles.':'Et le temps.',56,'#20392f',650)+txt(66,356,editorial?'Une lecture claire, pensée pour avancer.':'Des pièces pensées pour durer au quotidien.',18,'#6c7564')+rect(66,389,215,49,'#253d32',25)+txt(88,420,editorial?'Explorer les articles':'Voir la collection',16,'#fff',600)+rect(706,132,504,330,'#e8ddcd',22)+vase(821,164,1.8,'#a98469')+vase(1034,290,.85,'#74866e')
 for(let i=0;i<3;i++)canvas+=rect(64+i*386,506,360,216,['#eae3d7','#e2e8db','#eddfd5'][i],14)+vase(185+i*386,515,1.02,['#b69278','#80927c','#ba8572'][i])+txt(84+i*386,692,editorial?['Choisir les bons outils','Structurer le contenu','Préparer la publication'][i]:['Vase Horizon','Pièce Terre','Édition Argile'][i],16,'#294135',600)
 if(!editor)return base(canvas)
 return base(rect(0,0,1280,800,'#181c27',0)+txt(24,38,'ATELIER DESIGN',13,'#e0e5ee',600)+txt(440,38,'Desktop  /  1200',13,'#afb7c8')+pill(1120,14,'APERÇU','#fff','#385aeb',125)+rect(0,65,190,683,'#111622',0)+txt(20,111,'CALQUES',11,'#8896ad',600)+['Page','  Navigation','  Hero','  Collection','  Contact'].map((s,i)=>txt(23,160+i*49,s,15,i===2?'#80a3ff':'#b0bed2')).join('')+`<g transform="translate(214 119) scale(.67)">${canvas}</g>`+rect(1100,65,180,683,'#111622',0)+txt(1121,112,'PROPRIÉTÉS',11,'#8896ad',600)+['Largeur','Auto','Espacement','24 px','Animation','Apparition','Responsive','Adaptatif'].map((s,i)=>txt(1121,167+i*53,s,i%2?16:11,i%2?'#e6edf7':'#8896ad',i%2?500:400)).join('')+rect(614,310,329,198,'none',0,'#7085ff')+rect(608,304,10,10,'#7085ff',0)+rect(938,501,10,10,'#7085ff',0),'#181c27')
}
function flow(title, subtitle, names, color='#087ea4', code=false){
 let b=txt(61,82,'LITUS / ARCHITECTURE DE PRINCIPE',12,color,650)+txt(58,142,title,36,'#172e43',650)+txt(61,180,subtitle,18,'#66768a')
 b+=line(244,349,1030,349,'#b5c8d8')+line(637,349,637,590,'#b5c8d8')
 names.forEach((n,i)=>{const x=i<3?61+i*401:462,y=i<3?266:513;b+=rect(x,y,355,167,'#fff',15,'#dde5eb')+pill(x+22,y+19,'0'+(i+1),color,'#f1f5f9',50)+txt(x+23,y+91,n,23,'#172e43',600)+txt(x+23,y+130,['Une source identifiée','Une règle explicite','Un résultat contrôlé','Une équipe informée'][i],14,'#738295')})
 if(code)b+=rect(51,715,1166,33,'#172638',8)+txt(72,737,'type-safe  /  server-side checks  /  explicit data contracts',13,'#b8cedf')
 return base(b,'#f1f6fa')
}
function codeWindow(title, lines, accent='#67b8ed'){
 let b=rect(32,32,1216,708,'#101b2b',18,'#34475b')+txt(57, seventy(),title,20,'#e1eaf5',600)+line(33,100,1247,100,'#2b394c')+rect(32,101,227,638,'#0d1726',0)+['EXPLORATEUR','src/','  app/','  lib/','  contracts.ts','  validation.ts','README.md'].map((v,i)=>txt(57,144+i*45,v,i===0?11:15,i===4?accent:'#8ea0b9',i===0?650:400)).join('')
 lines.forEach((l,i)=>b+=txt(280,158+i*43,String(i+1),13,'#4c607b')+txt(324,158+i*43,l,20,i===0||l.startsWith('export')?accent:l.includes('//')?'#7b91ab':'#d6e3f5',400))
 b+=rect(279,633,922,65,'#192d43',10)+txt(303,673,'Exemple simplifié. À adapter au contexte du projet.',15,'#a8c2d9')
 return base(b,'#e7edf4')
}
function seventy(){return  seventyValue} const seventyValue=73
function designSystem(responsive=false){
 if(responsive){let b=txt(54,85,'UN MÊME CONTENU. TROIS COMPOSITIONS.',25,'#143349',650);const specs=[[50,147,657,502],[730,221,302,429],[1054,334,176,316]];for(const [i,[x,y,w,h]] of specs.entries()){b+=rect(x,y,w,h,'#fff',15,'#cedce3')+rect(x+13,y+13,w-26,22,'#edf6fa',5)+rect(x+21,y+62,w-42,h*.31,'#cbeff5',8)+txt(x+30,y+95,'ATELIER',i===2?11:17,'#155b6e',650);for(let j=0;j<(i===0?3:2);j++)b+=rect(x+21+(i===0?j*(w-42)/3:0),y+91+h*.3+(i===0?0:j*67),i===0?(w-62)/3:w-42,i===0?130:52,['#f1e6da','#e6efe4','#e8e9f5'][j],8)}return base(b,'#edf8fa')}
 let b=txt(55,82,'ATELIER / COMPOSANTS',12,'#0788a3',650)+txt(54,138,'Une interface, un langage commun.',36,'#173346',650)+txt(58,182,'Couleurs, espacements et états documentés.',18,'#6a7f8d')
 b+=rect(55,222,735,240,'#fff',16,'#dce5e9')+txt(79,260,'BOUTONS & ÉTATS',12,'#6b7d8b',650)+rect(80,297,203,55,'#087e98',28)+txt(107,332,'Action principale',17,'#fff',600)+rect(305,297,192,55,'#eaf7fa',28)+txt(332,332,'Secondaire',17,'#087e98',600)+rect(520,297,242,55,'#f1f3f4',28)+txt(545,332,'Action indisponible',17,'#8d99a3',600)+txt(83,416,'Focus visible  /  Contraste  /  Zone tactile',16,'#597687')
 b+=rect(818,222,401,463,'#fff',16,'#dce5e9')+txt(845,261,'APERÇU DE CARTE',12,'#6b7d8b',650)+rect(842,288,352,200,'#d5edf0',12)+vase(951,302,1.1,'#6b9e9b')+txt(846,538,'Un composant réutilisable',23,'#173346',600)+txt(846,577,'Même hiérarchie, même comportement.',15,'#647c8c')+pill(846,619,'Découvrir','#fff','#087e98',128)
 b+=rect(55,489,735,196,'#fff',16,'#dce5e9')+txt(79,529,'TOKENS DE COULEUR',12,'#6b7d8b',650)+['#153344','#087e98','#f34b15','#f6f2e9','#e1e6e9'].map((c,i)=>rect(80+i*137,554,109,86,c,12)).join('')
 return base(b,'#edf8fa')
}
const art = {
 'shopify-catalogue-produits':()=>dashboard({title:'Produits & collections'}),
 'shopify-boutique-collection':()=>storefront(),
 'framer-composition-site-marketing':()=>storefront(true),
 'framer-cms-publication':()=>dashboard({title:'Collections éditoriales',accent:'#0055ff',labels:['Articles','Pages','Médias'],rows:['Choisir les bons outils','Préparer un lancement','Structurer une page'],subtitle:'Des contenus qui suivent la vie du site'}),
 'wordpress-maintenance-diagnostic':()=>dashboard({title:'Maintenance & diagnostic',accent:'#21759b',labels:['Contrôles','Extensions','WooCommerce'],rows:['Sauvegarde fichiers + base','Formulaire de contact','Commande de test'],subtitle:'Sauvegarder. Comprendre. Corriger. Contrôler.'}),
 'stripe-webhooks-abonnements':()=>flow('Après le paiement, le parcours continue.','Exemple de traitement d’un abonnement',['Événement Stripe','Vérification serveur','Accès client','CRM & email'],'#635bff'),
 'vercel-previews-deploiement':()=>dashboard({title:'Versions & déploiements',accent:'#a2c4eb',dark:true,labels:['Déploiements','Domaines','Logs'],rows:['main / production','feature / préproduction','fix / préproduction'],subtitle:'Relire une version avant sa publication'}),
 'vercel-build-logs-diagnostic':()=>codeWindow('Build / diagnostic de déploiement',['> installation des dépendances','> génération des types','> compilation des routes','> préparation des pages','','// Points de contrôle','ENV     variables par environnement','DNS     domaine et certificat','LOGS    erreurs de construction','ROLLBACK  version de retour'],'#c3d0e3'),
 'react-interface-configurateur':()=>dashboard({title:'Votre projet, étape par étape',accent:'#087ea4',labels:['Configuration','Récapitulatif','Documents'],rows:['Type de projet','Options de votre interface','Récapitulatif de la demande'],subtitle:'Un état cohérent entre les actions et le résultat'}),
 'react-composants-parcours':()=>flow('Une page, des responsabilités claires.','Exemple de découpage d’une interface React',['Page & données','Filtres & recherche','Liste de résultats','Fiche de détail']),
 'nextjs-rendu-serveur-cms':()=>flow('Le contenu avant l’interaction.','Architecture simplifiée d’un site Next.js',['CMS / données','Rendu serveur','HTML & metadata','Interactions React'],'#263b50'),
 'nextjs-site-editorial-preview':()=>storefront(false,true),
 'typescript-contrat-donnees-api':()=>codeWindow('contracts.ts / une demande de contact',["type Project = 'website' | 'ecommerce';",'', 'type ContactRequest = {','  project: Project;','  email: string;',"  status: 'new' | 'qualified';",'};','','// Le type ne valide pas un JSON externe.','// Contrôler aussi les données au serveur.']),
 'typescript-migration-javascript':()=>flow('Migrer sans interrompre le produit.','Une progression par modules et contrats',['JavaScript existant','Modules prioritaires','Contrats partagés','Contrôles renforcés'],'#3178c6',true),
 'tailwind-composants-design-system':()=>designSystem(),
 'tailwind-responsive-ecrans':()=>designSystem(true),
}
const manifest=[]
for(const [file,render] of Object.entries(art)){
 const svg=render();await fs.writeFile(path.join(sourceDir,file+'.svg'),svg)
 await sharp(Buffer.from(svg)).webp({quality:82,effort:5}).toFile(path.join(out,file+'.webp'))
 await sharp(Buffer.from(svg)).resize(480).webp({quality:76,effort:5}).toFile(path.join(out,file+'-thumb.webp'))
 manifest.push({file,kind:'original-litus',source:`/expertise/sources/${file}.svg`,width:1280,height:800})
}
const official=[{file:'stripe-checkout-abonnement-officiel',input:'.tmp/expertise-assets/stripe-checkout.gif',options:{page:21},width:1062,source:'https://github.com/stripe-samples/checkout-single-subscription',license:'stripe-LICENSE.txt',original:'stripe-checkout.gif'},{file:'wordpress-editeur-gutenberg-officiel',input:'.tmp/expertise-assets/wordpress-editor.png',options:{},width:1200,source:'https://github.com/WordPress/gutenberg',license:'wordpress-LICENSE.txt',original:'wordpress-editor.png'}]
for(const a of official){
 const result=await sharp(a.input,a.options).resize({width:a.width,withoutEnlargement:true}).webp({quality:82,effort:5}).toFile(path.join(out,a.file+'.webp'))
 await sharp(a.input,a.options).resize(480).webp({quality:76,effort:5}).toFile(path.join(out,a.file+'-thumb.webp'))
 await fs.copyFile(a.input,path.join(sourceDir,a.original));await fs.copyFile('.tmp/expertise-assets/'+a.license,'public/expertise/licenses/'+a.license)
 manifest.push({file:a.file,kind:'official-sample',source:a.source,license:'/expertise/licenses/'+a.license,original:'/expertise/sources/'+a.original,width:result.width,height:result.height,transformation:a.options.page?'GIF frame 21, WebP compression':'Proportional resize, WebP compression'})
}
const brands={nextdotjs:'#000000',react:'#61DAFB',typescript:'#3178C6',tailwindcss:'#06B6D4',vercel:'#000000',stripe:'#635BFF',shopify:'#95BF47',wordpress:'#21759B'}
for(const [name,color] of Object.entries(brands)){
 const input=await fs.readFile('public/brands/'+name+'.svg','utf8')
 const colored=input.replace(/<svg\b([^>]*)>/,(_,attrs)=>`<svg${attrs.replace(/\sfill="[^"]*"/g,'')} fill="${color}">`)
 await fs.writeFile('public/brands/color/'+name+'.svg',colored)
}
const names={nextjs:['Next.js','nextdotjs'],react:['React','react'],typescript:['TypeScript','typescript'],tailwind:['Tailwind CSS','tailwindcss'],framer:['Framer','framer'],vercel:['Vercel','vercel'],stripe:['Stripe','stripe'],shopify:['Shopify','shopify'],wordpress:['WordPress','wordpress']}
for(const [slug,[name,logo]] of Object.entries(names)){
 const color=brands[logo]||'#0055ff'
 const icon=await sharp('public/brands/color/'+logo+'.svg').resize({width:130,height:130,fit:'contain',background:'#ffffff00'}).png().toBuffer()
 const og=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">${rect(0,0,1200,630,'#f7f4ec',0)}${rect(0,0,20,630,color,0)}${txt(72,92,'Litus',43,'#142638',700)}${txt(177,92,'.',43,'#f44915',700)}${txt(77,226,'EXPERTISES TECHNOLOGIQUES',16,'#6b7c8b',550)}${txt(72,345,name,88,'#142638',600)}${txt(77,421,'Les bons outils. Pour les vrais sujets.',29,'#667587')}${line(77,489,1110,489,'#dadfdc')}${txt(77,549,'Stratégie digitale & acquisition',20,'#172c3e')}${txt(1000,549,'litus.fr',20,'#172c3e')}${rect(924,229,186,186,'#fff',25)}<image x="952" y="257" width="130" height="130" href="data:image/png;base64,${icon.toString('base64')}"/></svg>`
 await sharp(Buffer.from(og)).png({compressionLevel:9}).toFile(path.join(out,slug+'-litus-og.png'))
}
for(const a of manifest){const b=await fs.readFile(path.join(out,a.file+'.webp'));a.bytes=b.length;a.sha256=createHash('sha256').update(b).digest('hex')}
await fs.writeFile('public/expertise/asset-manifest.json',JSON.stringify({created:'2026-09-12',note:'Original mockups are illustrative, not screenshots or client work. Trademarks belong to their owners.',assets:manifest},null,2)+'\n')
console.log(`Generated ${manifest.length} optimized scenes, thumbnails and nine social images.`)
