export class MonkeysAnalyzer {
  public monkeys: Monkey[];
  private _currentMonkey: number;

  constructor() {
    this.monkeys = [];
    this._currentMonkey = -1;
  }

  public addMonkey() {
    this.monkeys.push(new Monkey());
    this.nextMonkey();
  }

  public currentMonkey(): Monkey {
    if (this._currentMonkey === -1) return null;
    return this.monkeys[this._currentMonkey];
  }

  public nextMonkey() {
    this._currentMonkey = (this._currentMonkey + 1) % this.monkeys.length;
  }

  readLine(line: string) {
    if (!line.trim()) return;
    const splittedLine = line.split(":");
    const command = splittedLine[0].trim();

    if (command.startsWith("Monkey")) {
      this.addMonkey();
      return;
    }
    const monkey = this.currentMonkey();
    const values = splittedLine[1].trim();

    if (command === "Starting items") {
      this._addItems(values, monkey);
      return;
    }

    if (command === "Operation") {
      this._addOperation(values, monkey);
      return;
    }

    if (command === "Test") {
      this._addThrowCondition(values, monkey);
      return;
    }

    if (command === "If true") {
      this._addMonkeyToThrowIfTrue(values, monkey);
      return;
    }

    if (command === "If false") {
      this._addMonkeyToThrowIfFalse(values, monkey);
      return;
    }
  }

  private _addItems(values: string, monkey: Monkey) {
    const itemsStr = values.split(",");
    for (const itemStr of itemsStr) {
      const item: number = +itemStr.trim();
      monkey.receiveItem(item);
    }
  }

  private _addOperation(values: string, monkey: Monkey) {
    const splittedValues = values.split(" ");
    const operator = splittedValues[splittedValues.length - 2];
    const valueStr = splittedValues[splittedValues.length - 1];
    const value: number = parseInt(valueStr);
    if (operator === "+") {
      if (isNaN(value)) {
        monkey.operation = (old: number) => old + old;
      } else {
        monkey.operation = (old: number) => old + value;
      }
    } else if (operator === "*") {
      if (isNaN(value)) {
        monkey.operation = (old: number) => old * old;
      } else {
        monkey.operation = (old: number) => old * value;
      }
    }
  }

  private _addThrowCondition(values: string, monkey: Monkey) {
    const splittedValues = values.split(" ");
    const valueStr = splittedValues[splittedValues.length - 1];
    const value = +valueStr;

    monkey.throwCondition = (item: number) => item % value === 0;
  }

  private _addMonkeyToThrowIfTrue(values: string, monkey: Monkey) {
    const splittedValues = values.split(" ");
    const value = +splittedValues[splittedValues.length - 1];
    monkey.ifTrueMonkeyIndex = value;
  }

  private _addMonkeyToThrowIfFalse(values: string, monkey: Monkey) {
    const splittedValues = values.split(" ");
    const value = +splittedValues[splittedValues.length - 1];
    monkey.ifFalseMonkeyIndex = value;
  }

  public finishReading() {
    this.nextMonkey();
  }

  public performRoundActions(rounds: number) {
    for (let i = 0; i < rounds; i++) {
      for (const monkey of this.monkeys) {
        monkey.throwItems(this.monkeys);
      }
    }
  }

  public getInspectionCounts() {
    return this.monkeys.map((monkey) => monkey.inspectionCount);
  }
}

export class Monkey {
  public items: number[];
  public operation: (old: number) => number;
  public throwCondition: (item: number) => boolean;
  public ifTrueMonkeyIndex: number;
  public ifFalseMonkeyIndex: number;
  public inspectionCount: number;

  constructor() {
    this.items = [];
    this.inspectionCount = 0;
  }

  public receiveItem(item: number) {
    this.items.push(item);
  }

  public throwItems(allMonkeys: Monkey[]) {
    for (let i = 0; i < this.items.length; i++) {
      //Inspect
      let item = this.items[i];
      this.inspectionCount++;
      //Multiply worry level
      item = this.operation(item);
      //Gets bored
      item = Math.floor(item / 3);
      //Check throw condition
      const conditionTrue = this.throwCondition(item);
      //Throw
      const monkeyIndex = conditionTrue
        ? this.ifTrueMonkeyIndex
        : this.ifFalseMonkeyIndex;
      const monkeyToThrow = allMonkeys[monkeyIndex];
      monkeyToThrow.receiveItem(item);
    }

    this.items = [];
  }
}
