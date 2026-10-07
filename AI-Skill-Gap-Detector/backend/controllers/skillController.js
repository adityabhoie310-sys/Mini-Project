const fs = require('fs'); const path = require('path');
const loadSkills = () => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, '../../database/skills.json'), 'utf8')); } catch { return []; } };
exports.getSkills = async (req, res) => res.json(loadSkills());
exports.getSkillGap = async (req, res) => res.json([{ skill: 'Microservices & Distributed Systems', current: 40, required: 85, gap: 45, priority: 'High' }, { skill: 'Redis Caching Strategies', current: 50, required: 85, gap: 35, priority: 'High' }, { skill: 'Docker & Containerization', current: 55, required: 85, gap: 30, priority: 'Medium' }]);
