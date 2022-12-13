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

  public getDecoderKeyFromPackets(): number {
    const allPackets = this.packetGroups
      .map((packet) => packet.packetPairs)
      .flat();

    const dividerPacket1 = new Packet([new Packet([new IntValue(2)])]);
    const dividerPacket2 = new Packet([new Packet([new IntValue(6)])]);

    allPackets.push(dividerPacket1);
    allPackets.push(dividerPacket2);

    const orderedPackets = allPackets.sort((a, b) => a.compareWith(b));
    const index1 = orderedPackets.indexOf(dividerPacket1) + 1;
    const index2 = orderedPackets.indexOf(dividerPacket2) + 1;

    return index1 * index2;
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
      const rightOrder = leftValue.compareWith(rightValue);
      if (rightOrder >= 0) {
        return false;
      }
      leftValue = rightValue;
    }

    return true;
  }
}

interface IValue {
  value: number;

  /**
   *
   * @param otherPacket
   * @returns <0 if left, 0 if equal, > 0 if greater
   */
  compareWith(otherPacket: IValue): number;
}

export class IntValue implements IValue {
  public value: number;

  constructor(value: number) {
    this.value = value;
  }

  public compareWith(otherValue: IValue): number {
    if (otherValue instanceof IntValue) {
      return this.value - otherValue.value;
    } else if (otherValue instanceof Packet) {
      const otherPacket = otherValue as Packet;
      const thisAsPacket = new Packet([this]);
      return thisAsPacket.compareWith(otherPacket);
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

  public compareWith(otherValue: IValue): number {
    let otherPacket: Packet;
    if (otherValue instanceof IntValue) {
      otherPacket = new Packet([otherValue]);
    } else {
      otherPacket = otherValue as Packet;
    }

    if (this.values.length === 0 && otherPacket.values.length === 0) {
      return 0;
    }
    if (this.values.length === 0) {
      return -1;
    }
    if (otherPacket.values.length === 0) {
      return 1;
    }

    for (
      let i = 0;
      i < Math.max(this.values.length, otherPacket.values.length);
      i++
    ) {
      if (this.values.length === i && otherPacket.values.length === i) {
        return 0;
      }
      if (this.values.length === i) {
        return -1;
      }
      if (otherPacket.values.length === i) {
        return +1;
      }
      const leftValue = this.values[i];
      const rightValue = otherPacket.values[i];
      const comparison = leftValue.compareWith(rightValue);
      if (comparison != 0) {
        return comparison;
      }
    }

    return 0;
  }
}
