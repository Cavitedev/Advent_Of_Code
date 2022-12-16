import { calculateBestFlow } from "./16.js";
import { Valve, Volcano } from "./volcano.js";

describe("16.1", () => {
  it("Open valve of flow rate 2 at time 25 sets opened to 25 and returns 50 as the value", () => {
    const valveAA = new Valve("AA", 2, ["DD"]);
    const flow = valveAA.open(25);

    expect(valveAA.opened).toEqual(25);
    expect(flow).toEqual(50);
  });

  it("Volcano reading line adds valve to dict", () => {
    const volcano = new Volcano();
    volcano.readLine(
      "Valve AA has flow rate=0; tunnels lead to valves DD, II, BB"
    );
    volcano.readLine("Valve HH has flow rate=22; tunnel leads to valve GG");

    const expectedValveAA = new Valve("AA", 0, ["DD", "II", "BB"]);
    expect(volcano.valves["AA"]).toEqual(expectedValveAA);
    const expectedValveHH = new Valve("HH", 22, ["GG"]);
    expect(volcano.valves["HH"]).toEqual(expectedValveHH);
  });

  describe("Volcano with full test input", () => {
    const volcano = new Volcano();
    beforeEach(() => {
      const input = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
      Valve BB has flow rate=13; tunnels lead to valves CC, AA
      Valve CC has flow rate=2; tunnels lead to valves DD, BB
      Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
      Valve EE has flow rate=3; tunnels lead to valves FF, DD
      Valve FF has flow rate=0; tunnels lead to valves EE, GG
      Valve GG has flow rate=0; tunnels lead to valves FF, HH
      Valve HH has flow rate=22; tunnel leads to valve GG
      Valve II has flow rate=0; tunnels lead to valves AA, JJ
      Valve JJ has flow rate=21; tunnel leads to valve II`;

      for (const line of input.split("\n")) {
        volcano.readLine(line.trim());
      }
    });

    it("Volcano builds raw data correctly", () => {
      expect(Object.keys(volcano.valves).length).toEqual(10);
    });

    it("Building transitive tunnels generates right numbers towards those valves", () => {
      volcano.buildTransitiveTunnels();
      const valveAA = volcano.valves["AA"];
      expect(
        valveAA.transitiveTunnels.find((v) => v.valve.name === "FF")
      ).toBeUndefined();
      expect(
        valveAA.transitiveTunnels.find((v) => v.valve.name === "HH").gCost
      ).toEqual(5);
    });
  });

  it("Test with test.txt", async () => {
    const result = await calculateBestFlow(30, 1, "test.txt");
    expect(result).toEqual(1651);
  });

  it("Test with input.txt", async () => {
    const result = await calculateBestFlow(30, 1, "input.txt");
    expect(result).toEqual(2330);
  });
});
