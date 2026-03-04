'use client'

import { Mail, MapPin, Github, Linkedin, Send, Phone } from 'lucide-react'
import { useState } from 'react'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 blur-3xl rounded-full -z-10" />

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-16 fade-in">
          <h2 className="section-heading text-balance">Let's Connect</h2>
          <p className="text-lg text-foreground/70 text-balance">
            Have a project in mind? Let's discuss how AI, IoT, and design can solve your challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-dark rounded-xl p-8 border border-white/10 fade-in-left glow-pulse" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  suppressHydrationWarning
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="glass-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  suppressHydrationWarning
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="glass-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  suppressHydrationWarning
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="glass-input w-full resize-none h-32"
                  required
                />
              </div>

              <button
                suppressHydrationWarning
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 group"
              >
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Email */}
            <div onClick={() => window.location.href = 'mailto:surajitsadhukhan870@gmail.com'} className="glass-dark rounded-2xl p-8 border border-white/10 border-neon-pink hover-lift transition-all duration-300 cursor-pointer fade-in-right glow-pink" style={{ animationDelay: '0.35s' }}>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-pink-500/25 flex items-center justify-center flex-shrink-0 scale-in" style={{ animationDelay: '0.4s' }}>
                  <Mail size={28} className="text-neon-pink" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">Email</p>
                  <p className="font-bold text-foreground text-xl break-all">surajitsadhukhan870@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="glass-dark rounded-2xl p-8 border border-white/10 border-neon-orange hover-lift glow-orange fade-in-right transition-all duration-300" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-orange-500/25 flex items-center justify-center flex-shrink-0 scale-in" style={{ animationDelay: '0.55s' }}>
                  <MapPin size={28} className="text-neon-orange" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">Location</p>
                  <p className="font-bold text-foreground text-xl">Kolkata, India</p>
                  <p className="text-sm text-foreground/60 mt-2 leading-relaxed">32/H/10 Mahendra Roy Lane</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div onClick={() => window.location.href = 'tel:8240868567'} className="glass-dark rounded-2xl p-8 border border-white/10 border-accent hover-lift transition-all duration-300 cursor-pointer fade-in-right glow-accent" style={{ animationDelay: '0.65s' }}>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-accent/25 flex items-center justify-center flex-shrink-0 scale-in" style={{ animationDelay: '0.7s' }}>
                  <Phone size={28} className="text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">Phone</p>
                  <p className="font-bold text-foreground text-xl">+91 8240868567</p>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="glass-dark rounded-2xl p-8 border border-white/10 border-vibrant-blue glow-blue fade-in-right" style={{ animationDelay: '0.8s' }}>
              <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-4">Connect on Social</p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Suro026"
                  target="_blank"
                  rel="noopener noreferrer"
                  suppressHydrationWarning
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-500/10 border border-vibrant-blue/30 hover:border-vibrant-blue/60 hover:bg-blue-500/20 transition-all duration-300"
                >
                  <Github size={20} className="text-vibrant-blue" />
                  <span className="text-sm font-medium text-vibrant-blue">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/surajit-sadhukhan-4b5b62324/"
                  target="_blank"
                  rel="noopener noreferrer"
                  suppressHydrationWarning
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-pink-500/10 border border-neon-pink/30 hover:border-neon-pink/60 hover:bg-pink-500/20 transition-all duration-300"
                >
                  <Linkedin size={20} className="text-neon-pink" />
                  <span className="text-sm font-medium text-neon-pink">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
