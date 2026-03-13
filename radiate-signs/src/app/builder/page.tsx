'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Download, ArrowRight, RotateCcw } from 'lucide-react'

const NEON_COLORS = [
  { name: 'Radiate Pink', value: '#c271ba', shadow: '194,113,186' },
  { name: 'Radiate Cyan', value: '#73c2ca', shadow: '115,194,202' },
  { name: 'Electric Orange', value: '#ff6b00', shadow: '255,107,0' },
  { name: 'Lemon Yellow', value: '#ffe600', shadow: '255,230,0' },
  { name: 'Violet', value: '#9f4c9d', shadow: '159,76,157' },
  { name: 'Neon Green', value: '#39ff14', shadow: '57,255,20' },
  { name: 'Ice White', value: '#e8f4ff', shadow: '232,244,255' },
  { name: 'Warm Red', value: '#ff3a20', shadow: '255,58,32' },
]

const FONT_STYLES = [
  { name: 'Classic Script', css: '"Dancing Script", cursive', import: 'Dancing+Script:wght@700' },
  { name: 'Bold Display', css: '"Bebas Neue", sans-serif', import: 'Bebas+Neue' },
  { name: 'Retro Serif', css: '"Playfair Display", serif', import: 'Playfair+Display:ital,wght@1,700' },
  { name: 'Modern Sans', css: '"Barlow Condensed", sans-serif', import: 'Barlow+Condensed:wght@700' },
  { name: 'Neon Italic', css: '"Satisfy", cursive', import: 'Satisfy' },
  { name: 'Street Style', css: '"Permanent Marker", cursive', import: 'Permanent+Marker' },
]

const BACKBOARD_STYLES = [
  { name: 'None', value: 'none', bg: 'transparent' },
  { name: 'Dark Panel', value: 'dark', bg: '#0a0a0a' },
  { name: 'Black Acrylic', value: 'black', bg: '#111' },
  { name: 'White Acrylic', value: 'white', bg: '#f0f0f0' },
  { name: 'Wood Grain', value: 'wood', bg: '#3d2b1f' },
]

export default function BuilderPage() {
  const [text, setText] = useState('Open 24/7')
  const [color, setColor] = useState(NEON_COLORS[0])
  const [font, setFont] = useState(FONT_STYLES[0])
  const [backboard, setBackboard] = useState(BACKBOARD_STYLES[0])
  const [size, setSize] = useState(72)
  const [glowIntensity, setGlowIntensity] = useState(3)
  const previewRef = useRef<HTMLDivElement>(null)

  // Load Google Fonts dynamically
  useEffect(() => {
    const allFonts = FONT_STYLES.map(f => f.import).join('&family=')
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${allFonts}&display=swap`
    document.head.appendChild(link)
  }, [])

  const glowCSS = `
    0 0 ${7 * glowIntensity}px ${color.value},
    0 0 ${14 * glowIntensity}px ${color.value},
    0 0 ${28 * glowIntensity}px ${color.value},
    0 0 ${42 * glowIntensity}px rgba(${color.shadow},0.6),
    0 0 ${70 * glowIntensity}px rgba(${color.shadow},0.3)
  `

  const handleCopyToQuote = () => {
    const summary = `Text: "${text}" | Color: ${color.name} | Font: ${font.name} | Size: ~${Math.round(size/10)}cm`
    navigator.clipboard.writeText(summary).catch(() => {})
  }

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ padding: '60px 40px 0' }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Interactive Tool</div>
        <h1 className="display-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white', marginBottom: 16 }}>
          Design Your <span className="neon-text-pink">Sign</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.7 }}>
          Experiment with text, colors, and fonts to visualize your custom neon sign. When you're happy, send it to us as a quote request.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: 2,
        padding: '48px 40px',
        minHeight: '80vh',
        alignItems: 'start',
      }}>
        {/* ── PREVIEW ── */}
        <div style={{
          position: 'sticky',
          top: 120,
        }}>
          {/* Preview window */}
          <div
            ref={previewRef}
            style={{
              background: backboard.bg === 'transparent'
                ? 'radial-gradient(ellipse at center, #0d0d0d 0%, #050505 100%)'
                : backboard.bg,
              border: '1px solid var(--border)',
              borderRadius: 4,
              padding: '80px 60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 340,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Scanline effect on preview */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
              pointerEvents: 'none',
            }} />

            {/* The neon text */}
            <div
              style={{
                fontFamily: font.css,
                fontSize: size,
                color: color.value,
                textShadow: glowCSS,
                textAlign: 'center',
                lineHeight: 1.2,
                wordBreak: 'break-word',
                position: 'relative',
                zIndex: 1,
                transition: 'all 0.3s ease',
                whiteSpace: 'pre-wrap',
              }}
            >
              {text || 'Your Text Here'}
            </div>

            {/* Ambient glow behind text */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(ellipse at center, rgba(${color.shadow},${0.04 * glowIntensity}) 0%, transparent 70%)`,
              pointerEvents: 'none',
              transition: 'background 0.3s ease',
            }} />
          </div>

          {/* Preview label */}
          <div style={{
            textAlign: 'center',
            marginTop: 12,
            fontSize: '0.7rem',
            letterSpacing: '2px',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
          }}>
            Live Preview · Approximate Visual Only
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center' }}>
            <Link
              href={`/quote?text=${encodeURIComponent(text)}&color=${encodeURIComponent(color.name)}&font=${encodeURIComponent(font.name)}`}
              className="btn-neon"
              style={{ fontSize: '0.85rem', flex: 1, justifyContent: 'center' }}
            >
              Quote This Design <ArrowRight size={14} />
            </Link>
            <button
              onClick={handleCopyToQuote}
              className="btn-neon btn-neon-cyan"
              style={{ fontSize: '0.85rem', padding: '14px 20px' }}
              title="Copy design specs"
            >
              <Download size={16} />
            </button>
            <button
              onClick={() => { setText('Open 24/7'); setColor(NEON_COLORS[0]); setFont(FONT_STYLES[0]); setSize(72); setGlowIntensity(3); setBackboard(BACKBOARD_STYLES[0]) }}
              style={{
                padding: '14px 20px',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* ── CONTROLS ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Text input */}
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
              Your Text
            </label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={60}
              rows={2}
              style={{
                width: '100%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'white',
                fontFamily: 'Barlow, sans-serif',
                fontSize: '1.1rem',
                padding: '16px',
                resize: 'none',
                outline: 'none',
                lineHeight: 1.5,
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--neon-pink)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
              placeholder="Type your sign text..."
            />
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4, textAlign: 'right' }}>
              {text.length}/60
            </div>
          </div>

          {/* Colors */}
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
              Neon Color · <span style={{ color: color.value }}>{color.name}</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {NEON_COLORS.map(c => (
                <button
                  key={c.name}
                  onClick={() => setColor(c)}
                  title={c.name}
                  style={{
                    aspectRatio: '1',
                    background: c.value,
                    border: color.value === c.value ? '2px solid white' : '2px solid transparent',
                    boxShadow: color.value === c.value ? `0 0 16px ${c.value}, 0 0 32px ${c.value}` : 'none',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    position: 'relative',
                  }}
                >
                  {color.value === c.value && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                    }}>✓</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Font styles */}
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
              Font Style
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FONT_STYLES.map(f => (
                <button
                  key={f.name}
                  onClick={() => setFont(f)}
                  style={{
                    padding: '14px 16px',
                    background: font.name === f.name ? 'rgba(194,113,186,0.1)' : 'var(--bg-card)',
                    border: `1px solid ${font.name === f.name ? 'var(--neon-pink)' : 'var(--border)'}`,
                    color: font.name === f.name ? 'white' : 'var(--text-muted)',
                    fontFamily: f.css,
                    fontSize: '1.2rem',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{text || 'Radiate Signs'}</span>
                  <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '0.65rem', letterSpacing: '1px', opacity: 0.5 }}>
                    {f.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Size slider */}
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
              Size · ~{Math.round(size / 10)}cm height
            </label>
            <input
              type="range"
              min={32}
              max={140}
              value={size}
              onChange={e => setSize(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--neon-pink)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>
              <span>Small</span><span>Large</span>
            </div>
          </div>

          {/* Glow intensity */}
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
              Glow Intensity · {['Low', 'Medium', 'High', 'Ultra', 'MAX'][Math.round((glowIntensity - 1) / 0.75)]}
            </label>
            <input
              type="range"
              min={1}
              max={4}
              step={0.25}
              value={glowIntensity}
              onChange={e => setGlowIntensity(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--neon-pink)' }}
            />
          </div>

          {/* Backboard */}
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
              Backboard
            </label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {BACKBOARD_STYLES.map(b => (
                <button
                  key={b.name}
                  onClick={() => setBackboard(b)}
                  style={{
                    padding: '8px 16px',
                    background: backboard.name === b.name ? 'rgba(194,113,186,0.15)' : 'var(--bg-card)',
                    border: `1px solid ${backboard.name === b.name ? 'var(--neon-pink)' : 'var(--border)'}`,
                    color: backboard.name === b.name ? 'white' : 'var(--text-muted)',
                    fontSize: '0.75rem',
                    letterSpacing: '1px',
                    fontFamily: 'Barlow, sans-serif',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span style={{
                    width: 12, height: 12,
                    background: b.bg === 'transparent' ? 'repeating-linear-gradient(45deg, #333 0, #333 2px, #555 2px, #555 4px)' : b.bg,
                    border: '1px solid #444',
                    display: 'inline-block',
                    borderRadius: 2,
                    flexShrink: 0,
                  }} />
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quote CTA */}
          <div style={{
            padding: 24,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--neon-pink)',
          }}>
            <div style={{ fontSize: '0.7rem', letterSpacing: '2px', color: 'var(--neon-pink)', textTransform: 'uppercase', marginBottom: 8 }}>
              Ready to Order?
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 16 }}>
              This is an approximate preview. Send us your design and we'll create a professional mockup + quote within 24 hours — for free.
            </p>
            <Link
              href={`/quote?text=${encodeURIComponent(text)}&color=${encodeURIComponent(color.name)}&font=${encodeURIComponent(font.name)}&size=${Math.round(size/10)}cm`}
              className="btn-neon"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
            >
              Send This for a Real Quote <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 380px"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="position: sticky"] {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
