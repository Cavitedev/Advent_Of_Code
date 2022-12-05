export class CrateMover9000 {
  public stacks: string[][];

  constructor(stacks: string[][]) {
    this.stacks = stacks;
  }

  public static fromString(str: string): CrateMover9000 {
    //Get non empty lines from read
    let stacks: string[][] = CrateMover9000.stacksFromStr(str);

    return new CrateMover9000(stacks);
  }

  public static stacksFromStr(str: string) {
    const lines = str.split("\n").filter((line) => line);

    const stacksCount = lines[lines.length - 1].split("  ").length;
    //Another Option
    // const stacksCount = (lines[0].length + 1) / 4
    let stacks: string[][] = [];

    //Read from last line with elements
    let lineIndex = lines.length - 2;

    for (let i = 0; i < stacksCount; i++) {
      const stack = [];
      let line = lines[lineIndex--];
      let element = line[1 + i * 4];

      while (element.trim()) {
        stack.push(element);
        if (lineIndex < 0) break;
        line = lines[lineIndex--];
        element = line[1 + i * 4];
      }
      lineIndex = lines.length - 2;
      stacks.push(stack);
    }
    return stacks;
  }

  public moveStacks(amount: number, from: number, to: number): void {
    const fromStack = this.stacks[from];
    const toStack = this.stacks[to];

    for (let i = 0; i < amount; i++) {
      const element = fromStack.pop();
      toStack.push(element);
    }
  }

  public moveStacksString(str: string): void {
    const regexMove = /move (\d+)/;
    const moveNumber = +regexMove.exec(str)[1];

    const regexFrom = /from (\d+)/;
    const fromNumber = +regexFrom.exec(str)[1];

    const regexTo = /to (\d+)/;
    const toNumber = +regexTo.exec(str)[1];

    this.moveStacks(moveNumber, fromNumber - 1, toNumber - 1);
    return;
  }

  public topOnStacks(): string {
    return this.stacks.map((stack) => stack[stack.length - 1]).join("");
  }
}

export class CrateMover9001 extends CrateMover9000 {
  public static fromString(str: string): CrateMover9000 {
    //Get non empty lines from read
    let stacks: string[][] = CrateMover9000.stacksFromStr(str);

    return new CrateMover9001(stacks);
  }

  public moveStacks(amount: number, from: number, to: number): void {
    const fromStack = this.stacks[from];
    const toStack = this.stacks[to];

    const tmpStack = [];

    for (let i = 0; i < amount; i++) {
      const element = fromStack.pop();
      tmpStack.unshift(element);
    }

    toStack.push(...tmpStack);
  }
}
