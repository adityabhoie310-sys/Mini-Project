export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const AI_SERVICE_URL = import.meta.env.VITE_AI_SERVICE_URL || 'http://localhost:8000';

export const ASSESSMENT_TYPES = {
  TECHNICAL: 'technical',
  REASONING: 'reasoning',
  APTITUDE: 'aptitude'
};

export const PRIORITY_LEVELS = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
};

export const ROLES = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Scientist',
  'Machine Learning Engineer',
  'DevOps Engineer',
  'Cloud Solutions Architect'
];
