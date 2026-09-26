'use client'

import { useState } from 'react'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export function ContactForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !message.trim()) return

    const fullMessage = `Hello Dhanya Trail!%0A*Name:* ${encodeURIComponent(name.trim())}%0A*Phone:* ${encodeURIComponent(phone.trim())}%0A*Enquiry:* ${encodeURIComponent(message.trim())}`
    const waUrl = buildWhatsAppUrl('917082977350', fullMessage)

    setSubmitted(true)
    window.open(waUrl, '_blank', 'noopener,noreferrer')
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '24px', background: 'var(--cream)', borderRadius: 'var(--radius-md)', border: '1px solid var(--gold)' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>✅</div>
        <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginBottom: '8px' }}>Thank you, {name}!</h3>
        <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem', marginBottom: '16px' }}>
          Your enquiry has been forwarded to our WhatsApp support team. We will get back to you shortly!
        </p>
        <button
          onClick={() => { setSubmitted(false); setMessage(''); }}
          className="btn btn-outline btn-sm"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--green)', marginBottom: '4px' }}>
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gold-light)', background: 'var(--cream)' }}
          required
        />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--green)', marginBottom: '4px' }}>
          Phone / WhatsApp Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gold-light)', background: 'var(--cream)' }}
          required
        />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--green)', marginBottom: '4px' }}>
          Message / Product Query
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help you?"
          style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gold-light)', background: 'var(--cream)' }}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', cursor: 'pointer' }}>
        Send Enquiry via WhatsApp
      </button>
    </form>
  )
}
