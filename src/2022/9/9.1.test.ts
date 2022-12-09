import { Bridge, Coordinate } from "./bridge.js";

describe("9.1", () => {
  it("Bridge has empty cells traverse and (0,0) as initial positions for T and H", () => {
    const bridge = new Bridge();

    expect(bridge._head).toEqual({ x: 0, y: 0 });
    expect(bridge.tail).toEqual({ x: 0, y: 0 });
    expect(bridge.cellsTraversed.size).toEqual(1);
  });

  it("Move Head, adds coordinate", () => {
    const bridge = new Bridge();
    const newCoordinate = new Coordinate(1, 1);
    bridge.head = newCoordinate;
    expect(bridge._head).toEqual(newCoordinate);
    expect(bridge.cellsTraversed).toEqual(
      new Set([new Coordinate(0, 0), newCoordinate])
    );
  });
});
