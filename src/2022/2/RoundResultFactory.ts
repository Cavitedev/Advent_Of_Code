import {
  DrawRoundResult,
  LoseRoundResult,
  RoundResult,
  WinRoundResult,
} from "./RoundResult.js";

export class RoundResultFactory {
  private static _instance: RoundResultFactory;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private _roundResultFactories: { [key: string]: IRoundResultFactory } = {
    X: LoseRoundResultFactory.Instance,
    Y: DrawRoundResultFactory.Instance,
    Z: WinRoundResultFactory.Instance,
  };

  createMatchResult(input: string): RoundResult {
    const factory = this._roundResultFactories[input];
    const result = factory.buildRoundResult();
    return result;
  }
}

interface IRoundResultFactory {
  buildRoundResult(): RoundResult;
}

class WinRoundResultFactory implements IRoundResultFactory {
  private static _instance: WinRoundResultFactory;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public buildRoundResult(): RoundResult {
    return new WinRoundResult();
  }
}

class DrawRoundResultFactory implements IRoundResultFactory {
  private static _instance: DrawRoundResultFactory;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public buildRoundResult(): RoundResult {
    return new DrawRoundResult();
  }
}

class LoseRoundResultFactory implements IRoundResultFactory {
  private static _instance: LoseRoundResultFactory;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public buildRoundResult(): RoundResult {
    return new LoseRoundResult();
  }
}
