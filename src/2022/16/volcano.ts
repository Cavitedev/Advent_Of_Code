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

  public calculateBestTotalFlow(startTime: number, workers: number): number {
    this.buildTransitiveTunnels();
    const valvesWithCost = this.valves["AA"].transitiveTunnels.length;

    if (workers === 1) {
      return this._calculateBestSingleWorker(startTime);
    } else if (workers === 2) {
      let bestTotalPressure = 0;

      for (let i = 0; i < valvesWithCost / 2; i++) {
        let lowerHalf = Math.floor(valvesWithCost / 2) - i;
        let upperHalf = Math.ceil(valvesWithCost / 2) + i;

        const solutions1 = this._calculateSolutionsIndividually(
          startTime,
          lowerHalf
        ).sort((a, b) => b.totalPressure - a.totalPressure);
        const solutions2 = this._calculateSolutionsIndividually(
          startTime,
          upperHalf
        ).sort((a, b) => b.totalPressure - a.totalPressure);

        solutions1.splice(Math.max(solutions1.length / 10, 1000));
        solutions2.splice(Math.max(solutions2.length / 10, 1000));

        for (const solution of solutions1) {
          const compSols = solution.complementarySolutions(solutions2);

          const totalPressure =
            solution.totalPressure +
            Math.max(...compSols.map((s) => s.totalPressure));
          bestTotalPressure = Math.max(totalPressure, bestTotalPressure);
        }
      }

      return bestTotalPressure;
    }
  }

  private _calculateSolutionsIndividually(
    startTime: number,
    length: number
  ): Solution[] {
    let time = startTime;
    let totalFlow = 0;
    let solutions: Solution[] = [];
    let travelledValves: Valve[] = [this.valves["AA"]];
    const currentChecks: number[] = [-1];
    while (currentChecks.length > 0) {
      let index = currentChecks.length - 1;
      let curCheck = ++currentChecks[index];
      const curValve = travelledValves[index];

      //Backtracking
      if (
        time <= 0 ||
        currentChecks.length == length + 1 ||
        curCheck === curValve.transitiveTunnels.length
      ) {
        solutions.push(new Solution(totalFlow, [...travelledValves]));

        if (curValve.opened) {
          totalFlow -= curValve.flowRate * curValve.opened;

          const prevValve = travelledValves[index - 1];
          time = prevValve.opened ?? startTime;
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

    return solutions;
  }

  private _calculateBestSingleWorker(startTime: number): number {
    this.buildTransitiveTunnels();
    let time = startTime;
    let totalFlow = 0;
    let bestTotalFlow = 0;
    const costValves = Object.values(this.valves).filter((v) => v.flowRate > 0);

    let travelledValves: Valve[] = [this.valves["AA"]];
    const currentChecks: number[] = [-1];
    while (currentChecks.length > 0) {
      let index = currentChecks.length - 1;
      let curCheck = ++currentChecks[index];
      const curValve = travelledValves[index];

      const bestRemFlow = this._reaminingFlow(time, costValves);
      //Backtracking
      if (
        bestRemFlow + totalFlow < bestTotalFlow ||
        time <= 0 ||
        curCheck === curValve.transitiveTunnels.length
      ) {
        bestTotalFlow = Math.max(totalFlow, bestTotalFlow);

        if (curValve.opened) {
          totalFlow -= curValve.flowRate * curValve.opened;

          const prevValve = travelledValves[index - 1];
          time = prevValve.opened ?? startTime;
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

  private _reaminingFlow(time: number, valves: Valve[]) {
    let remFlow = 0;
    let realTime = Math.max(time - 2, 0);
    const remainingValvesValues = valves
      .filter((v) => !v.opened)
      .map((v) => v.flowRate)
      .sort((a, b) => b - a);

    let i = 0;
    while (realTime > 0) {
      remFlow += (remainingValvesValues[i++] ?? 0) * realTime;
      realTime -= 2;
    }
    return remFlow;
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
    return this.openValue(time);
  }

  public openValue(time: number): number {
    return this.flowRate * time;
  }
}

class Solution {
  public totalPressure: number;
  public path: Valve[];

  constructor(pressure: number, path: Valve[]) {
    this.totalPressure = pressure;
    this.path = path;
  }

  public complementarySolutions(otherSolutions: Solution[]): Solution[] {
    const thisPath = this.pathWithoutInitNode();

    return otherSolutions.filter((s) =>
      s.pathWithoutInitNode().every((n) => !thisPath.includes(n))
    );
  }

  public pathWithoutInitNode() {
    return this.path.slice(1);
  }
}
