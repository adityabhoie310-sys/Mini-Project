import api from './api';

export const getResources = (skill) => api.get('/resources', { params: { skill } });
