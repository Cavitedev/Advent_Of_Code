import { rockPaperScissorsScoreCounter } from "./2.1.js";

describe("2.1", () => {
  it("First part, returns right score from input.txt", async () => {
    const res = await rockPaperScissorsScoreCounter("input.txt");
    expect(res).toBe(10941);
  });
});
