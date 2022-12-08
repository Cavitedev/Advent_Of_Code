import { runsackPrioritiesSumGroups } from "./3.2.js";
import { Runsack } from "./Runsack.js";

describe("3.2", () => {
  it("Ransack finds item in common with 3 sets of items", () => {
    const runsack = new Runsack([
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
    ]);

    const lettersInCommon = runsack.sharedItems();
    expect(lettersInCommon).toEqual(["r"]);
  });

  it("Ransack finds value of item with 3 sets of items", () => {
    const runsack = new Runsack([
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
    ]);

    const itemValue = runsack.sharedItemsPrioritiesSum();
    expect(itemValue).toEqual(18);
  });

  it("Returns right score from test.txt", async () => {
    const res = await runsackPrioritiesSumGroups(3, "test.txt");
    expect(res).toBe(70);
  });

  it("Returns right score from input.txt", async () => {
    const res = await runsackPrioritiesSumGroups(3, "input.txt");
    expect(res).toBe(2864);
  });
});
