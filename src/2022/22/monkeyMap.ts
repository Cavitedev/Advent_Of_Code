import {
  EmptyCell,
  MapCell,
  UnexistentCell,
  WallCell,
} from "./cellsMonkeyMap.js";
import { Direction, Right } from "./direction.js";

export class MonkeyMap {
  public cells: MapCell[][];

  constructor() {
    this.cells = [];
  }

  public readMapLine(line: string) {
    const row: MapCell[] = [];
    const rowNum = this.cells.length;
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === " ") {
        row.push(new UnexistentCell(rowNum, j));
      } else if (char === ".") {
        row.push(new EmptyCell(rowNum, j));
      } else if (char === "#") {
        row.push(new WallCell(rowNum, j));
      }
    }

    this.cells.push(row);
  }

  public finishReading() {
    const maxRowLength = Math.max(...this.cells.map((row) => row.length));

    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = row.length; j < maxRowLength; j++) {
        row.push(new UnexistentCell(i, j));
      }
    }
  }

  public connectedCellDir(cell: MapCell, dir: Direction): MapCell {
    let adyCell: MapCell = cell;
    do {
      adyCell = dir.adySeamless<MapCell>(adyCell.row, adyCell.column, this.cells);
    } while (!adyCell.exists);

    return adyCell;
  }

  public cellAfterNMovementsDir(
    cell: MapCell,
    movements: number,
    dir: Direction
  ): MapCell {
    let moveCell = cell;
    for (let i = 0; i < movements; i++) {
      const nextCell = this.connectedCellDir(moveCell, dir);
      if (!nextCell.canTravel) {
        return moveCell;
      }
      moveCell = nextCell;
    }

    return moveCell;
  }

  public getFirstCell() {
    return this.cells[0].find((c) => c.exists && c.canTravel);
  }
}
