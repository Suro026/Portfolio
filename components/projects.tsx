'use client'

import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'Sahaayak',
    description: 'IoT-integrated solar-powered autonomous robot designed for door-to-door waste collection and smart waste segregation, monitored through a centralized municipal dashboard for real-time waste management.',
    tags: ['Arduino', 'ESP32-CAM', 'IoT', 'Embedded Systems', 'Solar Power', 'Sensors'],
    accent: 'text-vibrant-blue',
    bgAccent: 'bg-blue-500/20',
    borderAccent: 'hover:border-vibrant-blue/50',
  },
  {
    title: 'Kllinic Hyperlocal Healthcare Platform',
    description: 'Web-based healthcare ecosystem connecting patients, clinics, and pharmacies in a single platform. The system enables appointment booking, medicine ordering, health record tracking, and community support with secure role-based dashboards.',
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'AI (Vision-Language Model)'],
    accent: 'text-neon-pink',
    bgAccent: 'bg-pink-500/20',
    borderAccent: 'hover:border-neon-pink/50',
  },
  {
    title: 'NETRA  Networked Electronic Traffic & Rescue Assistant',
    description: 'AI-enabled smart traffic monitoring and safety system where connected junction nodes detect congestion, accidents, and emergency vehicles, automatically adjust signals, and send alerts to a central control room for faster response and coordinated traffic management.',
    tags: ['Python', 'Computer Vision (YOLO/OpenCV)', 'Edge Computing', 'AI-based Detection'],
    accent: 'text-neon-orange',
    bgAccent: 'bg-orange-500/20',
    borderAccent: 'hover:border-neon-orange/50',
  },
  {
    title: 'LocalHost AI Exam Platform',
    description: 'Next-generation educational platform for GATE CSE students, featuring dynamically generated AI question papers and strict server-side proctoring using computer vision and browser-lock mechanisms.',
    tags: ['Python', 'FastAPI', 'HTMX', 'PostgreSQL', 'OpenCV', 'Tailwind CSS'],
    accent: 'text-neon-green',
    bgAccent: 'bg-green-500/20',
    borderAccent: 'hover:border-neon-green/50',
  },
  {
    title: 'Design System Component Library',
    description: 'Comprehensive reusable component library with documentation, accessibility features, and design tokens.',
    tags: ['React', 'TypeScript', 'Storybook', 'Figma'],
    accent: 'text-vibrant-purple',
    bgAccent: 'bg-purple-500/20',
    borderAccent: 'hover:border-vibrant-purple/50',
  },
  {
    title: 'Event Management Portal',
    description: 'Web-based platform designed to efficiently manage and coordinate large-scale tech festivals. The system handles event registrations, team participation, QR-based entry and food distribution, real-time event tracking, and automated digital certificate generation, while providing administrators with live analytics and scheduling tools.',
    tags: ['React.js', 'FastAPI', 'Django', 'QR Systems'],
    accent: 'text-neon-cyan',
    bgAccent: 'bg-cyan-500/20',
    borderAccent: 'hover:border-accent/50',
  },
]

export function Projects() {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-16 fade-in">
          <h2 className="section-heading text-balance">Featured Projects</h2>
          <p className="text-lg text-foreground/70 text-balance max-w-2xl">
            A selection of projects showcasing AI engineering, IoT systems, and digital design solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group glass-dark rounded-xl p-6 border border-white/10 ${project.borderAccent} transition-all duration-300 hover-lift flex flex-col glow-pulse`}
              style={{
                animation: `slide-in-from-bottom 0.8s ease-out ${0.8 + (index % 3) * 0.15}s both`,
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className={`text-lg font-bold text-foreground group-hover:${project.accent} transition-colors flex-1`}>
                  {project.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground/70 mb-6 flex-1 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-3 py-1 ${project.bgAccent} ${project.accent} rounded-full border transition-colors duration-300`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button suppressHydrationWarning className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium ${project.accent} hover:${project.bgAccent} rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group`}>
                  <Github size={16} className="group-hover:rotate-12 transition-transform" />
                  Code
                </button>
                <button suppressHydrationWarning className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Demo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
