import { PriorityQueue } from "../../common/priorityQueue.js";
import { ValveNode, VolcanoTunnelsSearch } from "./volcanoTunnelsSearch.js";

export class Volcano {
  public valves: { [name: string]: Valve };

  constructor() {
    this.valves = {};
  }

  public readLine(line: string) {
    const name = /Valve (\w+) /.exec(line)[1];
    const flowRate = +/flow rate=(\d+);/.exec(line)[1];
    const valvesStr = /to valves? ([\w, ]+)/.exec(line)[1];
    const valves = valvesStr.split(",").map((s) => s.trim());

    const newValve = new Valve(name, flowRate, valves);
    this.valves[name] = newValve;
  }

  public buildTransitiveTunnels() {
    const volcanoTunnelsSearch = new VolcanoTunnelsSearch(this);
    volcanoTunnelsSearch.buildTransitiveTunnels();
  }

  public calculateBestTotalFlow(time: number, workers: number): number {
    this.buildTransitiveTunnels();

    let totalFlow = 0;
    let bestTotalFlow = 0;
    let travelledValves: Valve[] = [this.valves["AA"]];
    const currentChecks: number[] = [-1];
    while (currentChecks.length > 0) {
      let index = currentChecks.length - 1;
      let curCheck = ++currentChecks[index];
      const curValve = travelledValves[index];

      //Backtracking
      if (time <= 0 || curCheck === curValve.transitiveTunnels.length) {
        bestTotalFlow = Math.max(totalFlow, bestTotalFlow);

        if (curValve.opened) {
          totalFlow -= curValve.flowRate * curValve.opened;

          const prevValve = travelledValves[index - 1];
          time = prevValve.opened ?? 30;
          curValve.opened = undefined;
        }
        currentChecks.pop();
        travelledValves.pop();
        continue;
      }

      const nextValveNode = curValve.transitiveTunnels[curCheck];
      if (nextValveNode.valve.opened) continue;

      const newTime = time - nextValveNode.gCost - 1;
      if (newTime <= 0) continue;
      time = newTime;
      totalFlow += nextValveNode.valve.open(time);
      travelledValves.push(nextValveNode.valve);
      currentChecks.push(-1);
    }

    return bestTotalFlow;
  }

  public calculateBestTotalFlowBruteForce(): number {
    let time = 30;
    let totalFlow = 0;
    let bestTotalFlow = 0;
    let currentValve = this.valves["AA"];
    const currentChecks: number[] = [];
    let travelledValves: Valve[] = [currentValve];
    currentChecks.push(-2);

    let index = 0;
    while (currentChecks.length > 0) {
      let curCheck = ++currentChecks[index];
      const curValve = travelledValves[index];

      //Backtracking
      if (time == 0 || curCheck === curValve.tunnels.length) {
        if (time == 0) {
          bestTotalFlow = Math.max(totalFlow, bestTotalFlow);
        }

        if (curValve.opened === time) {
          totalFlow -= curValve.flowRate * curValve.opened;
          curValve.opened = undefined;
          time++;
        }
        currentChecks.pop();
        travelledValves.pop();
        index--;
        time++;
        continue;
      }

      //Flow
      if (curCheck === -1) {
        if (curValve.opened || curValve.flowRate === 0) continue;
        time--;
        totalFlow += curValve.flowRate * time;
        curValve.opened = time;
        continue;
      }

      //Move
      const nextValve = this.valves[curValve.tunnels[curCheck]];
      time--;
      travelledValves.push(nextValve);
      currentChecks.push(-2);
      index++;
    }

    return bestTotalFlow;
  }
}

export class Valve {
  public name: string;
  public flowRate: number;
  public tunnels: string[];
  //Time remaining when it was opened
  public opened: number;
  //Name and number of steps to perform to reach a valve with some flow rate
  public transitiveTunnels: ValveNode[];

  constructor(name: string, flowRate: number, tunnels: string[]) {
    this.name = name;
    this.flowRate = flowRate;
    this.tunnels = tunnels;
    this.transitiveTunnels = [];
  }

  public open(time: number): number {
    this.opened = time;
    return this.flowRate * time;
  }
}
