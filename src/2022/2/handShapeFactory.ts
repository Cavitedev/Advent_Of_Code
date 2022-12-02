import {
  HandShape,
  PaperShape,
  RockShape,
  ScissorsShape,
} from "./handShape.js";

export class HandShapeFactory {
  private static _instance: HandShapeFactory;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private _handShapeFactories: { [key: string]: IHandShapeFactory } = {
    A: RockFactory.Instance,
    B: PaperFactory.Instance,
    C: ScissorsFactory.Instance,
    X: RockFactory.Instance,
    Y: PaperFactory.Instance,
    Z: ScissorsFactory.Instance,
  };

  createHandShape(input: string): HandShape {
    const factory = this._handShapeFactories[input];
    const handShape = factory.buildHandShape();
    return handShape;
  }
}

interface IHandShapeFactory {
  buildHandShape(): HandShape;
}

export class PaperFactory implements IHandShapeFactory {
  private static _instance: PaperFactory;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public buildHandShape(): HandShape {
    return new PaperShape();
  }
}

export class RockFactory implements IHandShapeFactory {
  private static _instance: RockFactory;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public buildHandShape(): HandShape {
    return new RockShape();
  }
}

export class ScissorsFactory implements IHandShapeFactory {
  private static _instance: ScissorsFactory;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public buildHandShape(): HandShape {
    return new ScissorsShape();
  }
}
