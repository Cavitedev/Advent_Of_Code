import { HeightMap, HeightMapCell } from "./heightMap.js";
import { PriorityQueue } from "./priorityQueue.js";

export class HeightMapSearch {
  public heightMap: HeightMap;
  private _closed: Set<HeightMapCell>;
  private _open: PriorityQueue<HeightMapCellNode>;

  constructor(heightMap: HeightMap) {
    this.heightMap = heightMap;
  }

  public findPathAStarFromStart(): HeightMapCellNode[] {
    this._closed = new Set<HeightMapCell>();
    this._open = new PriorityQueue((a, b) => a.fCost > b.fCost);

    const startCell = this.heightMap.getStartCell();
    const startNode = new HeightMapCellNode(startCell);
    startNode.gCost = 0;
    startNode.hCost = this._heuristicValueTowardsEnd(startNode);
    startNode.fCost = startNode.gCost + startNode.hCost;
    this._closed.add(startCell);
    this._open.push(startNode);

    while (!this._open.isEmpty()) {
      const node = this._open.pop();
      if (!this._closed.has(node.refCell)) {
        this._closed.add(node.refCell)
        


      }
    }

    return [];
  }

  private _findPathAStarFromCellToStart(
    cell: HeightMapCellNode,
    traversedCells: Set<HeightMapCellNode>
  ) {}

  private _heuristicValueTowardsEnd(cell: HeightMapCellNode) {
    return 24 - cell.height;
  }

  private _getSuccessor(node: HeightMapCellNode): HeightMapCellNode[]{
    return [];
  }
}

export class HeightMapCellNode {
  public refCell: HeightMapCell;

  public gCost: number = 0.0;
  public hCost: number = 0.0;
  public fCost: number = 0.0;
  public parent: HeightMapCellNode;

  constructor(refCell: HeightMapCell) {
    this.refCell = refCell;
  }

  public get i(): number {
    return this.refCell.i;
  }

  public get j(): number {
    return this.refCell.j;
  }

  public get height(): number {
    return this.refCell.height;
  }

  public get isStart(): boolean {
    return this.refCell.isStart;
  }

  public get isEnd(): boolean {
    return this.refCell.isEnd;
  }
}
