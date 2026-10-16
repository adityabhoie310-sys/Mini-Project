const {
  getAiHealth,
  getAiJobs,
  analyzeSkillGap,
  getTestSkillGap
} = require('../services/aiService');

exports.getHealth = async (req, res, next) => {
  try {
    res.json(await getAiHealth());
  } catch (error) {
    next(error);
  }
};

exports.getJobs = async (req, res, next) => {
  try {
    res.json(await getAiJobs());
  } catch (error) {
    next(error);
  }
};

exports.analyzeGap = async (req, res, next) => {
  try {
    res.json(await analyzeSkillGap(req.body));
  } catch (error) {
    next(error);
  }
};

exports.getTestSkillGap = async (req, res, next) => {
  try {
    res.json(await getTestSkillGap());
  } catch (error) {
    next(error);
  }
};
