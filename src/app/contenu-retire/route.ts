const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Contenu retiré | Litus</title>
<style>body{margin:0;background:#faf9f6;color:#142238;font-family:ui-sans-serif,sans-serif}main{max-width:680px;margin:12vh auto;padding:32px}header{display:flex;align-items:center;gap:12px;margin-bottom:60px;font-size:28px;font-weight:700}header img{object-fit:contain}small{color:#c7431b;letter-spacing:.12em}h1{font-size:clamp(30px,6vw,48px);line-height:1.12;letter-spacing:-.04em}p{font-size:18px;line-height:1.7;color:#536176}nav{display:flex;flex-wrap:wrap;gap:16px;margin-top:32px}a{color:#c7431b;text-underline-offset:5px}nav a:first-child{padding:14px 22px;border-radius:30px;background:#e95e2a;color:white;text-decoration:none}nav a:last-child{align-self:center}</style></head>
<body><main><header><img src="/logo-sans-fond.png" width="40" height="45" alt="">Litus</header><small>410 · CONTENU RETIRÉ</small><h1>Ce contenu a été retiré.</h1><p>Cette ancienne page ou ressource n’est plus disponible. Retrouvez nos prestations actuelles ou échangez avec notre équipe pour identifier la solution adaptée à votre projet.</p><nav aria-label="Continuer sur le site"><a href="/expertise">Découvrir nos expertises</a><a href="/contact">Contacter Litus</a></nav></main></body></html>`

const headers = {
  'Content-Type': 'text/html; charset=utf-8',
  'X-Robots-Tag': 'noindex, follow',
  'Cache-Control': 'public, max-age=3600',
}

export function GET() {
  return new Response(html, { status: 410, headers })
}

export function HEAD() {
  return new Response(null, { status: 410, headers })
}
