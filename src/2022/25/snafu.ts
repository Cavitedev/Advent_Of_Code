export class SnafuReader {
  public snafuNumbers: string[] = [];
  public total: number = 0;

  public readLine(line: string) {
    this.snafuNumbers.push(line);
    const dec = SnafuConverter.toDecimal(line);
    this.total += dec;
  }

  public totalSnafu() {
    return SnafuConverter.toSnafu(this.total);
  }
}

export class SnafuConverter {
  private static _SnafuDigits = {
    "=": -2,
    "-": -1,
    "0": 0,
    "1": 1,
    "2": 2,
  };

  public static toDecimal(snafu: String): number {
    let multiplier = 1;
    let totalValue = 0;
    for (let i = snafu.length - 1; i >= 0; i--) {
      const char = snafu[i];
      const value = this._SnafuDigits[char];
      totalValue += value * multiplier;
      multiplier *= 5;
    }
    return totalValue;
  }

  private static _DecimalSnafu = {
    0: ["0", false],
    1: ["1", false],
    2: ["2", false],
    3: ["=", true],
    4: ["-", true],
  };

  public static toSnafu(decimal: number): string {
    let divider = 1;
    let totalValue = "";
    let carry = false;
    let value: string;
    while (decimal > divider) {
      const decValue = Math.floor(decimal / divider) % 5;
      [value, carry] = this._DecimalSnafu[decValue];
      if (carry) {
        decimal -= SnafuConverter._SnafuDigits[value] * divider;
      }
      totalValue = value + totalValue;
      divider *= 5;
    }

    if (carry) {
      totalValue = "1" + totalValue;
    }
    return totalValue;
  }
}
