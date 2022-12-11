import { getMonkeyBusiness } from "./11.1.js";
import { MonkeysAnalyzer } from "./monkey.js";

describe("11.2", () => {
  it("test with test.txt", async () => {
    const businessValue = await getMonkeyBusiness(10000, 2, false, "test.txt");
    expect(businessValue).toEqual(2713310158);
  });

  it("test with input.txt", async () => {
    const businessValue = await getMonkeyBusiness(10000, 2, false, "input.txt");
    expect(businessValue).toEqual(14081365540);
  });
});
