import { jungleEndPos } from "./22.js";
import {
  BackCubeSide,
  DownCubeSide,
  FrontCubeSide,
  LeftCubeSide,
  RightCubeSide,
  UpCubeSide,
} from "./cubeSide.js";
import { Down, Left, Right, Up } from "./direction.js";
import { MonkeyCubeMap } from "./monkeyCubeMap.js";

describe("22.2", () => {
  describe("Test map", () => {
    const map = new MonkeyCubeMap();

    beforeAll(() => {
      const input = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.`;
      for (const line of input.split("\n")) {
        map.readMapLine(line);
      }
      map.finishReading();
    });

    it("Finish reading build 6 cubes of length 4x4", () => {
      expect(map.cubeFaces.length).toEqual(6);
      for (const cube of map.cubeFaces) {
        expect(cube.cells.length).toEqual(4);
        expect(cube.cells[0].length).toEqual(4);
      }
    });

    it("Finish reading connects cube faces with their immediately adyacent faces", () => {
      expect(map.cubeFaces[0].cubeFaceAtDir(Down.Instance)).toEqual(
        map.cubeFaces[3]
      );

      expect(map.cubeFaces[3].cubeFaceAtDir(Up.Instance)).toEqual(
        map.cubeFaces[0]
      );

      expect(map.cubeFaces[4].cubeFaceAtDir(Right.Instance)).toEqual(
        map.cubeFaces[5]
      );

      expect(map.cubeFaces[5].cubeFaceAtDir(Left.Instance)).toEqual(
        map.cubeFaces[4]
      );
    });

    it("After reading the cube sides are correct", () => {
      expect(map.cubeFaces[0].cubeSide).toBe(UpCubeSide.Instance);
      expect(map.cubeFaces[1].cubeSide).toBe(BackCubeSide.Instance);
      expect(map.cubeFaces[2].cubeSide).toBe(LeftCubeSide.Instance);
      expect(map.cubeFaces[3].cubeSide).toBe(FrontCubeSide.Instance);
      expect(map.cubeFaces[4].cubeSide).toBe(DownCubeSide.Instance);
      expect(map.cubeFaces[5].cubeSide).toBe(RightCubeSide.Instance);
    });

    it("Finish reading connect all other cube faces finishing the cube", () => {
      expect(map.cubeFaces[0].cubeFaceAtDir(Up.Instance)).toEqual(
        map.cubeFaces[1]
      );
    });

    it("Move right connects to right side of connected face", () => {
      const startCell = map.cells[5][11];
      const endCell = map.connectedCellDir(startCell, Right.Instance);
      expect(endCell).toBe(map.cells[8][14]);
    });
  });

  it("Test with test.txt", async () => {
    const result = await jungleEndPos(true, "test.txt");
    expect(result).toEqual(5031);
  });

  it("Test with input.txt", async () => {
    const result = await jungleEndPos(true, "input.txt");
    expect(result).toEqual(29408);
  });
});
