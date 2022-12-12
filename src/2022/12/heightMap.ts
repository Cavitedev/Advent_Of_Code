import { HeightMapCellNode, HeightMapSearch } from "./heightMapSearch.js";

export class HeightMap {
  public cells: HeightMapCell[][];

  constructor() {
    this.cells = [];
  }

  public readLine(line: string) {
    const cellsRow: HeightMapCell[] = [];

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const cell = HeightMapCell.FromChar(char);
      cell.i = this.cells.length;
      cell.j = cellsRow.length;
      cellsRow.push(cell);
    }
    this.cells.push(cellsRow);
  }

  public findPathBacktracking(): HeightMapCell[] {
    const path: HeightMapCell[] = [];
    const startCell = this.getStartCell();
    path.push(startCell);
    // -1 untested, 0 left, 1 up, 2 right, 3 down, 4 backtracking
    const dirsTried: number[] = [-1];
    let bestSol = 100;
    let bestPath: HeightMapCell[] = [];

    while (path.length > 0) {
      const index = path.length - 1;
      dirsTried[index] += 1;
      const dirTried = dirsTried[index];
      if (dirTried === 4) {
        path.pop();
        dirsTried.pop();
        continue;
      }

      const currentCell = path[index];
      const validAdyacentCells = this.getValidAdyacentCellsFrom(currentCell);

      let i = currentCell.i;
      let j = currentCell.j;
      if (dirTried === 0) {
        j -= 1;
      } else if (dirTried === 1) {
        i -= 1;
      } else if (dirTried === 2) {
        j += 1;
      } else if (dirTried === 3) {
        i += 1;
      }

      const nextCell = validAdyacentCells.find(
        (cell) => cell.i === i && cell.j === j
      );

      if (path.includes(nextCell)) {
        continue;
      }

      if (nextCell) {
        path.push(nextCell);

        if (nextCell.isEnd) {
          bestPath = [...path];
          bestSol = bestPath.length;
          path.pop();
          continue;
        }

        if (path.length >= bestSol) {
          path.pop();
          continue;
        }

        dirsTried.push(-1);
      }
    }

    return bestPath;
  }

  public findPathAStarFromStart(anyStartPosition: boolean): HeightMapCell[] {
    const search = new HeightMapSearch(this);
    const cells = search.findPathAStarFromStart(anyStartPosition);

    return cells.map((cell) => cell.refCell);
  }

  public getStartCell(): HeightMapCell {
    return this.cells.flat().find((cell) => cell.isStart === true);
  }

  public getEndCell(): HeightMapCell {
    return this.cells.flat().find((cell) => cell.isEnd === true);
  }

  public getValidAdyacentCellsFrom(cell: HeightMapCell): HeightMapCell[] {
    const adyacentCells = this._getAdyacentCells(cell);
    return adyacentCells.filter((adyCell) => {
      const difHeight = adyCell.height - cell.height;
      return difHeight <= 1;
    });
  }

  private _getAdyacentCells(cell: HeightMapCell): HeightMapCell[] {
    const adyacentCells: HeightMapCell[] = [];
    const i = cell.i;
    const j = cell.j;
    if (this._isValidPos(i - 1, j)) {
      adyacentCells.push(this.cells[i - 1][j]);
    }
    if (this._isValidPos(i + 1, j)) {
      adyacentCells.push(this.cells[i + 1][j]);
    }
    if (this._isValidPos(i, j - 1)) {
      adyacentCells.push(this.cells[i][j - 1]);
    }
    if (this._isValidPos(i, j + 1)) {
      adyacentCells.push(this.cells[i][j + 1]);
    }

    return adyacentCells;
  }

  private _isValidPos(i: number, j: number): boolean {
    return (
      i >= 0 && i < this.cells.length && j >= 0 && j < this.cells[0].length
    );
  }
}

export class HeightMapCell {
  public height: number;
  public isStart: boolean;
  public isEnd: boolean;
  public i: number;
  public j: number;

  constructor(height: number) {
    this.height = height;
    this.isStart = false;
    this.isEnd = false;
  }

  public static FromChar(char: string): HeightMapCell {
    if (char === "S") {
      const cell = new HeightMapCell(1);
      cell.isStart = true;
      return cell;
    }

    if (char === "E") {
      const cell = new HeightMapCell(26);
      cell.isEnd = true;
      return cell;
    }

    const height = char.charCodeAt(0) - "a".charCodeAt(0) + 1;
    const cell = new HeightMapCell(height);
    return cell;
  }
}
