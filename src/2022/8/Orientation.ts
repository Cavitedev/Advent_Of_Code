import { Tree, VisibilityDirection } from "./Tree.js";

export abstract class Orientation {
  public abstract getVisibility(tree: Tree): VisibilityDirection;

  /**
   * Returns elements from certain point in a matrix towards that orientation
   * @param i row index
   * @param j column index
   * @param matrix
   */
  public abstract matrixElements<T>(i: number, j: number, matrix: T[][]): T[];
}

export class West extends Orientation {
  private static _instance: West;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public getVisibility(tree: Tree) {
    return tree.visibilityDirections[0];
  }

  public matrixElements<T>(i: number, j: number, matrix: T[][]): T[] {
    const elements: T[] = [];

    for (let jIndex = j - 1; jIndex >= 0; jIndex--) {
      elements.push(matrix[i][jIndex]);
    }

    return elements;
  }
}

export class North extends Orientation {
  private static _instance: North;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public getVisibility(tree: Tree) {
    return tree.visibilityDirections[1];
  }

  public matrixElements<T>(i: number, j: number, matrix: T[][]): T[] {
    const elements: T[] = [];

    for (let iIndex = i - 1; iIndex >= 0; iIndex--) {
      elements.push(matrix[iIndex][j]);
    }

    return elements;
  }
}

export class East extends Orientation {
  private static _instance: East;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public getVisibility(tree: Tree) {
    return tree.visibilityDirections[2];
  }

  public matrixElements<T>(i: number, j: number, matrix: T[][]): T[] {
    const elements: T[] = [];

    for (let jIndex = j + 1; jIndex < matrix[i].length; jIndex++) {
      elements.push(matrix[i][jIndex]);
    }

    return elements;
  }
}

export class South extends Orientation {
  private static _instance: South;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public getVisibility(tree: Tree) {
    return tree.visibilityDirections[3];
  }

  public matrixElements<T>(i: number, j: number, matrix: T[][]): T[] {
    const elements: T[] = [];

    for (let iIndex = i + 1; iIndex < matrix.length; iIndex++) {
      elements.push(matrix[iIndex][j]);
    }

    return elements;
  }
}
