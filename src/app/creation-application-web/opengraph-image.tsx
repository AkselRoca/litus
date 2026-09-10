import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const alt = 'Litus — Création d’applications web sur mesure pour votre métier'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), 'public/logo-sans-fond.png'))
  return new ImageResponse(<div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '52px 62px', background: '#f7f6f2', color: '#172536', fontFamily: 'sans-serif' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${logo.toString('base64')}`} width="39" height="46" alt="" />
      <span style={{ fontSize: 35, fontWeight: 700 }}>Litus</span><span style={{ marginLeft: 15, color: '#627180', fontSize: 17 }}>Lorient · Le Mans</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 42 }}><div style={{ display: 'flex', flexDirection: 'column', width: 540 }}><span style={{ color: '#c7431b', fontSize: 15, letterSpacing: 2, marginBottom: 24 }}>APPLICATIONS WEB · SUR MESURE</span><span style={{ fontSize: 53, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>Un outil qui suit votre métier.</span><span style={{ marginTop: 24, fontSize: 23, lineHeight: 1.5, color: '#627180' }}>CRM, espace client, logiciel métier.</span></div><div style={{ display: 'flex', flexDirection: 'column', padding: 25, width: 435, background: '#ffffff', border: '1px solid #dfe4e6', borderRadius: 20 }}><span style={{ fontSize: 22, marginBottom: 25 }}>Votre espace de travail</span><div style={{ display: 'flex', gap: 10 }}>{['Reçu', 'En cours', 'Terminé'].map((text, index) => <div key={text} style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 120, minHeight: 175, padding: 12, background: '#f5f5f1', borderRadius: 8, fontSize: 15, color: '#627180' }}><span>{text}</span>{index === 2 && <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '15px 10px', borderRadius: 7, border: '1px solid #efbaa6', background: '#ffffff', color: '#172536' }}><span style={{ color: '#e95e2a', fontSize: 13 }}>P-014</span><span>Portail client</span></div>}</div>)}</div><span style={{ color: '#627180', fontSize: 13, marginTop: 18 }}>Un dossier clair, de la demande au suivi.</span></div></div>
    <div style={{ display: 'flex', borderTop: '1px solid #dfe4e6', paddingTop: 20, justifyContent: 'space-between', fontSize: 17, color: '#627180' }}><span>Vos processus · Vos données · Votre application</span><span>litus.fr</span></div>
  </div>, size)
}
