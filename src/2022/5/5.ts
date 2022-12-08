import {readFileLines} from "../../common/readfileLines.js"
import { CrateMover9000, CrateMover9001 } from "./crateMover.js";

export async function stacksCraneSimulation(
  model: number = 9000,
  file: string = "input.txt"
): Promise<string> {
  const rl = readFileLines(__dirname, file);

  let initialState = "";
  let suplyStacks: CrateMover9000 = null;

  for await (const line of rl) {
    if (suplyStacks == null) {
      initialState += line + "\n";
      if (line === "") {
        suplyStacks =
          model === 9000
            ? CrateMover9000.fromString(initialState)
            : CrateMover9001.fromString(initialState);
      }
    } else {
      suplyStacks.moveStacksString(line);
    }
  }

  const output = suplyStacks.topOnStacks();
  console.log(output);
  return output;
}
