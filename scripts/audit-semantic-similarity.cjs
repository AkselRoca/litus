const fs = require('node:fs');
const dir = process.argv[2] || 'artifacts/seo-global-after-local';
const pages = JSON.parse(fs.readFileSync(`${dir}/report.json`, 'utf8')).pages.filter(p => p.status === 200 && !p.robots.includes('noindex'));
const sets = pages.map(p => {
  const words = p.content.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(/\s+/);
  return new Set(words.slice(0, -4).map((_, i) => words.slice(i, i + 5).join(' ')));
});
const pairs = [];
for (let i = 0; i < pages.length; i++) for (let j = i + 1; j < pages.length; j++) {
  let overlap = 0;
  for (const phrase of sets[i]) if (sets[j].has(phrase)) overlap++;
  const similarity = overlap / (sets[i].size + sets[j].size - overlap);
  if (similarity > 0.25) pairs.push({ a: pages[i].path, b: pages[j].path, similarity: +similarity.toFixed(3) });
}
pairs.sort((a, b) => b.similarity - a.similarity);
fs.writeFileSync(`${dir}/semantic-similarity.json`, JSON.stringify(pairs, null, 2));
console.log(JSON.stringify({ above25Percent: pairs.length, strongest: pairs.slice(0, 12) }, null, 2));
