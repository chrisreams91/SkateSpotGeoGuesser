const maxPoints = 1000;
// antipodal distance around earth in miles
const maxPossibleDistance = 12249;

const bonusPoints: {
  [key: number]: number;
} = {
  1: 100,
  3: 75,
  5: 50,
  10: 25,
  20: 15,
  30: 10,
  50: 5,
  100: 2,
};

const calculateBonusPoints = (distanceFromSpot: number) => {
  let totalBonus = 0;
  for (const key in bonusPoints) {
    if (distanceFromSpot <= parseInt(key)) {
      totalBonus += bonusPoints[key];
    }
  }

  return totalBonus;
};

export const calculateScoreForGuessPrecise = (distanceFromSpot: number) => {
  const scalingFactor = 50;
  const score =
    maxPoints *
    Math.exp((-scalingFactor * distanceFromSpot) / maxPossibleDistance);
  const rounded = Math.round(score * 100) / 100;

  const bonus = calculateBonusPoints(distanceFromSpot);
  return rounded + bonus;
};

export const calculateScoreForGuessRough = (distanceFromSpot: number) => {
  const scalingFactor = 10;
  const score =
    maxPoints *
    Math.exp((-scalingFactor * distanceFromSpot) / maxPossibleDistance);
  const rounded = Math.round(score * 100) / 100;

  const bonus = calculateBonusPoints(distanceFromSpot);
  return rounded + bonus;
};
