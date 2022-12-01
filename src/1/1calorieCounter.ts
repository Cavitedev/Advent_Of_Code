import { default as fs } from "fs";
import { default as readline } from "readline";

export async function calorieCounter() {
  const fileStream = fs.createReadStream("src/1/input.txt", {
    encoding: "utf8",
  });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let currentCalorie = 0;
  let bestCalorie = -1;

  for await (const line of rl) {
    if (line === "") {
      if (bestCalorie < currentCalorie) {
        bestCalorie = currentCalorie;
      }
      currentCalorie = 0;
      continue;
    }

    currentCalorie += parseInt(line);
  }

  console.log(bestCalorie);
}
