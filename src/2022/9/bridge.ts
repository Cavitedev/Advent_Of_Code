import { Direction } from "./direction.js";

export class Bridge {
  public cellsTraversed: Coordinate[];
  private _tail: Coordinate;
  private _head: Coordinate;
  private knots: Coordinate[];

  constructor(amountOfKnots: number) {
    this.cellsTraversed = [];
    this.knots = [];
    this.tail = new Coordinate(0, 0);
    this._head = new Coordinate(0, 0);
    for (let index = 0; index < amountOfKnots; index++) {
      //One know is the tail
      this.knots.push(new Coordinate(0, 0));
    }
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

  public moveHead(dirLetter: string, amount: number) {
    const dir: Direction = Direction.FromLetter(dirLetter);
    const moveCoordinate = dir.moveCoordinate;
    for (let index = 0; index < amount; index++) {
      let prevHead = this.head;
      this._head = this.head.sumPos(moveCoordinate);
      let curHead = this._head;
      let lastMove: Coordinate = moveCoordinate;
      this.knots.forEach(function (knot, index, knots) {
        if (!curHead.isAdyacent(knot)) {
          if (lastMove.isDiagonal()) {
            knots[index] = knots[index].sumPos(lastMove);
          } else {
            knots[index] = prevHead;
          }
        }
        lastMove = knots[index].subPos(knot);
        prevHead = knot;
        curHead = knots[index];
      });
      if (!curHead.isAdyacent(this.tail)) {
        if (lastMove.isDiagonal()) {
          this.tail = this.tail.sumPos(lastMove);
        } else {
          this.tail = prevHead;
        }
      }
    }
  }

  //Thanks to https://stackoverflow.com/a/56757215/14559140
  public unrepeatedCellsTraversed(): Coordinate[] {
    return this.cellsTraversed.filter(
      (v, i, a) => a.findIndex((v2) => v2.isEqual(v)) === i
    );
  }

  public displayMovements(
    dimX: number,
    dimY: number,
    minX: number,
    minY: number
  ): string {
    let strDisplay = "";
    const maxX = dimX + minX;
    const maxY = dimY + minY;
    for (let i = maxY - 1; i >= minY; i--) {
      for (let j = minX; j < maxX; j++) {
        const cordCheck = new Coordinate(j, i);
        const indexKnot = this.knots.findIndex((knot) =>
          knot.isEqual(cordCheck)
        );
        if (this.head.isEqual(cordCheck)) {
          strDisplay += "H";
        } else if (indexKnot >= 0) {
          strDisplay += indexKnot + 1;
        } else if (this.tail.isEqual(cordCheck)) {
          strDisplay += "T";
        } else if (i === 0 && j === 0) {
          strDisplay += "s";
        } else {
          strDisplay += ".";
        }
      }
      strDisplay += "\n";
    }
    strDisplay = strDisplay.substring(0, strDisplay.length - 1);
    return strDisplay;
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

  public isDiagonal(): boolean {
    const x = Math.abs(this.x);
    const y = Math.abs(this.y);

    return x > 0 && y > 0;
  }

  public bestMovementToReach(other: Coordinate): Coordinate {
    const difX = other.x - this.x;
    const difY = other.y - this.y;
    return new Coordinate(
      difX === 0 ? 0 : difX > 0 ? 1 : -1,
      difY === 0 ? 0 : difY > 0 ? 1 : -1
    );
  }

  public isEqual(other: Coordinate): boolean {
    return other.x === this.x && other.y === this.y;
  }
}
