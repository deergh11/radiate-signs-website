'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, MapPin, Star } from 'lucide-react'

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      let start = 0
      const step = () => {
        start += Math.ceil(to / 60)
        if (start >= to) { setVal(to); return }
        setVal(start)
        requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to])

  return <span ref={ref}>{val}{suffix}</span>
}

// ── Services data ─────────────────────────────────────────────────────────────
const services = [
  {
    title: 'Custom Neon Signs',
    desc: 'LED neon signs custom built to client specs. Logo, quotes, shapes, any color. Popular with restaurants and gyms.',
    color: 'var(--neon-pink)',
    icon: '✦',
  },
  {
    title: 'Channel Letters',
    desc: 'Illuminated 3D letters for storefronts and facades.',
    color: 'var(--neon-cyan)',
    icon: '◈',
  },
  {
    title: 'UV Printed Signs',
    desc: 'Full color UV printing on acrylic, metal, wood substrates.',
    color: 'var(--neon-orange)',
    icon: '◉',
  },
  {
    title: 'LED Rope Installs',
    desc: 'Architectural LED lighting for interiors, feature walls, ceilings, exterior outlines.',
    color: 'var(--neon-yellow)',
    icon: '◐',
  },
]

// ── Ticker ────────────────────────────────────────────────────────────────────
const tickerItems = [
  'Custom Neon Signs', 'Channel Letters', 'LED Installs',
  'Free Design Mockup', 'Direct Pricing', 'UV Printed Signs',
  'Professional Install', 'Serving Ontario',
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 40px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow blobs */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,45,120,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Location badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <MapPin size={12} color="var(--neon-pink)" />
          <span className="section-label" style={{ color: 'var(--text-muted)' }}>
            Brampton, ON · Serving GTA & Southern Ontario
          </span>
        </div>

        {/* Main heading */}
        <h1 className="display-heading flicker" style={{
          fontSize: 'clamp(4rem, 12vw, 11rem)',
          color: 'white',
          maxWidth: 1100,
          marginBottom: 8,
        }}>
          Make Your
        </h1>
        <h1 className="display-heading" style={{
          fontSize: 'clamp(4rem, 12vw, 11rem)',
          maxWidth: 1100,
          marginBottom: 32,
        }}>
          <span className="neon-text-pink flicker-fast">Brand Glow</span>
        </h1>

        <p style={{
          fontFamily: 'Barlow, sans-serif',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontWeight: 300,
          color: 'var(--text-muted)',
          maxWidth: 520,
          lineHeight: 1.7,
          marginBottom: 48,
        }}>
          Custom neon signs, channel letters, and LED installs — designed, sourced, and installed for businesses across Canada. Get a free design mockup in 24 hours.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/quote" className="btn-neon" style={{ fontSize: '0.9rem' }}>
            Get Free Mockup <ArrowRight size={16} />
          </Link>
          <Link href="/work" className="btn-neon btn-neon-cyan" style={{ fontSize: '0.9rem' }}>
            View Our Work
          </Link>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          gap: '60px',
          marginTop: 80,
          paddingTop: 60,
          borderTop: '1px solid var(--border)',
          flexWrap: 'wrap',
        }}>
          {[
            { val: 80, suffix: '+', label: 'Projects Completed' },
            { val: 3, suffix: ' yrs', label: 'In Business' },
            { val: 100, suffix: '%', label: 'Direct Service' },
          ].map(s => (
            <div key={s.label}>
              <div className="display-heading neon-text-pink" style={{ fontSize: '3.5rem' }}>
                <Counter to={s.val} suffix={s.suffix} />
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '16px 0',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          display: 'flex',
          gap: 60,
          animation: 'ticker 25s linear infinite',
          width: 'max-content',
        }}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '1rem',
              letterSpacing: '3px',
              color: i % 2 === 0 ? 'var(--text-muted)' : 'var(--neon-pink)',
              whiteSpace: 'nowrap',
            }}>
              {item} ✦
            </span>
          ))}
        </div>
        <style>{`
          @keyframes ticker {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── SERVICES ── */}
      <section style={{ padding: '120px 40px' }}>
        <div style={{ marginBottom: 64 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>What We Do</div>
          <h2 className="display-heading" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', color: 'white' }}>
            Our Services
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 2,
        }}>
          {services.map((s, i) => (
            <div
              key={i}
              className="card-dark"
              style={{
                padding: '48px 36px',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = `rgba(${s.color === 'var(--neon-pink)' ? '255,45,120' : s.color === 'var(--neon-cyan)' ? '0,245,255' : s.color === 'var(--neon-orange)' ? '255,107,0' : '255,230,0'},0.05)`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--bg-card)'
              }}
            >
              <div style={{
                fontSize: '2rem',
                color: s.color,
                textShadow: `0 0 20px ${s.color}`,
                marginBottom: 24,
              }}>
                {s.icon}
              </div>
              <h3 style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '1.8rem',
                letterSpacing: '2px',
                color: 'white',
                marginBottom: 16,
              }}>
                {s.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {s.desc}
              </p>

              {/* Corner accent */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 60,
                height: 60,
                background: `linear-gradient(135deg, transparent 50%, ${s.color}22 50%)`,
              }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY RADIATE ── */}
      <section style={{
        padding: '120px 40px',
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>Why Us</div>
            <h2 className="display-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'white', marginBottom: 32 }}>
              Direct From<br /><span className="neon-text-cyan">The Source</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem', marginBottom: 40 }}>
              We're two people running this operation — no agency markup, no middlemen, no bloat.
              You deal directly with us, from design all the way through installation. That means better pricing, faster turnarounds, and genuine accountability.
            </p>
            <Link href="/quote" className="btn-neon">
              Start Your Project <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { icon: <Zap size={20} />, title: 'Free Design Mockup', desc: 'Get a professional design mockup within 24 hours. No commitment required.' },
              { icon: <Star size={20} />, title: 'End-to-End Service', desc: 'Design, source, deliver, and install — we handle everything so you don\'t have to.' },
              { icon: <MapPin size={20} />, title: 'Local Hands-On Team', desc: 'We deliver and install ourselves across Ontario. Direct pricing, no middleman markup.' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 20,
                padding: '24px',
                background: 'var(--bg-dark)',
                border: '1px solid var(--border)',
              }}>
                <div style={{ color: 'var(--neon-pink)', flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.2rem', letterSpacing: '2px', color: 'white', marginBottom: 6 }}>
                    {item.title}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            section > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
        `}</style>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '160px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,45,120,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="section-label" style={{ marginBottom: 24 }}>Ready to Glow?</div>
        <h2 className="display-heading flicker" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', color: 'white', marginBottom: 16 }}>
          Let's Build
        </h2>
        <h2 className="display-heading" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginBottom: 48 }}>
          <span className="neon-text-pink">Your Sign</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: 48, maxWidth: 480, margin: '0 auto 48px' }}>
          Fill out our quick form and get a free design mockup within 24 hours.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/quote" className="btn-neon" style={{ fontSize: '1rem', padding: '16px 48px' }}>
            Get Free Mockup <ArrowRight size={18} />
          </Link>
          <Link href="/builder" className="btn-neon btn-neon-cyan" style={{ fontSize: '1rem', padding: '16px 48px' }}>
            Try Sign Builder
          </Link>
        </div>
      </section>
    </>
  )
}
