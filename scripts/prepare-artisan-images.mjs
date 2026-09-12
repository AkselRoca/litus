import { mkdir, writeFile, readFile } from 'node:fs/promises';
import sharp from 'sharp';

const root = new URL('../public/artisan/', import.meta.url);
await mkdir(root, { recursive: true });
const photos = [
  ['plombier', 32588548, 'Bulat843', 'plumber-repairing-pipe-with-wrench-indoors', 'Plombier en tenue bleue serrant un raccord de tuyauterie avec une clé'],
  ['electricien', 34054464, 'Bulat843', 'electrician-diagnosing-electrical-panel-with-multimeter', 'Électricien contrôlant les connexions d’un tableau électrique avec un multimètre'],
  ['chauffagiste-climatisation', 5463580, 'José Andrés Pacheco Cortes', 'man-repairing-an-aircon', 'Technicien intervenant sur un appareil de climatisation ouvert'],
  ['couvreur', 31771166, 'Clément Proust', 'roofer-working-on-new-house-roof-installation', 'Couvreur travaillant sur la couverture d’une maison en construction'],
  ['peintre', 7218578, 'Blue Bird', 'person-painting-the-wall-with-a-roller', 'Application de peinture blanche au rouleau sur un mur intérieur'],
  ['carreleur', 29181494, 'Sergei Starostin', 'construction-worker-laying-tile-in-renovation-project', 'Artisan posant du carrelage pendant une rénovation intérieure'],
  ['macon', 30081237, 'Photo Pexels', 'bricklayers-at-work-on-construction-site', 'Maçons travaillant à la construction d’un mur en briques'],
  ['renovation-interieure', 30924413, 'Brett Jordan', 'modern-kitchen-renovation-in-progress', 'Cuisine lumineuse en cours de rénovation avec matériaux et outils de chantier'],
];
const credits = [];
for (const [slug, id, author, page, alt] of photos) {
  const response = await fetch(`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`${slug}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const result = await sharp(bytes).rotate().resize(1280, 960, { fit: 'cover', position: 'attention' }).webp({ quality: 80 }).toFile(new URL(`${slug}-metier.webp`, root).pathname.replace(/^\/(\w:)/, '$1'));
  credits.push({ slug, src: `/artisan/${slug}-metier.webp`, alt, width: 1280, height: 960, bytes: result.size, author, source: `https://www.pexels.com/photo/${page}-${id}/`, license: 'https://www.pexels.com/license/', usage: 'Photographie d’illustration ; ne représente pas une entreprise cliente de Litus.' });
  console.log(`${slug}: ${result.size} bytes`);
}
for (const [slug, source, alt, credit] of [
  ['menuisier', '../artisans/atelier-bois.webp', 'Établi et outillage dans un atelier de menuiserie', 's w / wengenroad · CC0 · /artisans/CREDITS.txt'],
  ['paysagiste', '../realisations/clients/west-clotures-paysage/paysage.webp', 'Terrasse éclairée et jardin paysager issus de l’univers du site West Clôtures', 'Visuel du site client West Clôtures · https://www.westclotures.fr/images/hero-bg.webp'],
]) {
  const bytes = await readFile(new URL(source, root));
  const result = await sharp(bytes).resize(1280, 960, { fit: 'cover' }).webp({ quality: 80 }).toFile(new URL(`${slug}-metier.webp`, root).pathname.replace(/^\/(\w:)/, '$1'));
  credits.push({ slug, src: `/artisan/${slug}-metier.webp`, alt, width: 1280, height: 960, bytes: result.size, source: credit, usage: slug === 'menuisier' ? 'Photographie d’illustration CC0.' : 'Univers visuel du projet client, sans attribution du chantier à Litus.' });
}
await writeFile(new URL('credits.json', root), JSON.stringify(credits, null, 2) + '\n');
