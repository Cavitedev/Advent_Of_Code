import { yourYell } from "./21.2.js";
import { Binom } from "./binom.js";

describe("21.2", () => {
  describe("Binom", () => {
    it("Add two binoms, add values", () => {
      const binom = new Binom(2, 3).add(new Binom(-4, 1));
      expect(binom).toEqual(new Binom(-2, 4));
    });

    it("Sustract two binoms, add values", () => {
      const binom = new Binom(2, 3).subtract(new Binom(-4, 1));
      expect(binom).toEqual(new Binom(6, 2));
    });

    it("Multiply two binoms where second one is minomial, multiplies by minomial", () => {
      const binom = new Binom(2, 3).multiply(new Binom(-4));
      expect(binom).toEqual(new Binom(-8, -12));
    });

    it("Multiply two binoms where first one is minomial, multiplies by minomial", () => {
      const binom = new Binom(-4).multiply(new Binom(2, 3));
      expect(binom).toEqual(new Binom(-8, -12));
    });

    it("Divide two binoms where second one is minomial, divides by minomial", () => {
      const binom = new Binom(2, 3).divide(new Binom(-4));
      expect(binom).toEqual(new Binom(-1 / 2, -3 / 4));
    });

    it("Divide two binoms where first one is minomial, divides by minomial", () => {
      const binom = new Binom(-4).divide(new Binom(2, 3));
      expect(binom).toEqual(new Binom(-1 / 2, -3 / 4));
    });

    it("Divide two monomials, first is dividided by the second", () => {
        const binom = new Binom(6).divide(new Binom(2));
        expect(binom).toEqual(new Binom(3));

    });

    it("Resolve equation by setting it equal to another one gets x value", () => {
      const binom = new Binom(4, 2);
      expect(binom.resolve(new Binom(2,0))).toEqual(-1);
    });
  });

  it("Test with test.txt", async () => {
    const result = await yourYell("test.txt");
    expect(result).toEqual(301);
  });

  it("Test with input.txt", async () => {
    const result = await yourYell("input.txt");
    expect(result).toEqual(3558714869436);
  });
});
