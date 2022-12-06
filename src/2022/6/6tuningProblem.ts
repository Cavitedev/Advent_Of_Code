import { default as fs } from "fs";
import { default as readline } from "readline";
import { SignalTuner } from "./SignalTuner.js";

export async function detectMarkerOnSingal(
  markerSize: number = 4,
  file: String = "input.txt"
): Promise<number> {
  const rl = readFileByLine(file);

  let result = 0;
  for await (const line of rl) {
    const tuner: SignalTuner = new SignalTuner(line);
    result = tuner.numberOfCharactersBeforeMarkerIsAvailable(markerSize);

    //Only 1 line
    break;
  }

  return result;
}

function readFileByLine(file: String): readline.Interface {
  const fileStream = fs.createReadStream("src/2022/6/" + file, {
    encoding: "utf8",
  });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  return rl;
}
