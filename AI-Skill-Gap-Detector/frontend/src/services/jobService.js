
import api from './api';

export const getJobs = () => api.get('/jobs');

export const getJobById = (id) => api.get(`/jobs/${id}`);
