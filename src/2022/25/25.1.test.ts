import { sumOfSnafuNumbers } from "./25.1.js";
import { SnafuConverter, SnafuReader } from "./snafu.js";

describe("25.1", () => {
  describe("SNAFU to decimal", () => {
    it("2 in SNAFU is 2 in decimal", () => {
      expect(SnafuConverter.toDecimal("2")).toEqual(2);
    });
    it("1= in SNAFU is 3 in decimal", () => {
      expect(SnafuConverter.toDecimal("1=")).toEqual(3);
    });
    it("1=-0-2 in SNAFU is 1747 in decimal", () => {
      expect(SnafuConverter.toDecimal("1=-0-2")).toEqual(1747);
    });
  });
  describe("Decimal to SNAFU", () => {
    it("2 in decimal is 2 in SNAFU", () => {
      expect(SnafuConverter.toSnafu(2)).toEqual("2");
    });
    it("3 in decimal is 1= in SNAFU", () => {
      expect(SnafuConverter.toSnafu(3)).toEqual("1=");
    });

    it("7 in decimal is 12 in SNAFU", () => {
      expect(SnafuConverter.toSnafu(7)).toEqual("12");
    });

    it("198 in decimal is 2=0= in SNAFU", () => {
      expect(SnafuConverter.toSnafu(198)).toEqual("2=0=");
    });

    it("1747 in decimal is 1=-0-2 in SNAFU", () => {
      expect(SnafuConverter.toSnafu(1747)).toEqual("1=-0-2");
    });
  });

  it("Snafu Reader reads a line and adds its value to the total and the stored SNAFUs", () => {
    const reader = new SnafuReader();
    reader.readLine("1=-0-2");
    expect(reader.snafuNumbers[0]).toEqual("1=-0-2");
    expect(reader.total).toEqual(1747);
  });

  it("Test with test.txt", async () => {
    const result = await sumOfSnafuNumbers("test.txt");
    expect(result).toEqual("2=-1=0");
  });

  it("Test with input.txt", async () => {
    const result = await sumOfSnafuNumbers("input.txt");
    expect(result).toEqual("2=0=02-0----2-=02-10");
  });
});
