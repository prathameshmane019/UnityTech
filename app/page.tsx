// app/page.tsx
import Header from './components/Header'
import { HeroSection } from './components/HeroSecion'
import Footer from './components/Footer'
import ProjectsShowcase from './components/ProjectShowcase'
import Services from './components/Services'
import About from './components/About'
import Features from './components/Features'
import TextAnimation from './components/TextAnimation'
import { TracingBeam } from './components/ui/Tracing-beam'
import Contact from './components/Contact'

export default function Home() {
  return (
    <main className='bg-background text-text'>
      <TracingBeam className="px-6">
      <Header />
      <HeroSection />
      <TextAnimation />
      <Features />
      <About />
      
      <Services />
      <ProjectsShowcase />
      
      <Contact/>
      <Footer />
      </TracingBeam>
    </main>
  )
}