import { spreadArea } from "./23.1.js";
import { CheckPos, NorthCheck } from "./checkPos.js";
import { Point } from "./elf.js";
import { ElfSpread } from "./elfSpread.js";

describe("23.1", () => {
  describe("Check Pos", () => {
    const point = new Point(1, 1);
    const n = new Point(1, 2);
    const ne = new Point(2, 2);
    const nw = new Point(0, 2);
    const e = new Point(2, 1);
    const w = new Point(0, 1);
    const s = new Point(1, 0);
    const se = new Point(2, 0);
    const sw = new Point(0, 0);

    it("All adyacent positions at (1,1) contain 8 values", () => {
      const northCheck = CheckPos.North;
      const adyPos = northCheck.allAdyacentPositions(point);
      expect(adyPos.length).toEqual(8);
      const expected = [sw, s, se, w, e, nw, n, ne];
      expect(adyPos).toEqual(expect.arrayContaining(expected));
    });

    it("North adyacent positions are right", () => {
      const northCheck = CheckPos.North;
      const adyPos = northCheck.adyacentPositions(point);
      expect(adyPos.length).toEqual(3);
      const expected = [nw, n, ne];
      expect(adyPos).toEqual(expect.arrayContaining(expected));
    });

    it("East adyacent positions are right", () => {
      const eastCheck = CheckPos.East;
      const adyPos = eastCheck.adyacentPositions(point);
      expect(adyPos.length).toEqual(3);
      const expected = [ne, e, se];
      expect(adyPos).toEqual(expect.arrayContaining(expected));
    });

    it("South adyacent positions are right", () => {
      const southCheck = CheckPos.South;
      const adyPos = southCheck.adyacentPositions(point);
      expect(adyPos.length).toEqual(3);
      const expected = [sw, s, se];
      expect(adyPos).toEqual(expect.arrayContaining(expected));
    });

    it("West adyacent positions are right", () => {
      const westCheck = CheckPos.West;
      const adyPos = westCheck.adyacentPositions(point);
      expect(adyPos.length).toEqual(3);
      const expected = [nw, w, sw];
      expect(adyPos).toEqual(expect.arrayContaining(expected));
    });

    it("North adyacent position is n", () => {
      const northCheck = CheckPos.North;
      const adyPos = northCheck.adyacentPos(point);
      expect(adyPos).toEqual(n);
    });

    it("East adyacent position is e", () => {
      const eastCheck = CheckPos.East;
      const adyPos = eastCheck.adyacentPos(point);
      expect(adyPos).toEqual(e);
    });

    it("South adyacent position is s", () => {
      const southCheck = CheckPos.South;
      const adyPos = southCheck.adyacentPos(point);
      expect(adyPos).toEqual(s);
    });

    it("West adyacent position is w", () => {
      const westCheck = CheckPos.West;
      const adyPos = westCheck.adyacentPos(point);
      expect(adyPos).toEqual(w);
    });
  });

  describe("Elf test spread", () => {
    let elfSpread: ElfSpread;
    const input = `.....
    ..##.
    ..#..
    .....
    ..##.
    .....`;
    beforeEach(() => {
      elfSpread = new ElfSpread();

      for (const line of input.split("\n")) {
        elfSpread.readLine(line.trim());
      }
    });
    it("5 elves are set up correctly", () => {
      expect(elfSpread.elves.size).toEqual(5);
    });
    it("Start area is 8", () => {
      expect(elfSpread.currentArea()).toEqual(8);
    });

    it("Print elves displays the input", () => {
      const printedOutput = elfSpread.printElves();
      let expectedPrint = `##
#.
..
##`;
      expect(printedOutput).toEqual(expectedPrint);
    });

    it("After one round they spread to the right directions", () => {
      elfSpread.spread(1);
      const printedOutput = elfSpread.printElves();
      let expectedPrint = `##
..
#.
.#
#.`;
      expect(printedOutput).toEqual(expectedPrint);
    });

    it("After four round they spread to the right directions", () => {
      elfSpread.spread(4);
      const printedOutput = elfSpread.printElves();
      let expectedPrint = `..#..
....#
#....
....#
.....
..#..`;
      expect(printedOutput).toEqual(expectedPrint);
    });
  });

  it("Test with miniTest.txt", async () => {
    const result = await spreadArea(10, "miniTest.txt");
    expect(result).toEqual(25);
  });

  it("Test with test.txt", async () => {
    const result = await spreadArea(10, "test.txt");
    expect(result).toEqual(110);
  });

  it("Test with input.txt", async () => {
    const result = await spreadArea(10, "input.txt");
    expect(result).toEqual(3757);
  });
});
