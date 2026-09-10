'use client'

import { useId, useState } from 'react'
import { Compass, MapPin } from 'lucide-react'
import geography from './lorient-map-data.json'
import './lorient-map.css'

const [minX, minY, mapWidth, mapHeight] = geography.viewBox
const cities = geography.cities.map(city => ({
  ...city,
  left: `${((city.point[0] - minX) / mapWidth) * 100}%`,
  top: `${((city.point[1] - minY) / mapHeight) * 100}%`,
}))

/** Commune centres indicate our service area; none represents a business address. */
export function LorientMap() {
  const mapId = useId()
  const [selected, setSelected] = useState('56121')
  const [hovered, setHovered] = useState<string | null>(null)
  const displayed = cities.find(city => city.code === (hovered ?? selected)) ?? cities[0]

  return <figure className="lorient-map" aria-labelledby={`${mapId}-caption`}>
    <div className="lorient-map-heading"><span>Morbihan · 56</span><span><Compass size={13} aria-hidden="true" />Bretagne Sud</span></div>
    <div className="lorient-map-canvas">
      <svg className="lorient-map-land" viewBox={geography.viewBox.join(' ')} aria-hidden="true" focusable="false">
        <path className="lorient-map-boundary" d={geography.boundary.d} />
        <text className="lorient-map-department" x="240" y="258" textAnchor="middle">56</text>
        <text className="lorient-map-sea" x="157" y="326" textAnchor="middle">Atlantique</text>
      </svg>
      {cities.map(city => <button key={city.code} type="button" className={`lorient-map-marker${city.code === '56121' ? ' lorient-map-marker-main' : ''}`} style={{ left: city.left, top: city.top }} aria-label={`${city.name}, commune de notre zone d’intervention`} aria-pressed={selected === city.code} aria-controls={`${mapId}-selection`} data-highlighted={displayed.code === city.code} onPointerEnter={() => setHovered(city.code)} onPointerLeave={() => setHovered(null)} onFocus={() => { setHovered(null); setSelected(city.code) }} onClick={() => setSelected(city.code)}><span aria-hidden="true" /></button>)}
      <span className="lorient-map-tooltip" style={{ left: displayed.left, top: displayed.top }} aria-hidden="true">{displayed.name}</span>
    </div>
    <div className="lorient-map-cities" role="group" aria-label="Choisir une commune sur la carte">
      {cities.map(city => <button key={city.code} type="button" aria-pressed={selected === city.code} aria-controls={`${mapId}-selection`} onFocus={() => { setHovered(null); setSelected(city.code) }} onPointerEnter={() => setHovered(city.code)} onPointerLeave={() => setHovered(null)} onClick={() => setSelected(city.code)}>{city.name}</button>)}
    </div>
    <figcaption id={`${mapId}-caption`}>
      <p id={`${mapId}-selection`} aria-live="polite" aria-atomic="true"><MapPin size={14} aria-hidden="true" /><strong>{cities.find(city => city.code === selected)?.name}</strong><span>dans le pays de Lorient</span></p>
      <span className="lorient-map-note">Quelques repères dans notre zone d’intervention.</span>
    </figcaption>
    <details className="lorient-map-source"><summary>Sources cartographiques</summary><p>Contour départemental : <a href="https://github.com/gregoiredavid/france-geojson" target="_blank" rel="noopener noreferrer">France GeoJSON, données IGN/INSEE</a>, sous <a href="https://www.etalab.gouv.fr/licence-ouverte-open-licence/" target="_blank" rel="noopener noreferrer">Licence ouverte</a>. Centres des communes : <a href="https://geo.api.gouv.fr/decoupage-administratif/communes" target="_blank" rel="noopener noreferrer">API Découpage administratif</a>. Ces repères situent des communes, pas une adresse d’agence.</p></details>
  </figure>
}
