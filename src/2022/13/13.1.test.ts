import { Packet, IntValue, PacketsReader } from "./packetsReader.js";

describe("13.1", () => {
  describe("Brackets pair ", () => {
    it("Reads input correctly", () => {
      const line = "[[1],[2,3,4]]";

      const bracketRead = Packet.FromLine(line);

      const expected = new Packet([
        new Packet([new IntValue(1)]),
        new Packet([new IntValue(2), new IntValue(3), new IntValue(4)]),
      ]);

      expect(bracketRead).toEqual(expected);
    });

    it("Shifts first value", () => {
      const line = "[[1],[2,3,4]]";
      const bracketRead = Packet.FromLine(line);

      const popValue = bracketRead.shiftNextIValue();

      expect(popValue).toEqual(new Packet([new IntValue(1)]));

      const expected = new Packet([
        new Packet([new IntValue(2), new IntValue(3), new IntValue(4)]),
      ]);
      expect(bracketRead).toEqual(expected);
    });
  });

  describe("Packets Reader", () => {
    it("Read lines create correct packet pairs", () => {
      const packetsReader = new PacketsReader();
      packetsReader.readLine("[1,1,3,1,1]");
      packetsReader.readLine("[1,1,5,1,1]");
      packetsReader.readLine("");
      packetsReader.readLine("[[1],[2,3,4]]");

      expect(packetsReader.packetGroups.length).toEqual(2);
      expect(packetsReader.packetGroups[0].packetPair.length).toEqual(2);
      expect(packetsReader.packetGroups[1].packetPair.length).toEqual(1);

      const expected = new Packet([
        new Packet([new IntValue(1)]),
        new Packet([new IntValue(2), new IntValue(3), new IntValue(4)]),
      ]);

      expect(packetsReader.packetGroups[1].packetPair[0]).toEqual(expected);
    });

    it("compare packets with the first pair returns 1 (right packet pair)", () => {
      const packetsReader = new PacketsReader();
      packetsReader.readLine("[1,1,3,1,1]");
      packetsReader.readLine("[1,1,5,1,1]");

      const sum = packetsReader.sumRightOrderPacketsIndexes();
      expect(sum).toEqual(1);
    });
  });
});
