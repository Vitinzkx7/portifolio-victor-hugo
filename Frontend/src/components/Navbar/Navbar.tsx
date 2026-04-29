import { useState, useEffect } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import './Navbar.css';

const navLinks = [
  { id: 'home', href: '#hero' },
  { id: 'about', href: '#about' },
  { id: 'skills', href: '#skills' },
  { id: 'projects', href: '#projects' },
  { id: 'contact', href: '#contact' },
];

export function Navbar() {
  const { t, language, setLanguage } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map((link) => link.href.replace('#', ''));
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const downloadResume = (lang: 'pt' | 'en') => {
    const isPt = lang === 'pt';
    const resumeUrl = isPt ? '/Curriculo Victor.pdf' : '/Curriculum Victor English.pdf';
    const fileName = isPt ? 'Curriculo Victor.pdf' : 'Curriculum Victor English.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsResumeDropdownOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__container container">
        <a href="#hero" className="navbar__logo" onClick={(e) => handleNavClick(e, '#hero')}>
        </a>

        <div className={`navbar__links ${isMobileMenuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${activeSection === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {t('navbar', link.id)}
            </a>
          ))}
          <button
            className="navbar__theme-btn btn-ghost"
            onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
            aria-label="Toggle language"
            title={language === 'pt' ? "Mudar para Inglês" : "Switch to Portuguese"}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-gray-200)',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              fontSize: '1.2rem',
              width: '36px',
              height: '36px'
            }}
          >
            {language === 'pt' ? (
              <img src="https://flagcdn.com/br.svg" alt="Mudar para Inglês" width="20" height="15" style={{ borderRadius: '2px', objectFit: 'cover' }} />
            ) : (
              <img src="https://flagcdn.com/gb.svg" alt="Switch to Portuguese" width="20" height="15" style={{ borderRadius: '2px', objectFit: 'cover' }} />
            )}
          </button>
          <button
            className="navbar__theme-btn btn-ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-gray-200)',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
            }}
          >
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <div className="navbar__resume-wrapper" style={{ position: 'relative' }}>
            <button
              className="btn btn-primary navbar__resume-btn"
              onClick={() => setIsResumeDropdownOpen(!isResumeDropdownOpen)}
              aria-label={t('navbar', 'resume')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t('navbar', 'resume')}
            </button>
            {isResumeDropdownOpen && (
              <div
                className="navbar__resume-dropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '0.5rem',
                  background: 'var(--color-black)',
                  border: '1px solid var(--color-gray-800)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  minWidth: '200px',
                  zIndex: 100
                }}
              >
                <button
                  onClick={() => downloadResume('pt')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-gray-200)',
                    padding: '0.5rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderRadius: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background 0.2s',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-gray-900)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                >
                  <img src="https://flagcdn.com/br.svg" alt="PT_BR" width="20" height="15" style={{ borderRadius: '2px', objectFit: 'cover' }} />
                  Baixar em PT_BR
                </button>
                <button
                  onClick={() => downloadResume('en')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-gray-200)',
                    padding: '0.5rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderRadius: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background 0.2s',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-gray-900)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                >
                  <img src="https://flagcdn.com/gb.svg" alt="ENG_UK" width="20" height="15" style={{ borderRadius: '2px', objectFit: 'cover' }} />
                  Baixar em ENG_UK
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="navbar__overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </nav>
  );
}
