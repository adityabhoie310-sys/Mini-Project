const calculateSkillScore = (userAnswers, correctAnswers) => {
  let correct = 0;
  userAnswers.forEach((ans, i) => {
    if (ans === correctAnswers[i]) correct++;
  });
  return (correct / userAnswers.length) * 100;
};
module.exports = { calculateSkillScore };
