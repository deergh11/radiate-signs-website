'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Send } from 'lucide-react'

const SERVICE_TYPES = [
  'Custom Neon Sign',
  'Channel Letters',
  'LED Rope Install',
  'UV Printed Sign',
  'Multiple / Not Sure',
]

const BUDGETS = [
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $5,000',
  '$5,000+',
  'Not Sure Yet',
]

const TIMELINES = [
  'ASAP (rush)',
  'Within 2–4 weeks',
  '1–2 months',
  'Just exploring',
]

function QuoteForm() {
  const params = useSearchParams()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
    builderText: params.get('text') || '',
    builderColor: params.get('color') || '',
    builderFont: params.get('font') || '',
    builderSize: params.get('size') || '',
  })

  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.service) {
      setError('Please fill in your name, email, and service type.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please email us directly at radiatesigns@gmail.com')
      }
    } catch {
      setError('Something went wrong. Please email us directly at radiatesigns@gmail.com')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '40px',
      }}>
        <CheckCircle size={64} color="var(--neon-pink)" style={{ marginBottom: 32, filter: 'drop-shadow(0 0 20px var(--neon-pink))' }} />
        <h2 className="display-heading neon-text-pink" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: 16 }}>
          Request Received!
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 440, lineHeight: 1.7, fontSize: '1rem' }}>
          We'll review your request and get back to you within 24 hours with a free design mockup and quote. 
          Check your email — and WhatsApp if you left your number.
        </p>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    color: 'white',
    fontFamily: 'Barlow, sans-serif',
    fontSize: '0.95rem',
    padding: '14px 16px',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.65rem',
    letterSpacing: '3px',
    textTransform: 'uppercase' as const,
    color: 'var(--text-muted)',
    marginBottom: 8,
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {/* Builder pre-fill notice */}
      {form.builderText && (
        <div style={{
          padding: '16px 20px',
          background: 'rgba(255,45,120,0.08)',
          border: '1px solid rgba(255,45,120,0.3)',
          marginBottom: 40,
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
        }}>
          <div style={{ color: 'var(--neon-pink)', fontSize: '1.2rem', flexShrink: 0 }}>✦</div>
          <div>
            <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: 500, marginBottom: 4 }}>
              Design from Sign Builder attached
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Text: "{form.builderText}" · Color: {form.builderColor} · Font: {form.builderFont}
              {form.builderSize ? ` · Size: ~${form.builderSize}` : ''}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Name */}
        <div>
          <label style={labelStyle}>Your Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            style={inputStyle}
            placeholder="John Smith"
            onFocus={e => e.currentTarget.style.borderColor = 'var(--neon-pink)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Business */}
        <div>
          <label style={labelStyle}>Business Name</label>
          <input
            type="text"
            value={form.business}
            onChange={e => set('business', e.target.value)}
            style={inputStyle}
            placeholder="Your Business Inc."
            onFocus={e => e.currentTarget.style.borderColor = 'var(--neon-pink)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            style={inputStyle}
            placeholder="you@business.com"
            onFocus={e => e.currentTarget.style.borderColor = 'var(--neon-pink)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Phone */}
        <div>
          <label style={labelStyle}>Phone / WhatsApp</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => set('phone', e.target.value)}
            style={inputStyle}
            placeholder="(416) 555-0000"
            onFocus={e => e.currentTarget.style.borderColor = 'var(--neon-pink)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
          />
        </div>
      </div>

      {/* Service type */}
      <div style={{ marginTop: 24 }}>
        <label style={labelStyle}>Service Type *</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SERVICE_TYPES.map(s => (
            <button
              key={s}
              onClick={() => set('service', s)}
              style={{
                padding: '10px 20px',
                background: form.service === s ? 'rgba(255,45,120,0.15)' : 'var(--bg-card)',
                border: `1px solid ${form.service === s ? 'var(--neon-pink)' : 'var(--border)'}`,
                color: form.service === s ? 'white' : 'var(--text-muted)',
                fontSize: '0.8rem',
                letterSpacing: '1px',
                fontFamily: 'Barlow, sans-serif',
                transition: 'all 0.2s',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Budget + Timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
        <div>
          <label style={labelStyle}>Budget Range</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {BUDGETS.map(b => (
              <button
                key={b}
                onClick={() => set('budget', b)}
                style={{
                  padding: '10px 16px',
                  background: form.budget === b ? 'rgba(0,245,255,0.08)' : 'var(--bg-card)',
                  border: `1px solid ${form.budget === b ? 'var(--neon-cyan)' : 'var(--border)'}`,
                  color: form.budget === b ? 'white' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontFamily: 'Barlow, sans-serif',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={labelStyle}>Timeline</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {TIMELINES.map(t => (
              <button
                key={t}
                onClick={() => set('timeline', t)}
                style={{
                  padding: '10px 16px',
                  background: form.timeline === t ? 'rgba(0,245,255,0.08)' : 'var(--bg-card)',
                  border: `1px solid ${form.timeline === t ? 'var(--neon-cyan)' : 'var(--border)'}`,
                  color: form.timeline === t ? 'white' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontFamily: 'Barlow, sans-serif',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Message */}
      <div style={{ marginTop: 24 }}>
        <label style={labelStyle}>Tell Us About Your Project</label>
        <textarea
          value={form.message}
          onChange={e => set('message', e.target.value)}
          rows={5}
          style={{ ...inputStyle, resize: 'none' }}
          placeholder="Describe your sign — size, location it'll be installed, any specific requirements, your business type, etc."
          onFocus={e => e.currentTarget.style.borderColor = 'var(--neon-pink)'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
        />
      </div>

      {error && (
        <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(255,45,120,0.1)', border: '1px solid rgba(255,45,120,0.3)', color: 'var(--neon-pink)', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="btn-neon"
        style={{ marginTop: 32, width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '18px', opacity: loading ? 0.6 : 1 }}
      >
        {loading ? 'Sending...' : (<>Send Quote Request <Send size={16} /></>)}
      </button>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
        We respond within 24 hours with a free design mockup. No commitment required.
        <br />Or reach us directly on <a href="https://wa.me/16475459403" style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>WhatsApp</a> · <a href="mailto:radiatesigns@gmail.com" style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>radiatesigns@gmail.com</a>
      </p>

      <style>{`
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

export default function QuotePage() {
  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', padding: '120px 40px 80px' }}>
      <div className="section-label" style={{ marginBottom: 16 }}>It's Free</div>
      <h1 className="display-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white', marginBottom: 16 }}>
        Get Your <span className="neon-text-pink">Free Mockup</span>
      </h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.7, marginBottom: 60 }}>
        Fill out the form below and we'll send you a professional design mockup and detailed quote within 24 hours — completely free, no strings attached.
      </p>
      <Suspense fallback={<div style={{ color: 'var(--text-muted)' }}>Loading...</div>}>
        <QuoteForm />
      </Suspense>
    </div>
  )
}
