export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

export interface Skill {
  name: string;
  icon: string;
  color: string;
  id?: string;
}

export interface DBSkill {
  id: number;
  name: string;
  category: string;
  proficiencyLevel: number;
  iconSvg: string;
}

export interface DBProject {
  id: number;
  name: string;
  description: string;
  repositoryUrl: string;
  liveDemoUrl: string;
  imageUrl: string;
  createdAt: string;
  skills: DBSkill[];
}
