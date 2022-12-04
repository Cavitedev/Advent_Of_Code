import { default as fs } from "fs";
import { default as readline } from "readline";
import { ElvesCleaningSections } from "./elvesCleaningSections.js";

export async function amountOfElvesOnCleanOverlap(
  fullOverlap: boolean,
  file: String = "input.txt"
): Promise<number> {
  const rl = readFileByLine(file);

  let overlapCount = 0;

  for await (const line of rl) {
    const elvesCleaningSections = ElvesCleaningSections.fromString(line);
    const doOverlap = fullOverlap
      ? elvesCleaningSections.doesOneGroupFullyOverlapOthers()
      : elvesCleaningSections.isThereAnyOverlapping();

    if (doOverlap) overlapCount++;
  }

  console.log(overlapCount);
  return overlapCount;
}

function readFileByLine(file: String): readline.Interface {
  const fileStream = fs.createReadStream("src/2022/4/" + file, {
    encoding: "utf8",
  });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  return rl;
}
