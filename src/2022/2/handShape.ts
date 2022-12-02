import {
  PaperFactory,
  RockFactory,
  ScissorsFactory,
} from "./handShapeFactory.js";
import {
  DrawRoundResult,
  LoseRoundResult,
  RoundResult,
  WinRoundResult,
} from "./RoundResult.js";

export abstract class HandShape {
  abstract Score: number;

  abstract doesItWin(other: HandShape): RoundResult;

  /**
   * Hand shape, so you attain result over your opponent
   *  */
  public handShapeForResult(result: RoundResult): HandShape {
    for (const handShape of this.handShapeTypes()) {
      const simulationRoundResult = this.doesItWin(handShape);

      if (simulationRoundResult.constructor == result.constructor) {
        return handShape;
      }
    }
  }

  /**
   * Hand shape, so your opponent attains result
   *  */
  public handShapeForResultOpponent(result: RoundResult): HandShape {
    for (const handShape of this.handShapeTypes()) {
      const simulationRoundResult = handShape.doesItWin(this);

      if (simulationRoundResult.constructor == result.constructor) {
        return handShape;
      }
    }
  }

  public scoreRound(other: HandShape): number {
    const matchResult: RoundResult = this.doesItWin(other);
    return this.Score + matchResult.Score;
  }

  public handShapeTypes() {
    return [
      PaperFactory.Instance.buildHandShape(),
      RockFactory.Instance.buildHandShape(),
      ScissorsFactory.Instance.buildHandShape(),
    ];
  }
}

export class PaperShape extends HandShape {
  Score: number = 2;

  public doesItWin(other: HandShape): RoundResult {
    if (other instanceof PaperShape) return new DrawRoundResult();
    if (other instanceof RockShape) return new WinRoundResult();
    if (other instanceof ScissorsShape) return new LoseRoundResult();
  }
}

export class RockShape extends HandShape {
  Score: number = 1;

  public doesItWin(other: HandShape): RoundResult {
    if (other instanceof PaperShape) return new LoseRoundResult();
    if (other instanceof RockShape) return new DrawRoundResult();
    if (other instanceof ScissorsShape) return new WinRoundResult();
  }
}

export class ScissorsShape extends HandShape {
  Score: number = 3;

  public doesItWin(other: HandShape): RoundResult {
    if (other instanceof PaperShape) return new WinRoundResult();
    if (other instanceof RockShape) return new LoseRoundResult();
    if (other instanceof ScissorsShape) return new DrawRoundResult();
  }
}
