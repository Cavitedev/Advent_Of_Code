import {readFileLines} from "../../common/readfileLines.js"
import { Terminal } from "./terminal.js";

export async function foldersBelowThresholdTotalSize(
  threshold: number,
  file: string = "input.txt"
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const terminal = new Terminal();

  for await (const line of rl) {
    terminal.readLine(line);
  }

  const foldersSizeUnderThreshold =
    terminal.fileExplorer.rootFolder.sumFolderSizesBelowThreshold(threshold);
  return foldersSizeUnderThreshold;
}
