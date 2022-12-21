export class Binom {
  public x: number;
  public value: number;

  constructor(value: number, x: number = 0) {
    this.value = value;
    this.x = x;
  }

  public add(other: Binom) {
    return new Binom(this.value + other.value, this.x + other.x);
  }

  public subtract(other: Binom) {
    return new Binom(this.value - other.value, this.x - other.x);
  }

  public multiply(other: Binom) {
    return new Binom(
      this.value * other.value,
      this.x * other.value + other.x * this.value
    );
  }

  public divide(other: Binom) {
    if (other.x === 0) {
      return new Binom(this.value / other.value, this.x / other.value);
    } else {
      return new Binom(other.value / this.value, other.x / this.value);
    }
  }

  public resolve(other: Binom) {
    return (other.value - this.value) / (this.x - other.x);
  }
}
