import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '60px 40px 40px',
        background: 'var(--bg-card)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 60,
          marginBottom: 60,
        }}
      >
        <div>
          <Image
            src="/logo.png"
            alt="Radiate Signs"
            width={220}
            height={108}
            style={{ height: '108px', width: 'auto', marginBottom: 16, display: 'block' }}
          />
          <p
            style={{
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              fontSize: '0.9rem',
              maxWidth: 320,
              marginBottom: 24,
            }}
          >
            Custom neon signs, channel letters, and LED installs for businesses across Canada.
            Designed, sourced, and installed by us.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a
              href="https://instagram.com/radiate_signs"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link footer-social-pink"
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
            >
              <Instagram size={18} />
            </a>
            <a
              href="mailto:radiatesigns@gmail.com"
              className="footer-social-link footer-social-cyan"
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
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: 20,
            }}
          >
            Navigation
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { href: '/', label: 'Home' },
              { href: '/work', label: 'Our Work' },
              { href: '/builder', label: 'Sign Builder' },
              { href: '/quote', label: 'Get a Quote' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-link"
                style={{
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: 20,
            }}
          >
            Legal
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { href: '/privacy-policy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms & Conditions' },
              { href: '/refund-policy', label: 'Refund Policy' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-link"
                style={{
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: 20,
            }}
          >
            Contact
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a
              href="mailto:radiatesigns@gmail.com"
              className="footer-link"
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Mail size={14} />
              radiatesigns@gmail.com
            </a>
            <a
              href="tel:+16475459403"
              className="footer-link"
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Phone size={14} />
              +1 (647) 545-9403
            </a>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Brampton, ON
              <br />
              Serving GTA &amp; Southern Ontario
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          paddingTop: 32,
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          Copyright {new Date().getFullYear()} Radiate Signs. All rights reserved.
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Made in Canada</div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div:first-child { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </footer>
  )
}
