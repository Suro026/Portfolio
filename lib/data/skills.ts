export interface SkillGroup {
  category: string
  items: string[]
  /** Technologies actively being learned/experimented with, shown with a distinct label — not a fake proficiency score. */
  learning?: string[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'AI & Machine Learning',
    items: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'OpenCV', 'LLM Integration', 'Applied AI & Computer Vision'],
    learning: ['TensorFlow', 'PyTorch'],
  },
  {
    category: 'Backend & App Development',
    items: ['FastAPI', 'Flask', 'Django', 'REST APIs', 'HTML', 'HTMX', 'Tailwind CSS', 'Jinja2', 'PostgreSQL', 'Firebase Auth', 'Firestore'],
  },
  {
    category: 'IoT & Hardware',
    items: ['Raspberry Pi 4 Model B', 'Arduino Uno', 'ESP32', 'Servo Motors', 'L298N Motor Driver', 'Raspberry Pi Camera', 'Sensor Integration'],
  },
  {
    category: 'UI/UX & Visual Design',
    items: [
      'Figma',
      'Canva',
      'Adobe Photoshop',
      'Wireframing',
      'Prototyping',
      'Visual Hierarchy',
      'Typography',
      'Color Systems',
      'Responsive Design',
      'Branding & Graphic Design',
    ],
  },
  {
    category: 'Tools & Workflow',
    items: ['Git', 'GitHub', 'VS Code', 'Ollama', 'Linux Fundamentals', 'Vercel', 'API Integration'],
  },
]
