import { readFileLines } from "../../common/readfileLines.js";
import { Bridge } from "./bridge.js";

export async function traversedCellsCounter(
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const bridge = new Bridge();

  for await (const line of rl) {
    const splittedLine = line.split(" ");
    const dirLetter = splittedLine[0];
    const moveAmount = +splittedLine[1];
    bridge.moveTail(dirLetter, moveAmount);
  }

  const cellsTraversed = bridge.unrepeatedCellsTraversed().length;
  return cellsTraversed;
}
