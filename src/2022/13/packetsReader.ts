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
    currentPacketPair.packetPairs.push(Packet.FromLine(line));
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
  public packetPairs: Packet[];

  constructor() {
    this.packetPairs = [];
  }

  public areRightOrder(): boolean {
    let leftValue: IValue = this.packetPairs[0];

    for (let i = 1; i < this.packetPairs.length; i++) {
      const rightValue = this.packetPairs[i];
      const rightOrder = leftValue.isLeftFrom(rightValue);
      if (!rightOrder) {
        return false;
      }
      leftValue = rightValue;
    }

    return true;
  }
}

interface IValue {
  value: number;

  isLeftFrom(otherPacket: IValue): boolean;
}

export class IntValue implements IValue {
  public value: number;

  constructor(value: number) {
    this.value = value;
  }

  public isLeftFrom(otherValue: IValue): boolean {
    if (otherValue instanceof IntValue) {
      return this.value <= otherValue.value;
    } else if (otherValue instanceof Packet) {
      const otherPacket = otherValue as Packet;
      if (otherPacket.values.length === 0) {
        return false;
      }
      const packetFirstValue = otherPacket.values[0];
      const isLeft = this.isLeftFrom(packetFirstValue);
      if (!isLeft) {
        return false;
      } else {
        return otherPacket.values.length === 1;
      }
    }
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

  public isLeftFrom(otherValue: IValue): boolean {
    let otherPacket: Packet;
    if (otherValue instanceof IntValue) {
      otherPacket = new Packet([otherValue]);
    } else {
      otherPacket = otherValue as Packet;
    }

    for (let i = 0; i < this.values.length; i++) {
      if (this.values.length === i && otherPacket.values.length === i) {
        return true;
      }
      if (this.values.length === i) {
        return true;
      }
      if (otherPacket.values.length === i) {
        return false;
      }
      const leftValue = this.values[i];
      const rightValue = otherPacket.values[i];
      const isLeft = leftValue.isLeftFrom(rightValue);
      if (!isLeft) {
        return false;
      }
    }

    return true;
  }
}
