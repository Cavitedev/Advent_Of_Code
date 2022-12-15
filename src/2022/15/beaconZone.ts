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

      for (let x = leftX; x <= rightX; x++) {
        const existsPreviously = trimmedXPairsOfPoints.some((p) => {
          return p[0] <= x && p[1] >= x;
        });
        const isSensorOrBeacon = this.sensorsBeacons.some((pp) =>
          pp.usesXY(x, row)
        );
        if (!existsPreviously && !isSensorOrBeacon) {
          pointsCount += 1;
        }
      }
    }

    return pointsCount;
  }

  public getDistressSignal(start: number, end: number) {
    for (let x = start; x <= end; x++) {
      for (let y = start; y <= end; y++) {
        const point = new Point(x, y);
        const isDetected = this._isInSensorBeaconsSignals(point);
        if (!isDetected) {
          return point;
        }
      }
    }
  }

  private _isInSensorBeaconsSignals(point: Point) {
    return this.sensorsBeacons.some((sb) => sb.isPointInCheckArea(point));
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
