import { readFileLines } from "../../common/readfileLines.js";
import { ElfSpread } from "./elfSpread.js";

export async function spreadArea(
  rounds: number,
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const elfSpread = new ElfSpread();

  for await (const line of rl) {
    elfSpread.readLine(line);
  }

  elfSpread.spread(rounds);

  const area = elfSpread.currentArea();
  const result = area - elfSpread.elves.size;
  return result;
}
