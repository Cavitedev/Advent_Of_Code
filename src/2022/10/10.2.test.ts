import { getSignalStrength } from "./10.1.js";
import { displayFromSignal } from "./10.2.js";
import { SingalReader } from "./singalReader.js";

describe("10.2", () => {
  it("Signal reader init values for screen are right", () => {
    const reader = new SingalReader();
    expect(reader.displayWidth).toEqual(40);
    expect(reader.displayHeight).toEqual(6);

    expect(reader.display.length).toEqual(6);
    expect(reader.display[0].length).toEqual(40);

    const expectedScreen = `........................................
........................................
........................................
........................................
........................................
........................................`;

    expect(reader.displayScreen()).toEqual(expectedScreen);
  });

  it("Entering a noop, . remains", () => {
    const reader = new SingalReader();
    reader.readLine("noop");

    const expectedScreen = `#.......................................
........................................
........................................
........................................
........................................
........................................`;

    expect(reader.displayScreen()).toEqual(expectedScreen);
  });

  it("Entering 4 noops, 3 # are written", () => {
    const reader = new SingalReader();
    reader.readLine("noop");
    reader.readLine("noop");
    reader.readLine("noop");
    reader.readLine("noop");

    const expectedScreen = `###.....................................
........................................
........................................
........................................
........................................
........................................`;

    expect(reader.displayScreen()).toEqual(expectedScreen);
  });

  it("Entering addx 15 and addx -11 and addx6 return right display", () => {
    const reader = new SingalReader();
    reader.readLine("addx 15");
    reader.readLine("addx -11");
    reader.readLine("addx 6");

    const expectedScreen = `##..##..................................
........................................
........................................
........................................
........................................
........................................`;

    expect(reader.displayScreen()).toEqual(expectedScreen);
  });

  it("Works with test text", async () => {
    const result = await displayFromSignal("test.txt");

    const display = `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`;

    expect(result).toEqual(display);
  });

  it("Test with test.txt", async () => {
    const result = await displayFromSignal("test.txt");

    const display = `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`;

    expect(result).toEqual(display);
  });

  it("Test with input.txt", async () => {
    const result = await displayFromSignal("input.txt");

    const display = `'####..##..###...##....##.####...##.####.
...#.#..#.#..#.#..#....#.#.......#....#.
..#..#....###..#..#....#.###.....#...#..
.#...#....#..#.####....#.#.......#..#...
#....#..#.#..#.#..#.#..#.#....#..#.#....
####..##..###..#..#..##..#.....##..####.'`;

    expect(result).toEqual(display);
  });
});
