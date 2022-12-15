import { getDistressSignal } from "./15.2.js";

describe("15.2", () => {
  it("Test with test.txt", async () => {
    const result = await getDistressSignal(0, 20, "test.txt");

    expect(result).toEqual(56000011);
  });


  it("Input with test.txt", async () => {
    const result = await getDistressSignal(0, 4000000, "input.txt");

    expect(result).toEqual(56000011);
  });
});
