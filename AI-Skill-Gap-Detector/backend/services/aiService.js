const axios = require('axios');

const evaluateAnswer = async (payload) => {
  const url = process.env.AI_SERVICE_URL || 'http://localhost:8000';
  return axios.post(`${url}/evaluate`, payload);
};

module.exports = { evaluateAnswer };
