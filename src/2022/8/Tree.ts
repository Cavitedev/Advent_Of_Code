export class Tree {
  public visibilityDirections: VisibilityDirection[];
  public height: number;

  constructor(height: number) {
    this.height = height;
    this.visibilityDirections = Array(4)
      .fill(null)
      .map(() => new VisibilityDirection());
  }

  public isVisible(): boolean{
    return this.visibilityDirections.some(tree => tree.isVisible);
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
}

export class VisibilityDirection {
  private _isVisible: boolean;
  hasChecked: boolean;

  constructor() {
    this._isVisible = false;
    this.hasChecked = false;
  }

  public get isVisible(): boolean {
    return this._isVisible;
  }

  public set isVisible(isVisible: boolean) {
    this._isVisible = isVisible;
    this.hasChecked = true;
  }
}
