import { bestPathLengthToGoal } from "./12.js";

describe("12.2", () => {
  it("Test with test.txt", async () => {
    const steps = await bestPathLengthToGoal(true, "test.txt");
    expect(steps).toEqual(29);
  });

  it("Test with input.txt", async () => {
    const steps = await bestPathLengthToGoal(true, "input.txt");
    expect(steps).toEqual(377);
  });
});
