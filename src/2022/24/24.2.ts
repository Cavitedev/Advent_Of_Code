import { readFileLines } from "../../common/readfileLines.js";
import { BlizzardState } from "./blizzard.js";
import { BlizzardSearch } from "./blizzardSearch.js";

export async function distanceBestPathInBlizzardGoReturnGo(
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const blizzardState = new BlizzardState();

  for await (const line of rl) {
    blizzardState.readLine(line);
  }

  const blizzardSearch = new BlizzardSearch(blizzardState);

  const path = blizzardSearch.searchEndStartEnd();

  return path.length - 1;
}
