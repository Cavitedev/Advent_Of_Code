export class Utils {
  public static greatestCommonDivisor = (a: number, b: number) => {
    let tmp: number;
    while (b !== 0) {
      tmp = b;
      b = a % b;
      a = tmp;
    }
    return a;
  };

  public static leastCommonMultiple = (a: number, b: number) => {
    return (a * b) / Utils.greatestCommonDivisor(a, b);
  };
}
