import { readFileLines } from "../../common/readfileLines.js";

export async function calorieCounter(
  topToCount: number,
  file: string = "input.txt"
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  let currentCalories = 0;
  let bestCalories = Array(topToCount).fill(0);

  for await (const line of rl) {
    if (line === "") {
      const lowestCalorieValue = Math.min(...bestCalories);

      if (lowestCalorieValue < currentCalories) {
        const indexLowestCalorie = bestCalories.indexOf(lowestCalorieValue);
        bestCalories[indexLowestCalorie] = currentCalories;
      }
      currentCalories = 0;
      continue;
    }

    currentCalories += parseInt(line);
  }

  const caloriesTopSum: number = bestCalories.reduce((a, b) => a + b);
  console.log(caloriesTopSum);
  return caloriesTopSum;
}
