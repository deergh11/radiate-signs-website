export type ProjectGalleryImage = {
  src: string
  alt: string
}

export type ProjectStat = {
  label: string
  value: string
}

export type ProjectHighlight = {
  label: string
  icon: 'map-pin' | 'wrench' | 'shield-check'
}

export type CaseStudyContent = {
  heroTitle: string
  heroBody: string
  heroBadges: string[]
  overviewTitle: string
  overviewBody: string
  overviewStats: ProjectStat[]
  overviewHighlights: ProjectHighlight[]
  challengeTitle: string
  challengeBody: string
  solutionTitle: string
  solutionBody: string
  installationTitle: string
  installationBody: string
  videoTitle: string
  videoBody: string
  videoLabel: string
  resultTitle: string
  resultBody: string
  ctaTitle: string
  ctaBody: string
}

export type ProjectCard = {
  id: number
  slug?: string
  src: string
  imageAlt?: string
  title: string
  summary?: string
  client?: string
  industry?: string
  category: string
  tags?: string[]
  location: string
  color: string
  href?: string
}

export type CaseStudyProject = ProjectCard & {
  slug: string
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
  ogImageAlt?: string
  heroImage: string
  heroImageAlt?: string
  galleryImages: ProjectGalleryImage[]
  reelPath: string
  caseStudy: CaseStudyContent
}
