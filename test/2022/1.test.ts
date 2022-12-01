import { calorieCounter } from "../../src/2022/1/1calorieCounter.js";

describe("Problema 1 de Advent Code 2022", () => {
  it("Fichero de ejemplo da resultado correcto", async () => {
    const res = await calorieCounter("input.txt");
    expect(res).toBe(70509);
  });
});
