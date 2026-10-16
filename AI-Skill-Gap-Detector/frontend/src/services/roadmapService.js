import api from './api';

export const getRoadmap = (jobId) => api.get(jobId ? `/roadmaps/${jobId}` : '/roadmaps');
export const updateRoadmapProgress = (itemId, status) => api.patch(`/roadmaps/item/${itemId}`, { status });
