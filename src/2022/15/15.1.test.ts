import { checkedPointsInRow } from "./15.1.js";
import { BeaconZone, SensorBeacon } from "./beaconZone.js";
import { Point } from "./cartesianMath.js";

describe("15.1", () => {
  it("Read Sensor and beacon from string", () => {
    const sensorBeacon = SensorBeacon.FromLine(
      "Sensor at x=2, y=18: closest beacon is at x=-2, y=15"
    );

    const expected = new SensorBeacon(new Point(2, 18), new Point(-2, 15));

    expect(sensorBeacon).toEqual(expected);
  });

  it("Distance of sensor beacon through manhattan is right", () => {
    const sensorBeacon = new SensorBeacon(new Point(2, 18), new Point(-2, 15));
    expect(sensorBeacon.distance()).toEqual(7);
  });

  it("Detected points dif at row 15 is 9", () => {
    const sensorBeacon = new SensorBeacon(new Point(2, 18), new Point(-2, 15));
    const edgePointsAtRow = sensorBeacon.getDetectedEndPointsAtRow(15);
    const difPoints = edgePointsAtRow[1].x - edgePointsAtRow[0].x + 1;
    expect(difPoints).toEqual(9);
  });

  it("Detected points dif at row 11 is 1", () => {
    const sensorBeacon = new SensorBeacon(new Point(2, 18), new Point(-2, 15));
    const edgePointsAtRow = sensorBeacon.getDetectedEndPointsAtRow(11);
    const difPoints = edgePointsAtRow[1].x - edgePointsAtRow[0].x + 1;
    expect(difPoints).toEqual(1);
  });

  it("No points detected at row 10, so it should returns nulls", () => {
    const sensorBeacon = new SensorBeacon(new Point(2, 18), new Point(-2, 15));
    const edgePointsAtRow = sensorBeacon.getDetectedEndPointsAtRow(10);
    expect(edgePointsAtRow).toBeNull();
  });

  describe("Build sensors with test input", () => {
    const beaconZone = new BeaconZone();
    beforeEach(() => {
      const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

      for (const line of input.split("\n")) {
        beaconZone.readLine(line);
      }
    });

    it("Sensors and beacons are built correctly", () => {
      expect(beaconZone.sensorsBeacons.length).toEqual(14);

      const expectedSensorBeacon = new SensorBeacon(
        new Point(10, 20),
        new Point(10, 16)
      );
      expect(beaconZone.sensorsBeacons[4]).toEqual(expectedSensorBeacon);
    });

    it("checked points at row 10 is correct", () => {
      const checkedPointsCount = beaconZone.checkedPointsCountAtRow(10);
      expect(checkedPointsCount).toEqual(26);
    });
  });

  it("Test with test.txt", async () =>{

    const result = await checkedPointsInRow(10, "test.txt");
    expect(result).toEqual(26);
  });

  it("Test with input.txt", async () =>{

    const result = await checkedPointsInRow(2000000, "input.txt");
    expect(result).toEqual(5878678);
  });
});
