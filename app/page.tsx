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
    <main className='bg-black text-text'>
      <Header />
      <TracingBeam className="px-6">
        <section id="home" className="pt-20">
          <HeroSection />
          <TextAnimation />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="solutions">
          <Features />
          <Services />
          <ProjectsShowcase />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </TracingBeam>
      <Footer />
    </main>
  )
}