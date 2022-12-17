import { calculateTetrisHeight } from "./17.1.js";
import { Tetris } from "./tetris.js";

describe("17.1", () => {
  it("Tetris sets floor of 7 cells", () => {
    const tetris = new Tetris();

    const expected = [
      ["+", "-", "-", "-", "-", "-", "-", "-", "+"],
      ["|", ".", ".", ".", ".", ".", ".", ".", "|"],
    ];

    expect(tetris.tetrixMatrix).toEqual(expected);
  });

  it("Simulation has right tetrix after 10 steps", () => {
    const tetris = new Tetris();
    const input = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>";

    const height = tetris.simulateMovements(input, 10);

    const expected = `|.......|
|.......|
|.......|
|.......|
|.......|
|.......|
|.......|
|....#..|
|....#..|
|....##.|
|##..##.|
|######.|
|.###...|
|..#....|
|.####..|
|....##.|
|....##.|
|....#..|
|..#.#..|
|..#.#..|
|#####..|
|..###..|
|...#...|
|..####.|
+-------+`;

    const result = tetris.displayStrTetris();
    expect(result).toEqual(expected);
    expect(height).toEqual(17);
  });

  it("Simulate only right movement", () => {
    const tetris = new Tetris();
    const input = ">";

    const height = tetris.simulateMovements(input, 4);

    const expected = `|.......|
|.......|
|.......|
|......#|
|......#|
|......#|
|......#|
|......#|
|......#|
|....###|
|.....#.|
|....###|
|.....#.|
|...####|
+-------+`;

    const actual = tetris.displayStrTetris();
    expect(actual).toEqual(expected);
    expect(height).toEqual(11);
  });

  it("Simulate movement with test input returns right height", () => {
    const tetris = new Tetris();
    const input = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>";

    const height = tetris.simulateMovements(input, 2022);

    expect(height).toEqual(3068);
  });

  it("Test with test.txt", async () => {
    const result = await calculateTetrisHeight(2022, "test.txt");
    expect(result).toEqual(3068);
  });

  it("Test with input.txt", async () => {
    const result = await calculateTetrisHeight(2022, "input.txt");
    //Less than 3466
    expect(result).toEqual(3227);
  });
});
