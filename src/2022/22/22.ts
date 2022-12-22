import { readFileLines } from "../../common/readfileLines.js";
import { MonkeyCubeMap } from "./monkeyCubeMap.js";
import { MonkeyMap } from "./monkeyMap.js";
import { MonkeyPath } from "./monkeyPath.js";

export async function jungleEndPos(
  isCube: boolean,
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const monekeyMap: MonkeyMap = isCube ? new MonkeyCubeMap() : new MonkeyMap();
  const monkeyPath = new MonkeyPath(monekeyMap);

  for await (const line of rl) {
    monkeyPath.readLine(line);
  }
  monkeyPath.finishReading();
  monkeyPath.walk();

  const finishCell = monkeyPath.walkingPerson.currentCell;
  const row = finishCell.row + 1;
  const column = finishCell.column + 1;
  const dir = monkeyPath.walkingPerson.dir.value;

  const result = row * 1000 + column * 4 + dir;
  return result;
}
