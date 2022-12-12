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

  public findPath(): HeightMapCell[] {
    const path: HeightMapCell[] = [];

    return path;
  }

  public getStartCell(): HeightMapCell {
    return this.cells.flat().find((cell) => cell.isStart === true);
  }

  public getValidAdyacentCellsFrom(cell: HeightMapCell): HeightMapCell[] {
    const adyacentCells = this._getAdyacentCells(cell);
    return adyacentCells.filter((adyCell) => {
      const difHeight = Math.abs(adyCell.height - cell.height);
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
      const cell = new HeightMapCell(27);
      cell.isEnd = true;
      return cell;
    }

    const height = char.charCodeAt(0) - "a".charCodeAt(0) + 1;
    const cell = new HeightMapCell(height);
    return cell;
  }
}
