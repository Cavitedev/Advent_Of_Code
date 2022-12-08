import {
  runsackPrioritiesSum,
  runsackPrioritiesSumGroups,
} from "./3runsackReorganization.js";
import { Runsack } from "./Runsack.js";

describe("Third problem from Advent Code 2022", () => {
  describe("Tests for the first part of the problem", () => {
    it("Runsack splits 2 compartments correctly", () => {
      const runsack = Runsack.fromSingleItemsList(
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        2
      );
      const compartment1 = runsack.compartments[0];
      expect(compartment1).toBe("vJrwpWtwJgWr");
      const compartment2 = runsack.compartments[1];
      expect(compartment2).toBe("hcsFMMfFFhFp");
    });

    it("Return right letter in common in compartments when there's 1 letter", () => {
      const runsack = Runsack.fromSingleItemsList(
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        2
      );
      const itemInCommon = runsack.sharedItems();
      expect(itemInCommon).toEqual(["p"]);
    });

    it("Return right letter in common in compartments when there's 1 letter several times", () => {
      const runsack = Runsack.fromSingleItemsList(
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        2
      );
      const itemInCommon = runsack.sharedItems();
      expect(itemInCommon).toEqual(["L"]);
    });

    it("Return right item value on lowercase letter", () => {
      const runsack = Runsack.fromSingleItemsList(
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        2
      );
      //Actually it should execute sharedLetters
      const itemInCommon = "p";
      const itemValue = runsack.itemPriority(itemInCommon);
      expect(itemValue).toEqual(16);
    });

    it("Return right item value on uppercase letter", () => {
      const runsack = Runsack.fromSingleItemsList(
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        2
      );
      //Actually it should execute sharedLetters
      const itemInCommon = "L";
      const itemValue = runsack.itemPriority(itemInCommon);
      expect(itemValue).toEqual(38);
    });

    it("Returns right value when adding priorities of items when there's a single element in common", () => {
      const runsack = Runsack.fromSingleItemsList(
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        2
      );
      const itemValue = runsack.sharedItemsPrioritiesSum();
      expect(itemValue).toEqual(16);
    });

    it("Returns right score from text.txt", async () => {
      const res = await runsackPrioritiesSum(2, "test.txt");
      expect(res).toBe(157);
    });

    it("Returns right score from input.txt", async () => {
      const res = await runsackPrioritiesSum(2, "input.txt");
      expect(res).toBe(8202);
    });
  });

  describe("Tests for the second part of the problem", () => {
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
});
