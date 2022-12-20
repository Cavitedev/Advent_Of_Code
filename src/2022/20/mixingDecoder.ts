export class MixingDecoder {
  public encryptedCoordinated: CircularValue[] = [];
  public decryptionKey: number;

  constructor(decryptionKey: number = 1) {
    this.decryptionKey = decryptionKey;
  }

  public readLine(line: string) {
    const value = new CircularValue(+line * this.decryptionKey);
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
  }

  public mixCoordinates() {
    for (const coordinate of this.encryptedCoordinated) {
      const posMoveNorm = coordinate.value % (this.encryptedCoordinated.length - 1);
      let posMoveNormBidirectional;

      if (Math.abs(posMoveNorm) < this.encryptedCoordinated.length / 2) {
        posMoveNormBidirectional = posMoveNorm % (this.encryptedCoordinated.length - 1);
      } else {
        const changePos = this.encryptedCoordinated.length - 1;
        posMoveNormBidirectional = posMoveNorm > 0 ? posMoveNorm - changePos : posMoveNorm + changePos;
      }

      coordinate.move(posMoveNormBidirectional);
    }
  }

  public valuesAtIndexes(...indexes: number[]): number[] {
    const valuesAtIndexes: number[] = [];

    const zeroElement = this.encryptedCoordinated.find((c) => c.value === 0);
    indexes.sort((a, b) => a - b);

    let i = 0;
    let curElement = zeroElement;
    for (const index of indexes) {
      for (i; i < index; i++) {
        curElement = curElement.next;
      }
      valuesAtIndexes.push(curElement.value);
    }

    return valuesAtIndexes;
  }
}

export class CircularValue {
  public value: number;
  public previous: CircularValue;
  public next: CircularValue;

  constructor(value: number) {
    this.value = value;
  }

  public connectNext(circularValue: CircularValue) {
    this.next = circularValue;
    circularValue.previous = this;
  }

  public connectPrevious(circularValue: CircularValue) {
    this.previous = circularValue;
    circularValue.next = this;
  }

  public move(movement: number) {
    if (Math.abs(movement) > 0) {
      this.next.connectPrevious(this.previous);
    }

    let currentMove: CircularValue = this;
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
}
