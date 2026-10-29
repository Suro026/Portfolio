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

// Real project descriptions — repo/demo links are added once each project has a public URL to share.
export const PROJECTS: ProjectData[] = [
  {
    id: 'netra',
    title: 'N.E.T.R.A.',
    category: 'IoT / Smart Mobility',
    status: 'Hackathon prototype',
    team: 'Team NovaX',
    role: 'Team Leader',
    description:
      'An IoT-focused traffic management project exploring smarter monitoring and management of traffic flow. Combines sensor and camera-based data collection on the hardware side with a software layer for processing and visualizing traffic conditions, built as a working engineering prototype rather than a deployed system.',
    techStack: ['Python', 'OpenCV', 'IoT Sensors', 'Raspberry Pi', 'FastAPI'],
    github: null,
    demo: null,
  },
  {
    id: 'sahaayak',
    title: 'Sahaayak',
    category: 'Robotics / IoT',
    status: 'Hardware prototype',
    description:
      'A robot-dustbin concept exploring robotics and hardware-based automation for a more convenient waste-disposal experience. Focused on the physical prototype — sensor-driven motion and a hardware/software integration layer — rather than a finished autonomous product.',
    techStack: ['Arduino', 'Sensors', 'Servo Motors', 'L298N Motor Driver', 'Embedded C'],
    github: null,
    demo: null,
  },
  {
    id: 'kllinic',
    title: 'Kllinic',
    category: 'Digital Product / Healthcare',
    status: 'Concept & interface design',
    description:
      'A healthcare-related digital product concept centered on the patient-facing experience. Work so far covers the problem framing, proposed user flow, and interface design for a clearer, less stressful clinic interaction.',
    techStack: ['Figma', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    github: null,
    demo: null,
  },
  {
    id: 'manas',
    title: 'Manas',
    category: 'AI / Conversational Experiences',
    status: 'Concept & AI integration',
    description:
      'An AI emotional-companion project concept focused on supportive, judgement-free conversational interaction. The work covers the product concept, interaction design, and AI integration for the conversational layer — it is a companion experience, not a substitute for professional mental healthcare.',
    techStack: ['Python', 'LLM Integration', 'FastAPI', 'Next.js'],
    github: null,
    demo: null,
  },
  {
    id: 'durgazoid',
    title: 'Durgazoid',
    category: 'Creator Project / Cultural Discovery',
    status: 'Ongoing documentation',
    description:
      "My Durga Puja documentation and discovery initiative — mapping pandals, food stalls, parking, and routes to help people explore the festival more easily. It's an ongoing, creator-led content project, with the gathered information intended as the foundation for a potential app in 2027.",
    techStack: ['Content Documentation', 'Photography', 'Maps & Routes', 'Canva'],
    github: null,
    demo: null,
  },
  {
    id: 'localhost',
    title: 'LocalHost',
    category: 'EdTech / AI',
    status: 'In development',
    description:
      'An exam-platform concept built around AI-assisted exam generation, a focused distraction-free exam interface, and server-side proctoring. Planned on a Python backend (FastAPI/Django) with an HTML, HTMX, and Tailwind CSS frontend and PostgreSQL storage — features below reflect what is planned versus implemented as the build progresses.',
    techStack: ['FastAPI', 'Django', 'HTMX', 'Tailwind CSS', 'PostgreSQL'],
    github: null,
    demo: null,
  },
  {
    id: 'delta',
    title: 'Delta',
    category: 'Machine Learning / Flask',
    status: 'Prototype',
    description:
      'A vehicle mileage-prediction website exploring the gap between brochure mileage figures and real-world mileage. It compares outputs from six machine-learning models and estimates trip fuel cost and fare.',
    techStack: ['Python', 'Flask', 'Scikit-learn', 'Pandas'],
    github: null,
    demo: null,
  },
]
