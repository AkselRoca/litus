import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const entries = [
  ['place', 13207999, 'place-publique-hotel-de-ville', 'Bastien Neves', 'city-square-with-illuminated-townhouses-against-blue-sky-at-dusk', 'Place pavée et hôtel de ville illuminé à la tombée du jour en France'],
  ['rue', 31754156, 'vie-locale-rue-village-francais', 'Magda Ehlers', 'charming-french-village-street-with-historic-buildings', 'Passants dans une rue de village français bordée de maisons à colombages'],
  ['mairie', 4213217, 'facade-hotel-de-ville-paris', 'Tove Liu', 'hotel-de-ville-in-paris-france', 'Façade en pierre de l’Hôtel de Ville de Paris et ses détails architecturaux'],
  ['bibliotheque', 6344233, 'usagers-lecture-bibliotheque', 'cottonbro studio', 'people-in-a-library', 'Adultes réunis autour d’un livre ouvert dans une bibliothèque'],
];
await mkdir('public/collectivites', { recursive: true });
await mkdir('src/lib/collectivites', { recursive: true });
const photos = {};
for (const [key, id, name, author, slug, alt] of entries) {
  const response = await fetch(`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`);
  if (!response.ok) throw new Error(`Pexels ${id}: ${response.status}`);
  const { data, info } = await sharp(Buffer.from(await response.arrayBuffer())).rotate().resize({ width: 1440, height: 1080, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toBuffer({ resolveWithObject: true });
  await writeFile(`public/collectivites/${name}.webp`, data);
  photos[key] = { src: `/collectivites/${name}.webp`, width: info.width, height: info.height, alt, author, source: `https://www.pexels.com/photo/${slug}-${id}/`, bytes: data.length };
  console.log(`${key}: ${info.width}x${info.height}, ${Math.round(data.length / 1024)} KB`);
}
await writeFile('src/lib/collectivites/photos.json', JSON.stringify(photos, null, 2) + '\n');
await writeFile('public/collectivites/CREDITS.md', '# Photographies Collectivites\n\nLicence Pexels : https://www.pexels.com/license/ (consultee le 13 septembre 2026).\nUsage commercial autorise sous conditions. Photographies d’illustration : aucune personne ni institution representee n’est presentee comme cliente ou partenaire de Litus. Fichiers WebP locaux, proportions conservees.\n\n' + Object.values(photos).map(p => `- ${p.src} : ${p.author}. Source : ${p.source}`).join('\n') + '\n');
