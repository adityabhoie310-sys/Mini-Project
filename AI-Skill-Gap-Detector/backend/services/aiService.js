const axios = require('axios');

const AI_SERVICE_URL = (process.env.AI_SERVICE_URL || 'http://127.0.0.1:8001').replace(/\/$/, '');

const aiClient = axios.create({
  baseURL: AI_SERVICE_URL,
  timeout: 5000
});

const forwardError = (error) => {
  if (error.response) {
    const forwarded = new Error(
      error.response.data?.detail || 'The AI service rejected the request.'
    );
    forwarded.statusCode = error.response.status;
    forwarded.details = error.response.data;
    throw forwarded;
  }

  const unavailable = new Error('The AI service is unavailable. Start it on the configured AI_SERVICE_URL and try again.');
  unavailable.statusCode = 503;
  throw unavailable;
};

const getAiHealth = async () => {
  try {
    const response = await aiClient.get('/health');
    return response.data;
  } catch (error) {
    return forwardError(error);
  }
};

const getAiJobs = async () => {
  try {
    const response = await aiClient.get('/jobs');
    return response.data;
  } catch (error) {
    return forwardError(error);
  }
};

const analyzeSkillGap = async (payload) => {
  try {
    const response = await aiClient.post('/analyze-gap', payload);
    return response.data;
  } catch (error) {
    return forwardError(error);
  }
};

const getTestSkillGap = async () => {
  try {
    const response = await aiClient.get('/test-skill-gap');
    return response.data;
  } catch (error) {
    return forwardError(error);
  }
};

const evaluateAnswer = async (payload) => {
  try {
    const res = await axios.post(`${AI_SERVICE_URL}/evaluate`, payload, { timeout: 3000 });
    return res.data;
  } catch (err) {
    // Fallback if AI Python service is offline
    return {
      status: 'fallback',
      role: payload.role,
      readiness: 72,
      recommendations: ['Practice advanced asynchronous patterns', 'Strengthen system design concepts']
    };
  }
};

const analyzeLiveSkillGap = async (role, assessmentScores, targetSkills) => {
  try {
    const res = await axios.post(`${AI_SERVICE_URL}/analyze-skill-gap`, {
      role,
      assessmentScores,
      targetSkills
    }, { timeout: 3000 });
    return res.data;
  } catch (err) {
    // Fallback logic
    const avg = Object.values(assessmentScores).reduce((a, b) => a + b, 0) / Math.max(Object.values(assessmentScores).length, 1);
    return {
      role,
      readinessScore: Math.round(avg || 70),
      skillGaps: targetSkills.map(skill => ({
        skill,
        current: assessmentScores[skill] || 50,
        required: 85,
        gap: 35,
        priority: 'High'
      })),
      aiSummary: 'Evaluation calculated using local fallback engine.'
    };
  }
};

module.exports = {
  getAiHealth,
  getAiJobs,
  analyzeSkillGap,
  getTestSkillGap,
  evaluateAnswer,
  analyzeLiveSkillGap
};
