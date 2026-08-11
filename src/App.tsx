import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'

export default function App() {
  return (
    <>
      <Preloader />
      <Cursor />
      <div className="min-h-screen bg-[#050510] text-white antialiased">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <footer className="py-8 text-center text-xs text-gray-600 border-t border-white/5">
          © {new Date().getFullYear()} Derrick Ndiga. Full-Stack Developer · Automation Engineer · Python Developer.
        </footer>
      </div>
    </>
  )
}
