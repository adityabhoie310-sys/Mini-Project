exports.getRoadmap = async (req, res) => res.json([{ week: 1, title: 'Core Caching' }, { week: 2, title: 'Docker Orchestration' }]);
exports.updateProgress = async (req, res) => res.json({ success: true });
