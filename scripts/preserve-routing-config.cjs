// Next 16 serializes a reduced runtime config which omits this routing flag.
// Keep the deployed adapter aligned with next.config.ts, without editing Next.
const fs = require('node:fs/promises');
const path = require('node:path');
const loadConfig = require('next/dist/server/config').default;
const { PHASE_PRODUCTION_BUILD } = require('next/constants');

(async () => {
  const config = await loadConfig(PHASE_PRODUCTION_BUILD, process.cwd());
  const file = path.join(process.cwd(), config.distDir, 'required-server-files.json');
  const manifest = JSON.parse(await fs.readFile(file, 'utf8'));
  if (config.skipTrailingSlashRedirect === undefined) delete manifest.config.skipTrailingSlashRedirect;
  else manifest.config.skipTrailingSlashRedirect = config.skipTrailingSlashRedirect;
  await fs.writeFile(file, JSON.stringify(manifest));
  console.log(`Routing config preserved: skipTrailingSlashRedirect=${manifest.config.skipTrailingSlashRedirect}`);
})().catch(error => { console.error(error); process.exitCode = 1; });
