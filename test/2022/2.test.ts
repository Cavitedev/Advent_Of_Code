import { rockPaperScissorsScoreCounter } from "../../src/2022/2/2rockScissorsPaper.js";

describe("Second problem from Advent Code 2022", () => {
  it("Returns right score from input.txt", async () => {
    const res = await rockPaperScissorsScoreCounter("input.txt");
    expect(res).toBe(10941);
  });
});
