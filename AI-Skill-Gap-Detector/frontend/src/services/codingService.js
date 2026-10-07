import api from './api';

export const getCodingProblems = () => api.get('/coding/problems');
export const submitCode = (data) => api.post('/coding/run', data);
