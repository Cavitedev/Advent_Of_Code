import { Blueprint, OreRobot, ClayRobot, ObsidianRobot, GeodeRobot, Robot } from "./blueprint.js";
import { Resources } from "./resources.js";

export class RobotOptimizer{


    public blueprints: Blueprint[] = [];


    public optimizeBlueprint(blueprint: Blueprint){
        const startTime = 24;
        let bestGeodes = 0;

        const startingNode = new OreNode(startTime, new Resources({}));
        startingNode.builtRobots.push(blueprint.oreRobot);
        const openNodes: OreNode[] = [startingNode];

        while(openNodes.length > 0){
            const openedNode = openNodes.pop();
            if(openedNode.timeLeft === 0){
                bestGeodes = Math.max(bestGeodes, openedNode.resources.geode);
            }else{
                openNodes.push(...openedNode.getSuccessors(blueprint));
            }
        }
        blueprint.maxGeodes = bestGeodes;
        this.blueprints.push(blueprint);
    }

    public sumQualityLevel(): number{
        return this.blueprints.reduce<number>((prev, curr) => prev + curr.qualityLevel ,0);

    }


}

export class OreNode{

    public timeLeft: number;
    public builtRobots: Robot[] = []
    public resources: Resources;

    private static _DecreaseTime: number = 1;

    constructor(timeLeft:number, resources: Resources){
        this.timeLeft = timeLeft;
        this.resources = resources;
    }

    public getSuccessors(blueprint:Blueprint): OreNode[]{
        if(this.timeLeft <= 0) return [];

        const successors = [];
        const resourcesNextTurn = this.resourcesNextTurn();

        const candidateRobots = blueprint.candidateRobots(resourcesNextTurn);
        const availableRobots = blueprint.availableRobots(this.resources);
        const lastAvailableRobots = blueprint.availableRobots(this.resources.subtract(this.resourcesBuiltInTurn()))
        const newAvailableRobots = availableRobots.filter(r => lastAvailableRobots.indexOf(r) === -1);

        for(const robot of newAvailableRobots){
            // I assume I can only build 1 robot per turn
            const resourcesAfterCost = resourcesNextTurn.subtract(robot.cost).add(robot.throughput);
            const nodeWithRobot = new OreNode(this.timeLeft - OreNode._DecreaseTime, resourcesAfterCost);
            nodeWithRobot.builtRobots.push(...this.builtRobots);
            nodeWithRobot.builtRobots.push(robot);
            successors.push(nodeWithRobot);
        }
        if(candidateRobots.length != availableRobots.length){
            const nodeNoRobotsBuilt = new OreNode(this.timeLeft - OreNode._DecreaseTime, resourcesNextTurn);
            nodeNoRobotsBuilt.builtRobots.push(...this.builtRobots);
            successors.push(nodeNoRobotsBuilt);
        }


        return successors;
    }
    
    public resourcesNextTurn(): Resources{
        return this.resources.add(this.resourcesBuiltInTurn());
    }

    public resourcesBuiltInTurn(): Resources{

        return this.builtRobots.reduce<Resources>((prev, curr) => prev.add(curr.throughput), new Resources({}));
    }


}