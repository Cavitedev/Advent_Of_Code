import { Direction, Down, Left, Right, Up } from "./direction.js";

export class BlizzardState {
  public cells: BlizzardCell[][] = [];

  public static FromCells(cells: BlizzardCell[][]): BlizzardState {
    const blizzard = new BlizzardState();
    blizzard.cells = cells;
    return blizzard;
  }

  public readLine(line: string) {
    const row: BlizzardCell[] = [];

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      let cell = new BlizzardCell();
      if (char === "#") {
        cell = new WallCell();
      } else if (char === ".") {
        if (this.cells.length === 0) {
          cell.isStart = true;
        } else if (i > 2 && line[i - 2] === "#") {
          cell.isEnd = true;
        }
      } else if (char === "<") {
        cell.blizzards = [Left.Instance];
      } else if (char === ">") {
        cell.blizzards = [Right.Instance];
      } else if (char === "v") {
        cell.blizzards = [Down.Instance];
      } else if (char === "^") {
        cell.blizzards = [Up.Instance];
      }
      row.push(cell);
    }

    this.cells.push(row);
  }

  public nextState(): BlizzardState {
    const cellsCopy: BlizzardCell[][] = [this.cells[0]];

    for (let i = 1; i < this.cells.length - 1; i++) {
      const row: BlizzardCell[] = [new WallCell()];
      for (let j = 1; j < this.cells[0].length - 1; j++) {
        row.push(new BlizzardCell());
      }
      row.push(new WallCell());
      cellsCopy.push(row);
    }
    cellsCopy.push(this.cells[this.cells.length - 1]);

    for (let i = 1; i < this.cells.length - 1; i++) {
      for (let j = 1; j < this.cells[0].length - 1; j++) {
        const cell = this.cells[i][j];
        for (const blizDir of cell.blizzards) {
          const [posI, posJ] = this._nextBlizPos(i, j, blizDir);
          cellsCopy[posI][posJ].blizzards.push(blizDir);
        }
      }
    }

    return BlizzardState.FromCells(cellsCopy);
  }
  private _nextBlizPos(
    i: number,
    j: number,
    blizDir: Direction
  ): [number, number] {
    let nextI: number = i;
    let nextJ: number = j;
    let nextCell: BlizzardCell;
    do {
      [nextI, nextJ] = blizDir.adySeamlessIndex(nextI, nextJ, this.cells);
      nextCell = this.cells[nextI][nextJ];
    } while (nextCell.isWall);

    return [nextI, nextJ];
  }
}

export class BlizzardCell {
  public blizzards: Direction[] = [];
  public isStart: boolean;
  public isEnd: boolean;

  public get isWall(): boolean {
    return false;
  }
  public get canWalk(): boolean {
    return !this.isWall && this.blizzards.length === 0;
  }
}
export class WallCell extends BlizzardCell {
  public get isWall(): boolean {
    return true;
  }
}
