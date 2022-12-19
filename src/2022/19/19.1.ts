import { readFileLines } from "../../common/readfileLines.js";
import { Blueprint as BluePrint } from "./blueprint.js";
import { RobotOptimizer } from "./robotOptimizer.js";



export async function sumOfQualityLevels(
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const robotOptimizer = new RobotOptimizer();

  for await (const line of rl) {
    const blueprint = new BluePrint(line);
    robotOptimizer.optimizeBlueprint(blueprint);
  }


  const result = robotOptimizer.sumQualityLevel();;
  return result;
}
