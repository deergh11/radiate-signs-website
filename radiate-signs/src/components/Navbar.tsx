'use client'
import { useState, useEffect } from 'react'
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
        background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,45,120,0.15)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--neon-pink)',
            boxShadow: '0 0 10px var(--neon-pink), 0 0 30px var(--neon-pink)',
          }} className="flicker" />
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '1.5rem',
            letterSpacing: '3px',
            color: 'white',
          }}>
            RADIATE<span style={{ color: 'var(--neon-pink)' }}> SIGNS</span>
          </span>
        </div>
      </Link>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }} className="hidden-mobile">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              fontFamily: 'Barlow, sans-serif',
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
        style={{ background: 'none', border: 'none', color: 'white', display: 'none' }}
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
          zIndex: 99,
        }}>
          <button
            onClick={() => setOpen(false)}
            style={{ position: 'absolute', top: 24, right: 40, background: 'none', border: 'none', color: 'white' }}
          >
            <X size={28} />
          </button>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '3rem',
                letterSpacing: '4px',
                color: 'white',
                textDecoration: 'none',
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
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
