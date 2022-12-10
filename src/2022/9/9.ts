import { readFileLines } from "../../common/readfileLines.js";
import { Bridge } from "./bridge.js";

export async function traversedCellsCounter(
  amountOfKnots: number,
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const bridge = new Bridge(amountOfKnots);

  for await (const line of rl) {
    const splittedLine = line.split(" ");
    const dirLetter = splittedLine[0];
    const moveAmount = +splittedLine[1];
    bridge.moveHead(dirLetter, moveAmount);
  }

  const cellsTraversed = bridge.unrepeatedCellsTraversed().length;
  return cellsTraversed;
}

export async function bridgeSimulation(
    amountOfKnots: number,
    file: string
  ): Promise<Bridge> {
    const rl = readFileLines(__dirname, file);
  
    const bridge = new Bridge(amountOfKnots);
  
    for await (const line of rl) {
      const splittedLine = line.split(" ");
      const dirLetter = splittedLine[0];
      const moveAmount = +splittedLine[1];
      bridge.moveHead(dirLetter, moveAmount);
    }
  
    return bridge;
  }
