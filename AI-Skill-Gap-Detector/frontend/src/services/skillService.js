import api from './api';

export const getSkills = () => api.get('/skills');
export const getSkillGapAnalysis = (jobId) => api.get(/skills/gap/);
