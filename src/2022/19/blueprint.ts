import { Resources } from "./resources.js";

export class Blueprint {
  public robots: Robot[];
  public id: number;
  public maxGeodes: number = 0;

  constructor(blueprint: string) {
    this.robots = [];

    this.id = +/Blueprint (\d+)/.exec(blueprint)[1];
    let [oreStr, clayStr, obsidianStr, geodeStr] = blueprint.split(".");

    const oreCostRegex = /(\d+) ore/;
    const clayCostRegex = /(\d+) clay/;
    const obsidianCostRegex = /(\d+) obsidian/;

    const oreCostOreRobot = +oreCostRegex.exec(oreStr)[1];
    const oreRobot = new OreRobot(oreCostOreRobot);
    this.robots.push(oreRobot);

    const oreCostClayRobot = +oreCostRegex.exec(clayStr)[1];
    this.robots.push(new ClayRobot(oreCostClayRobot));

    const oreCostObsidianRobot = +oreCostRegex.exec(obsidianStr)[1];
    const clayCostObsidianRobot = +clayCostRegex.exec(obsidianStr)[1];
    this.robots.push(
      new ObsidianRobot(oreCostObsidianRobot, clayCostObsidianRobot)
    );

    const oreCostGeodeRobot = +oreCostRegex.exec(geodeStr)[1];
    const obsidianCostGeodeRobot = +obsidianCostRegex.exec(geodeStr)[1];
    this.robots.push(new GeodeRobot(oreCostGeodeRobot, obsidianCostGeodeRobot));
  }

  public availableRobots(res: Resources): Robot[] {
    return this.robots.filter((r) => r.cost.lessOrEqualThan(res));
  }

  public candidateRobots(throughput: Resources): Robot[] {
    //Simulates infinity as 0 * infinity = NaN and I need 0
    const infiniteThroughput = throughput.multiplyBy(999999);
    return this.availableRobots(infiniteThroughput);
  }

  public get oreRobot(): Robot {
    return this.robots[0];
  }

  public get qualityLevel(): number {
    return this.id * this.maxGeodes;
  }

  public unnecesaryRobots(throughput: Resources): Robot[] {
    const unnecesaryRobots: Robot[] = [];
    const throughputOres = throughput.ores();
    for (let i = 0; i < throughputOres.length - 1; i++) {
      const oreProduction = throughputOres[i];
      const maxNeed = Math.max(...this.robots.map((r) => r.cost.ores()[i]));
      if (oreProduction >= maxNeed) {
        unnecesaryRobots.push(this.robots[i]);
      }
    }

    return unnecesaryRobots;
  }
}

export abstract class Robot {
  public cost: Resources;
  public throughput: Resources;

  constructor(cost: Resources, throughout: Resources) {
    this.cost = cost;
    this.throughput = throughout;
  }
}

export class OreRobot extends Robot {
  constructor(oreCost: number) {
    const throughput = new Resources({ ore: 1 });
    const cost = new Resources({ ore: oreCost });
    super(cost, throughput);
  }
}

export class ClayRobot extends Robot {
  constructor(oreCost: number) {
    const throughput = new Resources({ clay: 1 });
    const cost = new Resources({ ore: oreCost });
    super(cost, throughput);
  }
}

export class ObsidianRobot extends Robot {
  constructor(oreCost: number, clayCost: number) {
    const throughput = new Resources({ obsidian: 1 });
    const cost = new Resources({ ore: oreCost, clay: clayCost });
    super(cost, throughput);
  }
}

export class GeodeRobot extends Robot {
  constructor(oreCost: number, obsidianCost: number) {
    const throughput = new Resources({ geode: 1 });
    const cost = new Resources({ ore: oreCost, obsidian: obsidianCost });
    super(cost, throughput);
  }
}
