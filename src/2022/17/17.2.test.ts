import { calculateTetrisHeight } from "./17.1.js";
import { Tetris } from "./tetris.js";

describe("17.2", () => {
  it("Test with test.txt", async () => {
    const result = await calculateTetrisHeight(1000000000000, "test.txt");
    expect(result).toEqual(1514285714288);
  });

  it("Test with input.txt", async () => {
    const result = await calculateTetrisHeight(1000000000000, "input.txt");
    //Less than 3466
    expect(result).toEqual(1597714285698);
  });
});
