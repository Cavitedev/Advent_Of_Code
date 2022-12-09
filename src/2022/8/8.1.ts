import { readFileLines } from "../../common/readfileLines.js";
import { Forest } from "./forest.js";

export async function treeHouseCounter(
  file: string = "input.txt"
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const forest = new Forest();
  for await (const line of rl) {
    forest.addRow(line);
  }
  forest.checkVerticalVisibility();
  const visibleTreesCount = forest.visibleTrees().length;
  return visibleTreesCount;
}