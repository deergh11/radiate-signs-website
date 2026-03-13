'use client'
import Link from 'next/link'
import { Instagram, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '60px 40px 40px',
      background: 'var(--bg-card)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: 60,
        marginBottom: 60,
      }}>
        {/* Brand */}
        <div>
          <img
            src="/logo.png"
            alt="Radiate Signs"
            style={{ height: '108px', width: 'auto', marginBottom: 16, display: 'block' }}
          />
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.9rem', maxWidth: 320, marginBottom: 24 }}>
            Custom neon signs, channel letters, and LED installs for businesses across Canada. Designed, sourced, and installed by us.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a
              href="https://instagram.com/radiate_signs"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 40,
                height: 40,
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--neon-pink)'
                e.currentTarget.style.color = 'var(--neon-pink)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-muted)'
              }}
            >
              <Instagram size={18} />
            </a>
            <a
              href="mailto:radiatesigns@gmail.com"
              style={{
                width: 40,
                height: 40,
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--neon-cyan)'
                e.currentTarget.style.color = 'var(--neon-cyan)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-muted)'
              }}
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>
            Navigation
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { href: '/', label: 'Home' },
              { href: '/work', label: 'Our Work' },
              { href: '/builder', label: 'Sign Builder' },
              { href: '/quote', label: 'Get a Quote' },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>
            Contact
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a href="mailto:radiatesigns@gmail.com" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Mail size={14} />radiatesigns@gmail.com
            </a>
            <a href="tel:+16475459403" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Phone size={14} />+1 (647) 545-9403
            </a>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Brampton, ON<br />Serving GTA & Southern Ontario
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        paddingTop: 32,
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          © {new Date().getFullYear()} Radiate Signs. All rights reserved.
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          Made in Canada 🍁
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div:first-child { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </footer>
  )
}
