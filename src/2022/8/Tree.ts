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


