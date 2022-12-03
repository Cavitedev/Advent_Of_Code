import { runsackPrioritiesSum } from "../../src/2022/3/3runsackReorganization.js";
import { Runsack } from "../../src/2022/3/Runsack.js";

describe("Third problem from Advent Code 2022", () => {
  describe("Tests for the first part of the problem", () => {
    it("Runsack splits 2 compartments correctly", () => {
      const runsack = new Runsack("vJrwpWtwJgWrhcsFMMfFFhFp", 2);
      const compartment1 = runsack.compartments[0];
      expect(compartment1).toBe("vJrwpWtwJgWr");
      const compartment2 = runsack.compartments[1];
      expect(compartment2).toBe("hcsFMMfFFhFp");
    });

    it("Return right letter in common in compartments when there's 1 letter", () => {
      const runsack = new Runsack("vJrwpWtwJgWrhcsFMMfFFhFp", 2);
      const itemInCommon = runsack.sharedItems();
      expect(itemInCommon).toEqual(["p"]);
    });

    it("Return right letter in common in compartments when there's 1 letter several times", () => {
      const runsack = new Runsack("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL", 2);
      const itemInCommon = runsack.sharedItems();
      expect(itemInCommon).toEqual(["L"]);
    });

    it("Return right item value on lowercase letter", () => {
      const runsack = new Runsack("vJrwpWtwJgWrhcsFMMfFFhFp", 2);
      //Actually it should execute sharedLetters
      const itemInCommon = "p";
      const itemValue = runsack.itemPriority(itemInCommon);
      expect(itemValue).toEqual(16);
    });

    it("Return right item value on uppercase letter", () => {
      const runsack = new Runsack("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL", 2);
      //Actually it should execute sharedLetters
      const itemInCommon = "L";
      const itemValue = runsack.itemPriority(itemInCommon);
      expect(itemValue).toEqual(38);
    });

    it("Returns right value when adding priorities of items when there's a single element in common", () => {
      const runsack = new Runsack("vJrwpWtwJgWrhcsFMMfFFhFp", 2);
      const itemValue = runsack.sharedItemsPrioritiesSum();
      expect(itemValue).toEqual(16);
    });

    it("First part, returns right score from text.txt", async () => {
      const res = await runsackPrioritiesSum(2, "test.txt");
      expect(res).toBe(157);
    });
  });

  describe("Tests for the second part of the problem", () => {
    // it("Second part, returns right score from test.txt", async () => {
    //   const res = await runsackPrioritiesSum("input.txt");
    //   expect(res).toBe(157);
    // });
  });
});
