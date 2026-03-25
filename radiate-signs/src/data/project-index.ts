import type { ProjectCard } from '@/data/project-types'

export const projectCards: ProjectCard[] = [
  {
    id: 1,
    slug: 'meltwich',
    src: '/work/projects/meltwich/hero/meltwich-hero-1.jpg',
    imageAlt: 'Meltwich restaurant sign installed by Radiate Signs',
    title: 'Meltwich Storefront Install',
    summary:
      'A branded restaurant signage installation designed to improve street visibility and strengthen the storefront presence.',
    client: 'Meltwich',
    industry: 'Restaurant',
    category: 'Case Study',
    tags: ['Storefront Signage', 'Restaurant Signage'],
    location: 'Ontario',
    color: 'var(--neon-pink)',
    href: '/work/meltwich',
  },
  {
    id: 2,
    slug: 'vraj',
    src: '/work/projects/vraj/hero/vraj-hero-1.jpg',
    imageAlt: 'Vraj storefront channel letters and light box signage by Radiate Signs',
    title: 'Vraj Channel Letters & Light Box',
    summary:
      'A storefront branding project focused on illuminated channel letters, light box signage, and stronger street-level visibility.',
    client: 'Vraj',
    industry: 'Retail / Storefront',
    category: 'Case Study',
    tags: ['Channel Letters', 'Light Box Signage', 'Storefront Branding'],
    location: 'Ontario',
    color: 'var(--neon-cyan)',
    href: '/work/vraj',
  },
  {
    id: 3,
    src: '/work/project-02.jpg',
    imageAlt: 'Restaurant feature wall signage project by Radiate Signs',
    title: 'Restaurant Feature Wall',
    category: 'Neon Sign',
    location: 'Mississauga, ON',
    color: 'var(--neon-cyan)',
  },
  {
    id: 4,
    src: '/work/project-03.jpg',
    imageAlt: 'Gym LED installation by Radiate Signs',
    title: 'Gym LED Install',
    category: 'LED Rope',
    location: 'Brampton, ON',
    color: 'var(--neon-orange)',
  },
  {
    id: 5,
    src: '/work/project-04.jpg',
    imageAlt: 'Storefront channel letters installed by Radiate Signs',
    title: 'Storefront Channel Letters',
    category: 'Channel Letters',
    location: 'Etobicoke, ON',
    color: 'var(--neon-pink)',
  },
  {
    id: 6,
    src: '/work/project-05.jpg',
    imageAlt: 'Salon neon sign project by Radiate Signs',
    title: 'Salon Neon Sign',
    category: 'Neon Sign',
    location: 'Burlington, ON',
    color: 'var(--neon-yellow)',
  },
  {
    id: 7,
    src: '/work/project-06.jpg',
    imageAlt: 'UV printed signage project by Radiate Signs',
    title: 'UV Printed Signage',
    category: 'UV Print',
    location: 'Waterloo, ON',
    color: 'var(--neon-purple)',
  },
  {
    id: 8,
    src: '/work/project-07.jpg',
    imageAlt: 'Bar neon feature installation by Radiate Signs',
    title: 'Bar Neon Feature',
    category: 'Neon Sign',
    location: 'Toronto, ON',
    color: 'var(--neon-pink)',
  },
  {
    id: 9,
    src: '/work/project-08.jpg',
    imageAlt: 'Retail channel letters project by Radiate Signs',
    title: 'Retail Channel Letters',
    category: 'Channel Letters',
    location: 'Mississauga, ON',
    color: 'var(--neon-cyan)',
  },
  {
    id: 10,
    src: '/work/project-09.jpg',
    imageAlt: 'Studio LED rope lighting project by Radiate Signs',
    title: 'Studio LED Rope',
    category: 'LED Rope',
    location: 'Brampton, ON',
    color: 'var(--neon-orange)',
  },
]

export const workCategories = [
  'All',
  ...Array.from(new Set(projectCards.map((project) => project.category))),
]

export function getProjectCardBySlug(slug: string) {
  return projectCards.find((project) => project.slug === slug)
}

export function getCaseStudyProjectCards() {
  return projectCards.filter((project) => project.slug)
}

export function getFeaturedProjectCards(limit = 3) {
  return getCaseStudyProjectCards().slice(0, limit)
}
