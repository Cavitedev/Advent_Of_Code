import { default as fs } from "fs";
import { default as readline } from "readline";

export async function calorieCounter(
  topToCount: number,
  file: String = "input.txt"
): Promise<number> {
  const rl = readFileByLine(file);

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

function readFileByLine(file: String): readline.Interface {
  const fileStream = fs.createReadStream("src/2022/1/" + file, {
    encoding: "utf8",
  });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  return rl;
}
