// Historical bootstrap/debug endpoints must not bypass the single-account policy.
function retired() {
  return Response.json({ success: false, error: 'Cet outil de maintenance public a été retiré.' }, { status: 410, headers: { 'Cache-Control': 'no-store' } })
}
export { retired as GET, retired as POST, retired as PUT, retired as PATCH, retired as DELETE }
