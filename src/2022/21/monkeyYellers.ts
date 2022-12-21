export class MonkeyYellers {
  public monkeys: { [key: string]: IMonkey };

  constructor() {
    this.monkeys = {};
  }

  public readLine(line: string) {

    const [name, operation] = line.split(':');

    const number = +operation.trim()
    if(! isNaN(number)){
        const newMonkey = new NumberMonkey(number);
        this.monkeys[name] = newMonkey;
        return;
    }

    const [monkeyA, op, monkeyB] = / ([^\s]*) ([^\s]+) ([^\s]+)/.exec(line).slice(1);
    const newMonkey = new OperatorMonkey(monkeyA, op, monkeyB);
    this.monkeys[name] = newMonkey;
  }

  public monkeyYell(monkeyName:string){
    const monkey = this.monkeys[monkeyName];
    return monkey.yellNumber(this.monkeys);
  }
}

export interface IMonkey {
  yellNumber(monkeys: { [key: string]: IMonkey }): number;
}

export class NumberMonkey implements IMonkey {
  public num: number;

  constructor(num: number) {
    this.num = num;
  }
  yellNumber(monkeys: { [key: string]: IMonkey }): number {
    return this.num;
  }
}

export class OperatorMonkey implements IMonkey {
  public monkeyAStr: string;
  public operator: string;
  public monkeyBStr: string;
  public yelledNumber: number;

  constructor(monkeyA: string, operator: string, monkeyB: string) {
    this.monkeyAStr = monkeyA;
    this.operator = operator;
    this.monkeyBStr = monkeyB;
  }

  yellNumber(monkeys: { [key: string]: IMonkey }): number {
    if (this.yelledNumber) return this.yelledNumber;

    const monkeyA = monkeys[this.monkeyAStr];
    const monkeyB = monkeys[this.monkeyBStr];

    switch (this.operator) {
      case "+":
        this.yelledNumber =
          monkeyA.yellNumber(monkeys) + monkeyB.yellNumber(monkeys);
        break;
      case "-":
        this.yelledNumber =
          monkeyA.yellNumber(monkeys) - monkeyB.yellNumber(monkeys);
        break;
      case "*":
        this.yelledNumber =
          monkeyA.yellNumber(monkeys) * monkeyB.yellNumber(monkeys);
        break;
      case "/":
        this.yelledNumber =
          monkeyA.yellNumber(monkeys) / monkeyB.yellNumber(monkeys);
        break;
    }

    return this.yelledNumber;
  }
}
