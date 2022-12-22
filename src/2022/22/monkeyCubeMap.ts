import { Dir } from "fs";
import { ExistentCell, MapCell, UnexistentCell } from "./cellsMonkeyMap.js";
import {
  BackCubeSide,
  CubeSide,
  LeftCubeSide,
  RightCubeSide,
  UpCubeSide,
} from "./cubeSide.js";
import { Direction, Down, Left, Right, Up } from "./direction.js";
import { MonkeyMap } from "./monkeyMap.js";
import { WalkingPerson } from "./monkeyPath.js";

export class MonkeyCubeMap extends MonkeyMap {
  public cubeFaces: CubeFace[] = [];

  public finishReading() {
    const cellCount = this.cells.flat().filter((c) => c.exists).length;
    const cubeSize = Math.sqrt(cellCount / 6);

    this._addCubeFaces(cubeSize);

    this._connectAdyacentFaces();

    this.cubeFaces[0].setCubeSide(UpCubeSide.Instance);

    this.cubeFaces[0].matrixOrientation = Up.Instance;
    this.cubeFaces[0].fillMatrixOrientation();

    for (const cubeFace of this.cubeFaces) {
      for (const unconnectedDir of cubeFace.unconnectedDirs()) {
        const requiredSide = cubeFace.cubeSide.connectedSide(unconnectedDir);
        const requiredFace = this.getCubeFaceGivenSide(requiredSide);
        cubeFace.addAdyFaceUndirectlyConnected(requiredFace);
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
    this.cubeFaces[0].matrixOrientation = Up.Instance;
    const checkCubes = [this.cubeFaces[0]];

    while (checkCubes.length > 0) {
      const cubeFace = checkCubes.shift();
      for (const corner of cubeFace.corners()) {
        for (const dir of cubeFace.unconnectedDirs()) {
          const adyCell = dir.ady(corner.row, corner.column, this.cells);
          if (
            adyCell &&
            adyCell instanceof ExistentCell &&
            adyCell.cube != corner.cube
          ) {
            const wasNewFace = cubeFace.addAdyFaceDirectlyConnected(
              adyCell.cube,
              dir
            );
            if (wasNewFace) {
              checkCubes.push(adyCell.cube);
            }
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
    const adyCell = castedCell.cube.adyCell(castedCell, dir, this.person);

    return adyCell;
  }
}

export class CubeFace {
  public cells: ExistentCell[][];
  public adyFaces: AdyCube[] = [];
  public cubeSide: CubeSide;
  public startRow: number;
  public startCol: number;
  public matrixOrientation: Direction;

  public adyCell(
    cell: ExistentCell,
    dir: Direction,
    person: WalkingPerson
  ): ExistentCell {
    // const rotatedDir = dir.rotateRightNTimes(
    //   -this.matrixOrientation.numberOfRightRotations
    // );
    return dir.adyInCube(cell, person);
  }

  public adyCellLeft(cell: ExistentCell, person: WalkingPerson): ExistentCell {
    const [row, col] = this.getRelativeCoordinates(cell);

    if (col === 0) {
      const nextFace = this.adyAtDir(Left.Instance);
      const nextCell = nextFace.elementAtIndex(this, row, person);
      return nextCell ?? cell;
    } else {
      return this.cells[row][col - 1];
    }
  }

  public adyCellUp(cell: ExistentCell, person: WalkingPerson): ExistentCell {
    const [row, col] = this.getRelativeCoordinates(cell);

    if (row === 0) {
      const nextFace = this.adyAtDir(Up.Instance);
      const nextCell = nextFace.elementAtIndex(this, col, person);
      return nextCell ?? cell;
    } else {
      return this.cells[row - 1][col];
    }
  }

  public adyCellRight(cell: ExistentCell, person: WalkingPerson): ExistentCell {
    const [row, col] = this.getRelativeCoordinates(cell);

    if (col === this.cubeSize() - 1) {
      const nextFace = this.adyAtDir(Right.Instance);
      const nextCell = nextFace.elementAtIndex(this, row, person);
      return nextCell ?? cell;
    } else {
      return this.cells[row][col + 1];
    }
  }

  public adyCellDown(cell: ExistentCell, person: WalkingPerson): ExistentCell {
    const [row, col] = this.getRelativeCoordinates(cell);

    if (row === this.cubeSize() - 1) {
      const nextFace = this.adyAtDir(Down.Instance);
      const nextCell = nextFace.elementAtIndex(this, col, person);
      return nextCell ?? cell;
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
    const downRight = this.cells[lastIndex][lastIndex];
    const downLeft = this.cells[lastIndex][0];

    return [upLeft, upRight, downRight, downLeft];
  }

  public cubeSize(): number {
    return this.cells.length;
  }

  public unconnectedDirs(): Direction[] {
    const usedDirs = this.adyFaces.map((adyC) => adyC.dir);
    return Direction.Directions().filter((d) => !usedDirs.includes(d));
  }

  public adyAtDir(dir: Direction): AdyCube {
    return this.adyFaces.find((adyC) => adyC.dir === dir);
  }

  public cubeFaceAtDir(dir: Direction) {
    return this.adyAtDir(dir).cubeFace;
  }

  public addAdyFaceDirectlyConnected(
    otherCubeFace: CubeFace,
    conDir: Direction
  ): boolean {
    const existCon = this.adyFaces.find((c) => c.dir === conDir);
    if (existCon) return false;

    this._addAdyFace(otherCubeFace, conDir, conDir);
    otherCubeFace._addAdyFace(this, conDir.opposite, conDir.opposite);

    return true;
  }

  public fillMatrixOrientation() {
    for (const adyFace of this.adyFaces) {
      const otherCubeFace = adyFace.cubeFace;
      if (!otherCubeFace.matrixOrientation) {
        let orientationBetweenFaces = otherCubeFace.cubeSide.dirToSide(
          this.cubeSide
        );
        let upLine = orientationBetweenFaces.matrixSide(adyFace.endDirLine);

        otherCubeFace.matrixOrientation = upLine;
        otherCubeFace.fillMatrixOrientation();
      }
    }
  }

  public addAdyFaceUndirectlyConnected(other: CubeFace) {
    const rotationThis = -this.matrixOrientation.numberOfRightRotations;
    const towardsDir = this.cubeSide.dirToSide(other.cubeSide);
    const towardsDirNorm = towardsDir.rotateRightNTimes(rotationThis);

    const rotationOther = -other.matrixOrientation.numberOfRightRotations;
    const backwardsDir = other.cubeSide.dirToSide(this.cubeSide);
    const backwardsDirNorm = backwardsDir.rotateRightNTimes(rotationOther);

    // towards dir - orientation = line to pick
    const endDirLine = towardsDir.rotation(this.matrixOrientation);
    // backwards dir - other orientation = line to pick
    const otherEndDirLine = backwardsDir.rotation(other.matrixOrientation);

    this._addAdyFace(other, towardsDirNorm, endDirLine);
    other._addAdyFace(this, backwardsDirNorm, otherEndDirLine);
  }

  private _addAdyFace(
    otherCubeFace: CubeFace,
    conDir: Direction,
    endDirLine: Direction
  ) {
    const existCon = this.adyFaces.find((c) => c.dir === conDir);
    if (!existCon) {
      const thisConnection = new AdyCube(otherCubeFace, conDir);
      thisConnection.endDirLine = endDirLine;
      this.adyFaces.push(thisConnection);
    }
  }

  public setCubeSide(cubeSide: CubeSide) {
    if (this.cubeSide) return;
    this.cubeSide = cubeSide;

    for (const adyFace of this.adyFaces) {
      const otherSide = cubeSide.connectedSide(adyFace.dir);
      if (this.cubeSide === LeftCubeSide.Instance) {
        adyFace.cubeFace.setCubeSide(BackCubeSide.Instance);
      } else {
        adyFace.cubeFace.setCubeSide(otherSide);
      }
    }
  }
}

export class AdyCube {
  public cubeFace: CubeFace;
  public dir: Direction;
  public endDirLine: Direction;

  constructor(cubeFace: CubeFace, dir: Direction) {
    this.cubeFace = cubeFace;
    this.dir = dir;
  }

  public elementAtIndex(
    currentCubeFace: CubeFace,
    index: number,
    person: WalkingPerson
  ): ExistentCell {
    const line = this.line(currentCubeFace);

    const dirInFace = this.cubeFace.cubeSide.dirToSide(
      currentCubeFace.cubeSide
    );

    const rotationLine = dirInFace.rotation(this.cubeFace.matrixOrientation);
    const rotation = this.endDirLine.rotation(rotationLine);

    let nextCell: ExistentCell;
    if (this.endDirLine.directionStandard != rotationLine.directionStandard) {
      nextCell = line[index];
    } else {
      nextCell = line[line.length - 1 - index];
    }

    if (nextCell.canTravel) {
      person.dir = rotationLine.opposite;
      return nextCell;
    }

    return null;
  }

  public line(currentCubeFace: CubeFace) {
    const dirInFace = this.cubeFace.cubeSide.dirToSide(
      currentCubeFace.cubeSide
    );

    const rotation = dirInFace.rotation(this.cubeFace.matrixOrientation);

    const line = rotation.line(this.cubeFace.cells);
    return line;
  }
}
