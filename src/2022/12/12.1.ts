import { readFileLines } from "../../common/readfileLines.js";
import { HeightMap } from "./heightMap.js";

export async function bestPathLengthToGoal(file: string): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const heightMap = new HeightMap();

  for await (const line of rl) {
    heightMap.readLine(line);
  }

  const bestPath = heightMap.findPathBacktracking();
  return bestPath.length - 1;
}
