import { getMonkeyBusiness } from "./11.1.js";
import { MonkeysAnalyzer } from "./monkey.js";

describe("11.1", () => {
  it("Monkeys add monkeys adds an empty monkey", () => {
    const monkeys = new MonkeysAnalyzer();
    monkeys.addMonkey();

    expect(monkeys.monkeys.length).toEqual(1);
  });

  it("If there are no monkeys, current monkey returns null", () => {
    const monkeys = new MonkeysAnalyzer();
    expect(monkeys.currentMonkey()).toBeNull();
  });

  it("If there is only 1 monkey, changing current monkey moves again to first monkey", () => {
    const monkeys = new MonkeysAnalyzer();
    monkeys.addMonkey();
    const monkey1 = monkeys.monkeys[0];

    expect(monkeys.currentMonkey()).toBe(monkey1);

    monkeys.nextMonkey();

    expect(monkeys.currentMonkey()).toBe(monkey1);
  });

  it("If there are only 2 monkeys, current monkey is the second monkey", () => {
    const monkeys = new MonkeysAnalyzer();
    monkeys.addMonkey();
    monkeys.addMonkey();

    const monkey2 = monkeys.monkeys[1];
    expect(monkeys.currentMonkey()).toBe(monkey2);
  });

  it("Read monkey line, adds new monkey", () => {
    const monkeys = new MonkeysAnalyzer();
    monkeys.readLine("Monkey 0:");
    expect(monkeys.monkeys.length).toEqual(1);
  });

  it("Read monkey line and starting items add items to monkey", () => {
    const monkeys = new MonkeysAnalyzer();
    monkeys.readLine("Monkey 0:");
    monkeys.readLine("  Starting items: 65, 58, 93, 57, 66");
    expect(monkeys.currentMonkey().items).toEqual([65, 58, 93, 57, 66]);
  });

  it("Read monkey line and sum operation with value includes operation correctly", () => {
    const monkeys = new MonkeysAnalyzer();
    monkeys.readLine("Monkey 0:");
    monkeys.readLine("  Operation: new = old + 4");
    expect(monkeys.currentMonkey().operation(5)).toEqual(9);
  });

  it("Read monkey line and sum operation with old includes operation correctly", () => {
    const monkeys = new MonkeysAnalyzer();
    monkeys.readLine("Monkey 0:");
    monkeys.readLine("  Operation: new = old + old");
    expect(monkeys.currentMonkey().operation(5)).toEqual(10);
  });

  it("Read monkey line and multiplication operation with value includes operation correctly", () => {
    const monkeys = new MonkeysAnalyzer();
    monkeys.readLine("Monkey 0:");
    monkeys.readLine("  Operation: new = old * 4");
    expect(monkeys.currentMonkey().operation(5)).toEqual(20);
  });

  it("Read monkey line and multiplication operation with old includes operation correctly", () => {
    const monkeys = new MonkeysAnalyzer();
    monkeys.readLine("Monkey 0:");
    monkeys.readLine("  Operation: new = old * old");
    expect(monkeys.currentMonkey().operation(5)).toEqual(25);
  });

  it("Read monkey line and throw condition includes operation correctly", () => {
    const monkeys = new MonkeysAnalyzer();
    monkeys.readLine("Monkey 0:");
    monkeys.readLine("  Test: divisible by 3");
    expect(monkeys.currentMonkey().throwCondition(2)).toEqual(false);
    expect(monkeys.currentMonkey().throwCondition(3)).toEqual(true);
  });

  it("Read monkey line and monkey to throw if true and if false are added correctly", () => {
    const monkeys = new MonkeysAnalyzer();
    monkeys.readLine("Monkey 0:");
    monkeys.readLine("  Test: divisible by 3");
    monkeys.readLine("    If true: throw to monkey 7");
    monkeys.readLine("    If false: throw to monkey 5");
    expect(monkeys.currentMonkey().ifTrueMonkeyIndex).toEqual(7);
    expect(monkeys.currentMonkey().ifFalseMonkeyIndex).toEqual(5);
  });

  describe("After monkeys are created", () => {
    let monkeys: MonkeysAnalyzer;
    beforeEach(() => {
      const input = `Monkey 0:
        Starting items: 79, 98
        Operation: new = old * 19
        Test: divisible by 23
          If true: throw to monkey 2
          If false: throw to monkey 3
      
      Monkey 1:
        Starting items: 54, 65, 75, 74
        Operation: new = old + 6
        Test: divisible by 19
          If true: throw to monkey 2
          If false: throw to monkey 0
      
      Monkey 2:
        Starting items: 79, 60, 97
        Operation: new = old * old
        Test: divisible by 13
          If true: throw to monkey 1
          If false: throw to monkey 3
      
      Monkey 3:
        Starting items: 74
        Operation: new = old + 3
        Test: divisible by 17
          If true: throw to monkey 0
          If false: throw to monkey 1`;

      monkeys = new MonkeysAnalyzer();
      for (const line of input.split("\n")) {
        monkeys.readLine(line);
      }
      monkeys.finishReading();
    });
    it("Monkeys are created correctly", () => {
      const monkey1 = monkeys.monkeys[0];
      expect(monkeys.currentMonkey()).toBe(monkey1);
    });

    it("Round of monkeys actions work properly", () => {
      monkeys.performRoundActions(1);
      expect(monkeys.monkeys[0].items).toEqual([20, 23, 27, 26]);
      expect(monkeys.monkeys[1].items).toEqual([2080, 25, 167, 207, 401, 1046]);
      expect(monkeys.monkeys[2].items).toEqual([]);
      expect(monkeys.monkeys[3].items).toEqual([]);
    });

    it("Inspection counts work after 20 rounds", () => {
      monkeys.performRoundActions(20);
      const inspections = monkeys.getInspectionCounts();
      const expected = [101, 95, 7, 105];
      expect(inspections).toEqual(expected);
    });
  });

  it("test with test.txt", async () => {
    const businessValue = await getMonkeyBusiness(20, 2, "test.txt");
    expect(businessValue).toEqual(10605);
  });

  it("test with input.txt", async () => {
    const businessValue = await getMonkeyBusiness(20, 2, "input.txt");
    expect(businessValue).toEqual(61503);
  });
});
