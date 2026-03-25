import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { WorkProjectBrowser } from '@/components/work-project-browser'
import { projectCards, workCategories } from '@/data/project-index'

export default function WorkPage() {
  return (
    <div className="work-page" style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="work-page-shell" style={{ padding: '60px 40px 40px' }}>
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

      <WorkProjectBrowser projects={projectCards} categories={workCategories} />

      <div
        className="work-page-shell"
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

      <style>{`
        @media (max-width: 768px) {
          .work-page-shell {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }

        @media (max-width: 520px) {
          .work-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
