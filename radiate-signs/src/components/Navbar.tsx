'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const scrollY = window.scrollY
    const { style } = document.body
    const previousOverflow = style.overflow
    const previousPosition = style.position
    const previousTop = style.top
    const previousWidth = style.width

    style.overflow = 'hidden'
    style.position = 'fixed'
    style.top = `-${scrollY}px`
    style.width = '100%'

    return () => {
      style.overflow = previousOverflow
      style.position = previousPosition
      style.top = previousTop
      style.width = previousWidth
      window.scrollTo(0, scrollY)
    }
  }, [open])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Our Work' },
    { href: '/builder', label: 'Sign Builder' },
    { href: '/quote', label: 'Get a Quote' },
  ]

  return (
    <nav
      className="site-navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.4s ease',
        background: scrolled || open ? 'rgba(8,8,8,0.95)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(20px)' : 'none',
        borderBottom: scrolled || open ? '1px solid rgba(194,113,186,0.15)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Image
          src="/logo.png"
          alt="Radiate Signs"
          width={156}
          height={56}
          priority
          style={{ height: '56px', width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      </Link>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }} className="hidden-mobile">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              fontFamily: 'var(--font-barlow), Barlow, sans-serif',
              fontWeight: 500,
              fontSize: '0.8rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'white')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {l.label}
          </Link>
        ))}
        <Link href="/quote" className="btn-neon" style={{ padding: '10px 24px', fontSize: '0.8rem' }}>
          Free Mockup
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', color: 'white', display: 'none', padding: 8 }}
        className="mobile-menu-btn"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(4,4,4,0.98) 0%, rgba(8,8,8,0.99) 58%, rgba(10,10,10,1) 100%)',
            backdropFilter: 'blur(22px)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 220,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div
            className="mobile-menu-shell"
            style={{
              minHeight: '100dvh',
              display: 'flex',
              flexDirection: 'column',
              padding: '104px 24px 32px',
            }}
          >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="mobile-menu-close"
            style={{
              position: 'absolute',
              top: 24,
              right: 20,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'white',
              width: 44,
              height: 44,
              borderRadius: 999,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={28} />
          </button>
            <div
              className="mobile-menu-brand"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 28,
              }}
            >
              <Image
                src="/logo.png"
                alt="Radiate Signs"
                width={178}
                height={64}
                style={{ height: '56px', width: 'auto' }}
              />
            </div>

            <div
              className="mobile-menu-list"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                width: '100%',
                maxWidth: 360,
                margin: '0 auto',
              }}
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="mobile-menu-link"
                  style={{
                    fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                    fontSize: 'clamp(1.45rem, 6.2vw, 1.9rem)',
                    letterSpacing: '1px',
                    color: 'white',
                    textDecoration: 'none',
                    textAlign: 'left',
                    padding: '16px 18px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.025)',
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div
              className="mobile-menu-footer"
              style={{
                width: '100%',
                maxWidth: 360,
                margin: '22px auto 0',
              }}
            >
              <Link
                href="/quote"
                className="btn-neon"
                onClick={() => setOpen(false)}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Free Mockup
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          nav {
            padding: 18px 20px !important;
          }
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .mobile-menu-overlay {
            border-top: 1px solid rgba(194,113,186,0.12);
          }
          .mobile-menu-link {
            border-radius: 16px;
          }
          .mobile-menu-link:hover {
            border-color: rgba(194,113,186,0.22);
            background: rgba(194,113,186,0.06);
          }
        }

        @media (max-width: 420px) {
          .mobile-menu-shell {
            padding: 96px 18px 24px !important;
          }

          .mobile-menu-close {
            top: 18px !important;
            right: 18px !important;
          }

          .mobile-menu-brand {
            margin-bottom: 22px !important;
          }

          .mobile-menu-list {
            gap: 8px !important;
          }

          .mobile-menu-link {
            padding: 14px 16px !important;
            font-size: 1.35rem !important;
            letter-spacing: 0.8px !important;
          }
        }
      `}</style>
    </nav>
  )
}
