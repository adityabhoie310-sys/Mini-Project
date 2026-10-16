import api from './api';

export const getSkills = () => api.get('/skills');
export const getSkillGapAnalysis = (jobId, scores) => {
  const url = jobId ? `/skills/gap/${jobId}` : '/skills/gap';
  return scores ? api.post(url, { scores }) : api.get(url);
};
