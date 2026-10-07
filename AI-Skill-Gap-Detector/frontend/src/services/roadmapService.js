import api from './api';

export const getRoadmap = (jobId) => api.get(/roadmaps/);
export const updateRoadmapProgress = (itemId, status) => api.patch(/roadmaps/item/, { status });
