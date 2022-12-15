export class Segment {
  public pointA: Point;
  public pointB: Point;

  constructor(pointA: Point, pointB: Point) {
    if (pointA.x <= pointB.x) {
      this.pointA = pointA;
      this.pointB = pointB;
    } else {
      this.pointA = pointB;
      this.pointB = pointA;
    }
  }

  public intersectionPointAsLine(other: Segment): Point {
    const m1 = this.slope();
    const m2 = other.slope();
    if (m1 === m2) {
      return null;
    }

    const b1 = this.yIntercept();
    const b2 = other.yIntercept();

    const x = (b1 - b2) / (m2 - m1);
    const y = this.evaluateAt(x);
    return new Point(x, y);
  }

  public intersectionPointAsSegment(other: Segment): Point {
    const inters = this.intersectionPointAsLine(other);
    if (!inters) {
      return null;
    }
    if (
      inters.x < this.pointA.x ||
      inters.x > this.pointB.x ||
      inters.x < other.pointA.x ||
      inters.x > other.pointB.x
    ) {
      return null;
    }
    return inters;
  }

  public slope(): number {
    return (this.pointB.y - this.pointA.y) / (this.pointB.x - this.pointA.x);
  }

  public evaluateAt(x: number): number {
    return this.pointA.y + (x - this.pointA.x) * this.slope();
  }

  yIntercept(): number {
    return this.evaluateAt(0);
  }
}

export class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public distance(other: Point): number {
    const difX = Math.abs(this.x - other.x);
    const difY = Math.abs(this.y - other.y);
    return difX + difY;
  }
}
