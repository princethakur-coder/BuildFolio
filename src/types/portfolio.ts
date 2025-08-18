export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  template: TemplateType;
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  sections: Section[];
  theme: 'light' | 'dark';
  isPublished: boolean;
  publishUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  profileImage?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  location: string;
  current: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  gpa?: string;
  description?: string;
}

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  isVisible: boolean;
  order: number;
}

export type TemplateType = 'professional' | 'modern' | 'minimal' | 'creative' | '3d';
export type SectionType = 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'education' | 'contact';