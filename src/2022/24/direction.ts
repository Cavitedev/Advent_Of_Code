export abstract class Direction {
  public static Directions(): Direction[] {
    return [Left.Instance, Up.Instance, Right.Instance, Down.Instance];
  }

  public abstract adySeamlessIndex<T>(
    i: number,
    j: number,
    matrix: T[][]
  ): [number, number];
}

export class Left extends Direction {
  private static _instance: Left;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public adySeamlessIndex<T>(
    i: number,
    j: number,
    matrix: T[][]
  ): [number, number] {
    if (j > 0) {
      return [i, j - 1];
    } else {
      return [i, matrix[i].length - 1];
    }
  }
}

export class Up extends Direction {
  private static _instance: Up;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public adySeamlessIndex<T>(
    i: number,
    j: number,
    matrix: T[][]
  ): [number, number] {
    if (i > 0) {
      return [i - 1, j];
    } else {
      return [matrix.length - 1, j];
    }
  }
}

export class Right extends Direction {
  private static _instance: Right;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public adySeamlessIndex<T>(
    i: number,
    j: number,
    matrix: T[][]
  ): [number, number] {
    if (j < matrix[i].length - 1) {
      return [i, j + 1];
    } else {
      return [i, 0];
    }
  }
}

export class Down extends Direction {
  private static _instance: Up;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public adySeamlessIndex<T>(
    i: number,
    j: number,
    matrix: T[][]
  ): [number, number] {
    if (i < matrix.length - 1) {
      return [i + 1, j];
    } else {
      return [0, j];
    }
  }
}
