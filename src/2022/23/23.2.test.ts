import { roundsBeforeElvesStabilize } from "./23.2.js";

describe("23.2", () => {
  it("Test with miniTest.txt", async () => {
    const result = await roundsBeforeElvesStabilize("miniTest.txt");
    expect(result).toEqual(4);
  });

  it("Test with test.txt", async () => {
    const result = await roundsBeforeElvesStabilize("test.txt");
    expect(result).toEqual(20);
  });

  it("Test with input.txt", async () => {
    const result = await roundsBeforeElvesStabilize("input.txt");

    //more than 910
    //less than 1068
    expect(result).toEqual(918);
  });
});
