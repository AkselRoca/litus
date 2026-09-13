import geography from './territory-geography.json'

export type TerritoryCity = 'lorient' | 'le-mans'

/** Real local coordinates stay tied to the geography, including during motion. */
export function TerritoryMap({ city, onSelect, onHoverChange }: {
  city: TerritoryCity
  onSelect: (city: TerritoryCity) => void
  onHoverChange: (hovered: boolean) => void
}) {
  const { lorient, leMans } = geography.points
  const forward = `M${lorient[0]} ${lorient[1]} C258 172 404 165 ${leMans[0]} ${leMans[1]}`
  // Reverse the same Bézier curve so the light always travels to the active city.
  const route = city === 'le-mans' ? forward : `M${leMans[0]} ${leMans[1]} C404 165 258 172 ${lorient[0]} ${lorient[1]}`
  return <svg className="territory-map" viewBox="0 0 600 490" fill="none" role="group" aria-label="Choisir une implantation" data-motion-layer="map">
    <defs>
      <linearGradient id="territory-map-fill" x1="50" y1="60" x2="520" y2="420" gradientUnits="userSpaceOnUse"><stop stopColor="#4b5e71" stopOpacity=".22" /><stop offset="1" stopColor="#162333" stopOpacity=".5" /></linearGradient>
      <filter id="territory-route-glow" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="3" /></filter>
      <filter id="territory-pin-glow" x="-150%" y="-100%" width="400%" height="300%"><feGaussianBlur stdDeviation="7" /></filter>
    </defs>
    <g transform="rotate(22 300 245)">
      <g className="territory-departments" aria-hidden="true" fill="url(#territory-map-fill)" stroke="#a9b6c3" strokeOpacity=".52" strokeWidth=".9" strokeLinejoin="round">
        {geography.paths.map(region => <path key={region.code} d={region.d} data-department={region.code}><title>{region.name}</title></path>)}
      </g>
      <g key={city} className="territory-route-selection" aria-hidden="true" data-destination={city}>
        <path className="territory-route-base" d={route} stroke="#f48447" strokeWidth="1.4" opacity=".26" />
        <path className="territory-route territory-route--glow" pathLength={1} d={route} stroke="#ff782f" strokeWidth="8" opacity=".64" filter="url(#territory-route-glow)" />
        <path className="territory-route territory-connection" data-motion-layer="route" pathLength={1} d={route} stroke="#ffac65" strokeWidth="2.2" strokeLinecap="round" />
        <path className="territory-route-traveller territory-route-traveller--glow" pathLength={1} d={route} stroke="#ffb46d" strokeWidth="10" strokeLinecap="round" filter="url(#territory-route-glow)" />
        <path className="territory-route-traveller" pathLength={1} d={route} stroke="#fff1d9" strokeWidth="2.8" strokeLinecap="round" />
      </g>
      {[
        { name: 'lorient', label: 'Lorient', lines: ['Mer & opportunités'], point: lorient },
        { name: 'le-mans', label: 'Le Mans', lines: ['Dynamisme', '& croissance'], point: leMans },
      ].map(({name, label, lines, point}) => <g key={name} className="territory-city-selector" transform={`translate(${point[0]} ${point[1]}) rotate(-22)`}
        role="button" tabIndex={0} aria-pressed={city === name} aria-controls="territory-city-photo"
        onPointerEnter={event => { if (event.pointerType !== 'touch') { onHoverChange(true); onSelect(name as TerritoryCity) } }}
        onPointerLeave={() => onHoverChange(false)}
        onFocus={() => onSelect(name as TerritoryCity)}
        onClick={() => onSelect(name as TerritoryCity)}
        onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(name as TerritoryCity) } }}>
        <rect className="territory-city-hit" x="-40" y="-47" width="196" height={name === 'lorient' ? 126 : 148} rx="12" fill="transparent" />
        <rect className="territory-city-focus" x="-40" y="-47" width="196" height={name === 'lorient' ? 126 : 148} rx="12" stroke="#ffd0a9" strokeWidth="2" />
        <g className={`territory-pin territory-pin--${name}`} data-motion-layer={`pin-${name}`}>
          <circle className="territory-pin-halo" cy="-13" r="20" fill="#ff793a" filter="url(#territory-pin-glow)" />
          <circle className="territory-pin-ring" r="9" stroke="#ff9a5f" strokeOpacity=".55" />
          <circle r="4" fill="#fff8e8" />
          <path d="M0-6C-3-11-11-20-11-27a11 11 0 0 1 22 0C11-20 3-11 0-6Z" fill="#ed632f" stroke="#fff9e9" strokeWidth="2.6" />
          <circle cy="-27" r="4" fill="#fff9e9" />
        </g>
        <text className="territory-map-city" x="-32" y="39" fill="#f8fafc" fontSize="22" fontWeight="600" letterSpacing="-.6">{label}</text>
        <text className="territory-map-caption" x="-32" y="64" fill="#b8c5d0" fontSize="16.5" fontWeight="400" letterSpacing="-.3">
          {lines.map((line, index) => <tspan key={line} x="-32" dy={index === 0 ? 0 : 20}>{line}</tspan>)}
        </text>
      </g>)}
    </g>
  </svg>
}
