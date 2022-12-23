import { Point } from "./elf.js";

export abstract class CheckPos {
  public static get North(): CheckPos {
    return NorthCheck.Instance;
  }
  public static get East(): CheckPos {
    return EastCheck.Instance;
  }
  public static get South(): CheckPos {
    return SouthCheck.Instance;
  }
  public static get West(): CheckPos {
    return WestCheck.Instance;
  }

  public static allCheckDirs(): CheckPos[] {
    return [CheckPos.North, CheckPos.South, CheckPos.West, CheckPos.East];
  }

  public abstract adyacentPositions(point: Point): Point[];
  public abstract adyacentPos(point: Point): Point;

  public allAdyacentPositions(point: Point): Point[] {
    const points: Point[] = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newPoint = new Point(point.x + i, point.y + j);
        points.push(newPoint);
      }
    }

    return points;
  }
}

export class NorthCheck extends CheckPos {
  private static _instance: NorthCheck;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public adyacentPositions(point: Point): Point[] {
    const points: Point[] = [];
    for (let i = -1; i <= 1; i++) {
      const newPoint = new Point(point.x + i, point.y + 1);
      points.push(newPoint);
    }
    return points;
  }

  public adyacentPos(point: Point): Point {
    return new Point(point.x, point.y + 1);
  }
}

export class EastCheck extends CheckPos {
  private static _instance: EastCheck;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public adyacentPositions(point: Point): Point[] {
    const points: Point[] = [];
    for (let j = -1; j <= 1; j++) {
      const newPoint = new Point(point.x + 1, point.y + j);
      points.push(newPoint);
    }
    return points;
  }

  public adyacentPos(point: Point): Point {
    return new Point(point.x + 1, point.y);
  }
}

export class SouthCheck extends CheckPos {
  private static _instance: SouthCheck;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public adyacentPositions(point: Point): Point[] {
    const points: Point[] = [];
    for (let i = -1; i <= 1; i++) {
      const newPoint = new Point(point.x + i, point.y - 1);
      points.push(newPoint);
    }
    return points;
  }

  public adyacentPos(point: Point): Point {
    return new Point(point.x, point.y - 1);
  }
}

export class WestCheck extends CheckPos {
  private static _instance: WestCheck;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public adyacentPositions(point: Point): Point[] {
    const points: Point[] = [];
    for (let j = -1; j <= 1; j++) {
      const newPoint = new Point(point.x - 1, point.y + j);
      points.push(newPoint);
    }
    return points;
  }

  public adyacentPos(point: Point): Point {
    return new Point(point.x - 1, point.y);
  }
}
