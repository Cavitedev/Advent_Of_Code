import { calorieCounter } from "./1calorieCounter.js";

describe("First problem from Advent Code 2022", () => {
  it("Top 1 from input.txt returns right value", async () => {
    const res = await calorieCounter(1, "input.txt");
    expect(res).toBe(70509);
  });
  it("Top 3 from input.txt returns right value", async () => {
    const res = await calorieCounter(3, "input.txt");
    expect(res).toBe(208567);
  });
});
