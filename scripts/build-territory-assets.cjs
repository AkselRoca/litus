const fs = require('node:fs')
const sharp = require('sharp')

async function main() {
  const photo = await fetch('https://upload.wikimedia.org/wikipedia/commons/2/23/Le_quai_de_Rohan_%28Lorient%29_apr%C3%A8s_la_pluie_-_panoramio.jpg')
  if (!photo.ok) throw new Error(`Photo download failed: ${photo.status}`)
  await sharp(Buffer.from(await photo.arrayBuffer())).resize({ width: 1200 }).webp({ quality: 86 }).toFile('public/territories/lorient-port.webp')
  const map = await fetch('https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson')
  if (!map.ok) throw new Error(`Map download failed: ${map.status}`)
  const { features } = await map.json()
  const codes = ['29', '22', '56', '35', '44', '49', '53', '72', '85', '50', '61', '14']
  const project = ([lon, lat]) => [(lon + 5.15) * 90 + 8, (49.78 - lat) * 131 + 8]
  const paths = features.filter(f => codes.includes(f.properties.code)).map(f => {
    const polygons = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates]
    return { code: f.properties.code, name: f.properties.nom, d: polygons.map(poly => poly.map(ring => ring.map((p, i) => `${i ? 'L' : 'M'}${project(p).map(n => n.toFixed(1)).join(',')}`).join(' ') + 'Z').join(' ')).join(' ') }
  })
  const points = { lorient: project([-3.366, 47.748]), leMans: project([0.1996, 48.0061]) }
  fs.writeFileSync('src/components/sections/home/territory-geography.json', JSON.stringify({ paths, points }, null, 2))
  console.log('Prepared real Lorient photo and department map.', points)
}
main().catch(error => { console.error(error); process.exit(1) })
