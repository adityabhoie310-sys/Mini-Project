import api from './api';

export const getProgress = () => api.get('/progress');
export const getWeeklyReport = () => api.get('/progress/weekly-report');
