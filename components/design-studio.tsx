'use client'

import { Palette, Layout, Type } from 'lucide-react'

const designProjects = [
  {
    title: 'E-Commerce Dashboard',
    category: 'Product Design',
    icon: Layout,
  },
  {
    title: 'Mobile App Flow',
    category: 'UX/UI Design',
    icon: Layout,
    link: 'https://www.figma.com/design/kXH2hbrWt2j9ktnhXY1Hd4/Untitled?node-id=0-1&t=w4NEfwrfUSEuimbr-0',
  },
  {
    title: 'Design System V2',
    category: 'Design System',
    icon: Palette,
  },
]

const colorPalette = [
  { name: 'Gold', color: '#C9A961', code: '#C9A961' },
  { name: 'MCU Blue', color: '#4A7BA7', code: '#4A7BA7' },
  { name: 'MCU Red', color: '#D32F2F', code: '#D32F2F' },
  { name: 'Steel Gray', color: '#546E7A', code: '#546E7A' },
  { name: 'Deep Navy', color: '#0F1A2A', code: '#0F1A2A' },
  { name: 'Accent Gold', color: '#F9A825', code: '#F9A825' },
]

export function DesignStudio() {
  return (
    <section id="design" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-16 fade-in">
          <h2 className="section-heading text-balance">Human-Centered Digital Design</h2>
          <p className="text-lg text-foreground/70 text-balance max-w-2xl">
            Creating thoughtful interfaces that balance aesthetics with functionality, accessibility with innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {designProjects.map((project, index) => {
            const Icon = project.icon
            const gradients = [
              'from-vibrant-blue to-neon-cyan',
              'from-neon-pink to-neon-orange',
              'from-vibrant-purple to-neon-pink',
            ]
            return (
              <div
                key={project.title}
                className="group glass-dark rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover-lift cursor-pointer glow-pulse hover:scale-105"
                style={{
                  animation: `slide-in-from-bottom 0.8s ease-out ${0.55 + index * 0.15}s both`,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                {/* Image Placeholder */}
                <div className={`w-full h-48 bg-gradient-to-br ${gradients[index]} flex items-center justify-center opacity-70 group-hover:opacity-85 transition-all duration-300 blob-animate`}>
                  <Icon className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-all wiggle" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <span className="text-xs font-medium text-accent">{project.category}</span>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
                    >
                      View Case Study →
                    </a>
                  ) : (
                    <button suppressHydrationWarning className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
                      View Case Study →
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Design System Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Color Palette */}
          <div className="glass-dark rounded-xl p-8 border border-white/10 space-y-6 fade-in-left" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Palette size={24} className="text-accent animate-pulse" />
              Color Palette
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {colorPalette.map((color, idx) => (
                <div 
                  key={color.name} 
                  className="space-y-2 scale-in"
                  style={{ animationDelay: `${0.7 + idx * 0.1}s` }}
                >
                  <div
                    className="w-full h-20 rounded-lg border border-white/10 shadow-lg group-hover:shadow-2xl transition-shadow cursor-pointer hover:scale-110 transform transition-all duration-300 border-glow"
                    style={{ backgroundColor: color.color }}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{color.name}</p>
                    <p className="text-xs text-foreground/50 font-mono">{color.code}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="glass-dark rounded-xl p-8 border border-white/10 space-y-6 fade-in-right" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Type size={24} className="text-accent animate-pulse" />
              Typography System
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-xs text-foreground/60 mb-2">Display</p>
                <p className="text-4xl font-bold text-foreground">Headline</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60 mb-2">Body</p>
                <p className="text-base text-foreground/80 leading-relaxed">
                  Clean, readable typography that ensures accessibility and clarity across all devices and contexts.
                </p>
              </div>
              <div>
                <p className="text-xs text-foreground/60 mb-2">Caption</p>
                <p className="text-xs text-foreground/50">Supporting text with reduced emphasis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Microinteractions */}
        <div className="mt-12 glass-dark rounded-xl p-8 border border-white/10 fade-in" style={{ animationDelay: '0.7s' }}>
          <h3 className="text-xl font-bold text-foreground mb-8">Microinteractions & Motion</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Hover Effect', animation: 'hover-lift' },
              { label: 'Fade In', animation: 'fade-in' },
              { label: 'Smooth Scroll', animation: 'scroll-smooth' },
            ].map((item, idx) => (
              <div 
                key={item.label} 
                className="text-center p-6 bg-white/5 rounded-lg border border-white/10 scale-in"
                style={{ animationDelay: `${0.8 + idx * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg mx-auto mb-4 hover-lift cursor-pointer pulse-glow" />
                <p className="text-sm font-medium text-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
