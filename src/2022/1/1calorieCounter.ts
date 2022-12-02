import { default as fs } from "fs";
import { default as readline } from "readline";

export async function calorieCounter(
  topToCount: number,
  file: String = "input.txt"
): Promise<number> {
  const rl = readFileByLine(file);

  let currentCalorie = 0;
  let bestCalories = Array(topToCount).fill(0);

  for await (const line of rl) {
    if (line === "") {
      let lowestCalorieValue = Math.min(...bestCalories);
      let indexLowestCalorie = bestCalories.indexOf(lowestCalorieValue);

      if (lowestCalorieValue < currentCalorie) {
        bestCalories[indexLowestCalorie] = currentCalorie;
      }
      currentCalorie = 0;
      continue;
    }

    currentCalorie += parseInt(line);
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
