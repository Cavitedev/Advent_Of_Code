export abstract class Direction {
  public static Directions(): Direction[] {
    return [Left.Instance, Up.Instance, Right.Instance, Down.Instance];
  }

  public abstract get moveRight(): Direction;
  public abstract get moveLeft(): Direction;
  public abstract get value(): number;
  public abstract ady<T>(i: number, j: number, cells: T[][]): T;
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

  public get value(): number {
    return 2;
  }

  public ady<T>(i: number, j: number, cells: T[][]): T {
    if (j > 0) {
      return cells[i][j - 1];
    } else {
      return cells[i][cells[i].length - 1];
    }
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

  public get value(): number {
    return 3;
  }

  public ady<T>(i: number, j: number, cells: T[][]): T {
    if (i > 0) {
      return cells[i - 1][j];
    } else {
      return cells[cells.length - 1][j];
    }
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

  public get value(): number {
    return 0;
  }

  public ady<T>(i: number, j: number, cells: T[][]): T {
    if (j < cells[i].length - 1) {
      return cells[i][j + 1];
    } else {
      return cells[i][0];
    }
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

  public get value(): number {
    return 1;
  }

  public ady<T>(i: number, j: number, cells: T[][]): T {
    if (i < cells.length - 1) {
      return cells[i + 1][j];
    } else {
      return cells[0][j];
    }
  }
}
