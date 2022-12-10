import { getSignalStrength } from "./10.js";
import { SingalReader } from "./singalReader.js";

describe("10.1", () => {
  it("Signal Reader init values are correct", () => {
    const reader = new SingalReader();

    expect(reader.xRegister).toEqual(1);
    expect(reader.xRegisterValues).toEqual([1]);
  });

  it("Read noop line adds 1 cycle without changing x", () => {
    const reader = new SingalReader();
    reader.readLine("noop");

    expect(reader.xRegister).toEqual(1);
    expect(reader.xRegisterValues).toEqual([1, 1]);
  });

  it("Read addx updates x after 2 cycles", () => {
    const reader = new SingalReader();
    reader.readLine("addx -5");

    expect(reader.xRegister).toEqual(-4);
    expect(reader.xRegisterValues).toEqual([1, 1, -4]);
  });
  it("Start sum of strengths is 0", () => {
    const reader = new SingalReader();

    expect(reader.sumOfStrength()).toEqual(0);
  });

  it("Works with test text", async () => {
    const result = await getSignalStrength("test.txt");
    expect(result).toEqual(13140);
  });

  it("Works with input text", async () => {
    const result = await getSignalStrength("input.txt");
    expect(result).toEqual(17940);
  });
});
