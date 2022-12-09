export abstract class Direction {
  abstract get dirLetter(): string;

  public static Directions(): Direction[] {
    return [Left.Instance, Up.Instance, Right.Instance, Down.Instance];
  }

  
}

export class Left extends Direction {
  private static _instance: Left;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
  get dirLetter(): string {
    return "L";
  }
}

export class Up extends Direction {
  private static _instance: Up;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  get dirLetter(): string {
    return "U";
  }
}

export class Right extends Direction {
  private static _instance: Right;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  get dirLetter(): string {
    return "R";
  }
}

export class Down extends Direction {
  private static _instance: Up;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  get dirLetter(): string {
    return "D";
  }
}
