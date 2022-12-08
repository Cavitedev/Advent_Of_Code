import {readFileLines} from "../../common/readfileLines.js"
import { SignalTuner } from "./SignalTuner.js";

export async function detectMarkerOnSingal(
  markerSize: number = 4,
  file: string = "input.txt"
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  let result = 0;
  for await (const line of rl) {
    const tuner: SignalTuner = new SignalTuner(line);
    result = tuner.numberOfCharactersUntilMarkerIsAvailable(markerSize);

    //Only 1 line
    break;
  }

  return result;
}
