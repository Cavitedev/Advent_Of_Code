import { calculateBestFlow } from "./16.js";

describe("16.2", () => {
  it("Test with test.txt", async () => {
    const result = await calculateBestFlow(26, 2, "test.txt");
    expect(result).toEqual(1707);
  });

  it("Test with input.txt", async () => {
    const result = await calculateBestFlow(26, 2, "input.txt");
    expect(result).toEqual(2675);
  });
});
