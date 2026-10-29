export interface DesignCategory {
  id: string
  title: string
  description: string
  icon: 'layout' | 'palette' | 'megaphone' | 'share' | 'sprout' | 'pen'
}

export const DESIGN_CATEGORIES: DesignCategory[] = [
  {
    id: 'ui-ux',
    title: 'UI/UX Case Studies',
    description: 'Interface and interaction design for product concepts such as Kllinic and Manas — user flows, wireframes, and polished UI.',
    icon: 'layout',
  },
  {
    id: 'product-concepts',
    title: 'Product Concepts & Wireframes',
    description: 'Early-stage wireframes and product thinking for in-progress builds like LocalHost and Durgazoid.',
    icon: 'pen',
  },
  {
    id: 'branding',
    title: 'Branding & Identity',
    description: 'Visual identity support for campus initiatives and personal projects, from logo marks to consistent design systems.',
    icon: 'palette',
  },
  {
    id: 'event-creatives',
    title: 'Event Creatives',
    description: 'Posters and banners for GDG On Campus, the Institution’s Innovation Council, and the college technical fest.',
    icon: 'megaphone',
  },
  {
    id: 'social-creatives',
    title: 'Social Media Creatives',
    description: 'Social-first creatives for campus community announcements, workshops, and event promotion.',
    icon: 'share',
  },
  {
    id: 'agri-marketing',
    title: 'Agricultural Marketing Design',
    description: 'Farmer-facing product communication and marketing creatives designed during my internship at GROO Agri.',
    icon: 'sprout',
  },
]
