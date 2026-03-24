'use client'

import { Suspense, useEffect, useState, type CSSProperties } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Send } from 'lucide-react'

const STORAGE_KEY = 'radiate-builder-state'

const SERVICE_TYPES = [
  'Custom Neon Sign',
  'Channel Letters',
  'LED Rope Install',
  'UV Printed Sign',
  'Multiple / Not Sure',
]

const BUDGETS = [
  'Under $500',
  '$500 - $1,500',
  '$1,500 - $5,000',
  '$5,000+',
  'Not Sure Yet',
]

const TIMELINES = [
  'ASAP (rush)',
  'Within 2-4 weeks',
  '1-2 months',
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
    builderGlow: params.get('glow') || '',
    builderBackboard: params.get('backboard') || '',
    builderMode: params.get('builderMode') || '',
    usedUploadedImage: params.get('usedUploadedImage') || '',
    uploadedImageName: params.get('uploadedImageName') || '',
    overlayScale: params.get('overlayScale') || '',
    overlayPosition: params.get('overlayPosition') || '',
  })

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return

    try {
      const parsed = JSON.parse(stored) as Partial<{
        text: string
        color: string
        font: string
        size: number
        glowIntensity: number
        backboard: string
        mode: string
        overlayScale: number
        overlayX: number
        overlayY: number
        uploadedImageName: string
      }>

      setForm(current => ({
        ...current,
        builderText: current.builderText || parsed.text || '',
        builderColor: current.builderColor || parsed.color || '',
        builderFont: current.builderFont || parsed.font || '',
        builderSize: current.builderSize || (typeof parsed.size === 'number' ? `${Math.round(parsed.size / 10)}cm` : ''),
        builderGlow: current.builderGlow || (typeof parsed.glowIntensity === 'number' ? parsed.glowIntensity.toString() : ''),
        builderBackboard: current.builderBackboard || parsed.backboard || '',
        builderMode: current.builderMode || parsed.mode || '',
        usedUploadedImage: current.usedUploadedImage || (parsed.uploadedImageName ? 'yes' : ''),
        uploadedImageName: current.uploadedImageName || parsed.uploadedImageName || '',
        overlayScale: current.overlayScale || (typeof parsed.overlayScale === 'number' ? parsed.overlayScale.toFixed(2) : ''),
        overlayPosition:
          current.overlayPosition ||
          (typeof parsed.overlayX === 'number' && typeof parsed.overlayY === 'number'
            ? `${Math.round(parsed.overlayX)},${Math.round(parsed.overlayY)}`
            : ''),
      }))
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const set = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.service) {
      setError('Please fill in your name, email, and service type.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (response.ok) {
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '40px' }}>
        <CheckCircle size={64} color="var(--neon-pink)" style={{ marginBottom: 32, filter: 'drop-shadow(0 0 20px var(--neon-pink))' }} />
        <h2 className="display-heading neon-text-pink" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: 16 }}>
          Request Received!
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 440, lineHeight: 1.7, fontSize: '1rem' }}>
          We will review your request and get back to you within 24 hours with a free design mockup and quote.
          Check your email and WhatsApp if you left your number.
        </p>
      </div>
    )
  }

  const inputStyle: CSSProperties = {
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

  const labelStyle: CSSProperties = {
    display: 'block',
    fontSize: '0.65rem',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: 8,
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {form.builderText && (
        <div style={{ padding: '16px 20px', background: 'rgba(194,113,186,0.08)', border: '1px solid rgba(194,113,186,0.3)', marginBottom: 40, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ color: 'var(--neon-pink)', fontSize: '1.2rem', flexShrink: 0 }}>✦</div>
          <div>
            <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: 500, marginBottom: 6 }}>
              Design from Sign Builder attached
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.7 }}>
              Text: "{form.builderText}" · Color: {form.builderColor} · Font: {form.builderFont}
              {form.builderSize ? ` · Size: ~${form.builderSize}` : ''}
              {form.builderGlow ? ` · Glow: ${form.builderGlow}` : ''}
              {form.builderBackboard ? ` · Backboard: ${form.builderBackboard}` : ''}
              {form.builderMode ? ` · Mode: ${form.builderMode === 'mockup' ? 'Upload Your Space' : 'Standard Preview'}` : ''}
              {form.usedUploadedImage === 'yes' ? ' · Uploaded image used' : ''}
              {form.uploadedImageName ? ` (${form.uploadedImageName})` : ''}
              {form.overlayScale ? ` · Overlay scale: ${form.overlayScale}x` : ''}
              {form.overlayPosition ? ` · Position: ${form.overlayPosition}` : ''}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <label style={labelStyle}>Your Name *</label>
          <input type="text" value={form.name} onChange={event => set('name', event.target.value)} style={inputStyle} placeholder="John Smith" onFocus={event => { event.currentTarget.style.borderColor = 'var(--neon-pink)' }} onBlur={event => { event.currentTarget.style.borderColor = 'var(--border)' }} />
        </div>
        <div>
          <label style={labelStyle}>Business Name</label>
          <input type="text" value={form.business} onChange={event => set('business', event.target.value)} style={inputStyle} placeholder="Your Business Inc." onFocus={event => { event.currentTarget.style.borderColor = 'var(--neon-pink)' }} onBlur={event => { event.currentTarget.style.borderColor = 'var(--border)' }} />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input type="email" value={form.email} onChange={event => set('email', event.target.value)} style={inputStyle} placeholder="you@business.com" onFocus={event => { event.currentTarget.style.borderColor = 'var(--neon-pink)' }} onBlur={event => { event.currentTarget.style.borderColor = 'var(--border)' }} />
        </div>
        <div>
          <label style={labelStyle}>Phone / WhatsApp</label>
          <input type="tel" value={form.phone} onChange={event => set('phone', event.target.value)} style={inputStyle} placeholder="(416) 555-0000" onFocus={event => { event.currentTarget.style.borderColor = 'var(--neon-pink)' }} onBlur={event => { event.currentTarget.style.borderColor = 'var(--border)' }} />
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <label style={labelStyle}>Service Type *</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SERVICE_TYPES.map(service => (
            <button key={service} type="button" onClick={() => set('service', service)} style={{ padding: '10px 20px', background: form.service === service ? 'rgba(194,113,186,0.15)' : 'var(--bg-card)', border: `1px solid ${form.service === service ? 'var(--neon-pink)' : 'var(--border)'}`, color: form.service === service ? 'white' : 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '1px', fontFamily: 'Barlow, sans-serif', transition: 'all 0.2s' }}>
              {service}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
        <div>
          <label style={labelStyle}>Budget Range</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {BUDGETS.map(budget => (
              <button key={budget} type="button" onClick={() => set('budget', budget)} style={{ padding: '10px 16px', background: form.budget === budget ? 'rgba(115,194,202,0.08)' : 'var(--bg-card)', border: `1px solid ${form.budget === budget ? 'var(--neon-cyan)' : 'var(--border)'}`, color: form.budget === budget ? 'white' : 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'Barlow, sans-serif', textAlign: 'left', transition: 'all 0.2s' }}>
                {budget}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={labelStyle}>Timeline</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {TIMELINES.map(timeline => (
              <button key={timeline} type="button" onClick={() => set('timeline', timeline)} style={{ padding: '10px 16px', background: form.timeline === timeline ? 'rgba(115,194,202,0.08)' : 'var(--bg-card)', border: `1px solid ${form.timeline === timeline ? 'var(--neon-cyan)' : 'var(--border)'}`, color: form.timeline === timeline ? 'white' : 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'Barlow, sans-serif', textAlign: 'left', transition: 'all 0.2s' }}>
                {timeline}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <label style={labelStyle}>Tell Us About Your Project</label>
        <textarea value={form.message} onChange={event => set('message', event.target.value)} rows={5} style={{ ...inputStyle, resize: 'none' }} placeholder="Describe your sign, where it will be installed, any key dimensions, business type, and whether you want us to refine your uploaded mockup." onFocus={event => { event.currentTarget.style.borderColor = 'var(--neon-pink)' }} onBlur={event => { event.currentTarget.style.borderColor = 'var(--border)' }} />
      </div>

      {error && (
        <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(194,113,186,0.1)', border: '1px solid rgba(194,113,186,0.3)', color: 'var(--neon-pink)', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      <button onClick={handleSubmit} disabled={loading} className="btn-neon" style={{ marginTop: 32, width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '18px', opacity: loading ? 0.6 : 1 }}>
        {loading ? 'Sending...' : <>Send Quote Request <Send size={16} /></>}
      </button>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
        We respond within 24 hours with a free design mockup. No commitment required.
        <br />
        Or reach us directly on <a href="https://wa.me/16475459403" style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>WhatsApp</a> · <a href="mailto:radiatesigns@gmail.com" style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>radiatesigns@gmail.com</a>
      </p>

      <style>{`
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default function QuotePage() {
  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', padding: '120px 40px 80px' }}>
      <div className="section-label" style={{ marginBottom: 16 }}>It&apos;s Free</div>
      <h1 className="display-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white', marginBottom: 16 }}>
        Get Your <span className="neon-text-pink">Free Mockup</span>
      </h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.7, marginBottom: 60 }}>
        Fill out the form below and we will send you a professional design mockup and detailed quote within 24 hours, completely free.
      </p>
      <Suspense fallback={<div style={{ color: 'var(--text-muted)' }}>Loading...</div>}>
        <QuoteForm />
      </Suspense>
    </div>
  )
}
