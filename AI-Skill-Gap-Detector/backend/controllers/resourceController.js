const fs = require('fs'); const path = require('path');
const loadResources = () => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, '../../database/resources.json'), 'utf8')); } catch { return []; } };
exports.getResources = async (req, res) => res.json(loadResources());
