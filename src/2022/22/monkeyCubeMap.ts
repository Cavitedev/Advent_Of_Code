import { ExistentCell, MapCell, UnexistentCell } from "./cellsMonkeyMap.js";
import { CubeSide, UpCubeSide } from "./cubeSide.js";
import { Direction, Down, Left, Right, Up } from "./direction.js";
import { MonkeyMap } from "./monkeyMap.js";

export class MonkeyCubeMap extends MonkeyMap {
  public cubeFaces: CubeFace[] = [];

  public finishReading() {
    const cellCount = this.cells.flat().filter((c) => c.exists).length;
    const cubeSize = Math.sqrt(cellCount / 6);

    this._addCubeFaces(cubeSize);

    this._connectAdyacentFaces();

    this.cubeFaces[0].setCubeSide(UpCubeSide.Instance);

    for (const cubeFace of this.cubeFaces) {
      for (const unconnectedDir of cubeFace.unconnectedDirs()) {
        const requiredSide = cubeFace.cubeSide.connectedSide(unconnectedDir);
        const requiredFace = this.getCubeFaceGivenSide(requiredSide);
        cubeFace.addAdyFaceMutually(requiredFace, unconnectedDir);
      }
    }
  }

  private _addCubeFaces(cubeSize: number) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell && cell.exists) {
          const existCell = cell as ExistentCell;
          if (!existCell.cube) {
            this._addCubeFace(i, j, cubeSize);
          }
        }
      }
    }
  }

  private _addCubeFace(row: number, col: number, length: number) {
    const cubeCells: ExistentCell[][] = [];
    const cube = new CubeFace();
    cube.startRow = row;
    cube.startCol = col;
    for (let i = row; i < row + length; i++) {
      const mapRow: ExistentCell[] = [];
      for (let j = col; j < col + length; j++) {
        const cell = this.cells[i][j] as ExistentCell;
        cell.cube = cube;
        mapRow.push(cell);
      }
      cubeCells.push(mapRow);
    }

    cube.cells = cubeCells;
    this.cubeFaces.push(cube);
  }

  private _connectAdyacentFaces() {
    for (const cubeFace of this.cubeFaces) {
      for (const corner of cubeFace.corners()) {
        for (const dir of cubeFace.unconnectedDirs()) {
          const adyCell = dir.ady(corner.row, corner.column, this.cells);
          if (
            adyCell &&
            adyCell instanceof ExistentCell &&
            adyCell.cube != corner.cube
          ) {
            cubeFace.addAdyFaceMutually(adyCell.cube, dir);
          }
        }
      }
    }
  }

  public getCubeFaceGivenSide(side: CubeSide) {
    return this.cubeFaces.find((c) => c.cubeSide === side);
  }

  public connectedCellDir(cell: MapCell, dir: Direction): MapCell {
    const castedCell: ExistentCell = cell as ExistentCell;
    const adyCell = castedCell.cube.adyCell(castedCell, dir);

    return adyCell;
  }
}

export class CubeFace {
  public cells: ExistentCell[][];
  public adyFaces: AdyCube[] = [];
  public cubeSide: CubeSide;
  public startRow: number;
  public startCol: number;

  public adyCell(cell: ExistentCell, dir: Direction): ExistentCell {
    return dir.adyInCube(cell);
  }

  public adyCellLeft(cell: ExistentCell): ExistentCell {
    const [row, col] = this.getRelativeCoordinates(cell);

    if (col === 0) {
      const leftCube = this.cubeFaceAtDir(Left.Instance);
      const cubeSize = leftCube.cubeSize();
      return leftCube.cells[row][cubeSize - 1];
    } else {
      return this.cells[row][col - 1];
    }
  }

  public adyCellUp(cell: ExistentCell): ExistentCell {
    const [row, col] = this.getRelativeCoordinates(cell);

    if (row === 0) {
      const upCube = this.cubeFaceAtDir(Up.Instance);
      const cubeSize = upCube.cubeSize();
      return upCube.cells[cubeSize - 1][col];
    } else {
      return this.cells[row - 1][col];
    }
  }

  public adyCellRight(cell: ExistentCell): ExistentCell {
    const [row, col] = this.getRelativeCoordinates(cell);

    if (col === this.cubeSize() - 1) {
      const rightCube = this.cubeFaceAtDir(Right.Instance);
      return rightCube.cells[row][0];
    } else {
      return this.cells[row][col + 1];
    }
  }

  public adyCellDown(cell: ExistentCell): ExistentCell {
    const [row, col] = this.getRelativeCoordinates(cell);

    if (row === this.cubeSize() - 1) {
      const downCube = this.cubeFaceAtDir(Down.Instance);
      return downCube.cells[0][col];
    } else {
      return this.cells[row + 1][col];
    }
  }

  public getRelativeCoordinates(cell: ExistentCell): number[] {
    const row = cell.row - this.startRow;
    const col = cell.column - this.startCol;
    return [row, col];
  }

  public corners(): ExistentCell[] {
    const lastIndex = this.cubeSize() - 1;
    const upLeft = this.cells[0][0];
    const upRight = this.cells[0][lastIndex];
    const downLeft = this.cells[lastIndex][0];
    const downRight = this.cells[lastIndex][lastIndex];

    return [upLeft, upRight, downRight, downLeft];
  }

  public cubeSize(): number {
    return this.cells.length;
  }

  public unconnectedDirs(): Direction[] {
    const usedDirs = this.adyFaces.map((adyC) => adyC.dir);
    return Direction.Directions().filter((d) => !usedDirs.includes(d));
  }

  public cubeFaceAtDir(dir: Direction) {
    return this.adyFaces.find((adyC) => adyC.dir === dir).cubeFace;
  }

  public addAdyFace(otherCubeFace: CubeFace, conDir: Direction) {
    const existCon = this.adyFaces.find((c) => c.dir === conDir);
    if (!existCon) {
      const thisConnection = new AdyCube(otherCubeFace, conDir);
      this.adyFaces.push(thisConnection);
    }
  }

  public addAdyFaceMutually(otherCubeFace: CubeFace, conDir: Direction) {
    this.addAdyFace(otherCubeFace, conDir);
    otherCubeFace.addAdyFace(this, conDir.opposite);
  }

  public setCubeSide(cubeSide: CubeSide) {
    if (this.cubeSide) return;
    this.cubeSide = cubeSide;

    for (const adyFace of this.adyFaces) {
      const otherSide = cubeSide.connectedSide(adyFace.dir);
      adyFace.cubeFace.setCubeSide(otherSide);
    }
  }
}

export class AdyCube {
  public cubeFace: CubeFace;
  public dir: Direction;

  constructor(cubeFace: CubeFace, dir: Direction) {
    this.cubeFace = cubeFace;
    this.dir = dir;
  }
}
