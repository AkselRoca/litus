import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const photos = [
  ['plombier', 'raccords-tuyauterie', 16509869, 'close-up-of-man-using-a-spanner', 'AR Abnoy', 'Réseaux et raccords', 'Mains gantées utilisant une clé sur des raccords de tuyauterie dans un local technique'],
  ['plombier', 'salle-de-bain-douche', 6580405, 'marbled-wall-shower-room', 'Max Vakhtbovych', 'Équipements de salle de bain', 'Espace douche équipé de robinetterie, avec parois en marbre et carrelage vert'],
  ['electricien', 'installation-cables-batiment', 4981793, 'a-man-wearing-safety-helmet-while-repairing-a-wall', 'Antoni Shkraba', 'Installation dans le bâtiment', 'Électricien avec un casque de protection intervenant sur le câblage mural d’un bâtiment'],
  ['electricien', 'armoire-electrique', 21812143, 'electrician-working-with-cables', 'Shameer Vayalakkad Hydrose', 'Câblage et équipements', 'Professionnel portant un casque bleu devant les câbles et composants d’une armoire électrique'],
  ['chauffagiste-climatisation', 'unite-exterieure-climatisation', 27134985, 'view-of-the-air-conditioning-unit-outside-the-building', 'FOX', 'Unité extérieure', 'Unité extérieure de climatisation fixée sur le mur d’un bâtiment'],
  ['chauffagiste-climatisation', 'climatisation-balcon', 32772143, 'air-conditioning-unit-on-urban-balcony', 'Can Ceylan', 'Équipement en habitat collectif', 'Groupe extérieur de climatisation installé sur un balcon avec des plantes en pot'],
  ['couvreur', 'pose-couverture-toiture', 9431615, 'handyman-putting-roof-tiles-on-roof', 'Keith', 'Pose de couverture', 'Artisan travaillant à la pose de bardeaux sur la toiture d’une maison'],
  ['couvreur', 'intervention-toit-tuiles', 37623622, 'roofer-working-on-roof-installation-with-safety-gear', 'Bulat843', 'Intervention en toiture', 'Couvreur portant des équipements de protection sur une toiture inclinée en tuiles'],
  ['menuisier', 'artisan-atelier-bois', 18947369, 'a-carpenter-working-with-wood-in-a-workshop', 'GOWTHAM AGM', 'Travail du bois en atelier', 'Artisan travaillant le bois dans un atelier entouré de planches et de machines'],
  ['menuisier', 'outillage-travail-bois', 14951839, 'close-up-of-tools', 'FFD Restorations', 'Outils et savoir-faire', 'Outils à main et manches en bois rangés dans un atelier de travail du bois'],
  ['peintre', 'peinture-mur-interieur', 6474471, 'man-painting-the-wall', 'Tima Miroshnichenko', 'Peinture intérieure', 'Peintre appliquant de la peinture au rouleau sur un mur pendant une rénovation intérieure'],
  ['peintre', 'application-peinture-rouleau', 7149336, 'a-man-painting-a-wall', 'cottonbro studio', 'Application au rouleau', 'Vue de dos d’une personne peignant un mur intérieur avec un rouleau'],
  ['carreleur', 'decoupe-carrelage-chantier', 14124893, 'workmen-using-a-grinder', 'Mehmet Turgut Kirkgoz', 'Découpe et préparation', 'Deux artisans utilisant un outil de découpe sur un chantier de pose de revêtement de sol'],
  ['carreleur', 'finitions-salle-de-bain-carrelee', 22330652, 'a-bathroom-with-a-tub-sink-and-toilet', 'Alexander F Ungerer', 'Revêtements et finitions', 'Salle de bain contemporaine avec carrelage clair, baignoire et équipements sanitaires'],
  ['macon', 'maconnerie-mur-mortier', 10383580, 'man-building-wall', 'Trần Hồng Công', 'Construction de murs', 'Maçon appliquant du mortier à la truelle sur un mur en cours de construction'],
  ['macon', 'chantier-mur-briques', 33603170, 'bricklayer-working-on-construction-site-in-vietnam', 'Thanh Long Bùi', 'Maçonnerie sur chantier', 'Ouvrier construisant un mur en briques à l’intérieur d’un chantier de bâtiment'],
  ['paysagiste', 'taille-haies-entretien', 33688146, 'gardener-trimming-hedges-in-modern-urban-setting', 'Nothing Ahead', 'Entretien des espaces verts', 'Jardinier taillant une haie devant un bâtiment contemporain avec des cisailles'],
  ['paysagiste', 'jardin-escalier-vegetalise', 6774013, 'green-trees-and-plants-along-the-pathway-of-a-garden', 'Rachel Claire', 'Ambiance et aménagement', 'Escalier de pierre et entrée de jardin entourés de plantes et de végétation dense'],
  ['renovation-interieure', 'piece-travaux-renovation', 15798784, 'interior-of-a-room-under-renovation', 'Francesco Ungaro', 'Un intérieur en transformation', 'Pièce lumineuse en cours de rénovation avec des matériaux et des outils de chantier'],
  ['renovation-interieure', 'observation-chantier-interieur', 4249477, 'woman-standing-in-room-with-unfinished-walls', 'Monica Silvestre', 'Lire les volumes existants', 'Personne observant une pièce en travaux avec des parois ouvertes et une structure en bois visible'],
];
const root = new URL('../public/artisan/galerie/', import.meta.url);
await mkdir(root, { recursive: true });
const manifest = {};
for (const [trade, name, id, sourceName, author, caption, alt] of photos) {
  const response = await fetch(`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`, { signal: AbortSignal.timeout(30000) });
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Invalid image for ${trade}/${name}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  // Preserve the entire photograph: no crop, AI retouching, or stretching.
  const info = await sharp(buffer).rotate().resize({ width: 1440, height: 1080, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(fileURLToPath(new URL(`${trade}-${name}.webp`, root)));
  (manifest[trade] ??= []).push({ src: `/artisan/galerie/${trade}-${name}.webp`, width: info.width, height: info.height, bytes: info.size, alt, caption, author,
    source: `https://www.pexels.com/photo/${sourceName}-${id}/`, license: 'https://www.pexels.com/license/',
    usage: 'Photographie d’illustration sous licence Pexels. Ne représente pas une réalisation de Litus ni une recommandation de Litus par les personnes ou marques visibles.', aiGenerated: false });
  console.log(`${trade}/${name}: ${info.width}x${info.height}, ${info.size} bytes`);
}
await writeFile(new URL('../src/lib/artisan/photos.json', import.meta.url), JSON.stringify(manifest, null, 2) + '\n');
const credits = ['# Photographies des métiers artisans', '', '20 photographies Pexels, deux par métier, téléchargées le 13 septembre 2026.', 'La licence Pexels autorise leur utilisation sur un site web. Aucun soutien commercial des personnes ou marques photographiées n’est revendiqué.', 'Les photos sont des illustrations indépendantes des réalisations clients de Litus. Aucun visuel généré par IA.', '', 'Licence : https://www.pexels.com/license/', ''];
for (const [trade, images] of Object.entries(manifest)) { credits.push(`## ${trade}`, ''); for (const img of images) credits.push(`- ${img.caption} : ${img.author}. [Source](${img.source}). Fichier : \`${img.src}\`, ${img.width} x ${img.height}, ${img.bytes} octets.`, ''); }
await writeFile(new URL('CREDITS.md', root), credits.join('\n'));
