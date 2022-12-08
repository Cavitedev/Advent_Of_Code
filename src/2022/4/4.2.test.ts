import { amountOfElvesOnCleanOverlap } from "./4.js";
import {
  ElvesCleaningSections,
  ElveCleaningSections,
} from "./elvesCleaningSections.js";

describe("4.2", () => {
  it("Elve check overlapping returns false when there's no overlap at all", () => {
    const section1 = new ElveCleaningSections([2, 3, 4]);
    const section2 = new ElveCleaningSections([6, 7, 8]);

    const actual = section1.overlapsWith(section2);
    const actual2 = section2.overlapsWith(section1);

    expect(actual).toBe(false);
    expect(actual2).toEqual(actual);
  });

  it("Elve check overlapping returns true when there's overlap", () => {
    const section1 = new ElveCleaningSections([2, 3, 4]);
    const section2 = new ElveCleaningSections([3, 4]);

    const actual = section1.overlapsWith(section2);
    const actual2 = section2.overlapsWith(section1);

    expect(actual).toBe(true);
    expect(actual2).toEqual(actual);
  });

  it("2 elves cleaning duty is not overlapped returns false on overlap", () => {
    const elvesCleaningSections = ElvesCleaningSections.fromString("2-4,6-8");

    const actual = elvesCleaningSections.isThereAnyOverlapping();

    expect(actual).toEqual(false);
  });

  it("2 elves cleaning duty are overlapped, returns true on overlap", () => {
    const elvesCleaningSections = ElvesCleaningSections.fromString("2-3,3-7");

    const actual = elvesCleaningSections.isThereAnyOverlapping();

    expect(actual).toEqual(true);
  });

  it("Count works with test.txt", async () => {
    const overlapCount = await amountOfElvesOnCleanOverlap(false, "test.txt");
    expect(overlapCount).toEqual(4);
  });

  it("Count works with input.txt", async () => {
    const overlapCount = await amountOfElvesOnCleanOverlap(false, "input.txt");
    expect(overlapCount).toEqual(801);
  });
});
