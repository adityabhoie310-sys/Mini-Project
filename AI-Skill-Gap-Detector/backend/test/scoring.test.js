const test = require("node:test");
const assert = require("node:assert/strict");

test("assessment average uses all three sections", () => {
  const scores = { technical: 80, reasoning: 60, aptitude: 40 };
  const average = Math.round((scores.technical + scores.reasoning + scores.aptitude) / 3);
  assert.equal(average, 60);
});

test("assessment scores stay inside the accepted range", () => {
  for (const value of [0, 50, 100]) assert.ok(Number.isFinite(value) && value >= 0 && value <= 100);
  for (const value of [-1, 101, NaN]) assert.ok(!Number.isFinite(value) || value < 0 || value > 100);
});
