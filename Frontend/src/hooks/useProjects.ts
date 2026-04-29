import { useState, useEffect } from 'react';
import type { DBProject } from '../types';

interface UseProjectsReturn {
  projects: DBProject[];
  loading: boolean;
  error: string | null;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<DBProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProjects() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API retornou status ${response.status}`);
        }

        const data: DBProject[] = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();

    return () => controller.abort();
  }, []);

  return { projects, loading, error };
}
