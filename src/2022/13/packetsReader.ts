export class PacketsReader {
  public packetGroups: PacketGroup[];

  constructor() {
    this.packetGroups = [new PacketGroup()];
  }

  public readLine(line: string) {
    if (line === "") {
      this.packetGroups.push(new PacketGroup());
      return;
    }

    const currentPacketPair = this._getCurrentPacketPair();
    currentPacketPair.packetPair.push(Packet.FromLine(line));
  }

  public sumRightOrderPacketsIndexes() {
    let sum = 0;
    for (let i = 0; i < this.packetGroups.length; i++) {
      const packetGroup = this.packetGroups[i];
      const rightOrder = packetGroup.areRightOrder();
      if (rightOrder) {
        sum += i + 1;
      }
    }
    return sum;
  }

  private _getCurrentPacketPair(): PacketGroup {
    return this.packetGroups[this.packetGroups.length - 1];
  }
}

export class PacketGroup {
  public packetPair: Packet[];

  constructor() {
    this.packetPair = [];
  }

  public areRightOrder(): boolean {
    return true;
  }
}

interface IValue {
  value: number;
}

export class IntValue implements IValue {
  public value: number;

  constructor(value: number) {
    this.value = value;
  }
}

export class Packet implements IValue {
  public values: IValue[];

  constructor(values: IValue[]) {
    this.values = values;
  }

  public static FromLine(line: string): Packet {
    const inputArray: [] = JSON.parse(line);
    const returnBrackets: IValue[] = [];

    for (const input of inputArray) {
      const iValue = Packet.FromValue(input);
      returnBrackets.push(iValue);
    }

    return new Packet(returnBrackets);
  }

  public static FromValue(value: [] | number): IValue {
    if (typeof value === "number") {
      return new IntValue(value);
    } else {
      const arrayValue = value as [];
      const returnIValues: IValue[] = [];
      for (const v of arrayValue) {
        returnIValues.push(Packet.FromValue(v));
      }
      return new Packet(returnIValues);
    }
  }

  public get value(): number {
    return this.values[0].value;
  }

  public shiftNextIValue(): IValue {
    return this.values.shift();
  }
}
