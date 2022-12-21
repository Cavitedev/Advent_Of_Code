import { readFileLines } from "../../common/readfileLines.js";
import { MonkeyYellers } from "./monkeyYellers.js";


export async function yourYell(
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const monkeyYellers = new MonkeyYellers();

  for await (const line of rl) {
    monkeyYellers.readLine(line);
  }


  const result = monkeyYellers.yourYell("humn");
  return result;
}
