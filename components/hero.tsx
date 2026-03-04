'use client'

import { ArrowRight, Github } from 'lucide-react'

// Icon placeholders — replace the contents of each <svg> with the exact logo SVG you want.
// Instructions:
// 1. Find the official SVG (or a vector version) for the logo you want.
// 2. Paste the <path> / <g> elements inside the <svg> below, replacing the placeholder shapes.
// 3. Keep the outer <svg> attributes (className, viewBox, role, aria-label) for sizing and accessibility.

const PythonIcon = () => (
  // Using image from `public` folder. If you move files into `public/images/` update the path.
  <img
    src="/Python.jpg"
    alt="Python"
    className="w-12 h-12 object-contain"
    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder-logo.png' }}
  />
)

const FastAPIIcon = () => (
  <img
    src="/FastApi.jpeg"
    alt="FastAPI"
    className="w-12 h-12 object-contain"
    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder-logo.png' }}
  />
)

const RaspberryPiIcon = () => (
  <img
    src="/Raspberry_Pi.png"
    alt="Raspberry Pi"
    className="w-12 h-12 object-contain"
    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder-logo.png' }}
  />
)

const ArduinoIcon = () => (
  <img
    src="/Arduino.png"
    alt="Arduino"
    className="w-12 h-12 object-contain"
    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder-logo.png' }}
  />
)

const MLIcon = () => (
  <img
    src="/ML.jpg"
    alt="Machine Learning"
    className="w-12 h-12 object-contain"
    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder-logo.png' }}
  />
)

const FigmaIcon = () => (
  <img
    src="/Figma.jpg"
    alt="Figma"
    className="w-12 h-12 object-contain"
    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder-logo.png' }}
  />
)

const NextJSIcon = () => (
  <img
    src="/Nextjs.png"
    alt="Next.js"
    className="w-12 h-12 object-contain"
    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder-logo.png' }}
  />
)

const techStack = [
  { name: 'Python', Icon: PythonIcon },
  { name: 'FastAPI', Icon: FastAPIIcon },
  { name: 'Raspberry Pi', Icon: RaspberryPiIcon },
  { name: 'Arduino', Icon: ArduinoIcon },
  { name: 'Machine Learning', Icon: MLIcon },
  { name: 'Figma', Icon: FigmaIcon },
  { name: 'Next.js', Icon: NextJSIcon },
]

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl pointer-events-none" />
      
      {/* Animated floating background elements */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl opacity-30 blob-animate pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl opacity-30 blob-animate pointer-events-none" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-neon-pink/10 rounded-full blur-3xl opacity-25 blob-animate pointer-events-none" style={{ animationDelay: '-1.5s' }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 fade-in-left">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
                Building Intelligent{' '}
                <span className="text-primary">Systems</span> that Connect{' '}
                <span className="text-primary">AI, Hardware</span>
                <br />
                <span className="text-accent">&</span>{' '}
                <span className="text-accent">Design</span>
              </h1>
              <p className="text-lg text-foreground/70 text-balance leading-relaxed">
                I specialize in creating scalable AI systems, embedded IoT solutions, and human-centered digital experiences. Combining engineering rigor with design thinking to solve complex problems.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#projects"
                className="group flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:gap-3 hover:scale-105"
              >
                Explore My Work
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://github.com/Suro026"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-8 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/20 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30"
              >
                <Github size={20} />
                View GitHub
              </a>
            </div>
          </div>

          {/* Right - Tech Stack Grid */}
          <div className="grid grid-cols-2 gap-4 fade-in-right">
            {techStack.map(({ name, Icon }, index) => {
              const colors = [
                { text: 'text-accent', border: 'border-accent', glow: 'mcu-blue-glow' },
                { text: 'text-accent', border: 'border-accent', glow: 'mcu-blue-glow' },
                { text: 'text-primary', border: 'border-primary', glow: 'mcu-red-glow' },
                { text: 'text-primary', border: 'border-primary', glow: 'mcu-red-glow' },
                { text: 'text-accent', border: 'border-accent', glow: 'mcu-blue-glow' },
                { text: 'text-accent', border: 'border-accent', glow: 'mcu-blue-glow' },
                { text: 'text-primary', border: 'border-primary', glow: 'mcu-red-glow' },
              ]
              const color = colors[index % colors.length]
              return (
                <div
                  key={name}
                  className={`group glass-dark rounded-xl p-6 flex flex-col items-center justify-center text-center hover-lift cursor-default border-2 ${color.border} ${color.glow} transition-all duration-300 hover:scale-110 hover:shadow-2xl`}
                  style={{
                    animation: `slide-in-from-bottom 0.8s ease-out ${index * 0.12}s both`,
                  }}
                >
                  <div className={`${color.text} group-hover:scale-125 transition-transform duration-300 group-hover:wiggle mb-3`}>
                    <Icon />
                  </div>
                  <p className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">{name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
