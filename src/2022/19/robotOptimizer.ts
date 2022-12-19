import {
  Blueprint,
  OreRobot,
  ClayRobot,
  ObsidianRobot,
  GeodeRobot,
  Robot,
} from "./blueprint.js";
import { Resources } from "./resources.js";

export class RobotOptimizer {
  public blueprints: Blueprint[] = [];

  public optimizeBlueprint(blueprint: Blueprint, startTime: number = 24) {
    let bestGeodes = 0;

    const startingNode = new OreNode(startTime, new Resources({}));
    startingNode.builtRobots.push(blueprint.oreRobot);
    const openNodes: OreNode[] = [startingNode];

    while (openNodes.length > 0) {
      const openedNode = openNodes.pop();
      if (openedNode.timeLeft === 0) {
        bestGeodes = Math.max(bestGeodes, openedNode.resources.geode);
      } else {
        // Filter successor that are not likely to suceed in time
        const succesors = openedNode
          .getSuccessors(blueprint)
          .filter(
            (n) =>
              n.timeLeft * n.resourcesBuiltInTurn().geode +
                n.resources.geode +
                (((n.timeLeft) * (n.timeLeft - 1)) / 2) >
              bestGeodes
          );
        openNodes.push(...succesors);
      }
    }
    blueprint.maxGeodes = bestGeodes;
    this.blueprints.push(blueprint);
  }

  public sumQualityLevel(): number {
    return this.blueprints.reduce<number>(
      (prev, curr) => prev + curr.qualityLevel,
      0
    );
  }
}

export class OreNode {
  public timeLeft: number;
  public builtRobots: Robot[] = [];
  public resources: Resources;
  public pendingRobots: Robot[];

  private static _DecreaseTime: number = 1;

  constructor(timeLeft: number, resources: Resources) {
    this.timeLeft = timeLeft;
    this.resources = resources;
  }

  public getSuccessors(blueprint: Blueprint): OreNode[] {
    if (this.timeLeft <= 0) return [];

    const successors = [];
    const resourcesNextTurn = this.resourcesNextTurn();

    const candidateRobots = blueprint.candidateRobots(resourcesNextTurn);
    const availableRobots = blueprint.availableRobots(this.resources);

    const geodeRobot = availableRobots.find((r) => r.throughput.geode > 0);

    if (geodeRobot) {
      const nodeWithRobot = this._createNodeWithRobot(
        resourcesNextTurn,
        geodeRobot
      );
      return [nodeWithRobot];
    }

    const lastAvailableRobots = blueprint.availableRobots(
      this.resources.subtract(this.resourcesBuiltInTurn())
    );

    for (const pendingRobot of this.pendingRobots ?? []) {
      const index = lastAvailableRobots.indexOf(pendingRobot);
      lastAvailableRobots.splice(index, index);
    }

    const unnecesaryRobots = blueprint.unnecesaryRobots(
      this.resourcesBuiltInTurn()
    );
    let newAvailableRobots = availableRobots.filter(
      (r) => lastAvailableRobots.indexOf(r) === -1
    );

    newAvailableRobots = newAvailableRobots.filter(
      (r) => unnecesaryRobots.indexOf(r) === -1
    );

    //can only build 1 robot per turn, so it may need to check previous robots
    for (let i = 0; i < newAvailableRobots.length; i++) {
      const robot = newAvailableRobots[i];

      const nodeWithRobot = this._createNodeWithRobot(resourcesNextTurn, robot);

      if (newAvailableRobots.length > 1) {
        const clone = newAvailableRobots.slice();
        clone.splice(i, i);
        nodeWithRobot.pendingRobots = clone;
      }

      successors.push(nodeWithRobot);
    }
    if (candidateRobots.length != availableRobots.length) {
      const nodeNoRobotsBuilt = new OreNode(
        this.timeLeft - OreNode._DecreaseTime,
        resourcesNextTurn
      );
      nodeNoRobotsBuilt.builtRobots.push(...this.builtRobots);
      successors.push(nodeNoRobotsBuilt);
    }

    return successors;
  }

  private _createNodeWithRobot(resourcesNextTurn: Resources, robot: Robot) {
    const resourcesAfterCost = resourcesNextTurn.subtract(robot.cost);
    const nodeWithRobot = new OreNode(
      this.timeLeft - OreNode._DecreaseTime,
      resourcesAfterCost
    );
    nodeWithRobot.builtRobots.push(...this.builtRobots);
    nodeWithRobot.builtRobots.push(robot);
    return nodeWithRobot;
  }

  public resourcesNextTurn(): Resources {
    return this.resources.add(this.resourcesBuiltInTurn());
  }

  public resourcesBuiltInTurn(): Resources {
    return this.builtRobots.reduce<Resources>(
      (prev, curr) => prev.add(curr.throughput),
      new Resources({})
    );
  }
}
