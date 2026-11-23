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
      cvUrl="/resume/surajit-sadhukhan-ai-engineer-resume.pdf"
      cvNote="my AI Engineer resume"
      cvUrl2="/resume/surajit-sadhukhan-uiux-resume.pdf"
      cvNote2="my UI/UX resume"
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
            'A free, open-source desktop app for freelancers — not just developers. Private links let your client *preview or download the originals* straight from your own computer, exactly as uploaded. [No cloud, no watermark, no subscription] — revoke, password-protect, or set an expiry and download limit on any link.',
          challenge:
            'Reaching a home computer safely: the dashboard only binds to localhost, a separate share service serves the links, and the optional cloudflared tunnel binary is checked against a pinned SHA-256 before it’s ever run.',
          stats: [{ value: 72, label: 'tests passing' }],
          href: 'https://github.com/Suro026/HandOff',
          images: ['/projects/handoff-cover.jpg', '/projects/handoff-feed.jpg', '/projects/handoff-detail.jpg'],
          screens: ['cover', 'feed', 'detail'],
          accent: '#2b2b2b',
          tag: 'v0.1 · early release',
        },
        {
          name: 'Kala Connect',
          tagline: 'A voice-first catalog for artisans.',
          kind: 'Mobile + AI · Hackathon',
          year: '2026',
          summary:
            'Led Team NovaX on this. Photo in, spoken description in, and the pipeline — enhance, transcribe, confirm, then a local LLM — outputs a *listing-ready, bilingual* catalog entry, priced from material cost and comparables. 8 languages, [a digital enablement layer, not another marketplace].',
          challenge:
            'Listing IDs were client-generated, so anyone could POST someone else’s ID and overwrite or reassign their listing. Fixed to return 404 instead of 403 so a guess can’t even confirm the ID exists — found by probing our own auth flow.',
          stats: [{ value: 8, label: 'languages' }],
          images: ['/projects/kalaconnect-cover.jpg', '/projects/kalaconnect-feed.jpg', '/projects/kalaconnect-detail.jpg'],
          screens: ['cover', 'feed', 'detail'],
          accent: '#e0613a',
          tag: 'hackathon prototype',
        },
        {
          name: 'Keystone',
          tagline: 'Free GATE mock tests, built from the real papers.',
          kind: 'Full-Stack · Exam Prep',
          year: '2026',
          summary:
            'Year-wise, subject-wise, mixed and full-length GATE CS/DA mocks, marked against [the official answer key] the moment you submit. Google/email sign-in syncs your progress, and there’s a Books + Notes library alongside it — *all free, no ads*.',
          challenge:
            'Turning scanned 2007–2011 papers — no text layer, no OCR — into clean per-question images: OpenCV rule-detection finds the header/footer lines, with fallback thresholds for pale scans and skewed pages.',
          stats: [
            { value: 1235, label: 'scored questions' },
            { value: 221, label: 'tests passing' },
          ],
          href: 'https://keystonee.vercel.app',
          images: ['/projects/keystone-cover.jpg', '/projects/keystone-feed.jpg', '/projects/keystone-detail.jpg'],
          screens: ['cover', 'feed', 'detail'],
          accent: '#6d28d9',
          tag: 'live',
        },
        {
          name: 'VixaPilot',
          tagline: 'Plan a trip, don’t just book one.',
          kind: 'Travel Tech · AI Prototype',
          year: '2025',
          summary:
            'An AI trip planner, chatbot, hotel search and train search built on Next.js. Give it a destination and it pulls [real attractions, hotels and a Wikipedia summary], then has a local LLM write the itinerary and budget — *no cloud AI bill, runs on your own machine*.',
          challenge:
            'The bundled train dataset stores each route as a Python-style string, not valid JSON — parsed with JSON5, then matched against station codes and weekday run-flags to answer "does this train actually run today".',
          images: ['/projects/vixapilot-cover.jpg', '/projects/vixapilot-feed.jpg', '/projects/vixapilot-detail.jpg'],
          screens: ['cover', 'feed', 'detail'],
          accent: '#e2622c',
          tag: 'prototype',
        },
        {
          name: 'Delta',
          tagline: 'Know the difference.',
          kind: 'Machine Learning · Flask',
          year: '2025',
          summary:
            'Twelve classical ML models per vehicle — six predicting real-world mileage, six classifying it efficient or thirsty — across bikes, cars and e-scooters. Type in today’s fuel price and it turns the prediction into [trip, monthly and yearly cost], adjusted for road type, load, age and service.',
          challenge:
            'The raw bike dataset has shifted columns on many rows — parsed back out with regex per field, deduplicated by colour variant, and normalised from Auto-MPG’s mixed units (mpg, cubic inches, pounds) to km/l, cc and kg.',
          stats: [
            { value: 36, label: 'models trained' },
            { value: 0.85, decimals: 2, label: 'best R² (Random Forest)' },
          ],
          images: ['/projects/delta-cover.jpg', '/projects/delta-stats.jpg', '/projects/delta-detail.jpg'],
          screens: ['cover', 'stats', 'detail'],
          accent: '#1f2a2b',
          tag: 'prototype',
        },
      ]}
      sections={['cover', 'hello', 'education', 'skills', 'projects', 'cases', 'designs', 'facts', 'thanks']}
      designsNote="Figma UI work and Canva graphics, alongside the code"
      designs={[]}
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
