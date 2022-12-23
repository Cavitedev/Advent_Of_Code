import { readFileLines } from "../../common/readfileLines.js";
import { ElfSpread } from "./elfSpread.js";

export async function roundsBeforeElvesStabilize(
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const elfSpread = new ElfSpread();

  for await (const line of rl) {
    elfSpread.readLine(line);
  }

  const rounds = elfSpread.spreadUntilNoMovement();

  return rounds;
}
