import { HeightMap, HeightMapCell } from "./heightMap.js";
import { PriorityQueue } from "../../common/priorityQueue.js";

export class HeightMapSearch {
  public heightMap: HeightMap;
  private _closed: Set<HeightMapCell>;
  private _open: PriorityQueue<HeightMapCellNode>;

  constructor(heightMap: HeightMap) {
    this.heightMap = heightMap;
  }

  public findPathAStarFromStart(
    anyStartPosition: boolean
  ): HeightMapCellNode[] {
    this._closed = new Set<HeightMapCell>();
    this._open = new PriorityQueue((a, b) => a.fCost <= b.fCost);
    const endCell = this.heightMap.getEndCell();

    if (!anyStartPosition) {
      const startCell = this.heightMap.getStartCell();
      this._addStartCell(startCell, endCell);
    } else {
      const cellsHeight1 = this.heightMap.getCellsAtHeight(1);
      for (const cell of cellsHeight1) {
        this._addStartCell(cell, endCell);
      }
    }

    while (!this._open.isEmpty()) {
      const node = this._open.pop();

      if (node.isEnd) {
        return node.pathToReachNode();
      }

      if (!this._closed.has(node.refCell)) {
        this._closed.add(node.refCell);

        const successors = this._getSuccessors(node, endCell);

        for (const successor of successors) {
          this._open.push(successor);
        }
      }
    }

    return [];
  }

  private _addStartCell(startCell: HeightMapCell, endCell: HeightMapCell) {
    const startNode = new HeightMapCellNode(startCell);
    startNode.gCost = 0;
    startNode.hCost = this._heuristicValueTowardsCell(startNode, endCell);
    startNode.fCost = startNode.gCost + startNode.hCost;
    this._open.push(startNode);
  }

  private _heuristicValueTowardsCell(
    cell: HeightMapCellNode,
    towards: HeightMapCell
  ) {
    const difHeight = Math.abs(towards.height - cell.height);
    const difPos = Math.abs(towards.i - cell.i) + Math.abs(towards.j - cell.j);
    return Math.max(difHeight, difPos);
  }

  private _getSuccessors(
    parentNode: HeightMapCellNode,
    towardsCell: HeightMapCell
  ): HeightMapCellNode[] {
    const refCellSuccessors = this.heightMap.getValidAdyacentCellsFrom(
      parentNode.refCell
    );
    const nodeSuccessors = refCellSuccessors.map((cell) => {
      const node = new HeightMapCellNode(cell);
      node.gCost = parentNode.gCost + 1;
      node.hCost = this._heuristicValueTowardsCell(node, towardsCell);
      node.fCost = node.gCost + node.hCost;
      node.parent = parentNode;
      return node;
    });
    return nodeSuccessors;
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

  public pathToReachNode(): HeightMapCellNode[] {
    const path = [];
    let node: HeightMapCellNode = this;
    while (node.parent != null) {
      path.unshift(node);
      node = node.parent;
    }
    path.unshift(node);
    return path;
  }
}
