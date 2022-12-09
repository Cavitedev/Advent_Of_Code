import { Coordinate } from "./bridge.js";

export abstract class Direction {
  public abstract get dirLetter(): string;
  public abstract get moveCoordinate(): Coordinate;

  public static Directions(): Direction[] {
    return [Left.Instance, Up.Instance, Right.Instance, Down.Instance];
  }

  public static FromLetter(letter: string): Direction {
    return Direction.Directions().find((dir) => dir.dirLetter == letter);
  }
}

export class Left extends Direction {
  private static _instance: Left;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
  public get dirLetter(): string {
    return "L";
  }

  public get moveCoordinate(): Coordinate {
    return new Coordinate(-1, 0);
  }
}

export class Up extends Direction {
  private static _instance: Up;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get dirLetter(): string {
    return "U";
  }

  public get moveCoordinate(): Coordinate {
    return new Coordinate(0, 1);
  }
}

export class Right extends Direction {
  private static _instance: Right;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get dirLetter(): string {
    return "R";
  }

  public get moveCoordinate(): Coordinate {
    return new Coordinate(1, 0);
  }
}

export class Down extends Direction {
  private static _instance: Up;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get dirLetter(): string {
    return "D";
  }

  public get moveCoordinate(): Coordinate {
    return new Coordinate(0, -1);
  }
}
