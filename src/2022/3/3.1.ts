import { readFileLines } from "../../common/readfileLines.js";
import { Runsack } from "./Runsack.js";

export async function runsackPrioritiesSum(
  compartments: number = 2,
  file: string = "input.txt"
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  let sumPriorities = 0;

  for await (const line of rl) {
    const runsack = Runsack.fromSingleItemsList(line, compartments);
    const sharedItemsPriorities = runsack.sharedItemsPrioritiesSum();
    sumPriorities += sharedItemsPriorities;
  }

  console.log(sumPriorities);
  return sumPriorities;
}