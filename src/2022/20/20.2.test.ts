import { sumOfQualityLevels } from "./20.js";
import { CircularValue, MixingDecoder } from "./mixingDecoder.js";

describe("20.2", () => {
  it("Read input with decryption key 2, multiplies its value by the key", () => {
    const mixingDecoder = new MixingDecoder(2);
    mixingDecoder.readLine("1");
    mixingDecoder.readLine("2");
    mixingDecoder.readLine("-3");
    mixingDecoder.finishReading();

    const num1 = new CircularValue(2);
    const num2 = new CircularValue(4);
    const num3 = new CircularValue(-6);
    num1.next = num2;
    num1.previous = num3;
    num2.next = num3;
    num2.previous = num1;
    num3.next = num1;
    num3.previous = num2;
    expect(mixingDecoder.encryptedCoordinated).toEqual([num1, num2, num3]);
  });

  it("Having 3 numbers, moving first element 0 positions, returns to original position", () => {
    const mixingDecoder = new MixingDecoder();
    mixingDecoder.readLine("1");
    mixingDecoder.readLine("2");
    mixingDecoder.readLine("-3");
    mixingDecoder.finishReading();
    mixingDecoder.encryptedCoordinated[0].move(0, []);

    const num1 = new CircularValue(1);
    const num2 = new CircularValue(2);
    const num3 = new CircularValue(-3);
    num1.next = num2;
    num1.previous = num3;
    num2.next = num3;
    num2.previous = num1;
    num3.next = num1;
    num3.previous = num2;
    expect(mixingDecoder.encryptedCoordinated).toEqual([num1, num2, num3]);
  });

  it("Test with test.txt", async () => {
    const result = await sumOfQualityLevels(811589153, 10, false, "test.txt");
    expect(result).toEqual(1623178306);
  });

  it("Test with input.txt", async () => {
    const result = await sumOfQualityLevels(811589153, 10, false, "input.txt");
    expect(result).toEqual(13084440324666);
  });
});
