import { detectMarkerOnSingal } from "./6.js";
import { SignalTuner } from "./SignalTuner.js";

describe("6.2", () => {
  it("Tuner returns right marker (14 chars lenth) on given signal", () => {
    const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

    const signalTuner = new SignalTuner(input);

    const output = signalTuner.numberOfCharactersUntilMarkerIsAvailable(14);

    expect(output).toEqual(19);
  });

  it("Test with input.txt", async () => {
    const result = await detectMarkerOnSingal(14, "input.txt");

    expect(result).toEqual(2950);
  });
});
