import api from './api';

export const getQuestions = (type, jobId) => api.get('/assessments/questions', { params: { type, jobId } });
export const addQuestionByAdmin = (questionData) => api.post('/assessments/questions', questionData);
export const submitAssessment = (data) => api.post('/assessments/submit', data);
export const getAssessmentResult = (id) => api.get(`/assessments/results/${id}`);
