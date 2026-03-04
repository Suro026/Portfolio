'use client'

import { Upload, Zap, MessageSquare } from 'lucide-react'

const aiFeatures = [
  {
    id: 'resume',
    title: 'AI Resume Analyzer',
    description: 'Upload and analyze resumes with AI-powered insights',
    icon: Upload,
    color: 'text-accent',
    bgGlow: 'bg-accent/20',
    borderColor: 'hover:border-accent/50',
  },
  {
    id: 'prediction',
    title: 'ML Prediction Demo',
    description: 'Test machine learning models with real-time predictions',
    icon: Zap,
    color: 'text-primary',
    bgGlow: 'bg-primary/20',
    borderColor: 'hover:border-primary/50',
  },
  {
    id: 'chat',
    title: 'AI Chat Assistant',
    description: 'Intelligent conversation powered by advanced LLMs',
    icon: MessageSquare,
    color: 'text-accent',
    bgGlow: 'bg-accent/20',
    borderColor: 'hover:border-accent/50',
  },
]

export function AILab() {
  return (
    <section id="ai-lab" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-16 fade-in">
          <h2 className="section-heading text-balance">AI Engineering & Intelligent Systems</h2>
          <p className="text-lg text-foreground/70 text-balance max-w-2xl">
            Explore interactive AI demonstrations showcasing machine learning models, natural language processing, and intelligent automation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.id}
                className={`group glass-dark rounded-xl p-8 space-y-6 hover-lift transition-all duration-300 border border-white/10 ${feature.borderColor} glow-pulse hover:scale-105`}
                style={{
                  animation: `slide-in-from-bottom 0.8s ease-out ${0.25 + index * 0.15}s both`,
                }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg ${feature.bgGlow} flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-300 spin-slow`}>
                  <Icon className={`${feature.color} w-6 h-6 group-hover:wiggle`} />
                </div>

                {/* Title and Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{feature.description}</p>
                </div>

                {/* Mock UI Content */}
                <div className="space-y-4 pt-4">
                  {feature.id === 'resume' && (
                    <div className="space-y-3">
                      <div className="w-full h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                        <span className="text-xs text-foreground/50">Upload area</span>
                      </div>
                      <div className="w-full h-20 bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="h-1 bg-white/20 rounded mb-2" />
                        <div className="h-1 bg-white/20 rounded w-5/6" />
                      </div>
                    </div>
                  )}

                  {feature.id === 'prediction' && (
                    <div className="space-y-3">
                      <input
                        suppressHydrationWarning
                        type="text"
                        placeholder="Input value"
                        className="glass-input w-full"
                        disabled
                      />
                      <button className="w-full px-4 py-2 bg-accent/20 text-accent rounded-lg font-medium hover:bg-accent/30 transition-colors duration-300 disabled:opacity-50" disabled>
                        Predict
                      </button>
                      <div className="w-full h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-primary">Result: 0.92</span>
                      </div>
                    </div>
                  )}

                  {feature.id === 'chat' && (
                    <div className="space-y-3 bg-black/20 rounded-lg p-3 h-32 flex flex-col">
                      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
                        <div className="text-xs text-foreground/50 bg-white/5 rounded px-2 py-1 w-fit">
                          Hello! How can I help?
                        </div>
                      </div>
                      <input
                        suppressHydrationWarning
                        type="text"
                        placeholder="Type a message..."
                        className="glass-input text-xs"
                        disabled
                      />
                    </div>
                  )}
                </div>

                {/* CTA */}
                <button suppressHydrationWarning className="w-full py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-all duration-300 group-hover:border-primary/60">
                  Explore
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
