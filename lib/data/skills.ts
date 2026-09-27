export interface SkillGroup {
  category: string
  items: string[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  { category: 'AI / ML', items: ['Python', 'PyTorch', 'scikit-learn', 'OpenCV', 'LangChain', 'Prompt Engineering'] },
  { category: 'Backend', items: ['FastAPI', 'Node.js', 'PostgreSQL', 'REST', 'WebSockets'] },
  { category: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'IoT / Embedded', items: ['Raspberry Pi', 'Arduino', 'Sensor Networks', 'MQTT'] },
  { category: 'Design', items: ['Figma', 'Prototyping', 'Design Systems', 'Motion Design'] },
]

export const TERMINAL_HELP = [
  'Available commands:',
  '  help      Show this help message',
  '  skills    List technical skills',
  '  python    About Python experience',
  '  fastapi   About backend/API experience',
  '  iot       About IoT & embedded experience',
  '  figma     About design experience',
  '  whoami    Who runs this terminal',
  '  clear     Clear the terminal',
]

export const TERMINAL_RESPONSES: Record<string, string[]> = {
  whoami: ['surajit@gamefolio', 'Aspiring AI Engineer // IoT Systems Builder // UI-UX Designer'],
  python: [
    'python --experience',
    'Primary language for ML pipelines, backend services, and automation.',
    'Comfortable with PyTorch, OpenCV, FastAPI, and data-heavy scripting.',
  ],
  fastapi: [
    'fastapi --status',
    'Design and ship REST + WebSocket APIs backing AI and IoT products.',
    'Comfortable with async workflows, auth, and PostgreSQL integration.',
  ],
  iot: [
    'iot --devices',
    'Hands-on with Raspberry Pi + Arduino sensor networks, MQTT messaging,',
    'and bridging physical sensors to real-time dashboards.',
  ],
  figma: [
    'figma --practice',
    'Design systems, high-fidelity prototyping, and motion design.',
    'Leads the design track for GDG On Campus.',
  ],
}
