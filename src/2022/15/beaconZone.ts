import { Point, Segment } from "./cartesianMath.js";

export class BeaconZone {
  sensorsBeacons: SensorBeacon[];

  constructor() {
    this.sensorsBeacons = [];
  }

  public readLine(line: string) {
    const sensorBeacon = SensorBeacon.FromLine(line);
    this.sensorsBeacons.push(sensorBeacon);
  }

  public checkedPointsCountAtRow(row: number) {
    const pairOfPointsChecked: Point[][] = [];
    for (const sensorBeacon of this.sensorsBeacons) {
      const pairPointsOnRow = sensorBeacon.getDetectedEndPointsAtRow(row);
      if (pairPointsOnRow) {
        pairOfPointsChecked.push(pairPointsOnRow);
      }
    }

    const xPairsOfPoints = pairOfPointsChecked.map((points) =>
      points.map((p) => p.x)
    );
    let pointsCount = 0;
    for (let i = 0; i < xPairsOfPoints.length; i++) {
      const pairOfPoints = xPairsOfPoints[i];
      const leftX = pairOfPoints[0];
      const rightX = pairOfPoints[1];

      const trimmedXPairsOfPoints: number[][] = xPairsOfPoints
        .slice(0, i)
        .filter((p) => p[0] <= rightX || p[1] >= leftX);

      const orderedLeftXPoints = trimmedXPairsOfPoints
        .map((pp) => pp[0])
        .sort((a, b) => a - b);
      for (let x = leftX; x <= rightX; ) {
        const overlappingPair = trimmedXPairsOfPoints.find((p) => {
          return p[0] <= x && p[1] >= x;
        });
        if (overlappingPair) {
          x = overlappingPair[1] + 1;
          continue;
        }

        let nextValue = orderedLeftXPoints.find((p) => p > x && p <= rightX);
        const nextX = nextValue == undefined ? rightX + 1 : nextValue;

        pointsCount += nextX - x;
        x = nextX;
      }
    }

    const sensorAndBeaconsInRow = this.sensorsBeacons
      .flatMap((sb) => [sb.sensor, sb.beacon])
      .filter((p) => p.y === row)
      .filter(
        (v, i, a) => a.findIndex((v2) => v2.x === v.x && v2.y === v.y) === i
      );
    return pointsCount - sensorAndBeaconsInRow.length;
  }

  public getDistressSignal(start: number, end: number): Point {
    for (const sensorBeacon of this.sensorsBeacons) {
      const sensor = sensorBeacon.sensor;

      const dist = sensorBeacon.distance() + 1;
      const startX = Math.max(start, sensor.x - dist);
      const endX = Math.min(end, sensor.x + dist);

      for (let x = startX; x <= endX; ) {
        const difY = -Math.abs(x - sensor.x) + dist;
        const point = new Point(x, sensor.y + difY);

        const difLimitY = Math.max(point.y - end, start - point.y);
        if (difLimitY > 0) {
          x += difLimitY;
          continue;
        }

        const bestDistance = this._minExceededDistance(point);
        if (bestDistance >= 0) {
          return point;
        } else {
          x -= Math.min(Math.floor(bestDistance / 2), -1);
        }
      }

      for (let x = endX; x > startX; ) {
        const difY = -Math.abs(x - sensor.x) + dist;
        const point = new Point(x, sensor.y - difY);

        const difLimitY = Math.max(point.y - end, start - point.y);
        if (difLimitY > 0) {
          x -= difLimitY;
          continue;
        }

        const bestDistance = this._minExceededDistance(point);
        if (bestDistance >= 0) {
          return point;
        } else {
          x += Math.min(Math.floor(bestDistance / 2), -1);
        }
      }
    }
  }

  public getDistressSignalV2(start: number, end: number): Point {
    const intPoints = this.interceptionPoints().filter((p) => {
      return p.x >= start && p.x <= end && p.y >= start && p.y <= end;
    });

    for (const intPoint of intPoints) {
      const dist = this._minExceededDistance(intPoint);
      if (dist >= 0) {
        return intPoint;
      }
    }

    return null;
  }

  public interceptionPoints(): Point[] {
    const intersectionPoints: Point[] = [];
    const segments: Segment[][] = this.sensorsBeacons.map((sb) => sb.outline());

    for (let i = 0; i < segments.length; i++) {
      const outline = segments[i];
      for (let j = 0; j < outline.length; j++) {
        const segment = outline[j];

        for (let i2 = i + 1; i2 < segments.length; i2++) {
          const outline2 = segments[i2];
          for (let j2 = 0; j2 < outline2.length; j2++) {
            const segment2 = outline2[j2];
            const interPoint = segment.intersectionPointAsSegment(segment2);
            if (interPoint) {
              intersectionPoints.push(interPoint);
            }
          }
        }
      }
    }

    return intersectionPoints;
  }

  private _minExceededDistance(point: Point): number {
    return Math.min(
      ...this.sensorsBeacons.map((sb) => sb.exceededDistance(point))
    );
  }
}

export class SensorBeacon {
  public sensor: Point;
  public beacon: Point;

  constructor(sensor: Point, beacon: Point) {
    this.sensor = sensor;
    this.beacon = beacon;
  }

  public static FromLine(line: string): SensorBeacon {
    const sensorStr = "Sensor at";
    const xSensor = +new RegExp(`${sensorStr} x=(-?\\d+),`).exec(line)[1];
    const ySensor = +new RegExp(`${sensorStr}.*y=(-?\\d+):`).exec(line)[1];
    const sensorPoint = new Point(xSensor, ySensor);

    const beaconStr = "closest beacon is at";
    const xBeacon = +new RegExp(`${beaconStr} x=(-?\\d+),`).exec(line)[1];
    const yBeacon = +new RegExp(`${beaconStr}.*y=(-?\\d+)`).exec(line)[1];
    const beaconPoint = new Point(xBeacon, yBeacon);
    return new SensorBeacon(sensorPoint, beaconPoint);
  }

  public distance(): number {
    return this.sensor.distance(this.beacon);
  }

  public getDetectedEndPointsAtRow(row: number): Point[] {
    const heightDif = Math.abs(row - this.sensor.y);
    const xDif = this.distance() - heightDif;
    if (xDif < 0) {
      return null;
    }

    const pointLeft = new Point(this.sensor.x - xDif, row);
    const pointRight = new Point(this.sensor.x + xDif, row);

    return [pointLeft, pointRight];
  }

  public outline(): Segment[] {
    const segments: Segment[] = [];
    const dist = this.distance() + 1;

    const leftPoint = new Point(this.sensor.x - dist, this.sensor.y);
    const upPoint = new Point(this.sensor.x, this.sensor.y - dist);
    const rightPoint = new Point(this.sensor.x + dist, this.sensor.y);
    const downPoint = new Point(this.sensor.x, this.sensor.y + dist);

    segments.push(new Segment(leftPoint, upPoint));
    segments.push(new Segment(upPoint, rightPoint));
    segments.push(new Segment(rightPoint, downPoint));
    segments.push(new Segment(downPoint, leftPoint));

    return segments;
  }

  public usesXY(x: number, y: number) {
    return (
      (this.beacon.x === x && this.beacon.y === y) ||
      (this.sensor.x === x && this.sensor.y === y)
    );
  }

  public isPointInCheckArea(point: Point) {
    const distPoint = this.sensor.distance(point);
    return distPoint <= this.distance();
  }

  public exceededDistance(point: Point) {
    const distPoint = this.sensor.distance(point);
    return distPoint - this.distance() - 1;
  }
}
