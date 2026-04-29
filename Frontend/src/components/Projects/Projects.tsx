import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useGitHubRepos } from '../../hooks/useGitHubRepos';
import { useTranslation } from '../../contexts/LanguageContext';
import './Projects.css';

// Language color mapping
const languageColors: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Go: '#00ADD8',
  Rust: '#dea584',
  SQL: '#e38c00',
};

export function Projects() {
  const { t } = useTranslation();
  const { repos, loading, error } = useGitHubRepos();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section className="projects section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className={`section-header reveal ${isVisible ? 'revealed' : ''}`}>
          <h2 className="section-title">{t('projects', 'title')}</h2>
          <p className="section-subtitle">
          </p>
        </div>

        {loading && (
          <div className="projects__loading">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="projects__skeleton glass-card">
                <div className="projects__skeleton-line projects__skeleton-line--title" />
                <div className="projects__skeleton-line projects__skeleton-line--text" />
                <div className="projects__skeleton-line projects__skeleton-line--text projects__skeleton-line--short" />
                <div className="projects__skeleton-footer">
                  <div className="projects__skeleton-line projects__skeleton-line--tag" />
                  <div className="projects__skeleton-line projects__skeleton-line--tag" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="projects__error glass-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="projects__empty glass-card">
            <p>{t('projects', 'empty')}</p>
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          <div className="projects__grid">
            {repos.slice(0, 6).map((repo, index) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`projects__card glass-card reveal ${isVisible ? 'revealed' : ''}`}
                style={{ transitionDelay: `${0.1 + index * 0.08}s` }}
                id={`project-${repo.name}`}
              >
                <div className="projects__card-header">
                  <svg className="projects__card-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                  <div className="projects__card-links">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </div>
                </div>

                <h3 className="projects__card-title">{repo.name}</h3>
                <p className="projects__card-description">
                  {repo.description || t('projects', 'noDesc')}
                </p>

                <div className="projects__card-footer">
                  <div className="projects__card-meta">
                    {repo.language && (
                      <span className="projects__card-language">
                        <span
                          className="projects__card-language-dot"
                          style={{ background: languageColors[repo.language] || '#888' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="projects__card-stars">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="projects__card-forks">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="18" r="3" />
                          <circle cx="6" cy="6" r="3" />
                          <circle cx="18" cy="6" r="3" />
                          <path d="M18 9a9 9 0 0 1-9 9" />
                          <path d="M6 9a9 9 0 0 0 9 9" />
                        </svg>
                        {repo.forks_count}
                      </span>
                    )}
                  </div>

                  {repo.topics.length > 0 && (
                    <div className="projects__card-topics">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span key={topic} className="projects__card-topic">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}

        {!loading && !error && repos.length > 6 && (
          <div className="projects__more">
            <a
              href="https://github.com/Vitinzkx7?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              {t('projects', 'moreBtn')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
