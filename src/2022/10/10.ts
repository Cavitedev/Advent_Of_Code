import { readFileLines } from "../../common/readfileLines.js";
import { SingalReader } from "./singalReader.js";

export async function getSignalStrength(file: string): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const signalReader = new SingalReader();

  for await (const line of rl) {
    signalReader.readLine(line);
  }

  const signalStrength = signalReader.sumOfStrength();
  return signalStrength;
}
