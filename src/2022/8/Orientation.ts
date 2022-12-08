import { Tree, VisibilityDirection } from "./Tree.js";

export abstract class Orientation {
  public abstract opposite(): Orientation;
  public abstract getVisibility(tree: Tree): VisibilityDirection;

  /**
   * Updates visibility on certain orientation on a row or column in tree matrix
   * @param lineIndex Row or column index to check
   * @param trees  Tree matrix
   */
  public checkVisibility(lineIndex: number, trees: Tree[][]): void {
    const lineTrees = this.opposite().getLine(lineIndex, trees);
    let maxHeight = -1;
    for (const tree of lineTrees) {
      const height = tree.height;
      const isVisible = height > maxHeight;
      if (isVisible) {
        maxHeight = height;
      }
      this.getVisibility(tree).isVisible = isVisible;
    }
  }

  /**
   * Returns elements from certain point in a matrix towards that orientation
   * @param i Row index
   * @param j Column index
   * @param matrix
   */
  public abstract matrixElements<T>(i: number, j: number, matrix: T[][]): T[];

  /**
   * Returns entire line of matrix moving towards orientation
   * @param lineIndex
   * @param matrix
   */
  public abstract getLine<T>(lineIndex: number, matrix: T[][]): T[];
}

export class West extends Orientation {
  private static _instance: West;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public opposite(): Orientation {
    return East.Instance;
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

  public getLine<T>(lineIndex: number, matrix: T[][]): T[] {
    return this.matrixElements(lineIndex, matrix[lineIndex].length, matrix);
  }
}

export class North extends Orientation {
  private static _instance: North;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public opposite(): Orientation {
    return South.Instance;
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

  public getLine<T>(lineIndex: number, matrix: T[][]): T[] {
    return this.matrixElements(matrix.length, lineIndex, matrix);
  }
}

export class East extends Orientation {
  private static _instance: East;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public opposite(): Orientation {
    return West.Instance;
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

  public getLine<T>(lineIndex: number, matrix: T[][]): T[] {
    return this.matrixElements(lineIndex, -1, matrix);
  }
}

export class South extends Orientation {
  private static _instance: South;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public opposite(): Orientation {
    return North.Instance;
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

  public getLine<T>(lineIndex: number, matrix: T[][]): T[] {
    return this.matrixElements(-1, lineIndex, matrix);
  }
}
