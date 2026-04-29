import { useState, useEffect } from 'react';
import type { DBSkill } from '../types';

interface UseSkillsReturn {
  skills: DBSkill[];
  loading: boolean;
  error: string | null;
}

export function useSkills(): UseSkillsReturn {
  const [skills, setSkills] = useState<DBSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSkills() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills`, {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API retornou status ${response.status}`);
        }

        const data: DBSkill[] = await response.json();
        setSkills(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();

    return () => controller.abort();
  }, []);

  return { skills, loading, error };
}
