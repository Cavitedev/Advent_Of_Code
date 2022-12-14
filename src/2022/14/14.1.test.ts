import { sandDropsBeforeFull } from "./14.1.js";
import { Cave, Point } from "./cave.js";

describe("14.1", () => {
  it("Building coordinate from string sets right x and y", () => {
    const coordinate = Point.fromString(" 495,6 ");

    expect(coordinate.x).toEqual(495);
    expect(coordinate.y).toEqual(6);
  });

  describe("After map read", () => {
    const cave = new Cave();

    beforeEach(() => {
      cave.readLine("498,4 -> 498,6 -> 496,6");
      cave.readLine("503,4 -> 502,4 -> 502,9 -> 494,9");
    });

    it("Reading two string lines on cave build right rock lines", () => {
      const point1 = new Point(498, 4);
      const point2 = new Point(498, 6);
      const point3 = new Point(496, 6);
      const point4 = new Point(503, 4);
      const point5 = new Point(502, 4);

      const line1 = cave.rockLines[0];
      const line2 = cave.rockLines[1];
      const line3 = cave.rockLines[2];

      expect(line1.point1).toEqual(point1);
      expect(line1.point2).toEqual(point2);
      expect(line2.point1).toEqual(point2);
      expect(line2.point2).toEqual(point3);
      expect(line3.point1).toEqual(point4);
      expect(line3.point2).toEqual(point5);
    });

    it("Create grid sets the rocks properly", () => {
      cave.createGrid();

      const expected = `......+...
..........
..........
..........
....#...##
....#...#.
..###...#.
........#.
........#.
#########.`
        .split("\n")
        .map((line) => line.split(""));

      expect(cave.grid).toEqual(expected);
    });

    it("Drop sand 24 times fills the grid with the sand", () => {
      cave.createGrid();
      cave.fillWithSand();

      const expected = `......+...
..........
......o...
.....ooo..
....#ooo##
...o#ooo#.
..###ooo#.
....oooo#.
.o.ooooo#.
#########.`
        .split("\n")
        .map((line) => line.split(""));

      expect(cave.grid).toEqual(expected);
    });
  });

  it("Test with test.txt", async () => {
    const result = await sandDropsBeforeFull("test.txt");
    expect(result).toEqual(24);
  });

  it("Test with input.txt", async () => {
    const result = await sandDropsBeforeFull("input.txt");
    expect(result).toEqual(964);
  });
});
