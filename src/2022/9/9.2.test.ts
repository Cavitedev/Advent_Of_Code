import { bridgeSimulation, traversedCellsCounter } from "./9.js";
import { Bridge, Coordinate } from "./bridge.js";

describe("9.2", () => {
  describe("Calculating the optimal movement between coordiantes", () => {
    it("Other cell is at the same position, movement is zero", () => {
      const cord = new Coordinate(0, 0);
      const cord2 = new Coordinate(0, 0);

      const result = cord.bestMovementToReach(cord2);
      expect(result).toEqual(new Coordinate(0, 0));
    });
    it("Other cell is right, returns right direction", () => {
      const cord = new Coordinate(0, 0);
      const cord2 = new Coordinate(2, 0);

      const result = cord.bestMovementToReach(cord2);
      expect(result).toEqual(new Coordinate(1, 0));
    });

    it("Other cell is left, returns left direction", () => {
      const cord = new Coordinate(0, 0);
      const cord2 = new Coordinate(-2, 0);

      const result = cord.bestMovementToReach(cord2);
      expect(result).toEqual(new Coordinate(-1, 0));
    });

    it("Other cell is up, returns up direction", () => {
      const cord = new Coordinate(0, 0);
      const cord2 = new Coordinate(0, 2);

      const result = cord.bestMovementToReach(cord2);
      expect(result).toEqual(new Coordinate(0, 1));
    });

    it("Other cell is left, returns left direction", () => {
      const cord = new Coordinate(0, 0);
      const cord2 = new Coordinate(0, -2);

      const result = cord.bestMovementToReach(cord2);
      expect(result).toEqual(new Coordinate(0, -1));
    });

    it("Other cell is up right, returns up right direction", () => {
      const cord = new Coordinate(0, 0);
      const cord2 = new Coordinate(1, 2);

      const result = cord.bestMovementToReach(cord2);
      expect(result).toEqual(new Coordinate(1, 1));
    });

    it("Other cell is up left, returns up left direction", () => {
      const cord = new Coordinate(0, 0);
      const cord2 = new Coordinate(-1, 2);

      const result = cord.bestMovementToReach(cord2);
      expect(result).toEqual(new Coordinate(-1, 1));
    });

    it("Other cell is down left, returns down left direction", () => {
      const cord = new Coordinate(0, 0);
      const cord2 = new Coordinate(-1, -2);

      const result = cord.bestMovementToReach(cord2);
      expect(result).toEqual(new Coordinate(-1, -1));
    });

    it("Other cell is down right, returns down right direction", () => {
      const cord = new Coordinate(0, 0);
      const cord2 = new Coordinate(1, -2);

      const result = cord.bestMovementToReach(cord2);
      expect(result).toEqual(new Coordinate(1, -1));
    });
  });

  it("Works with test input", async () => {
    const expected = `......
......
.1H3..
.5....
6.....`;
    const result: Bridge = await bridgeSimulation(8, "test.txt");
    expect(result.unrepeatedCellsTraversed().length).toEqual(1);
    expect(result.displayMovements(6, 5, 0, 0)).toEqual(expected);
  });

  it("Works with second test input", async () => {
    const result = await traversedCellsCounter(8, "test2.txt");
    expect(result).toEqual(36);
  });

  it("Works with actual input", async () => {
    const result = await traversedCellsCounter(8, "input.txt");
    //Higher
    expect(result).toEqual(2493);
  });
});
