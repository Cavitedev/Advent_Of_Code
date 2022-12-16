import { readFileLines } from "../../common/readfileLines.js";
import { Volcano } from "./volcano.js";

export async function calculateBestFlow(
  time: number,
  workers: number,
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const volcano = new Volcano();

  for await (const line of rl) {
    volcano.readLine(line);
  }

  const result = volcano.calculateBestTotalFlow(time, workers);

  return result;
}
