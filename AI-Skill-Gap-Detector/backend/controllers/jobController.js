const fs = require('fs');
const path = require('path');

const loadJobs = () => {
  const candidatePaths = [
    path.join(__dirname, '../../database/jobs.json'),
    path.join(__dirname, '../../database/processed/jobs.json')
  ];

  for (const p of candidatePaths) {
    try {
      if (fs.existsSync(p)) {
        const data = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {}
  }

  return [
    {
      id: 1,
      jobId: 'JOB001',
      title: 'Frontend Developer',
      description: 'Build user interfaces and modern web apps with React and JavaScript.',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git']
    },
    {
      id: 2,
      jobId: 'JOB002',
      title: 'Backend Developer',
      description: 'Develop REST APIs, handle databases, and architect scalable server systems.',
      skills: ['Python', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Git']
    },
    {
      id: 3,
      jobId: 'JOB003',
      title: 'MERN Stack Developer',
      description: 'Full stack development covering MongoDB, Express, React, and Node.js.',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Git']
    },
    {
      id: 4,
      jobId: 'JOB004',
      title: 'Data Analyst',
      description: 'Extract, analyze, and visualize data for actionable business insights.',
      skills: ['Python', 'SQL', 'Excel', 'Pandas', 'NumPy', 'Data Visualization']
    },
    {
      id: 5,
      jobId: 'JOB005',
      title: 'Machine Learning Engineer',
      description: 'Build and deploy predictive ML models and pipelines.',
      skills: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'Machine Learning']
    }
  ];
};

exports.getJobs = async (req, res) => res.json(loadJobs());

exports.getJobById = async (req, res) => {
  const jobs = loadJobs();
  const id = req.params.id;
  const job = jobs.find(j => String(j.id) === String(id) || j.jobId === id) || jobs[0];
  res.json(job);
};

