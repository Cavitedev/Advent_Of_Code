import {
  DrawRoundResult,
  LoseRoundResult,
  RoundResult,
  WinRoundResult,
} from "./RoundResult.js";

export abstract class HandShape {
  abstract Score: number;

  constructor() {}

  abstract doesItWin(other: HandShape): RoundResult;

  scoreMatch(other: HandShape): number {
    const matchResult: RoundResult = this.doesItWin(other);
    return this.Score + matchResult.Score;
  }
}

export class PaperShape extends HandShape {
  Score: number = 2;

  doesItWin(other: HandShape): RoundResult {
    if (other instanceof PaperShape) return new DrawRoundResult();
    if (other instanceof RockShape) return new WinRoundResult();
    if (other instanceof ScissorsShape) return new LoseRoundResult();
  }
}

export class RockShape extends HandShape {
  Score: number = 1;

  doesItWin(other: HandShape): RoundResult {
    if (other instanceof PaperShape) return new LoseRoundResult();
    if (other instanceof RockShape) return new DrawRoundResult();
    if (other instanceof ScissorsShape) return new WinRoundResult();
  }
}

export class ScissorsShape extends HandShape {
  Score: number = 3;

  doesItWin(other: HandShape): RoundResult {
    if (other instanceof PaperShape) return new WinRoundResult();
    if (other instanceof RockShape) return new LoseRoundResult();
    if (other instanceof ScissorsShape) return new DrawRoundResult();
  }
}
