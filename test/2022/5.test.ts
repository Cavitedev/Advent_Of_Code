import { stacksCraneSimulation } from "../../src/2022/5/5suplyStacks.js";
import { SuplyStacks } from "../../src/2022/5/suplyStacks.js";

describe("Fifth problem from Advent Code 2022", () => {
  describe("Tests for the first part of the problem", () => {
    it("Suply Stack is built correctly on input", () => {
      const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `;

      const suplyStacks = SuplyStacks.fromString(input);
      const expectedStacks = [["Z", "N"], ["M", "C", "D"], ["P"]];

      expect(suplyStacks.stacks).toEqual(expectedStacks);
    });

    it("Move two stacks from 2 to 3 works on CrateMover9000", () => {
      const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `;

      const suplyStacks = SuplyStacks.fromString(input);
      suplyStacks.moveStacks(2, 1, 2);
      const expectedStacks = [["Z", "N"], ["M"], ["P", "D", "C"]];

      expect(suplyStacks.stacks).toEqual(expectedStacks);
    });

    it("Move two stacks from 2 to 3 works on CrateMover9000 with string input", () => {
      const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `;

      const suplyStacks = SuplyStacks.fromString(input);
      suplyStacks.moveStacksString("move 2 from 2 to 3");
      const expectedStacks = [["Z", "N"], ["M"], ["P", "D", "C"]];

      expect(suplyStacks.stacks).toEqual(expectedStacks);
    });

    it("SuplyStack displays the top element of each stack with top stacks", () => {
      const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `;

      const suplyStacks = SuplyStacks.fromString(input);

      const topOnStacks = suplyStacks.topOnStacks();
      const expected = "NDP";

      expect(topOnStacks).toEqual(expected);
    });

    it("Test with test.txt", async () => {
      const result = await stacksCraneSimulation(9000, "test.txt");
      expect(result).toEqual("CMZ");
    });

    it("Test with input.txt", async () => {
      const result = await stacksCraneSimulation(9000, "input.txt");
      expect(result).toEqual("JCMHLVGMG");
    });
  });

//   describe("Tests for the second part of the problem", () => {
//     it("Move two stacks from 2 to 3 works on CrateMover9001 with string input", () => {
//       const input = `    [D]    
// [N] [C]    
// [Z] [M] [P]
//  1   2   3 `;

//       const suplyStacks = CrateMover9001.fromString(input);
//       suplyStacks.moveStacksString("move 2 from 2 to 3");
//       const expectedStacks = [["Z", "N"], ["M"], ["P", "C", "D"]];

//       expect(suplyStacks.stacks).toEqual(expectedStacks);
//     });

//     it("Test with test.txt", async () => {
//       const result = await stacksCraneSimulation(9001, "test.txt");
//       expect(result).toEqual("MCD");
//     });
//   });
});
