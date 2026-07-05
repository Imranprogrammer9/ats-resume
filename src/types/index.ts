export interface RiskFactor {
  id: string;
  label: string;
  icon: string;
  weight: number;
  color: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  label: string;
  score: number;
}

export interface FactorScore extends RiskFactor {
  raw: number;
  weighted: number;
}

export interface RiskLevel {
  key: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  label: string;
  color: string;
  bg: string;
  border: string;
  summary: string;
  steps: string[];
}

export interface EmployeeInfo {
  name: string;
  department: string;
  role: string;
  manager: string;
}

export interface AssessorInfo {
  name: string;
  contact: string;
  contactType: 'email' | 'linkedin';
}

export type AssessmentAnswers = Record<string, Record<string, number>>;

export type AssessmentStep = 'emp-info' | 'factor' | 'result';

export interface Service {
  id: string;
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  quote: string;
  rating: number;
  initials: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
  author: string;
  featured: boolean;
  tags: string[];
}

export interface Stat {
  value: string;
  suffix?: string;
  label: string;
  description: string;
}

export interface Industry {
  id: string;
  icon: string;
  name: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  challenge: string;
  result: string;
  metric: string;
  metricLabel: string;
}
