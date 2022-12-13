import { readFileLines } from "../../common/readfileLines.js";
import { PacketsReader } from "./packetsReader.js";

export async function getDecoreKeyFromPackets(
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const packetsReader = new PacketsReader();

  for await (const line of rl) {
    packetsReader.readLine(line);
  }

  const result = packetsReader.getDecoderKeyFromPackets();

  return result;
}
