import { readFileLines } from "../../common/readfileLines.js";
import { BeaconZone } from "./beaconZone.js";

export async function getDistressSignal(
  start: number,
  end: number,
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const beaconZone = new BeaconZone();

  for await (const line of rl) {
    beaconZone.readLine(line);
  }

  const signalPoint = beaconZone.getDistressSignal(start, end);
  const result = signalPoint.x * 4000000 + signalPoint.y;
  return result;
}
