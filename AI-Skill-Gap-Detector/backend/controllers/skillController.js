const fs = require('fs');
const path = require('path');
const { analyzeLiveSkillGap } = require('../services/aiService');

const loadSkills = () => {
  const candidatePaths = [
    path.join(__dirname, '../../database/skills.json'),
    path.join(__dirname, '../../database/processed/skills.json')
  ];

  for (const p of candidatePaths) {
    try {
      if (fs.existsSync(p)) {
        const data = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (Array.isArray(data) && data.length > 0) {
          // If array of strings, convert to objects
          return data.map((item, index) => {
            if (typeof item === 'string') {
              return { id: index + 1, name: item, category: 'Technical' };
            }
            return item;
          });
        }
      }
    } catch {}
  }

  return [
    { id: 1, name: 'HTML', category: 'Frontend' },
    { id: 2, name: 'CSS', category: 'Frontend' },
    { id: 3, name: 'JavaScript', category: 'Frontend' },
    { id: 4, name: 'React', category: 'Frontend' },
    { id: 5, name: 'Node.js', category: 'Backend' },
    { id: 6, name: 'Express.js', category: 'Backend' },
    { id: 7, name: 'MongoDB', category: 'Database' },
    { id: 8, name: 'REST API', category: 'Backend' },
    { id: 9, name: 'Git', category: 'Tools' },
    { id: 10, name: 'Python', category: 'Data Science' },
    { id: 11, name: 'SQL', category: 'Database' },
    { id: 12, name: 'Machine Learning', category: 'AI/ML' }
  ];
};

exports.getSkills = async (req, res) => {
  res.json(loadSkills());
};

exports.getSkillGap = async (req, res) => {
  const { jobId } = req.params;
  const userScores = req.body?.scores || {
    JavaScript: 55,
    'React.js': 40,
    'Node.js': 50,
    MongoDB: 65,
    'Git & GitHub': 75
  };
  const targetSkills = ['JavaScript', 'React.js', 'Node.js', 'MongoDB', 'Git & GitHub'];

  const analysis = await analyzeLiveSkillGap(jobId || 'Full Stack Engineer', userScores, targetSkills);
  res.json(analysis);
};
