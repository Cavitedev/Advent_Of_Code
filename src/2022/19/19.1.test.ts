import { sumOfQualityLevels } from "./19.1.js";
import {
  Blueprint,
  ClayRobot,
  GeodeRobot,
  ObsidianRobot,
  OreRobot,
} from "./blueprint.js";
import { Resources } from "./resources.js";
import { OreNode, RobotOptimizer } from "./robotOptimizer.js";

describe("19.1", () => {
  describe("Robot factory", () => {
    it("Building robot factory from string sets all robot costs correctly", () => {
      const blueprint = new Blueprint(
        "Blueprint 2: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 9 obsidian."
      );

      expect(blueprint.id).toEqual(2);
      const oreRobot = new OreRobot(3);
      expect(blueprint.robots[0]).toEqual(oreRobot);
      expect(blueprint.robots[1]).toEqual(new ClayRobot(3));
      expect(blueprint.robots[2]).toEqual(new ObsidianRobot(3, 16));
      expect(blueprint.robots[3]).toEqual(new GeodeRobot(3, 9));
    });

    it("With 3 ore, the factory can only produce clay robots of cost 3 as ore robots cost 4", () => {
      const blueprint = new Blueprint(
        "Blueprint 3: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 2 ore and 8 obsidian."
      );

      const availableRobots = blueprint.availableRobots(
        new Resources({ ore: 3, clay: 7, obsidian: 7 })
      );

      expect(availableRobots.length).toEqual(1);
      expect(availableRobots[0]).toEqual(new ClayRobot(3));
    });

    it("With enough ore, the factory can produce any kind of robots", () => {
      const blueprint = new Blueprint(
        "Blueprint 2: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 9 obsidian."
      );

      const availableRobots = blueprint.availableRobots(
        new Resources({ ore: 3, clay: 16, obsidian: 9 })
      );

      expect(availableRobots.length).toEqual(4);
      expect(availableRobots).toEqual(blueprint.robots);
    });

    it("With an ore output you can build ore and clay robots", () => {
      const blueprint = new Blueprint(
        "Blueprint 2: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 9 obsidian."
      );

      const candidateRobots = blueprint.candidateRobots(
        new Resources({ ore: 1 })
      );

      expect(candidateRobots.length).toEqual(2);
      expect(candidateRobots).toEqual([new OreRobot(3), new ClayRobot(3)]);
    });

    it("With an ore and clay output you can build ore,  clay and obsidian robots", () => {
      const blueprint = new Blueprint(
        "Blueprint 2: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 9 obsidian."
      );

      const candidateRobots = blueprint.candidateRobots(
        new Resources({ ore: 1, clay: 1 })
      );

      expect(candidateRobots.length).toEqual(3);
      expect(candidateRobots).toEqual([
        new OreRobot(3),
        new ClayRobot(3),
        new ObsidianRobot(3, 16),
      ]);
    });

    it("With an ore and clay and obsidian output you can build ore, clay, obsidian and geode robots", () => {
      const blueprint = new Blueprint(
        "Blueprint 2: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 9 obsidian."
      );

      const candidateRobots = blueprint.candidateRobots(
        new Resources({ ore: 1, clay: 1, obsidian: 1 })
      );

      expect(candidateRobots.length).toEqual(4);
      expect(candidateRobots).toEqual([
        new OreRobot(3),
        new ClayRobot(3),
        new ObsidianRobot(3, 16),
        new GeodeRobot(3, 9),
      ]);
    });

    it("If throughput produces 4 ores and the maximum ore cost per robot is 3, return that robot as unnecesary", () => {
      const blueprint = new Blueprint(
        "Blueprint 2: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 4 ore and 9 obsidian."
      );

      const unnecesaryRobots = blueprint.unnecesaryRobots(
        new Resources({ ore: 4 })
      );
      expect(unnecesaryRobots).toEqual([new OreRobot(3)]);
    });
  });

  describe("Robot Optimizer", () => {
    describe("Ore Node", () => {
      it("Ore node returns the built resources and resources next turn on all ore kinds", () => {
        const node = new OreNode(24, new Resources({ clay: 3, geode: 1 }));
        node.builtRobots.push(new OreRobot(2));
        node.builtRobots.push(new ClayRobot(2));
        node.builtRobots.push(new ClayRobot(2));
        node.builtRobots.push(new ObsidianRobot(2, 3));

        const resourcesBuilt = node.resourcesBuiltInTurn();
        const resourcesExpected = new Resources({
          ore: 1,
          clay: 2,
          obsidian: 1,
        });
        expect(resourcesBuilt).toEqual(resourcesExpected);

        const resourcesNextTurn = node.resourcesNextTurn();
        const resourcesNextTurnExpected = new Resources({
          ore: 1,
          clay: 5,
          obsidian: 1,
          geode: 1,
        });
        expect(resourcesNextTurn).toEqual(resourcesNextTurnExpected);
      });

      it("Ore node that can't build anything now or later returns same robots on next node with 1 unit less of time", () => {
        const blueprint = new Blueprint(
          "Blueprint 2: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 9 obsidian."
        );

        const node = new OreNode(23, new Resources({ ore: 1 }));
        node.builtRobots.push(new OreRobot(3));

        const successors = node.getSuccessors(blueprint);

        expect(successors.length).toEqual(1);
        const suc = successors[0];
        expect(suc.timeLeft).toEqual(22);
        expect(suc.resources).toEqual(new Resources({ ore: 2 }));
      });

      it("Ore node can build next turn ore node, and some time later a clay node, return both nodes with and without the robot built with 1 unit less of time", () => {
        const blueprint = new Blueprint(
          "Blueprint 3: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 2 ore and 8 obsidian."
        );
        const node = new OreNode(23, new Resources({ ore: 3 }));
        node.builtRobots.push(new OreRobot(3));

        const successors = node.getSuccessors(blueprint);

        expect(successors.length).toEqual(2);

        const sucRobot = successors[0];
        expect(sucRobot.timeLeft).toEqual(22);
        expect(sucRobot.resources).toEqual(new Resources({ ore: 1 }));
        expect(sucRobot.builtRobots.length).toEqual(2);

        const sucNoRobot = successors[1];
        expect(sucNoRobot.timeLeft).toEqual(22);
        expect(sucNoRobot.resources).toEqual(new Resources({ ore: 4 }));
        expect(sucNoRobot.builtRobots.length).toEqual(1);
      });

      it("Ore node with that was able to build clay node and now it is able to build ore node returns ore node as successor and building no ore as successors", () => {
        const blueprint = new Blueprint(
          "Blueprint 3: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 2 ore and 8 obsidian."
        );
        const node = new OreNode(23, new Resources({ ore: 4 }));
        node.builtRobots.push(new OreRobot(4));

        const successors = node.getSuccessors(blueprint);

        expect(successors.length).toEqual(1);
        const sucRobot = successors[0];
        expect(sucRobot.timeLeft).toEqual(22);
        expect(sucRobot.resources).toEqual(new Resources({ ore: 1 }));
        expect(sucRobot.builtRobots.length).toEqual(2);
        expect(sucRobot.builtRobots).toEqual([
          new OreRobot(4),
          new OreRobot(4),
        ]);
      });

      it("Ore with time 0 has 0 successors", () => {
        const blueprint = new Blueprint(
          "Blueprint 2: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 9 obsidian."
        );

        const node = new OreNode(0, new Resources({ ore: 1 }));
        node.builtRobots.push(new OreRobot(3));

        const successors = node.getSuccessors(blueprint);

        expect(successors.length).toEqual(0);
      });
    });

    it("Optimizing first blueprint from the test finds 9 geodes", () => {
      const robotOptimizer = new RobotOptimizer();
      const blueprint = new Blueprint(
        "Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian."
      );
      robotOptimizer.optimizeBlueprint(blueprint);

      expect(blueprint.maxGeodes).toEqual(9);
    });

    it("Optimizing first blueprint from the test finds 7 geodes with 23 units of time", () => {
      const robotOptimizer = new RobotOptimizer();
      const blueprint = new Blueprint(
        "Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian."
      );
      robotOptimizer.optimizeBlueprint(blueprint, 22);

      expect(blueprint.maxGeodes).toEqual(5);
    });

    it("Optimizing first blueprint from the test finds 0 geodes with 18 units of time", () => {
      const robotOptimizer = new RobotOptimizer();
      const blueprint = new Blueprint(
        "Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian."
      );
      robotOptimizer.optimizeBlueprint(blueprint, 18);

      expect(blueprint.maxGeodes).toEqual(0);
    });

    it("Optimizing second blueprint from the test finds 12 geodes", () => {
      const robotOptimizer = new RobotOptimizer();
      const blueprint = new Blueprint(
        "Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian."
      );
      robotOptimizer.optimizeBlueprint(blueprint);

      expect(blueprint.maxGeodes).toEqual(12);
    });

    it("Optimizing blueprint that builds geode last moment returns 1", () => {
      const robotOptimizer = new RobotOptimizer();
      const blueprint = new Blueprint(
        "Blueprint 0: Each ore robot costs 100 ore. Each clay robot costs 18 ore. Each obsidian robot costs 1 ore and 1 clay. Each geode robot costs 1 ore and 1 obsidian."
      );
      robotOptimizer.optimizeBlueprint(blueprint);

      expect(blueprint.maxGeodes).toEqual(1);
    });
  });

  it("Test with text.txt", async () => {
    const res = await sumOfQualityLevels("test.txt");
    expect(res).toEqual(33);
  });

  it("Test with input.txt", async () => {
    const res = await sumOfQualityLevels("input.txt");

    expect(res).toEqual(1349);
  });
});
