import { readFileLines } from "../../common/readfileLines.js";
import { Blueprint as BluePrint } from "./blueprint.js";
import { RobotOptimizer } from "./robotOptimizer.js";


export async function firstGeodesMultiplied(
  amountOfBlueprints: number,
  time:number,
  file: string
): Promise<number> {
  const rl = readFileLines("src/2022/19/", file);

  const robotOptimizer = new RobotOptimizer();

  let blueprintChecked = 0;
  for await (const line of rl) {
    if(blueprintChecked++ >= amountOfBlueprints) break;
    const blueprint = new BluePrint(line);
    robotOptimizer.optimizeBlueprint(blueprint, time);
  }


  const result = robotOptimizer.blueprints.slice(0, amountOfBlueprints + 1).reduce<number>
  ((prev, cur) => prev * cur.maxGeodes,1);
  return result;
}
