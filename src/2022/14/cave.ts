import { off } from "process";

export class Cave {
  public rockLines: RockLine[];
  public grid: string[][];
  private _sandPoint = new Point(500, 0);
  private _minX: number;
  private _minY: number;
  private _maxX: number;
  private _maxY: number;
  private _offset: number;

  constructor() {
    this.rockLines = [];
  }

  public readLine(line: string) {
    const splittedLine = line.split("->");

    const leftPointStr = splittedLine[0];
    let leftPoint = Point.fromString(leftPointStr);

    for (let i = 1; i < splittedLine.length; i++) {
      const pointStr = splittedLine[i];
      const rightPoint = Point.fromString(pointStr);
      const line = new RockLine(leftPoint, rightPoint);
      this.rockLines.push(line);
      leftPoint = rightPoint;
    }
  }

  public createGrid(offset: number = 0) {
    this._offset = offset;
    const linePoints: Point[] = [
      ...this.rockLines.map((line) => [line.point1, line.point2]).flat(),
      this._sandPoint,
    ];

    this._minX = Math.min(...linePoints.map((point) => point.x));
    this._minY = Math.min(...linePoints.map((point) => point.y));
    this._maxX = Math.max(...linePoints.map((point) => point.x));
    this._maxY = Math.max(...linePoints.map((point) => point.y));
    const xSize = this._maxX - this._minX + 1;
    const ySize = this._maxY - this._minY + 1;

    this.grid = Array(ySize + offset * 2)
      .fill(Array(xSize + offset * 2).fill(undefined))
      .map((row) => row.map(() => "."));

    for (const rockLine of this.rockLines) {
      if (rockLine.point1.x === rockLine.point2.x) {
        const x = rockLine.point1.x - this._minX + offset;
        const startY =
          Math.min(rockLine.point1.y, rockLine.point2.y) - this._minY + offset;
        const endY =
          Math.max(rockLine.point1.y, rockLine.point2.y) - this._minY + offset;

        for (let y = startY; y <= endY; y++) {
          this.grid[y][x] = "#";
        }
      } else if (rockLine.point1.y === rockLine.point2.y) {
        const y = rockLine.point1.y - this._minY + offset;
        const startX =
          Math.min(rockLine.point1.x, rockLine.point2.x) - this._minX + offset;
        const endX =
          Math.max(rockLine.point1.x, rockLine.point2.x) - this._minX + offset;

        for (let x = startX; x <= endX; x++) {
          this.grid[y][x] = "#";
        }
      }
    }

    this.grid[this._sandPoint.y - this._minY + offset][
      this._sandPoint.x - this._minX + offset
    ] = "+";
  }

  public fillWithSand(): number {
    let sandAdded = 0;
    let canSandBeAdded = true;
    while (canSandBeAdded) {
      let sandCell = this._generateNewSandCell();

      canSandBeAdded = this._moveSandCell(sandCell);
      if (canSandBeAdded) {
        this.grid[sandCell.y][sandCell.x] = "o";
        sandAdded++;
      }
    }

    return sandAdded;
  }

  public createGridV2() {

    //Grow offset depending on the input
    const offset = 200;
    this.createGrid(offset);
    const i = this._maxY + offset + 2;
    for (let j = 0; j < this.grid[0].length; j++) {
      this.grid[i][j] = "#";
    }
  }

  public fillWithSandTillTop(): number {
    let sandAdded = 0;

    const _sandPointCopy = this._generateNewSandCell();

    while (true) {
      let sandCell = this._generateNewSandCell();

      this._moveSandCell(sandCell);
      sandAdded++;
      if (sandCell.x === _sandPointCopy.x && sandCell.y === _sandPointCopy.y) {
        return sandAdded;
      }

      this.grid[sandCell.y][sandCell.x] = "o";
    }
  }

  private _generateNewSandCell() {
    return new Point(
      this._sandPoint.x - this._minX + this._offset,
      this._sandPoint.y - this._minY + this._offset
    );
  }

  private _moveSandCell(sandCell: Point): boolean {
    while (true) {
      if (sandCell.y + 1 >= this.grid.length) return false;
      const cellDown = this.grid[sandCell.y + 1][sandCell.x];

      if (cellDown === ".") {
        sandCell.y += 1;
        continue;
      }

      if (sandCell.x - 1 < 0) return false;
      const cellDownLeft = this.grid[sandCell.y + 1][sandCell.x - 1];
      if (cellDownLeft === ".") {
        sandCell.y += 1;
        sandCell.x -= 1;
        continue;
      }

      const cellDownRight = this.grid[sandCell.y + 1][sandCell.x + 1];

      if (sandCell.x + 1 >= this.grid[0].length) return false;
      if (!cellDownRight) return false;
      if (cellDownRight === ".") {
        sandCell.y += 1;
        sandCell.x += 1;
        continue;
      }

      return true;
    }
  }
}

export class RockLine {
  public point1: Point;
  public point2: Point;

  constructor(firstPoint: Point, secondPoint: Point) {
    this.point1 = firstPoint;
    this.point2 = secondPoint;
  }
}

export class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static fromString(str: string) {
    const splittedString = str.split(",");
    const valX = +splittedString[0];
    const valY = +splittedString[1];
    return new Point(valX, valY);
  }
}
