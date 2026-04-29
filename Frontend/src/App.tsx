import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { Projects } from './components/Projects/Projects';
import { Contact } from './components/Contact/Contact';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer style={{ textAlign: 'center', padding: '2rem 0', marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.1)', color: '#a0aec0', backgroundColor: '#000' }}>
        <p>Victor Hugo - Todos os Direitos Reservados</p>
      </footer>
    </LanguageProvider>
  );
}

export default App;
