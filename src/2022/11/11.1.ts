import { readFileLines } from "../../common/readfileLines.js";
import { MonkeysAnalyzer } from "./monkey.js";

export async function getMonkeyBusiness(
  rounds: number,
  monkeysToReturn: number,
  file: string
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const monkeysAnalyzer = new MonkeysAnalyzer();

  for await (const line of rl) {
    monkeysAnalyzer.readLine(line);
  }
  monkeysAnalyzer.finishReading();
  monkeysAnalyzer.performRoundActions(rounds);
  const inspections = monkeysAnalyzer.getInspectionCounts();
  const mostImportantMonkeys = inspections
    .sort((a, b) => b - a)
    .slice(0, monkeysToReturn);
  const businessValue: number = mostImportantMonkeys.reduce(
    (prev, cur) => prev * cur
  );
  return businessValue;
}
