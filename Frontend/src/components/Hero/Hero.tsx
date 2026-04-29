import { useTranslation } from '../../contexts/LanguageContext';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import './Hero.css';

export function Hero() {
  const { t } = useTranslation();

  const typedText = useTypingEffect({
    words: [t('hero', 'typed1'), t('hero', 'typed2'), t('hero', 'typed3'), t('hero', 'typed4')],
    typingSpeed: 80,
    deletingSpeed: 50,
    pauseDuration: 2500,
  });

  return (
    <section className="hero" id="hero">
      {/* Background Effects */}
      <div className="hero__bg">
        <div className="hero__grid"></div>
        <div className="hero__orb hero__orb--1"></div>
        <div className="hero__orb hero__orb--2"></div>
        <div className="hero__orb hero__orb--3"></div>
        <div className="hero__particles">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="hero__particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
            }} />
          ))}
        </div>
      </div>

      <div className="hero__content container">
        <div className="hero__text">
          <div className="hero__greeting">
            <span className="hero__greeting-line"></span>
            <span className="hero__greeting-text">{t('hero', 'greeting')}</span>
          </div>

          <h1 className="hero__name">
            <span className="hero__name-first">Victor</span>
            <span className="hero__name-last gradient-text">Hugo</span>
          </h1>

          <div className="hero__role">
            <span className="hero__role-prefix">&gt;</span>
            <span className="hero__role-text">
              {typedText}
              <span className="hero__cursor">|</span>
            </span>
          </div>

          <p className="hero__description">
            {t('hero', 'description')}
          </p>

          <div className="hero__actions">

          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__code-block">
            <div className="hero__code-header">
              <div className="hero__code-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="hero__code-filename">about.py</span>
            </div>
            <pre className="hero__code-content">
              <code>
                {`class DataEngineer:
    def __init__(self):
        self.name = "Victor Hugo"
        self.role = "Data Engineer"
        self.education = "Computer Science"
        self.skills = [
            "Python", "SQL",
            "Docker", "Git",
            "MongoDB"
        ]
        `}
              </code>
            </pre>
          </div>
        </div>
      </div>


      <span></span>

    </section>
  );
}
