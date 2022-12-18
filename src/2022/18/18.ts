import { readFileLines } from "../../common/readfileLines.js";
import { LavaMap } from "./lavaMap.js";


export async function calculateConnectedCubes(
  includeInteriorArea: boolean,
  checkArea: number,
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const lavaMap = new LavaMap(checkArea);

  for await (const line of rl) {
    lavaMap.readLine(line);
  }
  if(!includeInteriorArea){
    lavaMap.excludeInteriorArea();
  }

  const result = lavaMap.connectedFaces;
  return result;
}
