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

      const trimmedXPairsOfPoints: number[][] = xPairsOfPoints.splice(0, i);
      const leftPoints = trimmedXPairsOfPoints
        .map((p) => p[0] + 1)
        .filter((p) => p <= rightX);
      const rightPoints = trimmedXPairsOfPoints
        .map((p) => p[1] - 1)
        .filter((p) => p >= leftX);

      const maxLeftX = Math.max(...leftPoints, leftX);
      const minRightX = Math.min(...rightPoints, rightX);

      let actualRightX = Math.min(rightX, minRightX);
      let actualLeftX = Math.max(leftX, maxLeftX);

      pointsCount += actualRightX - actualLeftX + 1;
    }

    return pointsCount;
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

  public get distance(): number {
    const difX = Math.abs(this.sensor.x - this.beacon.x);
    const difY = Math.abs(this.sensor.y - this.beacon.y);
    return difX + difY;
  }

  public getDetectedEndPointsAtRow(row: number): Point[] {
    const heightDif = Math.abs(row - this.sensor.y);
    const xDif = this.distance - heightDif;
    if (xDif < 0) {
      return null;
    }

    const pointLeft = new Point(this.sensor.x - xDif, row);
    const pointRight = new Point(this.sensor.x + xDif, row);

    return [pointLeft, pointRight];
  }
}

export class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
