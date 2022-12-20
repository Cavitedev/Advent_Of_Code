import { readFileLines } from "../../common/readfileLines.js";
import { MixingDecoder } from "./mixingDecoder.js";



export async function sumOfQualityLevels(
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const mixingDecoder = new MixingDecoder();

  for await (const line of rl) {
    mixingDecoder.readLine(line);
  }
  mixingDecoder.finishReading();
  mixingDecoder.mixCoordinates();

  const valuesAtIndexes = mixingDecoder.valuesAtIndexes(1000, 2000, 3000);
  const result = valuesAtIndexes.reduce((prev, curr) => prev + curr);
  return result;
}
