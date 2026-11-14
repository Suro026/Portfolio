'use client'

import MarginaliaPortfolioTemplate from '@/components/ui/marginalia-portfolio-template'
import { CONTACT } from '@/lib/data/contact'

// Abstract colour-tile placeholders for the phone screens — not real product
// screenshots (none exist yet for these projects), just a tinted fill so the
// mock UI isn't blank. Swap for real screens once there are any to show.
function tile(hex: string, shade: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="960"><rect width="480" height="960" fill="${hex}"/><rect width="480" height="960" fill="#000" opacity="${shade}"/></svg>`
  return 'data:image/svg+xml,' + encodeURIComponent(svg)
}
function tiles(hex: string) {
  return [tile(hex, 0), tile(hex, 0.18), tile(hex, 0.32)]
}

export default function Home() {
  return (
    <MarginaliaPortfolioTemplate
      name="Surajit Sadhukhan"
      role="Aspiring AI Engineer"
      year="2026"
      location="Kolkata"
      title="Folio"
      docLabel="Curriculum Vitae"
      portrait="/avatar.jpg"
      traits={['curious', 'hands-on', 'precise', 'collaborative', 'hackathon-ready', 'design-minded']}
      greeting="Hello."
      bio="I build at the intersection of AI, embedded systems, and design. Most of what I make starts as a hackathon prototype under a hard deadline, which taught me to *cut scope to what actually matters* — and that trust in a model is [a design problem as much as a technical one]."
      educationIntro="Still a student — building real things while I learn."
      education={[
        {
          title: 'B.Tech, Computer Science & Engineering (AI & ML)',
          place: 'Bengal Institute of Technology, Kolkata',
          period: '3rd year',
          circled: true,
        },
      ]}
      cvUrl={CONTACT.github}
      cvNote="my GitHub"
      languages={[
        { name: 'Bengali', level: 'native', value: 1 },
        { name: 'English', level: 'fluent', value: 0.92 },
        { name: 'Hindi', level: 'fluent', value: 0.9 },
      ]}
      tools={[
        { name: 'Figma', mark: 'figma', bg: '#1e1e1e', fg: '#ffffff', note: 'wireframe to hand-off' },
        { name: 'Python', mark: 'Py', bg: '#306998', fg: '#ffffff', note: 'models, scripts, FastAPI' },
        { name: 'Next.js', mark: 'Nx', bg: '#0d0f0e', fg: '#ffffff', note: 'this very page' },
        { name: 'Arduino', mark: 'Ar', bg: '#00878f', fg: '#ffffff', note: 'sensors and servos' },
      ]}
      toolNote="what I reach for"
      skillsIntro="Tools I reach for most."
      skills={['Python', 'FastAPI', 'OpenCV', 'Next.js', 'Tailwind CSS', 'Figma', 'Arduino', 'Raspberry Pi', 'PostgreSQL', 'Git']}
      books={[
        { title: 'The Design of Everyday Things', color: '#e5553b' },
        { title: 'Deep Learning', color: '#1f1512' },
        { title: 'Designing Interfaces', color: '#f3ece2' },
      ]}
      booksNote="currently on my desk"
      projectsNote="six I've actually shipped or am shipping"
      projects={[
        {
          name: 'Handoff',
          tagline: 'Hand off your work, not your files.',
          kind: 'Desktop App · Open Source',
          year: '2026',
          summary:
            'A free, open-source desktop app for freelancers — not just developers. Your client *previews or downloads the originals* straight from your own computer. [No cloud, no watermark, no subscription].',
          challenge: "Most file-sharing tools assume a software workflow — this one had to work for any deliverable.",
          images: tiles('#2b2b2b'),
          screens: ['detail', 'feed', 'cover'],
          accent: '#2b2b2b',
          tag: 'open source',
        },
        {
          name: 'Kala Connect',
          tagline: 'A voice-first catalog for artisans.',
          kind: 'Mobile + AI · Hackathon',
          year: '2026',
          summary:
            'Built with Team NovaX. Turns a photo and a spoken description into a *listing-ready, bilingual* catalog entry for artisans who have never listed a product online — [a digital enablement layer, not another marketplace].',
          challenge: 'Making voice-to-catalog work for artisans with low digital literacy and little English.',
          images: tiles('#e0613a'),
          screens: ['feed', 'cover', 'detail'],
          accent: '#e0613a',
          tag: 'hackathon mvp',
        },
        {
          name: 'QR Catalog',
          tagline: 'Scan a code, see the shop.',
          kind: 'Web · Open Source',
          year: '2026',
          summary:
            "The public half of Kala Connect: a customer scans an artisan's QR code and lands on [their own catalog page] — *no app, no account*.",
          images: tiles('#1f6f6b'),
          screens: ['cover', 'detail', 'feed'],
          accent: '#1f6f6b',
          tag: 'in progress',
        },
        {
          name: 'PlanSphere',
          tagline: 'One pass for the whole fest.',
          kind: 'Full-Stack · Campus Events',
          year: '2026',
          summary:
            'Registrations, gate scanning, live tournament scoring and [publicly verifiable certificates] for a college fest — all under one roof *instead of five spreadsheets*.',
          challenge: 'Role-based access from Event Head down to Volunteer, with no direct database writes.',
          images: tiles('#3f6b4a'),
          screens: ['stats', 'feed', 'detail'],
          accent: '#3f6b4a',
          tag: 'in progress',
        },
        {
          name: 'Durgazoid',
          tagline: 'Every pandal, mapped.',
          kind: 'Static Site · Culture',
          year: '2025',
          summary:
            'My Durga Puja documentation project — pandals, food stalls, parking and routes, [started as a school project] and *still growing*, toward a festival-discovery app in 2027.',
          images: tiles('#8a5a2b'),
          screens: ['feed', 'cover', 'detail'],
          accent: '#8a5a2b',
          tag: 'ongoing',
        },
        {
          name: 'Delta',
          tagline: 'Know the real mileage.',
          kind: 'Machine Learning · Flask',
          year: '2025',
          summary:
            'Predicts real-world vehicle mileage against the brochure figure across bikes, cars and e-scooters, and turns it into [real trip cost] *from whatever fuel price you type in*.',
          challenge: 'Finding and cleaning real mileage datasets instead of trusting brochure numbers.',
          images: tiles('#1f2a2b'),
          screens: ['stats', 'detail', 'cover'],
          accent: '#1f2a2b',
          tag: 'deployed',
        },
      ]}
      factsNote="off the clock"
      facts={[
        { doodle: 'camera', text: 'Documents every Durga Puja pandal I can reach, one by one' },
        { doodle: 'pencil', text: 'Still designing event posters for GDG and IIC between hackathons' },
        { doodle: 'coffee', text: 'Codes best in a hackathon’s last six hours' },
      ]}
      thanks="Thank you."
      email={CONTACT.email}
      links={[{ label: 'GitHub', href: CONTACT.github }]}
      letter={
        "Thanks for reading this far.\n\nIf you're building something with AI, hardware, or an interface that needs to feel right, I'd like to hear about it."
      }
      colors={{ paper: '#faf6f0', night: '#1f1512', ink: '#1f1512', pen: '#e5553b' }}
    />
  )
}
