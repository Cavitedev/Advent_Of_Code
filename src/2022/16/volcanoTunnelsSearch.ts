import { PriorityQueue } from "../../common/priorityQueue.js";
import { Valve, Volcano } from "./volcano.js";

export class VolcanoTunnelsSearch {
  public volcano: Volcano;

  constructor(volcano: Volcano) {
    this.volcano = volcano;
  }

  public buildTransitiveTunnels() {
    for (const valve of Object.values(this.valves)) {
      const valveNode = new ValveNode(valve, 0);
      const checkedValves = new Set<Valve>();

      const open: PriorityQueue<ValveNode> = new PriorityQueue<ValveNode>(
        (a, b) => a.gCost <= b.gCost
      );

      open.push(...this._getSuccessors(valveNode));

      while (!open.isEmpty()) {
        const checkingValve = open.pop();

        if (!checkedValves.has(checkingValve.valve)) {
          valve.transitiveTunnels[checkingValve.valve.name] =
            checkingValve.gCost;
          checkedValves.add(checkingValve.valve);
          open.push(...this._getSuccessors(checkingValve));
        }
      }
    }
  }

  public get valves() {
    return this.volcano.valves;
  }

  private _getSuccessors(valveNode: ValveNode): ValveNode[] {
    return valveNode.valve.tunnels.map(
      (t) => new ValveNode(this.valves[t], valveNode.gCost + 1)
    );
  }
}

export class ValveNode {
  public gCost = 0;
  public valve: Valve;

  constructor(valve: Valve, gCost: number) {
    this.valve = valve;
    this.gCost = gCost;
  }
}
