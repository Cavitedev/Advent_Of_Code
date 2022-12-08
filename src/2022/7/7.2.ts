import { readFileLines } from "../../common/readfileLines.js";
import { Terminal } from "./terminal.js";

export async function folderToDeleteToAchieveSpace(
  fileSystemSpace: number,
  neccesarySpace: number,
  file: string = "input.txt"
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const terminal = new Terminal();
  terminal.fileExplorer.totalSpace = fileSystemSpace;

  for await (const line of rl) {
    terminal.readLine(line);
  }

  const folderToDelete =
    terminal.fileExplorer.folderToAchieveSpace(neccesarySpace);
  return folderToDelete.size;
}
