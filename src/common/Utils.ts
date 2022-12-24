export class Utils {
  public static GreatestCommonDivisor = (a: number, b: number) => {
    let tmp: number;
    while (b !== 0) {
      tmp = b;
      b = a % b;
      a = tmp;
    }
    return a;
  };

  public static LeastCommonMultiple = (a: number, b: number) => {
    return (a * b) / Utils.GreatestCommonDivisor(a, b);
  };

  public static ManhattanDistance(
    i: number,
    j: number,
    endI: number,
    endJ: number
  ): number {
    return Math.abs(endI - i) + Math.abs(endJ - j);
  }
}
