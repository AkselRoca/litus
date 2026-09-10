import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const alt = 'Litus — Création d’outils IA sur mesure pour entreprise'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), 'public/logo-sans-fond.png'))
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#f8f7f3', color: '#172536', padding: '52px 62px', fontFamily: 'sans-serif', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
        {/* ImageResponse renders a local embedded asset, without a browser image request. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo.toString('base64')}`} width="39" height="46" alt="" />
        <span style={{ fontSize: 35, fontWeight: 700 }}>Litus</span>
        <span style={{ fontSize: 17, color: '#627185', marginLeft: 15 }}>Lorient · Le Mans</span>
      </div>
      <div style={{ display: 'flex', gap: 48, alignItems: 'center', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: 586 }}>
          <span style={{ fontSize: 15, color: '#c7431b', letterSpacing: 2, marginBottom: 24 }}>INTELLIGENCE ARTIFICIELLE · SUR MESURE</span>
          <span style={{ fontSize: 53, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>Des outils IA utiles à vos équipes.</span>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 24, lineHeight: 1.5, color: '#627185', marginTop: 24 }}><span>Vos données. Vos processus.</span><span>Des résultats exploitables.</span></div>
        </div>
        <div style={{ display: 'flex', width: 400, borderRadius: 24, padding: 28, background: '#172536', flexDirection: 'column', gap: 14 }}>
          <span style={{ color: '#f8f7f3', fontSize: 20, marginBottom: 10 }}>Du besoin à l’action</span>
          {['Une demande métier', 'Vos sources connectées', 'Analyse et préparation', 'Un résultat à valider'].map((text, index) => <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 15, borderRadius: 10, background: index === 3 ? '#e95e2a' : '#263748', color: '#ffffff', fontSize: 19 }}><span style={{ fontSize: 15, opacity: .7 }}>0{index + 1}</span><span>{text}</span></div>)}
        </div>
      </div>
      <div style={{ display: 'flex', borderTop: '1px solid #dce1e5', paddingTop: 20, justifyContent: 'space-between', color: '#627185', fontSize: 17 }}><span>Assistants internes · Agents métier · Automatisation</span><span>litus.fr</span></div>
    </div>, size,
  )
}
