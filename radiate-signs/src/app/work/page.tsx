'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// ── Replace these with your actual project photos ──────────────────────────────
// Place images in /public/work/ and update the src, title, category, location fields.
const projects = [
  {
    id: 1,
    src: '/work/project-01.jpg', // ← replace with your image
    title: 'Restaurant Custom Neon',
    category: 'Neon Sign',
    location: 'Toronto, ON',
    color: 'var(--neon-pink)',
  },
  {
    id: 2,
    src: '/work/project-02.jpg',
    title: 'Retail Channel Letters',
    category: 'Channel Letters',
    location: 'Brampton, ON',
    color: 'var(--neon-cyan)',
  },
  {
    id: 3,
    src: '/work/project-03.jpg',
    title: 'Gym LED Install',
    category: 'LED Rope',
    location: 'Mississauga, ON',
    color: 'var(--neon-orange)',
  },
  {
    id: 4,
    src: '/work/project-04.jpg',
    title: 'Salon Neon Signage',
    category: 'Neon Sign',
    location: 'Etobicoke, ON',
    color: 'var(--neon-pink)',
  },
  {
    id: 5,
    src: '/work/project-05.jpg',
    title: 'Bar UV Printed Sign',
    category: 'UV Print',
    location: 'Burlington, ON',
    color: 'var(--neon-yellow)',
  },
  {
    id: 6,
    src: '/work/project-06.jpg',
    title: 'Barbershop Neon',
    category: 'Neon Sign',
    location: 'Waterloo, ON',
    color: 'var(--neon-purple)',
  },
]

const categories = ['All', 'Neon Sign', 'Channel Letters', 'LED Rope', 'UV Print']

// Placeholder while you add real images
function PlaceholderCard({ project }: { project: typeof projects[0] }) {
  return (
    <div style={{
      aspectRatio: '4/3',
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Fake neon glow placeholder */}
      <div style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '3rem',
        color: project.color,
        textShadow: `0 0 20px ${project.color}, 0 0 60px ${project.color}`,
        letterSpacing: '4px',
      }}>
        RADIATE
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 8, letterSpacing: '2px' }}>
        {project.category.toUpperCase()}
      </div>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 50% 50%, ${project.color}10 0%, transparent 70%)`,
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px',
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        textAlign: 'center',
        fontStyle: 'italic',
      }}>
        Replace with your photo: {project.src}
      </div>
    </div>
  )
}

export default function WorkPage() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ padding: '60px 40px 40px' }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Portfolio</div>
        <h1 className="display-heading" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'white', marginBottom: 24 }}>
          Our <span className="neon-text-pink">Work</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: 560, lineHeight: 1.7, fontSize: '1rem' }}>
          Every project is custom — built to match your brand, space, and vision.
          Here's a look at what we've created for businesses across the GTA.
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{
        padding: '0 40px 48px',
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        borderBottom: '1px solid var(--border)',
      }}>
        {categories.map(cat => (
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

      {/* Grid */}
      <div style={{
        padding: '48px 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: 2,
      }}>
        {filtered.map(project => (
          <div
            key={project.id}
            style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-card)' }}
            className="card-dark"
          >
            {/* Image — swap PlaceholderCard for a real <img> tag when you have photos */}
            <PlaceholderCard project={project} />

            {/* Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '24px',
              background: 'linear-gradient(transparent, rgba(8,8,8,0.95))',
            }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '3px', color: project.color, textTransform: 'uppercase', marginBottom: 4 }}>
                {project.category} · {project.location}
              </div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', letterSpacing: '2px', color: 'white' }}>
                {project.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        padding: '80px 40px',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
      }}>
        <h2 className="display-heading" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'white', marginBottom: 24 }}>
          Want Something Like This?
        </h2>
        <Link href="/quote" className="btn-neon" style={{ fontSize: '0.9rem' }}>
          Get Your Free Mockup <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
