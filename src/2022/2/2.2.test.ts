import { rockPaperScissorsScoreCounter2 } from "./2.2.js";

describe("2.2", () => {
  it("Second part, returns right score from input.txt", async () => {
    const res = await rockPaperScissorsScoreCounter2("input.txt");
    expect(res).toBe(13071);
  });
});
