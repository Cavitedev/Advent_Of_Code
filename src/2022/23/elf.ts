export class Elf {
  public lastMove: Point;
}

export class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  //I could use a factory pattern to change these

  public toKey(): string {
    // return JSON.stringify(this);
    return `${this.x}_${this.y}`;
  }

  public static fromKey(key: string): Point {
    // const json = JSON.parse(key) as Point;
    // return new Point(json.x, json.y);
    const [x, y] = key.split("_");
    return new Point(+x, +y);
  }
}
