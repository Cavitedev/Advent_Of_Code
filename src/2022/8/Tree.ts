export class Tree {
  public visibilityDirections: VisibilityDirection[];
  public height: number;

  constructor(height: number) {
    this.height = height;
    this.visibilityDirections = Array(4)
      .fill(null)
      .map(() => new VisibilityDirection());
  }

  public isVisible(): boolean {
    return this.visibilityDirections.some((tree) => tree.isVisible);
  }

  public scenicScore() {
    return this.visibilityDirections.reduce((prev, curr) => {
      return prev * curr.visibleTrees;
    }, 1);
  }
}

export class VisibilityDirection {
  private _isVisible: boolean;
  public hasChecked: boolean;
  public visibleTrees: number;

  constructor() {
    this._isVisible = false;
    this.hasChecked = false;
    this.visibleTrees = 0;
  }

  public get isVisible(): boolean {
    return this._isVisible;
  }

  public set isVisible(isVisible: boolean) {
    this._isVisible = isVisible;
    this.hasChecked = true;
  }
}

export abstract class Orientation {
  public abstract getVisibility(tree: Tree): VisibilityDirection;
}

export class West extends Orientation {
  private static _instance: West;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public getVisibility(tree: Tree) {
    return tree.visibilityDirections[0];
  }
}

export class North extends Orientation {
  private static _instance: North;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public getVisibility(tree: Tree) {
    return tree.visibilityDirections[1];
  }
}

export class East extends Orientation {
  private static _instance: East;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public getVisibility(tree: Tree) {
    return tree.visibilityDirections[2];
  }
}

export class South extends Orientation {
  private static _instance: South;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public getVisibility(tree: Tree) {
    return tree.visibilityDirections[3];
  }
}
