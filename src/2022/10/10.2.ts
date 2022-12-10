import { readFileLines } from "../../common/readfileLines.js";
import { SingalReader } from "./singalReader.js";

export async function displayFromSignal(file: string): Promise<string> {
  const rl = readFileLines(__dirname, file);

  const signalReader = new SingalReader();

  for await (const line of rl) {
    signalReader.readLine(line);
  }

  const display = signalReader.displayScreen();
  return display;
}
