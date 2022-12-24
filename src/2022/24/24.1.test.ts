import { distanceBestPathInBlizzard } from "./24.1.js";
import { BlizzardCell, BlizzardState, WallCell } from "./blizzard.js";
import { BlizzardSearch } from "./blizzardSearch.js";
import { Down, Left, Right } from "./direction.js";

describe("24.1", () => {
  describe("Blizzard state", () => {
    const blizzardState = new BlizzardState();

    beforeAll(() => {
      const input = `#.#####
            #.....#
            #>....#
            #.....#
            #...v.#
            #.....#
            #####.#`;

      for (const line of input.split("\n")) {
        blizzardState.readLine(line.trim());
      }
    });

    it("Start blizzard is 7x7 with start, end and blizzards set", () => {
      const cells = blizzardState.cells;
      const wallCell = new WallCell();
      expect(cells[0][0]).toEqual(wallCell);

      const startCell = new BlizzardCell();
      startCell.isStart = true;
      expect(cells[0][1]).toEqual(startCell);

      expect(cells[1][1]).toEqual(new BlizzardCell());

      const rightBlizzard = new BlizzardCell();
      rightBlizzard.blizzards = [Right.Instance];
      expect(cells[2][1]).toEqual(rightBlizzard);

      const downBlizzard = new BlizzardCell();
      downBlizzard.blizzards = [Down.Instance];
      expect(cells[4][4]).toEqual(downBlizzard);

      const endCell = new BlizzardCell();
      endCell.isEnd = true;
      expect(cells[6][5]).toEqual(endCell);

      expect(cells.length).toEqual(7);
      expect(cells[0].length).toEqual(7);
    });

    it("Second state moves blizzards", () => {
      const nextState = blizzardState.nextState();
      const cells = nextState.cells;
      expect(cells.length).toEqual(7);
      expect(cells[0].length).toEqual(7);
      expect(nextState.cells[2][2].blizzards[0]).toEqual(Right.Instance);
      expect(nextState.cells[5][4].blizzards[0]).toEqual(Down.Instance);
    });

    it("Third state moves blizzards through the wall", () => {
      const nextState = blizzardState.nextState().nextState();
      const cells = nextState.cells;
      expect(cells.length).toEqual(7);
      expect(cells[0].length).toEqual(7);
      expect(nextState.cells[2][3].blizzards[0]).toEqual(Right.Instance);
      expect(nextState.cells[1][4].blizzards[0]).toEqual(Down.Instance);
    });

    it("Fourth state moves blizzards overlap", () => {
      const nextState = blizzardState.nextState().nextState().nextState();
      const cells = nextState.cells;
      expect(cells.length).toEqual(7);
      expect(cells[0].length).toEqual(7);
      expect(nextState.cells[2][4].blizzards[0]).toEqual(Right.Instance);
      expect(nextState.cells[2][4].blizzards[1]).toEqual(Down.Instance);
    });
  });

  describe("Blizzard search", () => {
    let blizzardSearch: BlizzardSearch;

    beforeAll(() => {
      const blizzardState = new BlizzardState();
      const input = `#.######
        #>>.<^<#
        #.<..<<#
        #>v.><>#
        #<^v^^>#
        ######.#`;

      for (const line of input.split("\n")) {
        blizzardState.readLine(line.trim());
      }
      blizzardSearch = new BlizzardSearch(blizzardState);
    });

    it("Blizzard start point is (0,1)", () => {
      const [i, j] = blizzardSearch.startPoint();
      expect(i).toEqual(0);
      expect(j).toEqual(1);
    });

    it("Blizzard end point is (5,6)", () => {
      const [i, j] = blizzardSearch.endPoint();
      expect(i).toEqual(5);
      expect(j).toEqual(6);
    });

    it("Best path has length 18", () => {
      const bestPath = blizzardSearch.searchEnd();
      expect(bestPath.length - 1).toEqual(18);
    });
  });

  it("Test with test.txt", async () => {
    const result = await distanceBestPathInBlizzard("test.txt");
    expect(result).toEqual(18);
  });

  it("Test with input.txt", async () => {
    const result = await distanceBestPathInBlizzard("input.txt");
    expect(result).toEqual(253);
  });
});
