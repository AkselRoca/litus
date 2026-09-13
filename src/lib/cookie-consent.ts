export interface CookiePreferences {
  essential: true
  analytics: boolean
  marketing: boolean
}

export const CONSENT_EVENT = 'litus:consent-changed'
export const essentialOnly: CookiePreferences = { essential: true, analytics: false, marketing: false }
let memoryConsent: CookiePreferences | null = null

export function readCookieConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null
  try {
    const value = JSON.parse(window.localStorage.getItem('cookie-consent') || 'null')
    return value?.essential === true && typeof value.analytics === 'boolean' && typeof value.marketing === 'boolean'
      ? { essential: true, analytics: value.analytics, marketing: value.marketing }
      : null
  } catch {
    return memoryConsent
  }
}

export function saveCookieConsent(preferences: CookiePreferences) {
  memoryConsent = { ...preferences, essential: true }
  try {
    window.localStorage.setItem('cookie-consent', JSON.stringify(memoryConsent))
    window.localStorage.setItem('cookie-consent-date', new Date().toISOString())
  } catch {
    // The explicit choice still applies to this page when storage is unavailable.
  }
  document.documentElement.dataset.cookieConsent = 'stored'
  window.dispatchEvent(new Event(CONSENT_EVENT))
}

// Avoid a consent-banner flash for returning visitors without making pages dynamic.
// New visitors receive the complete banner in the server-rendered HTML.
export const CONSENT_BOOTSTRAP = `try{var c=JSON.parse(localStorage.getItem('cookie-consent')||'null');if(c&&c.essential===true&&typeof c.analytics==='boolean'&&typeof c.marketing==='boolean')document.documentElement.dataset.cookieConsent='stored'}catch(e){}`
