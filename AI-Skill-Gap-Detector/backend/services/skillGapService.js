const analyzeGap = (userSkills, requiredSkills) => {
  return requiredSkills.map(req => {
    const current = userSkills[req.name] || 0;
    const gap = Math.max(0, req.requiredScore - current);
    return { skill: req.name, current, required: req.requiredScore, gap, priority: gap > 30 ? 'High' : gap > 15 ? 'Medium' : 'Low' };
  });
};
module.exports = { analyzeGap };
