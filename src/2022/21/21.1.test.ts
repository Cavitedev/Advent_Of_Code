import { rootMonkeyYell } from "./21.1.js";
import { MonkeyYellers, NumberMonkey, OperatorMonkey } from "./monkeyYellers.js";

describe("21.1", () => {
  describe("Monkey yellers with test input", () => {
    const monkeyYellers = new MonkeyYellers();

    beforeEach(() => {
      const input = `root: pppw + sjmn
            dbpl: 5
            cczh: sllz + lgvd
            zczc: 2
            ptdq: humn - dvpt
            dvpt: 3
            lfqf: 4
            humn: 5
            ljgn: 2
            sjmn: drzm * dbpl
            sllz: 4
            pppw: cczh / lfqf
            lgvd: ljgn * ptdq
            drzm: hmdt - zczc
            hmdt: 32`.split("\n");

      for (const line of input) {
        monkeyYellers.readLine(line.trim());
      }
    });

    it("Input builds number monkeys correctly", () =>{
        const numberMonkey: NumberMonkey = monkeyYellers.monkeys['dbpl'] as NumberMonkey;
        expect(numberMonkey.num).toEqual(5);
    });

    it("Input build operator monkey correctly", () => {
        const operatorMonkey: OperatorMonkey = monkeyYellers.monkeys['sjmn'] as OperatorMonkey;
        expect(operatorMonkey.monkeyAStr).toEqual("drzm");
        expect(operatorMonkey.operator).toEqual("*");
        expect(operatorMonkey.monkeyBStr).toEqual("dbpl");
    })

    it("Root monkey returns the right value through recursive values", () => {
        const yellNumber = monkeyYellers.monkeyYell("root");
        expect(yellNumber.value).toEqual(152)
    });
  });

  it("Test with test.txt", async ()=> {
    const result = await rootMonkeyYell("test.txt");
    expect(result).toEqual(152);
  });

  it("Test with input.txt", async ()=> {
    const result = await rootMonkeyYell("input.txt");
    expect(result).toEqual(49288254556480);
  });
});
