import { getDecoreKeyFromPackets as getDecoderKeyFromPackets } from "./13.2.js";

describe("13.2", () => {
  it("Test with test.txt", async () => {
    const result = await getDecoderKeyFromPackets("test.txt");
    expect(result).toEqual(140);
  });

  it("Test with input.txt", async () => {
    const result = await getDecoderKeyFromPackets("input.txt");
    expect(result).toEqual(21909);
  });
});
