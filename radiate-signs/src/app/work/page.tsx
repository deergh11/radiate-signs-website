'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { projects, workCategories } from '@/data/projects'

function ProjectImage({ project }: { project: typeof projects[0] }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        style={{
          aspectRatio: '4/3',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '2rem',
            color: project.color,
            textShadow: `0 0 20px ${project.color}`,
            letterSpacing: '4px',
          }}
        >
          RADIATE
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: 8 }}>
          {project.category}
        </div>
      </div>
    )
  }

  return (
    <img
      src={project.src}
      alt={project.title}
      onError={() => setError(true)}
      style={{
        width: '100%',
        aspectRatio: '4/3',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  )
}

export default function WorkPage() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? projects : projects.filter((project) => project.category === filter)

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div style={{ padding: '60px 40px 40px' }}>
        <div className="section-label" style={{ marginBottom: 16 }}>
          Portfolio
        </div>
        <h1
          className="display-heading"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'white', marginBottom: 24 }}
        >
          Our <span className="neon-text-pink">Work</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: 560, lineHeight: 1.7, fontSize: '1rem' }}>
          Every project is custom - built to match your brand, space, and vision. Here&apos;s a
          look at what we&apos;ve created for businesses across the GTA.
        </p>
      </div>

      <div
        style={{
          padding: '0 40px 48px',
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {workCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '8px 20px',
              background: filter === cat ? 'var(--neon-pink)' : 'transparent',
              border: `1px solid ${filter === cat ? 'var(--neon-pink)' : 'var(--border)'}`,
              color: filter === cat ? 'black' : 'var(--text-muted)',
              fontFamily: 'Barlow, sans-serif',
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        style={{
          padding: '48px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 2,
        }}
      >
        {filtered.map((project) => {
          const card = (
            <div
              style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-card)' }}
              className="card-dark"
            >
              <ProjectImage project={project} />

              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px',
                  background: 'linear-gradient(transparent, rgba(8,8,8,0.95))',
                }}
              >
                <div
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '3px',
                    color: project.color,
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  {project.category} | {project.location}
                </div>
                <div
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '1.4rem',
                    letterSpacing: '2px',
                    color: 'white',
                  }}
                >
                  {project.title}
                </div>
                {project.href ? (
                  <div
                    style={{
                      color: 'white',
                      marginTop: 10,
                      fontSize: '0.8rem',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                    }}
                  >
                    View case study
                  </div>
                ) : null}
              </div>
            </div>
          )

          if (!project.href) {
            return <div key={project.id}>{card}</div>
          }

          return (
            <Link key={project.id} href={project.href} style={{ textDecoration: 'none' }}>
              {card}
            </Link>
          )
        })}
      </div>

      <div
        style={{
          padding: '80px 40px',
          textAlign: 'center',
          borderTop: '1px solid var(--border)',
        }}
      >
        <h2
          className="display-heading"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'white', marginBottom: 24 }}
        >
          Want Something Like This?
        </h2>
        <Link href="/quote" className="btn-neon" style={{ fontSize: '0.9rem' }}>
          Get Your Free Mockup <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
