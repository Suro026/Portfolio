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
