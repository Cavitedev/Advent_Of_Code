export class Bridge {
  public cellsTraversed: Set<Coordinate>;
  public _head: Coordinate;
  public tail: Coordinate;

  constructor() {
    this.cellsTraversed = new Set<Coordinate>();
    this._head = new Coordinate(0, 0);
    this.tail = new Coordinate(0, 0);
    this.cellsTraversed.add(this._head);
  }

  public get head(): Coordinate {
    return this._head;
  }

  public set head(coordinate: Coordinate) {
    this._head = coordinate;
    this.cellsTraversed.add(coordinate);
  }

  public moveTail(dir: string) {
    
  }
}

export class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
