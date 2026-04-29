import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTranslation } from '../../contexts/LanguageContext';
import './About.css';

export function About() {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const stats: Array<{ label: string; value: string }> = [];

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        <div className={`section-header reveal ${isVisible ? 'revealed' : ''}`}>
          <h2 className="section-title">{t('about', 'title')}</h2>
          <p className="section-subtitle">
            {t('about', 'subtitle')}
          </p>
        </div>

        <div className="about__grid">
          <div className={`about__content reveal-left ${isVisible ? 'revealed' : ''}`}>
            <div className="about__text">
              <p dangerouslySetInnerHTML={{ __html: t('about', 'p1') }} />
              <p dangerouslySetInnerHTML={{ __html: t('about', 'p2') }} />
              <p dangerouslySetInnerHTML={{ __html: t('about', 'p3') }} />
            </div>

            {stats.length > 0 && (
              <div className="about__stats">
                {stats.map((stat, i) => (
                  <div key={stat.label} className={`about__stat reveal-delay-${i + 1}`}>
                    <span className="about__stat-value gradient-text">{stat.value}</span>
                    <span className="about__stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={`about__image-wrapper reveal-right ${isVisible ? 'revealed' : ''}`}>
            <div className="about__image-frame">
              {/* Fallback space for image: Replace /profile.jpg with your actual photo path */}
              <img 
                src="/profile.jpg" 
                alt="Profile photo of Victor Hugo" 
                className="about__image" 
                onError={(e) => {
                  // Fallback visually if image doesn't exist yet
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.classList.add('about__image-placeholder');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
