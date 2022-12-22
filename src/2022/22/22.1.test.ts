import { jungleEndPos } from "./22.js";
import { EmptyCell, UnexistentCell, WallCell } from "./cellsMonkeyMap.js";
import { Down, Left, Right, Up } from "./direction.js";
import { MonkeyMap } from "./monkeyMap.js";
import { WalkingPerson } from "./monkeyPath.js";

describe("22.1", () => {
  describe("Test map", () => {
    const map = new MonkeyMap();

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

    it("Map cells are built correctly", () => {
      expect(map.cells.length).toEqual(12);

      const emptyCell = new EmptyCell(0, 8);
      expect(map.cells[0][0]).toBeInstanceOf(UnexistentCell);
      expect(map.cells[0][8]).toEqual(emptyCell);
      expect(map.cells[0][11]).toBeInstanceOf(WallCell);
      expect(map.cells[0][12]).toBeInstanceOf(UnexistentCell);
    });

    it("Up cell returns opposite existent cell", () => {
      const startCell = map.cells[4][2];
      const endCell = map.connectedCellDir(startCell, Up.Instance);
      expect(endCell).toBe(map.cells[7][2]);
    });

    it("Right cell returns opposite existent cell", () => {
      const startCell = map.cells[4][11];
      const endCell = map.connectedCellDir(startCell, Right.Instance);
      expect(endCell).toBe(map.cells[4][0]);
    });

    it("Down cell returns opposite existent cell", () => {
      const startCell = map.cells[7][2];
      const endCell = map.connectedCellDir(startCell, Down.Instance);
      expect(endCell).toBe(map.cells[4][2]);
    });

    it("Left cell returns opposite existent cell", () => {
      const startCell = map.cells[4][0];
      const endCell = map.connectedCellDir(startCell, Left.Instance);
      expect(endCell).toBe(map.cells[4][11]);
    });

    it("Walking many positions crossing map goes until wall is found", () => {
      const startCell = map.cells[5][10];
      const person = new WalkingPerson(startCell, "");
      person.dir = Right.Instance;
      map.person = person;
      const endCell = map.cellAfterNMovementsDir(startCell, 100);
      expect(endCell).toBe(map.cells[5][7]);
    });

    it("Walking before wall is found, walks n positions", () => {
      const startCell = map.cells[5][10];
      const person = new WalkingPerson(startCell, "");
      person.dir = Right.Instance;
      map.person = person;
      const endCell = map.cellAfterNMovementsDir(startCell, 5);
      expect(endCell).toBe(map.cells[5][3]);
    });
  });

  it("Walking person actions read numbers, R and L correctly", () => {
    const person = new WalkingPerson(new EmptyCell(2, 3), "10R5L5R10L4R5L5");
    expect(person.nextAction()).toEqual("10");
    expect(person.nextAction()).toEqual("R");
    expect(person.nextAction()).toEqual("5");
    expect(person.nextAction()).toEqual("L");
    expect(person.nextAction()).toEqual("5");
    expect(person.nextAction()).toEqual("R");
    expect(person.nextAction()).toEqual("10");
    expect(person.nextAction()).toEqual("L");
    expect(person.nextAction()).toEqual("4");
    expect(person.nextAction()).toEqual("R");
    expect(person.nextAction()).toEqual("5");
    expect(person.nextAction()).toEqual("L");
    expect(person.nextAction()).toEqual("5");
    expect(person.nextAction()).toEqual("");
  });

  it("Test with test.txt", async () => {
    const result = await jungleEndPos(false, "test.txt");
    expect(result).toEqual(6032);
  });

  it("Test with input.txt", async () => {
    const result = await jungleEndPos(false, "input.txt");
    expect(result).toEqual(29408);
  });
});
