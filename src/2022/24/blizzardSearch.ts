import { PriorityQueue } from "../../common/priorityQueue.js";
import { Utils } from "../../common/Utils.js";
import { BlizzardState } from "./blizzard.js";
import { Direction } from "./direction.js";

export class BlizzardSearch {
  public states: BlizzardState[];

  constructor(state: BlizzardState) {
    this.states = [state];
  }

  public searchEnd(): BlizzardNode[] {
    const [startI, startJ] = this.startPoint();
    const [endI, endJ] = this.endPoint();

    const open = new PriorityQueue<BlizzardNode>((a, b) => a.fCost < b.fCost);
    const startNode = new BlizzardNode(startI, startJ, 0);
    startNode.goalI = endI;
    startNode.goalJ = endJ;
    startNode.goalIndex = 0;
    startNode.addHeuristicFromGoalIndex = () => 0;
    open.push(startNode);

    const visitedStates = new Set<number>();

    while (!open.isEmpty()) {
      const node = open.pop();

      const stateHash = node.stateHash();
      if (visitedStates.has(stateHash)) {
        continue;
      } else {
        visitedStates.add(stateHash);
      }

      if (node.isGoal()) {
        return node.pathToReachNode();
      }

      let nextState = this.states[node.minutes + 1];
      if (!nextState) {
        nextState = this.states[node.minutes].nextState();
        this.states.push(nextState);
      }

      const successors = node.getSuccessors(nextState);
      for (const succesor of successors) {
        open.push(succesor);
      }
    }
  }

  public searchEndStartEnd(): BlizzardNode[] {
    const [startI, startJ] = this.startPoint();
    const [endI, endJ] = this.endPoint();

    let open = new PriorityQueue<BlizzardNode>((a, b) => a.fCost < b.fCost);
    const startNode = new BlizzardNode(startI, startJ, 0);
    startNode.goalI = endI;
    startNode.goalJ = endJ;
    startNode.goalIndex = 0;

    const distStartEnd = Utils.ManhattanDistance(startI, startJ, endI, endJ);
    startNode.addHeuristicFromGoalIndex = (index) => (2 - index) * distStartEnd;
    open.push(startNode);

    const visitedStates = new Set<number>();

    while (!open.isEmpty()) {
      const node = open.pop();

      const stateHash = node.stateHash();
      if (visitedStates.has(stateHash)) {
        continue;
      } else {
        visitedStates.add(stateHash);
      }

      if (node.isGoal()) {
        if (node.goalIndex === 2) {
          return node.pathToReachNode();
        } else {
          if (node.goalIndex === 0) {
            node.goalI = startI;
            node.goalJ = startJ;
          } else if (node.goalIndex === 1) {
            node.goalI = endI;
            node.goalJ = endJ;
          }
          node.goalIndex++;
          open = new PriorityQueue<BlizzardNode>((a, b) => a.fCost < b.fCost);
        }
      }

      let nextState = this.states[node.minutes + 1];
      if (!nextState) {
        nextState = this.states[node.minutes].nextState();
        this.states.push(nextState);
      }

      const successors = node.getSuccessors(nextState);
      for (const succesor of successors) {
        open.push(succesor);
      }
    }
  }

  public startPoint(): [number, number] {
    const firstCells = this.states[0].cells;
    const row = firstCells.findIndex((r) => r.find((e) => e.isStart));
    const col = firstCells[row].findIndex((e) => e.isStart);

    return [row, col];
  }

  public endPoint(): [number, number] {
    const firstCells = this.states[0].cells;
    const row = firstCells.findIndex((r) => r.find((e) => e.isEnd));
    const col = firstCells[row].findIndex((e) => e.isEnd);

    return [row, col];
  }
}

export class BlizzardNode {
  public minutes: number;
  public fCost: number;
  public i: number;
  public j: number;
  public goalI: number;
  public goalJ: number;
  public goalIndex: number;
  public addHeuristicFromGoalIndex: (x: number) => number;
  private _parent: BlizzardNode;

  constructor(i: number, j: number, gCost: number) {
    this.i = i;
    this.j = j;
    this.minutes = gCost;
  }

  public getSuccessors(nextState: BlizzardState): BlizzardNode[] {
    const successors: BlizzardNode[] = [];

    for (const dir of Direction.Directions()) {
      const [i, j] = dir.adySeamlessIndex(this.i, this.j, nextState.cells);
      const cell = nextState.cells[i][j];
      if (cell.canWalk) {
        const nextNode = this.nextCell(i, j);
        successors.push(nextNode);
      }
    }

    const currentCell = nextState.cells[this.i][this.j];
    if (currentCell.canWalk) {
      const nextNode = this.nextCell(this.i, this.j);
      successors.push(nextNode);
    }

    return successors;
  }

  private nextCell(i: number, j: number) {
    const nextNode = new BlizzardNode(i, j, this.minutes + 1);
    nextNode.parent = this;
    return nextNode;
  }

  public pathToReachNode(): BlizzardNode[] {
    const path = [];
    let node: BlizzardNode = this;
    while (node._parent != null) {
      path.unshift(node);
      node = node._parent;
    }
    path.unshift(node);
    return path;
  }

  public stateHash(): number {
    return (
      this.i + this.j * 1000 + this.minutes * 1000000 + this.goalIndex * 100
    );
  }

  public set parent(parent: BlizzardNode) {
    this._parent = parent;
    this.goalI = parent.goalI;
    this.goalJ = parent.goalJ;
    this.goalIndex = parent.goalIndex;
    this.addHeuristicFromGoalIndex = parent.addHeuristicFromGoalIndex;

    const hCost =
      Utils.ManhattanDistance(this.i, this.j, this.goalI, this.goalJ) +
      this.addHeuristicFromGoalIndex(this.goalIndex);
    this.fCost = this.minutes + hCost;
  }

  public isGoal() {
    return this.i === this.goalI && this.j === this.goalJ;
  }
}
