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

export type Project = {
  id: number
  slug?: string
  src: string
  title: string
  summary?: string
  client?: string
  industry?: string
  category: string
  tags?: string[]
  location: string
  color: string
  href?: string
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
  ogImageAlt?: string
  heroImage?: string
  heroImageAlt?: string
  galleryImages?: ProjectGalleryImage[]
  reelPath?: string
  caseStudy?: CaseStudyContent
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'meltwich',
    src: '/work/projects/meltwich/hero/meltwich-hero-1.jpg',
    title: 'Meltwich Storefront Install',
    category: 'Case Study',
    location: 'Ontario',
    color: 'var(--neon-pink)',
    href: '/work/meltwich',
    seoTitle: 'Meltwich Restaurant Sign Case Study | Radiate Signs',
    seoDescription:
      'See how Radiate Signs delivered a custom business sign and branded interior signage feature for Meltwich, designed to improve street visibility and strengthen the restaurant space.',
    ogImage: '/work/projects/meltwich/hero/meltwich-hero-1.jpg',
    ogImageAlt: 'Meltwich restaurant sign installed by Radiate Signs',
    heroImage: '/work/projects/meltwich/hero/meltwich-hero-1.jpg',
    heroImageAlt:
      'Meltwich restaurant sign and branded storefront feature installed by Radiate Signs',
    galleryImages: [
      {
        src: '/work/projects/meltwich/gallery/meltwich-install-1.jpg',
        alt: 'Custom business sign installation inside the Meltwich restaurant',
      },
      {
        src: '/work/projects/meltwich/gallery/meltwich-install-2.jpg',
        alt: 'Branded interior signage feature completed for the Meltwich restaurant space',
      },
      {
        src: '/work/projects/meltwich/gallery/meltwich-install-3.jpg',
        alt: 'Radiate Signs restaurant sign project showing the finished Meltwich installation',
      },
      {
        src: '/work/projects/meltwich/gallery/meltwich-install-4.jpg',
        alt: 'Meltwich branded signage designed for clear visibility in a customer-facing environment',
      },
    ],
    reelPath: '/work/projects/meltwich/reels/meltwich-reel-1.mp4',
    caseStudy: {
      heroTitle: 'Meltwich Restaurant Sign Case Study',
      heroBody:
        'Radiate worked with Meltwich to deliver a branded restaurant signage installation that strengthened the look of the space, supported the storefront identity, and created a more polished customer-facing feature designed to stand out from across the street.',
      heroBadges: ['Storefront Signage', 'Installation Complete'],
      overviewTitle: 'Custom Business Signage For A Branded Restaurant Space',
      overviewBody:
        'Meltwich needed signage that felt aligned with the brand, worked within a real commercial setting, and added a stronger visual statement to the customer experience. The finished installation gives the restaurant a more intentional branded presence while showcasing the level of finish Radiate brings to hospitality and franchise work.',
      overviewStats: [
        { label: 'Client', value: 'Meltwich' },
        { label: 'Project Type', value: 'Restaurant Signage Feature' },
        { label: 'Scope', value: 'Branding, Fabrication + Install' },
        { label: 'Region', value: 'Waterloo, ON' },
      ],
      overviewHighlights: [
        { icon: 'map-pin', label: 'Designed for a customer-facing restaurant space' },
        { icon: 'wrench', label: 'Handled through fabrication and on-site installation' },
        { icon: 'shield-check', label: 'Finished to support a cleaner branded environment' },
      ],
      challengeTitle: 'A Restaurant Sign That Could Be Seen Clearly From The Street',
      challengeBody:
        'For a restaurant brand, signage has to do more than fill wall space. It needs to feel consistent with the identity of the business, read clearly from across the street, and contribute to a space that feels considered from the first glance. One of the key goals for this project was to create a branded feature that could help pull attention toward the location and make the storefront more visually memorable.',
      solutionTitle: 'Custom Restaurant Signage Designed For Visibility And Brand Fit',
      solutionBody:
        'Radiate approached the project with a focus on visual clarity, finish quality, and installation discipline. The sign was positioned and designed to improve visibility from across the street while still feeling integrated into the restaurant rather than added as an afterthought. This helped the space look sharper, more cohesive, and more likely to catch attention in a busy commercial setting.',
      installationTitle: 'Branded Interior Signage And Installation Details',
      installationBody:
        'These project images show the signage in context, highlighting the finished look, placement, and the way the feature supports the overall visual identity of the restaurant space.',
      videoTitle: 'Project Walkthrough',
      videoBody:
        'The reel gives a closer look at the completed signage in a live environment, helping restaurant owners, franchise groups, and commercial buyers see the finish and presence of the project beyond still photography.',
      videoLabel: 'Commercial install reel',
      resultTitle: 'A More Visible And Memorable Restaurant Space',
      resultBody:
        'The finished installation gave Meltwich a stronger branded feature within the space and a clearer visual presence from the street. The project helped draw more attention to the location, increased foot traffic, and created signage people wanted to photograph and share on social media. For prospective clients, it shows how Radiate approaches restaurant and franchise signage with a focus on visibility, brand alignment, and commercial presentation.',
      ctaTitle: 'Planning A Restaurant Or Retail Signage Project?',
      ctaBody:
        'If you need signage that strengthens the look of your space and reflects your brand more clearly, Radiate can help plan, build, and install a solution that fits the environment.',
    },
  },
  {
    id: 2,
    slug: 'vraj',
    src: '/work/projects/vraj/hero/vraj-hero-1.jpg',
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
    seoTitle: 'Vraj Channel Letters & Light Box Case Study | Radiate Signs',
    seoDescription:
      'See how Radiate Signs delivered illuminated channel letters and light box storefront branding for Vraj to improve visibility, presentation, and street presence.',
    ogImage: '/work/projects/vraj/hero/vraj-hero-1.jpg',
    ogImageAlt: 'Vraj storefront channel letters and light box signage by Radiate Signs',
    heroImage: '/work/projects/vraj/hero/vraj-hero-1.jpg',
    heroImageAlt:
      'Illuminated Vraj storefront branding with channel letters and light box signage installed by Radiate Signs',
    galleryImages: [
      {
        src: '/work/projects/vraj/gallery/vraj-install-1.jpg',
        alt: 'Vraj storefront branding installation with illuminated signage by Radiate Signs',
      },
      {
        src: '/work/projects/vraj/gallery/vraj-install-2.jpg',
        alt: 'Channel letters installed for the Vraj storefront to improve visibility and presentation',
      },
      {
        src: '/work/projects/vraj/gallery/vraj-install-3.JPEG',
        alt: 'Close-up view of the Vraj illuminated storefront sign and branding details',
      },
      {
        src: '/work/projects/vraj/gallery/vraj-install-4.jpg',
        alt: 'Radiate Signs channel letters and light box signage project for Vraj',
      },
      {
        src: '/work/projects/vraj/gallery/vraj-install-5.jpg',
        alt: 'Finished Vraj storefront signage designed for stronger street presence',
      },
    ],
    reelPath: '/work/projects/vraj/reels/vraj-reel-1.mp4',
    caseStudy: {
      heroTitle: 'Vraj Channel Letters & Light Box Case Study',
      heroBody:
        'Radiate worked with Vraj to deliver illuminated channel letters and a custom light box installation that gave the community center a stronger street presence, more professional signage, and clearer visibility along Mississauga Road in Brampton.',
      heroBadges: ['Channel Letters', 'Light Box Signage'],
      overviewTitle: 'Storefront Branding Built For Visibility And Presentation',
      overviewBody:
        'Vraj needed storefront signage that looked polished, felt aligned with the space, and could hold its own in a prominent roadside location. As a recently opened religious community center, the site needed commercial-quality signage that would help establish its presence and create a more visible, attention-grabbing exterior.',
      overviewStats: [
        { label: 'Client', value: 'Vraj' },
        { label: 'Industry', value: 'Retail / Storefront' },
        { label: 'Project Type', value: 'Channel Letters + Light Box' },
        { label: 'Region', value: 'Brampton, ON' },
      ],
      overviewHighlights: [
        { icon: 'map-pin', label: 'Designed to improve storefront visibility from the street' },
        { icon: 'wrench', label: 'Handled through fabrication and professional installation' },
        { icon: 'shield-check', label: 'Built to give the business a cleaner, more professional face' },
      ],
      challengeTitle: 'Create A Storefront That Looked More Established And Easier To Spot',
      challengeBody:
        'This project came with real installation challenges. The custom light box fabrication required careful execution, and the installation height added another layer of difficulty on site. At the same time, the signage needed to feel professional, read clearly from the road, and give the newly opened Vraj community center a stronger and more established presence.',
      solutionTitle: 'Illuminated Signage Designed For Street Presence',
      solutionBody:
        'Radiate solved the fabrication and installation challenges by delivering a high-quality custom light box alongside illuminated storefront signage that was built for visibility and clean presentation. The final installation was designed to stand out from the street, handle the site conditions properly, and give the location a stronger commercial presence.',
      installationTitle: 'Channel Letters, Light Box Signage, And Storefront Details',
      installationBody:
        'These project images show how the completed channel letters and custom light box work together in context, from the installation details to the full roadside presence. The finished signage gives the property a cleaner, more credible, and more visible exterior identity.',
      videoTitle: 'Project Walkthrough',
      videoBody:
        'The reel gives a closer look at the finished Vraj installation and helps business owners, retail operators, and commercial buyers see how illuminated signage can improve visibility and storefront presentation in the real world.',
      videoLabel: 'Storefront branding reel',
      resultTitle: 'A Stronger Street Presence For The Business',
      resultBody:
        'The completed installation gave the Vraj community center a more visible and professional presence on Mississauga Road in Brampton. As a recently opened religious community center, the location now has commercial-quality signage that feels beautiful, attention-grabbing, and clearly established. For prospective clients, the project shows how Radiate handles channel letters, custom light boxes, and challenging installations without compromising on finish or visual impact.',
      ctaTitle: 'Need Channel Letters Or Storefront Branding For Your Business?',
      ctaBody:
        'If your location needs a stronger street presence, cleaner branding, or illuminated signage that presents your business more professionally, Radiate can help design, build, and install the right solution.',
    },
  },
  {
    id: 3,
    src: '/work/project-02.jpg',
    title: 'Restaurant Feature Wall',
    category: 'Neon Sign',
    location: 'Mississauga, ON',
    color: 'var(--neon-cyan)',
  },
  {
    id: 4,
    src: '/work/project-03.jpg',
    title: 'Gym LED Install',
    category: 'LED Rope',
    location: 'Brampton, ON',
    color: 'var(--neon-orange)',
  },
  {
    id: 5,
    src: '/work/project-04.jpg',
    title: 'Storefront Channel Letters',
    category: 'Channel Letters',
    location: 'Etobicoke, ON',
    color: 'var(--neon-pink)',
  },
  {
    id: 6,
    src: '/work/project-05.jpg',
    title: 'Salon Neon Sign',
    category: 'Neon Sign',
    location: 'Burlington, ON',
    color: 'var(--neon-yellow)',
  },
  {
    id: 7,
    src: '/work/project-06.jpg',
    title: 'UV Printed Signage',
    category: 'UV Print',
    location: 'Waterloo, ON',
    color: 'var(--neon-purple)',
  },
  {
    id: 8,
    src: '/work/project-07.jpg',
    title: 'Bar Neon Feature',
    category: 'Neon Sign',
    location: 'Toronto, ON',
    color: 'var(--neon-pink)',
  },
  {
    id: 9,
    src: '/work/project-08.jpg',
    title: 'Retail Channel Letters',
    category: 'Channel Letters',
    location: 'Mississauga, ON',
    color: 'var(--neon-cyan)',
  },
  {
    id: 10,
    src: '/work/project-09.jpg',
    title: 'Studio LED Rope',
    category: 'LED Rope',
    location: 'Brampton, ON',
    color: 'var(--neon-orange)',
  },
]

export const workCategories = [
  'All',
  ...Array.from(new Set(projects.map((project) => project.category))),
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getCaseStudyProjects() {
  return projects.filter((project) => project.slug && project.caseStudy)
}
