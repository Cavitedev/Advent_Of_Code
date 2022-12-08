import { detectMarkerOnSingal } from "./6.js";
import { SignalTuner } from "./SignalTuner.js";

describe("6.1", () => {
  it("Tuner returns right marker on given signal", () => {
    const input = "bvwbjplbgvbhsrlpgdmjqwftvncz";

    const signalTuner = new SignalTuner(input);

    const output = signalTuner.numberOfCharactersUntilMarkerIsAvailable(4);

    expect(output).toEqual(5);
  });

  it("Tuner returns right marker on another longer given signal", () => {
    const input = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

    const signalTuner = new SignalTuner(input);

    const output = signalTuner.numberOfCharactersUntilMarkerIsAvailable(4);

    expect(output).toEqual(11);
  });

  it("Tuner returns -1 if it doesn't find any marker", () => {
    const input = "zcfzcz";

    const signalTuner = new SignalTuner(input);

    const output = signalTuner.numberOfCharactersUntilMarkerIsAvailable(4);

    expect(output).toEqual(-1);
  });

  it("Tuner returns marker even if they are the last 4 characters", () => {
    const input = "zcfcccabcd";

    const signalTuner = new SignalTuner(input);

    const output = signalTuner.numberOfCharactersUntilMarkerIsAvailable(4);

    expect(output).toEqual(10);
  });

  it("Test with input.txt", async () => {
    const result = await detectMarkerOnSingal(4, "input.txt");

    expect(result).toEqual(1757);
  });
});
