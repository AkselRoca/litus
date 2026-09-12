'use client'

import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { Check, Download, Loader2, ShieldCheck } from 'lucide-react'

type Setup = { qr: string; secret: string; expiresAt: number }
const field = 'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary dark:border-white/10 dark:bg-white/5 dark:text-white'
const button = 'inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white disabled:opacity-50'

export function AdminSecuritySettings() {
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const [remaining, setRemaining] = useState(0)
  const [mode, setMode] = useState<'idle' | 'enable' | 'disable'>('idle')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [setup, setSetup] = useState<Setup | null>(null)
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([])
  const [savedCodes, setSavedCodes] = useState(false)
  const [reconnect, setReconnect] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    fetch('/api/admin/security', { cache: 'no-store' })
      .then(async response => {
        const data = await response.json()
        if (!response.ok || !data.success) throw new Error(data.error || 'Impossible de charger la sécurité.')
        if (alive) { setEnabled(data.enabled); setRemaining(data.recoveryCodesRemaining) }
      })
      .catch(error => { if (alive) setError(error.message) })
    return () => { alive = false }
  }, [])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const action = mode === 'disable' ? 'disable' : setup ? 'confirm' : 'begin'
      const response = await fetch('/api/admin/security', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, cache: 'no-store',
        body: JSON.stringify({ action, password, code }),
      })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error(data.error || 'La modification a échoué.')
      if (action === 'begin') setSetup({ qr: data.qr, secret: data.secret, expiresAt: data.expiresAt })
      else {
        setEnabled(data.enabled)
        setRecoveryCodes(data.recoveryCodes || [])
        setSetup(null)
        setPassword('')
        setCode('')
        setReconnect(true)
        setMode('idle')
      }
    } catch (error) { setError(error instanceof Error ? error.message : 'Service indisponible.') }
    finally { setBusy(false) }
  }

  function downloadCodes() {
    const content = ['Litus - Codes de secours', '', 'Chaque code fonctionne une seule fois, avec votre mot de passe.', 'Conservez ce fichier dans un emplacement prive et securise.', '', ...recoveryCodes].join('\n')
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'litus-codes-de-secours.txt'
    anchor.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  async function reconnectAccount() {
    setBusy(true)
    try { await signOut({ redirect: false }); window.location.replace('/login-admin') }
    catch { setError('Ouvrez la page de connexion pour vous reconnecter.'); setBusy(false) }
  }

  return (
    <section aria-labelledby="admin-security-title" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 dark:border-white/10 dark:bg-[#111] dark:shadow-none">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="admin-security-title" className="flex items-center gap-3 text-lg font-bold text-gray-900 dark:text-white"><ShieldCheck className="h-5 w-5 text-primary" /> Sécurité du compte Litus</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">Google Authenticator ajoute un code temporaire à votre mot de passe. Aucun compte Google n’est nécessaire.</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${enabled ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300'}`} aria-live="polite">{enabled === null ? 'Chargement' : enabled ? 'Oui' : 'Non'}</span>
      </div>
      <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-200">Double authentification activée : {enabled === null ? 'statut en cours de chargement' : enabled ? 'Oui' : 'Non'}</p>
      {error && <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">{error}</p>}

      {recoveryCodes.length > 0 && (
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <h3 className="font-bold text-gray-900 dark:text-white">Vos codes de secours</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">Ils ne seront affichés qu’une seule fois. Chaque code remplace un code Google Authenticator et ne peut servir qu’une fois. Gardez-les séparément de votre téléphone.</p>
          <ul className="my-5 grid gap-2 sm:grid-cols-2">{recoveryCodes.map(value => <li key={value} className="select-all break-all rounded-lg bg-white p-2.5 font-mono text-sm text-gray-900 dark:bg-black/30 dark:text-white">{value}</li>)}</ul>
          <button type="button" onClick={downloadCodes} className={button}><Download className="h-4 w-4" /> Télécharger les codes</button>
          <label className="mt-5 flex items-start gap-3 text-sm text-gray-700 dark:text-gray-200"><input type="checkbox" checked={savedCodes} onChange={event => setSavedCodes(event.target.checked)} className="mt-1" /> J’ai conservé mes codes de secours en lieu sûr.</label>
        </div>
      )}

      {reconnect ? (
        <div className="mt-5 space-y-4">
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300"><Check className="mr-2 inline h-4 w-4 text-green-600" /> Modification enregistrée. Les anciennes sessions sont révoquées par sécurité. {enabled && 'Pour vous reconnecter, attendez un nouveau code à 6 chiffres : celui de la configuration est déjà utilisé.'}</p>
          <button type="button" onClick={reconnectAccount} disabled={busy || (recoveryCodes.length > 0 && !savedCodes)} className={button}>Me reconnecter</button>
        </div>
      ) : mode === 'idle' ? (
        <div className="mt-5 space-y-3">
          {enabled && <p className="text-sm text-gray-500 dark:text-gray-400">{remaining} code{remaining > 1 ? 's' : ''} de secours restant{remaining > 1 ? 's' : ''}.</p>}
          <button type="button" disabled={enabled === null} onClick={() => { setMode(enabled ? 'disable' : 'enable'); setError('') }} className={enabled ? 'text-sm font-medium text-gray-500 underline underline-offset-4 dark:text-gray-400' : button}>{enabled ? 'Désactiver la double authentification' : 'Activer avec Google Authenticator'}</button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-5">
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{mode === 'disable' ? 'Cette action retire la protection supplémentaire. Confirmez avec votre mot de passe et un code actuel non encore utilisé, ou un code de secours.' : 'Confirmez votre mot de passe, puis scannez le QR code dans Google Authenticator. La protection ne sera active qu’après validation du premier code.'}</p>
          <div><label htmlFor="security-password" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Mot de passe actuel</label><input id="security-password" type="password" autoComplete="current-password" required maxLength={256} value={password} onChange={event => setPassword(event.target.value)} className={field} /></div>
          {setup && (
            <div className="rounded-xl border border-gray-200 p-4 dark:border-white/10">
              <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-200">Dans Google Authenticator, ajoutez un compte et scannez ce QR code.</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={setup.qr} width={256} height={256} alt="QR code privé pour associer Google Authenticator au compte Litus" className="max-w-full rounded-lg bg-white" />
              <details className="mt-4 text-sm text-gray-600 dark:text-gray-300"><summary className="cursor-pointer">Saisir la clé manuellement</summary><p className="mt-3">Compte : Litus / Administration. Type : basé sur le temps.</p><code className="mt-2 block select-all break-all rounded-lg bg-gray-50 p-3 font-mono dark:bg-white/5">{setup.secret}</code></details>
              <p className="mt-3 text-xs text-gray-500">QR code privé, valable dix minutes. Ne le partagez pas.</p>
            </div>
          )}
          {(setup || mode === 'disable') && <div><label htmlFor="security-code" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">{setup ? 'Premier code à 6 chiffres' : 'Code Google Authenticator ou code de secours'}</label><input id="security-code" type="text" autoComplete="one-time-code" autoCapitalize="off" spellCheck={false} required maxLength={32} pattern={setup ? '[0-9]{6}' : undefined} inputMode={setup ? 'numeric' : 'text'} value={code} onChange={event => setCode(event.target.value)} className={field} /></div>}
          <div className="flex flex-wrap items-center gap-4"><button type="submit" disabled={busy} className={button}>{busy && <Loader2 className="h-4 w-4 animate-spin" />}{mode === 'disable' ? 'Confirmer la désactivation' : setup ? 'Valider le code et activer' : 'Configurer Google Authenticator'}</button><button type="button" disabled={busy} onClick={() => { setMode('idle'); setSetup(null); setPassword(''); setCode(''); setError('') }} className="text-sm text-gray-500">Annuler</button></div>
          {setup && <button type="button" disabled={busy} onClick={() => { setSetup(null); setCode(''); setError('') }} className="text-sm text-gray-500 underline">QR code expiré ? Recommencer</button>}
        </form>
      )}
    </section>
  )
}
