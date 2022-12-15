import { readFileLines } from "../../common/readfileLines.js";
import { BeaconZone } from "./beaconZone.js";

export async function checkedPointsInRow(
  row: number,
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const beaconZone = new BeaconZone();

  for await (const line of rl) {
    beaconZone.readLine(line);
  }

  const result = beaconZone.checkedPointsCountAtRow(row);

  return result;
}
