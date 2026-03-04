import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { AILab } from '@/components/ai-lab'
import { IotDashboard } from '@/components/iot-dashboard'
import { DesignStudio } from '@/components/design-studio'
import { Projects } from '@/components/projects'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { WelcomeOverlay } from '@/components/welcome-overlay'

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <WelcomeOverlay />
      <Navbar />
      <Hero />
      <AILab />
      <IotDashboard />
      <DesignStudio />
  <Projects />
  <Contact />
      <Footer />
    </main>
  )
}
