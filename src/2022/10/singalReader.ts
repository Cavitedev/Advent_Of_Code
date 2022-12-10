export class SingalReader {
  private _xRegister: number;
  public xRegisterValues: number[];

  constructor() {
    const initValue = 1;
    this._xRegister = initValue;
    this.xRegisterValues = [initValue];
  }

  public get xRegister(): number {
    return this._xRegister;
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
    this.xRegisterValues.push(this._xRegister);
  }

  public sumOfStrength(): number{
    let strengthsSum = 0;
    const lastIter = Math.min(220, this.xRegisterValues.length)
    for(let i = 19; i<lastIter; i+=40){
        const x = this.xRegisterValues[i];
        const signalStrength = x * (i+1);
        strengthsSum += signalStrength;
    }

    return strengthsSum;
  }
}
