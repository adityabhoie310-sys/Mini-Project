const generateRoadmap = (skillGaps) => {
  return skillGaps.map((gap, idx) => ({
    week: idx + 1,
    skill: gap.skill,
    priority: gap.priority,
    tasks: [
      `Study ${gap.skill} core concepts`,
      `Complete practical ${gap.skill} exercises`,
      `Build hands-on mini project with ${gap.skill}`
    ]
  }));
};

module.exports = { generateRoadmap };
