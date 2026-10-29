import MascotPortfolioHero from '@/components/ui/mascot-portfolio-hero'

const PALETTE = { paper: '#faf6f0', ink: '#1f1512', accent: '#e5553b' }

export function Hero() {
  return (
    <section id="home" className="-mx-6 scroll-mt-20 sm:-mx-10 lg:-mx-16">
      <MascotPortfolioHero
        height="70svh"
        minHeight="560px"
        index="KOL/IN"
        discipline="AI, IoT & Design"
        tagline="Build it real."
        collection={['Selected', 'Projects']}
        reel={['Kolkata, India', 'AI · IoT · Design']}
        year="AI"
        initials="SS"
        badge="Open to work"
        line2="Systems"
        line3="Builder"
        word="Design"
        verticalTag="IOT"
        bracketed="K"
        seekingLabel="Open to*"
        seeking="Internships & Collabs"
        href="#contact"
        services={['Applied AI', 'IoT Prototyping', 'UI/UX Design', 'Full-Stack Dev']}
        greetings={["Hi, I'm Suro!", "Let's build something real.", 'Psst — open to internships.', "Okay, that's enough poking :)"]}
        accent={PALETTE.accent}
        paper={PALETTE.paper}
        ink={PALETTE.ink}
      />
    </section>
  )
}
