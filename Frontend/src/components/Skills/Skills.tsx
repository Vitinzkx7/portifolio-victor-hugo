import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTranslation } from '../../contexts/LanguageContext';
import './Skills.css';

interface Skill {
  name: string;
  icon: string;
  color: string;
  id: string; // use id to map description from translations
}

const skills: Skill[] = [
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    color: '#FFFF00',
    id: 'python',
  },
  {
    name: 'MySQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    color: '#4479A1',
    id: 'mysql',
  },
  {
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    color: '#47A248',
    id: 'mongodb',
  },
  {
    name: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    color: '#2496ED',
    id: 'docker',
  },
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    color: '#F05032',
    id: 'git',
  },
];

export function Skills() {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className={`section-header reveal ${isVisible ? 'revealed' : ''}`}>
          <h2 className="section-title">{t('skills', 'title')}</h2>
          <p className="section-subtitle">
            {t('skills', 'subtitle')}
          </p>
        </div>

        <div className="skills__carousel">
          <div className="skills__carousel-track">
            {skills.concat(skills).map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="skills__card glass-card"
                style={{
                  '--skill-color': skill.color,
                } as React.CSSProperties}
              >
                <div className="skills__card-glow" />
                <div className="skills__card-icon">
                  <img src={skill.icon} alt={`${skill.name} icon`} />
                </div>
                <div className="skills__card-info">
                  <h3 className="skills__card-name">{skill.name}</h3>
                </div>
                <div className="skills__card-line" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
