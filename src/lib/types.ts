export type Profile = {
  name: string;
  role: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  /** Número con indicativo de país, solo dígitos (ej. 573001234567) */
  whatsapp: string;
  github: string;
  linkedin: string;
  instagram: string;
  avatar: string;
  available: boolean;
};

export type Job = {
  id: string;
  company: string;
  role: string;
  type: string;
  location: string;
  /** Formato YYYY-MM */
  start: string;
  /** Formato YYYY-MM, null si es el trabajo actual */
  end: string | null;
  summary: string;
  achievements: string[];
  stack: string[];
};

export type Project = {
  id: string;
  name: string;
  kind: string;
  description: string;
  highlights: string[];
  stack: string[];
  repo: string;
  url: string;
  image: string;
};

export type SkillGroup = {
  id: string;
  group: string;
  items: string[];
};

export type Portfolio = {
  profile: Profile;
  experience: Job[];
  projects: Project[];
  skills: SkillGroup[];
};

export type Section = "experience" | "projects" | "skills";
