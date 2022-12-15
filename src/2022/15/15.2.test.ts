import { getDistressSignal } from "./15.2.js";
import { BeaconZone, SensorBeacon } from "./beaconZone.js";
import { Point, Segment } from "./cartesianMath.js";

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
  describe("Segment", () => {
    it("Building segment with points orders point from x position", () => {
      const pointFirst = new Point(0, 1);
      const pointSecond = new Point(2, -1);
      const segment = new Segment(pointSecond, pointFirst);
      expect(segment.pointA).toBe(pointFirst);
      expect(segment.pointB).toBe(pointSecond);
    });
    it("Segment with slope -1 is correct with two points", () => {
      const segment = new Segment(new Point(0, 1), new Point(2, -1));
      expect(segment.slope()).toEqual(-1);
    });

    it("Segment with slope -1 finds interception point", () => {
      const segment = new Segment(new Point(1, 0), new Point(2, -1));
      expect(segment.yIntercept()).toEqual(1);
    });

    it("Segment with slope -1 evaluates at 2 finds right point", () => {
      const segment = new Segment(new Point(-1, 2), new Point(2, -1));
      expect(segment.evaluateAt(3)).toEqual(-2);
    });

    it("Paralel lines interesction is null", () => {
      const segment1 = new Segment(new Point(0, 0), new Point(1, 0));
      const segment2 = new Segment(new Point(0, 1), new Point(1, 1));

      const intersectionPoint = segment1.intersectionPointAsLine(segment2);
      expect(intersectionPoint).toBeNull();
    });

    it("Intersection finds intersection point between 0+x and 1 - x", () => {
      const segment1 = new Segment(new Point(0, 0), new Point(2, 2));
      const segment2 = new Segment(new Point(0, 1), new Point(2, -1));

      const intersectionPoint = segment1.intersectionPointAsLine(segment2);
      expect(intersectionPoint).toEqual(new Point(0.5, 0.5));
    });

    it("Intersection outside points is not retrieved", () => {
      const segment1 = new Segment(new Point(0, 0), new Point(2, 2));
      const segment2 = new Segment(new Point(3, -2), new Point(2, -1));

      const intersectionPoint = segment1.intersectionPointAsSegment(segment2);
      expect(intersectionPoint).toBeNull();
    });

    it("Intersection inside points is retrieved", () => {
      const segment1 = new Segment(new Point(0, 0), new Point(2, 2));
      const segment2 = new Segment(new Point(0, 1), new Point(2, -1));

      const intersectionPoint = segment1.intersectionPointAsSegment(segment2);
      expect(intersectionPoint).toEqual(new Point(0.5, 0.5));
    });

    it("Paralel segments interesction is null", () => {
      const segment1 = new Segment(new Point(0, 0), new Point(1, 0));
      const segment2 = new Segment(new Point(0, 0), new Point(1, 0));

      const intersectionPoint = segment1.intersectionPointAsSegment(segment2);
      expect(intersectionPoint).toBeNull();
    });

    it("2 other lines return correct intersections", () => {
      const segment1 = new Segment(new Point(1, 3), new Point(3, 1));
      const segment2 = new Segment(new Point(3, 3), new Point(1, 1));

      const intersectionPoint = segment1.intersectionPointAsSegment(segment2);
      expect(intersectionPoint).toEqual(new Point(2,2));
    });
  });

  it("Sensor Bacon outline returns 4 lines signal doesn't reach", () => {
    const sensorBeacon = new SensorBeacon(new Point(0, 0), new Point(1, 0));
    const outline = sensorBeacon.outline();
    expect(outline.length).toEqual(4);
    expect(outline).toContainEqual(
      new Segment(new Point(-2, 0), new Point(0, 2))
    );
  });

  it("Beacon Zone finds 2 intersection points with 2 intercepting sensors", () => {
    const beaconZone = new BeaconZone();
    beaconZone.readLine("Sensor at x=1, y=1: closest beacon is at x=2, y=1");
    beaconZone.readLine("Sensor at x=3, y=1: closest beacon is at x=2, y=1");

    const interceptionPoints = beaconZone.interceptionPoints();
    expect(interceptionPoints.length).toEqual(2);
  });

  it("Test with test.txt", async () => {
    const result = await getDistressSignal(0, 20, "test.txt", true);

    expect(result).toEqual(56000011);
  });

  it("Input with input.txt", async () => {
    const result = await getDistressSignal(0, 4000000, "input.txt", true);

    expect(result).toEqual(11796491041245);
  });

});
