import { default as fs } from "fs";
import { default as readline } from "readline";
import { Forest } from "./Forest.js";

export async function treeHouseCounter(
  file: String = "input.txt"
): Promise<number> {
  const rl = readFileByLine(file);

  const forest = new Forest();
  for await (const line of rl) {
    forest.addRow(line);
  }
  forest.checkVerticalVisibility();
  const visibleTreesCount = forest.visibleTrees().length;
  return visibleTreesCount;
}

export async function bestScenicValueInForest(
  file: String = "input.txt"
): Promise<number> {
  const rl = readFileByLine(file);

  const forest = new Forest();
  for await (const line of rl) {
    forest.addRow(line);
  }
  forest.checkVerticalVisibility();
  forest.checkAmountOfVisibleTreesOnEachDirection();
  const bestScenicValue = forest.bestScenicValue();
  return bestScenicValue;
}

function readFileByLine(file: String): readline.Interface {
  const fileStream = fs.createReadStream("src/2022/8/" + file, {
    encoding: "utf8",
  });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  return rl;
}
