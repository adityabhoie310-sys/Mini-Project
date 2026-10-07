exports.getProgress = async (req, res) => res.json({ overallScore: 74, completedAssessments: 3 });
exports.getWeeklyReport = async (req, res) => res.json({ week: 1, progress: '+8%' });
