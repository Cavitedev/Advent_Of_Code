import { readFileLines } from "../../common/readfileLines.js";
import { Blueprint as BluePrint } from "./blueprint.js";
import { RobotOptimizer } from "./robotOptimizer.js";
import path from 'path';


export async function sumOfQualityLevels(
  file: string
): Promise<number> {
  const rl = readFileLines("src/2022/19/", file);

  const robotOptimizer = new RobotOptimizer();

  for await (const line of rl) {
    const blueprint = new BluePrint(line);
    robotOptimizer.optimizeBlueprint(blueprint);
  }


  const result = robotOptimizer.sumQualityLevel();;
  return result;
}
