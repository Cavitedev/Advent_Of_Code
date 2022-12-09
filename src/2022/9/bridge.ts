import { Direction } from "./direction.js";

export class Bridge {
  public cellsTraversed: Coordinate[];
  private _tail: Coordinate;
  private _head: Coordinate;

  constructor() {
    this.cellsTraversed = [];
    this.tail = new Coordinate(0, 0);
    this._head = new Coordinate(0, 0);
  }

  public get tail(): Coordinate {
    return this._tail;
  }

  public get head(): Coordinate {
    return this._head;
  }

  public set tail(coordinate: Coordinate) {
    this._tail = coordinate;
    this.cellsTraversed.push(coordinate);
  }

  public moveTail(dirLetter: string, amount: number) {
    const dir: Direction = Direction.FromLetter(dirLetter);
    const moveCoordinate = dir.moveCoordinate;
    for (let index = 0; index < amount; index++) {
      const prevHeadPos = this._head;
      this._head = this.head.sumPos(moveCoordinate);
      if (!this._head.isAdyacent(this.tail)) {
        this.tail = prevHeadPos;
      }
    }
  }

  //Thanks to https://stackoverflow.com/a/56757215/14559140
  public unrepeatedCellsTraversed(): Coordinate[] {
    return this.cellsTraversed.filter(
      (v, i, a) => a.findIndex((v2) => v2.isEqual(v)) === i
    );
  }
}

export class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public sumPos(other: Coordinate) {
    return new Coordinate(this.x + other.x, this.y + other.y);
  }
  public subPos(other: Coordinate) {
    return new Coordinate(this.x - other.x, this.y - other.y);
  }

  public isAdyacent(other: Coordinate): boolean {
    const dif = this.subPos(other);
    const x = Math.abs(dif.x);
    const y = Math.abs(dif.y);
    const isAdyacent = x <= 1 && y <= 1;
    return isAdyacent;
  }

  public isEqual(other: Coordinate): boolean {
    return other.x === this.x && other.y === this.y;
  }
}
