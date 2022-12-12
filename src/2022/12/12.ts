import { readFileLines } from "../../common/readfileLines.js";
import { HeightMap } from "./heightMap.js";

export async function bestPathLengthToGoal(
  anyStartPosition: boolean,
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const heightMap = new HeightMap();

  for await (const line of rl) {
    heightMap.readLine(line);
  }

  const bestPath = heightMap.findPathAStarFromStart(anyStartPosition);
  return bestPath.length - 1;
}
