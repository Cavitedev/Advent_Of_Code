import { default as fs } from "fs";
import { default as readline } from "readline";

export async function calorieCounter(
  file: String = "input.txt"
): Promise<number> {
  const rl = readFileByLine(file);

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
  return bestCalorie;
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
