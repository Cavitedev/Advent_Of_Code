import internal from "stream";

export class Runsack {
  compartments: Array<string>;

  constructor(compartments: Array<string>) {
    this.compartments = compartments;
  }

  static fromSingleItemsList(
    items: string,
    numberOfCompartments: number
  ): Runsack {
    const compartments = Runsack._evenlySplitCompartments(
      items,
      numberOfCompartments
    );

    return new Runsack(compartments);
  }

  private static _evenlySplitCompartments(
    items: string,
    numberOfCompartments: number
  ): Array<string> {
    let compartments: Array<string> = [];

    for (let i = 0; i < numberOfCompartments; i++) {
      const compartment = this._evenlySplitCompartment(
        items,
        i,
        numberOfCompartments
      );
      compartments.push(compartment);
    }
    return compartments;
  }

  private static _evenlySplitCompartment(
    items: string,
    compartmentIndex: number,
    numberOfCompartments: number
  ): string {
    const compartmentLength = items.length / numberOfCompartments;
    const compartment = items.slice(
      compartmentLength * compartmentIndex,
      compartmentLength * (compartmentIndex + 1)
    );

    return compartment;
  }

  public sharedItems() {
    let lettersInCommon: Array<string> = [...this.compartments[0]];

    for (let i = 1; i < this.compartments.length; i++) {
      const compartment: Array<string> = [...this.compartments[i]];
      lettersInCommon = lettersInCommon.filter((x) => compartment.includes(x));
    }

    //Removes duplicates
    lettersInCommon = [...new Set(lettersInCommon)];
    return lettersInCommon;
  }

  public itemPriority(item: string): number {
    const letterIndex: number = item.charCodeAt(0);

    if (this._isCharcodeLowerCase(letterIndex)) {
      return letterIndex - 96;
    }

    if (this._isCharcodeUpperCase(letterIndex)) {
      return letterIndex - 64 + 26;
    }
  }

  private _isCharcodeLowerCase(charcode: number) {
    return charcode >= 97 && charcode <= 122;
  }

  private _isCharcodeUpperCase(charcode: number) {
    return charcode >= 65 && charcode <= 90;
  }

  public sharedItemsPrioritiesSum(): number {
    const sharedItems = this.sharedItems();
    const sharedItemsPriotiesSum: number = sharedItems.reduce<number>(
      (a, b) => a + this.itemPriority(b),
      0
    );
    return sharedItemsPriotiesSum;
  }
}
