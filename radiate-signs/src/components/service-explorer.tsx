'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type ServiceItem = {
  slug: string
  title: string
  shortLabel: string
  color: string
  description: string
  highlights: string[]
  useCases: string[]
  primaryCta: {
    href: string
    label: string
  }
  secondaryCta: {
    href: string
    label: string
  }
}

const services: ServiceItem[] = [
  {
    slug: 'custom-neon-signs',
    title: 'Custom Neon Signs',
    shortLabel: 'Brand features',
    color: 'var(--neon-pink)',
    description:
      'Custom neon signage built for restaurants, salons, gyms, event spaces, and branded feature walls that need a stronger visual identity.',
    highlights: [
      'Ideal for customer-facing brand moments',
      'Flexible sizing, color, and logo-led designs',
      'Works for interiors, windows, and statement walls',
    ],
    useCases: ['Restaurants', 'Retail displays', 'Feature walls'],
    primaryCta: {
      href: '/quote',
      label: 'Get Free Mockup',
    },
    secondaryCta: {
      href: '/work',
      label: 'View Our Work',
    },
  },
  {
    slug: 'storefront-light-boxes',
    title: 'Storefront Light Boxes',
    shortLabel: 'Street visibility',
    color: 'var(--neon-cyan)',
    description:
      'Illuminated storefront light boxes designed to help businesses read clearly from the street and present a cleaner, more established exterior.',
    highlights: [
      'Strong day and night readability',
      'Built for prominent street-facing branding',
      'Great for plazas, storefronts, and commercial strips',
    ],
    useCases: ['Storefront branding', 'Plaza units', 'Road-facing signage'],
    primaryCta: {
      href: '/quote',
      label: 'Get Free Mockup',
    },
    secondaryCta: {
      href: '/work',
      label: 'View Our Work',
    },
  },
  {
    slug: 'advertisement-boxes',
    title: 'Advertisement Boxes',
    shortLabel: 'Promotional displays',
    color: 'var(--neon-orange)',
    description:
      'Commercial advertisement boxes for businesses that need promotional signage, menu visibility, or seasonal messaging in a polished illuminated format.',
    highlights: [
      'Useful for promotions, menus, and service highlights',
      'Professional presentation without heavy infrastructure',
      'Well suited to hospitality and retail environments',
    ],
    useCases: ['Menu boards', 'Promotional signage', 'Reception areas'],
    primaryCta: {
      href: '/quote',
      label: 'Get Free Mockup',
    },
    secondaryCta: {
      href: '/work',
      label: 'View Our Work',
    },
  },
  {
    slug: 'rgb-rope-fixtures',
    title: 'RGB Rope Fixtures',
    shortLabel: 'Ambient lighting',
    color: 'var(--neon-yellow)',
    description:
      'RGB rope lighting fixtures for commercial interiors, feature ceilings, accent zones, and immersive branded environments.',
    highlights: [
      'Adds depth to bars, lounges, studios, and modern retail spaces',
      'Great for perimeter lighting and architectural accents',
      'Helps transform underused walls and ceilings into branded moments',
    ],
    useCases: ['Bars and lounges', 'Studios', 'Accent lighting'],
    primaryCta: {
      href: '/quote',
      label: 'Plan Your Install',
    },
    secondaryCta: {
      href: '/work',
      label: 'View Our Work',
    },
  },
  {
    slug: 'marquee-signs',
    title: 'Marquee Signs',
    shortLabel: 'Attention grabbing',
    color: 'var(--neon-pink)',
    description:
      'Marquee-style signs built to bring stronger personality, nostalgia, and visual pull to hospitality, entertainment, and retail spaces.',
    highlights: [
      'High-impact signage for memorable first impressions',
      'Works well for launches, experiential spaces, and statement entries',
      'Combines decorative appeal with practical visibility',
    ],
    useCases: ['Entrances', 'Hospitality venues', 'Event-driven spaces'],
    primaryCta: {
      href: '/quote',
      label: 'Get Free Mockup',
    },
    secondaryCta: {
      href: '/work',
      label: 'View Our Work',
    },
  },
  {
    slug: 'house-address-signs',
    title: 'House Address Signs',
    shortLabel: 'Residential signage',
    color: 'var(--neon-cyan)',
    description:
      'Modern illuminated address signs that improve curb appeal, nighttime readability, and overall property presentation for homes and multi-unit residences.',
    highlights: [
      'Clear address visibility for guests and deliveries',
      'Clean modern look for residential exteriors',
      'Built for durability and day-to-night readability',
    ],
    useCases: ['Homes', 'Townhouses', 'Residential entries'],
    primaryCta: {
      href: '/quote',
      label: 'Get Design Help',
    },
    secondaryCta: {
      href: '/work',
      label: 'View Our Work',
    },
  },
]

export function ServiceExplorer() {
  const [selectedSlug, setSelectedSlug] = useState(services[0].slug)
  const selectedService = services.find((service) => service.slug === selectedSlug) ?? services[0]

  return (
    <section style={{ padding: '120px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 52 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>
            What We Do
          </div>
          <h2
            className="display-heading"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', color: 'white', marginBottom: 18 }}
          >
            Our Services
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 680, lineHeight: 1.8, fontSize: '1rem' }}>
            Explore the main signage categories we build for businesses, commercial properties, and
            branded spaces. Select a service to see where it fits and how Radiate can help.
          </p>
        </div>

        <div
          className="service-explorer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 0.82fr) minmax(0, 1.18fr)',
            gap: 24,
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              padding: 12,
            }}
          >
            {services.map((service, index) => {
              const isActive = service.slug === selectedService.slug

              return (
                <button
                  key={service.slug}
                  onClick={() => setSelectedSlug(service.slug)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '20px 18px',
                    background: isActive ? 'rgba(255,255,255,0.02)' : 'transparent',
                    border: `1px solid ${isActive ? service.color : 'transparent'}`,
                    boxShadow: isActive ? `0 0 24px ${service.color}22` : 'none',
                    marginBottom: 10,
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div
                    style={{
                      color: isActive ? service.color : 'var(--text-muted)',
                      fontSize: '0.7rem',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      marginBottom: 10,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')} {service.shortLabel}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                      fontSize: '1.5rem',
                      letterSpacing: '2px',
                      color: 'white',
                    }}
                  >
                    {service.title}
                  </div>
                </button>
              )
            })}
          </div>

          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: 'linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(6,6,6,1) 100%)',
              padding: '34px 32px 32px',
              minHeight: 520,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -60,
                right: -40,
                width: 220,
                height: 220,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${selectedService.color}20 0%, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -90,
                left: -70,
                width: 260,
                height: 260,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${selectedService.color}16 0%, transparent 72%)`,
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                className="section-label"
                style={{ color: selectedService.color, marginBottom: 14 }}
              >
                Service Explorer
              </div>
              <h3
                className="display-heading"
                style={{
                  fontSize: 'clamp(2.3rem, 4vw, 4.4rem)',
                  color: 'white',
                  marginBottom: 18,
                }}
              >
                {selectedService.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, maxWidth: 720 }}>
                {selectedService.description}
              </p>

              <div
                className="service-explorer-details"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(220px, 0.86fr)',
                  gap: 24,
                  marginTop: 32,
                }}
              >
                <div>
                  <div
                    style={{
                      color: 'white',
                      fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                      fontSize: '1.25rem',
                      letterSpacing: '2px',
                      marginBottom: 16,
                    }}
                  >
                    Business Highlights
                  </div>
                  <div style={{ display: 'grid', gap: 12 }}>
                    {selectedService.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        style={{
                          display: 'flex',
                          gap: 12,
                          alignItems: 'flex-start',
                          color: 'var(--text-muted)',
                          lineHeight: 1.7,
                        }}
                      >
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            marginTop: 8,
                            borderRadius: '50%',
                            background: selectedService.color,
                            boxShadow: `0 0 12px ${selectedService.color}`,
                            flexShrink: 0,
                          }}
                        />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    padding: '20px 18px',
                    border: '1px solid var(--border)',
                    background: 'rgba(255,255,255,0.02)',
                    alignSelf: 'start',
                  }}
                >
                  <div
                    style={{
                      color: selectedService.color,
                      fontSize: '0.72rem',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      marginBottom: 12,
                    }}
                  >
                    Best Fit
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 22 }}>
                    {selectedService.useCases.map((item) => (
                      <span
                        key={item}
                        style={{
                          border: '1px solid var(--border)',
                          color: 'white',
                          padding: '8px 10px',
                          fontSize: '0.8rem',
                          letterSpacing: '1px',
                          background: 'rgba(255,255,255,0.02)',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <Link href={selectedService.primaryCta.href} className="btn-neon" style={{ fontSize: '0.85rem' }}>
                      {selectedService.primaryCta.label} <ArrowRight size={15} />
                    </Link>
                    <Link
                      href={selectedService.secondaryCta.href}
                      className="btn-neon btn-neon-cyan"
                      style={{ fontSize: '0.85rem' }}
                    >
                      {selectedService.secondaryCta.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) {
          .service-explorer-grid,
          .service-explorer-details {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
