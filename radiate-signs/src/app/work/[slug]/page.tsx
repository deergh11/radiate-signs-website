import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, MapPin, Play, ShieldCheck, Wrench } from 'lucide-react'
import { getCaseStudyProjects, getProjectBySlug } from '@/data/project-case-studies'

type PageProps = {
  params: {
    slug: string
  }
}

function getHighlightIcon(icon: 'map-pin' | 'wrench' | 'shield-check') {
  if (icon === 'map-pin') return <MapPin size={18} />
  if (icon === 'wrench') return <Wrench size={18} />
  return <ShieldCheck size={18} />
}

export function generateStaticParams() {
  return getCaseStudyProjects().map((project) => ({ slug: project.slug! }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug)

  if (!project?.caseStudy) {
    return {
      title: 'Case Study Not Found | Radiate Signs',
    }
  }

  const seoTitle = project.seoTitle ?? `${project.title} | Radiate Signs`
  const seoDescription =
    project.seoDescription ??
    `See how Radiate Signs delivered signage for ${project.title} with a focus on brand fit, visibility, and installation quality.`
  const ogImage = project.ogImage ?? project.heroImage
  const ogImageAlt = project.ogImageAlt ?? project.heroImageAlt ?? `${project.title} by Radiate Signs`

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: ogImageAlt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export default function CaseStudyPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project?.caseStudy || !project.heroImage || !project.galleryImages || !project.reelPath) {
    notFound()
  }

  const content = project.caseStudy

  return (
    <div className="case-study-page" style={{ paddingTop: 100, minHeight: '100vh' }}>
      <section className="case-study-section" style={{ padding: '48px 40px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Link
            href="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              letterSpacing: '1px',
              fontSize: '0.85rem',
              marginBottom: 24,
            }}
          >
            <ArrowLeft size={16} />
            Back to Work
          </Link>

          <div
            className="case-study-hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.9fr) minmax(360px, 1.1fr)',
              gap: 40,
              alignItems: 'end',
            }}
          >
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>
                Case Study
              </div>
              <h1
                className="display-heading"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', color: 'white', marginBottom: 20 }}
              >
                {content.heroTitle}
              </h1>
              <p
                style={{
                  color: 'var(--text-muted)',
                  lineHeight: 1.8,
                  fontSize: '1.05rem',
                  maxWidth: 560,
                  marginBottom: 32,
                }}
              >
                {content.heroBody}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
                {content.heroBadges.map((badge, index) => (
                  <div
                    key={badge}
                    className={index === 0 ? 'btn-neon' : 'btn-neon btn-neon-cyan'}
                    style={{ fontSize: '0.85rem', padding: '12px 20px' }}
                  >
                    {badge}
                  </div>
                ))}
              </div>

              <div
                className="case-study-overview-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: 18,
                  maxWidth: 520,
                }}
              >
                {content.overviewStats.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: '18px 18px 16px',
                      border: '1px solid var(--border)',
                      background: 'rgba(10,10,10,0.72)',
                    }}
                  >
                    <div
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.7rem',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        marginBottom: 8,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        color: 'white',
                        fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                        letterSpacing: '1.5px',
                        fontSize: '1.3rem',
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                minHeight: 'clamp(360px, 52vw, 720px)',
                borderRadius: 28,
                overflow: 'hidden',
                border: '1px solid var(--border)',
                boxShadow:
                  '0 0 0 1px rgba(194,113,186,0.08), 0 30px 80px rgba(0,0,0,0.38), 0 0 60px rgba(194,113,186,0.16)',
              }}
            >
              <Image
                src={project.heroImage}
                alt={project.heroImageAlt ?? `${project.title} installed by Radiate Signs`}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 55vw"
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(6,6,6,0.12) 0%, rgba(6,6,6,0.35) 48%, rgba(6,6,6,0.82) 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="case-study-section" style={{ padding: '32px 40px 0' }}>
        <div
          className="case-study-overview-section"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(280px, 0.8fr)',
            gap: 28,
          }}
        >
          <div
            style={{
              padding: '32px',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
            }}
          >
            <div className="section-label" style={{ marginBottom: 14 }}>
              Project Overview
            </div>
            <h2
              className="display-heading"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', color: 'white', marginBottom: 18 }}
            >
              {content.overviewTitle}
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem' }}>
              {content.overviewBody}
            </p>
          </div>

          <div
            style={{
              padding: '32px',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
            }}
          >
            <div className="section-label" style={{ marginBottom: 18 }}>
              At A Glance
            </div>
            <div style={{ display: 'grid', gap: 18 }}>
              {content.overviewHighlights.map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ color: 'var(--neon-pink)' }}>{getHighlightIcon(item.icon)}</div>
                  <div style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="case-study-section" style={{ padding: '80px 40px 0' }}>
        <div
          className="case-study-detail-grid"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 24,
          }}
        >
          <div style={{ padding: '32px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
            <div className="section-label" style={{ marginBottom: 12 }}>
              Challenge
            </div>
            <h2 className="display-heading" style={{ fontSize: '2.5rem', color: 'white', marginBottom: 16 }}>
              {content.challengeTitle}
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>{content.challengeBody}</p>
          </div>

          <div style={{ padding: '32px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
            <div className="section-label" style={{ marginBottom: 12 }}>
              Our Solution
            </div>
            <h2 className="display-heading" style={{ fontSize: '2.5rem', color: 'white', marginBottom: 16 }}>
              {content.solutionTitle}
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>{content.solutionBody}</p>
          </div>
        </div>
      </section>

      <section className="case-study-section" style={{ padding: '80px 40px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 14 }}>
            Installation
          </div>
          <h2
            className="display-heading"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: 'white', marginBottom: 28 }}
          >
            {content.installationTitle}
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 760, marginBottom: 24 }}>
            {content.installationBody}
          </p>

          <div
            className="case-study-gallery-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 16,
            }}
          >
            {project.galleryImages.map((image, index) => (
              <div
                key={image.src}
                style={{
                  position: 'relative',
                  minHeight: index === 0 ? 420 : 320,
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-study-section" style={{ padding: '80px 40px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 14 }}>
            Reel / Video
          </div>
          <h2
            className="display-heading"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: 'white', marginBottom: 20 }}
          >
            {content.videoTitle}
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 700, marginBottom: 28 }}>
            {content.videoBody}
          </p>

          <div
            style={{
              border: '1px solid var(--border)',
              borderRadius: 24,
              overflow: 'hidden',
              background: 'var(--bg-card)',
              boxShadow: '0 0 40px rgba(194,113,186,0.08)',
            }}
          >
            <video
              controls
              preload="metadata"
              playsInline
              poster={project.heroImage}
              style={{
                width: '100%',
                display: 'block',
                background: 'black',
                maxHeight: '78vh',
              }}
            >
              <source src={project.reelPath} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div
            style={{
              marginTop: 18,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              letterSpacing: '1px',
            }}
          >
            <Play size={15} color="var(--neon-pink)" />
            {content.videoLabel}
          </div>
        </div>
      </section>

      <section className="case-study-section" style={{ padding: '80px 40px 0' }}>
        <div
          className="case-study-result-grid"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.9fr) minmax(280px, 1.1fr)',
            gap: 28,
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: 14 }}>
              Result
            </div>
            <h2
              className="display-heading"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: 'white', marginBottom: 20 }}
            >
              {content.resultTitle}
            </h2>
          </div>

          <div style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '1rem' }}>
            {content.resultBody}
          </div>
        </div>
      </section>

      <section className="case-study-section" style={{ padding: '96px 40px 100px' }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '44px 36px',
            border: '1px solid var(--border)',
            background: 'linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(6,6,6,1) 100%)',
            textAlign: 'center',
          }}
        >
          <h2
            className="display-heading"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: 'white', marginBottom: 18 }}
          >
            {content.ctaTitle}
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 680, margin: '0 auto 28px' }}>
            {content.ctaBody}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/quote" className="btn-neon">
              Start Your Project <ArrowRight size={16} />
            </Link>
            <Link href="/work" className="btn-neon btn-neon-cyan">
              Explore More Work
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .case-study-section {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }

        @media (max-width: 960px) {
          .case-study-hero-grid,
          .case-study-overview-section,
          .case-study-detail-grid,
          .case-study-result-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 700px) {
          .case-study-overview-grid,
          .case-study-gallery-grid {
            grid-template-columns: 1fr !important;
          }

          .case-study-gallery-grid > div {
            min-height: 260px !important;
          }
        }

        @media (max-width: 720px) {
          video {
            max-height: none !important;
          }
        }
      `}</style>
    </div>
  )
}
