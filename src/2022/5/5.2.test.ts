import { stacksCraneSimulation } from "./5.js";
import { CrateMover9000, CrateMover9001 } from "./crateMover.js";

describe("5.2", () => {
  it("Move two stacks from 2 to 3 works on CrateMover9001 with string input", () => {
    const input = `    [D]    
[N] [C]    
[Z] [M] [P]
1   2   3 `;

    const suplyStacks = CrateMover9001.fromString(input);
    suplyStacks.moveStacksString("move 2 from 2 to 3");
    const expectedStacks = [["Z", "N"], ["M"], ["P", "C", "D"]];

    expect(suplyStacks.stacks).toEqual(expectedStacks);
  });

  it("Test with test.txt", async () => {
    const result = await stacksCraneSimulation(9001, "test.txt");
    expect(result).toEqual("MCD");
  });

  it("Test with test.txt", async () => {
    const result = await stacksCraneSimulation(9001, "input.txt");
    expect(result).toEqual("LVMRWSSPZ");
  });
});
