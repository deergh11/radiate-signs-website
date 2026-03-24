'use client'

import { Suspense, useEffect, useMemo, useState, type CSSProperties, type ChangeEvent, type ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Send } from 'lucide-react'

const STORAGE_KEY = 'radiate-builder-state'

const PROJECT_TYPES = [
  'Custom Neon Sign',
  'Channel Letters',
  'Light Box',
  'Marquee Sign',
  'LED / Rope Lighting',
  'House Address Sign',
  'Not Sure Yet',
]

const INSTALL_CONTEXTS = [
  'Storefront Exterior',
  'Interior Wall',
  'Window',
  'Event / Temporary Setup',
  'Home / Residential',
  'Other',
]

const BUDGETS = [
  'Under $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
  'Not Sure Yet',
]

const TIMELINES = [
  'ASAP',
  'Within 2-4 weeks',
  'Within 1-2 months',
  'Planning for later',
  'Just exploring',
]

const SIZE_INTENTS = [
  'I know the approximate size',
  'I need help determining size',
  'Matching an existing sign',
]

const SOURCE_OPTIONS = ['Instagram', 'TikTok', 'Google', 'Referral', 'Other']

const detailedSections = [
  'Contact Details',
  'Project Type',
  'Sign Details',
  'Installation / Location',
  'Budget & Timeline',
  'Files / Mockup Context',
  'Additional Notes',
]

type IntakeMode = 'quick' | 'detailed'

type QuoteFormState = {
  intakeMode: IntakeMode
  name: string
  business: string
  email: string
  phone: string
  projectType: string
  installationContext: string
  installLocation: string
  approximateSize: string
  sizeIntent: string
  budget: string
  timeline: string
  notes: string
  fileNames: string[]
  source: string
  builderText: string
  builderColor: string
  builderFont: string
  builderSize: string
  builderGlow: string
  builderBackboard: string
  builderMode: string
  usedUploadedImage: string
  uploadedImageName: string
  overlayScale: string
  overlayPosition: string
}

const initialFormState = (params: ReturnType<typeof useSearchParams>): QuoteFormState => ({
  intakeMode: 'detailed',
  name: '',
  business: '',
  email: '',
  phone: '',
  projectType: '',
  installationContext: '',
  installLocation: '',
  approximateSize: '',
  sizeIntent: '',
  budget: '',
  timeline: '',
  notes: '',
  fileNames: [],
  source: '',
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

function Section({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <section
      style={{
        padding: 24,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="section-label" style={{ marginBottom: 10 }}>
        {label}
      </div>
      <h2 style={{ color: 'white', fontSize: '1.15rem', marginBottom: 18, letterSpacing: '0.4px' }}>{title}</h2>
      {children}
    </section>
  )
}

function QuoteForm() {
  const params = useSearchParams()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<QuoteFormState>(() => initialFormState(params))

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return

    try {
      const parsed = JSON.parse(stored) as Partial<{
        text: string
        color: string
        font: string
        width: number
        height: number
        unit: 'in' | 'cm'
        brightness: number
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
        builderSize:
          current.builderSize ||
          (typeof parsed.width === 'number' && typeof parsed.height === 'number'
            ? `${parsed.width}${parsed.unit || 'in'} x ${parsed.height}${parsed.unit || 'in'}`
            : ''),
        builderGlow: current.builderGlow || (typeof parsed.brightness === 'number' ? parsed.brightness.toString() : ''),
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
        projectType:
          current.projectType ||
          (parsed.mode === 'mockup' || parsed.text ? 'Custom Neon Sign' : ''),
      }))
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const setValue = (key: keyof QuoteFormState, value: string | string[]) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setValue(
      'fileNames',
      files.map(file => file.name)
    )
  }

  const builderSummaryItems = useMemo(() => {
    if (!form.builderText) return []

    return [
      { label: 'Text', value: `"${form.builderText}"` },
      form.builderFont ? { label: 'Font', value: form.builderFont } : null,
      form.builderColor ? { label: 'Color', value: form.builderColor } : null,
      form.builderSize ? { label: 'Size', value: form.builderSize } : null,
      form.builderGlow ? { label: 'Brightness', value: form.builderGlow } : null,
      form.builderBackboard ? { label: 'Background', value: form.builderBackboard } : null,
      form.builderMode ? { label: 'Mode', value: form.builderMode === 'mockup' ? 'Upload Your Space' : 'Standard Preview' } : null,
      form.usedUploadedImage === 'yes' ? { label: 'Uploaded Space', value: form.uploadedImageName || 'Yes' } : null,
    ].filter(Boolean) as Array<{ label: string; value: string }>
  }, [form])

  const detailedCompleted = useMemo(() => {
    return [
      Boolean(form.name && form.email),
      Boolean(form.projectType),
      Boolean(form.approximateSize || form.sizeIntent || form.builderSize),
      Boolean(form.installationContext || form.installLocation),
      Boolean(form.budget || form.timeline),
      Boolean(form.fileNames.length || form.usedUploadedImage === 'yes'),
      Boolean(form.notes),
    ].filter(Boolean).length
  }, [form])

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.projectType) {
      setError('Please fill in your name, email, and project type.')
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          padding: '40px',
        }}
      >
        <CheckCircle size={64} color="var(--neon-pink)" style={{ marginBottom: 32, filter: 'drop-shadow(0 0 20px var(--neon-pink))' }} />
        <h2 className="display-heading neon-text-pink" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: 16 }}>
          Request Received!
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.7, fontSize: '1rem' }}>
          We will review your project details and get back to you within 24 hours with a free mockup direction and quote.
          Check your email and WhatsApp if you left your number.
        </p>
      </div>
    )
  }

  const inputStyle: CSSProperties = {
    width: '100%',
    background: '#0a0a0a',
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

  const chipBase: CSSProperties = {
    padding: '10px 16px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--border)',
    color: 'var(--text-muted)',
    fontSize: '0.82rem',
    fontFamily: 'Barlow, sans-serif',
    transition: 'all 0.2s ease',
  }

  return (
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      <section
        style={{
          padding: 24,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          marginBottom: 20,
        }}
      >
        <div className="section-label" style={{ marginBottom: 10 }}>
          Choose Your Path
        </div>
        <h2 style={{ color: 'white', fontSize: '1.15rem', marginBottom: 14, letterSpacing: '0.4px' }}>How would you like to submit?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <button
            type="button"
            onClick={() => setValue('intakeMode', 'quick')}
            style={{
              padding: 18,
              textAlign: 'left',
              background: form.intakeMode === 'quick' ? 'rgba(194,113,186,0.12)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${form.intakeMode === 'quick' ? 'var(--neon-pink)' : 'var(--border)'}`,
              color: 'white',
            }}
          >
            <div style={{ fontSize: '0.95rem', marginBottom: 6 }}>Quick Quote</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6 }}>
              Best if you want the fastest path to a mockup and quote.
            </div>
          </button>
          <button
            type="button"
            onClick={() => setValue('intakeMode', 'detailed')}
            style={{
              padding: 18,
              textAlign: 'left',
              background: form.intakeMode === 'detailed' ? 'rgba(115,194,202,0.1)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${form.intakeMode === 'detailed' ? 'var(--neon-cyan)' : 'var(--border)'}`,
              color: 'white',
            }}
          >
            <div style={{ fontSize: '0.95rem', marginBottom: 6 }}>Detailed Project Request</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6 }}>
              Best if you want to share more project detail up front and reduce follow-up.
            </div>
          </button>
        </div>
      </section>

      {builderSummaryItems.length > 0 && (
        <section
          style={{
            padding: '18px 20px',
            background: 'rgba(194,113,186,0.08)',
            border: '1px solid rgba(194,113,186,0.3)',
            marginBottom: 20,
          }}
        >
          <div className="section-label" style={{ marginBottom: 10 }}>
            Your Design Preview
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 10 }}>
            {builderSummaryItems.map(item => (
              <div key={item.label} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: 'rgba(255,255,255,0.56)', fontSize: '0.68rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>
                  {item.label}
                </div>
                <div style={{ color: 'white', fontSize: '0.88rem', lineHeight: 1.5 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {form.intakeMode === 'detailed' && (
        <section
          style={{
            padding: '14px 18px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 10 }}>
            <div className="section-label">Detailed Progress</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Step {Math.max(1, detailedCompleted)} of {detailedSections.length}
            </div>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden' }}>
            <div
              style={{
                width: `${(detailedCompleted / detailedSections.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--neon-pink), var(--neon-cyan))',
              }}
            />
          </div>
        </section>
      )}

      {form.intakeMode === 'quick' ? (
        <div style={{ display: 'grid', gap: 20 }}>
          <Section label="Quick" title="Quick Quote">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input type="text" value={form.name} onChange={event => setValue('name', event.target.value)} style={inputStyle} placeholder="John Smith" />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input type="email" value={form.email} onChange={event => setValue('email', event.target.value)} style={inputStyle} placeholder="you@business.com" />
              </div>
              <div>
                <label style={labelStyle}>Phone / WhatsApp</label>
                <input type="tel" value={form.phone} onChange={event => setValue('phone', event.target.value)} style={inputStyle} placeholder="(416) 555-0000" />
              </div>
              <div>
                <label style={labelStyle}>Project Type *</label>
                <select value={form.projectType} onChange={event => setValue('projectType', event.target.value)} style={inputStyle}>
                  <option value="">Select one</option>
                  {PROJECT_TYPES.map(projectType => (
                    <option key={projectType} value={projectType} style={{ backgroundColor: '#0a0a0a', color: 'white' }}>
                      {projectType}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Where did you find us?</label>
                <select value={form.source} onChange={event => setValue('source', event.target.value)} style={inputStyle}>
                  <option value="">Select one</option>
                  {SOURCE_OPTIONS.map(option => (
                    <option key={option} value={option} style={{ backgroundColor: '#0a0a0a', color: 'white' }}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Optional Files</label>
                <input type="file" multiple onChange={handleFileSelection} style={{ ...inputStyle, padding: '12px 16px' }} />
              </div>
            </div>
            <div style={{ marginTop: 18 }}>
              <label style={labelStyle}>Notes</label>
              <textarea
                value={form.notes}
                onChange={event => setValue('notes', event.target.value)}
                rows={5}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Tell us a bit about the sign you need, where it is going, and anything important we should know."
              />
            </div>
            {form.fileNames.length > 0 && (
              <div style={{ color: 'white', fontSize: '0.88rem', lineHeight: 1.8, marginTop: 14 }}>
                Files selected: {form.fileNames.join(', ')}
              </div>
            )}
          </Section>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 20 }}>
          <Section label="01" title="Contact Details">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input type="text" value={form.name} onChange={event => setValue('name', event.target.value)} style={inputStyle} placeholder="John Smith" />
              </div>
              <div>
                <label style={labelStyle}>Business Name</label>
                <input type="text" value={form.business} onChange={event => setValue('business', event.target.value)} style={inputStyle} placeholder="Your Business" />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input type="email" value={form.email} onChange={event => setValue('email', event.target.value)} style={inputStyle} placeholder="you@business.com" />
              </div>
              <div>
                <label style={labelStyle}>Phone / WhatsApp</label>
                <input type="tel" value={form.phone} onChange={event => setValue('phone', event.target.value)} style={inputStyle} placeholder="(416) 555-0000" />
              </div>
            </div>
          </Section>

          <Section label="02" title="Project Type">
            <div>
              <label style={labelStyle}>What are you looking for? *</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {PROJECT_TYPES.map(projectType => (
                  <button
                    key={projectType}
                    type="button"
                    onClick={() => setValue('projectType', projectType)}
                    style={{
                      ...chipBase,
                      background: form.projectType === projectType ? 'rgba(194,113,186,0.15)' : chipBase.background,
                      border: form.projectType === projectType ? '1px solid var(--neon-pink)' : chipBase.border,
                      color: form.projectType === projectType ? 'white' : chipBase.color,
                    }}
                  >
                    {projectType}
                  </button>
                ))}
              </div>
            </div>
          </Section>

          <Section label="03" title="Sign Details">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div>
                <label style={labelStyle}>Approximate Size or Size Intent</label>
                <input
                  type="text"
                  value={form.approximateSize}
                  onChange={event => setValue('approximateSize', event.target.value)}
                  style={inputStyle}
                  placeholder='Example: 48" wide, or "Need help sizing"'
                />
              </div>
              <div>
                <label style={labelStyle}>Sizing Context</label>
                <select value={form.sizeIntent} onChange={event => setValue('sizeIntent', event.target.value)} style={inputStyle}>
                  <option value="">Select one</option>
                  {SIZE_INTENTS.map(option => (
                    <option key={option} value={option} style={{ backgroundColor: '#0a0a0a', color: 'white' }}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Section>

          <Section label="04" title="Installation / Location">
            <div style={{ display: 'grid', gap: 18 }}>
              <div>
                <label style={labelStyle}>Where will the sign be installed?</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {INSTALL_CONTEXTS.map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setValue('installationContext', option)}
                      style={{
                        ...chipBase,
                        background: form.installationContext === option ? 'rgba(115,194,202,0.1)' : chipBase.background,
                        border: form.installationContext === option ? '1px solid var(--neon-cyan)' : chipBase.border,
                        color: form.installationContext === option ? 'white' : chipBase.color,
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Location Details</label>
                <input
                  type="text"
                  value={form.installLocation}
                  onChange={event => setValue('installLocation', event.target.value)}
                  style={inputStyle}
                  placeholder="City, site type, wall/window/storefront notes"
                />
              </div>
            </div>
          </Section>

          <Section label="05" title="Budget & Timeline">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div>
                <label style={labelStyle}>Budget Range</label>
                <div style={{ display: 'grid', gap: 8 }}>
                  {BUDGETS.map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setValue('budget', option)}
                      style={{
                        ...chipBase,
                        textAlign: 'left',
                        background: form.budget === option ? 'rgba(115,194,202,0.1)' : chipBase.background,
                        border: form.budget === option ? '1px solid var(--neon-cyan)' : chipBase.border,
                        color: form.budget === option ? 'white' : chipBase.color,
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Desired Timeline</label>
                <div style={{ display: 'grid', gap: 8 }}>
                  {TIMELINES.map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setValue('timeline', option)}
                      style={{
                        ...chipBase,
                        textAlign: 'left',
                        background: form.timeline === option ? 'rgba(115,194,202,0.1)' : chipBase.background,
                        border: form.timeline === option ? '1px solid var(--neon-cyan)' : chipBase.border,
                        color: form.timeline === option ? 'white' : chipBase.color,
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section label="06" title="Files / Mockup Context">
            <div style={{ display: 'grid', gap: 18 }}>
              <div>
                <label style={labelStyle}>Upload Logo / Inspiration / Storefront Image</label>
                <input type="file" multiple onChange={handleFileSelection} style={{ ...inputStyle, padding: '12px 16px' }} />
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 8, lineHeight: 1.6 }}>
                  Selected files will be noted with your request. If needed, we can follow up for full-resolution files.
                </div>
              </div>
              <div>
                <label style={labelStyle}>Where did you find us?</label>
                <select value={form.source} onChange={event => setValue('source', event.target.value)} style={inputStyle}>
                  <option value="">Select one</option>
                  {SOURCE_OPTIONS.map(option => (
                    <option key={option} value={option} style={{ backgroundColor: '#0a0a0a', color: 'white' }}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {form.fileNames.length > 0 && <div style={{ color: 'white', fontSize: '0.88rem', lineHeight: 1.8 }}>Files selected: {form.fileNames.join(', ')}</div>}
            </div>
          </Section>

          <Section label="07" title="Additional Notes">
            <div>
              <label style={labelStyle}>Project Description</label>
              <textarea
                value={form.notes}
                onChange={event => setValue('notes', event.target.value)}
                rows={6}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Tell us about the sign, branding goals, site conditions, placement ideas, power access, or anything else that will help us quote accurately."
              />
            </div>
          </Section>
        </div>
      )}

      {error && (
        <div style={{ marginTop: 18, padding: '12px 16px', background: 'rgba(194,113,186,0.1)', border: '1px solid rgba(194,113,186,0.3)', color: 'var(--neon-pink)', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      <div
        style={{
          marginTop: 28,
          padding: 24,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--neon-pink)',
        }}
      >
        <div style={{ color: 'white', fontSize: '1rem', marginBottom: 8 }}>We&apos;ll review your design and send you a custom mockup + quote.</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 18 }}>
          Submit your details and we will follow up with the right next step for your signage project.
        </p>
        <button onClick={handleSubmit} disabled={loading} className="btn-neon" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '18px', opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Sending...' : <>Get My Free Mockup <Send size={16} /></>}
        </button>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center', marginTop: 14, lineHeight: 1.6 }}>
          No commitment required. Most mockups delivered within 24-48 hours.
          <br />
          Or reach us directly on <a href="https://wa.me/16475459403" style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>WhatsApp</a> · <a href="mailto:radiatesigns@gmail.com" style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>radiatesigns@gmail.com</a>
        </p>
      </div>

      <style>{`
        @media (max-width: 720px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }

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
      <div className="section-label" style={{ marginBottom: 16 }}>Project Intake</div>
      <h1 className="display-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white', marginBottom: 16 }}>
        Get Your <span className="neon-text-pink">Free Mockup</span>
      </h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: 640, lineHeight: 1.7, marginBottom: 48 }}>
        Share the core details of your signage project and we will come back with a cleaner direction, mockup guidance, and quote without the usual back-and-forth.
      </p>
      <Suspense fallback={<div style={{ color: 'var(--text-muted)' }}>Loading...</div>}>
        <QuoteForm />
      </Suspense>
    </div>
  )
}
