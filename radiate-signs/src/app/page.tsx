'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Settings, Shield } from 'lucide-react'
import { HeroImageCarousel } from '../components/hero-image-carousel'
import { ServiceExplorer } from '../components/service-explorer'
import { getCaseStudyProjects } from '../data/projects'

// Animated counter
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
        if (start >= to) {
          setVal(to)
          return
        }

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

// Ticker
const tickerItems = [
  'Custom Neon Signs',
  'Channel Letters',
  'LED Installs',
  'Free Design Mockup',
  'Direct Pricing',
  'UV Printed Signs',
  'Professional Install',
  'Serving Ontario',
]

const heroImages = [
  {
    src: '/work/header-pictures/IMG_3489.jpg',
    alt: 'Radiate Signs storefront installation project',
  },
  {
    src: '/work/header-pictures/IMG_3567.jpg',
    alt: 'Custom illuminated signage installation for a commercial space',
  },
  {
    src: '/work/header-pictures/IMG_3605.jpg',
    alt: 'LED sign installation completed for a business interior',
  },
  {
    src: '/work/header-pictures/IMG_8030.jpg',
    alt: 'Finished Radiate Signs project showcasing real business signage',
  },
]

const stats = [
  { val: 20, suffix: '+', label: 'Commercial Installs' },
  { val: 2.5, suffix: ' yrs', label: 'In Business' },
  { val: 6, suffix: '', label: 'Cities Across Ontario' },
  { val: 24, suffix: 'hr', label: 'Free Mockups' },
]

const featuredProjects = getCaseStudyProjects().slice(0, 3)

export default function HomePage() {
  const whyUsRef = useRef<HTMLElement | null>(null)
  const [whyUsVisible, setWhyUsVisible] = useState(false)

  useEffect(() => {
    const node = whyUsRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setWhyUsVisible(true)
        observer.disconnect()
      },
      { threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* HERO */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '120px 40px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow blobs */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '-10%',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(194,113,186,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '-5%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(115,194,202,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

        <div
          className="hero-stats-shell"
          style={{
            width: '100%',
            maxWidth: 1380,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(320px, 0.95fr)',
            gap: 48,
            alignItems: 'start',
          }}
        >
          <div
            style={{
              opacity: whyUsVisible ? 1 : 0,
              transform: whyUsVisible ? 'translateY(0)' : 'translateY(18px)',
              transition: 'opacity 320ms ease, transform 320ms ease',
            }}
          >
            {/* Location badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
              <MapPin size={12} color="var(--neon-pink)" />
              <span className="section-label" style={{ color: 'var(--text-muted)' }}>
                Toronto, Brampton, Mississauga, Etobicoke, Burlington, Waterloo
              </span>
            </div>

            {/* Main heading */}
            <h1
              className="display-heading flicker"
              style={{
                fontSize: 'clamp(4rem, 12vw, 11rem)',
                color: 'white',
                maxWidth: 1100,
                marginBottom: 8,
              }}
            >
              Stand Out.
            </h1>
            <h1
              className="display-heading"
              style={{
                fontSize: 'clamp(4rem, 12vw, 11rem)',
                maxWidth: 1100,
                marginBottom: 32,
              }}
            >
              <span className="neon-text-pink flicker-fast">Lit.</span>
            </h1>

            <p
              style={{
                fontFamily: 'Barlow, sans-serif',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                fontWeight: 300,
                color: 'var(--text-muted)',
                maxWidth: 560,
                lineHeight: 1.8,
                marginBottom: 16,
                paddingLeft: 20,
                borderLeft: '1px solid rgba(194, 113, 186, 0.3)',
              }}
            >
              We handle custom neon signs, channel letters, UV printed signage, and LED installs
              for businesses across the GTA and Southern Ontario. Design, sourcing, and
              professional installation.
            </p>

            <div
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                letterSpacing: '1px',
                lineHeight: 1.6,
                marginBottom: 32,
                paddingLeft: 20,
              }}
            >
              Installed for restaurants, gyms, salons, and retailers across the GTA.
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
              <Link href="/quote" className="btn-neon" style={{ fontSize: '0.9rem' }}>
                Get Free Mockup <ArrowRight size={16} />
              </Link>
              <Link href="/work" className="btn-neon btn-neon-cyan" style={{ fontSize: '0.9rem' }}>
                View Our Work
              </Link>
            </div>
          </div>

          <div
            style={{
              width: '100%',
              alignSelf: 'start',
              marginTop: 72,
            }}
          >
            <HeroImageCarousel images={heroImages} />
          </div>
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: 1380,
            margin: '56px auto 0',
            paddingTop: 40,
            borderTop: '1px solid var(--border)',
          }}
        >
          <div
            className="hero-stats-grid"
            style={{
              maxWidth: 980,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              columnGap: 32,
              rowGap: 28,
              alignItems: 'start',
            }}
          >
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div className="display-heading neon-text-pink" style={{ fontSize: '3.5rem' }}>
                  <Counter to={Math.floor(s.val)} suffix={s.suffix} />
                </div>
                <div
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            section > div {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
          }

          @media (max-width: 900px) {
            .hero-stats-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 560px) {
            .hero-stats-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* TRUST STRIP */}
      <section
        style={{
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '64px 40px',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 16 }}>
            Why Businesses Choose Us
          </div>
          <h2
            className="display-heading"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: 48 }}
          >
            Built for Commercial Spaces
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 2,
            }}
          >
            {[
              {
                icon: <Clock size={32} />,
                title: '24hr Design Mockups',
                desc: 'Free design mockup within 24 hours. Fast decisions, faster execution.',
              },
              {
                icon: <MapPin size={32} />,
                title: 'GTA Installation',
                desc: "Professional delivery and install across Ontario. Not just suppliers - we're hands on.",
              },
              {
                icon: <Settings size={32} />,
                title: 'End-to-End Setup',
                desc: 'From concept to power-on. Design, fabrication, installation - all managed.',
              },
              {
                icon: <Shield size={32} />,
                title: 'Business Pricing',
                desc: 'Radiate offers the best business rates to help your business shine bright without breaking the bank.',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '32px 24px',
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(194, 113, 186, 0.3)'
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(194, 113, 186, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div
                  style={{
                    color: 'var(--neon-pink)',
                    marginBottom: 16,
                    filter: 'drop-shadow(0 0 8px rgba(194, 113, 186, 0.3))',
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '1.2rem',
                    letterSpacing: '2px',
                    color: 'white',
                    marginBottom: 12,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 600px) {
            section > div { gap: 16px !important; }
            section h2 { font-size: clamp(1.5rem, 3vw, 2.5rem) !important; }
          }
        `}</style>
      </section>

      {/* TICKER */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 0',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 60,
            animation: 'ticker 25s linear infinite',
            width: 'max-content',
          }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '1rem',
                letterSpacing: '3px',
                color: i % 2 === 0 ? 'var(--text-muted)' : 'var(--neon-pink)',
                whiteSpace: 'nowrap',
              }}
            >
              {item} *
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

      <ServiceExplorer />

      {/* WHY RADIATE */}
      <section
        ref={whyUsRef}
        style={{
          padding: '120px 40px',
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
            gap: 48,
            alignItems: 'start',
          }}
        >
          <div
            style={{
              opacity: whyUsVisible ? 1 : 0,
              transform: whyUsVisible ? 'translateY(0)' : 'translateY(18px)',
              transition: 'opacity 320ms ease 100ms, transform 320ms ease 100ms',
            }}
          >
            <div className="section-label" style={{ marginBottom: 16 }}>
              Why Us
            </div>
            <h2
              className="display-heading"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'white', marginBottom: 32 }}
            >
              Built for
              <br />
              <span
                style={{
                  color: 'var(--neon-cyan)',
                  textShadow:
                    '0 0 4px rgba(115,194,202,0.7), 0 0 10px rgba(115,194,202,0.4), 0 0 18px rgba(115,194,202,0.18)',
                }}
              >
                Real Business Impact
              </span>
            </h2>
            <p
              style={{
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                fontSize: '1rem',
                marginBottom: 28,
                maxWidth: 520,
              }}
            >
              Radiate delivers custom signage designed to elevate your space, strengthen your
              brand, and help your business stand out. From concept to installation, we focus on
              clean execution, reliable turnaround, and results that feel built for your space from
              day one.
            </p>

            {[
              'Custom-built for your brand and space',
              'Seamless turnaround from concept to install',
              'High-quality materials and finishes',
              'Trusted by businesses across Ontario',
            ].map((item, index) => (
              <div
                key={item}
                className="why-us-bullet"
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  color: 'var(--text-muted)',
                  marginBottom: 18,
                  fontWeight: 400,
                  opacity: whyUsVisible ? 1 : 0,
                  transform: whyUsVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 320ms ease ${index * 70}ms, transform 320ms ease ${index * 70}ms`,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: 'var(--neon-pink)',
                    boxShadow: '0 0 12px rgba(194,113,186,0.8)',
                    flexShrink: 0,
                  }}
                />
                <span>{item}</span>
              </div>
            ))}

            <div
              style={{
                color: 'rgba(255,255,255,0.52)',
                fontSize: '0.85rem',
                lineHeight: 1.7,
                marginTop: 4,
                maxWidth: 420,
                opacity: whyUsVisible ? 1 : 0,
                transform: whyUsVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 340ms ease 220ms, transform 340ms ease 220ms',
              }}
            >
              Used by restaurants, retail stores, and growing brands across Ontario
            </div>

            <div style={{ marginTop: 36 }}>
              <Link href="/quote" className="btn-neon">
                Get Your Free Design Mockup <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>
              Featured Work
            </div>

            <div
              className="home-featured-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: featuredProjects.length > 2 ? 'repeat(3, minmax(0, 1fr))' : 'repeat(2, minmax(0, 1fr))',
                gap: 16,
              }}
            >
              {featuredProjects.map((project, index) => {
                const cardEyebrow = (project.client ?? project.title.split(' ')[0]).toUpperCase()
                const cardTitle =
                  project.client && project.title.startsWith(project.client)
                    ? project.title.replace(project.client, '').trim() || project.category
                    : project.title.split(' ').slice(1).join(' ') || project.title

                return (
                <Link
                  key={project.slug}
                  href={project.href ?? `/work/${project.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="home-featured-card"
                    style={{
                      position: 'relative',
                      minHeight: 360,
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-dark)',
                      opacity: whyUsVisible ? 1 : 0,
                      transform: whyUsVisible ? 'translateY(0)' : 'translateY(18px)',
                      transition: `opacity 300ms ease ${120 + index * 90}ms, transform 300ms ease ${120 + index * 90}ms, border-color 260ms ease, box-shadow 260ms ease`,
                    }}
                  >
                    <Image
                      src={project.src}
                      alt={project.heroImageAlt ?? project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover', transition: 'transform 0.45s ease' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(6,6,6,0.08) 0%, rgba(6,6,6,0.28) 42%, rgba(6,6,6,0.96) 100%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        left: 20,
                        right: 20,
                        bottom: 20,
                      }}
                    >
                      <div
                        style={{
                          color: project.color,
                          fontSize: '0.74rem',
                          letterSpacing: '3px',
                          textTransform: 'uppercase',
                          marginBottom: 8,
                          fontFamily: 'Bebas Neue, sans-serif',
                        }}
                      >
                        {cardEyebrow}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontSize: '1.35rem',
                          letterSpacing: '2px',
                          color: 'white',
                          marginBottom: 10,
                        }}
                      >
                        {cardTitle}
                      </div>
                      <div
                        className="home-featured-card-link"
                        style={{
                          color: 'rgba(255,255,255,0.82)',
                          fontSize: '0.8rem',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                        }}
                      >
                        View Case Study
                      </div>
                    </div>
                  </div>
                </Link>
                )
              })}
            </div>

            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-start' }}>
              <Link href="/work" className="btn-neon btn-neon-cyan" style={{ fontSize: '0.85rem' }}>
                View All Projects
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            section > div { grid-template-columns: 1fr !important; gap: 48px !important; }
            .home-featured-grid { grid-template-columns: 1fr !important; }
          }

          .home-featured-card:hover {
            border-color: rgba(194, 113, 186, 0.32);
            box-shadow: 0 0 30px rgba(194, 113, 186, 0.12);
          }

          .home-featured-card:hover img {
            transform: scale(1.04);
          }

          .home-featured-card:hover .home-featured-card-link {
            color: white;
          }
        `}</style>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '160px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,45,120,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className="section-label" style={{ marginBottom: 24 }}>
          Ready to Glow?
        </div>
        <h2
          className="display-heading flicker"
          style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', color: 'white', marginBottom: 16 }}
        >
          Let&apos;s Build
        </h2>
        <h2 className="display-heading" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginBottom: 48 }}>
          <span className="neon-text-pink">Your Sign</span>
        </h2>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '1.1rem',
            marginBottom: 48,
            maxWidth: 480,
            margin: '0 auto 48px',
          }}
        >
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
