import { Sidebar } from '@/components/portfolio/Sidebar'
import { Hero } from '@/components/portfolio/Hero'
import { About } from '@/components/portfolio/About'
import { Experience } from '@/components/portfolio/Experience'
import { Projects } from '@/components/portfolio/Projects'
import { Skills } from '@/components/portfolio/Skills'
import { Education } from '@/components/portfolio/Education'
import { Footer } from '@/components/portfolio/Footer'

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col lg:flex-row lg:items-start">
      <Sidebar />
      <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-16 lg:py-20">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Footer />
      </main>
    </div>
  )
}
