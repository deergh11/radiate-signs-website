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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
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
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(8,8,8,0.98)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          zIndex: 101,
        }}>
          <button
            onClick={() => setOpen(false)}
            style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'white', padding: 8 }}
          >
            <X size={28} />
          </button>
          <Image
            src="/logo.png"
            alt="Radiate Signs"
            width={178}
            height={64}
            style={{ height: '64px', width: 'auto' }}
          />
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                fontSize: 'clamp(2rem, 10vw, 3rem)',
                letterSpacing: '2px',
                color: 'white',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/quote" className="btn-neon" onClick={() => setOpen(false)}>
            Get Free Mockup
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          nav {
            padding: 18px 20px !important;
          }
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
