import { readFileLines } from "../../common/readfileLines.js";
import { MixingDecoder } from "./mixingDecoder.js";

export async function sumOfQualityLevels(
  decriptionKey: number,
  numberOfMixes: number,
  useCircVal: boolean,
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const mixingDecoder = new MixingDecoder(decriptionKey);

  for await (const line of rl) {
    mixingDecoder.readLine(line, useCircVal);
  }
  mixingDecoder.finishReading();
  for (let i = 0; i < numberOfMixes; i++) {
    mixingDecoder.mixCoordinates();
  }

  const valuesAtIndexes = mixingDecoder.valuesAtIndexes(1000, 2000, 3000);
  const result = valuesAtIndexes.reduce((prev, curr) => prev + curr);
  return result;
}
