export interface ProjectData {
  id: string
  title: string
  category: string
  status: string
  team?: string
  role?: string
  description: string
  techStack: string[]
  github: string | null
  demo: string | null
}

// Real project descriptions, verified against each project's own repository/README.
// Repo links are left blank on purpose — added once Surajit shares the public URLs.
export const PROJECTS: ProjectData[] = [
  {
    id: 'handoff',
    title: 'Handoff',
    category: 'Desktop App / Freelance Tools',
    status: 'Early development (v0.1)',
    description:
      "A free, open-source desktop app that lets any freelancer — not just developers — hand finished work to a client straight from their own computer. Add files, create a private share link, and the client previews or downloads the original files in a browser: nothing uploaded, compressed, or watermarked. Links can be password-protected, time-limited, or capped on downloads, and revoked any time. Built because most file-sharing tools assume a software workflow; this one is for any deliverable, from design files to video exports.",
    techStack: ['Python', 'PyInstaller', 'Cloudflare Tunnel', 'Tailscale'],
    github: null,
    demo: null,
  },
  {
    id: 'kala-connect',
    title: 'Kala Connect',
    category: 'Mobile App / AI for Artisans',
    status: 'Hackathon MVP — core pipeline working',
    team: 'Team NovaX',
    role: 'Team Lead',
    description:
      "A voice-first mobile app that turns a photo and a spoken description into a listing-ready, bilingual product catalog entry — built for artisans who can't type, don't speak English, and have never listed a product online. The core pipeline (photo cleanup, voice transcription, a mandatory human-confirm step, AI-generated bilingual listing, and a transparent pricing breakdown) runs end to end against a real backend. It's a digital enablement layer for existing channels like GeM and ONDC, not a competing marketplace.",
    techStack: ['Flutter', 'FastAPI', 'Firebase', 'Ollama', 'Supabase Postgres'],
    github: null,
    demo: null,
  },
  {
    id: 'qr-catalog',
    title: 'Open-source QR Catalog',
    category: 'Open Source / Web Storefront',
    status: 'In development',
    description:
      "The public half of Kala Connect's catalog system: an open-source web storefront an artisan's customers reach by scanning a QR code, landing on that seller's own catalog page with no app or account needed. Built as a standalone, reusable Next.js project so the QR-catalog piece can be set up independently of the rest of Kala Connect.",
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
    github: null,
    demo: null,
  },
  {
    id: 'plansphere',
    title: 'PlanSphere',
    category: 'Campus Events / Full-Stack Platform',
    status: 'In development',
    description:
      "A platform for a college to run its fest and a single QR pass for a student to get through it: registrations, offline-capable gate and meal scanning, live tournaments with sport-specific scoring and public scoreboards, and auto-generated certificates anyone can verify by number — all under one roof instead of spreadsheets stitched together. Role-based access runs from Event Head down to Volunteer, with privileged actions like publishing results going through authenticated server routes rather than direct database writes.",
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Supabase'],
    github: null,
    demo: null,
  },
  {
    id: 'durgazoid',
    title: 'Durgazoid',
    category: 'Creator Project / Cultural Discovery',
    status: 'Static prototype — ongoing documentation',
    description:
      "My Durga Puja documentation and discovery initiative — mapping pandals, food stalls, parking, and routes to help people explore the festival more easily. Started as a static site and still growing as one, with the gathered information intended as the foundation for a full festival-discovery app in 2027.",
    techStack: ['HTML', 'CSS', 'Content Documentation', 'Photography'],
    github: null,
    demo: null,
  },
  {
    id: 'delta',
    title: 'Delta',
    category: 'Machine Learning / Flask',
    status: 'Deployed prototype',
    description:
      "A vehicle mileage-prediction site exploring the gap between brochure mileage and what a vehicle actually gets on the road. Covers bikes/scooters, cars, and electric scooters, each with its own set of regression and classification models trained on real datasets, and turns the prediction into rupees — trip, monthly, and yearly cost — from whatever fuel price you type in.",
    techStack: ['Python', 'Flask', 'Scikit-learn', 'Pandas', 'Chart.js'],
    github: null,
    demo: null,
  },
]
