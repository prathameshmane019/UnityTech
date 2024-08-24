import Header from './components/Header'
import { HeroSection } from './components/HeroSecion'
import Footer from './components/Footer'
// import Team from './components/Team'
import { FcStatistics } from 'react-icons/fc'
import ProjectsShowcase from './components/ProjectShowcase'
import Services from './components/Services'
import About from './components/About'
import Features from './components/Features'
export default function Home() {
  return (
    <main className='mx-10'>
      <Header />
      {/* <Hero /> */}
      <HeroSection />
      <Features />
      <About />
      <Services />
      <ProjectsShowcase />
      <FcStatistics />
      {/* <Team /> */}
    
      {/* <Contact /> */}
      <Footer />
      
    </main>

    )
}