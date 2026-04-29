import { useState, useEffect } from 'react';
import type { GitHubRepo } from '../types';

interface UseGitHubReposReturn {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

export function useGitHubRepos(): UseGitHubReposReturn {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const username = 'Vitinzkx7';

    const controller = new AbortController();

    async function fetchRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=30&type=owner`,
          {
            signal: controller.signal,
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API retornou status ${response.status}`);
        }

        const data: GitHubRepo[] = await response.json();
        
        // Filter out forks and sort by stars then by update date
        const filtered = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => {
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          });

        setRepos(filtered);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();

    return () => controller.abort();
  }, []);

  return { repos, loading, error };
}
