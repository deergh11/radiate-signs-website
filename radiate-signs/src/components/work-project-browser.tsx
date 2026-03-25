'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ProjectCard } from '@/data/project-types'

function ProjectCardImage({ project }: { project: ProjectCard }) {
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
            fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
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
    <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
      <Image
        src={project.src}
        alt={project.imageAlt ?? project.title}
        fill
        sizes="(max-width: 520px) 100vw, (max-width: 1100px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
        onError={() => setError(true)}
      />
    </div>
  )
}

export function WorkProjectBrowser({
  projects,
  categories,
}: {
  projects: ProjectCard[]
  categories: string[]
}) {
  const [filter, setFilter] = useState('All')
  const filtered =
    filter === 'All' ? projects : projects.filter((project) => project.category === filter)

  return (
    <>
      <div
        className="work-page-shell"
        style={{
          padding: '0 40px 48px',
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '8px 20px',
              background: filter === cat ? 'var(--neon-pink)' : 'transparent',
              border: `1px solid ${filter === cat ? 'var(--neon-pink)' : 'var(--border)'}`,
              color: filter === cat ? 'black' : 'var(--text-muted)',
              fontFamily: 'var(--font-barlow), Barlow, sans-serif',
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
        className="work-page-shell work-grid"
        style={{
          padding: '48px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 2,
        }}
      >
        {filtered.map((project) => {
          const card = (
            <div
              style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-card)' }}
              className="card-dark"
            >
              <ProjectCardImage project={project} />

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
                    fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
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
    </>
  )
}
