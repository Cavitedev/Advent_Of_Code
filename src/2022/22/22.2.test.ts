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
import { CubeFace, MonkeyCubeMap } from "./monkeyCubeMap.js";
import { WalkingPerson } from "./monkeyPath.js";

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
      expect(map.cubeFaces[0].cubeFaceAtDir(Up.Instance)).toBe(
        map.cubeFaces[1]
      );
    });

    it("Matrix dir are correct once the cube is built", () => {
      expect(map.cubeFaces[0].matrixOrientation).toBe(Up.Instance);
      expect(map.cubeFaces[3].matrixOrientation).toBe(Up.Instance);
      expect(map.cubeFaces[1].matrixOrientation).toBe(Up.Instance);
      expect(map.cubeFaces[2].matrixOrientation).toBe(Up.Instance);
      expect(map.cubeFaces[4].matrixOrientation).toBe(Up.Instance);
      expect(map.cubeFaces[5].matrixOrientation).toBe(Left.Instance);
    });

    it("The dirs between faces should be right", () => {
      const adyFrontRight = map.cubeFaces[3].adyAtDir(Right.Instance);
      expect(adyFrontRight.endDirLine).toEqual(Right.Instance);
    });

    it("Front side ady left side is correct correct", () => {
      const adyFrontLeft = map.cubeFaces[3].adyAtDir(Left.Instance);
      const line = adyFrontLeft.line(map.cubeFaces[3]);
      expect(line[0]).toBe(adyFrontLeft.cubeFace.corners()[1]);
      expect(line[3]).toBe(adyFrontLeft.cubeFace.corners()[2]);
    });

    it("Front side ady up side is correct correct", () => {
      const adyFrontUp = map.cubeFaces[3].adyAtDir(Up.Instance);
      const line = adyFrontUp.line(map.cubeFaces[3]);

      expect(line[0]).toBe(adyFrontUp.cubeFace.corners()[3]);
      expect(line[3]).toBe(adyFrontUp.cubeFace.corners()[2]);
    });

    it("Front side ady right side is correct correct", () => {
      const adyFrontRight = map.cubeFaces[3].adyAtDir(Right.Instance);
      const line = adyFrontRight.line(map.cubeFaces[3]);
      expect(line[0]).toBe(adyFrontRight.cubeFace.corners()[0]);
      expect(line[3]).toBe(adyFrontRight.cubeFace.corners()[1]);
    });

    it("Front side ady down side is correct correct", () => {
      const adyFrontRight = map.cubeFaces[3].adyAtDir(Down.Instance);
      const line = adyFrontRight.line(map.cubeFaces[3]);
      expect(line[0]).toBe(adyFrontRight.cubeFace.corners()[0]);
      expect(line[3]).toBe(adyFrontRight.cubeFace.corners()[1]);
    });

    it("Down side ady down side is correct correct", () => {
      const adyDownDown = map.cubeFaces[4].adyAtDir(Down.Instance);
      const line = adyDownDown.line(map.cubeFaces[4]);
      expect(line[0]).toBe(adyDownDown.cubeFace.corners()[3]);
      expect(line[3]).toBe(adyDownDown.cubeFace.corners()[2]);
    });

    it("Move right first cell, moves to its right cell", () => {
      const startCell = map.cells[0][8];
      const endCell = map.connectedCellDir(startCell, Right.Instance);
      expect(endCell).toBe(map.cells[0][9]);
    });

    it("Move right connects to right side of connected face and person rotates", () => {
      const startCell = map.cells[5][11];
      const person = new WalkingPerson(startCell, "");
      map.person = person;
      person.dir = Right.Instance;
      const endCell = map.connectedCellDir(startCell, Right.Instance);
      expect(endCell).toBe(map.cells[8][14]);
      expect(person.dir).toBe(Down.Instance);
    });

    it("Move down connects to right side of connected face and person rotates", () => {
      const startCell = map.cells[11][10];
      const person = new WalkingPerson(startCell, "");
      person.dir = Down.Instance;
      map.person = person;
      const endCell = map.connectedCellDir(startCell, Down.Instance);
      expect(endCell).toBe(map.cells[7][1]);
      expect(person.dir).toBe(Up.Instance);
    });

    it("Move up connects to folded size but it is a wall, it doesn't rotate", () => {
      const startCell = map.cells[4][6];
      const person = new WalkingPerson(startCell, "");
      person.dir = Up.Instance;
      map.person = person;
      const endCell = map.connectedCellDir(startCell, Up.Instance);
      expect(endCell).toBe(map.cells[4][6]);
      expect(person.dir).toBe(Up.Instance);
    });

    it("Person walks down through connected folded cube, it doesn't need to rotate", () => {
      const startCell = map.cells[0][10];
      const person = new WalkingPerson(startCell, "");
      map.person = person;
      person.dir = Down.Instance;
      person.executeAction("5", map);
      const endCell = person.currentCell;
      expect(person.dir).toBe(Down.Instance);
      expect(endCell).toBe(map.cells[5][10]);
    });

    it("Person walks right moving through folded cube rotates and moves properly", () => {
      const startCell = map.cells[5][10];
      const person = new WalkingPerson(startCell, "");
      map.person = person;
      person.dir = Right.Instance;
      person.executeAction("5", map);
      const endCell = person.currentCell;
      expect(endCell).toBe(map.cells[10][14]);
      expect(person.dir).toBe(Down.Instance);
    });

    it("Person walks right moving through second folded cube rotates and moves properly", () => {
      const startCell = map.cells[10][10];
      const person = new WalkingPerson(startCell, "");
      map.person = person;
      person.dir = Down.Instance;
      person.executeAction("4", map);
      const endCell = person.currentCell;
      expect(endCell).toBe(map.cells[5][1]);
      expect(person.dir).toBe(Up.Instance);
    });

    it("Person walks up moving through folded cube but it is stopped by a wall", () => {
      const startCell = map.cells[5][6];
      const person = new WalkingPerson(startCell, "");
      map.person = person;
      person.dir = Up.Instance;
      person.executeAction("4", map);
      const endCell = person.currentCell;
      expect(endCell).toBe(map.cells[4][6]);
      expect(person.dir).toBe(Up.Instance);
    });

    // it("Move right in matrix with orientation left, it ends up moving down", () => {
    //   const startCell = map.cells[8][14];
    //   const endCell = map.connectedCellDir(startCell, Right.Instance);
    //   expect(endCell).toBe(map.cells[9][14]);
    // });
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
