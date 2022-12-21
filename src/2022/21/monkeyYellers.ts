import { Binom } from "./binom.js";

export class MonkeyYellers {
  public monkeys: { [key: string]: IMonkey };

  constructor() {
    this.monkeys = {};
  }

  public readLine(line: string) {
    const [name, operation] = line.split(":");

    const number = +operation.trim();
    if (!isNaN(number)) {
      const newMonkey = new NumberMonkey(number);
      this.monkeys[name] = newMonkey;
      return;
    }

    const [monkeyA, op, monkeyB] = / ([^\s]*) ([^\s]+) ([^\s]+)/
      .exec(line)
      .slice(1);
    const newMonkey = new OperatorMonkey(monkeyA, op, monkeyB);
    this.monkeys[name] = newMonkey;
  }

  public monkeyYell(monkeyName: string) {
    const monkey = this.monkeys[monkeyName];
    return monkey.yellNumber(this.monkeys);
  }

  public yourYell(yourName: string) {
    this.monkeys[yourName] = new BinomMonkey(new Binom(0, 1));
    const yellRoot = (this.monkeys["root"] as OperatorMonkey).resolveEquality(
      this.monkeys
    );
    return yellRoot;
  }
}

export interface IMonkey {
  yellNumber(monkeys: { [key: string]: IMonkey }): Binom;
}

export class NumberMonkey implements IMonkey {
  public num: number;

  constructor(num: number) {
    this.num = num;
  }
  yellNumber(monkeys: { [key: string]: IMonkey }): Binom {
    return new Binom(this.num);
  }
}

export class OperatorMonkey implements IMonkey {
  public monkeyAStr: string;
  public operator: string;
  public monkeyBStr: string;
  public yelledNumber: Binom;

  constructor(monkeyA: string, operator: string, monkeyB: string) {
    this.monkeyAStr = monkeyA;
    this.operator = operator;
    this.monkeyBStr = monkeyB;
  }

  public yellNumber(monkeys: { [key: string]: IMonkey }): Binom {
    if (this.yelledNumber) return this.yelledNumber;

    const monkeyA = monkeys[this.monkeyAStr];
    const monkeyB = monkeys[this.monkeyBStr];

    switch (this.operator) {
      case "+":
        this.yelledNumber = monkeyA
          .yellNumber(monkeys)
          .add(monkeyB.yellNumber(monkeys));
        break;
      case "-":
        this.yelledNumber = monkeyA
          .yellNumber(monkeys)
          .subtract(monkeyB.yellNumber(monkeys));
        break;
      case "*":
        this.yelledNumber = monkeyA
          .yellNumber(monkeys)
          .multiply(monkeyB.yellNumber(monkeys));
        break;
      case "/":
        this.yelledNumber = monkeyA
          .yellNumber(monkeys)
          .divide(monkeyB.yellNumber(monkeys));
        break;
    }

    return this.yelledNumber;
  }

  public resolveEquality(monkeys: { [key: string]: IMonkey }): number {
    const monkeyA = monkeys[this.monkeyAStr];
    const monkeyB = monkeys[this.monkeyBStr];

    return monkeyA.yellNumber(monkeys).resolve(monkeyB.yellNumber(monkeys));
  }
}

export class BinomMonkey implements IMonkey {
  public binom: Binom;

  constructor(binom: Binom) {
    this.binom = binom;
  }
  yellNumber(monkeys: { [key: string]: IMonkey }): Binom {
    return this.binom;
  }
}
