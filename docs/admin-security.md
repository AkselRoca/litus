# Litus admin security - build 1.04.b

## Session correction

The production `/api/auth/providers` endpoint was returning `http://localhost:3000`
sign-in and callback URLs. The local `.env` was included in Vercel CLI uploads.
`.vercelignore` now excludes all local environment files. Production configuration
comes only from Vercel; Auth.js infers the HTTPS host. All auth entry points use
the same secure-cookie policy. Login performs a full navigation to discard
anonymous prefetched redirects. Admin navigation does not prefetch destinations.

Auth.js JWT sessions last seven days with rolling renewal through the proxy.
Next.js 16's Node-runtime `proxy.ts` replaces the older middleware entry point.
Every admin API handler also checks the session independently, and mutations
require a matching Origin header. Historical public bootstrap/debug endpoints
return 410. The public contact form and editorial cron are not changed.

## Single account

Only the existing `litusagency@gmail.com` administrator can log in. The displayed
name is Litus. Other identities are retained for historical CRM relations but
cannot authenticate. Team management is removed; the read-only team endpoint
returns the single account for existing CRM selectors. Client session updates
cannot modify roles, identity, security version or second-factor verification.

## Google Authenticator

This is TOTP, not Google OAuth. No Google Cloud project is required.

1. Open Admin > Parametres > Securite du compte Litus.
2. Choose Activer avec Google Authenticator and confirm the existing password.
3. Scan the private QR code or enter the key manually in the authenticator app.
4. Enter its current six-digit code. Only then does the actual status become Oui.
5. Store the ten one-time recovery codes, then reconnect with a fresh app code.

The enrollment QR expires after ten minutes. Secrets are AES-256-GCM encrypted
using the separate `ADMIN_2FA_ENCRYPTION_KEY` (32 random bytes, base64 encoded).
QR codes are generated locally, never through a third-party image service.
Recovery codes contain 80 random bits each and are stored only as keyed hashes.
TOTP uses SHA-1, six digits, 30-second periods and a one-step clock tolerance.
Database compare-and-update statements prevent OTP and recovery-code replay.
Twelve sign-in attempts per five-minute window and ten security changes per
five-minute window are enforced across serverless instances. Only keyed counter
identifiers are stored, with opportunistic removal after 24 hours.

Enabling/disabling 2FA increments the security version and revokes old sessions.
Disabling requires the password plus a fresh TOTP or unused recovery code.
The UI never marks 2FA enabled before the phone association is confirmed.
Do not activate the real account in automated tests or print QR seeds/codes.

## Deployment and recovery

- Configure `ADMIN_2FA_ENCRYPTION_KEY` in Vercel Production before deploying.
- Keep an encrypted backup of this key; do not rotate it without re-enrollment.
- Run `scripts/admin-security-migrate.mjs` with the existing Turso environment.
- Migration is transactional/idempotent and does not alter passwords, remove
  identities, or reset already configured 2FA.
- Build and publish normally; increment the footer build for each release.
- Existing insecure cookies may require one initial reconnection after this fix.
- If both phone and recovery codes are lost, recovery requires an authenticated
  operator and an explicitly authorized security reset. No public reset bypass.

## Repeatable checks

After `npm run build`, run `node scripts/admin-security-qa.mjs`. It creates a new
isolated SQLite database under `.tmp`, starts a production-mode server at port
3110 with temporary credentials, and terminates that server on completion. It
does not use production Turso credentials or change the real account's 2FA.

Release result (2026-09-12): production build and targeted ESLint passed.
The 13 isolated integration scenarios passed, including eight admin destinations
with regular/RSC navigation, enrollment, required second factor, replay rejection,
concurrent recovery-code use, session revocation, CSRF, retired endpoints and
persistent attempt limits. The real administrator's password and 2FA were not changed.

References: [Auth.js deployment](https://authjs.dev/getting-started/deployment),
[Auth.js runtime compatibility](https://authjs.dev/guides/edge-compatibility),
[OTPAuth](https://github.com/hectorm/otpauth),
[OWASP MFA guidance](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html).
