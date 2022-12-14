import { readFileLines } from "../../common/readfileLines.js";
import { Cave } from "./cave.js";

export async function sandDropsBeforeFull(file: string): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const cave = new Cave();

  for await (const line of rl) {
    cave.readLine(line);
  }
  cave.createGrid();
  const result = cave.fillWithSand();

  return result;
}
