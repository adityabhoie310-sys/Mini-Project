const mongoose = require('mongoose');
const Progress = require('../models/Progress');
const memoryProgress = new Map();

const defaults = { roadmapProgress: 0, dailyPlanProgress: 0, questionsSolved: 0, correctAnswers: 0, codingProblemsSolved: 0, projectsCompleted: 0, jobReadinessScore: 0, streak: 0 };
exports.getProgress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (mongoose.connection.readyState === 1 && mongoose.isValidObjectId(userId)) {
      const item = await Progress.findOne({ user: userId }).lean();
      return res.json(item || defaults);
    }
    return res.json(memoryProgress.get(userId) || defaults);
  } catch (error) { next(error); }
};
exports.updateProgress = async (req, res, next) => {
  try {
    const update = {};
    for (const key of Object.keys(defaults)) {
      if (req.body[key] !== undefined) {
        const value = Number(req.body[key]);
        if (!Number.isFinite(value) || value < 0 || value > 10000) return res.status(400).json({ message: `Invalid ${key}.` });
        update[key] = Math.round(value);
      }
    }
    const userId = req.user.id;
    if (mongoose.connection.readyState === 1 && mongoose.isValidObjectId(userId)) {
      const item = await Progress.findOneAndUpdate({ user: userId }, { $set: update }, { new: true, upsert: true, setDefaultsOnInsert: true });
      return res.json(item);
    }
    const item = { ...(memoryProgress.get(userId) || defaults), ...update };
    memoryProgress.set(userId, item);
    return res.json(item);
  } catch (error) { next(error); }
};
exports.getWeeklyReport = async (req, res) => {
  const progress = memoryProgress.get(req.user.id) || defaults;
  res.json({ week: Math.ceil(progress.dailyPlanProgress / 17) || 1, progress: `${progress.roadmapProgress}%`, snapshot: progress });
};
