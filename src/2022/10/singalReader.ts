export class SingalReader {
  private _xRegister: number;
  public xRegisterValues: number[];
  public display: string[][];

  public displayWidth = 40;
  public displayHeight = 6;

  public static lightPixel: string = "#";
  public static darkPixel: string = ".";

  constructor() {
    const initValue = 1;
    this._xRegister = initValue;
    this.xRegisterValues = [initValue];
    this.display = new Array<string>(this.displayHeight)
      .fill(".")
      .map(() => new Array<string>(this.displayWidth).fill("."));
  }

  public get xRegister(): number {
    return this._xRegister;
  }

  public get cycleCount(): number {
    return this.xRegisterValues.length;
  }

  public readLine(line: string) {
    const splittedLine = line.split(" ");
    const command = splittedLine[0];
    if (command === "noop") {
      this._readNoop();
      return;
    }
    if (command == "addx") {
      const parameter = +splittedLine[1];
      this._readAddx(parameter);
    }
  }

  private _readNoop() {
    this._addCycle();
  }

  private _readAddx(parameter: number) {
    this._addCycle();
    this._xRegister += parameter;
    this._addCycle();
  }

  private _addCycle() {
    this._drawPixel(this.cycleCount - 1);
    this.xRegisterValues.push(this._xRegister);
  }

  private _drawPixel(pos: number) {
    const i = Math.floor(pos / 40);
    const j = pos % 40;

    const minDrawPixel = this.xRegister - 1;
    const maxDrawPixel = this.xRegister + 1;

    if (j >= minDrawPixel && j <= maxDrawPixel) {
      this.display[i][j] = SingalReader.lightPixel;
    } else {
      this.display[i][j] = SingalReader.darkPixel;
    }
  }

  public sumOfStrength(): number {
    let strengthsSum = 0;
    const lastIter = Math.min(220, this.cycleCount);
    for (let i = 19; i < lastIter; i += 40) {
      const x = this.xRegisterValues[i];
      const signalStrength = x * (i + 1);
      strengthsSum += signalStrength;
    }

    return strengthsSum;
  }

  public displayScreen(): string {
    const strScreen = this.display.map((line) => line.join("")).join("\n");
    return strScreen;
  }
}
