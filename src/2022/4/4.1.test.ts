import { amountOfElvesOnCleanOverlap } from "./4.js";
import {
  ElvesCleaningSections,
  ElveCleaningSections,
} from "./elvesCleaningSections.js";

describe("4.1", () => {
  it("2 elves cleaning duty can be instantiated from string", () => {
    const str = "2-4,6-8";
    const elvesCleaningSections = ElvesCleaningSections.fromString(str);

    const section1 = new ElveCleaningSections([2, 3, 4]);
    const section2 = new ElveCleaningSections([6, 7, 8]);

    const expected = new ElvesCleaningSections([section1, section2]);

    expect(elvesCleaningSections.cleanSectionsGroups).toEqual(
      expected.cleanSectionsGroups
    );
  });

  it("Elve check full overlap returns false when there's not a complete overlap", () => {
    const section1 = new ElveCleaningSections([2, 3, 4]);
    const section2 = new ElveCleaningSections([3, 4, 5]);

    const actual = section1.fullyOverlapsWith(section2);
    const actual2 = section2.fullyOverlapsWith(section1);

    expect(actual).toBe(false);
    expect(actual2).toEqual(actual);
  });

  it("Elve check full overlap returns true when groups fully overlap", () => {
    const section1 = new ElveCleaningSections([2, 3, 4]);
    const section2 = new ElveCleaningSections([3, 4]);

    const actual = section1.fullyOverlapsWith(section2);
    const actual2 = section2.fullyOverlapsWith(section1);

    expect(actual).toBe(true);
    expect(actual2).toEqual(actual);
  });

  it("2 elves cleaning duty does not fully overlap returns false when checking it", () => {
    const elvesCleaningSections = ElvesCleaningSections.fromString("2-4,6-8");

    const actual = elvesCleaningSections.doesOneGroupFullyOverlapOthers();

    expect(actual).toEqual(false);
  });

  it("2 elves cleaning duty does fully overlap returns true when checking it", () => {
    const elvesCleaningSections = ElvesCleaningSections.fromString("2-8,3-7");

    const actual = elvesCleaningSections.doesOneGroupFullyOverlapOthers();

    expect(actual).toEqual(true);
  });

  it("Count works with test.txt", async () => {
    const overlapCount = await amountOfElvesOnCleanOverlap(true, "test.txt");
    expect(overlapCount).toEqual(2);
  });

  it("Count works with input.txt", async () => {
    const overlapCount = await amountOfElvesOnCleanOverlap(true, "input.txt");
    expect(overlapCount).toEqual(444);
  });
});
