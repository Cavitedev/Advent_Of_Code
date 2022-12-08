import {
  rockPaperScissorsScoreCounter,
  rockPaperScissorsScoreCounter2,
} from "./2rockScissorsPaper.js";

describe("Second problem from Advent Code 2022", () => {
  it("First part, returns right score from input.txt", async () => {
    const res = await rockPaperScissorsScoreCounter("input.txt");
    expect(res).toBe(10941);
  });

  it("Second part, returns right score from input.txt", async () => {
    const res = await rockPaperScissorsScoreCounter2("input.txt");
    expect(res).toBe(13071);
  });
});
