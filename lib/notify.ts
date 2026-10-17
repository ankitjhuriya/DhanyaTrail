// Order notifications to the store owner. Each channel switches on only when its
// settings are present in the hosting environment (Netlify > Site configuration > Environment variables):
//   Email:    RESEND_API_KEY (from resend.com), optional ORDER_NOTIFY_EMAIL (default: store email)
//   WhatsApp: CALLMEBOT_PHONE (e.g. 917082977350) and CALLMEBOT_APIKEY (from callmebot.com)
// Failures never block an order; they are reported back so the API can decide what to tell the customer.

import { BUSINESS } from './business'

const TIMEOUT_MS = 8000

// Returns whether the request succeeded, and logs the reason when it did not (never the key itself),
// so failures show up in Netlify > Logs > Functions.
async function withTimeout(channel: string, promise: Promise<Response>): Promise<boolean> {
  try {
    const res = await Promise.race([
      promise,
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS)),
    ])
    if (!res.ok) console.error(`[notify] ${channel} failed: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`)
    return res.ok
  } catch (e) {
    console.error(`[notify] ${channel} failed: ${e instanceof Error ? e.message : String(e)}`)
    return false
  }
}

export async function notifyByEmail(subject: string, text: string): Promise<boolean | null> {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn('[notify] email skipped: RESEND_API_KEY is not set')
    return null
  }
  const to = process.env.ORDER_NOTIFY_EMAIL || BUSINESS.email
  return withTimeout('email', fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.ORDER_EMAIL_FROM || 'Dhanya Trail Orders <onboarding@resend.dev>',
      to: [to],
      subject,
      text,
    }),
  }))
}

export async function notifyByWhatsApp(text: string): Promise<boolean | null> {
  const phone = process.env.CALLMEBOT_PHONE
  const apikey = process.env.CALLMEBOT_APIKEY
  if (!phone || !apikey) return null // not set up
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`
  return withTimeout('whatsapp', fetch(url))
}

export async function notifyOwner(subject: string, text: string) {
  const [email, whatsapp] = await Promise.all([notifyByEmail(subject, text), notifyByWhatsApp(text)])
  return { email, whatsapp }
}
