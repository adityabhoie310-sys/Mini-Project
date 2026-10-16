const fs = require('fs');
const path = require('path');

const loadResources = () => {
  const candidatePaths = [
    path.join(__dirname, '../../database/resources.json'),
    path.join(__dirname, '../../database/processed/resources.json')
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
    { id: 1, title: 'Full Stack Open', type: 'Course', url: 'https://fullstackopen.com' },
    { id: 2, title: 'System Design Primer', type: 'Guide', url: 'https://github.com/donnemartin/system-design-primer' },
    { id: 3, title: 'React Official Documentation', type: 'Documentation', url: 'https://react.dev' },
    { id: 4, title: 'MDN Web Docs', type: 'Documentation', url: 'https://developer.mozilla.org' },
    { id: 5, title: 'Node.js Official Documentation', type: 'Documentation', url: 'https://nodejs.org' }
  ];
};

exports.getResources = async (req, res) => res.json(loadResources());

