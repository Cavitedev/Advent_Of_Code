import { detectMarkerOnSingal } from "../../src/2022/6/6tuningProblem";
import { SignalTuner } from "../../src/2022/6/SignalTuner";

describe("Fifth problem from Advent Code 2022", () => {
  describe("Tests for the first part of the problem", () => {
    it("Tuner returns right marker on given signal", () => {
      const input = "bvwbjplbgvbhsrlpgdmjqwftvncz";

      const signalTuner = new SignalTuner(input);

      const output = signalTuner.numberOfCharactersBeforeMarkerIsAvailable(4);

      expect(output).toEqual(5);
    });

    it("Tuner returns right marker on another longer given signal", () => {
      const input = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

      const signalTuner = new SignalTuner(input);

      const output = signalTuner.numberOfCharactersBeforeMarkerIsAvailable(4);

      expect(output).toEqual(11);
    });

    it("Tuner returns -1 if it doesn't find any marker", () => {
      const input = "zcfzcz";

      const signalTuner = new SignalTuner(input);

      const output = signalTuner.numberOfCharactersBeforeMarkerIsAvailable(4);

      expect(output).toEqual(-1);
    });

    it("Tuner returns marker even if they are the last 4 characters", () => {
      const input = "zcfcccabcd";

      const signalTuner = new SignalTuner(input);

      const output = signalTuner.numberOfCharactersBeforeMarkerIsAvailable(4);

      expect(output).toEqual(10);
    });

    it("Test with input.txt", async () => {
      const result = await detectMarkerOnSingal(4, "input.txt");

      expect(result).toEqual(1757);
    });
  });

  describe("Tests for the second part of the problem", () => {
    it("Tuner returns right marker (14 chars lenth) on given signal", () => {
      const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

      const signalTuner = new SignalTuner(input);

      const output = signalTuner.numberOfCharactersBeforeMarkerIsAvailable(14);

      expect(output).toEqual(19);
    });

    it("Test with input.txt", async () => {
      const result = await detectMarkerOnSingal(14, "input.txt");

      expect(result).toEqual(2950);
    });
  });
});
