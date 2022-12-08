import {readFileLines} from "../../common/readfileLines.js"
import { ElvesCleaningSections } from "./elvesCleaningSections.js";

export async function amountOfElvesOnCleanOverlap(
  fullOverlap: boolean,
  file: string = "input.txt"
): Promise<number> {
  const rl = readFileLines(__dirname, file);

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
