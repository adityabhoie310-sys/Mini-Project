const fs = require('fs'); const path = require('path');
const loadJobs = () => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, '../../database/jobs.json'), 'utf8')); } catch { return [{ id: 1, title: 'Full Stack Engineer' }]; } };
exports.getJobs = async (req, res) => res.json(loadJobs());
exports.getJobById = async (req, res) => { const jobs = loadJobs(); const job = jobs.find(j => j.id == req.params.id) || jobs[0]; res.json(job); };
