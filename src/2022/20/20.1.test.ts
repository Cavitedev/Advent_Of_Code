import { sumOfQualityLevels } from "./20.js";
import { CircularValue, MixingDecoder } from "./mixingDecoder.js";

describe("20.1", () => {
  it("Reading lines add them to the encrypted coordinates", () => {
    const mixingDecoder = new MixingDecoder();
    mixingDecoder.readLine("1");
    mixingDecoder.readLine("2");
    mixingDecoder.readLine("-3");
    mixingDecoder.finishReading();

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

  it("Having 3 numbers, moving first element 1 position forward, moves it to the middle of it and change start pos", () => {
    const mixingDecoder = new MixingDecoder();
    mixingDecoder.readLine("1");
    mixingDecoder.readLine("2");
    mixingDecoder.readLine("-3");
    mixingDecoder.finishReading();
    mixingDecoder.encryptedCoordinated[0].move(1, []);

    const num1 = new CircularValue(1);
    const num2 = new CircularValue(2);
    const num3 = new CircularValue(-3);
    num1.next = num3;
    num1.previous = num2;
    num2.next = num1;
    num2.previous = num3;
    num3.next = num2;
    num3.previous = num1;
    expect(mixingDecoder.encryptedCoordinated).toEqual([num1, num2, num3]);
  });

  it("Having 3 numbers, moving first element 1 position backwards, moves it to the middle of it and change start pos", () => {
    const mixingDecoder = new MixingDecoder();
    mixingDecoder.readLine("1");
    mixingDecoder.readLine("2");
    mixingDecoder.readLine("-3");
    mixingDecoder.finishReading();
    mixingDecoder.encryptedCoordinated[0].move(-1, []);

    const num1 = new CircularValue(1);
    const num2 = new CircularValue(2);
    const num3 = new CircularValue(-3);
    num1.next = num3;
    num1.previous = num2;
    num2.next = num1;
    num2.previous = num3;
    num3.next = num2;
    num3.previous = num1;
    expect(mixingDecoder.encryptedCoordinated).toEqual([num1, num2, num3]);
  });

  it("Mixing coordinates of the read lines shuffles them in the right order", () => {
    const mixingDecoder = new MixingDecoder();
    mixingDecoder.readLine("1");
    mixingDecoder.readLine("2");
    mixingDecoder.readLine("-3");
    mixingDecoder.readLine("3");
    mixingDecoder.readLine("-2");
    mixingDecoder.readLine("0");
    mixingDecoder.readLine("4");
    mixingDecoder.finishReading();
    mixingDecoder.mixCoordinates();

    const firstVal = mixingDecoder.encryptedCoordinated[0];
    expect(firstVal.previous.value).toEqual(-2);
    expect(firstVal.previous.previous.value).toEqual(3);
    expect(firstVal.previous.previous.previous.value).toEqual(0);
  });

  it("Getting the 1000th, 2000th and 3000th indexes of the unencrypted coordinates return 4, -3 and 2 on test input", () => {
    const mixingDecoder = new MixingDecoder();
    mixingDecoder.readLine("1");
    mixingDecoder.readLine("2");
    mixingDecoder.readLine("-3");
    mixingDecoder.readLine("3");
    mixingDecoder.readLine("-2");
    mixingDecoder.readLine("0");
    mixingDecoder.readLine("4");
    mixingDecoder.finishReading();
    mixingDecoder.mixCoordinates();

    const valuesAtIndexes = mixingDecoder.valuesAtIndexes(1000, 2000, 3000);
    expect(valuesAtIndexes).toEqual([4, -3, 2]);
  });

  it("Test with test.txt", async () => {
    const result = await sumOfQualityLevels(1, 1, false, "test.txt");
    expect(result).toEqual(3);
  });

  it("Test with input.txt", async () => {
    const result = await sumOfQualityLevels(1, 1, false, "input.txt");
    expect(result).toEqual(1087);
  });
});
