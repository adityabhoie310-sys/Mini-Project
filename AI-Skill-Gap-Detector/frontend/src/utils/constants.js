// Use the local API while developing, and the same deployed domain in production.
// Keeping this relative means preview and production deployments work without
// hard-coded URLs or browser CORS errors.
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
export const AI_SERVICE_URL = import.meta.env.VITE_AI_SERVICE_URL || 'http://127.0.0.1:8001';

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
