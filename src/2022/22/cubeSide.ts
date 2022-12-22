import { Direction } from "./direction.js";

export abstract class CubeSide {
  public connectedSide(dir: Direction): CubeSide {
    return dir.conSide(this);
  }

  public abstract get up(): CubeSide;
  public abstract get down(): CubeSide;
  public abstract get right(): CubeSide;
  public abstract get left(): CubeSide;

  public dirToSide(side: CubeSide) {
    for (const dir of Direction.Directions()) {
      const connectedSide = this.connectedSide(dir);
      if (side === connectedSide) {
        return dir;
      }
    }
  }
}

export class UpCubeSide extends CubeSide {
  private static _instance: UpCubeSide;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get up(): CubeSide {
    return BackCubeSide.Instance;
  }
  public get down(): CubeSide {
    return FrontCubeSide.Instance;
  }
  public get right(): CubeSide {
    return RightCubeSide.Instance;
  }
  public get left(): CubeSide {
    return LeftCubeSide.Instance;
  }
}

export class DownCubeSide extends CubeSide {
  private static _instance: DownCubeSide;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get up(): CubeSide {
    return FrontCubeSide.Instance;
  }
  public get down(): CubeSide {
    return BackCubeSide.Instance;
  }
  public get right(): CubeSide {
    return RightCubeSide.Instance;
  }
  public get left(): CubeSide {
    return LeftCubeSide.Instance;
  }
}

export class RightCubeSide extends CubeSide {
  private static _instance: RightCubeSide;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get up(): CubeSide {
    return UpCubeSide.Instance;
  }
  public get down(): CubeSide {
    return DownCubeSide.Instance;
  }
  public get right(): CubeSide {
    return BackCubeSide.Instance;
  }
  public get left(): CubeSide {
    return FrontCubeSide.Instance;
  }
}

export class LeftCubeSide extends CubeSide {
  private static _instance: LeftCubeSide;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get up(): CubeSide {
    return UpCubeSide.Instance;
  }
  public get down(): CubeSide {
    return DownCubeSide.Instance;
  }
  public get right(): CubeSide {
    return FrontCubeSide.Instance;
  }
  public get left(): CubeSide {
    return BackCubeSide.Instance;
  }
}

export class FrontCubeSide extends CubeSide {
  private static _instance: FrontCubeSide;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get up(): CubeSide {
    return UpCubeSide.Instance;
  }
  public get down(): CubeSide {
    return DownCubeSide.Instance;
  }
  public get right(): CubeSide {
    return RightCubeSide.Instance;
  }
  public get left(): CubeSide {
    return LeftCubeSide.Instance;
  }
}

export class BackCubeSide extends CubeSide {
  private static _instance: BackCubeSide;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get up(): CubeSide {
    return UpCubeSide.Instance;
  }
  public get down(): CubeSide {
    return DownCubeSide.Instance;
  }
  public get right(): CubeSide {
    return LeftCubeSide.Instance;
  }
  public get left(): CubeSide {
    return RightCubeSide.Instance;
  }
}
