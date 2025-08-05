export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'design';
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
}
