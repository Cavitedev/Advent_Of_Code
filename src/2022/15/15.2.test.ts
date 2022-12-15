import { getDistressSignal } from "./15.2.js";
import { BeaconZone, Point, SensorBeacon } from "./beaconZone.js";

describe("15.2", () => {
  it("Exceeded distance between sensor point and point is negative inside its range location", () => {
    const sensorBeacon = new SensorBeacon(new Point(0, 0), new Point(1, 0));
    const dist = sensorBeacon.exceededDistance(new Point(0, 0));
    expect(dist).toEqual(-2);
  });

  it("Exceeded distance between sensor point and point is negative inside its range location", () => {
    const sensorBeacon = new SensorBeacon(new Point(0, 0), new Point(1, 0));
    const dist = sensorBeacon.exceededDistance(new Point(2, 0));
    expect(dist).toEqual(0);
  });

  it("Test with test.txt", async () => {
    const result = await getDistressSignal(0, 20, "test.txt");

    expect(result).toEqual(56000011);
  });

  it("Input with input.txt", async () => {
    const result = await getDistressSignal(0, 4000000, "input.txt");

    expect(result).toEqual(11796491041245);
  });
});
