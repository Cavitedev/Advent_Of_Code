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

  // 11727 ms, 11948 ms, 11962 ms (JSON)
  // 2721 ms,  2727 ms, 2874(custom string)
  it("Test with input.txt", async () => {
    const result = await roundsBeforeElvesStabilize("input.txt");

    expect(result).toEqual(918);
  });
});
