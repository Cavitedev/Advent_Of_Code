import internal from "stream";

export class Runsack {
  items: string;
  compartments: number;

  constructor(items: string, compartments: number) {
    this.items = items;
    this.compartments = compartments;
  }

  public compartment(compartmentIndex: number): string {
    const compartmentLength = this.items.length / this.compartments;
    const compartment = this.items.slice(
      compartmentLength * compartmentIndex,
      compartmentLength * (compartmentIndex + 1)
    );

    return compartment;
  }

  public sharedItems() {
    let lettersInCommon: Array<string> = [...this.compartment(0)];

    for (let i = 1; i < this.compartments; i++) {
      const compartment: Array<string> = [...this.compartment(i)];
      lettersInCommon = lettersInCommon.filter((x) => compartment.includes(x));
    }

    //Removes duplicates
    lettersInCommon = [...new Set(lettersInCommon)]
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
    const sharedItemsPriotiesSum : number = sharedItems.reduce<number>(
      (a, b) => a + this.itemPriority(b),
      0
    );
    return sharedItemsPriotiesSum;
  }
}
