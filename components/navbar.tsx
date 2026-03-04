'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Download } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'AI Lab', href: '#ai-lab' },
    { label: 'IoT Systems', href: '#iot' },
    { label: 'Design Studio', href: '#design' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed w-full top-0 z-50 glass-dark border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="text-2xl font-bold gradient-text">
          Surajit Sadhukhan
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/80 hover:text-accent transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Replace the href value with your Google Drive (or other) resume link. Make sure the file is shared "Anyone with the link" */}
          <a
            href="https://drive.google.com/file/d/1tUxxah4u2OEAuzNX77bHi0MLBPWghmP-/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
          >
            <Download size={18} />
            <span className="text-sm font-medium">Resume</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/80 backdrop-blur-md border-t border-white/10">
          <div className="flex flex-col gap-4 px-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/80 hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {/* Mobile resume link - replace the href with your shared Drive URL */}
            <a
              href="https://drive.google.com/your-resume-link"
              target="_blank"
              rel="noopener noreferrer"
              suppressHydrationWarning
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 w-full justify-center"
            >
              <Download size={18} />
              <span className="text-sm font-medium">Resume</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
