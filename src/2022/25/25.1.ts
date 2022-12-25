import { readFileLines } from "../../common/readfileLines.js";
import { SnafuReader } from "./snafu.js";

export async function sumOfSnafuNumbers(file: string): Promise<string> {
  const rl = readFileLines(__dirname, file);

  const snafuReader = new SnafuReader();

  for await (const line of rl) {
    snafuReader.readLine(line);
  }

  const result = snafuReader.totalSnafu();

  return result;
}
