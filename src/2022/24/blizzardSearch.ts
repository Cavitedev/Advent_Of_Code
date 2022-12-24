import { PriorityQueue } from "../../common/priorityQueue.js";
import { BlizzardState } from "./blizzard.js";
import { Direction } from "./direction.js";

export class BlizzardSearch {
  public states: BlizzardState[];

  constructor(state: BlizzardState) {
    this.states = [state];
  }

  public search(): BlizzardNode[] {
    const [startI, startJ] = this.startPoint();
    const [endI, endJ] = this.endPoint();

    const open = new PriorityQueue<BlizzardNode>((a, b) => a.fCost < b.fCost);
    const startNode = new BlizzardNode(startI, startJ, 0);
    const fCost = this._manhattanDistance(startI, startJ, endI, endJ);
    startNode.fCost = fCost;
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

      if (node.i === endI && node.j === endJ) {
        return node.pathToReachNode();
      }

      let nextState = this.states[node.minutes + 1];
      if (!nextState) {
        nextState = this.states[node.minutes].nextState();
        this.states.push(nextState);
      }

      const successors = node.getSuccessors(nextState);
      for (const succesor of successors) {
        const hCost = this._manhattanDistance(
          succesor.i,
          succesor.j,
          endI,
          endJ
        );
        succesor.fCost = succesor.minutes + hCost;
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

  private _manhattanDistance(
    i: number,
    j: number,
    endI: number,
    endJ: number
  ): number {
    return Math.abs(endI - i) + Math.abs(endJ - j);
  }
}

export class BlizzardNode {
  public minutes: number;
  public fCost: number;
  public i: number;
  public j: number;
  public parent: BlizzardNode;

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
        const nextNode = new BlizzardNode(i, j, this.minutes + 1);
        nextNode.parent = this;
        successors.push(nextNode);
      }
    }

    const currentCell = nextState.cells[this.i][this.j];
    if (currentCell.canWalk) {
      const nextNode = new BlizzardNode(this.i, this.j, this.minutes + 1);
      nextNode.parent = this;
      successors.push(nextNode);
    }

    return successors;
  }

  public pathToReachNode(): BlizzardNode[] {
    const path = [];
    let node: BlizzardNode = this;
    while (node.parent != null) {
      path.unshift(node);
      node = node.parent;
    }
    path.unshift(node);
    return path;
  }

  public stateHash(): number {
    return this.i + this.j * 1000 + this.minutes * 1000000;
  }
}
