import { readFileLines } from "../../common/readfileLines.js";
import { Cave } from "./cave.js";

export async function sandDropsCountBeforeReachingTop(
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const cave = new Cave();

  for await (const line of rl) {
    cave.readLine(line);
  }
  cave.createGridV2();
  const result = cave.fillWithSandTillTop();

  return result;
}
