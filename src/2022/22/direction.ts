import { ExistentCell } from "./cellsMonkeyMap.js";
import { CubeSide } from "./cubeSide.js";
import { WalkingPerson } from "./monkeyPath.js";

export abstract class Direction {
  public static Directions(): Direction[] {
    return [Left.Instance, Up.Instance, Right.Instance, Down.Instance];
  }

  public abstract get moveRight(): Direction;
  public abstract get moveLeft(): Direction;
  public abstract get opposite(): Direction;
  public abstract get value(): number;
  public abstract get numberOfRightRotations(): number;
  public abstract get numberOfRightRotationsForMatrixSide(): number;
  public abstract get directionStandard(): boolean;
  public abstract ady<T>(i: number, j: number, matrix: T[][]): T;
  public abstract adySeamless<T>(i: number, j: number, matrix: T[][]): T;
  public abstract line<T>(matrix: T[][]): T[];
  public abstract adyInCube(
    cell: ExistentCell,
    person: WalkingPerson
  ): ExistentCell;
  public abstract conSide(cube: CubeSide): CubeSide;

  public rotation(dir: Direction): Direction {
    if (this === dir) {
      return Up.Instance;
    }
    dir = dir.moveLeft;
    if (this === dir) {
      return Left.Instance;
    }

    dir = dir.moveLeft;
    if (this === dir) {
      return Down.Instance;
    }

    dir = dir.moveLeft;
    if (this === dir) {
      return Right.Instance;
    }
  }

  public rotateRightNTimes(times: number): Direction {
    let rotDir: Direction = this;
    if (times >= 0) {
      for (let i = 0; i < times; i++) {
        rotDir = rotDir.moveRight;
      }
    } else {
      for (let i = 0; i < -times; i++) {
        rotDir = rotDir.moveLeft;
      }
    }

    return rotDir;
  }

  public rotate(dir: Direction): Direction {
    let rotDir: Direction = this;
    for (let i = 0; i < dir.numberOfRightRotations; i++) {
      rotDir = rotDir.moveRight;
    }
    return rotDir;
  }

  public matrixSide(dir: Direction): Direction {
    let rotDir: Direction = this;
    for (let i = 0; i < dir.numberOfRightRotationsForMatrixSide; i++) {
      rotDir = rotDir.moveRight;
    }
    return rotDir;
  }
}

export class Left extends Direction {
  private static _instance: Left;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get moveRight(): Direction {
    return Up.Instance;
  }
  public get moveLeft(): Direction {
    return Down.Instance;
  }

  public get opposite(): Direction {
    return Right.Instance;
  }

  public get value(): number {
    return 2;
  }

  public get numberOfRightRotations(): number {
    return 3;
  }

  public get numberOfRightRotationsForMatrixSide(): number {
    return 3;
  }

  public get directionStandard(): boolean {
    return false;
  }

  public ady<T>(i: number, j: number, matrix: T[][]): T {
    return matrix?.[i]?.[j - 1];
  }

  public adySeamless<T>(i: number, j: number, matrix: T[][]): T {
    if (j > 0) {
      return matrix[i][j - 1];
    } else {
      return matrix[i][matrix[i].length - 1];
    }
  }

  public line<T>(matrix: T[][]): T[] {
    return matrix.map((r) => r[0]);
  }

  public adyInCube(cell: ExistentCell, person: WalkingPerson): ExistentCell {
    return cell.cube.adyCellLeft(cell, person);
  }

  public conSide(cube: CubeSide): CubeSide {
    return cube.left;
  }
}

export class Up extends Direction {
  private static _instance: Up;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get moveRight(): Direction {
    return Right.Instance;
  }
  public get moveLeft(): Direction {
    return Left.Instance;
  }

  public get opposite(): Direction {
    return Down.Instance;
  }

  public get value(): number {
    return 3;
  }

  public get numberOfRightRotations(): number {
    return 0;
  }

  public get numberOfRightRotationsForMatrixSide(): number {
    return 0;
  }

  public get directionStandard(): boolean {
    return true;
  }

  public ady<T>(i: number, j: number, matrix: T[][]): T {
    return matrix?.[i - 1]?.[j];
  }

  public adySeamless<T>(i: number, j: number, matrix: T[][]): T {
    if (i > 0) {
      return matrix[i - 1][j];
    } else {
      return matrix[matrix.length - 1][j];
    }
  }

  public line<T>(matrix: T[][]): T[] {
    return matrix[0];
  }

  public adyInCube(cell: ExistentCell, person: WalkingPerson): ExistentCell {
    return cell.cube.adyCellUp(cell, person);
  }

  public conSide(cube: CubeSide): CubeSide {
    return cube.up;
  }
}

export class Right extends Direction {
  private static _instance: Right;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get moveRight(): Direction {
    return Down.Instance;
  }
  public get moveLeft(): Direction {
    return Up.Instance;
  }

  public get opposite(): Direction {
    return Left.Instance;
  }

  public get value(): number {
    return 0;
  }

  public get numberOfRightRotations(): number {
    return 1;
  }

  public get numberOfRightRotationsForMatrixSide(): number {
    return 1;
  }

  public get directionStandard(): boolean {
    return true;
  }

  public ady<T>(i: number, j: number, matrix: T[][]): T {
    return matrix?.[i]?.[j + 1];
  }

  public adySeamless<T>(i: number, j: number, matrix: T[][]): T {
    if (j < matrix[i].length - 1) {
      return matrix[i][j + 1];
    } else {
      return matrix[i][0];
    }
  }

  public line<T>(matrix: T[][]): T[] {
    const lastCol = matrix[0].length - 1;
    return matrix.map((r) => r[lastCol]);
  }

  public adyInCube(cell: ExistentCell, person: WalkingPerson): ExistentCell {
    return cell.cube.adyCellRight(cell, person);
  }

  public conSide(cube: CubeSide): CubeSide {
    return cube.right;
  }
}

export class Down extends Direction {
  private static _instance: Up;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get moveRight(): Direction {
    return Left.Instance;
  }
  public get moveLeft(): Direction {
    return Right.Instance;
  }

  public get opposite(): Direction {
    return Up.Instance;
  }

  public get value(): number {
    return 1;
  }

  public get numberOfRightRotations(): number {
    return 2;
  }

  public get numberOfRightRotationsForMatrixSide(): number {
    return 0;
  }

  public get directionStandard(): boolean {
    return false;
  }

  public ady<T>(i: number, j: number, matrix: T[][]): T {
    return matrix?.[i + 1]?.[j];
  }

  public adySeamless<T>(i: number, j: number, matrix: T[][]): T {
    if (i < matrix.length - 1) {
      return matrix[i + 1][j];
    } else {
      return matrix[0][j];
    }
  }

  public line<T>(matrix: T[][]): T[] {
    const lastRow = matrix.length - 1;
    return matrix[lastRow];
  }

  public adyInCube(cell: ExistentCell, person: WalkingPerson): ExistentCell {
    return cell.cube.adyCellDown(cell, person);
  }

  public conSide(cube: CubeSide): CubeSide {
    return cube.down;
  }
}
