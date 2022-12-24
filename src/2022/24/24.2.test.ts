import { distanceBestPathInBlizzardGoReturnGo } from "./24.2.js";

describe("24.2", () => {
  it("Test with test.txt", async () => {
    const result = await distanceBestPathInBlizzardGoReturnGo("test.txt");
    expect(result).toEqual(54);
  });

  it("Test with input.txt", async () => {
    const result = await distanceBestPathInBlizzardGoReturnGo("input.txt");
    expect(result).toEqual(794);
  });
});
