import { CubeFace } from "./monkeyCubeMap.js";

export abstract class MapCell {
  public row: number;
  public column: number;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  public abstract get exists(): boolean;
  public abstract get canTravel(): boolean;
}

export class UnexistentCell extends MapCell {
  constructor(row: number, column: number) {
    super(row, column);
  }

  public get exists(): boolean {
    return false;
  }

  public get canTravel(): boolean {
    return false;
  }
}

export abstract class ExistentCell extends MapCell {
  public cube: CubeFace;

  constructor(row: number, column: number) {
    super(row, column);
  }

  public get exists(): boolean {
    return true;
  }
}

export class EmptyCell extends ExistentCell {
  constructor(row: number, column: number) {
    super(row, column);
  }

  public get canTravel(): boolean {
    return true;
  }
}

export class WallCell extends ExistentCell {
  constructor(row: number, column: number) {
    super(row, column);
  }

  public get canTravel(): boolean {
    return false;
  }
}
