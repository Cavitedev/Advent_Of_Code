import { sandDropsCountBeforeReachingTop } from "./14.2.js";
import { Cave } from "./cave.js";

describe("14.2", () => {
  it("Creating extra grid of extra space 4 works as well", () => {
    const cave = new Cave();
    cave.readLine("498,4 -> 498,6 -> 496,6");
    cave.readLine("503,4 -> 502,4 -> 502,9 -> 494,9");

    cave.createGrid(1);

    const expected = `............
.......+....
............
............
............
.....#...##.
.....#...#..
...###...#..
.........#..
.........#..
.#########..
............`
      .split("\n")
      .map((line) => line.split(""));

    expect(cave.grid).toEqual(expected);
  });

  it("Test with test.txt", async () => {
    const result = await sandDropsCountBeforeReachingTop("test.txt");
    expect(result).toEqual(93);
  });

  it("Test with input.txt", async () => {
    const result = await sandDropsCountBeforeReachingTop("input.txt");
    expect(result).toEqual(32041);
  });
});
