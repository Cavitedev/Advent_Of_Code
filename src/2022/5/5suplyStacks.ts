import { default as fs } from "fs";
import { default as readline } from "readline";
import { CrateMover9000, CrateMover9001 } from "./crateMover.js";

export async function stacksCraneSimulation(
  model: number = 9000,
  file: String = "input.txt"
): Promise<string> {
  const rl = readFileByLine(file);

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

function readFileByLine(file: String): readline.Interface {
  const fileStream = fs.createReadStream("src/2022/5/" + file, {
    encoding: "utf8",
  });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  return rl;
}
