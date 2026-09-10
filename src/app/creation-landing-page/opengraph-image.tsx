import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
export const alt = "Litus — Création de landing page sur mesure"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default async function OpenGraphImage() {
 const logo = await readFile(path.join(process.cwd(), 'public/logo-sans-fond.png'))
 return new ImageResponse(<div style={{ display:'flex',flexDirection:'column',width:'100%',height:'100%',padding:'52px 62px',background:'#f7f6f2',color:'#172536',fontFamily:'sans-serif' }}>
  <div style={{display:'flex',alignItems:'center',gap:15}}>
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img src={`data:image/png;base64,${logo.toString('base64')}`} width="39" height="46" alt=""/><span style={{fontSize:35,fontWeight:700}}>Litus</span><span style={{marginLeft:15,fontSize:17,color:'#627180'}}>Lorient · Le Mans</span></div>
  <div style={{display:'flex',alignItems:'center',flex:1,gap:45}}><div style={{display:'flex',flexDirection:'column',width:580}}><span style={{fontSize:15,letterSpacing:2,color:'#c7431b',marginBottom:24}}>LANDING PAGES · CONVERSION</span><span style={{fontSize:58,lineHeight:1.08,fontWeight:700,letterSpacing:-2}}>Donnez une suite à vos clics.</span><span style={{fontSize:23,lineHeight:1.5,color:'#627180',marginTop:25}}>Une offre claire. Un parcours qui se mesure.</span></div><div style={{display:'flex',flexDirection:'column',gap:13,width:390,padding:27,background:'#20313f',borderRadius:20,color:'#ffffff'}}><span style={{fontSize:21,marginBottom:12}}>Du clic à la demande</span>{["Votre campagne","Une offre ciblée","Une action simple"].map((step,index)=><div key={step} style={{display:'flex',alignItems:'center',gap:14,padding:'19px 16px',background:index===2?'#e95e2a':'#304554',borderRadius:9,fontSize:19}}><span style={{fontSize:13,opacity:.7}}>0{index+1}</span><span>{step}</span></div>)}</div></div>
  <div style={{display:'flex',justifyContent:'space-between',paddingTop:20,borderTop:'1px solid #dfe4e6',fontSize:17,color:'#627180'}}><span>Message · Design · Mesure</span><span>litus.fr</span></div>
 </div>,size)
}

