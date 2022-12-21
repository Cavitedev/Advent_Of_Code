export class MixingDecoder {
  public encryptedCoordinated: ICircularValue[] = [];
  public copyCordinates: ICircularValue[];
  public decryptionKey: number;

  constructor(decryptionKey: number = 1) {
    this.decryptionKey = decryptionKey;
  }

  public readLine(line: string, useCircular: boolean = true) {
    const numVal = +line * this.decryptionKey;
    const value = useCircular ? new CircularValue(numVal) : new Value(numVal);
    if (this.encryptedCoordinated.length > 0) {
      const lastValue =
        this.encryptedCoordinated[this.encryptedCoordinated.length - 1];
      value.connectPrevious(lastValue);
    }
    this.encryptedCoordinated.push(value);
  }

  public finishReading() {
    const firstValue = this.encryptedCoordinated[0];
    const lastValue =
      this.encryptedCoordinated[this.encryptedCoordinated.length - 1];
    lastValue.connectNext(firstValue);
    this.copyCordinates = [...this.encryptedCoordinated];
  }

  public mixCoordinates() {
    for (const coordinate of this.copyCordinates) {
      const posMoveNorm =
        coordinate.value % (this.encryptedCoordinated.length - 1);
      let posMoveNormBidirectional: number;

      if (Math.abs(posMoveNorm) < this.encryptedCoordinated.length / 2) {
        posMoveNormBidirectional =
          posMoveNorm % (this.encryptedCoordinated.length - 1);
      } else {
        const changePos = this.encryptedCoordinated.length - 1;
        posMoveNormBidirectional =
          posMoveNorm > 0 ? posMoveNorm - changePos : posMoveNorm + changePos;
      }

      coordinate.move(posMoveNormBidirectional, this.encryptedCoordinated);
    }
  }

  public valuesAtIndexes(...indexes: number[]): number[] {
    const zeroElement = this.encryptedCoordinated.find((c) => c.value === 0);
    indexes.sort((a, b) => a - b);

    return zeroElement.valuesAtIndexes(this.encryptedCoordinated, ...indexes);
  }
}

interface ICircularValue {
  value: number;
  previous: ICircularValue;
  next: ICircularValue;
  connectNext(circularValue: ICircularValue): void;
  connectPrevious(circularValue: ICircularValue): void;
  move(movement: number, numberList: ICircularValue[]): void;
  valuesAtIndexes(curNumbers: ICircularValue[], ...indexes: number[]): number[];
}

export class CircularValue implements ICircularValue {
  public value: number;
  public previous: ICircularValue;
  public next: ICircularValue;

  constructor(value: number) {
    this.value = value;
  }

  public connectNext(circularValue: ICircularValue) {
    this.next = circularValue;
    circularValue.previous = this;
  }

  public connectPrevious(circularValue: ICircularValue) {
    this.previous = circularValue;
    circularValue.next = this;
  }

  public move(movement: number, numberList: ICircularValue[]) {
    if (Math.abs(movement) > 0) {
      this.next.connectPrevious(this.previous);
    }

    let currentMove: ICircularValue = this;
    if (movement > 0) {
      for (let i = 0; i < Math.abs(movement); i++) {
        currentMove = currentMove.next;
      }
      if (currentMove === this) return;
      this.connectNext(currentMove.next);
      this.connectPrevious(currentMove);
    } else if (movement < 0) {
      for (let i = 0; i < Math.abs(movement); i++) {
        currentMove = currentMove.previous;
      }
      this.connectPrevious(currentMove.previous);
      this.connectNext(currentMove);
    }
  }

  public valuesAtIndexes(
    curNumbers: ICircularValue[],
    ...indexes: number[]
  ): number[] {
    const valuesAtIndexes: number[] = [];

    let i = 0;
    let curElement: ICircularValue = this;
    for (const index of indexes) {
      for (i; i < index; i++) {
        curElement = curElement.next;
      }
      valuesAtIndexes.push(curElement.value);
    }

    return valuesAtIndexes;
  }
}

export class Value implements ICircularValue {
  public value: number;

  constructor(value: number) {
    this.value = value;
  }
  get previous(): ICircularValue {
    return null;
  }

  get next(): ICircularValue {
    return null;
  }

  public connectNext(circularValue: ICircularValue) {}

  public connectPrevious(circularValue: ICircularValue) {}

  public move(movement: number, numberList: ICircularValue[]) {
    const curIndex = numberList.indexOf(this);
    numberList.splice(curIndex, 1);
    const nextIndex =
      (curIndex + movement + numberList.length) % numberList.length;
    numberList.splice(nextIndex, 0, this);
  }

  public valuesAtIndexes(
    curNumbers: ICircularValue[],
    ...indexes: number[]
  ): number[] {
    const valuesAtIndexes: number[] = [];

    const zeroElement = curNumbers.find((c) => c.value === 0);
    indexes.sort((a, b) => a - b);

    const curIndex = curNumbers.indexOf(this);
    for (const movement of indexes) {
      const nextIndex =
        (curIndex + movement + curNumbers.length) % curNumbers.length;
      valuesAtIndexes.push(curNumbers[nextIndex].value);
    }
    return valuesAtIndexes;
  }
}
