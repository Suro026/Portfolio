'use client'

export function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-background border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Section */}
          <div className="space-y-2 text-center md:text-left">
            <p className="text-2xl font-bold gradient-text">Surajit</p>
            <p className="text-sm text-foreground/60">
              AI Engineer • IoT Systems Builder • UX Designer
            </p>
          </div>

          {/* Center Section */}
          <div className="text-center">
            <p className="text-sm text-foreground/60">
              © 2026 Surajit. Designed & built with care.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex gap-4">
            {[
              { label: 'GitHub', href: 'https://github.com/Suro026' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/surajit-sadhukhan-4b5b62324/' },
              { label: 'Email', href: 'mailto:surajitsadhukhan870@gmail.com' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll to Top */}
        <div className="mt-8 pt-8 border-t border-white/10 flex justify-center">
          <button
            onClick={handleScrollToTop}
            className="text-sm text-foreground/60 hover:text-primary transition-colors duration-300"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
