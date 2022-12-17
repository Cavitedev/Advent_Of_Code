import { readFileLines } from "../../common/readfileLines.js";
import { Tetris } from "./tetris.js";

export async function calculateTetrisHeight(
  piecesCount: number,
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const tetris = new Tetris();

  for await (const line of rl) {
    const result = tetris.simulateMovements(line, piecesCount);
    return result;
  }
}
