export class Tree {
  public visibilityDirections: VisibilityDirection[];
  public height: number;

  constructor(height: number) {
    this.height = height;
    this.visibilityDirections = Array(4)
      .fill(null)
      .map(() => new VisibilityDirection());
  }

  public get leftVisibility(): VisibilityDirection {
    return this.visibilityDirections[0];
  }

  public get upVisibility(): VisibilityDirection {
    return this.visibilityDirections[1];
  }

  public get rightVisibility(): VisibilityDirection {
    return this.visibilityDirections[2];
  }

  public get downVisibility(): VisibilityDirection {
    return this.visibilityDirections[3];
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
